// Undertale — UNDYNE THE UNDYING (Genocide Route Boss — Battle Against a True Hero, 640x480 native)
// 1:1 Articulated Rig (obj_undynex_body), Green SOUL Spear Blocker, Yellow 180° Reverse Arrows, Red Spear Rings & Practice Simulator
(function () {
  'use strict';
  const Core = window.UTEngineCore;
  if (!Core) return;
  const { SPR, registerSprites, drawSpr, drawSprExt, drawRichText, stripCodes, drawBattleHUD } = Core;
  if (window.UT_UNDYNE_SPRITES) registerSprites(window.UT_UNDYNE_SPRITES);

  const T = {
    en: {
      simTitle: 'UNDYNE THE UNDYING',
      simSub: 'Battle Against a True Hero - 1:1 Boss Simulator',
      menuOpts: [
        '> NORMAL FIGHT (22,000 HP Genocide Boss)',
        '+ PHASE / WAVE SELECT (Checkpoints)',
        '* SINGLE ATTACKS (Endless Practice)',
        '# NO-HIT SHIELD: ',
        '< BACK TO OVERWORLD',
      ],
      phaseOpts: [
        '1. Intro: "But the Earth Refused to Die"',
        '2. Waves 1-3: Green Shield & First Yellows',
        '3. Waves 4-5: Red Arena Rising & Homing Spears',
        '4. Waves 6-9: Reverse Spinners & Spear Rings',
        '5. Waves 10-13: Spear Storm & Slow Tunnel',
        '6. Finale: Undying Determination Melting Scene',
        '< Back to Title Menu',
      ],
      singleOpts: [
        '* Green 1: 4-Way Spear Cadence',
        '* Green 2: Yellow 180-Deg Reverse Arrows',
        '* Green 3: High-Speed Spear Storm',
        '* Green 4: Slow-Tightening Spear Tunnel',
        '* Green 5: 360-Deg Spiral + Reverse Mix',
        '* Red 1: Narrow Box Rising Floor Spears',
        '* Red 2: Aimed Homing Spear Barrage',
        '* Red 3: Closing 6-Spear Hexagon Rings',
        '< Back to Title Menu',
      ],
      introSpeech: [
        { face: 'melt0', text: "D-damn it...\nEven like this...\nYou're too strong..." },
        { face: 'melt0', text: "No... Not yet!\nAlphys... Papyrus...\nASGORE..." },
        { face: 'melt1', text: "Deep, deep in my soul,\nthere's a burning feeling\nI can't describe!" },
        { face: 'hero', text: "Right now, everyone in\nthe world...\nI can feel their hearts\nbeating as one!!" },
        { face: 'hero', text: "You're gonna have to\ntry a little harder\nthan THAT!" },
      ],
      turnBubbles: [
        "En garde!!",
        "Is THAT all\nyou've got!?",
        "Pathetic!\nYou think you can\nstop ME!?",
        "Everyone's hopes...\nEveryone's dreams...\nVanquished in an\ninstant...",
        "But I WON'T let\nyou destroy this\nworld!",
        "Right now, we all\nhave ONE goal:\nTo defeat YOU!!",
        "Human... No,\nWHATEVER you are!",
        "For the sake of\nthe whole world...\nI, UNDYNE, will\nstrike you down!",
        "NGAAAHHHHH!!",
      ],
      deathBubbles: [
        "Damn it...\nSo even THAT power...\nIt wasn't enough...?",
        "Heh... Heheheh...\nIf you think I'm gonna\ngive up hope, you're\nwrong.",
        "Alphys told me she\nwould watch me fight\nyou... and evacuate\neveryone!",
        "And with the 6 human\nSOULs... This world\nwill live on...!",
      ],
      statusPool: [
        '* The wind is howling...',
        '* Undyne the Undying stands firm against you.',
        '* Heroine reformed by her own DETERMINATION to save Earth.',
        '* Smells like furious sushi.',
      ],
      checkTxt: '* UNDYNE THE UNDYING - 99 ATK 99 DEF\n* Heroine reformed by her own\n  DETERMINATION to save Earth.',
      pleadTxt: '* You told Undyne you didn\'t want\n  to fight. Nothing happened.',
      mercyTxt: '* Undyne refuses to back down!',
      victoryTitle: 'UNDYNE THE UNDYING DEFEATED',
      victorySub: 'The wind continues to howl across Waterfall...',
    },
    zh: {
      simTitle: '不朽的安戴因 (UNDYNE THE UNDYING)',
      simSub: '與真正英雄的戰鬥 - 1:1 滅絕路線 Boss 模擬器',
      menuOpts: [
        '> 完整決戰 (22,000 HP 滅絕路線完整戰)',
        '+ 階段與波次選擇 (WAVE SELECT)',
        '* 單一招式無限練習 (SINGLE ATTACKS)',
        '# 無傷護盾 (NO-HIT SHIELD): ',
        '< 返回地下世界大冒險',
      ],
      phaseOpts: [
        '1. 開場覺醒：「但大地拒絕死去」變身劇情',
        '2. 第 1-3 波：綠魂長矛盾牌 & 黃色反轉箭登場',
        '3. 第 4-5 波：紅魂地刺突襲 & 追蹤魔槍陣',
        '4. 第 6-9 波：雙向黃色迴旋箭 & 六角縮圈魔槍',
        '5. 第 10-13 波：極速暴風槍雨 & 慢速密集隧道',
        '6. 終章謝幕：決心融化與最後的微笑',
        '< 返回主選單',
      ],
      singleOpts: [
        '* 綠魂 1：四向節奏藍矛基礎陣',
        '* 綠魂 2：180度黃色反轉迴旋箭特訓',
        '* 綠魂 3：超高速狂暴四向槍雨',
        '* 綠魂 4：慢速高密度逼近長矛陣',
        '* 綠魂 5：360度螺旋連擊 + 黃箭混搭',
        '* 紅魂 1：窄框地板竄升地刺陣',
        '* 紅魂 2：鎖定追蹤飛矛連射',
        '* 紅魂 3：六角包圍收縮魔槍陣',
        '< 返回主選單',
      ],
      introSpeech: [
        { face: 'melt0', text: '可……可惡……\n就算到了這個地步……\n你的力量還是……' },
        { face: 'melt0', text: '不……還沒結束！\n艾菲斯……帕派瑞斯……\n艾斯戈爾陛下……' },
        { face: 'melt1', text: '在我靈魂的最深處，\n有一股無法形容的熾熱\n正在熊熊燃燒！！' },
        { face: 'hero', text: '現在，整個世界所有人的心……\n我能感受到大家的心跳\n正合而為一！！' },
        { face: 'hero', text: '想跨過我這關，\n你還得再更拚命一點才行！！' },
      ],
      turnBubbles: [
        '放馬過來吧！！',
        '你就只有這點\n本事而已嗎！？',
        '太天真了！\n你以為這樣就能\n擊倒我嗎！？',
        '大家的希望……\n大家的夢想……\n絕不會讓你一手摧毀！',
        '現在全世界的目標\n只有一個——\n那就是在這裡打倒你！',
        '人類……不，\n不管你是什麼怪物！',
        '為了守護整個世界……\n我，安戴因，\n一定要將你徹底擊潰！',
        '啊啊啊啊啊啊！！',
      ],
      deathBubbles: [
        '可惡……\n難道連這股力量……\n也還是不夠嗎……？',
        '呵……呵呵呵……\n如果你以為我會就此絕望，\n那你就大錯特錯了！',
        '艾菲斯早就答應過我……\n一旦戰況不妙，她就會立刻\n帶著大家全員撤離！',
        '只要集結那 6 個靈魂……\n這個世界……\n一定會繼續活下去……！',
      ],
      statusPool: [
        '* 狂風正在呼嘯著……',
        '* 不朽的安戴因眼神如光槍般貫穿著你。',
        '* 憑藉拯救地球的「決心」重塑身軀的真正女英雄。',
        '* 空氣中瀰漫著熱血與戰意的氣息。',
      ],
      checkTxt: '* 不朽的安戴因 - 99 ATK 99 DEF\n* 憑藉守護世界的「決心」浴火重生的\n  真正女英雄！',
      pleadTxt: '* 你試著向安戴因求饒，但她毫不動搖。',
      mercyTxt: '* 安戴因絕不會在此退讓半步！',
      victoryTitle: '擊敗「不朽的安戴因」',
      victorySub: '瀑布深處只剩下呼嘯而過的狂風……',
    },
  };

  // Angle mapping for Green SOUL shield & incoming spears:
  // 0 = UP (from top y-), 1 = RIGHT (from right x+), 2 = DOWN (from bottom y+), 3 = LEFT (from left x-)
  const DIR_ANG = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];

  function createUndyneBattle(G) {
    return {
      standalone: false,
      mode: 'title', // title | phase_menu | single_menu | intro | battle | death | victory | gameover
      sub: 'main',   // main | target | fight_bar | slice | act | item | mercy | msg | bubble | dodge
      singlePractice: false,
      singleIdx: 0,

      time: 0,
      siner: 0,
      eyeTimer: 0,
      menuCursor: 0,
      cur: 0,
      subCur: 0,
      whiteAlpha: 0,
      shake: 0,
      invuln: 0,

      // Combat stats (LV 10 Genocide Frisk vs 22,000 HP Undyne the Undying)
      hp: 56, maxHp: 56,
      bossHp: 22000, bossPrevHp: 22000, bossMaxHp: 22000,
      waveNum: 0,
      hitsTaken: 0,
      blockedCount: 0,
      seaTeaBoost: false,

      items: [],

      // Arena & SOUL
      box: { x: 248, y: 242, w: 144, h: 144 },
      tBox: { x: 248, y: 242, w: 144, h: 144 },
      soulX: 320, soulY: 314,
      soulMode: 'green', // green | red
      shieldDir: 0,      // 0:up, 1:right, 2:down, 3:left
      shieldDrawAng: -Math.PI / 2,
      shieldFlash: 0,
      smearAnim: 0,      //Undyne's spear swing that flips SOUL color!

      // Attack bar
      barX: 44, barDir: 1, lastDmg: 0, isCrit: false, sliceTick: 0, dmgY: 0, dmgVy: 0, bossHurtShake: 0,

      // Dialogue / Bubbles
      msg: '', mc: 0, onMsgDone: null,
      bubble: '', bubC: 0, onBubDone: null,
      statusTxt: '',

      // Intro & Death state
      introIdx: 0, introC: 0,
      deathIdx: 0, deathC: 0, meltStage: 0, dust: [],

      // Projectiles
      attackTimer: 0, attackDur: 240,
      arrows: [],  // Green mode directional & reverse spears
      spears: [],  // Red mode rising, homing & ring spears
      boxSway: false,

      L() { return T[G.lang === 'zh' ? 'zh' : 'en']; },

      isShielded() {
        return !!(G.noHitShield || window.UT_NO_HIT_SHIELD);
      },

      toggleNoHit() {
        window.UT_NO_HIT_SHIELD = !window.UT_NO_HIT_SHIELD;
        G.noHitShield = window.UT_NO_HIT_SHIELD;
        G.onUI?.();
      },

      resetLoadout() {
        this.hp = 56; this.maxHp = 56;
        this.bossHp = 22000; this.bossPrevHp = 22000; this.bossMaxHp = 22000;
        this.hitsTaken = 0; this.blockedCount = 0;
        this.seaTeaBoost = false;
        this.items = [
          { en: 'Ab.Quiche', zh: '被遺棄的鹹派', heal: 34 },
          { en: 'SnowPiece', zh: '雪人塊', heal: 45 },
          { en: 'SnowPiece', zh: '雪人塊', heal: 45 },
          { en: 'CinnaBun', zh: '肉桂兔包', heal: 22 },
          { en: 'CinnaBun', zh: '肉桂兔包', heal: 22 },
          { en: 'CinnaBun', zh: '肉桂兔包', heal: 22 },
          { en: 'AstroFood', zh: '太空食品', heal: 21 },
          { en: 'SeaTea', zh: '海茶 (加速!)', heal: 10, speed: true },
        ];
      },

      open(entry = 'title', standalone = true) {
        this.standalone = standalone;
        this.time = 0; this.siner = 0; this.eyeTimer = 0;
        this.menuCursor = 0;
        this.resetLoadout();
        this.clearBullets();
        if (entry === 'title') {
          this.mode = 'title';
          G.sfx.playBGM('wind', true, 0.45);
        } else {
          this.startPhase(entry);
        }
      },

      clearBullets() {
        this.arrows = []; this.spears = [];
        this.invuln = 0; this.shake = 0; this.boxSway = false;
        this.tBox = { x: 32, y: 250, w: 575, h: 140 };
        this.box = { x: 32, y: 250, w: 575, h: 140 };
      },

      startPhase(tag) {
        this.singlePractice = false;
        this.resetLoadout();
        this.clearBullets();
        if (tag === 'intro') {
          this.mode = 'intro';
          this.introIdx = 0; this.introC = 0;
          G.sfx.playBGM('earthrefused', true, 0.56);
        } else if (tag === 'death') {
          this.mode = 'death';
          this.bossHp = 0; this.deathIdx = 0; this.deathC = 0; this.meltStage = 0; this.dust = [];
          G.sfx.playBGM('wind', true, 0.48);
        } else {
          this.mode = 'battle';
          this.sub = 'main';
          this.cur = 0;
          this.whiteAlpha = 0.9;
          G.sfx.playBGM('truehero', true, 0.58);
          if (tag === 'w1') this.waveNum = 0;
          else if (tag === 'w4') { this.waveNum = 3; this.bossHp = 17500; this.bossPrevHp = 17500; }
          else if (tag === 'w6') { this.waveNum = 5; this.bossHp = 13500; this.bossPrevHp = 13500; }
          else if (tag === 'w10') { this.waveNum = 9; this.bossHp = 7500; this.bossPrevHp = 7500; }
          else this.waveNum = 0;
          this.statusTxt = this.L().statusPool[0];
        }
      },

      startSingle(idx) {
        this.singlePractice = true;
        this.singleIdx = idx;
        this.hp = 56; this.maxHp = 56;
        this.mode = 'battle';
        G.sfx.playBGM('truehero', true, 0.58);
        this.launchSinglePattern(idx);
      },

      launchSinglePattern(idx) {
        this.arrows = []; this.spears = []; this.invuln = 0;
        const map = ['g_cadence', 'g_yellow', 'g_storm', 'g_tunnel', 'g_spiral', 'r_rising', 'r_homing', 'r_rings'];
        this.setupWave(map[idx] || 'g_cadence');
      },

      // =====================================================================
      // 14 CANONICAL UNDYNE THE UNDYING WAVES (Green Shield + Red Bullet-Hell)
      // =====================================================================
      launchCampaignWave(w) {
        const seq = [
          'g_cadence',   // 0: Wave 1 - 4-way Green Shield Cadence
          'g_barrage',   // 1: Wave 2 - Rapid Alternating Green Spears
          'g_yellow',    // 2: Wave 3 - First Yellow 180° Reverse Arrows!
          'r_rising',    // 3: Wave 4 - Red SOUL Narrow Rising Floor Spears!
          'r_homing',    // 4: Wave 5 - Red SOUL Aimed Homing Spears!
          'g_yellow2',   // 5: Wave 6 - Double Reverse Spinners
          'r_rings',     // 6: Wave 7 - 6-Spear Closing Hexagon Rings!
          'g_storm',     // 7: Wave 8 - High-Speed 4-Way Spear Storm
          'g_spiral',    // 8: Wave 9 - 360° Spiral + Reverse Mix
          'r_rings8',    // 9: Wave 10 - 8-Spear Counter-Rotating Rings!
          'r_swayrise',  // 10: Wave 11 - Swaying Box Rising Spears!
          'g_tunnel',    // 11: Wave 12 - Slow-Tightening Dense Spear Tunnel!
          'g_storm',     // 12: Wave 13 - Berserk Spear Storm
          'r_homing',    // 13+: Loop
        ];
        const kind = seq[w < seq.length ? w : (6 + (w % 7))];
        this.setupWave(kind);
      },

      setupWave(kind) {
        this.sub = 'dodge';
        this.currentKind = kind;
        this.attackTimer = 0;
        this.arrows = []; this.spears = [];
        this.boxSway = false;
        const isGreen = kind.startsWith('g_');
        if (this.soulMode !== (isGreen ? 'green' : 'red')) {
          this.smearAnim = 14;
          G.sfx.sfx('spearappear', 0.65);
        }
        this.soulMode = isGreen ? 'green' : 'red';

        if (isGreen) {
          this.tBox = { x: 256, y: 246, w: 128, h: 128 };
          this.box = { x: 256, y: 246, w: 128, h: 128 };
          this.soulX = 320; this.soulY = 310;
          this.buildGreenScript(kind);
        } else {
          if (kind === 'r_rising' || kind === 'r_swayrise') {
            this.tBox = { x: 248, y: 256, w: 144, h: 128 };
            this.boxSway = (kind === 'r_swayrise');
            this.attackDur = 235;
          } else {
            this.tBox = { x: 216, y: 234, w: 208, h: 158 };
            this.attackDur = 250;
          }
          this.soulX = 320; this.soulY = 315;
        }
      },

      // Spawn scheduled arrows: { spawnT, dir (0:up,1:right,2:down,3:left), spd, yellow }
      buildGreenScript(kind) {
        const list = [];
        const add = (t, dir, spd = 3.6, yellow = false) => {
          list.push({ spawnT: t, dir: ((dir % 4) + 4) % 4, spd, yellow, dist: 225, orbit: 0 });
        };
        if (kind === 'g_cadence') {
          const dirs = [0, 0, 0, 3, 1, 0, 2, 3, 1, 0, 2, 1, 3, 0];
          dirs.forEach((d, i) => add(10 + i * 16, d, 3.5, false));
          this.attackDur = 285;
        } else if (kind === 'g_barrage') {
          const dirs = [3, 1, 0, 3, 1, 0, 2, 2, 3, 0, 1, 2, 0, 3, 1, 0];
          dirs.forEach((d, i) => add(8 + i * 13, d, 4.0, false));
          this.attackDur = 270;
        } else if (kind === 'g_yellow') {
          // Teaches Yellow Reverse Arrows (approach from dir, flip 180° to hit opposite!)
          const seq = [
            [10, 0, false], [28, 1, false], [48, 0, true], [74, 2, true],
            [100, 3, false], [118, 3, true], [144, 1, true], [170, 0, false],
            [186, 2, true], [212, 0, true],
          ];
          seq.forEach(([t, d, y]) => add(t, d, 3.4, y));
          this.attackDur = 290;
        } else if (kind === 'g_yellow2') {
          for (let i = 0; i < 14; i++) {
            add(10 + i * 16, (i * 3) % 4, 3.7, i % 2 === 1);
          }
          this.attackDur = 295;
        } else if (kind === 'g_storm') {
          for (let i = 0; i < 22; i++) {
            const d = (i % 3 === 0) ? Math.floor(Math.random() * 4) : ((i * 7 + 1) % 4);
            add(8 + i * 10, d, 4.5, false);
          }
          this.attackDur = 285;
        } else if (kind === 'g_tunnel') {
          // Famous slow-moving tightly-packed spear stream!
          for (let i = 0; i < 20; i++) {
            add(6 + i * 11, Math.floor((i * 5 + Math.sin(i) * 2 + 4)) % 4, 2.35, i % 6 === 5);
          }
          this.attackDur = 315;
        } else if (kind === 'g_spiral') {
          for (let i = 0; i < 20; i++) {
            add(8 + i * 12, i % 4, 4.1, i % 4 === 3);
          }
          this.attackDur = 300;
        }
        this.arrows = list;
      },

      hurt(dmg) {
        if (this.invuln > 0) return;
        if (this.isShielded()) {
          this.invuln = 24;
          G.sfx.sfx('bell', 0.45);
          return;
        }
        this.hitsTaken++;
        G.sfx.sfx('hurt', 0.75);
        this.invuln = 32;
        this.shake = 10;
        this.hp = Math.max(0, this.hp - dmg);
        if (this.hp <= 0) {
          if (this.singlePractice) {
            this.hp = this.maxHp; // Auto-refill in Single-Attack practice so training isn't interrupted!
          } else {
            G.sfx.stopBGM();
            G.sfx.sfx('break1', 0.8);
            this.mode = 'gameover';
            this.cur = 0;
          }
        }
      },

      beginMsg(txt, cb) {
        this.sub = 'msg'; this.msg = txt; this.mc = 0;
        this.onMsgDone = cb || (() => { this.sub = 'main'; });
      },

      beginBubble(txt, cb) {
        this.sub = 'bubble'; this.bubble = txt; this.bubC = 0;
        this.onBubDone = cb || (() => {});
      },

      finishWave() {
        this.arrows = []; this.spears = []; this.boxSway = false;
        if (this.singlePractice) {
          this.launchSinglePattern(this.singleIdx);
          return;
        }
        this.waveNum++;
        this.tBox = { x: 32, y: 250, w: 575, h: 140 };
        this.sub = 'main';
        const pool = this.L().statusPool;
        this.statusTxt = pool[this.waveNum % pool.length];
      },

      // =====================================================================
      // INPUT HANDLERS
      // =====================================================================
      onConfirm() {
        G.sfx.unlock();
        if (this.mode === 'title') {
          G.sfx.sfx('select', 0.6);
          if (this.menuCursor === 0) this.startPhase('intro');
          else if (this.menuCursor === 1) { this.mode = 'phase_menu'; this.menuCursor = 0; }
          else if (this.menuCursor === 2) { this.mode = 'single_menu'; this.menuCursor = 0; }
          else if (this.menuCursor === 3) { this.toggleNoHit(); }
          else if (this.menuCursor === 4) this.exitToOverworld();
          return;
        }
        if (this.mode === 'phase_menu') {
          G.sfx.sfx('select', 0.6);
          const tags = ['intro', 'w1', 'w4', 'w6', 'w10', 'death'];
          if (this.menuCursor < tags.length) this.startPhase(tags[this.menuCursor]);
          else { this.mode = 'title'; this.menuCursor = 0; }
          return;
        }
        if (this.mode === 'single_menu') {
          G.sfx.sfx('select', 0.6);
          if (this.menuCursor < 8) this.startSingle(this.menuCursor);
          else { this.mode = 'title'; this.menuCursor = 0; }
          return;
        }
        if (this.mode === 'intro') {
          const cur = this.L().introSpeech[this.introIdx];
          if (cur && this.introC < cur.text.length) { this.introC = cur.text.length; return; }
          if (this.introIdx < this.L().introSpeech.length - 1) {
            this.introIdx++; this.introC = 0;
            if (this.introIdx === 3) { this.whiteAlpha = 1.25; G.sfx.sfx('eyeflash', 0.8); G.sfx.playBGM('truehero', true, 0.58); }
          } else {
            this.startPhase('w1');
          }
          return;
        }
        if (this.mode === 'death') {
          const cur = this.L().deathBubbles[this.deathIdx];
          if (cur && this.deathC < cur.length) { this.deathC = cur.length; return; }
          if (this.deathIdx < this.L().deathBubbles.length - 1) {
            this.deathIdx++; this.deathC = 0;
            this.meltStage = Math.min(2, this.deathIdx);
          } else {
            G.sfx.sfx('vaporized', 0.8);
            this.mode = 'victory'; this.cur = 0;
          }
          return;
        }
        if (this.mode === 'victory' || this.mode === 'gameover') {
          G.sfx.sfx('select', 0.6);
          if (this.cur === 0) this.startPhase('w1');
          else if (this.cur === 1) { this.mode = 'single_menu'; this.menuCursor = 0; }
          else this.exitToOverworld();
          return;
        }

        if (this.sub === 'msg') {
          const plain = stripCodes(this.msg);
          if (this.mc < plain.length) this.mc = plain.length;
          else { G.sfx.sfx('select', 0.5); this.onMsgDone?.(); }
          return;
        }
        if (this.sub === 'bubble') {
          if (this.bubC < this.bubble.length) this.bubC = this.bubble.length;
          else this.onBubDone?.();
          return;
        }
        if (this.sub === 'main') {
          G.sfx.sfx('select', 0.55);
          if (this.cur === 0) { this.sub = 'target'; }
          else if (this.cur === 1) { this.sub = 'act'; this.subCur = 0; }
          else if (this.cur === 2) {
            if (!this.items.length) this.beginMsg(G.lang === 'zh' ? '* 你的補給已經用完了！' : '* You are out of items!', () => { this.sub = 'main'; });
            else { this.sub = 'item'; this.subCur = 0; }
          } else if (this.cur === 3) { this.sub = 'mercy'; }
          return;
        }
        if (this.sub === 'target') {
          this.sub = 'fight_bar';
          this.barDir = Math.random() < 0.5 ? 1 : -1;
          this.barX = this.barDir > 0 ? 44 : 596;
          return;
        }
        if (this.sub === 'fight_bar') {
          const dist = Math.abs(this.barX - 320);
          this.isCrit = dist <= 16;
          const accuracy = Math.max(0.25, 1 - dist / 290);
          this.lastDmg = Math.round((this.isCrit ? 1980 : 1620 * accuracy) + Math.random() * 95);
          G.sfx.sfx('laz', 0.75, this.isCrit ? 1.15 : 1.0);
          this.sub = 'slice'; this.sliceTick = 0;
          return;
        }
        if (this.sub === 'act') {
          G.sfx.sfx('select', 0.55);
          const txt = this.subCur === 0 ? this.L().checkTxt : this.L().pleadTxt;
          this.beginMsg(txt, () => this.startEnemyTurn());
          return;
        }
        if (this.sub === 'item') {
          const it = this.items[this.subCur];
          if (!it) return;
          this.items.splice(this.subCur, 1);
          this.hp = Math.min(this.maxHp, this.hp + it.heal);
          if (it.speed) this.seaTeaBoost = true;
          G.sfx.sfx('heal', 0.7);
          const nm = G.lang === 'zh' ? it.zh : it.en;
          this.beginMsg(G.lang === 'zh' ? `* 你使用了 ${nm}！\n* 恢復了 ${it.heal} HP！` : `* You used the ${nm}!\n* Recovered ${it.heal} HP!`, () => this.startEnemyTurn());
          return;
        }
        if (this.sub === 'mercy') {
          G.sfx.sfx('select', 0.55);
          this.beginMsg(this.L().mercyTxt, () => this.startEnemyTurn());
        }
      },

      startEnemyTurn() {
        const lines = this.L().turnBubbles;
        const line = lines[this.waveNum % lines.length];
        this.beginBubble(line, () => this.launchCampaignWave(this.waveNum));
      },

      onCancel() {
        if (this.mode === 'intro') { this.startPhase('w1'); return; }
        if (this.mode === 'phase_menu' || this.mode === 'single_menu') { this.mode = 'title'; this.menuCursor = 0; G.sfx.sfx('select', 0.45); return; }
        if (this.singlePractice && this.sub === 'dodge') {
          this.clearBullets(); this.mode = 'single_menu'; this.menuCursor = this.singleIdx; return;
        }
        if (this.sub === 'msg') { this.mc = 9999; return; }
        if (this.sub === 'bubble') { this.bubC = 9999; return; }
        if (['target', 'act', 'item', 'mercy'].includes(this.sub)) {
          this.sub = 'main'; G.sfx.sfx('select', 0.45);
        }
      },

      onNav(dir) {
        const dMap = { up: 0, right: 1, down: 2, left: 3 };
        if (this.sub === 'dodge' && this.soulMode === 'green' && dir in dMap) {
          this.shieldDir = dMap[dir];
          return;
        }
        if (this.mode === 'title' || this.mode === 'phase_menu' || this.mode === 'single_menu') {
          const n = this.mode === 'title' ? 5 : (this.mode === 'phase_menu' ? 7 : 9);
          if (dir === 'up') this.menuCursor = (this.menuCursor + n - 1) % n;
          else if (dir === 'down') this.menuCursor = (this.menuCursor + 1) % n;
          G.sfx.sfx('squeak', 0.45);
          return;
        }
        if (this.mode === 'victory' || this.mode === 'gameover') {
          if (dir === 'up' || dir === 'left') this.cur = (this.cur + 2) % 3;
          else if (dir === 'down' || dir === 'right') this.cur = (this.cur + 1) % 3;
          G.sfx.sfx('squeak', 0.45);
          return;
        }
        if (this.sub === 'main') {
          if (dir === 'left') this.cur = (this.cur + 3) % 4;
          else if (dir === 'right') this.cur = (this.cur + 1) % 4;
          G.sfx.sfx('squeak', 0.45);
        } else if (this.sub === 'act') {
          if (dir === 'left' || dir === 'right' || dir === 'up' || dir === 'down') this.subCur ^= 1;
          G.sfx.sfx('squeak', 0.45);
        } else if (this.sub === 'item') {
          const len = this.items.length; if (!len) return;
          if (dir === 'up' || dir === 'down') this.subCur = (this.subCur + 2) % len;
          else if (dir === 'left' || dir === 'right') this.subCur = (this.subCur + 1) % len;
          G.sfx.sfx('squeak', 0.45);
        }
      },

      onCanvasTap(cx, cy) {
        G.sfx.unlock();
        if (this.mode === 'title' || this.mode === 'phase_menu' || this.mode === 'single_menu') {
          const startY = this.mode === 'title' ? 205 : (this.mode === 'phase_menu' ? 120 : 108);
          const rowH = this.mode === 'title' ? 40 : (this.mode === 'phase_menu' ? 42 : 35);
          const n = this.mode === 'title' ? 5 : (this.mode === 'phase_menu' ? 7 : 9);
          const idx = Math.floor((cy - startY) / rowH);
          if (idx >= 0 && idx < n) { this.menuCursor = idx; this.onConfirm(); }
          return;
        }
        // Mobile direct quadrant tap to aim Green SOUL Shield effortlessly!
        if (this.sub === 'dodge' && this.soulMode === 'green') {
          const dx = cx - this.soulX, dy = cy - this.soulY;
          if (Math.hypot(dx, dy) > 8) {
            this.shieldDir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);
          }
          return;
        }
        if (this.sub === 'main' && cy >= 420) {
          const btX = [32, 185, 338, 491];
          for (let i = 0; i < 4; i++) {
            if (cx >= btX[i] && cx <= btX[i] + 114) { this.cur = i; this.onConfirm(); return; }
          }
        }
        this.onConfirm();
      },

      exitToOverworld() {
        if (this.standalone) window.location.href = 'index.html';
        else G.onExitUndyne?.();
      },

      // =====================================================================
      // 60FPS UPDATE LOOP
      // =====================================================================
      update(keys) {
        this.time++;
        this.siner += 0.7; // 1.4 @ 30fps = 0.7 @ 60fps!
        this.eyeTimer = (this.eyeTimer + 0.5) % 40;
        if (this.whiteAlpha > 0) this.whiteAlpha = Math.max(0, this.whiteAlpha - 0.035);
        if (this.shake > 0) this.shake = Math.max(0, this.shake * 0.84 - 0.1);
        if (this.invuln > 0) this.invuln--;
        if (this.shieldFlash > 0) this.shieldFlash--;
        if (this.smearAnim > 0) this.smearAnim--;
        if (this.bossHurtShake > 0) this.bossHurtShake--;

        // Smooth shield angle interpolation
        const targetAng = DIR_ANG[this.shieldDir];
        let diff = targetAng - this.shieldDrawAng;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        this.shieldDrawAng += diff * 0.45;

        if (this.mode === 'intro') {
          const cur = this.L().introSpeech[this.introIdx];
          if (cur && this.introC < cur.text.length && this.time % 2 === 0) {
            this.introC++;
            const ch = cur.text[this.introC - 1];
            if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice(this.introIdx >= 3 ? 'undying' : 'undyne');
          }
          return;
        }
        if (this.mode === 'death') {
          const cur = this.L().deathBubbles[this.deathIdx];
          if (cur && this.deathC < cur.length && this.time % 2 === 0) {
            this.deathC++;
            const ch = cur[this.deathC - 1];
            if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice('undying');
          }
          return;
        }
        if (this.mode !== 'battle') return;

        // Smooth arena box tween (+ swaying box on Wave 11!)
        if (this.boxSway && this.sub === 'dodge') {
          this.tBox.x = 248 + Math.sin(this.attackTimer * 0.055) * 44;
        }
        this.box.x += (this.tBox.x - this.box.x) * 0.24;
        this.box.y += (this.tBox.y - this.box.y) * 0.24;
        this.box.w += (this.tBox.w - this.box.w) * 0.24;
        this.box.h += (this.tBox.h - this.box.h) * 0.24;

        if (this.sub === 'msg') {
          const plain = stripCodes(this.msg);
          if (this.mc < plain.length) {
            this.mc++;
            const ch = plain[this.mc - 1];
            if (ch && ch !== ' ' && ch !== '\n' && ch !== '*') G.sfx.voice('narrator');
          }
          return;
        }
        if (this.sub === 'bubble') {
          if (this.bubC < this.bubble.length && this.time % 2 === 0) {
            this.bubC++;
            const ch = this.bubble[this.bubC - 1];
            if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice('undying');
          }
          return;
        }
        if (this.sub === 'fight_bar') {
          this.barX += this.barDir * 7.8;
          if (this.barX < 38 || this.barX > 602) {
            this.lastDmg = 0; this.isCrit = false;
            this.sub = 'slice'; this.sliceTick = 18;
          }
          return;
        }
        if (this.sub === 'slice') {
          this.sliceTick++;
          if (this.sliceTick === 16 && this.lastDmg > 0) {
            G.sfx.sfx('damage', 0.85);
            this.shake = this.isCrit ? 16 : 10;
            this.bossHurtShake = 20;
            this.bossPrevHp = this.bossHp;
            this.bossHp = Math.max(0, this.bossHp - this.lastDmg);
            this.dmgY = 0; this.dmgVy = -7.2;
          }
          if (this.sliceTick > 16) {
            this.dmgY += this.dmgVy; this.dmgVy += 0.52;
            if (this.dmgY > 0) { this.dmgY = 0; this.dmgVy *= -0.35; }
            this.bossPrevHp += (this.bossHp - this.bossPrevHp) * 0.2;
          }
          if (this.sliceTick > 52) {
            if (this.bossHp <= 0) {
              G.sfx.stopBGM();
              G.sfx.playBGM('wind', true, 0.48);
              this.mode = 'death'; this.deathIdx = 0; this.deathC = 0; this.meltStage = 0;
            } else {
              this.startEnemyTurn();
            }
          }
          return;
        }

        if (this.sub === 'dodge') this.updateDodge(keys);
      },

      updateDodge(keys) {
        this.attackTimer++;
        const t = this.attackTimer;

        if (this.soulMode === 'green') {
          if (keys.up) this.shieldDir = 0;
          else if (keys.right) this.shieldDir = 1;
          else if (keys.down) this.shieldDir = 2;
          else if (keys.left) this.shieldDir = 3;

          // Update Green Mode directional & yellow reverse arrows!
          const rem = [];
          for (const a of this.arrows) {
            if (t < a.spawnT) { rem.push(a); continue; }
            if (t === a.spawnT) G.sfx.sfx('spearappear', 0.25, a.yellow ? 1.25 : 1.0);
            a.dist -= a.spd;
            // Yellow Reverse Arrow: when dist reaches 72..36, smoothly orbits 180° around the player to strike opposite side!
            if (a.yellow && a.dist < 76 && a.orbit < Math.PI) {
              if (a.orbit === 0) G.sfx.sfx('bell', 0.42, 1.3);
              a.orbit = Math.min(Math.PI, a.orbit + 0.22);
            }
            const hitDir = a.yellow && a.orbit >= Math.PI * 0.65 ? ((a.dir + 2) % 4) : a.dir;
            if (a.dist <= 27 && a.dist >= 12 && hitDir === this.shieldDir) {
              // BLOCKED BY SPEAR SHIELD!
              this.shieldFlash = 6;
              this.blockedCount++;
              G.sfx.sfx('arrow', 0.55, 0.96 + Math.random() * 0.08);
              continue;
            }
            if (a.dist <= 8) {
              this.hurt(11);
              continue;
            }
            rem.push(a);
          }
          this.arrows = rem;
          if (!this.arrows.length || t >= this.attackDur) this.finishWave();
          return;
        }

        // RED SOUL MODE MOVEMENT & SPEARS
        const ramp = keys.moveScale != null ? keys.moveScale : 1;
        const spd = (keys.cancel ? 1.15 : (this.seaTeaBoost ? 2.85 : 2.25)) * ramp;
        let dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
        let dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
        if (dx && dy) { dx *= 0.75; dy *= 0.75; }
        this.soulX = Math.max(this.box.x + 10, Math.min(this.box.x + this.box.w - 10, this.soulX + dx * spd));
        this.soulY = Math.max(this.box.y + 10, Math.min(this.box.y + this.box.h - 10, this.soulY + dy * spd));

        const kind = this.currentKind;
        // 1. Rising Floor Spears (3 columns inside narrow box!)
        if ((kind === 'r_rising' || kind === 'r_swayrise') && t < this.attackDur - 35 && t % 17 === 2) {
          const col = Math.floor(Math.random() * 3);
          const relX = 24 + col * 48;
          this.spears.push({ type: 'rise', relX, timer: 0 });
        }
        // 2. Aimed Homing Spears
        else if (kind === 'r_homing' && t < this.attackDur - 40 && t % 14 === 2) {
          G.sfx.sfx('spearappear', 0.42);
          const ang = Math.random() * Math.PI * 2;
          const sx = this.soulX + Math.cos(ang) * 145;
          const sy = this.soulY + Math.sin(ang) * 125;
          const aim = Math.atan2(this.soulY - sy, this.soulX - sx);
          this.spears.push({ type: 'aim', x: sx, y: sy, ang: aim, timer: 0, vx: Math.cos(aim) * 6.2, vy: Math.sin(aim) * 6.2 });
        }
        // 3. Closing 6-Spear / 8-Spear Hexagon Rings!
        else if ((kind === 'r_rings' || kind === 'r_rings8') && t < this.attackDur - 55 && t % 46 === 4) {
          G.sfx.sfx('spearappear', 0.5);
          const n = kind === 'r_rings8' ? 7 : 6;
          const cx = this.soulX, cy = this.soulY;
          const spinSign = (Math.floor(t / 46) % 2 === 0) ? 1 : -1;
          const baseA = Math.random() * Math.PI * 2;
          for (let i = 0; i < n; i++) {
            this.spears.push({
              type: 'ring', cx, cy, baseA: baseA + (i / n) * Math.PI * 2,
              rad: 118, spin: spinSign * 0.032, timer: 0,
            });
          }
        }

        const nextS = [];
        for (const s of this.spears) {
          s.timer++;
          if (s.type === 'rise') {
            const wx = this.box.x + s.relX;
            const wy = this.box.y + this.box.h;
            if (s.timer === 18) G.sfx.sfx('spearrise', 0.5);
            if (s.timer >= 18 && s.timer <= 30) {
              if (Math.abs(this.soulX - wx) < 15 && this.soulY > wy - 56) this.hurt(11);
            }
            if (s.timer < 34) nextS.push(s);
          } else if (s.type === 'aim') {
            if (s.timer < 18) {
              s.ang = Math.atan2(this.soulY - s.y, this.soulX - s.x);
              s.vx = Math.cos(s.ang) * 6.2; s.vy = Math.sin(s.ang) * 6.2;
            } else {
              if (s.timer === 18) G.sfx.sfx('arrow', 0.4);
              s.x += s.vx; s.y += s.vy;
              if (Math.hypot(s.x - this.soulX, s.y - this.soulY) < 11) this.hurt(11);
            }
            if (s.timer < 95 && s.x > -60 && s.x < 700 && s.y > -60 && s.y < 540) nextS.push(s);
          } else if (s.type === 'ring') {
            s.baseA += s.spin;
            if (s.timer > 16) s.rad -= 2.35;
            const sx = s.cx + Math.cos(s.baseA) * s.rad;
            const sy = s.cy + Math.sin(s.baseA) * s.rad;
            s.x = sx; s.y = sy; s.ang = Math.atan2(s.cy - sy, s.cx - sx);
            if (s.rad > 8 && Math.hypot(sx - this.soulX, sy - this.soulY) < 10) this.hurt(11);
            if (s.rad > -18) nextS.push(s);
          }
        }
        this.spears = nextS;
        if (t >= this.attackDur) this.finishWave();
      },

      // =====================================================================
      // RENDERER (640x480 Canvas)
      // =====================================================================
      render(ctx) {
        const L = this.L(), zh = G.lang === 'zh';
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 640, 480);

        if (this.shake > 0.3) {
          ctx.translate((Math.random() - 0.5) * this.shake * 2, (Math.random() - 0.5) * this.shake * 2);
        }

        // ---------------- SIMULATOR MENUS ----------------
        if (this.mode === 'title' || this.mode === 'phase_menu' || this.mode === 'single_menu') {
          // Subtle Undying silhouette on the right
          this.drawUndyneUndyingBody(ctx, 432, 34);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.64)';
          ctx.fillRect(0, 0, 640, 480);

          drawRichText(ctx, L.simTitle, 42, 34, 999, { size: 30, color: '#48e8ff', who: 'undying' });
          drawRichText(ctx, L.simSub, 42, 72, 999, { size: 17, color: '#bbbbcc', maxWidth: 560 });

          let list;
          if (this.mode === 'title') {
            list = L.menuOpts.map((o, i) => i === 3 ? (o + (this.isShielded() ? '[ON]' : '[OFF]')) : o);
          } else {
            list = this.mode === 'phase_menu' ? L.phaseOpts : L.singleOpts;
          }
          const startY = this.mode === 'title' ? 205 : (this.mode === 'phase_menu' ? 120 : 108);
          const rowH = this.mode === 'title' ? 40 : (this.mode === 'phase_menu' ? 42 : 35);

          list.forEach((lbl, idx) => {
            const sel = this.menuCursor === idx;
            const y = startY + idx * rowH;
            if (sel) drawSpr(ctx, 'spr_heartgreen', 0, 46, y + 4, 1, 1);
            drawRichText(ctx, lbl, 76, y, 999, { size: this.mode === 'single_menu' ? 18 : 20, color: sel ? '#ffff00' : '#ffffff', maxWidth: 536, maxHeight: rowH - 4 });
          });

          drawRichText(ctx, zh ? '↑↓ 選擇 · Z / 點擊確認 · 綠魂時可直接點擊畫面四方擋矛！' : '↑↓ Select · Z / Click Confirm · Tap around Green SOUL to block!', 42, 446, 999, { size: 15, color: '#888899' });
          ctx.restore();
          return;
        }

        // ---------------- INTRO TRANSFORMATION ----------------
        if (this.mode === 'intro') {
          const step = L.introSpeech[this.introIdx];
          if (this.introIdx < 3) {
            drawSpr(ctx, 'spr_undyneb_fatal', Math.min(9, this.introIdx * 3), 232, 44, 2, 2);
          } else {
            this.drawUndyneUndyingBody(ctx, 220, 22);
          }
          ctx.fillStyle = '#fff'; ctx.fillRect(392, 48, 226, 134);
          ctx.beginPath(); ctx.moveTo(392, 96); ctx.lineTo(374, 106); ctx.lineTo(392, 116); ctx.fill();
          drawRichText(ctx, step.text, 404, 58, this.introC, { size: 18, lineH: 24, color: '#000', who: 'undying', maxWidth: 204, maxHeight: 116 });
          drawRichText(ctx, zh ? '[X] 跳過開場' : '[X] Skip Intro', 468, 444, 999, { size: 15, color: '#777' });
          if (this.whiteAlpha > 0) { ctx.fillStyle = `rgba(255,255,255,${Math.min(1, this.whiteAlpha)})`; ctx.fillRect(0, 0, 640, 480); }
          ctx.restore();
          return;
        }

        // ---------------- DEATH / VICTORY / GAMEOVER ----------------
        if (this.mode === 'death') {
          if (this.meltStage < 2) {
            drawSpr(ctx, 'spr_undynex_melt', this.meltStage, 145, -18, 1.7, 1.7);
          } else {
            drawSpr(ctx, 'spr_undyneb_lastmelt', 0, 165, 16, 1.5, 1.5);
          }
          const line = L.deathBubbles[this.deathIdx] || '';
          ctx.fillStyle = '#fff'; ctx.fillRect(392, 54, 226, 134);
          ctx.beginPath(); ctx.moveTo(392, 98); ctx.lineTo(374, 108); ctx.lineTo(392, 118); ctx.fill();
          drawRichText(ctx, line, 404, 64, this.deathC, { size: 18, lineH: 24, color: '#000', who: 'undying', maxWidth: 204, maxHeight: 116 });
          drawRichText(ctx, zh ? '按 [Z] 繼續……' : 'Press [Z] to continue...', 220, 420, 999, { size: 18, color: '#888' });
          ctx.restore();
          return;
        }

        if (this.mode === 'victory' || this.mode === 'gameover') {
          const win = this.mode === 'victory';
          drawRichText(ctx, win ? L.victoryTitle : 'GAME OVER', 72, 92, 999, { size: 32, color: win ? '#48e8ff' : '#ff3838', who: 'undying' });
          drawRichText(ctx, win ? L.victorySub : (zh ? '別放棄！保持你的決心！' : 'Do not give up! Stay determined!'), 72, 138, 999, { size: 19, color: '#dddddd' });
          const stat = zh
            ? `成功格擋長矛: ${this.blockedCount} 次\n承受命中次數: ${this.hitsTaken} 次`
            : `Spears Blocked: ${this.blockedCount}\nHits Taken: ${this.hitsTaken}`;
          drawRichText(ctx, stat, 72, 198, 999, { size: 21, lineH: 32, color: '#a8ffd0' });
          const opts = zh ? ['再戰不朽的安戴因', '單招練習模式 (Single Attacks)', '返回大冒險'] : ['Retry Full Boss Fight', 'Single Attack Practice', 'Back to Overworld'];
          opts.forEach((o, i) => {
            const y = 310 + i * 40;
            if (this.cur === i) drawSpr(ctx, 'spr_heartgreen', 0, 74, y + 4, 1, 1);
            drawRichText(ctx, o, 104, y, 999, { size: 22, color: this.cur === i ? '#ffff00' : '#ffffff' });
          });
          ctx.restore();
          return;
        }

        // ---------------- MAIN BATTLE RENDER ----------------
        // Subtle green ambient grid lines behind Undyne
        ctx.strokeStyle = 'rgba(30, 110, 75, 0.25)';
        ctx.lineWidth = 1;
        for (let gx = 40; gx < 600; gx += 80) { ctx.beginPath(); ctx.moveTo(gx, 12); ctx.lineTo(gx, 232); ctx.stroke(); }
        for (let gy = 20; gy < 235; gy += 52) { ctx.beginPath(); ctx.moveTo(32, gy); ctx.lineTo(608, gy); ctx.stroke(); }

        // 1. Articulated Undyne the Undying Body (exact obj_undynex_body!)
        const hx = this.bossHurtShake > 0 ? (this.bossHurtShake % 4 < 2 ? -10 : 10) : 0;
        this.drawUndyneUndyingBody(ctx, 220 + hx, 22);

        // Spear smear flash when flipping SOUL color
        if (this.smearAnim > 0) {
          drawSprExt(ctx, 'spr_undyneb_smear', 0, 140, 65, 1.2, 1.2, 0, null, this.smearAnim / 14);
        }

        // Slash & Damage Numbers + Boss HP Bar
        if (this.sub === 'slice') {
          if (this.sliceTick < 18) {
            drawSpr(ctx, 'spr_slice_o', Math.min(5, Math.floor(this.sliceTick / 3)), 302, 56, 2.2, 2.2);
          } else {
            ctx.fillStyle = '#400000'; ctx.fillRect(210, 128, 220, 18);
            ctx.fillStyle = '#00e000'; ctx.fillRect(210, 128, Math.max(0, Math.round(220 * (this.bossPrevHp / this.bossMaxHp))), 18);
            const dTxt = this.lastDmg > 0 ? String(this.lastDmg) : 'MISS';
            drawRichText(ctx, dTxt, 275, 88 + this.dmgY, 999, { size: 32, color: this.lastDmg > 0 ? '#ff3838' : '#cccccc' });
            if (this.isCrit) drawRichText(ctx, '\\YCRITICAL!', 265, 58, 999, { size: 20 });
          }
        }

        // Speech Bubble
        if (this.sub === 'bubble' && this.bubble) {
          ctx.fillStyle = '#fff'; ctx.fillRect(402, 42, 224, 130);
          ctx.beginPath(); ctx.moveTo(402, 90); ctx.lineTo(384, 100); ctx.lineTo(402, 110); ctx.fill();
          drawRichText(ctx, this.bubble, 414, 52, this.bubC, { size: 18, lineH: 24, color: '#000', who: 'undying', maxWidth: 202, maxHeight: 112 });
        }

        // 2. Arena Box
        ctx.fillStyle = '#000'; ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);
        ctx.strokeStyle = this.soulMode === 'green' && this.sub === 'dodge' ? '#38ff7a' : '#fff';
        ctx.lineWidth = 5; ctx.strokeRect(this.box.x, this.box.y, this.box.w, this.box.h);

        // 3. Menu / Dodge Contents
        if (this.sub === 'main') {
          drawRichText(ctx, this.statusTxt, 52, 268, 999, { size: 23, lineH: 31, maxWidth: 536, maxHeight: 112 });
        } else if (this.sub === 'msg') {
          drawRichText(ctx, this.msg, 52, 266, Math.floor(this.mc), { size: 22, lineH: 30, maxWidth: 536, maxHeight: 114 });
        } else if (this.sub === 'target') {
          drawSpr(ctx, 'spr_heart', 0, 58, 282, 1, 1);
          drawRichText(ctx, zh ? '* 不朽的安戴因 (Undyne the Undying)' : '* Undyne the Undying', 86, 276, 999, { size: 23 });
          ctx.fillStyle = '#600000'; ctx.fillRect(440, 282, 136, 18);
          ctx.fillStyle = '#00d800'; ctx.fillRect(440, 282, Math.round(136 * (this.bossHp / this.bossMaxHp)), 18);
        } else if (this.sub === 'fight_bar' || this.sub === 'slice') {
          drawSpr(ctx, 'spr_target', 0, 39, 256, 1, 1);
          ctx.strokeStyle = 'rgba(255,255,0,0.45)'; ctx.lineWidth = 2; ctx.strokeRect(312, 256, 16, 128);
          drawSpr(ctx, 'spr_targetchoice', Math.floor(this.time / 3) % 2, Math.round(this.barX - 7), 256, 1, 1);
        } else if (this.sub === 'act') {
          const acts = zh ? ['* 檢查 (Check)', '* 求饒 (Plead)'] : ['* Check', '* Plead'];
          acts.forEach((a, i) => {
            const ax = i === 0 ? 86 : 346;
            if (this.subCur === i) drawSpr(ctx, 'spr_heart', 0, ax - 28, 282, 1, 1);
            drawRichText(ctx, a, ax, 276, 999, { size: 23, color: this.subCur === i ? '#ffff00' : '#ffffff' });
          });
        } else if (this.sub === 'item') {
          this.items.slice(0, 8).forEach((it, i) => {
            const col = i % 2, row = Math.floor(i / 2);
            const ix = 76 + col * 260, iy = 264 + row * 28;
            if (this.subCur === i) drawSpr(ctx, 'spr_heart', 0, ix - 24, iy + 5, 1, 1);
            drawRichText(ctx, `* ${zh ? it.zh : it.en}`, ix, iy, 999, { size: 20, color: this.subCur === i ? '#ffff00' : '#ffffff' });
          });
        } else if (this.sub === 'mercy') {
          drawSpr(ctx, 'spr_heart', 0, 58, 282, 1, 1);
          drawRichText(ctx, zh ? '* 寬恕 (Spare)' : '* Spare', 86, 276, 999, { size: 23 });
        } else if (this.sub === 'dodge') {
          this.drawDodgeScene(ctx);
        }

        // 4. HUD & Buttons
        drawBattleHUD(ctx, { name: G.state.name || 'CHARA', lv: 10, hp: this.hp, maxHp: this.maxHp }, 398);
        const btSprs = ['spr_fightbt', 'spr_talkbt', 'spr_itembt', 'spr_sparebt'];
        const btX = [32, 185, 338, 491];
        for (let i = 0; i < 4; i++) {
          const sel = this.sub === 'main' && this.cur === i;
          drawSpr(ctx, btSprs[i], sel ? 0 : 1, btX[i], 430, 1, 1);
          if (sel) drawSpr(ctx, 'spr_heart', 0, btX[i] + 8, 444, 1, 1);
        }

        if (this.singlePractice && this.sub === 'dodge') {
          drawRichText(ctx, zh ? '[X] 返回單招列表' : '[X] Exit Practice', 440, 10, 999, { size: 15, color: '#cccccc' });
        }
        if (this.whiteAlpha > 0) {
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, this.whiteAlpha)})`;
          ctx.fillRect(0, 0, 640, 480);
        }
        ctx.restore();
      },

      // Exact Toby Fox obj_undynex_body articulated rig!
      drawUndyneUndyingBody(ctx, x, y) {
        const sf = Math.sin(this.siner / 6);
        const sf2 = Math.sin(this.siner / 3);
        const sf3 = Math.sin(this.siner / 14);
        const hurt = this.bossHurtShake > 0;

        drawSprExt(ctx, 'spr_undynex_hair', 0, x + 85, y + sf * 3 + 4, 2, 2, 70 - sf * 15, null, 1, true);
        drawSprExt(ctx, 'spr_undynex_legs', 0, x + 100, y + 164, 2, 2, 0, null, 1, true);
        drawSprExt(ctx, 'spr_undynex_leftarm', 0, x + 64 + sf * 5, y + 78 + sf * 5, 2, 2, 0, null, 1, true);
        drawSprExt(ctx, 'spr_undynex_rightarm', 0, x + 136 + sf2 * 3, y + 78 + sf * 6 + sf2 * 2, 2, 2, 0, null, 1, true);
        drawSprExt(ctx, 'spr_undynex_torso', 0, x + 100, y + 78 + sf * 4, 2, 2, -(sf * 4), null, 1, true);
        drawSprExt(ctx, 'spr_undynex_pants', 0, x + 100, y + 122 + sf * 2, 2, 2, sf * 2, null, 1, true);
        drawSprExt(ctx, hurt ? 'spr_undynex_face_damage' : 'spr_undynex_face1', 0, x + 100, y + 28 + sf * 2, 2, 2, 0, null, 1, true);

        // Iconic Spear-Beam Eye Flash!
        if (!hurt && this.eyeTimer >= 10) {
          const et = this.eyeTimer - 10;
          const sx = Math.max(0.2, et / 4);
          const sy = Math.max(0.2, 2.5 - et / 20);
          const al = Math.max(0, Math.min(1, 1.4 - et / 22));
          drawSprExt(ctx, 'spr_undynex_eyebeam', 0, x + 110, y + 24 + sf * 2, sx, sy, -(sf3 * 32), null, al, true);
        }
      },

      drawDodgeScene(ctx) {
        const sx = this.soulX, sy = this.soulY;

        if (this.soulMode === 'green') {
          // Green guide circle + Spear Shield (obj_spearblocker)
          ctx.save();
          ctx.strokeStyle = '#1f8a3c';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(sx, sy, 30, 0, Math.PI * 2); ctx.stroke();

          // Shield bar perpendicular to shieldDrawAng
          const a = this.shieldDrawAng;
          const cx = sx + Math.cos(a) * 24, cy = sy + Math.sin(a) * 24;
          const px = -Math.sin(a) * 24, py = Math.cos(a) * 24;
          ctx.strokeStyle = this.shieldFlash > 0 ? '#ff3838' : '#38b8ff';
          ctx.lineWidth = 5;
          ctx.beginPath(); ctx.moveTo(cx - px, cy - py); ctx.lineTo(cx + px, cy + py); ctx.stroke();
          // Spearhead tip on shield
          ctx.fillStyle = this.shieldFlash > 0 ? '#ffff60' : '#90e8ff';
          ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
          ctx.restore();

          // Find closest spawned arrow so it highlights RED (frame 1) just like Undertale!
          let closest = null, minTime = 99999;
          for (const ar of this.arrows) {
            if (this.attackTimer >= ar.spawnT) {
              const eta = ar.dist / ar.spd;
              if (eta < minTime) { minTime = eta; closest = ar; }
            }
          }

          for (const ar of this.arrows) {
            if (this.attackTimer < ar.spawnT) continue;
            const ang = DIR_ANG[ar.dir] + (ar.yellow ? ar.orbit : 0);
            const ax = sx + Math.cos(ang) * ar.dist;
            const ay = sy + Math.sin(ang) * ar.dist;
            if (ar.yellow) {
              // Yellow Reverse Arrow (points inward toward player; flips 180° after orbiting!)
              const sprDir = ar.orbit >= Math.PI * 0.5 ? ((ar.dir + 2) % 4) : ar.dir;
              const degMap = [-90, 180, 90, 0];
              drawSprExt(ctx, 'spr_bullet_testx_arrow', 0, ax, ay, 1.15, 1.15, degMap[sprDir], '#ffe838', 1, true);
            } else {
              const sprNames = ['spr_bullet_test_d', 'spr_bullet_test_l', 'spr_bullet_test_u', 'spr_bullet_test_r'];
              const isRed = (ar === closest);
              drawSprExt(ctx, sprNames[ar.dir], isRed ? 1 : 0, ax, ay, 1.15, 1.15, 0, null, 1, true);
            }
          }
        } else {
          // RED MODE SPEARS (clipped cleanly where appropriate)
          for (const s of this.spears) {
            if (s.type === 'rise') {
              const wx = this.box.x + s.relX;
              const wy = this.box.y + this.box.h;
              if (s.timer < 18) {
                ctx.fillStyle = s.timer % 4 < 2 ? '#ff3838' : '#ffff40';
                ctx.fillRect(wx - 10, wy - 8, 20, 6);
                drawRichText(ctx, '!', wx - 4, wy - 28, 999, { size: 20, color: '#ff3838' });
              } else {
                const lift = Math.min(54, (s.timer - 18) * 14);
                ctx.save();
                ctx.beginPath(); ctx.rect(this.box.x + 2, this.box.y + 2, this.box.w - 4, this.box.h - 4); ctx.clip();
                drawSpr(ctx, 'spr_risespearbullet', 0, Math.round(wx - 12), Math.round(wy - lift), 1, 1);
                ctx.restore();
              }
            } else if (s.type === 'aim' || s.type === 'ring') {
              const deg = -s.ang * 180 / Math.PI - 45; // spr_followspear_2 points diagonally (+45°) by default
              const alpha = s.timer < 12 ? s.timer / 12 : 1;
              drawSprExt(ctx, 'spr_followspear_2', 0, s.x, s.y, 1, 1, deg, null, alpha, true);
            }
          }
        }

        // Draw SOUL + No-Hit Shield Ring
        const soulSpr = this.soulMode === 'green' ? 'spr_heartgreen' : 'spr_heart';
        if (!this.invuln || Math.floor(this.invuln / 3) % 2 === 0) {
          drawSpr(ctx, soulSpr, 0, Math.round(sx - 8), Math.round(sy - 8), 1, 1);
        }
        if (this.isShielded()) {
          ctx.save(); ctx.strokeStyle = 'rgba(80,235,255,0.9)'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(sx, sy, 14, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
        }
      },
    };
  }

  window.UTUndyneEngine = { createUndyneBattle };
})();
