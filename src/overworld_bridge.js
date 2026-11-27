// Overworld <-> Determination Battle Simulator (9-Boss Engine) bridge
import { loadAssets, unlockAudio, stopMusic, isMuted, toggleMute, LOAD } from './assets.js';
import { fontReady as papyrusFont } from './papyrus_gfx.js';
import { fontReady as sansFont, stopAllAmbient } from './sans_gfx.js';
import { buildSpanishSprites } from './lang/sprites_es.js';
import { Smoother } from './smooth.js';
import { SETTINGS, saveSettings } from './settings.js';
import { BossMenu, BOSSES } from './menu.js';
import { Battle } from './battle.js';
import { NapstablookBattle } from './napstablook.js';
import { TorielBattle } from './toriel.js';
import { PapyrusBattle } from './papyrus.js';
import { MuffetBattle } from './muffet.js';
import { MettatonBattle } from './mettaton.js';
import { AsgoreBattle } from './asgore.js';
import { AsrielBattle } from './asriel.js';
import { SansBattle } from './sans.js';

const BOSS_CLASSES = {
  undyne: Battle,
  napstablook: NapstablookBattle,
  toriel: TorielBattle,
  papyrus: PapyrusBattle,
  muffet: MuffetBattle,
  mettaton: MettatonBattle,
  asgore: AsgoreBattle,
  asriel: AsrielBattle,
  sans: SansBattle,
};

const ID_ALIASES = {
  blook: 'napstablook',
};

const STORY_OUTCOME_ALLOWED = new Set(['napstablook', 'toriel', 'papyrus', 'undyne', 'muffet', 'mettaton', 'asgore', 'asriel', 'sans']);

const STEP = 1000 / 30;
const smoother = new Smoother();

let loaded = false;
let loading = false;
let loadPromise = null;

let scene = null;
let mode = 'idle'; // 'idle' | 'menu' | 'sim' | 'story'
let acc = 0;
let activeBossId = null;
let activeBossIdx = 0;
let prevTyping = false;

let storyCallback = null;
let exitOverworldCallback = null;
let pendingLaunch = null;

const held = { up: false, down: false, left: false, right: false, cancel: false, confirm: false };
const pressed = new Set();
const typed = [];

// Initial Shield sync between Overworld (window.UT_NO_HIT_SHIELD) and DBS SETTINGS.shield
if (typeof window.UT_NO_HIT_SHIELD === 'boolean') {
  SETTINGS.shield = window.UT_NO_HIT_SHIELD;
  saveSettings();
} else {
  window.UT_NO_HIT_SHIELD = !!SETTINGS.shield;
}
if (window.UTGame) {
  window.UTGame.noHitShield = !!window.UT_NO_HIT_SHIELD;
  window.UTGame.onUI?.();
}

window.addEventListener('dbs-settings-change', () => {
  window.UT_NO_HIT_SHIELD = !!SETTINGS.shield;
  if (window.UTGame) {
    window.UTGame.noHitShield = window.UT_NO_HIT_SHIELD;
    window.UTGame.onUI?.();
  }
});

function syncAudioWithOverworld() {
  const owMuted = Boolean(window.UTGame?.sfx?.muted);
  if (owMuted !== isMuted()) toggleMute();
}

function resolveOutcome(id, b) {
  if (!b) return 'exit';
  if (b.state === 'gameover') return 'gameover';
  if (id === 'napstablook') return 'spared';
  if (id === 'toriel') return (b.state === 'tSoul' || b.bare || (b.enemy && b.enemy.hp <= 0)) ? 'killed' : 'spared';
  if (id === 'papyrus') {
    if (b.state === 'pCaptured') return 'captured';
    if (b.state === 'pKill' || (b.enemy && b.enemy.hp <= 0)) return 'killed';
    return 'spared';
  }
  if (id === 'undyne') return 'killed';
  if (id === 'muffet') return (b.state === 'dying' || (b.enemy && b.enemy.hp <= 0)) ? 'killed' : 'spared';
  if (id === 'mettaton') return (b.killedMett || (b.enemy && b.enemy.hp < 1)) ? 'killed' : 'spared';
  if (id === 'asgore') return ((b.final && b.final.con >= 69) || (b.enemy && b.enemy.hp <= 0)) ? 'killed' : 'spared';
  if (id === 'asriel') return 'spared';
  if (id === 'sans') return (b.body && b.body.death_c > 0) ? 'killed' : 'spared';
  return 'spared';
}

function clearScene() {
  stopMusic();
  stopAllAmbient();
  if (scene) {
    if (typeof scene.stopLoops === 'function') try { scene.stopLoops(); } catch {}
    if (typeof scene.stopPanels === 'function') try { scene.stopPanels(); } catch {}
    if (scene.gen && typeof scene.gen.stopSounds === 'function') try { scene.gen.stopSounds(); } catch {}
    scene.onExit = null;
  }
  window.battle = null;
  scene = null;
  smoother.reset();
  acc = 0;
  pressed.clear();
  typed.length = 0;
  if (prevTyping) {
    prevTyping = false;
    window.UTGame?.onUI?.();
  }
}

function exitToOverworld(outcome = 'exit') {
  const wasStory = mode === 'story';
  const cbStory = storyCallback;
  const cbExit = exitOverworldCallback;
  pendingLaunch = null;
  clearScene();
  mode = 'idle';
  activeBossId = null;
  storyCallback = null;
  if (wasStory && cbStory) {
    cbStory(outcome);
  } else if (cbExit) {
    cbExit(outcome);
  } else if (window.UTGame?.onExitDBS) {
    window.UTGame.onExitDBS(outcome);
  }
}

function openMenuScene(page = 0, boss = activeBossIdx) {
  clearScene();
  mode = 'menu';
  activeBossId = null;
  activeBossIdx = boss >= 0 ? boss : 0;
  scene = new BossMenu(
    item => {
      const bIdx = BOSSES.findIndex(b => b.id === item.boss);
      startBattleInstance(item.boss, {
        single: item.mode === 'single' ? item.attack : null,
        phase: item.mode === 'phase' ? item.phase : null,
        story: false,
        bossIdx: bIdx >= 0 ? bIdx : 0,
      });
    },
    page,
    activeBossIdx,
    {
      onExitOverworld: () => exitToOverworld('exit'),
    }
  );
  window.UTGame?.onUI?.();
}

function startBattleInstance(rawId, { single = null, phase = null, story = false, onOutcome = null, bossIdx = null } = {}) {
  const id = ID_ALIASES[rawId] || rawId;
  const Cls = BOSS_CLASSES[id];
  if (!Cls) {
    if (story && onOutcome) onOutcome('exit');
    else openMenuScene(0, 0);
    return;
  }

  clearScene();
  syncAudioWithOverworld();
  SETTINGS.shield = !!(typeof window.UT_NO_HIT_SHIELD === 'boolean' ? window.UT_NO_HIT_SHIELD : SETTINGS.shield);

  const idx = bossIdx !== null ? bossIdx : BOSSES.findIndex(b => b.id === id);
  activeBossId = id;
  activeBossIdx = idx >= 0 ? idx : 0;
  mode = story ? 'story' : 'sim';
  storyCallback = story ? onOutcome : null;

  const b = new Cls(single, phase);
  b.bossIdx = activeBossIdx;
  b.onExit = () => {
    const out = resolveOutcome(id, b);
    clearScene();
    if (story) {
      mode = 'idle';
      const cb = storyCallback;
      storyCallback = null;
      if (cb) cb(out);
    } else {
      openMenuScene(1, activeBossIdx);
    }
  };
  scene = b;
  window.battle = b;
  window.UTGame?.onUI?.();
}

function executeLaunch(p) {
  if (p.type === 'menu') {
    openMenuScene(p.page || 0, p.boss || 0);
  } else {
    startBattleInstance(p.id, {
      single: p.single || null,
      phase: p.phase || null,
      story: !!p.story,
      onOutcome: p.onOutcome || null,
      bossIdx: p.bossIdx ?? null,
    });
  }
}

function ensureLoaded() {
  if (loaded) return Promise.resolve();
  if (!loadPromise) {
    loading = true;
    loadPromise = Promise.all([loadAssets(), papyrusFont, sansFont])
      .then(() => {
        try { buildSpanishSprites(); } catch (e) { console.error('DBS buildSpanishSprites error', e); }
        loaded = true;
        loading = false;
        pressed.clear();
        typed.length = 0;
        if (pendingLaunch) {
          const p = pendingLaunch;
          pendingLaunch = null;
          executeLaunch(p);
        }
      })
      .catch(e => {
        console.error('DBS asset load failed', e);
        loading = false;
        loadPromise = null;
        if (pendingLaunch) {
          const p = pendingLaunch;
          pendingLaunch = null;
          if (p.story && p.onOutcome) p.onOutcome('exit');
          else exitToOverworld('exit');
        }
      });
  }
  return loadPromise;
}

const UTDBS = {
  ensureLoaded,

  supportsStoryBoss(enemyId) {
    const id = ID_ALIASES[enemyId] || enemyId;
    return STORY_OUTCOME_ALLOWED.has(id);
  },

  openMenu({ page = 0, boss = 0, onExitOverworld = null } = {}) {
    unlockAudio();
    syncAudioWithOverworld();
    if (onExitOverworld) exitOverworldCallback = onExitOverworld;
    if (!loaded) {
      clearScene();
      mode = 'menu';
      activeBossId = null;
      activeBossIdx = boss >= 0 ? boss : 0;
      pendingLaunch = { type: 'menu', page, boss };
      ensureLoaded();
      window.UTGame?.onUI?.();
      return;
    }
    openMenuScene(page, boss);
  },

  openBattle(rawId, { single = null, phase = null, story = false, onOutcome = null, onExitOverworld = null } = {}) {
    unlockAudio();
    syncAudioWithOverworld();
    const id = ID_ALIASES[rawId] || rawId;
    const bossIdx = BOSSES.findIndex(b => b.id === id);
    if (onExitOverworld) exitOverworldCallback = onExitOverworld;

    if (!loaded) {
      clearScene();
      mode = story ? 'story' : 'sim';
      activeBossId = id;
      activeBossIdx = bossIdx >= 0 ? bossIdx : 0;
      storyCallback = story ? onOutcome : null;
      pendingLaunch = { type: 'battle', id, single, phase, story, onOutcome, bossIdx };
      ensureLoaded();
      window.UTGame?.onUI?.();
      return;
    }
    startBattleInstance(id, { single, phase, story, onOutcome, bossIdx });
  },

  abortToOverworld() {
    exitToOverworld('exit');
  },

  escape() {
    if (loading && pendingLaunch) {
      exitToOverworld('exit');
      return;
    }
    if (mode === 'sim' && window.battle) {
      openMenuScene(1, activeBossIdx);
      return;
    }
    if (mode === 'menu' && scene) {
      if (scene.page === 2 || scene.page === 3) {
        scene.page = 0;
        scene.sel = BOSSES.length;
        return;
      }
      if (scene.page === 1) {
        scene.page = 0;
        scene.sel = activeBossIdx;
        scene.scroll = 0;
        return;
      }
      exitToOverworld('exit');
      return;
    }
    if (mode === 'story') {
      exitToOverworld('exit');
    }
  },

  syncHeld(keys) {
    if (!keys) return;
    held.up = !!keys.up;
    held.down = !!keys.down;
    held.left = !!keys.left;
    held.right = !!keys.right;
    held.cancel = !!keys.cancel;
    held.confirm = !!keys.confirm;
  },

  pulseKey(k) {
    if (k === 'up' || k === 'down' || k === 'left' || k === 'right' || k === 'confirm' || k === 'cancel') {
      pressed.add(k);
    }
  },

  typeText(str) {
    if (!str) return;
    for (const ch of str) typed.push(ch);
  },

  step(dt) {
    if (loading || !scene) return;
    acc = Math.min(acc + Math.max(0, dt || 0), STEP * 3);
    while (acc >= STEP) {
      acc -= STEP;
      const before = scene;
      const inp = {
        confirm: pressed.has('confirm'),
        cancel: pressed.has('cancel'),
        up: pressed.has('up'),
        down: pressed.has('down'),
        left: pressed.has('left'),
        right: pressed.has('right'),
        held: { ...held },
        typed: typed.splice(0),
      };
      pressed.clear();
      scene.update(inp);
      if (!scene || scene !== before) {
        smoother.reset();
        if (!scene || !scene.smooth) break;
      }
      smoother.step(scene);
    }
    const curTyping = Boolean(window.battle && window.battle.typing);
    if (curTyping !== prevTyping) {
      prevTyping = curTyping;
      window.UTGame?.onUI?.();
    }
  },

  render(ctx) {
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (loading || !scene) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 640, 480);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('LOADING BATTLE ASSETS...', 320, 206);
      const frac = LOAD.total ? LOAD.done / LOAD.total : 0;
      ctx.fillRect(170, 234, 300, 20);
      ctx.fillStyle = '#000';
      ctx.fillRect(173, 237, 294, 14);
      ctx.fillStyle = '#fff';
      ctx.fillRect(173, 237, Math.round(294 * frac), 14);
      ctx.fillStyle = '#808080';
      ctx.font = '14px monospace';
      ctx.fillText(`${LOAD.done || 0} / ${LOAD.total || 0}`, 320, 282);
      ctx.restore();
      return;
    }
    if (scene.smooth) smoother.render(scene, ctx, Math.min(1, acc / STEP));
    else scene.draw(ctx);
    ctx.restore();
  },

  setShield(on) {
    SETTINGS.shield = !!on;
    saveSettings();
    window.UT_NO_HIT_SHIELD = SETTINGS.shield;
    if (window.UTGame) window.UTGame.noHitShield = SETTINGS.shield;
  },

  getShield: () => !!SETTINGS.shield,

  setMuted(m) {
    if (Boolean(m) !== isMuted()) toggleMute();
  },

  isReady: () => loaded,
  isLoading: () => loading,
  isActive: () => mode !== 'idle',
  isStory: () => mode === 'story',
  inMenu: () => mode === 'menu',
  inCombat: () => Boolean(window.battle && !['menu', 'actTarget', 'actList', 'itemList', 'mercyList', 'gameover'].includes(window.battle.state)),
  isTyping: () => Boolean(window.battle && window.battle.typing),
  getBossName: () => {
    if (activeBossId) {
      const b = BOSSES.find(x => x.id === activeBossId);
      if (b) return b.name;
    }
    return '9-Boss Sim';
  },
  getScene: () => scene,
};

window.UTDBS = UTDBS;

// Gently pre-warm DBS assets shortly after Overworld paints so battles open fast
setTimeout(() => {
  if (!loaded && !loading) ensureLoaded();
}, 400);

export default UTDBS;
