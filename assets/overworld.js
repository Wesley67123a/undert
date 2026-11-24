// Undertale Ruins 1:1 Overworld Physics, Puzzles, Cutscenes, Menu & Save System
(function() {
  'use strict';

  const SAVE_KEY = 'undertale_ruins_1to1_save_v1';

  // Preload room PNGs lazily & cache
  const ROOM_IMGS = {};
  function getRoomImg(id, dark = false) {
    const key = dark ? `${id}_dark` : String(id);
    if (!ROOM_IMGS[key]) {
      const im = new Image();
      im.src = `assets/rooms/room_${key}.png`;
      ROOM_IMGS[key] = im;
    }
    return ROOM_IMGS[key];
  }

  function defaultState() {
    return {
      name: 'FRISK', lv: 1, exp: 0, hp: 20, maxHp: 20, atk: 0, def: 0, gold: 20, kills: 0,
      weapon: 'Stick', armor: 'Bandage',
      items: ['Candy'],
      hasPhone: false, calledMom: false, flirtedMom: false,
      piePref: 'Butterscotch',
      room: 1, playTicks: 0,
      flags: {}, // persistent puzzle/story flags
      scriptedFrog: false
    };
  }

  // Safe spike-bridge coordinates in room_ruins5 (10)
  const BRIDGE_SAFE_RECT = { x: 820, y: 95, w: 320, h: 88 };

  function createGame(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const Core = window.UTEngineCore;
    const sfx = new Core.UTSoundEngine();

    const G = {
      canvas, ctx, sfx,
      lang: 'en',
      mode: 'intro', // intro | intro_pan | title | file_menu | explore | dlg | ow_menu | save_menu | enc_alert | enc_flash | flowey_battle | rpg_battle | fall | finale
      time: 0,
      state: defaultState(),
      savedMeta: null,
      camX: 0, camY: 0,
      fade: { a: 0, dir: 0, mid: null },
      frisk: { x: 140, y: 120, dir: 'down', walk: 0, moving: false, alpha: 1 },
      tor: { vis: false, x: 0, y: 0, dir: 'down', walk: 0, moving: false, hug: false, wp: [] },
      flowey: { vis: false, x: 148, y: 285, rise: 0 },
      rocks: [], holes: [], spiders: [], stepCount: 0,
      intro: { slide: 0, c: 0, t: 0, panY: 0 },
      fileCur: 0,
      dlg: { q: [], i: 0, c: 0, t: 0, pos: 'bottom', choiceIdx: 0, cb: null },
      owMenu: { tab: 0, stage: 'root', sub: 0, act: 0 }, // root | item | item_act | stat | cell
      saveMenu: { cur: 0, saved: false, roomTitle: '' },
      enc: { timer: 0, enemy: 'froggit', cb: null },
      fallAnim: { vy: 0, ticks: 0 },
      keys: { up: false, down: false, left: false, right: false, cancel: false },
      D() { return window.UT_DIALOGUE[this.lang]; }
    };

    G.fb = Core.createFloweyBattle(G);
    G.rpg = Core.createRPGBattle(G);

    // Load saved metadata if available
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) G.savedMeta = JSON.parse(raw);
    } catch (_) {}

    G.saveGame = function() {
      const snap = JSON.parse(JSON.stringify(G.state));
      snap.savedX = G.frisk.x; snap.savedY = G.frisk.y;
      G.savedMeta = snap;
      try { localStorage.setItem(SAVE_KEY, JSON.stringify(snap)); } catch (_) {}
    };

    G.reloadFromSave = function() {
      if (G.savedMeta) {
        G.state = JSON.parse(JSON.stringify(G.savedMeta));
        G.state.hp = G.state.maxHp;
        G.startFade(() => G.enterRoom(G.state.room, G.savedMeta.savedX, G.savedMeta.savedY, 'down'));
      } else {
        G.state = defaultState();
        G.startFade(() => G.enterRoom(4, 140, 120, 'down'));
      }
    };

    G.startFade = function(mid) {
      G.fade = { a: 0.02, dir: 1, mid };
    };

    G.say = function(entries, cb = null, pos = 'auto') {
      const list = (Array.isArray(entries) ? entries : [entries]).map(e =>
        typeof e === 'string' ? { who: 'narrator', text: e } : e
      );
      G.mode = 'dlg';
      const screenY = G.frisk.y - G.camY;
      G.dlg = {
        q: list, i: 0, c: 0, t: 0, choiceIdx: 0, cb,
        pos: pos === 'auto' ? (screenY > 130 ? 'top' : 'bottom') : pos
      };
    };

    G.sayKey = function(key, cb = null, pos = 'auto') {
      const val = G.D()[key];
      if (!val) { if (cb) cb(); return; }
      G.say(val, cb, pos);
    };

    // =======================================================================
    // ROOM ENTRY (1..43)
    // =======================================================================
    G.enterRoom = function(id, spawnX, spawnY, dir = 'down') {
      G.state.room = id;
      G.holes = []; G.spiders = []; G.rocks = []; G.tor.vis = false; G.tor.hug = false; G.tor.wp = [];
      G.flowey.vis = false; G.stepCount = 0;

      if (id === 1) {
        G.mode = 'intro'; G.intro = { slide: 0, c: 0, t: 0, panY: 0 };
        sfx.playBGM('story'); G.onUI?.(); return;
      }
      if (id === 2) {
        G.mode = 'intro_pan'; G.intro.panY = 0;
        sfx.playBGM('intronoise'); G.onUI?.(); return;
      }
      if (id === 3) {
        G.mode = 'title'; sfx.stopBGM(); sfx.sfx('b', 0.8);
        G.onUI?.(); return;
      }
      if (id === 999) {
        G.mode = 'finale'; sfx.stopBGM(); sfx.sfx('b', 0.85);
        G.onUI?.(); return;
      }

      getRoomImg(id);
      if (id + 1 <= 43) getRoomImg(id + 1);

      const R = window.UT_GMC_ROOMS[id];
      G.mode = 'explore';
      const defM = R.markers.A || R.markers.X || R.markers.C || R.markers.B || [150, 160];
      G.frisk.x = spawnX ?? defM[0];
      G.frisk.y = spawnY ?? defM[1];
      G.frisk.dir = dir; G.frisk.moving = false; G.frisk.alpha = 1;

      // Room BGM selection
      if (id === 4) sfx.stopBGM();
      else if (id === 5) {
        if (!G.state.flags.floweyDone) { G.flowey.vis = true; G.flowey.x = 148; G.flowey.y = 285; sfx.stopBGM(); }
        else sfx.playBGM('fallendown');
      } else if (id >= 6 && id <= 31) sfx.playBGM('ruins');
      else if (id >= 32 && id <= 37) sfx.playBGM('home');
      else if (id >= 38 && id <= 41) {
        if (G.state.flags.torielDone) sfx.stopBGM();
        else sfx.playBGM('fallendown');
      } else if (id === 42) sfx.stopBGM();
      else if (id === 43) {
        sfx.stopBGM();
        if (!G.state.flags.floweyExitDone) { G.flowey.vis = true; G.flowey.x = 148; G.flowey.y = 285; }
      }

      // Setup dynamic rocks & Toriel positions per room
      for (const inst of R.instances) {
        if (inst.obj.startsWith('obj_pushrock')) {
          const solved = G.state.flags[`rock_${id}`];
          if (id === 15) G.rocks.push({ x: solved ? 256 : inst.x, y: solved ? 140 : inst.y, targetX: 256, targetY: 140 });
          else if (id === 17) {
            const ty = inst.y < 115 ? 100 : 140;
            G.rocks.push({ x: solved ? 296 : inst.x, y: solved ? ty : inst.y, targetX: 296, targetY: ty });
          }
        } else if (inst.obj === 'obj_goofyrock') {
          const st = G.state.flags.talkRock || 0;
          G.rocks.push({ goofy: true, x: st >= 2 ? 296 : inst.x, y: 180, targetX: 296, targetY: 180 });
        }
      }

      // Toriel Overworld presence
      const fl = G.state.flags;
      if (id === 6 && !fl.r6_tor) { G.tor.vis = true; G.tor.x = 148; G.tor.y = 310; G.tor.dir = 'down'; }
      else if (id === 7 && !fl.r7_done) { G.tor.vis = true; G.tor.x = 148; G.tor.y = 135; G.tor.dir = 'down'; }
      else if (id === 8 && !fl.r8_done) { G.tor.vis = true; G.tor.x = 160; G.tor.y = 112; G.tor.dir = 'down'; }
      else if (id === 9 && !fl.r9_done) { G.tor.vis = true; G.tor.x = 144; G.tor.y = 66; G.tor.dir = 'down'; }
      else if (id === 10 && !fl.r10_done) { G.tor.vis = true; G.tor.x = 200; G.tor.y = 116; G.tor.dir = 'down'; }
      else if (id === 11 && !fl.r11_done) { G.tor.vis = true; G.tor.x = 96; G.tor.y = 92; G.tor.dir = 'left'; }
      else if (id === 31 && !fl.r31_done) { G.tor.vis = true; G.tor.x = 148; G.tor.y = 390; G.tor.dir = 'down'; }
      else if (id === 34 && !fl.r34_done) { G.tor.vis = true; G.tor.x = 92; G.tor.y = 132; G.tor.dir = 'left'; }
      else if (id === 38 && !fl.b1_done && fl.torBasement) { G.tor.vis = true; G.tor.x = 320; G.tor.y = 108; G.tor.dir = 'left'; }
      else if (id === 39 && !fl.b2_done && fl.torBasement) { G.tor.vis = true; G.tor.x = 340; G.tor.y = 108; G.tor.dir = 'left'; }
      else if (id === 40 && !fl.b3_done && fl.torBasement) { G.tor.vis = true; G.tor.x = 148; G.tor.y = 58; G.tor.dir = 'down'; }
      else if (id === 41 && !fl.torielDone) { G.tor.vis = true; G.tor.x = 148; G.tor.y = 76; G.tor.dir = 'up'; }

      G.updateCamera(true);
      G.onUI?.();
    };

    G.updateCamera = function(snap = false) {
      const R = window.UT_GMC_ROOMS[G.state.room];
      if (!R) return;
      const tx = Math.max(0, Math.min(R.w - 320, G.frisk.x + 10 - 160));
      const ty = Math.max(0, Math.min(R.h - 240, G.frisk.y + 15 - 120));
      if (snap) { G.camX = tx; G.camY = ty; }
      else { G.camX += (tx - G.camX) * 0.35; G.camY += (ty - G.camY) * 0.35; }
    };

    // =======================================================================
    // EXACT GAMEMAKER COLLISION & 45-DEGREE DIAGONAL SLIDING
    // =======================================================================
    function aabbOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
      return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    }

    function diagHit(type, sx, sy, sw, sh, px, py) {
      if (px < sx || px > sx + sw || py < sy || py > sy + sh) return false;
      const u = (px - sx) / sw, v = (py - sy) / sh;
      if (type === 'sur') return u >= v;
      if (type === 'sul') return u + v <= 1;
      if (type === 'sdr') return u + v >= 1;
      if (type === 'sdl') return v >= u;
      return false;
    }

    G.isBlocked = function(fx, fy) {
      const id = G.state.room, R = window.UT_GMC_ROOMS[id], fl = G.state.flags;
      const bx = fx + 2, by = fy + 19, bw = 15, bh = 9;
      if (bx < 0 || by < 0 || bx + bw > R.w || by + bh > R.h) return true;

      for (const [sx, sy, sw, sh] of R.solids) {
        if (aabbOverlap(bx, by, bw, bh, sx, sy, sw, sh)) return true;
      }
      const corners = [[bx, by], [bx + bw, by], [bx, by + bh], [bx + bw, by + bh], [bx + bw * 0.5, by + bh * 0.5]];
      for (const [dtype, dx, dy, dw, dh] of R.diags) {
        for (const [cx, cy] of corners) if (diagHit(dtype, dx, dy, dw, dh, cx, cy)) return true;
      }

      // Water collision (unless bridge tiles cover it: in .room.gmx fakewater objects only exist on open water!)
      for (const [wspr, wx, wy] of R.water) {
        if (!wspr.includes('open') && aabbOverlap(bx, by, bw, bh, wx, wy, 20, 20)) return true;
      }

      // Dynamic doors, spikes, rocks & solid props
      for (const inst of R.instances) {
        const o = inst.obj;
        if (o === 'obj_ruinsdoor1' && fl.r7_done) continue;
        if (o === 'obj_finaldoor' && fl.torielDone) continue;
        if (o === 'obj_spikes_room' && isRoomPuzzleSolved(id)) continue;
        if (o === 'obj_spikes_room' && !isRoomPuzzleSolved(id)) {
          // Notice in ruins15A..D there are entrance spikes (x<60 or y>360) vs exit spikes!
          if (isSpikeBlocking(id, inst.x, inst.y) && aabbOverlap(bx, by, bw, bh, inst.x, inst.y, 20, 20)) return true;
          continue;
        }
        if (o === 'obj_spiketile2') {
          // Retracts when Toriel has guided or Frisk steps near!
          continue;
        }
        if (o === 'obj_spiketile1') {
          if (!fl.r10_bridge && aabbOverlap(bx, by, bw, bh, inst.x + 2, inst.y + 2, 16, 16)) return true;
          continue;
        }
        if (o.startsWith('obj_plotwall')) continue;
        if (o === 'obj_napstablook1' && fl.blookMoved) continue;
        if (o === 'obj_napstablook2' && fl.blookPitSeen) continue;
        if (o === 'obj_ribbon_pickup' && fl.gotRibbon) continue;
        if (o === 'obj_knife_pickup' && fl.gotKnife) continue;
        if (o === 'obj_pie_pickup' && (!fl.sleptInBed || fl.gotPie)) continue;
        if (o.startsWith('obj_pushrock') || o === 'obj_goofyrock') continue;
        if (o.startsWith('obj_toroverworld') || o.startsWith('obj_torinteractable')) continue;

        if (inst.sol) {
          const [ox, oy, ow, oh] = inst.bbox;
          if (aabbOverlap(bx, by, bw, bh, inst.x + ox, inst.y + oy, ow, Math.min(oh, 24))) return true;
        }
      }

      for (const rk of G.rocks) {
        if (aabbOverlap(bx, by, bw, bh, rk.x, rk.y + 2, 20, 16)) return true;
      }
      if (G.tor.vis && !G.tor.wp.length && aabbOverlap(bx, by, bw, bh, G.tor.x + 2, G.tor.y + 36, 21, 14)) return true;
      return false;
    };

    function isRoomPuzzleSolved(id) {
      const fl = G.state.flags;
      if (id === 8) return !!(fl.r8_sw1 && fl.r8_sw2);
      if (id === 15) return !!fl.rock_15;
      if (id === 17) return !!fl.r17_solved;
      if (id === 22) return !!fl.r22_sw;
      if (id === 23) return !!fl.r23_sw;
      if (id === 24) return !!fl.r24_sw;
      if (id === 25) return !!fl.r25_sw;
      if (id === 26) return true;
      return false;
    }
    G.isRoomPuzzleSolved = isRoomPuzzleSolved;

    function isSpikeBlocking(id, sx, sy) {
      if (id >= 23 && id <= 26) {
        // Entrance spikes behind markerA are already lowered; exit spikes block until switch pressed!
        const mA = window.UT_GMC_ROOMS[id].markers.A || [0, 0];
        if (Math.hypot(sx - mA[0], sy - mA[1]) < 48) return false;
      }
      return !isRoomPuzzleSolved(id);
    }
    G.isSpikeBlocking = isSpikeBlocking;

    G.moveFrisk = function(dx, dy) {
      const f = G.frisk, R = window.UT_GMC_ROOMS[G.state.room];
      // Push rock check
      for (const rk of G.rocks) {
        if (!rk.goofy && aabbOverlap(f.x + dx + 2, f.y + dy + 19, 15, 9, rk.x, rk.y + 2, 20, 16)) {
          const nrx = rk.x + dx * 0.85, nry = rk.y + dy * 0.85;
          const hitWall = R.solids.some(([sx, sy, sw, sh]) => aabbOverlap(nrx, nry + 2, 20, 16, sx, sy, sw, sh));
          if (!hitWall) {
            rk.x = nrx; rk.y = nry;
            if (Math.hypot(rk.x - rk.targetX, rk.y - rk.targetY) < 9) {
              rk.x = rk.targetX; rk.y = rk.targetY;
              checkRockPlates();
            }
          }
        }
      }

      if (!G.isBlocked(f.x + dx, f.y + dy)) {
        f.x += dx; f.y += dy;
      } else {
        // 45-degree diagonal wall glide!
        if (dx !== 0 && dy === 0) {
          if (!G.isBlocked(f.x + dx, f.y + Math.abs(dx))) { f.x += dx; f.y += Math.abs(dx); }
          else if (!G.isBlocked(f.x + dx, f.y - Math.abs(dx))) { f.x += dx; f.y -= Math.abs(dx); }
        } else if (dy !== 0 && dx === 0) {
          if (!G.isBlocked(f.x + Math.abs(dy), f.y + dy)) { f.x += Math.abs(dy); f.y += dy; }
          else if (!G.isBlocked(f.x - Math.abs(dy), f.y + dy)) { f.x -= Math.abs(dy); f.y += dy; }
        }
      }

      // Foyer stairstep vertical shift
      if (dx !== 0 && R.stairsteps.length) {
        for (const [sx, sy, sw, sh] of R.stairsteps) {
          if (aabbOverlap(f.x + 2, f.y + 19, 15, 9, sx, sy, sw, sh)) {
            f.y += dx * 0.25; break;
          }
        }
      }
    };

    function checkRockPlates() {
      const id = G.state.room, fl = G.state.flags;
      if (id === 15 && !fl.rock_15) {
        if (G.rocks.every(r => Math.hypot(r.x - r.targetX, r.y - r.targetY) < 8)) {
          fl.rock_15 = true; sfx.sfx('noise', 0.7);
        }
      } else if (id === 17) {
        const allOn = G.rocks.every(r => Math.hypot(r.x - r.targetX, r.y - r.targetY) < 8);
        if (allOn && !fl.r17_solved) { fl.r17_solved = true; sfx.sfx('noise', 0.7); }
      }
    }

    // =======================================================================
    // PIT MASKS, ENCOUNTERS & ROOM TRIGGERS
    // =======================================================================
    function hitHoleMask(maskName, ox, oy, px, py) {
      const m = window.UT_HOLE_MASKS[maskName];
      if (!m) return false;
      const lx = Math.floor((px - ox) / m.cell), ly = Math.floor((py - oy) / m.cell);
      if (ly < 0 || ly >= m.rows.length || lx < 0 || lx >= m.rows[0].length) return false;
      return m.rows[ly][lx] === '1';
    }

    G.triggerBattle = function(enemyId, cb = null) {
      G.mode = 'enc_alert';
      G.enc = { timer: 0, enemy: enemyId, cb };
      sfx.sfx('b', 0.75);
    };

    G.finishFloweyRescue = function() {
      G.state.flags.floweyDone = true;
      G.flowey.vis = false;
      G.mode = 'explore';
      G.tor.vis = true; G.tor.x = 230; G.tor.y = 266; G.tor.dir = 'left';
      sfx.playBGM('fallendown');
      G.tor.wp = [{ x: 148, y: 266, cb: () => {
        G.tor.dir = 'down';
        G.sayKey('torielRescue', () => {
          G.tor.wp = [{ x: 148, y: 145, cb: () => { G.tor.vis = false; } }];
        }, 'bottom');
      } }];
    };

    G.endRPGBattle = function(enemyId, outcome, cb) {
      G.mode = 'explore';
      const id = G.state.room;
      if (id >= 6 && id <= 31) sfx.playBGM('ruins');
      else if (id >= 38 && id <= 41) sfx.stopBGM();
      if (cb) cb(outcome);
    };

    G.checkRoomEvents = function() {
      const id = G.state.room, R = window.UT_GMC_ROOMS[id], f = G.frisk, fl = G.state.flags;
      const footX = f.x + 9, footY = f.y + 24;

      // Update Toriel waypoints
      if (G.tor.vis && G.tor.wp.length) {
        const g = G.tor.wp[0];
        const dx = g.x - G.tor.x, dy = g.y - G.tor.y, d = Math.hypot(dx, dy);
        if (d < 2.5) {
          G.tor.x = g.x; G.tor.y = g.y; G.tor.moving = false;
          G.tor.wp.shift();
          if (g.cb) g.cb();
        } else {
          G.tor.x += (dx / d) * 2.1; G.tor.y += (dy / d) * 2.1;
          G.tor.moving = true; G.tor.walk++;
          G.tor.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
        }
      } else G.tor.moving = false;

      // Spiders animation
      for (let i = G.spiders.length - 1; i >= 0; i--) {
        G.spiders[i].y += G.spiders[i].vy;
        if (--G.spiders[i].t <= 0) G.spiders.splice(i, 1);
      }

      // Room 5: Flowey auto-trigger
      if (id === 5 && !fl.floweyDone && f.y < 335) {
        f.dir = 'up'; f.moving = false;
        G.sayKey('floweyIntro', () => {
          G.mode = 'enc_flash'; G.enc = { timer: 18, isFlowey: true }; sfx.sfx('battlefall', 0.8);
        }, 'top');
        return;
      }

      // Room 6: Toriel walks up grand double staircase
      if (id === 6 && !fl.r6_tor && f.y < 385) {
        fl.r6_tor = true;
        G.tor.wp = [{ x: 148, y: 230 }, { x: 148, y: 92, cb: () => { G.tor.vis = false; } }];
      }

      // Room 7: Toriel demonstrates 6-plate puzzle
      if (id === 7 && !fl.r7_seen) {
        fl.r7_seen = true;
        G.sayKey('torielRuins2', () => {
          G.tor.wp = [
            { x: 180, y: 112, cb: () => { fl.p7_0 = true; fl.p7_4 = true; sfx.sfx('noise', 0.6); } },
            { x: 220, y: 112, cb: () => { fl.p7_1 = true; fl.p7_3 = true; sfx.sfx('noise', 0.6); } },
            { x: 210, y: 54,  cb: () => {
              fl.r7_done = true; sfx.sfx('power', 0.7);
              G.tor.wp = [{ x: 132, y: 48, cb: () => { G.tor.vis = false; } }];
            } }
          ];
        });
        return;
      }

      // Room 8: Switch Room tutorial
      if (id === 8 && !fl.r8_seen) {
        fl.r8_seen = true;
        G.sayKey('torielRuins3Intro', () => { G.tor.wp = [{ x: 446, y: 100, cb: () => { G.tor.dir = 'left'; } }]; });
        return;
      }

      // Room 9: Dummy intro
      if (id === 9 && !fl.r9_seen) { fl.r9_seen = true; G.sayKey('torielRuins4Intro'); return; }

      // Room 10: Scripted Froggit + Spike Bridge
      if (id === 10 && !fl.r10_seen) {
        fl.r10_seen = true;
        G.sayKey('torielRuins5Intro', () => { G.tor.wp = [{ x: 520, y: 100 }]; });
        return;
      }
      if (id === 10 && !fl.r10_frog && f.x > 490) {
        fl.r10_frog = true; G.state.scriptedFrog = true;
        G.tor.x = 560; G.tor.y = 95;
        G.triggerBattle('froggit', () => { G.tor.wp = [{ x: 770, y: 108, cb: () => { G.tor.dir = 'left'; } }]; });
        return;
      }
      if (id === 10 && !fl.r10_bridge && f.x > 745) {
        fl.r10_bridge = true;
        G.sayKey('torielRuins5Bridge', () => {
          G.tor.wp = [{ x: 1140, y: 104, cb: () => {
            G.sayKey('torielRuins5Done', () => {
              fl.r10_done = true;
              G.tor.wp = [{ x: 1190, y: 104, cb: () => { G.tor.vis = false; } }];
            });
          } }];
        });
        return;
      }

      // Room 11: Independence Hallway (2500px!)
      if (id === 11 && !fl.r11_seen) {
        fl.r11_seen = true;
        G.sayKey('torielRuins6Start', () => {
          G.tor.wp = [{ x: 460, y: 92, cb: () => { G.tor.x = 2302; G.tor.y = 58; G.tor.vis = false; } }];
        });
        return;
      }
      if (id === 11 && !fl.r11_done && f.x > 2245) {
        fl.r11_done = true; G.tor.vis = true; G.tor.x = 2302; G.tor.y = 88; G.tor.dir = 'left';
        G.state.hasPhone = true; G.onUI?.();
        G.sayKey('torielRuins6End', () => {
          G.tor.wp = [{ x: 2490, y: 96, cb: () => { G.tor.vis = false; } }];
        });
        return;
      }

      // Automatic Toriel Phone Calls (Rooms 12, 15, 21)
      if (id === 12 && !fl.call1 && f.x > 70) { fl.call1 = true; sfx.sfx('phone', 0.7); G.sayKey('call1'); return; }
      if (id === 15 && !fl.call2 && f.x > 55) {
        fl.call2 = true; sfx.sfx('phone', 0.7);
        G.sayKey('call2Choice', () => G.sayKey('call2After'));
        return;
      }
      if (id === 15 && fl.call2 && !fl.call3 && f.x > 115) {
        fl.call3 = true; sfx.sfx('phone', 0.7);
        const flavor = G.lang === 'zh'
          ? (G.state.piePref === 'Cinnamon' ? '肉桂' : '奶油糖')
          : G.state.piePref.toLowerCase();
        const lines = G.D().call3Confirm.map(e => ({ ...e, text: e.text.replace('{PIE}', flavor) }));
        G.say(lines);
        return;
      }
      if (id === 15 && !fl.call4 && f.x > 345) { fl.call4 = true; sfx.sfx('phone', 0.7); G.sayKey('call4Allergy'); return; }
      if (id === 21 && !fl.call5 && f.x > 510) { fl.call5 = true; sfx.sfx('phone', 0.7); G.sayKey('call5Pockets'); return; }

      // Room 17: Talking Rock walks off once if only asked once!
      if (id === 17 && fl.talkRock === 2 && f.x > 335) {
        fl.talkRock = 2.5; fl.r17_solved = false;
        const gr = G.rocks.find(r => r.goofy);
        if (gr) gr.x = 250;
        sfx.sfx('noise', 0.6);
      }

      // Room 31: Toriel outside cottage
      if (id === 31 && !fl.r31_done && f.y < 465) {
        fl.r31_done = true;
        G.tor.wp = [{ x: 148, y: 430, cb: () => {
          sfx.sfx('phone', 0.7);
          G.state.hp = G.state.maxHp;
          G.sayKey('torielOutsideHome', () => {
            sfx.sfx('heal', 0.75);
            G.tor.wp = [{ x: 148, y: 165, cb: () => { G.tor.vis = false; } }];
          });
        } }];
        return;
      }

      // Room 34: Bedroom hallway tour
      if (id === 34 && !fl.r34_done && f.x > 55) {
        fl.r34_done = true;
        G.tor.wp = [{ x: 152, y: 132, cb: () => {
          G.tor.dir = 'left';
          G.sayKey('torielHallTour', () => {
            G.tor.wp = [{ x: -10, y: 136, cb: () => { G.tor.vis = false; } }];
          });
        } }];
        return;
      }

      // Basement 1..4 Toriel stops
      if (id === 38 && fl.torBasement && !fl.b1_done && f.x > 260) {
        fl.b1_done = true;
        G.sayKey('basement1', () => { G.tor.wp = [{ x: 490, y: 112, cb: () => { G.tor.vis = false; } }]; });
        return;
      }
      if (id === 39 && fl.torBasement && !fl.b2_done && f.x > 280) {
        fl.b2_done = true;
        G.sayKey('basement2', () => { G.tor.wp = [{ x: 490, y: 112, cb: () => { G.tor.vis = false; } }]; });
        return;
      }
      if (id === 40 && fl.torBasement && !fl.b3_done && f.y < 110) {
        fl.b3_done = true;
        G.sayKey('basement3', () => { G.tor.wp = [{ x: 148, y: -10, cb: () => { G.tor.vis = false; } }]; });
        return;
      }
      if (id === 41 && !fl.torielDone && f.y < 130) {
        G.tor.dir = 'down';
        G.sayKey('basement4', () => {
          G.triggerBattle('toriel', (outcome) => {
            fl.torielDone = true;
            fl.torielKilled = (outcome === 'killed');
            if (outcome === 'killed') {
              G.tor.vis = false;
            } else {
              G.sayKey('torielAfterSpared', () => {
                G.tor.hug = true; sfx.sfx('noise', 0.5);
                setTimeout(() => {
                  G.tor.hug = false;
                  G.tor.wp = [{ x: 148, y: 235, cb: () => { G.tor.vis = false; } }];
                }, 1300);
              });
            }
          });
        });
        return;
      }

      // Room 43: Flowey's reactive final judgment
      if (id === 43 && !fl.floweyExitDone && f.y < 332) {
        fl.floweyExitDone = true;
        const key = (G.state.kills > 0 || fl.torielKilled) ? 'floweyEndNeutral' : 'floweyEndPacifist';
        G.sayKey(key, () => { sfx.sfx('flwlaugh', 0.6); G.flowey.vis = false; }, 'top');
        return;
      }

      // Cracked Floor Pit Checks (Rooms 14, 16, 22)
      for (const h of R.holes) {
        if (h.kind === 'down_rect' && aabbOverlap(f.x + 4, f.y + 20, 11, 7, h.x, h.y, h.w, h.h)) {
          startPitFall(footX, footY); return;
        }
        if (h.kind === 'down_mask' && hitHoleMask(h.mask, h.x, h.y, footX, footY)) {
          if (id === 16 && G.holes.length >= 10) continue; // Toby Fox 11-fall mercy easter egg!
          startPitFall(footX, footY); return;
        }
        if (h.kind === 'up' && aabbOverlap(f.x + 2, f.y + 19, 15, 9, h.x, h.y, h.w, h.h)) {
          G.mode = 'fall';
          G.fallAnim = { vy: -10, ticks: f.y > 550 ? 52 : 41 };
          sfx.sfx('noise', 0.5);
          return;
        }
      }

      // Door Transitions
      for (const [dtype, dx, dy, dw, dh, toRoom, mk] of R.doors) {
        if (aabbOverlap(f.x + 2, f.y + 19, 15, 9, dx, dy, dw, dh)) {
          if (id === 9 && dtype === 'A' && !fl.r9_done) return;
          if (id === 32 && dtype === 'X' && !fl.torBasement && !fl.torielDone) {
            f.y += 10;
            G.say(G.lang === 'zh' ? '* 樓梯通往昏暗的地下室，\n  先回客廳和托麗爾聊聊吧。' : "* Stairs lead down to a dark\n  basement. Talk to Toriel in\n  the living room first.");
            return;
          }
          if (dtype === 'EXIT') { G.startFade(() => G.enterRoom(999)); return; }
          const destR = window.UT_GMC_ROOMS[toRoom];
          const destM = destR?.markers[mk] || destR?.markers.A || [150, 150];
          const nextDir = dtype === 'A' ? f.dir : f.dir;
          G.startFade(() => G.enterRoom(toRoom, destM[0], destM[1], nextDir));
          return;
        }
      }

      // Random Monster Encounters in Ruins (Rooms 12, 14, 15, 16, 17, 21, 22, 23..26)
      if (f.moving && [12, 14, 15, 16, 17, 21, 22, 23, 24, 25].includes(id) && G.state.kills < 20) {
        G.stepCount++;
        if (G.stepCount > 195 && Math.random() < 0.014) {
          G.stepCount = 0;
          const pool = id <= 16 ? ['froggit', 'whimsun'] : ['moldsmal', 'loox', 'vegetoid', 'migosp'];
          G.triggerBattle(pool[Math.floor(Math.random() * pool.length)]);
        }
      }
    };

    function startPitFall(hx, hy) {
      G.holes.push({ x: Math.round(hx - 10), y: Math.round(hy - 5) });
      sfx.sfx('fall', 0.75);
      G.mode = 'fall';
      G.fallAnim = { vy: 5, ticks: 81 };
    }

    // =======================================================================
    // INTERACT [Z] IN OVERWORLD
    // =======================================================================
    G.interact = function() {
      const id = G.state.room, R = window.UT_GMC_ROOMS[id], f = G.frisk, fl = G.state.flags;
      const reach = { up: [0, -16], down: [0, 16], left: [-16, 0], right: [16, 0] }[f.dir] || [0, 14];
      const px = f.x + 9 + reach[0], py = f.y + 22 + reach[1];

      // Talking to Toriel
      if (G.tor.vis && Math.hypot(px - (G.tor.x + 12), py - (G.tor.y + 38)) < 32) {
        if (id === 9) G.sayKey('torielRuins4Intro');
        else G.say(G.lang === 'zh' ? [{ who: 'toriel', expr: 'happy', text: '* 別擔心，我的孩子，\n  跟著我走就對了！' }] : [{ who: 'toriel', expr: 'happy', text: "* Do not worry, my child.\n* I am right here with you!" }]);
        return;
      }

      // Talking Rock in Room 17
      const gr = G.rocks.find(r => r.goofy);
      if (gr && Math.hypot(px - (gr.x + 10), py - (gr.y + 10)) < 26) {
        const st = fl.talkRock || 0;
        if (st === 0) { fl.talkRock = 1; G.sayKey('talkRock1'); }
        else if (st === 1) {
          fl.talkRock = 2; gr.x = 296; checkRockPlates();
          G.sayKey('talkRock2');
        } else if (st === 2.5) {
          fl.talkRock = 3; gr.x = 296; checkRockPlates();
          G.sayKey('talkRock3');
        } else G.sayKey('talkRockDone');
        return;
      }

      // Find nearest instance in R.instances
      let best = null, bestD = 32;
      for (const inst of R.instances) {
        if (inst.obj.startsWith('obj_spiketile') || inst.obj.startsWith('obj_torieltrigger') || inst.obj.startsWith('obj_torielcall') || inst.obj.startsWith('obj_plotwall') || inst.obj.startsWith('obj_encounter')) continue;
        const cx = inst.x + (inst.bbox[2] || 20) * 0.5, cy = inst.y + (inst.bbox[3] || 20) * 0.5;
        const d = Math.hypot(px - cx, py - cy);
        if (d < bestD) { best = inst; bestD = d; }
      }
      if (!best) return;
      const o = best.obj;

      if (o === 'obj_savepoint') {
        G.state.hp = G.state.maxHp; sfx.sfx('heal', 0.7);
        const sKey = id === 6 ? 'save1' : (id === 12 ? 'save2' : (id === 18 ? 'save3' : 'save4'));
        G.say(G.D()[sKey], () => {
          G.mode = 'save_menu';
          G.saveMenu = { cur: 0, saved: false, roomTitle: G.D().roomNames[id] || 'The Ruins' };
        });
      }
      else if (o === 'obj_readable_flowers1') G.sayKey('flowers');
      else if (o === 'obj_dummy1' && !fl.r9_done) {
        G.triggerBattle('dummy', (outcome) => {
          fl.r9_done = true;
          const k = outcome === 'killed' ? 'torielDummyHit' : (outcome === 'fled' ? 'torielDummyFlee' : 'torielDummyGood');
          G.sayKey(k, () => { G.tor.wp = [{ x: 150, y: 42, cb: () => { G.tor.vis = false; } }]; });
        });
      }
      else if (o === 'obj_plotswitch1') {
        fl.r8_sw1 = true; sfx.sfx('noise', 0.7);
        G.tor.wp = [{ x: 668, y: 100, cb: () => { G.tor.dir = 'left'; } }];
      }
      else if (o === 'obj_plotswitch2') {
        fl.r8_sw2 = true; fl.r8_done = true; sfx.sfx('power', 0.7);
        G.sayKey('torielRuins3Sw1', () => { G.tor.wp = [{ x: 735, y: 142, cb: () => { G.tor.vis = false; } }]; });
      }
      else if (o === 'obj_readable_switch1') { sfx.sfx('noise', 0.6); G.sayKey('torielRuins3Wrong'); }
      else if (o === 'obj_switchadvice1') G.sayKey('noteSwitch1');
      else if (o === 'obj_switchadvice2') G.sayKey('noteSwitch2');
      else if (o === 'obj_readable_sign1') G.sayKey('signStayPath');
      else if (o === 'obj_candydish1') {
        const cnt = fl.candy || 0;
        if (cnt >= 4) { G.sayKey('candySpilled'); return; }
        const pr = G.D().candyPrompt;
        G.say([{ who: 'narrator', text: pr.text, choices: pr.choices, choiceKey: 'candyAsk' }]);
      }
      else if (o === 'obj_smallfrog_xadvice') G.sayKey('frogXAdvice');
      else if (o === 'obj_smallfrog') {
        if (id === 12) G.sayKey('frogRuins7');
        else if (id === 29) G.sayKey('frogGroceries');
        else if (best.x < 400) G.sayKey('frogFour');
        else G.sayKey('frogYellow');
      }
      else if (o === 'obj_readable_plaque_1') G.sayKey('plaqueLeaves');
      else if (o === 'obj_readable_plaque_2') G.sayKey('plaqueUpper10');
      else if (o === 'obj_mousehole') G.sayKey('mouseHole');
      else if (o === 'obj_cheesetable1') G.sayKey('cheeseTable');
      else if (o === 'obj_napstablook1' && !fl.blookMoved) {
        const pr = G.D().blookPrompt;
        G.say([{ who: 'narrator', text: pr.text, choices: pr.choices, choiceKey: 'blookAsk' }]);
      }
      else if (o === 'obj_sign_room') G.sayKey('bakeSign');
      else if (o === 'obj_smallweb') {
        const pr = G.D().webSmallPrompt;
        G.say([{ who: 'narrator', text: pr.text, choices: pr.choices, choiceKey: 'buyDonut' }]);
      }
      else if (o === 'obj_bigweb') {
        const pr = G.D().webBigPrompt;
        G.say([{ who: 'narrator', text: pr.text, choices: pr.choices, choiceKey: 'buyCider' }]);
      }
      else if (o === 'obj_readable_sign2') G.sayKey('plaqueLeaves');
      else if (o === 'obj_ribbon_pickup' && !fl.gotRibbon) {
        fl.gotRibbon = true; G.state.items.push('Ribbon'); sfx.sfx('heal', 0.7); G.sayKey('ribbonGet');
      }
      else if (o === 'obj_napstablook2' && !fl.blookPitSeen) {
        fl.blookPitSeen = true; G.sayKey('blookPit');
      }
      else if (o === 'obj_vegetoid_overworld') G.triggerBattle('vegetoid');
      else if (o === 'obj_plotswitch3') { fl.r22_sw = true; sfx.sfx('power', 0.75); G.sayKey('switchClick'); }
      else if (o === 'obj_blueswitch_1' || o === 'obj_redswitch_1' || o === 'obj_greenswitch_1') {
        const want = { 23: 'obj_blueswitch_1', 24: 'obj_redswitch_1', 25: 'obj_greenswitch_1' }[id];
        if (o === want) { fl[`r${id}_sw`] = true; sfx.sfx('power', 0.75); G.sayKey('switchClick'); }
        else if (id === 26) { G.startFade(() => G.enterRoom(27, 150, 140, 'up')); }
        else sfx.sfx('hurt', 0.5);
      }
      else if (o === 'obj_knife_pickup' && !fl.gotKnife) {
        fl.gotKnife = true; G.state.items.push('ToyKnife'); sfx.sfx('heal', 0.7); G.sayKey('toyKnifeGet');
      }
      else if (o === 'obj_chairiel') {
        if (!fl.torBasement && !fl.torielDone) {
          const askCount = fl.livingAsk || 0;
          if (askCount === 0) { fl.livingAsk = 1; G.sayKey('torielLivingAsk1'); }
          else if (askCount === 1) { fl.livingAsk = 2; G.sayKey('torielExit1'); }
          else {
            fl.torBasement = true;
            G.sayKey('torielExit2', () => { sfx.stopBGM(); });
          }
        } else G.sayKey('livingChair');
      }
      else if (o === 'obj_hearthflame') G.sayKey('livingFire');
      else if (o === 'obj_kitchentable' || o.includes('chair')) G.sayKey('livingTable');
      else if (o === 'obj_mirrorreflection') G.sayKey('mirrorNormal');
      else if (o === 'obj_asriellamp' && id === 36) { fl.roomDark = !fl.roomDark; sfx.sfx('noise', 0.6); }
      else if (o === 'obj_asrielbed') {
        const pr = G.D().yourBedPrompt;
        G.say([{ who: 'narrator', text: pr.text, choices: pr.choices, choiceKey: 'sleepBed' }]);
      }
      else if (o === 'obj_pie_pickup' && fl.sleptInBed && !fl.gotPie) {
        const pr = G.D().pieFloorPrompt;
        G.say([{ who: 'narrator', text: pr.text, choices: pr.choices, choiceKey: 'takePie' }]);
      }
      else if (o === 'obj_bigpie') G.sayKey('kitchenPie');
      else if (o === 'obj_cactus') G.sayKey('torRoomCactus');
      else if (o === 'obj_sockdrawer') G.sayKey('torRoomSocks');
      else if (o.startsWith('obj_readable_room')) {
        handleRoomReadable(id, o, best.x);
      }
    };

    function handleRoomReadable(id, o, x) {
      if (id === 6 || id === 7) G.sayKey('plaqueRuins1');
      else if (id === 8) G.sayKey('plaqueRuins1');
      else if (id === 10) G.sayKey('plaqueBlueprint');
      else if (id === 15) G.sayKey('rockSign');
      else if (id === 21) G.sayKey('tinyFrog');
      else if (id === 22) G.sayKey('signOneSwitch');
      else if (id === 23) G.sayKey('plaque15A');
      else if (id === 24) G.sayKey('plaque15B');
      else if (id === 25) G.sayKey('plaque15C');
      else if (id === 26) G.sayKey('plaque15D');
      else if (id === 32) G.sayKey(o === 'obj_readable_room2' ? 'homeVase' : 'homeCalendar');
      else if (id === 33) G.sayKey('livingBooks');
      else if (id === 34) {
        if (o === 'obj_readable_room4') G.sayKey('mirrorNormal');
        else if (x > 680) G.sayKey('hallLocked');
        else if (x > 500) G.sayKey('hallPlant');
        else G.sayKey('hallPainting');
      }
      else if (id === 35) {
        if (o === 'obj_readable_room3') G.sayKey('torRoomDiary');
        else if (x > 130) G.sayKey('torRoomBed');
        else G.sayKey('livingBooks');
      }
      else if (id === 36) {
        if (o === 'obj_readable_room1') G.sayKey('yourToys');
        else if (o === 'obj_readable_room2') G.sayKey('yourShoes');
        else G.sayKey('yourPhoto');
      }
      else if (id === 37) {
        if (o === 'obj_readable_room1') G.sayKey('kitchenFridge');
        else if (o === 'obj_readable_room3') G.sayKey('kitchenSink');
        else if (o === 'obj_readable_room2') G.sayKey('kitchenPie');
        else G.sayKey('kitchenStove');
      }
    }

    G.resolveChoice = function(choiceKey, idx) {
      const fl = G.state.flags;
      if (choiceKey === 'piePref') { G.state.piePref = idx === 0 ? 'Cinnamon' : 'Butterscotch'; }
      else if (choiceKey === 'candyAsk' && idx === 0) {
        if (G.state.items.length >= 8) { setTimeout(() => G.sayKey('bakeFull'), 20); return; }
        fl.candy = (fl.candy || 0) + 1;
        if (fl.candy <= 3) { G.state.items.push('Candy'); sfx.sfx('heal', 0.65); }
        else sfx.sfx('noise', 0.8);
        setTimeout(() => G.sayKey(`candy${fl.candy}`), 20);
      }
      else if (choiceKey === 'blookAsk' && idx === 0) {
        setTimeout(() => G.triggerBattle('blook', (out) => {
          fl.blookMoved = true;
          if (out !== 'fled') G.sayKey('blookAfter');
        }), 20);
      }
      else if (choiceKey === 'buyDonut' && idx === 0) {
        setTimeout(() => {
          if (G.state.items.length >= 8) G.sayKey('bakeFull');
          else if (G.state.gold < 7) G.sayKey('bakeNoGold');
          else {
            G.state.gold -= 7; G.state.items.push('Donut'); sfx.sfx('heal', 0.7);
            G.spiders.push({ x: 124, y: 40, vy: 1.6, t: 55 });
            G.sayKey('bakeBoughtDonut');
          }
        }, 20);
      }
      else if (choiceKey === 'buyCider' && idx === 0) {
        setTimeout(() => {
          if (G.state.items.length >= 8) G.sayKey('bakeFull');
          else if (G.state.gold < 18) G.sayKey('bakeNoGold');
          else {
            G.state.gold -= 18; G.state.items.push('Cider'); sfx.sfx('heal', 0.7);
            G.spiders.push({ x: 184, y: 36, vy: 1.6, t: 55 });
            G.sayKey('bakeBoughtCider');
          }
        }, 20);
      }
      else if (choiceKey === 'sleepBed' && idx === 0) {
        setTimeout(() => {
          G.startFade(() => {
            fl.sleptInBed = true; fl.roomDark = true;
            G.state.hp = G.state.maxHp;
            sfx.playBGM('snore', false);
          });
          setTimeout(() => { sfx.playBGM('home'); G.sayKey('yourBedWake'); }, 1500);
        }, 20);
      }
      else if (choiceKey === 'takePie' && idx === 0) {
        setTimeout(() => {
          if (G.state.items.length >= 8) G.sayKey('bakeFull');
          else { fl.gotPie = true; G.state.items.push('Pie'); sfx.sfx('heal', 0.75); G.sayKey('pieTaken'); }
        }, 20);
      }
      else if (choiceKey === 'livingChoice1') {
        setTimeout(() => G.sayKey(idx === 0 ? 'torielExit1' : 'torielSnailFact'), 20);
      }
    };

    return { G, getRoomImg };
  }

  window.UTOverworldFactory = { createGame };
})();
