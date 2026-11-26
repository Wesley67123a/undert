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
        '* Green 1: Wave 1 Opening Cadence (3 Slow + Flurry)',
        '* Green 2: Overtaking Fast & Slow Staggered Spears',
        '* Green 3: Yellow 180-Deg Reverse Arrows',
        '* Green 4: Double Blue + Yellow Reverse Trap',
        '* Green 5: 24-Spear Ultra-Slow Dense Web',
        '* Red 1: Narrow 3-Lane Rising Floor Spears',
        '* Red 2: Aimed Spinning Spear Barrage',
        '* Red 3: 7 & 8-Spear Rotating Closing Rings',
        '* Red 4: 6-Spear Spinning Chasing Burst Rings',
        '* Red 5: Swaying Box Rising Floor Spears',
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
        '2. 第 1-3 波：原版慢速開場與三向藍矛',
        '3. 第 4-6 波：紅魂鎖定飛矛 & 窄框三道地刺',
        '4. 第 7-10 波：快慢超車矛 & 黃色反轉迴旋箭',
        '5. 第 11-15 波：七/八角縮圈 & 6 矛追蹤爆裂陣',
        '6. 終章謝幕：決心融化與最後的微笑',
        '< 返回主選單',
      ],
      singleOpts: [
        '* 綠魂 1：原版第 1 波（3 慢矛＋十連擊）',
        '* 綠魂 2：快慢交錯超車長矛陣',
        '* 綠魂 3：180 度黃色反轉迴旋箭',
        '* 綠魂 4：藍黃雙向陷阱連擊',
        '* 綠魂 5：24 矛超慢速密集星網',
        '* 紅魂 1：窄框三道竄升地刺陣',
        '* 紅魂 2：旋轉鎖定追蹤白矛連射',
        '* 紅魂 3：7 / 8 矛正反旋轉收縮圈',
        '* 紅魂 4：6 矛環繞鎖定追蹤齊射陣',
        '* 紅魂 5：左右擺盪框＋竄升地刺',
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
        const map = ['g_l5', 'g_l8', 'g_l10', 'g_l12', 'g_l14', 'r_rising', 'r_homing', 'r_rings', 'r_followring', 'r_swayrise'];
        this.setupWave(map[idx] || 'g_l5');
      },

      // =====================================================================
      // 15 CANONICAL UNDYNE THE UNDYING WAVES (EXACT obj_undyne_ex + obj_greenspeargen!)
      // =====================================================================
      launchCampaignWave(w) {
        const seq = [
          'g_l5',         // 0: lesson -5  (3 slow top arrows + 10-arrow flurry)
          'g_l6',         // 1: lesson -6  (Left/Right rhythmic flanks)
          'g_l7',         // 2: lesson -7  (18 slow 0.45x multi-way web -> switches to RED)
          'r_homing',     // 3: orderb 0   (obj_spearbulletfollowgen spinning aimed white spears)
          'r_rising',     // 4: orderb 1   (obj_risespearbulletgen narrow 3-lane rising spears)
          'g_l8',         // 5: lesson -8  (Fast & Slow OVERTAKING spears!)
          'g_l9',         // 6: lesson -9  (Top-barrage + sneaky left/right side spears)
          'g_l10',        // 7: lesson -10 (14 Blue + Yellow 180° Reverse Arrows -> switches to RED)
          'r_rings',      // 8: orderb 2-3 (obj_rotspeargen_gen 7-spear rotating closing rings)
          'g_l11',        // 9: lesson -11 (12 4-way Yellow Reverse Spiral!)
          'g_l12',        // 10: lesson -12 (16 Fast Blue + Yellow Double Reverse Combo!)
          'g_l13',        // 11: lesson -13 (14 Paired Normal-Then-Reverse Traps!)
          'g_l14',        // 12: lesson -14 (24 Ultra-Slow 0.35x Swirling Web -> switches to RED)
          'r_followring', // 13: orderb 4   (obj_followspeargen_2 6-spear spinning burst rings!)
          'r_rings8',     // 14: orderb 5   (obj_rotspeargen_gen 8-spear fast rotating rings!)
          'r_swayrise',   // 15: obj_boxsiner swaying narrow box + rising spears
        ];
        const kind = seq[w < seq.length ? w : (8 + (w % 8))];
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
          this.smearAnim = 7;
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
            this.tBox = { x: 254, y: 256, w: 132, h: 128 };
            this.boxSway = (kind === 'r_swayrise');
            this.attackDur = 145;
          } else if (kind === 'r_followring') {
            this.tBox = { x: 196, y: 230, w: 248, h: 162 };
            this.attackDur = 180;
          } else {
            this.tBox = { x: 216, y: 234, w: 208, h: 158 };
            this.attackDur = 145;
          }
          this.soulX = 320; this.soulY = 315;
        }
      },

      // Exact Toby Fox scr_sr(utDir, type, timemod, speedmod) @ canonical 30fps!
      // utDir: 0=left(our 3), 1=right(our 1), 2=down(our 2), 3=up(our 0), 4=random
      buildGreenScript(kind) {
        const list = [];
        const UT_TO_DIR = [3, 1, 2, 0];
        const rating = 9.5; // canonical rating=9.5 @ 30fps
        let curT = 7;
        const sr = (utDir, type = 0, timemod = 0, speedmod = 0) => {
          const dIdx = utDir === 4 ? Math.floor(Math.random() * 4) : utDir;
          const dir = UT_TO_DIR[dIdx % 4];
          const tm = (timemod === 0 && type !== 2) ? 1 : timemod;
          const sm = speedmod === 0 ? 1 : speedmod;
          // Preserves gentler user-tuned Green arrow speed (4.10px @ 30fps = 123px/s * sm)
          const spd = 4.10 * sm;
          list.push({
            spawnT: Math.round(curT),
            dir,
            spd,
            yellow: type === 1,
            dist: 292,
            orbit: 0,
            part: 0,
            siner: 0,
          });
          curT += rating * tm;
        };

        if (kind === 'g_l5') {
          // Exact ut_ref lesson == -5: 3 slow top spears, dramatic pause, then 10 crisp spears!
          sr(3, 0, 2.0, 0.55); sr(3, 0, 2.0, 0.55); sr(3, 0, 5.2, 0.55);
          [1, 2, 0, 3, 0, 2, 1, 2, 0, 3].forEach(d => sr(d, 0, 1.05, 1.35));
        } else if (kind === 'g_l6') {
          // Exact ut_ref lesson == -6: Left/Right rhythmic flurry
          [[0,1],[1,1],[0,0.65],[0,1],[1,1],[1,1],[0,1],[1,0.65],[1,1],[0,1],[1,1],[0,1],[1,1],[0,1]].forEach(([d, tm], idx) => {
            sr(d, 0, tm, idx >= 10 ? 1.48 : 1.38);
          });
        } else if (kind === 'g_l7') {
          // Exact ut_ref lesson == -7: 18 ultra-slow multi-directional spears
          for (let i = 0; i < 18; i++) sr(4, 0, 0.95, 0.52);
        } else if (kind === 'g_l8') {
          // Exact ut_ref lesson == -8: OVERTAKING fast & slow staggered spears!
          sr(3, 0, 1.0, 0.95); sr(0, 0, 1.0, 1.50); sr(2, 0, 1.0, 0.95);
          sr(1, 0, 1.0, 1.50); sr(0, 0, 1.0, 0.95); sr(3, 0, 1.0, 0.55);
          sr(2, 0, 1.0, 0.52); sr(1, 0, 1.0, 1.50); sr(0, 0, 1.0, 0.95);
          sr(3, 0, 1.0, 1.45); sr(1, 0, 1.0, 0.55); sr(2, 0, 1.0, 1.45);
        } else if (kind === 'g_l9') {
          // Exact ut_ref lesson == -9: Top barrage with sneaky left/right flanks
          const seq = [[3,0.68],[3,0.68],[3,0.68],[3,1.0],[0,0.68],[3,0.68],[3,0.68],[3,0.68],[3,1.0],[1,0.68],[3,0.68],[3,0.68],[3,1.05],[0,0.68],[3,0.68],[3,0.68],[3,1.05],[1,0.68],[3,0.68],[3,0.68]];
          seq.forEach(([d, tm]) => sr(d, 0, tm, 1.45));
        } else if (kind === 'g_l10') {
          // Exact ut_ref lesson == -10: 8 normal alternating then 6 Yellow 180° Reverse Arrows!
          for (let i = 0; i < 8; i++) sr(i % 2 === 0 ? 0 : 3, 0, 1.05, 1.0);
          for (let i = 0; i < 6; i++) sr(i % 2 === 0 ? 0 : 3, 1, 1.35, 1.0);
        } else if (kind === 'g_l11') {
          // Exact ut_ref lesson == -11: 12 4-way Yellow Reverse + Normal Spiral!
          [[1,1,1.4],[3,1,1.4],[0,1,1.4],[2,1,2.0],[3,0,1.25],[0,0,1.25],[2,0,1.25],[1,0,1.85],[2,1,1.4],[0,1,1.4],[1,1,1.4],[3,1,1.4]].forEach(([d, y, tm]) => {
            sr(d, y, tm, 1.42);
          });
        } else if (kind === 'g_l12') {
          // Exact ut_ref lesson == -12: Double Blue + Yellow Reverse Trap (x2)
          for (let r = 0; r < 2; r++) {
            sr(0, 0, 1.05, 1.25); sr(1, 0, 1.05, 1.25); sr(3, 0, 0.55, 1.25); sr(2, 1, 2.2, 1.25);
            sr(0, 0, 1.05, 1.25); sr(1, 0, 1.05, 1.25); sr(2, 0, 0.55, 1.25); sr(3, 1, 2.2, 1.25);
          }
        } else if (kind === 'g_l13') {
          // Exact ut_ref lesson == -13: Paired Blue-then-Yellow Traps from same side!
          [[0,0,1.0],[0,1,2.1],[2,0,1.0],[2,1,2.1],[1,0,1.0],[1,1,2.2],[3,0,1.0],[3,1,2.1],[0,0,1.0],[0,1,2.1],[2,0,1.0],[2,1,2.1]].forEach(([d, y, tm]) => {
            sr(d, y, tm, 1.32);
          });
        } else if (kind === 'g_l14') {
          // Exact ut_ref lesson == -14: 24 ultra-slow 0.38x dense multi-way star web!
          for (let i = 0; i < 24; i++) sr(4, 0, 0.95, 0.42);
        } else {
          for (let i = 0; i < 14; i++) sr(4, i % 3 === 2 ? 1 : 0, 1.2, 1.2);
        }
        this.arrows = list;
        this.attackDur = Math.round(curT + 95);
      },

      hurt(dmg) {
        if (this.invuln > 0) return;
        if (this.isShielded()) {
          this.invuln = 12;
          G.sfx.sfx('bell', 0.45);
          return;
        }
        this.hitsTaken++;
        G.sfx.sfx('hurt', 0.75);
        this.invuln = 16;
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
          if (this.menuCursor < 10) this.startSingle(this.menuCursor);
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
          const n = this.mode === 'title' ? 5 : (this.mode === 'phase_menu' ? 7 : 11);
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
          const startY = this.mode === 'title' ? 205 : (this.mode === 'phase_menu' ? 120 : 100);
          const rowH = this.mode === 'title' ? 40 : (this.mode === 'phase_menu' ? 42 : 30);
          const n = this.mode === 'title' ? 5 : (this.mode === 'phase_menu' ? 7 : 11);
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
      // 30FPS CANONICAL LOGIC LOOP + HIGH-FPS SMOOTH INTERPOLATION
      // =====================================================================
      _snapCapture() {
        const aMap = new Map();
        for (const a of this.arrows) aMap.set(a, { dist: a.dist, orbit: a.orbit });
        const sMap = new Map();
        for (const s of this.spears) {
          sMap.set(s, { x: s.x, y: s.y, drawAng: s.drawAng, ang: s.ang, rad: s.rad });
        }
        return {
          soulX: this.soulX, soulY: this.soulY,
          siner: this.siner, eyeTimer: this.eyeTimer,
          shieldDrawAng: this.shieldDrawAng,
          box: { ...this.box }, barX: this.barX, dmgY: this.dmgY,
          arrows: aMap, spears: sMap,
        };
      },

      _applyInterp(interpAlpha) {
        const p = this._prevSnap;
        const a = Math.max(0, Math.min(1, interpAlpha !== undefined ? interpAlpha : (this._interpAlpha !== undefined ? this._interpAlpha : 1)));
        if (!p || a >= 0.999) return null;
        const saved = {
          soulX: this.soulX, soulY: this.soulY,
          siner: this.siner, eyeTimer: this.eyeTimer,
          shieldDrawAng: this.shieldDrawAng,
          box: { ...this.box }, barX: this.barX, dmgY: this.dmgY,
          arrows: [], spears: [],
        };
        const lj = (prev, cur, maxJ = 80) => Math.abs(cur - prev) > maxJ ? cur : prev + (cur - prev) * a;
        const la = (prev, cur) => {
          const d = ((cur - prev + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
          return prev + d * a;
        };
        this.soulX = lj(p.soulX, this.soulX, 60);
        this.soulY = lj(p.soulY, this.soulY, 60);
        this.siner = lj(p.siner, this.siner, 10);
        if (Math.abs(this.eyeTimer - p.eyeTimer) < 5) this.eyeTimer = lj(p.eyeTimer, this.eyeTimer, 5);
        this.shieldDrawAng = la(p.shieldDrawAng, this.shieldDrawAng);
        this.box.x = lj(p.box.x, this.box.x, 120);
        this.box.y = lj(p.box.y, this.box.y, 120);
        this.box.w = lj(p.box.w, this.box.w, 120);
        this.box.h = lj(p.box.h, this.box.h, 120);
        this.barX = lj(p.barX, this.barX, 80);
        this.dmgY = lj(p.dmgY, this.dmgY, 40);
        for (const ar of this.arrows) {
          const pa = p.arrows.get(ar);
          if (!pa || Math.abs(ar.dist - pa.dist) > 40) continue;
          saved.arrows.push([ar, ar.dist, ar.orbit]);
          ar.dist = pa.dist + (ar.dist - pa.dist) * a;
          ar.orbit = pa.orbit + (ar.orbit - pa.orbit) * a;
        }
        for (const s of this.spears) {
          const ps = p.spears.get(s);
          if (!ps) continue;
          saved.spears.push([s, s.x, s.y, s.drawAng, s.ang, s.rad]);
          if (s.x !== undefined && ps.x !== undefined && Math.hypot(s.x - ps.x, s.y - ps.y) <= 80) {
            s.x = ps.x + (s.x - ps.x) * a;
            s.y = ps.y + (s.y - ps.y) * a;
          }
          if (s.rad !== undefined && ps.rad !== undefined && Math.abs(s.rad - ps.rad) <= 30) {
            s.rad = ps.rad + (s.rad - ps.rad) * a;
          }
          if (s.drawAng !== undefined && ps.drawAng !== undefined) s.drawAng = la(ps.drawAng, s.drawAng);
          if (s.ang !== undefined && ps.ang !== undefined) s.ang = la(ps.ang, s.ang);
        }
        return saved;
      },

      _restoreInterp(saved) {
        if (!saved) return;
        this.soulX = saved.soulX; this.soulY = saved.soulY;
        this.siner = saved.siner; this.eyeTimer = saved.eyeTimer;
        this.shieldDrawAng = saved.shieldDrawAng;
        this.box = saved.box; this.barX = saved.barX; this.dmgY = saved.dmgY;
        for (const [ar, d, o] of saved.arrows) { ar.dist = d; ar.orbit = o; }
        for (const [s, x, y, drawAng, ang, rad] of saved.spears) {
          s.x = x; s.y = y; s.drawAng = drawAng; s.ang = ang; s.rad = rad;
        }
      },

      update(keys) {
        // 60Hz compatibility wrapper: steps 1 canonical 30fps tick every 2 calls
        this._sub60 = (this._sub60 || 0) + 1;
        if (this._sub60 % 2 === 1) {
          this.step30(keys);
          this._interpAlpha = 0.5;
        } else {
          this._interpAlpha = 1.0;
        }
      },

      step30(keys) {
        this._prevSnap = this._snapCapture();
        this._interpAlpha = 1.0;
        this.time++;
        this.siner += 1.4; // exact obj_undynex_body @ 30fps!
        this.eyeTimer = (this.eyeTimer + 1) % 40;
        if (this.whiteAlpha > 0) this.whiteAlpha = Math.max(0, this.whiteAlpha - 0.07);
        if (this.shake > 0) this.shake = Math.max(0, this.shake * 0.70 - 0.2);
        if (this.invuln > 0) this.invuln--;
        if (this.shieldFlash > 0) this.shieldFlash--;
        if (this.smearAnim > 0) this.smearAnim--;
        if (this.bossHurtShake > 0) this.bossHurtShake--;

        // Smooth shield angle interpolation @ 30fps
        const targetAng = DIR_ANG[this.shieldDir];
        let diff = targetAng - this.shieldDrawAng;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        this.shieldDrawAng += diff * 0.72;

        if (this.mode === 'intro') {
          const cur = this.L().introSpeech[this.introIdx];
          if (cur && this.introC < cur.text.length) {
            this.introC++;
            const ch = cur.text[this.introC - 1];
            if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice(this.introIdx >= 3 ? 'undying' : 'undyne');
          }
          return;
        }
        if (this.mode === 'death') {
          const cur = this.L().deathBubbles[this.deathIdx];
          if (cur && this.deathC < cur.length) {
            this.deathC++;
            const ch = cur[this.deathC - 1];
            if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice('undying');
          }
          return;
        }
        if (this.mode !== 'battle') return;

        // Smooth arena box tween (+ swaying box on obj_boxsiner @ 30fps!)
        if (this.boxSway && this.sub === 'dodge') {
          this.tBox.x = 254 + Math.sin(this.attackTimer * 0.11) * 44;
        }
        this.box.x += (this.tBox.x - this.box.x) * 0.42;
        this.box.y += (this.tBox.y - this.box.y) * 0.42;
        this.box.w += (this.tBox.w - this.box.w) * 0.42;
        this.box.h += (this.tBox.h - this.box.h) * 0.42;

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
          if (this.bubC < this.bubble.length) {
            this.bubC++;
            const ch = this.bubble[this.bubC - 1];
            if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice('undying');
          }
          return;
        }
        if (this.sub === 'fight_bar') {
          this.barX += this.barDir * 15.6;
          if (this.barX < 38 || this.barX > 602) {
            this.lastDmg = 0; this.isCrit = false;
            this.sub = 'slice'; this.sliceTick = 18;
          }
          return;
        }
        if (this.sub === 'slice') {
          this.sliceTick += 2;
          if (this.sliceTick === 16 && this.lastDmg > 0) {
            G.sfx.sfx('damage', 0.85);
            this.shake = this.isCrit ? 16 : 10;
            this.bossHurtShake = 10;
            this.bossPrevHp = this.bossHp;
            this.bossHp = Math.max(0, this.bossHp - this.lastDmg);
            this.dmgY = 0; this.dmgVy = -13.5;
          }
          if (this.sliceTick > 16) {
            this.dmgY += this.dmgVy; this.dmgVy += 1.9;
            if (this.dmgY > 0) { this.dmgY = 0; this.dmgVy *= -0.35; }
            this.bossPrevHp += (this.bossHp - this.bossPrevHp) * 0.36;
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

          // Update Green Mode directional & canonical Yellow 180° Reverse arrows @ 30fps
          const rem = [];
          for (const a of this.arrows) {
            if (t < a.spawnT) { rem.push(a); continue; }
            if (t === a.spawnT) G.sfx.sfx('spearappear', 0.22, a.yellow ? 1.25 : 1.0);

            if (a.yellow && a.part === 0 && a.dist <= 84) {
              a.part = 2;
              a.siner = 0;
              a.startDist = a.dist;
              G.sfx.sfx('bell', 0.38, 1.32);
            }

            if (a.yellow && a.part === 2) {
              // Exact obj_blockbullet2 smooth 180-degree sinusoidal arc over 10 ticks @ 30fps!
              a.siner++;
              const frac = Math.min(1, a.siner / 10);
              a.orbit = frac * Math.PI;
              a.dist = a.startDist + Math.sin(frac * Math.PI) * 26;
              if (a.siner >= 10) {
                a.part = 3;
                a.orbit = Math.PI;
                a.dist = a.startDist;
              }
            } else {
              a.dist -= a.spd;
            }

            const hitDir = (a.yellow && a.part === 3) ? ((a.dir + 2) % 4) : a.dir;
            if ((!a.yellow || a.part === 3) && a.dist <= 32 && a.dist >= 10 && hitDir === this.shieldDir) {
              // BLOCKED BY SPEAR SHIELD!
              this.shieldFlash = 3;
              this.blockedCount++;
              G.sfx.sfx('arrow', 0.52, 0.96 + Math.random() * 0.08);
              continue;
            }
            if ((!a.yellow || a.part === 3) && a.dist <= 9) {
              this.hurt(11);
              continue;
            }
            rem.push(a);
          }
          this.arrows = rem;
          if (!this.arrows.length || t >= this.attackDur) this.finishWave();
          return;
        }

        // RED SOUL MODE MOVEMENT @ 30fps (Canonical 4.0px = 120px/s, Focus X = 2.0px = 60px/s, SeaTea = 5.0px)
        const spd = (keys.cancel ? 2.0 : (this.seaTeaBoost ? 5.0 : 4.0)) * (keys.moveScale || 1.0);
        let dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
        let dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
        if (dx && dy) { dx *= 0.72; dy *= 0.72; }
        this.soulX = Math.max(this.box.x + 10, Math.min(this.box.x + this.box.w - 10, this.soulX + dx * spd));
        this.soulY = Math.max(this.box.y + 10, Math.min(this.box.y + this.box.h - 10, this.soulY + dy * spd));

        const kind = this.currentKind;
        // 1. Canonical obj_risespearbulletgen @ 30fps: 3 lanes, never repeating same lane twice!
        if ((kind === 'r_rising' || kind === 'r_swayrise') && t < this.attackDur - 21 && t % 10 === 1) {
          let col = Math.floor(Math.random() * 3);
          if (col === this._lastRiseCol) col = (col + 1 + Math.floor(Math.random() * 2)) % 3;
          this._lastRiseCol = col;
          const relX = 22 + col * 44;
          const fromTop = (kind === 'r_swayrise' || Math.random() < 0.45) ? 1 : 0;
          G.sfx.sfx('spearappear', 0.32);
          this.spears.push({ type: 'rise', relX, fromTop, timer: 0 });
        }
        // 2. Canonical obj_spearbullet_follow @ 30fps: spins into aim, locks, accelerates straight!
        else if (kind === 'r_homing' && t < this.attackDur - 22 && t % 10 === 1) {
          G.sfx.sfx('spearappear', 0.40);
          const ang = Math.random() * Math.PI * 2;
          const sx = this.soulX + Math.cos(ang) * 145;
          const sy = this.soulY + Math.sin(ang) * 128;
          const aim = Math.atan2(this.soulY - sy, this.soulX - sx);
          this.spears.push({
            type: 'aim', x: sx, y: sy, ang: aim, drawAng: aim + Math.PI * 1.5,
            rotSpd: 0.56, timer: 0, spd: 5.0, vx: 0, vy: 0, fired: false,
          });
        }
        // 3. Canonical obj_rotspeargen_gen @ 30fps: 7-spear & 8-spear decelerating closing rings!
        else if ((kind === 'r_rings' || kind === 'r_rings8') && t < this.attackDur - 33 && t % 27 === 2) {
          G.sfx.sfx('spearappear', 0.48);
          const n = kind === 'r_rings8' ? 8 : 7;
          const cx = this.soulX, cy = this.soulY;
          const spinSign = (Math.floor(t / 27) % 2 === 0) ? 1 : -1;
          const baseA = Math.random() * Math.PI * 2;
          const startRad = kind === 'r_rings8' ? 196 : 184;
          for (let i = 0; i < n; i++) {
            this.spears.push({
              type: 'ring', cx, cy, baseA: baseA + (i / n) * Math.PI * 2,
              rad: startRad, rotSpd: spinSign * 0.136, rotMin: spinSign * 0.036, timer: 0,
            });
          }
        }
        // 4. Canonical obj_followspeargen_2 @ 30fps: 6-spear spinning burst rings around SOUL!
        else if (kind === 'r_followring' && t < this.attackDur - 32 && t % 24 === 2) {
          G.sfx.sfx('spearappear', 0.46);
          const n = 6;
          const cx = this.soulX, cy = this.soulY;
          const baseA = Math.random() * Math.PI * 2;
          for (let i = 0; i < n; i++) {
            const a = baseA + (i / n) * Math.PI * 2;
            const sx = cx + Math.cos(a) * 165;
            const sy = cy + Math.sin(a) * 165;
            const aim = Math.atan2(cy - sy, cx - sx);
            this.spears.push({
              type: 'followring', x: sx, y: sy, ang: aim, drawAng: aim + Math.PI,
              rotSpd: 0.60, timer: 0, fired: false, vx: Math.cos(aim) * 8.5, vy: Math.sin(aim) * 8.5,
            });
          }
        }

        const nextS = [];
        for (const s of this.spears) {
          s.timer++;
          if (s.type === 'rise') {
            const wx = this.box.x + s.relX;
            if (s.timer === 11) G.sfx.sfx('spearrise', 0.48);
            if (s.timer >= 11 && s.timer <= 19) {
              const wyTop = this.box.y;
              const wyBot = this.box.y + this.box.h;
              if (s.fromTop) {
                if (Math.abs(this.soulX - wx) < 10 && this.soulY < wyTop + 56) this.hurt(11);
              } else {
                if (Math.abs(this.soulX - wx) < 10 && this.soulY > wyBot - 56) this.hurt(11);
              }
            }
            if (s.timer < 23) nextS.push(s);
          } else if (s.type === 'aim') {
            if (!s.fired) {
              s.ang = Math.atan2(this.soulY - s.y, this.soulX - s.x);
              s.rotSpd = Math.max(0, s.rotSpd - 0.03);
              s.drawAng = s.ang + s.rotSpd * 8;
              if (s.timer >= 12) {
                s.fired = true;
                s.drawAng = s.ang;
                s.spd = 5.5;
                G.sfx.sfx('arrow', 0.38);
              }
            } else {
              s.spd = Math.min(13.0, s.spd + 0.35);
              s.x += Math.cos(s.ang) * s.spd;
              s.y += Math.sin(s.ang) * s.spd;
              if (Math.hypot(s.x - this.soulX, s.y - this.soulY) < 9.5) this.hurt(11);
            }
            if (s.timer < 62 && s.x > -70 && s.x < 710 && s.y > -70 && s.y < 550) nextS.push(s);
          } else if (s.type === 'followring') {
            if (!s.fired) {
              s.rotSpd = Math.max(0, s.rotSpd - 0.03);
              s.drawAng = s.ang + s.rotSpd * 8;
              if (s.timer >= 15) {
                s.fired = true;
                s.drawAng = s.ang;
                G.sfx.sfx('arrow', 0.30, 1.08);
              }
            } else {
              s.x += s.vx; s.y += s.vy;
              if (Math.hypot(s.x - this.soulX, s.y - this.soulY) < 9.5) this.hurt(11);
            }
            if (s.timer < 60 && s.x > -70 && s.x < 710 && s.y > -70 && s.y < 550) nextS.push(s);
          } else if (s.type === 'ring') {
            if (s.rotSpd > s.rotMin) s.rotSpd = Math.max(s.rotMin, s.rotSpd - 0.0036);
            else if (s.rotSpd < s.rotMin) s.rotSpd = Math.min(s.rotMin, s.rotSpd + 0.0036);
            s.baseA += s.rotSpd;
            if (s.timer > 7) s.rad -= (s.rad < 10 ? 2.0 : 4.0);
            const sx = s.cx + Math.cos(s.baseA) * s.rad;
            const sy = s.cy + Math.sin(s.baseA) * s.rad;
            s.x = sx; s.y = sy; s.ang = Math.atan2(s.cy - sy, s.cx - sx);
            if (s.rad > 10 && Math.hypot(sx - this.soulX, sy - this.soulY) < 9) this.hurt(11);
            if (s.rad > -14) nextS.push(s);
          }
        }
        this.spears = nextS;
        if (t >= this.attackDur) this.finishWave();
      },

      // =====================================================================
      // RENDERER (640x480 Canvas)
      // =====================================================================
      render(ctx, interpAlpha) {
        const _interpSaved = this._applyInterp(interpAlpha);
        try {
          return this._renderBody(ctx);
        } finally {
          this._restoreInterp(_interpSaved);
        }
      },

      _renderBody(ctx) {
        const L = this.L(), zh = G.lang === 'zh';
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 640, 480);

        if (this.shake > 0.3) {
          ctx.translate((Math.random() - 0.5) * this.shake * 2, (Math.random() - 0.5) * this.shake * 2);
        }

        // ---------------- SIMULATOR MENUS ----------------
        if (this.mode === 'title' || this.mode === 'phase_menu' || this.mode === 'single_menu') {
          this.drawUndyneUndyingBody(ctx, 432, 34);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.64)';
          ctx.fillRect(0, 0, 640, 480);

          drawRichText(ctx, L.simTitle, 42, 30, 999, { size: 30, color: '#48e8ff', who: 'undying' });
          drawRichText(ctx, L.simSub, 42, 66, 999, { size: 17, color: '#bbbbcc', maxWidth: 560 });

          let list;
          if (this.mode === 'title') {
            list = L.menuOpts.map((o, i) => i === 3 ? (o + (this.isShielded() ? '[ON]' : '[OFF]')) : o);
          } else {
            list = this.mode === 'phase_menu' ? L.phaseOpts : L.singleOpts;
          }
          const startY = this.mode === 'title' ? 205 : (this.mode === 'phase_menu' ? 120 : 100);
          const rowH = this.mode === 'title' ? 40 : (this.mode === 'phase_menu' ? 42 : 30);

          list.forEach((lbl, idx) => {
            const sel = this.menuCursor === idx;
            const y = startY + idx * rowH;
            if (sel) drawSpr(ctx, 'spr_heartgreen', 0, 46, y + 3, 1, 1);
            drawRichText(ctx, lbl, 74, y, 999, { size: this.mode === 'single_menu' ? 16 : 20, color: sel ? '#ffff00' : '#ffffff', maxWidth: 540, maxHeight: rowH - 2 });
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
        // Authentic Undertale spr_battlebg behind Undyne!
        drawSpr(ctx, 'spr_battlebg', 0, 16, 10, 1, 1);

        // 1. Articulated Undyne the Undying Body (exact obj_undynex_body!)
        const hx = this.bossHurtShake > 0 ? (this.bossHurtShake % 4 < 2 ? -10 : 10) : 0;
        this.drawUndyneUndyingBody(ctx, 220 + hx, 22);

        // Spear smear flash when flipping SOUL color
        if (this.smearAnim > 0) {
          drawSprExt(ctx, 'spr_undyneb_smear', 0, 140, 65, 1.2, 1.2, 0, null, this.smearAnim / 7);
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
          drawSpr(ctx, 'spr_targetchoice', Math.floor(this.time / 2) % 2, Math.round(this.barX - 7), 256, 1, 1);
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
          ctx.beginPath(); ctx.arc(sx, sy, 32, 0, Math.PI * 2); ctx.stroke();

          // Shield bar perpendicular to shieldDrawAng
          const a = this.shieldDrawAng;
          const cx = sx + Math.cos(a) * 26, cy = sy + Math.sin(a) * 26;
          const px = -Math.sin(a) * 26, py = Math.cos(a) * 26;
          ctx.strokeStyle = this.shieldFlash > 0 ? '#ff3838' : '#38b8ff';
          ctx.lineWidth = 5;
          ctx.beginPath(); ctx.moveTo(cx - px, cy - py); ctx.lineTo(cx + px, cy + py); ctx.stroke();
          ctx.fillStyle = this.shieldFlash > 0 ? '#ffff60' : '#90e8ff';
          ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
          ctx.restore();

          // Closest spawned normal arrow highlights RED (frame 1) just like Undertale!
          let closest = null, minTime = 99999;
          for (const ar of this.arrows) {
            if (this.attackTimer >= ar.spawnT) {
              const eta = ar.dist / ar.spd + (ar.yellow && ar.part < 3 ? 10 : 0);
              if (eta < minTime) { minTime = eta; closest = ar; }
            }
          }

          // Exact verified sprite directions:
          // dir 0=TOP(moves down)->_d, 1=RIGHT(moves left)->_r, 2=BOTTOM(moves up)->_u, 3=LEFT(moves right)->_l
          const sprNames = ['spr_bullet_test_d', 'spr_bullet_test_r', 'spr_bullet_test_u', 'spr_bullet_test_l'];
          // spr_bullet_testx_arrow frames: 0=down, 1=up, 2=left, 3=right -> yellow arrow points in its FINAL strike direction!
          const yellowFrameMap = [1, 3, 0, 2];

          for (const ar of this.arrows) {
            if (this.attackTimer < ar.spawnT) continue;
            const alpha = Math.min(1, (this.attackTimer - ar.spawnT + 1) / 5);
            const ang = DIR_ANG[ar.dir] + (ar.yellow ? ar.orbit : 0);
            const ax = sx + Math.cos(ang) * ar.dist;
            const ay = sy + Math.sin(ang) * ar.dist;
            if (ar.yellow) {
              drawSprExt(ctx, 'spr_bullet_testx_arrow', yellowFrameMap[ar.dir], ax, ay, 1, 1, 0, null, alpha, true);
            } else {
              const isRed = (ar === closest);
              drawSprExt(ctx, sprNames[ar.dir], isRed ? 1 : 0, ax, ay, 1, 1, 0, null, alpha, true);
            }
          }
        } else {
          // RED MODE SPEARS
          for (const s of this.spears) {
            if (s.type === 'rise') {
              const wx = this.box.x + s.relX;
              const wyBot = this.box.y + this.box.h;
              const wyTop = this.box.y;
              if (s.timer < 11) {
                // Warning glow line + exclamation mark matching obj_risespearbullet telegraph
                ctx.save();
                ctx.fillStyle = s.timer % 2 === 0 ? '#ff3838' : '#ffff40';
                if (s.fromTop) {
                  ctx.fillRect(wx - 11, wyTop + 3, 22, 5);
                  drawRichText(ctx, '!', wx - 4, wyTop + 10, 999, { size: 18, color: '#ff3838' });
                } else {
                  ctx.fillRect(wx - 11, wyBot - 8, 22, 5);
                  drawRichText(ctx, '!', wx - 4, wyBot - 28, 999, { size: 18, color: '#ff3838' });
                }
                ctx.restore();
              } else {
                const lift = Math.min(58, (s.timer - 11) * 28);
                const fadeAl = s.timer > 19 ? Math.max(0, 1 - (s.timer - 19) / 4) : 1;
                ctx.save();
                ctx.beginPath(); ctx.rect(this.box.x + 2, this.box.y + 2, this.box.w - 4, this.box.h - 4); ctx.clip();
                if (s.fromTop) {
                  drawSprExt(ctx, 'spr_risespearbullet', 0, Math.round(wx - 12), Math.round(wyTop + lift), 1, -1, 0, null, fadeAl, false);
                } else {
                  drawSprExt(ctx, 'spr_risespearbullet', 0, Math.round(wx - 12), Math.round(wyBot - lift), 1, 1, 0, null, fadeAl, false);
                }
                ctx.restore();
              }
            } else if (s.type === 'aim' || s.type === 'followring' || s.type === 'ring') {
              // Both spr_whitespearbullet & spr_followspear_2 point RIGHT (0°) natively -> exact -ang*180/PI!
              const drawA = (s.drawAng != null) ? s.drawAng : s.ang;
              const deg = -drawA * 180 / Math.PI;
              const alpha = s.timer < 6 ? (s.timer / 6) : (s.type === 'ring' && s.rad < 8 ? Math.max(0, (s.rad + 14) / 22) : 1);
              const sp = (s.type === 'aim') ? 'spr_whitespearbullet' : 'spr_followspear_2';
              drawSprExt(ctx, sp, 0, s.x, s.y, 1, 1, deg, null, alpha, true);
            }
          }
        }

        // Draw SOUL + No-Hit Shield Ring
        const soulSpr = this.soulMode === 'green' ? 'spr_heartgreen' : 'spr_heart';
        if (!this.invuln || Math.floor(this.invuln / 2) % 2 === 0) {
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
