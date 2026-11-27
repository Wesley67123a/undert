// Undertale Ruins 1:1 Renderer, Overworld Menu, Multi-Touch Gamepad & Walkthrough Controller
(function() {
  'use strict';

  const canvas = document.getElementById('game');
  const { G, getRoomImg } = window.UTOverworldFactory.createGame(canvas);
  const { SPR, drawSpr, drawRichText, stripCodes } = window.UTEngineCore;
  window.UTGame = G;
  try {
    const saved = JSON.parse(localStorage.getItem('dbs-settings') || '{}');
    if (typeof window.UT_NO_HIT_SHIELD !== 'boolean' && typeof saved.shield === 'boolean') {
      window.UT_NO_HIT_SHIELD = saved.shield;
    }
  } catch {}
  G.noHitShield = !!window.UT_NO_HIT_SHIELD;
  G.keys.moveScale = 1;
  G.asriel = window.UTAsrielEngine?.createAsrielBattle(G) || null;
  G.onExitAsriel = () => { G.enterRoom(Math.max(4, G.state.room || 4)); };
  G.startAsriel = (entry = 'title') => {
    if (!G.asriel) return;
    G.sfx.unlock(); G.mode = 'asriel_battle'; G.asriel.open(entry, false); G.onUI?.();
  };
  G.undyne = window.UTUndyneEngine?.createUndyneBattle(G) || null;
  G.onExitUndyne = () => { G.enterRoom(Math.max(4, G.state.room || 4)); };
  G.startUndyne = (entry = 'title') => {
    if (!G.undyne) return;
    G.sfx.unlock(); G.mode = 'undyne_battle'; G.undyne.open(entry, false); G.onUI?.();
  };
  G.onExitDBS = () => {
    if ((G.state.room || 1) <= 3) G.enterRoom(4);
    else { G.mode = 'explore'; G.restoreRoomBGM?.(); }
    G.onUI?.();
  };
  G.openDBSMenu = (page = 0, boss = 0) => {
    if (!window.UTDBS) return;
    G.sfx.unlock(); G.sfx.stopBGM();
    G.mode = 'dbs_battle';
    window.UTDBS.openMenu({ page, boss, onExitOverworld: () => G.onExitDBS() });
    G.onUI?.();
  };
  G.startDBS = (bossId, opts = {}) => {
    if (!window.UTDBS) {
      if (bossId === 'asriel') return G.startAsriel('title');
      if (bossId === 'undyne') return G.startUndyne('title');
      return;
    }
    G.sfx.unlock(); G.sfx.stopBGM();
    G.mode = 'dbs_battle';
    window.UTDBS.openBattle(bossId, { ...opts, story: false, onExitOverworld: () => G.onExitDBS() });
    G.onUI?.();
  };
  G.startStoryDBS = (enemyId, cb = null) => {
    if (!window.UTDBS) { G.mode = 'rpg_battle'; G.rpg.start(enemyId, cb); return; }
    G.sfx.unlock(); G.sfx.stopBGM();
    G.mode = 'dbs_battle';
    window.UTDBS.openBattle(enemyId, {
      story: true,
      onOutcome: (outcome) => G.endRPGBattle(enemyId, outcome, cb),
      onExitOverworld: () => G.endRPGBattle(enemyId, 'exit', cb),
    });
    G.onUI?.();
  };

  const motes = Array.from({ length: 18 }, () => ({
    x: 110 + Math.random() * 90, y: Math.random() * 170, vy: 0.16 + Math.random() * 0.2, a: 0.35 + Math.random() * 0.4
  }));

  // =========================================================================
  // MAIN 60FPS UPDATE LOOP
  // =========================================================================
  function update() {
    G.time++;
    if (G.state.room >= 4 && G.mode !== 'finale') G.state.playTicks++;
    for (const m of motes) { m.y += m.vy; if (m.y > 165) { m.y = 10; m.x = 110 + Math.random() * 90; } }

    if (G.fade.dir !== 0) {
      G.fade.a += 0.08 * G.fade.dir;
      if (G.fade.dir === 1 && G.fade.a >= 1) {
        G.fade.a = 1; G.fade.dir = -1;
        if (G.fade.mid) G.fade.mid();
      } else if (G.fade.dir === -1 && G.fade.a <= 0) {
        G.fade.a = 0; G.fade.dir = 0;
      }
      return;
    }

    if (G.mode === 'intro') {
      const txt = G.D().introSlides[G.intro.slide] || '';
      if (G.intro.c < txt.length) {
        if (++G.intro.t >= 3) {
          G.intro.t = 0; G.intro.c++;
          const ch = txt[G.intro.c - 1];
          if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice('intro');
        }
      } else if (++G.intro.t > 130) {
        advanceIntroSlide();
      }
      return;
    }
    if (G.mode === 'intro_pan') {
      if (G.intro.panY < 110) G.intro.panY += 0.45;
      else if (G.time % 120 === 0) G.startFade(() => G.enterRoom(3));
      return;
    }
    if (G.mode === 'title' || G.mode === 'file_menu' || G.mode === 'ow_menu' || G.mode === 'save_menu' || G.mode === 'finale') return;

    if (G.mode === 'enc_alert') {
      if (++G.enc.timer > 24) {
        G.mode = 'enc_flash'; G.enc.timer = 22; G.sfx.sfx('battlefall', 0.8);
      }
      return;
    }
    if (G.mode === 'enc_flash') {
      if (--G.enc.timer <= 0) {
        if (G.enc.isFlowey) { G.mode = 'flowey_battle'; G.fb.start(); }
        else if (window.UTDBS?.supportsStoryBoss?.(G.enc.enemy)) {
          G.startStoryDBS(G.enc.enemy, G.enc.cb);
        } else { G.mode = 'rpg_battle'; G.rpg.start(G.enc.enemy, G.enc.cb); }
        G.onUI?.();
      }
      return;
    }
    if (G.mode === 'flowey_battle') { G.fb.update(G.keys); return; }
    if (G.mode === 'rpg_battle') { G.rpg.update(G.keys); return; }
    if (G.mode === 'asriel_battle') { G.asriel?.update(G.keys); return; }
    if (G.mode === 'undyne_battle') { G.undyne?.update(G.keys); return; }
    if (G.mode === 'dbs_battle') return;

    if (G.mode === 'fall') {
      G.frisk.y += G.fallAnim.vy;
      if (G.fallAnim.vy > 0 && G.fallAnim.ticks % 4 === 0) {
        const dirs = ['down', 'left', 'up', 'right'];
        G.frisk.dir = dirs[(dirs.indexOf(G.frisk.dir) + 1) % 4];
      }
      if (--G.fallAnim.ticks <= 0) {
        if (G.fallAnim.targetY != null) { G.frisk.y = G.fallAnim.targetY; G.fallAnim.targetY = null; }
        G.frisk.dir = 'down'; G.mode = 'explore'; G.updateCamera(true);
      } else G.updateCamera(false);
      return;
    }

    if (G.mode === 'dlg') {
      const cur = G.dlg.q[G.dlg.i];
      if (!cur) { G.mode = 'explore'; return; }
      const plain = stripCodes(cur.text);
      if (G.dlg.c < plain.length) {
        if (++G.dlg.t >= 2) {
          G.dlg.t = 0; G.dlg.c++;
          const ch = plain[G.dlg.c - 1];
          if (ch && ch !== ' ' && ch !== '\n' && ch !== '*') G.sfx.voice(cur.who, cur.expr);
        }
      }
      return;
    }

    // Explore mode
    if (G.tor.wp.length && [7, 10, 31, 34, 41].includes(G.state.room)) {
      G.frisk.moving = false;
      G.checkRoomEvents();
      G.updateCamera(false);
      return;
    }

    const dx = (G.keys.right ? 1 : 0) - (G.keys.left ? 1 : 0);
    const dy = (G.keys.down ? 1 : 0) - (G.keys.up ? 1 : 0);
    G.frisk.moving = (dx !== 0 || dy !== 0);
    if (G.frisk.moving) {
      if (dy > 0) G.frisk.dir = 'down';
      else if (dy < 0) G.frisk.dir = 'up';
      else if (dx < 0) G.frisk.dir = 'left';
      else if (dx > 0) G.frisk.dir = 'right';
      // Authentic Undertale 3px @ 30fps = 1.50px @ 60fps, scaled by mobile startup delay ramp
      const baseSpd = G.keys.cancel ? 1.85 : 1.50;
      const spd = baseSpd * (G.keys.moveScale ?? 1) * (dx && dy ? 0.78 : 1);
      if (dx) G.moveFrisk(dx * spd, 0);
      if (dy) G.moveFrisk(0, dy * spd);
      G.frisk.walk++;
    } else G.frisk.walk = 0;

    G.updateCamera(false);
    G.checkRoomEvents();
  }

  function advanceIntroSlide() {
    G.intro.slide++;
    if (G.intro.slide < G.D().introSlides.length) {
      G.intro.c = 0; G.intro.t = 0;
    } else G.startFade(() => G.enterRoom(2));
  }

  // =========================================================================
  // RENDERERS (640x480 Canvas)
  // =========================================================================
  function render() {
    const ctx = G.ctx;
    ctx.imageSmoothingEnabled = false;

    if (G.mode === 'intro' || G.mode === 'intro_pan' || G.mode === 'title' || G.mode === 'file_menu') {
      renderIntroAndTitle(ctx);
    } else if (G.mode === 'flowey_battle') {
      G.fb.render(ctx, G.time);
    } else if (G.mode === 'rpg_battle') {
      G.rpg.render(ctx, G.time);
    } else if (G.mode === 'asriel_battle') {
      G.asriel?.render(ctx, G._battleInterp);
    } else if (G.mode === 'undyne_battle') {
      G.undyne?.render(ctx, G._battleInterp);
    } else if (G.mode === 'dbs_battle') {
      window.UTDBS?.render(ctx);
    } else if (G.mode === 'finale') {
      renderFinale(ctx);
    } else {
      renderOverworld(ctx);
      if (G.mode === 'enc_flash') {
        if (Math.floor(G.enc.timer / 3) % 2 === 0) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480); }
        const sx = (G.frisk.x - G.camX + 9) * 2, sy = (G.frisk.y - G.camY + 18) * 2;
        drawSpr(ctx, 'spr_heart', 0, sx - 8, sy - 8, 1, 1);
      }
      if (G.mode === 'dlg') renderDialogue(ctx);
      if (G.mode === 'ow_menu') renderOverworldMenu(ctx);
      if (G.mode === 'save_menu') renderSaveMenu(ctx);
    }

    if (G.fade.a > 0) {
      ctx.fillStyle = `rgba(0,0,0,${Math.min(1, G.fade.a)})`;
      ctx.fillRect(0, 0, 640, 480);
    }
  }

  function renderIntroAndTitle(ctx) {
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480);
    if (G.mode === 'intro') {
      ctx.save(); ctx.scale(2, 2);
      drawSpr(ctx, 'spr_introimage', G.intro.slide, 0, 0, 1, 1);
      ctx.restore();
      const txt = G.D().introSlides[G.intro.slide] || '';
      if (txt) drawRichText(ctx, txt, 118, 292, G.intro.c, { size: 28, lineH: 38 });
    } else if (G.mode === 'intro_pan') {
      const s = SPR['spr_introlast'];
      if (s && s.img.complete) {
        const sy = Math.min(110, Math.floor(G.intro.panY));
        ctx.drawImage(s.img, 0, sy, 320, 240, 0, 0, 640, 480);
      }
    } else if (G.mode === 'title') {
      ctx.save(); ctx.scale(2, 2);
      drawSpr(ctx, 'spr_undertaletitle', 0, 0, 0, 1, 1);
      ctx.restore();
      if (Math.floor(G.time / 28) % 2 === 0) {
        const lbl = G.lang === 'zh' ? '[按 Z 或點擊確認開始]' : '[PRESS Z OR ENTER]';
        drawRichText(ctx, lbl, 198, 360, 999, { size: 22, color: '#888888' });
      }
    } else if (G.mode === 'file_menu') {
      const zh = G.lang === 'zh';
      drawRichText(ctx, zh ? '--- 操作說明 ---' : '--- INSTRUCTION ---', 180, 48, 999, { size: 26, color: '#b8b8b8' });
      drawRichText(ctx, zh
        ? '[Z / ENTER] - 確認 / 調查\n[X / SHIFT] - 取消 / 奔跑 / 跳過文字\n[C / CTRL]  - 開啟選單 (道具/狀態/電話)'
        : '[Z or ENTER] - Confirm / Inspect\n[X or SHIFT] - Cancel / Run / Skip\n[C or CTRL]  - Menu (ITEM / STAT / CELL)', 108, 96, 999, { size: 22, lineH: 34, color: '#b8b8b8' });

      // Save File Box
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.strokeRect(108, 232, 424, 172);
      const meta = G.savedMeta;
      const rTitle = meta ? (G.D().roomNames[meta.room] || 'Ruins') : (zh ? '新遊戲 (無存檔)' : 'Empty — New Game');
      const mins = meta ? Math.floor((meta.playTicks || 0) / 3600) : 0;
      const secs = meta ? String(Math.floor(((meta.playTicks || 0) % 3600) / 60)).padStart(2, '0') : '00';
      drawRichText(ctx, meta ? meta.name : 'FRISK', 136, 252, 999, { size: 26 });
      drawRichText(ctx, `LV ${meta ? meta.lv : 1}`, 290, 252, 999, { size: 26 });
      drawRichText(ctx, `${mins}:${secs}`, 426, 252, 999, { size: 26 });
      drawRichText(ctx, rTitle, 136, 294, 999, { size: 24, color: '#d0d0d0' });

      const cLabel = meta ? (zh ? '繼續遊戲' : 'Continue') : (zh ? '開始冒險' : 'Start Game');
      const rLabel = zh ? '重新開始' : 'Reset';
      drawRichText(ctx, cLabel, 168, 348, 999, { size: 26, color: G.fileCur === 0 ? '#ffff00' : '#ffffff' });
      drawRichText(ctx, rLabel, 368, 348, 999, { size: 26, color: G.fileCur === 1 ? '#ffff00' : '#ffffff' });
      drawSpr(ctx, 'spr_heart', 0, (G.fileCur === 0 ? 138 : 338), 354, 1, 1);
    }
  }

  // Snowdin NPC idle animation rates (0 = static idle frame 0)
  const SNOW_ANIM = {
    obj_nicecreamguy: 22, obj_gyftrotnpc: 24, obj_bigdog: 24,
    obj_townnpc_bear1: 30, obj_townnpc_beartree: 30, obj_townnpc_reddemon: 30,
    obj_townnpc_icewolf: 28, obj_throwwolf: 22, obj_townnpc_innlady: 30,
    obj_townnpc_bunlady: 30, obj_townnpc_bunboy: 30, obj_townnpc_unfunny: 30,
    obj_grillbynpc_grillby: 12, obj_grillbynpc_hot2: 20, obj_grillbynpc_foodmonster: 26,
    obj_grillbynpc_hotandbothered: 24, obj_grillbynpc_lesserdog: 26,
    obj_townnpc_hatescity: 28, obj_townnpc_weirdfish: 28,
    obj_snowdrakenpc: 24, obj_chilldrakenpc: 24,
    obj_librarynpc_jumbler: 30, obj_librarynpc_lizard1: 30,
    obj_librarynpc_lizard2: 30, obj_librarynpc_wordsearch: 30,
    obj_icecap_npcb: 24, obj_icecap_npcg: 24, obj_icecap_npcr: 24,
    obj_icecube_room: 18,
  };
  // Explicit sprite overrides where .room.gmx default differs or needs state
  const SNOW_SPR_OVERRIDE = {
    obj_grillbynpc_doggo: 'spr_movedoge_o',
    obj_grillbynpc_mandog: 'spr_mandogwalk',
    obj_grillbynpc_womandog: 'spr_womandogwalk',
    obj_townnpc_bunboy: 'spr_npc_rabbitkid',
    obj_xoxocontroller1: 'spr_groundswitch1',
  };
  const SNOW_FLOOR_OBJS = new Set([
    'obj_xoxocontroller1', 'obj_golfhole', 'obj_snowdinlogo', 'obj_crossword', 'obj_spagnot', 'obj_icecube_room'
  ]);
  const SNOW_SKIP_OBJS = new Set([
    'obj_kitchenchecker', 'obj_xoxo', 'obj_grillbynpc_sansdate',
    'obj_shockblock', 'obj_snoozer', 'obj_trashnado',
    'obj_iceevent', 'obj_specialdrophole', 'obj_superdrophole',
  ]);

  function renderOverworld(ctx) {
    const id = G.state.room, R = window.UT_GMC_ROOMS[id], fl = G.state.flags;
    const genoSnow = G.isGenocideSnowdin && G.isGenocideSnowdin();
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480);

    ctx.save();
    ctx.scale(2, 2);
    ctx.translate(-Math.round(G.camX), -Math.round(G.camY));

    // 1. Pristine .room.gmx Room Background PNG
    const rmImg = getRoomImg(id, id === 36 && fl.roomDark);
    if (rmImg.complete && rmImg.naturalWidth) ctx.drawImage(rmImg, 0, 0);

    // 2. Animated Fakewater streams
    const wf = Math.floor(G.time / 10) % 3;
    for (const [wspr, wx, wy] of R.water) drawSpr(ctx, wspr, wf, wx, wy);

    // 3. Mirror reflection in room_torhouse3 (34)!
    if (id === 34 && G.frisk.x > 615 && G.frisk.x < 695) {
      ctx.save();
      ctx.beginPath(); ctx.rect(638, 108, 48, 22); ctx.clip();
      const mirSpr = { down: 'spr_maincharau', up: 'spr_maincharad', left: 'spr_maincharal', right: 'spr_maincharar' }[G.frisk.dir];
      const mf = G.frisk.moving ? Math.floor(G.frisk.walk / 10) : 0;
      drawSpr(ctx, mirSpr, mf, G.frisk.x, 244 - G.frisk.y);
      ctx.restore();
    }

    // 4. Floor Props (Spikes, Switches, Holes, Plates, Tree Shadow)
    const drawList = [];
    for (const inst of R.instances) {
      const o = inst.obj, x = inst.x, y = inst.y;
      if (o === 'obj_nastrytree_bottom') drawSpr(ctx, 'spr_nastytreebottom', 0, x, y);
      else if (o === 'obj_downstairs') drawSpr(ctx, 'spr_downstairs', 0, x, y);
      else if (o === 'obj_solidrailing') drawList.push({ y: y + 13, draw: () => drawSpr(ctx, 'spr_railing', 0, x, y) });
      else if (o === 'obj_solidrailing2') drawList.push({ y: y + 75, draw: () => drawSpr(ctx, 'spr_railing2', 0, x, y) });
      else if (o === 'obj_solidrailing3') drawList.push({ y: y + 46, draw: () => drawSpr(ctx, 'spr_railingpiece1', 0, x, y) });
      else if (o === 'obj_ruinsdoor1' && !fl.r7_done) drawSpr(ctx, 'spr_ruinsdoor1', 0, x, y);
      else if (o === 'obj_finaldoor' && !fl.torielDone) drawSpr(ctx, 'spr_ruinsdoor1', 0, x, y);
      else if (o === 'obj_floorswitch1') {
        const pressed = fl.r7_done && (x === 180 || x === 220);
        drawSpr(ctx, 'spr_groundswitch1', pressed ? 1 : 0, x, y);
      }
      else if (o === 'obj_wallswitchcut1') drawSpr(ctx, 'spr_switch', fl.r7_done ? 1 : 0, x, y, 1, 1, true);
      else if (o === 'obj_plotswitch1') drawSpr(ctx, 'spr_switch', fl.r8_sw1 ? 1 : 0, x, y, 1, 1, true);
      else if (o === 'obj_plotswitch2') drawSpr(ctx, 'spr_switch', fl.r8_sw2 ? 1 : 0, x, y, 1, 1, true);
      else if (o === 'obj_plotswitch3') drawSpr(ctx, 'spr_switch', fl.r22_sw ? 1 : 0, x, y, 1, 1, true);
      else if (o === 'obj_readable_switch1') drawSpr(ctx, 'spr_switch', 0, x, y, 1, 1, true);
      else if (o === 'obj_switchadvice1' || o === 'obj_switchadvice2') drawSpr(ctx, 'spr_tornote', 0, x, y);
      else if (o === 'obj_blueswitch_1') drawSpr(ctx, 'spr_colorswitch', 0, x, y);
      else if (o === 'obj_redswitch_1') drawSpr(ctx, 'spr_colorswitch', 1, x, y);
      else if (o === 'obj_greenswitch_1') drawSpr(ctx, 'spr_colorswitch', 2, x, y);
      else if (o === 'obj_spikes_room') {
        const up = G.isSpikeBlocking(id, x, y);
        drawSpr(ctx, 'spr_spiketile', up ? 0 : 1, x + 1, y + 4);
      }
      else if (o === 'obj_spiketile1') {
        drawSpr(ctx, 'spr_spiketile', fl.r10_bridge ? 1 : 0, x + 1, y + 4);
      }
      else if (o === 'obj_spiketile2') {
        const near = Math.hypot((G.frisk.x + 9) - (x + 10), (G.frisk.y + 24) - (y + 10)) < 26
                  || (G.tor.vis && Math.hypot((G.tor.x + 12) - (x + 10), (G.tor.y + 44) - (y + 10)) < 28);
        drawSpr(ctx, 'spr_spiketile', near ? 1 : 0, x + 1, y + 4);
      }
      else if (o === 'obj_mousehole') drawSpr(ctx, 'spr_mousehole', 0, x, y);
      else if (o === 'obj_smallweb') drawSpr(ctx, 'spr_smallweb', 0, x, y);
      else if (o === 'obj_bigweb') drawSpr(ctx, 'spr_bigweb', 0, x, y);
      else if (o === 'obj_hearthflame') drawSpr(ctx, 'spr_hearthflame', Math.floor(G.time / 6), x, y);
      else if (o === 'obj_bigpie') drawSpr(ctx, 'spr_bigpie', 0, x, y);
      else if (o === 'obj_ribbon_pickup' && !fl.gotRibbon) drawSpr(ctx, 'spr_ribbon', 0, x, y);
      else if (o === 'obj_knife_pickup' && !fl.gotKnife) drawSpr(ctx, 'spr_groundknife', 0, x, y);
      else if (o === 'obj_pie_pickup' && fl.sleptInBed && !fl.gotPie) drawSpr(ctx, 'spr_pieslice', 0, x, y);
      else if (o === 'obj_napstablook1' && !fl.blookMoved) drawSpr(ctx, 'spr_napstablook_gr', 0, x, y);
      else if (o === 'obj_napstablook2' && !fl.blookPitSeen) drawSpr(ctx, 'spr_napstablook_grsm', 0, x, y);
      else if (o === 'obj_savepoint') {
        drawList.push({ y: y + 10, draw: () => drawSpr(ctx, 'spr_savepoint', Math.floor(G.time / 12), x + 4, y + 4) });
      }
      else if (o === 'obj_candydish1') {
        drawList.push({ y: y + 24, draw: () => {
          drawSpr(ctx, 'spr_candydish', 0, x, y);
          if ((fl.candy || 0) >= 4) drawSpr(ctx, 'spr_candydish2', 0, x - 3, y + 26);
        } });
      }
      else if (o === 'obj_pillar_1') drawList.push({ y: y + 58, draw: () => drawSpr(ctx, 'spr_pillar', 0, x, y) });
      else if (o === 'obj_nastytree') drawList.push({ y: y + 88, draw: () => drawSpr(ctx, 'spr_nastytree', 0, x, y) });
      else if (o === 'obj_dummy1') drawList.push({ y: y + 28, draw: () => drawSpr(ctx, fl.r9_done ? 'spr_dummyglad' : 'spr_dummy', 0, x, y) });
      else if (o === 'obj_smallfrog' || o === 'obj_smallfrog_xadvice') {
        drawList.push({ y: y + 20, draw: () => drawSpr(ctx, 'spr_smallfrog', Math.floor(G.time / 20) % 2, x, y) });
      }
      else if (o === 'obj_vegetoid_overworld') drawList.push({ y: y + 18, draw: () => drawSpr(ctx, 'spr_vegetableoutside', Math.floor(G.time / 24), x, y) });
      else if (o === 'obj_cheesetable1') drawList.push({ y: y + 15, draw: () => drawSpr(ctx, 'spr_cheesetable', 0, x, y) });
      else if (o === 'obj_readable_sign1' || o === 'obj_readable_sign2' || o === 'obj_sign_room') {
        drawList.push({ y: y + 20, draw: () => drawSpr(ctx, 'spr_npc_sign', 0, x, y) });
      }
      else if (o === 'obj_chairiel') {
        const hasTor = !fl.torBasement && !fl.torielDone;
        drawList.push({ y: y + 50, draw: () => drawSpr(ctx, hasTor ? 'spr_chairiel' : 'spr_chairempty', 0, x, y) });
      }
      else if (o === 'obj_kitchentable') drawList.push({ y: y + 48, draw: () => drawSpr(ctx, 'spr_diningtable', 0, x, y) });
      else if (o === 'obj_lchair') drawList.push({ y: y + 25, draw: () => drawSpr(ctx, 'spr_leftchair', 0, x, y) });
      else if (o === 'obj_rchair') drawList.push({ y: y + 34, draw: () => drawSpr(ctx, 'spr_rightchair', 0, x, y) });
      else if (o === 'obj_uchair') drawList.push({ y: y + 20, draw: () => drawSpr(ctx, 'spr_topchair', 0, x, y) });
      else if (o === 'obj_smallchair') drawList.push({ y: y + 28, draw: () => drawSpr(ctx, 'spr_smallchair', 0, x, y) });
      else if (o === 'obj_cactus') drawList.push({ y: y + 45, draw: () => drawSpr(ctx, 'spr_cactus', 0, x, y) });
      else if (id >= 44) {
        if (SNOW_SKIP_OBJS.has(o)) continue;
        // Epilogue-only Royal Guard placements outside Grillby's in Room 68 (normally inside Room 73)
        if (id === 68 && (o === 'obj_bigdog' || o.startsWith('obj_grillbynpc_'))) continue;
        // Genocide Route evacuates Snowdin Town & interiors (Rooms 68..74)
        if (genoSnow && id >= 68 && id <= 74 && (
          o.startsWith('obj_townnpc_') || o.startsWith('obj_grillbynpc_') || o.startsWith('obj_librarynpc_') || o === 'obj_bigdog'
        )) continue;
        if ((o === 'obj_sans_room' || o === 'obj_doublesans') && (G.sans?.vis || genoSnow)) continue;
        if ((o === 'obj_papyrus_houseoutside' || o === 'obj_papyrus_guide' || o === 'obj_papyrus_hisroom') && (G.pap?.vis || fl.papyrusKilled || genoSnow)) continue;

        // Room 61 Lesser Dog Snow Sculptures (exact obj_dogpillarparent logic: only show extra snow dogs if petted!)
        if (o === 'obj_dogpillarparent') {
          if (fl.lesserDogKilled || genoSnow) {
            drawList.push({ y: y + 43, draw: () => drawSpr(ctx, 'spr_dogmush', 0, x, y + 20) });
          } else if (!fl.lesserDogPet) {
            drawList.push({ y: y + 66, draw: () => drawSpr(ctx, 'spr_lessdogsnow', 0, x, y + 30) });
          } else {
            drawList.push({ y: y + 56, draw: () => drawSpr(ctx, 'spr_dogpillar1', 0, x, y) });
          }
          continue;
        }
        if ((o.startsWith('obj_dogpillar') || o.startsWith('obj_dogneck')) && !fl.lesserDogPet) continue;

        // Room 64 Ice Cave Wall + shimmering animated ice gleam (obj_icecavewall)
        if (o === 'obj_icecavewall') {
          const ct = (G.time * 0.5 + x) % 350;
          const al = ct >= 100 && ct < 150 ? (ct - 100) / 50 : (ct >= 150 && ct < 300 ? 1 : (ct >= 300 ? Math.max(0, 1 - (ct - 300) / 50) : 0));
          drawList.push({
            y: y + 23,
            draw: () => {
              drawSpr(ctx, 'spr_icecavewall', 0, x, y);
              if (al > 0.02) {
                ctx.save(); ctx.globalAlpha = al;
                drawSpr(ctx, 'spr_icecavewall_2', Math.floor(Math.abs(Math.sin(ct / 15) * 2.8)) % 2, x + Math.sin(ct / 7), y + Math.cos(ct / 8));
                ctx.restore();
              }
            }
          });
          continue;
        }

        // Room 69 Animated Ice Conveyor Belt + Silo + Moving Ice Block (obj_iceconveyorbelt)
        if (o === 'obj_iceconveyorbelt') {
          drawList.push({
            y: y + 16,
            draw: () => {
              drawSpr(ctx, 'spr_silo2', 0, 368 + 58, -10 + 68);
              drawSpr(ctx, 'spr_conveyorbelt_single', Math.floor(G.time / 6), x, y);
              if (!genoSnow) {
                const icex = -45 + ((G.time * 0.25) % 85);
                drawSpr(ctx, 'spr_iceblock', 0, x + icex, y - 30);
              }
            }
          });
          continue;
        }

        // Room 76 Sans's Dirty Sock + Room 78 Sans's Treadmill (obj_npc_room)
        if (o === 'obj_npc_room') {
          if (id === 76) drawList.push({ y: y + 22, draw: () => drawSpr(ctx, 'spr_signsock', 0, x, y) });
          else if (id === 78) drawList.push({ y: y + 27, draw: () => drawSpr(ctx, 'spr_treadmill', Math.floor(G.time / 8) % 2, x, y) });
          continue;
        }

        if (o === 'obj_stick') {
          drawSpr(ctx, 'spr_stick', fl.r45_branch ? 1 : 0, x, y);
        } else if (o === 'obj_creeptree1' || o === 'obj_creeptree_stickbreak') {
          const px = Math.round(x - (G.frisk.x - x) * 0.32);
          drawList.push({ y: 9999, draw: () => drawSpr(ctx, 'spr_treeshadow', 0, px, y) });
        } else if (o === 'obj_switch') {
          drawSpr(ctx, 'spr_specialswitch', fl.r60_sw ? 1 : 0, x, y);
        } else if (o === 'obj_snowdecahedron') {
          drawList.push({ y: y + 6, draw: () => drawSpr(ctx, 'spr_rollsnow', 0, x, y, 1, 1, true) });
        } else {
          let sp = SNOW_SPR_OVERRIDE[o] || inst.spr;
          if (o === 'obj_nicesnowman') sp = (fl.snowmanPieces >= 3) ? 'spr_sadsnowman' : 'spr_regsnowman';
          if (o === 'obj_nicecreamguy') sp = genoSnow ? 'spr_icecreamguy_sad' : 'spr_icecreamguy_happy';
          if (!sp || sp === 'spr_interactable' || sp === 'spr_event' || sp === 'spr_pixwht' || !SPR[sp]) continue;
          const animRate = SNOW_ANIM[o] || 0;
          const frame = animRate ? Math.floor(G.time / animRate) : 0;
          if (SNOW_FLOOR_OBJS.has(o)) {
            drawSpr(ctx, sp, frame, x, y);
          } else {
            const s = SPR[sp];
            const h = s ? s.h : 24;
            const sortY = o === 'obj_dogehouseback' ? (y + 18) : (y + h);
            drawList.push({ y: sortY, draw: () => drawSpr(ctx, sp, frame, x, y) });
          }
        }
      }
    }

    // Snowdin XO tile puzzle (X = 0, O = 1)
    for (const t of G.xoTiles) drawSpr(ctx, 'spr_xoxo', t.state, t.x, t.y);

    // Sans & Papyrus overworld actors
    const actorSpr = (nm, a) => ({ down: `spr_${nm}_d`, up: `spr_${nm}_u`, left: `spr_${nm}_l`, right: `spr_${nm}_r` }[a.dir] || `spr_${nm}_d`);
    if (G.sans && G.sans.vis) {
      const sf = G.sans.moving ? Math.floor(G.time / 10) % 4 : 0;
      drawList.push({ y: G.sans.y + 30, draw: () => drawSpr(ctx, actorSpr('sans', G.sans), sf, G.sans.x, G.sans.y) });
    }
    if (G.pap && G.pap.vis) {
      const pf = G.pap.moving ? Math.floor(G.time / 9) % 4 : 0;
      drawList.push({ y: G.pap.y + 42, draw: () => drawSpr(ctx, actorSpr('papyrus', G.pap), pf, G.pap.x, G.pap.y) });
    }

    // Rock plate tiles in rooms 15 & 17
    if (id === 15) drawSpr(ctx, 'spr_groundswitch1', fl.rock_15 ? 1 : 0, 258, 142);
    if (id === 17) {
      drawSpr(ctx, 'spr_groundswitch1', 0, 298, 102);
      drawSpr(ctx, 'spr_groundswitch1', 0, 298, 142);
      drawSpr(ctx, 'spr_groundswitch1', 0, 298, 182);
    }

    for (const h of G.holes) drawSpr(ctx, 'spr_hole', 0, h.x, h.y);
    for (const rk of G.rocks) drawList.push({ y: rk.y + 18, draw: () => drawSpr(ctx, 'spr_rock', 0, rk.x, rk.y) });
    for (const sp of G.spiders) drawSpr(ctx, 'spr_purplespider_overworld', Math.floor(G.time / 5), sp.x, sp.y);

    if (G.flowey.vis) {
      drawList.push({ y: G.flowey.y + 21, draw: () => drawSpr(ctx, 'spr_flowey', Math.floor(G.time / 18) % 2, G.flowey.x, G.flowey.y) });
    }

    if (G.tor.vis) {
      drawList.push({
        y: G.tor.y + 51,
        draw: () => {
          if (G.tor.hug) { drawSpr(ctx, 'spr_toriel_hug', 1, G.tor.x, G.tor.y + 4); return; }
          const ts = { down: 'spr_toriel_d', up: 'spr_toriel_u', left: 'spr_toriel_l', right: 'spr_toriel_r' }[G.tor.dir] || 'spr_toriel_d';
          const tf = G.tor.moving ? Math.floor(G.tor.walk / 9) : 0;
          drawSpr(ctx, ts, tf, G.tor.x, G.tor.y);
        }
      });
    }

    if (!G.tor.hug) {
      drawList.push({
        y: G.frisk.y + 29,
        draw: () => {
          const fs = { down: 'spr_maincharad', up: 'spr_maincharau', left: 'spr_maincharal', right: 'spr_maincharar' }[G.frisk.dir] || 'spr_maincharad';
          const ff = G.frisk.moving ? Math.floor(G.frisk.walk / 10) : 0;
          drawSpr(ctx, fs, ff, G.frisk.x, G.frisk.y);
          if (G.mode === 'enc_alert') drawSpr(ctx, 'spr_exc', 0, G.frisk.x + 5, G.frisk.y - 12);
        }
      });
    }

    drawList.sort((a, b) => a.y - b.y);
    for (const item of drawList) item.draw();

    if (id === 4) {
      for (const m of motes) {
        ctx.fillStyle = `rgba(255,248,185,${m.a})`;
        ctx.fillRect(Math.round(m.x), Math.round(m.y), 1, 1);
      }
    }
    ctx.restore();
  }

  function renderDialogue(ctx) {
    const cur = G.dlg.q[G.dlg.i];
    if (!cur) return;
    const bx = 32, by = G.dlg.pos === 'top' ? 20 : 320, bw = 576, bh = 144;
    ctx.fillStyle = '#000'; ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.strokeRect(bx, by, bw, bh);

    let tx = bx + 28;
    const plain = stripCodes(cur.text);
    const talking = G.dlg.c < plain.length && (Math.floor(G.time / 5) % 2 === 1);

    if (cur.who === 'flowey') {
      const fmap = { normal: 0, wink: 1, side: 2, pissed: 3, evil: 4, hurt: 5, laugh: 6 };
      const fi = fmap[cur.expr] ?? 0;
      const ff = SPR['flowey_faces'];
      if (ff && ff.img.complete) ctx.drawImage(ff.img, fi * 27, 0, 27, 29, bx + 24, by + 26, 84, 90);
      tx = bx + 128;
    } else if (cur.who === 'toriel') {
      let tspr = 'spr_face_torieltalk';
      if (cur.expr === 'happy') tspr = 'spr_face_torielhappytalk';
      else if (cur.expr === 'side') tspr = 'spr_face_torielblinkside';
      else if (cur.expr === 'cold') tspr = 'spr_face_torielcold';
      else if (cur.expr === 'blush') tspr = 'spr_face_torielembarrassed';
      drawSpr(ctx, tspr, talking ? 1 : 0, bx + 22, by + 22, 3, 3);
      tx = bx + 132;
    } else if (cur.who === 'sans') {
      const smap = { wink: 'spr_face_sanswink', blink: 'spr_face_sansblink', noeyes: 'spr_face_sansnoeyes', dark: 'spr_face_sansnoeyes' };
      drawSpr(ctx, smap[cur.expr] || 'spr_face_sans', 0, bx + 24, by + 24, 2.4, 2.4);
      tx = bx + 132;
    } else if (cur.who === 'papyrus') {
      const pmap = { cool: 'spr_face_papyruscool', mad: 'spr_face_papyrusmad', sweat: 'spr_face_papyrussweat', wacky: 'spr_face_papyruswacky' };
      drawSpr(ctx, pmap[cur.expr] || 'spr_face_papyrus', talking ? 1 : 0, bx + 24, by + 16, 2.4, 2.4);
      tx = bx + 132;
    }

    const availW = bx + bw - tx - 20;
    drawRichText(ctx, cur.text, tx, by + 22, G.dlg.c, {
      size: 25, lineH: 32,
      who: cur.who, expr: cur.expr,
      maxWidth: availW,
      maxHeight: cur.choices ? 66 : 106,
    });

    if (cur.choices && G.dlg.c >= plain.length) {
      const nCh = Math.max(1, cur.choices.length);
      const stepX = Math.min(210, Math.floor((availW - 24) / nCh));
      cur.choices.forEach((ch, idx) => {
        const cx = tx + 26 + idx * stepX, cy = by + 98;
        drawRichText(ctx, ch, cx, cy, 999, {
          size: 23, who: cur.who,
          maxWidth: Math.max(80, stepX - 30), maxHeight: 32,
          color: G.dlg.choiceIdx === idx ? '#ffff00' : '#ffffff',
        });
        if (G.dlg.choiceIdx === idx) drawSpr(ctx, 'spr_heart', 0, cx - 24, cy + 5, 1, 1);
      });
    }
  }

  function renderOverworldMenu(ctx) {
    const zh = G.lang === 'zh', st = G.state, m = G.owMenu;
    // Top-left stat box
    ctx.fillStyle = '#000'; ctx.fillRect(32, 32, 152, 118);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.strokeRect(32, 32, 152, 118);
    drawRichText(ctx, st.name, 48, 44, 999, { size: 24 });
    drawRichText(ctx, `LV  ${st.lv}\nHP  ${st.hp}/${st.maxHp}\nG   ${st.gold}`, 48, 76, 999, { size: 19, lineH: 23 });

    // Menu options box
    ctx.fillStyle = '#000'; ctx.fillRect(32, 164, 152, 148);
    ctx.strokeRect(32, 164, 152, 148);
    const tabs = [zh ? '道具' : 'ITEM', zh ? '狀態' : 'STAT', zh ? '電話' : 'CELL'];
    const maxTabs = st.hasPhone ? 3 : 2;
    for (let i = 0; i < maxTabs; i++) {
      drawRichText(ctx, tabs[i], 80, 182 + i * 40, 999, { size: 24, color: (m.stage === 'root' && m.tab === i) ? '#ffff00' : '#ffffff' });
      if (m.stage === 'root' && m.tab === i) drawSpr(ctx, 'spr_heart', 0, 50, 188 + i * 40, 1, 1);
    }

    if (m.stage === 'item' || m.stage === 'item_act') {
      ctx.fillStyle = '#000'; ctx.fillRect(204, 32, 392, 368);
      ctx.strokeRect(204, 32, 392, 368);
      st.items.forEach((k, i) => {
        const it = window.UT_ITEMS[k];
        drawRichText(ctx, zh ? it.zh : it.en, 256, 52 + i * 34, 999, { size: 24 });
        if (m.stage === 'item' && m.sub === i) drawSpr(ctx, 'spr_heart', 0, 224, 58 + i * 34, 1, 1);
      });
      const acts = zh ? ['使用', '查看', '丟棄'] : ['USE', 'INFO', 'DROP'];
      acts.forEach((a, i) => {
        drawRichText(ctx, a, 248 + i * 116, 352, 999, { size: 24, color: (m.stage === 'item_act' && m.act === i) ? '#ffff00' : '#ffffff' });
        if (m.stage === 'item_act' && m.act === i) drawSpr(ctx, 'spr_heart', 0, 222 + i * 116, 358, 1, 1);
      });
    } else if (m.stage === 'stat') {
      ctx.fillStyle = '#000'; ctx.fillRect(204, 32, 392, 388);
      ctx.strokeRect(204, 32, 392, 388);
      const wIt = window.UT_ITEMS[st.weapon], aIt = window.UT_ITEMS[st.armor];
      const txt = `"${st.name}"\n\nLV  ${st.lv}\nHP  ${st.hp} / ${st.maxHp}\n\nAT  ${10 + st.atk} (${wIt.atk})   EXP: ${st.exp}\nDF  ${10 + st.def} (${aIt.def})   NEXT: ${Math.max(0, 10 - st.exp)}\n\nWEAPON: ${zh ? wIt.zh : wIt.en}\nARMOR:  ${zh ? aIt.zh : aIt.en}\n\nGOLD: ${st.gold}     KILLS: ${st.kills}`;
      drawRichText(ctx, txt, 232, 52, 999, { size: 22, lineH: 27 });
    } else if (m.stage === 'cell') {
      ctx.fillStyle = '#000'; ctx.fillRect(204, 32, 392, 260);
      ctx.strokeRect(204, 32, 392, 260);
      const calls = zh
        ? ['打聲招呼 (Say Hello)', '關於托麗爾 (About Yourself)', '叫她「媽媽」 (Call Her "Mom")', '調情 (Flirt)', '詢問本房謎題 (Puzzle Help)']
        : ['Say Hello', 'About Yourself', 'Call Her "Mom"', 'Flirt', 'Puzzle Help'];
      calls.forEach((c, i) => {
        drawRichText(ctx, c, 256, 54 + i * 40, 999, { size: 23 });
        if (m.sub === i) drawSpr(ctx, 'spr_heart', 0, 224, 60 + i * 40, 1, 1);
      });
    }
  }

  function renderSaveMenu(ctx) {
    const zh = G.lang === 'zh', sm = G.saveMenu;
    ctx.fillStyle = '#000'; ctx.fillRect(108, 124, 424, 184);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.strokeRect(108, 124, 424, 184);
    const col = sm.saved ? '#ffff00' : '#ffffff';
    const mins = Math.floor(G.state.playTicks / 3600), secs = String(Math.floor((G.state.playTicks % 3600) / 60)).padStart(2, '0');
    drawRichText(ctx, G.state.name, 138, 146, 999, { size: 26, color: col });
    drawRichText(ctx, `LV ${G.state.lv}`, 292, 146, 999, { size: 26, color: col });
    drawRichText(ctx, `${mins}:${secs}`, 426, 146, 999, { size: 26, color: col });
    drawRichText(ctx, sm.roomTitle, 138, 192, 999, { size: 25, color: col });
    if (sm.saved) {
      drawRichText(ctx, zh ? '存檔完成。' : 'File saved.', 168, 248, 999, { size: 26, color: '#ffff00' });
    } else {
      drawRichText(ctx, zh ? '存檔' : 'Save', 170, 248, 999, { size: 26 });
      drawRichText(ctx, zh ? '返回' : 'Return', 350, 248, 999, { size: 26 });
      drawSpr(ctx, 'spr_heart', 0, sm.cur === 0 ? 138 : 318, 254, 1, 1);
    }
  }

  function renderFinale(ctx) {
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480);
    ctx.save(); ctx.scale(2, 2);
    drawSpr(ctx, 'spr_undertaletitle', 0, 0, -28, 1, 1);
    ctx.restore();
    const zh = G.lang === 'zh', st = G.state;
    const route = (st.kills === 0 && !st.flags.torielKilled)
      ? (zh ? '和平路線 (True Pacifist Route)' : 'TRUE PACIFIST ROUTE')
      : (zh ? '中立路線 (Neutral Route)' : 'NEUTRAL ROUTE');
    const mins = Math.floor(st.playTicks / 3600), secs = String(Math.floor((st.playTicks % 3600) / 60)).padStart(2, '0');
    drawRichText(ctx, zh ? '— 遺跡篇完整通關！感謝遊玩 —' : '— END OF THE RUINS —', 148, 252, 999, { size: 26, color: '#ffff00' });
    drawRichText(ctx, `${route}\nLV ${st.lv}   EXP ${st.exp}   GOLD ${st.gold}G   TIME ${mins}:${secs}`, 118, 304, 999, { size: 23, lineH: 34 });
    drawRichText(ctx, zh ? '[按 Z 返回標題選單]' : '[Press Z to return to Title]', 172, 412, 999, { size: 22, color: '#999999' });
  }

  // =========================================================================
  // UNIFIED KEY / BUTTON HANDLERS
  // =========================================================================
  function pressConfirm() {
    G.sfx.unlock();
    if (G.fade.dir !== 0) return;

    if (G.mode === 'intro') {
      const txt = G.D().introSlides[G.intro.slide] || '';
      if (G.intro.c < txt.length) G.intro.c = txt.length;
      else advanceIntroSlide();
      return;
    }
    if (G.mode === 'intro_pan') { G.startFade(() => G.enterRoom(3)); return; }
    if (G.mode === 'title') {
      G.mode = 'file_menu'; G.fileCur = 0; G.sfx.playBGM('menu'); return;
    }
    if (G.mode === 'file_menu') {
      G.sfx.sfx('select', 0.65);
      if (G.fileCur === 0 && G.savedMeta) G.reloadFromSave();
      else {
        G.state = JSON.parse(JSON.stringify(G.state));
        G.savedMeta = null;
        try { localStorage.removeItem('undertale_ruins_1to1_save_v1'); } catch (_) {}
        const fresh = window.UTOverworldFactory.createGame(document.createElement('canvas')).G.state;
        G.state = fresh;
        G.startFade(() => G.enterRoom(4, 140, 120, 'down'));
      }
      return;
    }
    if (G.mode === 'finale') { G.startFade(() => G.enterRoom(3)); return; }
    if (G.mode === 'flowey_battle') { G.fb.confirm(); return; }
    if (G.mode === 'rpg_battle') { G.rpg.confirm(); return; }
    if (G.mode === 'asriel_battle') { G.asriel?.onConfirm(); return; }
    if (G.mode === 'undyne_battle') { G.undyne?.onConfirm(); return; }
    if (G.mode === 'dbs_battle') { window.UTDBS?.pulseKey('confirm'); return; }

    if (G.mode === 'save_menu') {
      if (G.saveMenu.saved) { G.mode = 'explore'; return; }
      if (G.saveMenu.cur === 0) {
        G.saveGame(); G.saveMenu.saved = true; G.sfx.sfx('save', 0.8);
      } else { G.mode = 'explore'; G.sfx.sfx('squeak', 0.5); }
      return;
    }

    if (G.mode === 'ow_menu') {
      const m = G.owMenu, st = G.state, zh = G.lang === 'zh';
      G.sfx.sfx('select', 0.55);
      if (m.stage === 'root') {
        if (m.tab === 0) { if (st.items.length) { m.stage = 'item'; m.sub = 0; } }
        else if (m.tab === 1) m.stage = 'stat';
        else if (m.tab === 2 && st.hasPhone) { m.stage = 'cell'; m.sub = 0; }
      } else if (m.stage === 'item') {
        m.stage = 'item_act'; m.act = 0;
      } else if (m.stage === 'item_act') {
        const key = st.items[m.sub], it = window.UT_ITEMS[key];
        if (m.act === 0) { // USE
          G.mode = 'explore';
          if (it.type === 'weapon') { st.items[m.sub] = st.weapon; st.weapon = key; G.say(zh ? `* 你裝備了${it.zh}。` : `* You equipped the ${it.en}.`); }
          else if (it.type === 'armor') { st.items[m.sub] = st.armor; st.armor = key; G.say(zh ? `* 你穿戴了${it.zh}。` : `* You equipped the ${it.en}.`); }
          else {
            st.items.splice(m.sub, 1);
            st.hp = Math.min(st.maxHp, st.hp + it.hp); G.sfx.sfx('heal', 0.75);
            G.say(zh ? `* 你使用了${it.zh}，恢復了 HP！` : `* You used the ${it.en}.\n* HP restored!`);
          }
        } else if (m.act === 1) { // INFO
          G.mode = 'explore';
          G.say(zh ? it.descZh : it.descEn);
        } else { // DROP
          st.items.splice(m.sub, 1); G.mode = 'explore';
          G.say(zh ? `* 你丟棄了${it.zh}。` : `* The ${it.en} was thrown away.`);
        }
      } else if (m.stage === 'cell') {
        G.mode = 'explore'; G.sfx.sfx('phone', 0.7);
        if (G.state.room >= 31) {
          G.say(zh ? '* 嘟……但沒有人接聽。' : "* Ring...\n* Nobody picked up.");
          return;
        }
        if (m.sub === 0) G.sayKey('phoneHello');
        else if (m.sub === 1) G.sayKey('phoneAbout');
        else if (m.sub === 2) { const k = st.calledMom ? 'phoneMom2' : 'phoneMom1'; st.calledMom = true; G.sayKey(k); }
        else if (m.sub === 3) { const k = st.flirtedMom ? 'phoneFlirt2' : 'phoneFlirt1'; st.flirtedMom = true; G.sayKey(k); }
        else {
          const step = window.UT_WALKTHROUGH.slice().reverse().find(w => w.room <= G.state.room) || window.UT_WALKTHROUGH[0];
          const tip = zh ? step.tipZh : step.tipEn;
          G.say([{ who: 'toriel', expr: 'happy', text: `* ${tip}` }]);
        }
      }
      return;
    }

    if (G.mode === 'dlg') {
      const cur = G.dlg.q[G.dlg.i];
      const plain = stripCodes(cur.text);
      if (G.dlg.c < plain.length) { G.dlg.c = plain.length; return; }
      const cKey = cur.choiceKey, cIdx = G.dlg.choiceIdx;
      G.dlg.i++;
      if (G.dlg.i < G.dlg.q.length) {
        G.dlg.c = 0; G.dlg.t = 0; G.dlg.choiceIdx = 0;
      } else {
        const cb = G.dlg.cb; G.mode = 'explore';
        if (cKey) G.resolveChoice(cKey, cIdx);
        if (cb) cb();
      }
      return;
    }

    if (G.mode === 'explore') G.interact();
  }

  function pressCancel() {
    G.sfx.unlock();
    if (G.mode === 'intro' || G.mode === 'intro_pan') { G.startFade(() => G.enterRoom(3)); return; }
    if (G.mode === 'flowey_battle') { G.fb.skip(); return; }
    if (G.mode === 'rpg_battle') { G.rpg.cancel(); return; }
    if (G.mode === 'asriel_battle') { G.asriel?.onCancel(); return; }
    if (G.mode === 'undyne_battle') { G.undyne?.onCancel(); return; }
    if (G.mode === 'dbs_battle') { window.UTDBS?.pulseKey('cancel'); return; }
    if (G.mode === 'dlg') {
      const cur = G.dlg.q[G.dlg.i];
      if (cur) G.dlg.c = stripCodes(cur.text).length;
      return;
    }
    if (G.mode === 'save_menu') { G.mode = 'explore'; G.sfx.sfx('squeak', 0.5); return; }
    if (G.mode === 'ow_menu') {
      G.sfx.sfx('squeak', 0.5);
      if (G.owMenu.stage === 'item_act') G.owMenu.stage = 'item';
      else if (G.owMenu.stage !== 'root') G.owMenu.stage = 'root';
      else G.mode = 'explore';
    }
  }

  function pressMenu() {
    G.sfx.unlock();
    if (G.mode === 'explore' && G.state.room >= 4) {
      G.mode = 'ow_menu'; G.owMenu = { tab: 0, stage: 'root', sub: 0, act: 0 };
      G.sfx.sfx('squeak', 0.55);
    } else if (G.mode === 'ow_menu') {
      G.mode = 'explore'; G.sfx.sfx('squeak', 0.55);
    }
  }

  function navDir(dir) {
    if (G.mode === 'file_menu' && (dir === 'left' || dir === 'right')) {
      G.fileCur ^= 1; G.sfx.sfx('squeak', 0.5);
    } else if (G.mode === 'save_menu' && !G.saveMenu.saved && (dir === 'left' || dir === 'right')) {
      G.saveMenu.cur ^= 1; G.sfx.sfx('squeak', 0.5);
    } else if (G.mode === 'dlg') {
      const cur = G.dlg.q[G.dlg.i];
      if (cur && cur.choices && (dir === 'left' || dir === 'right')) {
        G.dlg.choiceIdx = (G.dlg.choiceIdx + 1) % cur.choices.length;
        G.sfx.sfx('squeak', 0.5);
      }
    } else if (G.mode === 'ow_menu') {
      const m = G.owMenu, maxTabs = G.state.hasPhone ? 3 : 2;
      if (m.stage === 'root' && (dir === 'up' || dir === 'down')) {
        m.tab = (m.tab + (dir === 'up' ? -1 : 1) + maxTabs) % maxTabs; G.sfx.sfx('squeak', 0.5);
      } else if (m.stage === 'item' && (dir === 'up' || dir === 'down')) {
        const n = G.state.items.length;
        m.sub = (m.sub + (dir === 'up' ? -1 : 1) + n) % n; G.sfx.sfx('squeak', 0.5);
      } else if (m.stage === 'item_act' && (dir === 'left' || dir === 'right')) {
        m.act = (m.act + (dir === 'left' ? 2 : 1)) % 3; G.sfx.sfx('squeak', 0.5);
      } else if (m.stage === 'cell' && (dir === 'up' || dir === 'down')) {
        m.sub = (m.sub + (dir === 'up' ? 4 : 1)) % 5; G.sfx.sfx('squeak', 0.5);
      }
    } else if (G.mode === 'rpg_battle') {
      G.rpg.move(dir);
    } else if (G.mode === 'asriel_battle') {
      G.asriel?.onNav(dir);
    } else if (G.mode === 'undyne_battle') {
      G.undyne?.onNav(dir);
    } else if (G.mode === 'dbs_battle') {
      window.UTDBS?.pulseKey(dir);
    }
  }

  // =========================================================================
  // KEYBOARD + HUGE SIMULATED KEYBOARD ARROW PAD & MULTI-TOUCH ACTION KEYS
  // =========================================================================
  const kbState = {};
  const touchState = { up: false, down: false, left: false, right: false, cancel: false, confirm: false };
  function syncKeys() {
    G.keys.up      = !!(kbState.up      || touchState.up);
    G.keys.down    = !!(kbState.down    || touchState.down);
    G.keys.left    = !!(kbState.left    || touchState.left);
    G.keys.right   = !!(kbState.right   || touchState.right);
    G.keys.cancel  = !!(kbState.cancel  || touchState.cancel);
    G.keys.confirm = !!(kbState.confirm || touchState.confirm);
    G.keys.moveScale = 1.0;
    if (G.mode === 'dbs_battle') window.UTDBS?.syncHeld(G.keys);
    document.querySelectorAll('[data-dir]').forEach(el => {
      el.classList.toggle('active', !!G.keys[el.dataset.dir]);
    });
  }

  const KEY_DIR = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right' };
  window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
    if (G.mode === 'dbs_battle' && window.UTDBS?.isTyping?.() && document.activeElement?.id !== 'owMobInput') {
      if (e.key === 'Backspace') { e.preventDefault(); window.UTDBS.typeText('\b'); return; }
      if (e.key.length === 1 && !/[zx]/i.test(e.key) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.UTDBS.typeText(e.key);
        return;
      }
    }
    if (e.repeat) return;
    if (e.code === 'Escape' && G.mode === 'dbs_battle') { e.preventDefault(); window.UTDBS?.escape(); return; }
    if (KEY_DIR[e.code]) { kbState[KEY_DIR[e.code]] = true; navDir(KEY_DIR[e.code]); syncKeys(); }
    else if (e.code === 'KeyZ' || e.code === 'Enter' || e.code === 'Space') { kbState.confirm = true; pressConfirm(); syncKeys(); }
    else if (e.code === 'KeyX' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') { kbState.cancel = true; pressCancel(); syncKeys(); }
    else if (e.code === 'KeyC' || e.code === 'ControlLeft' || e.code === 'ControlRight') pressMenu();
  });
  window.addEventListener('keyup', (e) => {
    if (KEY_DIR[e.code]) { kbState[KEY_DIR[e.code]] = false; syncKeys(); }
    else if (e.code === 'KeyZ' || e.code === 'Enter' || e.code === 'Space') { kbState.confirm = false; syncKeys(); }
    else if (e.code === 'KeyX' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') { kbState.cancel = false; syncKeys(); }
  });

  // Huge discrete keyboard arrow pad (#kbArrows): instant frame-0 press, multi-touch diagonals, smooth thumb-slide across keys!
  const kbArrows = document.getElementById('kbArrows');
  const activeKeyTouches = new Map(); // touchId -> dir
  let mouseHeldDir = null;
  let menuNavRepeatTimer = null;
  let menuNavRepeatDir = null;

  function recomputeArrowTouches() {
    const prev = { up: touchState.up, down: touchState.down, left: touchState.left, right: touchState.right };
    touchState.up = touchState.down = touchState.left = touchState.right = false;
    for (const d of activeKeyTouches.values()) { if (d) touchState[d] = true; }
    if (mouseHeldDir) touchState[mouseHeldDir] = true;
    for (const d of ['up', 'down', 'left', 'right']) {
      if (touchState[d] && !prev[d]) {
        navDir(d);
        startMenuRepeat(d);
      }
    }
    if (!touchState.up && !touchState.down && !touchState.left && !touchState.right) stopMenuRepeat();
    syncKeys();
  }

  function startMenuRepeat(dir) {
    stopMenuRepeat();
    menuNavRepeatDir = dir;
    menuNavRepeatTimer = setTimeout(() => {
      menuNavRepeatTimer = setInterval(() => {
        if (menuNavRepeatDir && touchState[menuNavRepeatDir]) {
          // Only auto-repeat in menus, not during Green SOUL shield holding / combat dodging
          if (G.mode !== 'explore'
            && !(G.mode === 'undyne_battle' && G.undyne?.sub === 'dodge')
            && !(G.mode === 'asriel_battle' && G.asriel?.sub === 'dodge')
            && !(G.mode === 'dbs_battle' && window.UTDBS?.inCombat?.())) {
            navDir(menuNavRepeatDir);
          }
        } else stopMenuRepeat();
      }, 135);
    }, 240);
  }
  function stopMenuRepeat() {
    if (menuNavRepeatTimer) { clearTimeout(menuNavRepeatTimer); clearInterval(menuNavRepeatTimer); menuNavRepeatTimer = null; }
    menuNavRepeatDir = null;
  }

  function dirAtPoint(x, y) {
    const el = document.elementFromPoint(x, y);
    const btn = el?.closest?.('[data-dir]');
    return btn ? btn.dataset.dir : null;
  }

  if (kbArrows) {
    kbArrows.addEventListener('touchstart', (e) => {
      e.preventDefault(); G.sfx.unlock();
      for (const t of e.changedTouches) {
        const d = t.target?.closest?.('[data-dir]')?.dataset.dir || dirAtPoint(t.clientX, t.clientY);
        if (d) activeKeyTouches.set(t.identifier, d);
      }
      recomputeArrowTouches();
    }, { passive: false });
    kbArrows.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (!activeKeyTouches.has(t.identifier)) continue;
        const d = dirAtPoint(t.clientX, t.clientY);
        if (d) activeKeyTouches.set(t.identifier, d);
        else activeKeyTouches.delete(t.identifier);
      }
      recomputeArrowTouches();
    }, { passive: false });
    const endTouch = (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) activeKeyTouches.delete(t.identifier);
      recomputeArrowTouches();
    };
    kbArrows.addEventListener('touchend', endTouch, { passive: false });
    kbArrows.addEventListener('touchcancel', endTouch, { passive: false });

    // Mouse support for desktop click-and-hold / drag on virtual arrow keys
    kbArrows.addEventListener('mousedown', (e) => {
      const d = e.target?.closest?.('[data-dir]')?.dataset.dir;
      if (!d) return;
      e.preventDefault(); G.sfx.unlock();
      mouseHeldDir = d;
      recomputeArrowTouches();
    });
    window.addEventListener('mousemove', (e) => {
      if (!mouseHeldDir) return;
      const d = dirAtPoint(e.clientX, e.clientY);
      if (d && d !== mouseHeldDir) { mouseHeldDir = d; recomputeArrowTouches(); }
    });
    window.addEventListener('mouseup', () => {
      if (mouseHeldDir) { mouseHeldDir = null; recomputeArrowTouches(); }
    });
  }

  // Multi-touch Action Buttons (Z, X, C)
  function bindActionBtn(id, onDown, onUp) {
    const el = document.getElementById(id);
    if (!el) return;
    const down = (e) => { e.preventDefault(); G.sfx.unlock(); el.classList.add('active'); onDown(); };
    const up = (e) => { e.preventDefault(); el.classList.remove('active'); if (onUp) onUp(); };
    el.addEventListener('touchstart', down, { passive: false });
    el.addEventListener('touchend', up, { passive: false });
    el.addEventListener('touchcancel', up, { passive: false });
    el.addEventListener('mousedown', down);
    el.addEventListener('mouseup', up);
    el.addEventListener('mouseleave', up);
  }
  bindActionBtn('btnActZ', () => { touchState.confirm = true; pressConfirm(); syncKeys(); }, () => { touchState.confirm = false; syncKeys(); });
  bindActionBtn('btnActX', () => { touchState.cancel = true; pressCancel(); syncKeys(); }, () => { touchState.cancel = false; syncKeys(); });
  bindActionBtn('btnActC', () => pressMenu());
  const owMobInput = document.getElementById('owMobInput');
  document.getElementById('btnOwType')?.addEventListener('click', () => {
    if (owMobInput) { owMobInput.value = ''; owMobInput.focus(); }
  });
  owMobInput?.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if (e.key === 'Backspace') { e.preventDefault(); window.UTDBS?.typeText('\b'); }
    else if (e.key === 'Enter') { e.preventDefault(); owMobInput.blur(); pressConfirm(); }
    else if (e.key === 'Escape') { e.preventDefault(); owMobInput.blur(); }
  });
  owMobInput?.addEventListener('input', () => {
    const v = owMobInput.value; owMobInput.value = '';
    if (v) window.UTDBS?.typeText(v);
  });
  canvas.addEventListener('pointerdown', (e) => {
    G.sfx.unlock(); canvas.focus();
    const r = canvas.getBoundingClientRect();
    const cx = ((e.clientX - r.left) / r.width) * 640;
    const cy = ((e.clientY - r.top) / r.height) * 480;
    if (G.mode === 'asriel_battle' && G.asriel) {
      G.asriel.onCanvasTap(cx, cy);
    } else if (G.mode === 'undyne_battle' && G.undyne) {
      G.undyne.onCanvasTap(cx, cy);
    }
  });

  // =========================================================================
  // HEADER CONTROLS & INTERACTIVE FULL RUINS WALKTHROUGH GUIDE
  // =========================================================================
  function jumpToWalkthroughRoom(roomId) {
    G.sfx.unlock();
    const fl = G.state.flags;
    if (roomId >= 6) fl.floweyDone = true;
    if (roomId >= 12) { G.state.hasPhone = true; fl.r11_done = true; }
    if (roomId >= 32) { G.state.hasPhone = true; fl.r31_done = true; }
    if (roomId >= 38) { G.state.hasPhone = true; fl.torBasement = true; }
    if (roomId >= 43) { fl.torielDone = true; }
    if (roomId >= 44) { G.state.hasPhone = true; fl.r11_done = true; fl.r31_done = true; fl.torBasement = true; fl.floweyDone = true; }
    G.startFade(() => G.enterRoom(roomId));
  }

  function renderWalkthroughList() {
    const listEl = document.getElementById('wtList');
    const selEl = document.getElementById('roomJumpSel');
    if (!listEl) return;
    const zh = G.lang === 'zh';
    listEl.innerHTML = '';
    if (selEl) {
      selEl.innerHTML = `<option value="">${zh ? '快速跳關 (廢墟 + 雪鎮) ▾' : 'Jump Scene (Ruins + Snowdin) ▾'}</option>`;
    }
    window.UT_WALKTHROUGH.forEach((step) => {
      const title = zh ? step.titleZh : step.titleEn;
      const tip = zh ? step.tipZh : step.tipEn;
      const active = G.state.room === step.room;
      const card = document.createElement('div');
      card.className = 'wt-step' + (active ? ' current' : '');
      card.innerHTML = `
        <div class="wt-step-hdr">
          <span class="wt-step-title">${title}</span>
          <button class="wt-jump-btn" data-room="${step.room}">${zh ? '前往 ▶' : 'Play ▶'}</button>
        </div>
        <p class="wt-step-tip">${tip}</p>
      `;
      card.querySelector('.wt-jump-btn').addEventListener('click', () => {
        jumpToWalkthroughRoom(step.room);
        document.getElementById('wtDrawer')?.classList.remove('open');
      });
      listEl.appendChild(card);

      if (selEl) {
        const opt = document.createElement('option');
        opt.value = step.room; opt.textContent = title;
        selEl.appendChild(opt);
      }
    });
  }

  G.onUI = function() {
    const zh = G.lang === 'zh';
    const rName = G.mode === 'dbs_battle'
      ? (window.UTDBS?.getBossName?.() || (zh ? '9 大頭目戰鬥模擬器' : '9-BOSS BATTLE SIMULATOR'))
      : G.mode === 'asriel_battle'
        ? (zh ? '艾斯利爾·逐夢 (7 SOULs 終極決戰)' : 'ASRIEL DREEMURR (7 SOULs Finale)')
        : G.mode === 'undyne_battle'
          ? (zh ? '不滅的安黛因 (真正的英雄之戰)' : 'UNDYNE THE UNDYING (Genocide Boss)')
          : (G.D().roomNames[G.state.room] || `Room ${G.state.room}`);
    const lbl = document.getElementById('roomLabel');
    if (lbl) lbl.textContent = (G.mode === 'asriel_battle' || G.mode === 'undyne_battle' || G.mode === 'dbs_battle') ? rName : `${rName} (#${G.state.room})`;

    const inDBS = G.mode === 'dbs_battle';
    const bExit = document.getElementById('btnOwExitBattle');
    const bExitQ = document.getElementById('btnOwExitQuick');
    const bType = document.getElementById('btnOwType');
    if (bExit) bExit.style.display = inDBS ? '' : 'none';
    if (bExitQ) bExitQ.style.display = inDBS ? '' : 'none';
    if (bType) bType.style.display = (inDBS && window.UTDBS?.isTyping?.()) ? 'flex' : 'none';

    const shOn = !!(G.noHitShield || window.UT_NO_HIT_SHIELD);
    for (const sid of ['btnShield', 'btnShieldQuick']) {
      const sb = document.getElementById(sid);
      if (!sb) continue;
      sb.classList.toggle('shield-on', shOn);
      sb.textContent = sid === 'btnShieldQuick'
        ? (shOn ? '🛡ON' : '🛡')
        : (shOn ? (zh ? '🛡 無傷護盾 ON' : '🛡 Shield ON') : (zh ? '🛡 無傷護盾 OFF' : '🛡 Shield OFF'));
    }

    const gb = document.getElementById('btnGeno');
    if (gb) {
      const st = G.state, rk = st.ruinsKills || 0, sk = st.snowdinKills || 0;
      const on = G.isGenocideActive();
      const prog = st.room <= 43 ? `${Math.min(rk, 20)}/20` : `${Math.min(sk, 16)}/16`;
      gb.classList.toggle('danger', on);
      gb.textContent = (on ? '💀 ' : '☠ ') + (zh ? (on ? '滅絕路線 ' : '滅絕 ') : 'Genocide ') + prog;
    }
    const step = window.UT_WALKTHROUGH.slice().reverse().find(w => w.room <= G.state.room) || window.UT_WALKTHROUGH[0];
    const hint = document.getElementById('liveWalkthroughHint');
    if (hint) {
      hint.textContent = inDBS
        ? (zh ? '⚔ 9 大頭目戰鬥引擎：方向鍵移動，[Z] 確認 / 射擊，[X] 返回 / 減速，[ESC] 返回階段選單，[Exit] 回到地圖。' : '⚔ 9-BOSS SIMULATOR: Arrows move · [Z] Confirm · [X] Back/Slow · [ESC] Attack/Phase Menu · [Exit] Back to Map.')
        : G.mode === 'asriel_battle'
          ? (zh ? '★ 艾斯利爾 (7 個靈魂)：選「完整決戰」或「單一招式練習」；方向鍵閃躲，[Z] 確認 / 黃魂射擊！' : '★ ASRIEL DREEMURR (7 SOULs): Play Normal Mode, Phase Select, or Single Attack Practice! Arrows move, [Z] Confirm.')
          : G.mode === 'undyne_battle'
            ? (zh ? '💚 不滅的安黛因：方向鍵 / 大型鍵盤十字鍵 / 點擊畫面四方擋住飛矛！注意黃色反轉箭頭！' : '💚 UNDYNE THE UNDYING: Point your spear shield (Arrow Keys or tap screen sides) to block! Watch for yellow reverse arrows!')
            : `♥ ${zh ? step.tipZh : step.tipEn}`;
    }
    renderWalkthroughList();
  };

  const toggleShield = () => {
    G.sfx.unlock();
    const next = !(G.noHitShield || window.UT_NO_HIT_SHIELD);
    window.UT_NO_HIT_SHIELD = next;
    G.noHitShield = next;
    window.UTDBS?.setShield(next);
    G.sfx.sfx(next ? 'heal' : 'select', 0.65);
    G.onUI();
  };
  document.getElementById('btnMenuToggle')?.addEventListener('click', () => {
    document.getElementById('topToolbar')?.classList.toggle('open');
  });
  document.getElementById('roomJumpSel')?.addEventListener('change', (e) => {
    const r = parseInt(e.target.value, 10); e.target.value = '';
    if (r) { jumpToWalkthroughRoom(r); document.getElementById('topToolbar')?.classList.remove('open'); }
  });
  document.getElementById('btnGeno')?.addEventListener('click', () => {
    G.sfx.unlock();
    if (G.mode === 'rpg_battle' || G.mode === 'flowey_battle' || G.mode === 'asriel_battle' || G.mode === 'undyne_battle' || G.mode === 'dbs_battle') return;
    G.toggleGenocideRoute();
    G.onUI();
  });
  document.getElementById('btnDBSMenu')?.addEventListener('click', () => {
    G.openDBSMenu(0, 0); document.getElementById('topToolbar')?.classList.remove('open');
  });
  document.getElementById('btnAsriel')?.addEventListener('click', () => {
    G.startDBS('asriel'); document.getElementById('topToolbar')?.classList.remove('open');
  });
  document.getElementById('btnUndyne')?.addEventListener('click', () => {
    G.startDBS('undyne'); document.getElementById('topToolbar')?.classList.remove('open');
  });
  const exitDBSBattle = () => {
    window.UTDBS?.abortToOverworld();
    document.getElementById('topToolbar')?.classList.remove('open');
  };
  document.getElementById('btnOwExitBattle')?.addEventListener('click', exitDBSBattle);
  document.getElementById('btnOwExitQuick')?.addEventListener('click', exitDBSBattle);
  document.getElementById('btnShield')?.addEventListener('click', toggleShield);
  document.getElementById('btnShieldQuick')?.addEventListener('click', toggleShield);
  document.getElementById('btnLang')?.addEventListener('click', () => {
    G.lang = G.lang === 'en' ? 'zh' : 'en';
    G.onUI();
  });
  document.getElementById('btnMute')?.addEventListener('click', (e) => {
    G.sfx.unlock();
    G.sfx.setMuted(!G.sfx.muted);
    window.UTDBS?.setMuted(G.sfx.muted);
    e.currentTarget.textContent = G.sfx.muted ? '🔇 Muted' : '🔊 Audio';
  });
  document.getElementById('btnWalkthrough')?.addEventListener('click', () => {
    document.getElementById('wtDrawer')?.classList.toggle('open');
    document.getElementById('topToolbar')?.classList.remove('open');
  });
  document.getElementById('btnCloseWt')?.addEventListener('click', () => {
    document.getElementById('wtDrawer')?.classList.remove('open');
  });
  document.getElementById('btnFullscreen')?.addEventListener('click', () => {
    document.body.classList.toggle('immersive');
    if (document.documentElement.requestFullscreen && document.body.classList.contains('immersive')) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Crisp fixed-timestep 60fps Overworld/RPG + canonical 30fps interpolated Boss Battles!
  let lastTs = 0, acc = 0, bAcc = 0;
  const STEP60 = 1000 / 60, STEP30 = 1000 / 30;
  function frame(ts) {
    if (!lastTs) lastTs = ts;
    const dt = Math.min(100, ts - lastTs); lastTs = ts;
    if (G.mode === 'dbs_battle') {
      window.UTDBS?.step(dt);
      acc = 0; bAcc = 0; G._battleInterp = 1.0;
    } else if (G.mode === 'asriel_battle' || G.mode === 'undyne_battle') {
      bAcc += dt;
      while (bAcc >= STEP30) {
        G.keys.moveScale = 1.0;
        if (G.mode === 'asriel_battle') G.asriel?.step30(G.keys);
        else if (G.mode === 'undyne_battle') G.undyne?.step30(G.keys);
        bAcc -= STEP30;
      }
      G._battleInterp = bAcc / STEP30;
      acc = 0;
    } else {
      acc += dt; bAcc = 0; G._battleInterp = 1.0;
      while (acc >= STEP60) {
        G.keys.moveScale = 1.0;
        update();
        acc -= STEP60;
      }
    }
    render();
    requestAnimationFrame(frame);
  }

  G.enterRoom(1);
  requestAnimationFrame(frame);
})();
