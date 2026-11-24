// Undertale Asriel Dreemurr (7 SOULs — God of Hyperdeath / Angel of Death / SAVE the World)
// Full 1:1 Interactive Boss Fight + Bad-Time-Simulator-style Phase Select & Single-Attack Practice (640x480 native)
(function () {
  'use strict';
  const Core = window.UTEngineCore;
  if (!Core) return;
  const { SPR, registerSprites, drawSpr, drawSprExt, drawRichText, stripCodes, drawBattleHUD } = Core;
  if (window.UT_ASRIEL_SPRITES) registerSprites(window.UT_ASRIEL_SPRITES);

  // =========================================================================
  // BILINGUAL TEXT & DATA (EN / 繁中)
  // =========================================================================
  const T = {
    en: {
      simTitle: 'ASRIEL DREEMURR',
      simSub: '7 SOULs - Boss Battle Simulator',
      menuOpts: [
        '> NORMAL FIGHT (Full 7 SOULs)',
        '+ PHASE SELECT (Practice)',
        '* SINGLE ATTACKS (Endless)',
        '# LANGUAGE: ENGLISH',
        '< BACK TO OVERWORLD',
      ],
      phaseOpts: [
        '1. Intro: Kid Asriel Transforms',
        '2. Phase 1: Hopes and Dreams',
        '3. Hyper Goner (Timeline Purge)',
        '4. Phase 2: Burn in Despair!',
        '5. SAVE the World! (Lost Souls)',
        '6. Finale: His Theme & Ending',
        '< Back to Title Menu',
      ],
      singleOpts: [
        '* Star Blazing / Galacta Blazing',
        '* Shocker Breaker I & II',
        '* Chaos Saber / Chaos Slicer',
        '* Chaos Buster / Chaos Blaster',
        '* Hyper Goner Vortex',
        '* Angel of Death: Comets & Beam',
        '* Final Rainbow Hyper-Beam',
        '* Lost Souls Rush (All 4 Friends)',
        '< Back to Title Menu',
      ],
      noHitToggle: '+ Practice No-Hit Shield',
      introLines: [
        { expr: 'kid0', text: 'Finally.\nI was so tired\nof being a flower.' },
        { expr: 'kid1', text: 'Howdy!\nChara, are you\nthere?' },
        { expr: 'kid2', text: "It's me,\nyour best\nfriend." },
      ],
      p1TurnSpeech: [
        [], // Turn 0: no speech before Star Blazing
        [{ expr: 1, text: "You know...\nI don't care about\ndestroying this\nworld anymore." }],
        [{ expr: 2, text: "After I defeat you\nand gain total control\nover the timeline...\nI just want to reset\neverything." }],
        [{ expr: 3, text: "All your progress...\nEveryone's memories.\nI'll bring them all\nback to zero!" }],
        [{ expr: 2, text: "Then we can do\neverything ALL over\nagain." }],
        [{ expr: 3, text: "And you know what\nthe best part of\nall this is?\nYou'll DO it." }],
        [{ expr: 1, text: "And then you'll\nlose to me again." }],
        [{ expr: 3, text: "And again." }],
        [{ expr: 3, text: "And again!!!" }],
        [{ expr: 1, text: 'Because you want a\n"happy ending."' }],
        [{ expr: 1, text: 'Because you "love\nyour friends."' }],
        [{ expr: 1, text: 'Because you "never\ngive up."' }],
        [{ expr: 2, text: "Your \"determination.\"\nThe power that let\nyou get this far...\nIt's gonna be your\ndownfall!" }],
        [{ expr: 2, text: "Now, ENOUGH messing\naround!\nIt's time to purge\nthis timeline once\nand for all!" }],
      ],
      p1TransformSpeech: [
        { expr: 0, text: "...even after that\nattack, you're still\nstanding in my way...?" },
        { expr: 0, text: "Wow...\nYou really ARE\nsomething special." },
        { expr: 3, text: "But don't get\ncocky." },
        { expr: 2, text: "Up until now, I've\nonly been using a\nfraction of my\nREAL power!" },
        { expr: 2, text: "Let's see what good\nyour DETERMINATION\nis against THIS!!" },
      ],
      p1Status: [
        '* Asriel readies "STAR BLAZING."',
        '* Asriel charges "SHOCKER\n  BREAKER."',
        '* Asriel calls on "CHAOS SABER."',
        '* Asriel charges "SHOCKER\n  BREAKER."',
        '* Asriel readies "STAR BLAZING."',
        '* Asriel readies "CHAOS BUSTER."',
        '* Asriel calls on "CHAOS SABER."',
        '* Asriel readies "CHAOS BUSTER."',
        '* Asriel readies "SHOCKER\n  BREAKER II."',
        '* Asriel readies "GALACTA\n  BLAZING."',
        '* Asriel calls on "CHAOS SLICER."',
        '* Asriel readies "CHAOS\n  BLASTER."',
        '* Asriel readies "SHOCKER\n  BREAKER II."',
        '* Asriel readies "HYPER GONER."',
      ],
      p1Act: {
        check: '* ASRIEL DREEMURR - ATK ∞ DEF ∞\n* The Absolute GOD of Hyperdeath!',
        hope1: '* You held on to your hopes...\n* You reduced how much DAMAGE\n  you\'ll take this turn! (+1 HP)',
        hope2: '* You kept holding on.\n* DAMAGE reduced! (+1 HP)',
        dream1: '* You think about why you\'re\n  here now... Your items fill up\n  with \\YLast Dreams\\W! (+4 HP)',
        dream2: '* Your items fill up with\n  \\YLast Dreams\\W! (+4 HP)',
        missTxt: '* Your attack could not reach the God of Hyperdeath.',
        mercyTxt: '* Wait—MERCY is unreachable right now.',
      },
      p2Speech: [
        "Urah ha ha ha...\nBehold my TRUE power!",
        "I can feel it...\nEvery time you die,\nyour grip on this\nworld slips away.",
        "Still, you're\nhanging on...?",
        "Come on...\nShow me what good\nyour DETERMINATION\nis now!",
      ],
      struggleFail: '* Can\'t move your body.\n* Nothing happened.',
      saveAwake: [
        '* Can\'t move your body.\n* Nothing happened.',
        '* You tried to reach your SAVE file.\n* Nothing happened.',
        '* Seems SAVING the game really is impossible.',
        '* ...\n* But...\n* Maybe, with what little power you have...\n* You can \\YSAVE\\W something else.',
      ],
      lostSouls: {
        undyne: {
          name: 'Undyne',
          Acts: ['Smile', 'Tap Lightly', 'Ask to Cook'],
          res: [
            '* You gave the Lost Soul a big smile\n  just like she always does.',
            '* You tapped the Lost Soul lightly.',
            '* You asked the Lost Soul to\n  teach you how to cook.',
          ],
          savedMsg: '* Wait... Alphys? Anime? YOU!\n* Undyne\'s SOUL resonated with determination!',
        },
        alphys: {
          name: 'Alphys',
          Acts: ['Support Her', 'Call Phone', 'Favorite Cartoon'],
          res: [
            '* You told the Lost Soul that\n  you\'ll always support her.',
            '* You called the Lost Soul\'s phone...\n* She starts to sweat.',
            '* You asked the Lost Soul what\n  her favorite cartoon is.',
          ],
          savedMsg: '* M-Mettaton... Undyne... Hey!\n* Alphys\'s SOUL resonated strongly!',
        },
        skelebros: {
          name: 'Sans & Papyrus',
          Acts: ['Skeleton Pun', 'Puzzle Help', 'Cook Spaghetti', 'Do Nothing'],
          res: [
            '* You told the Lost Soul a skeleton pun.\n* Sans chuckles. Papyrus groans!',
            '* You asked the Lost Soul for puzzle help.',
            '* You asked the Lost Soul to cook spaghetti.',
            '* You stood there.\n* Both Lost Souls look confused.',
          ],
          savedMsg: '* NYEH HEH HEH!! I KNEW IT!\n* don\'t worry kid. we gotcha.',
        },
        parents: {
          name: 'Toriel & Asgore',
          Acts: ['Hug Tight', 'Smell of Pie', 'Offer Tea', 'Look Back'],
          res: [
            '* You hugged the Lost Souls tightly.',
            '* You reminded the Lost Soul of\n  butterscotch-cinnamon pie.',
            '* You offered a cup of golden\n  flower tea.',
            '* You smiled gently back at them.',
          ],
          savedMsg: '* Be strong, my child! / You have our support!\n* ALL your friends\' SOULs resonated inside Asriel!',
        },
      },
      saveAsrielLine: '* Suddenly, you realize there is\n  one last person left to SAVE.\n* You reach out and call his name...\n* \\YASRIEL DREEMURR\\W.',
      finaleBubble: [
        "Wh... what did\nyou do...?\nWhat's this feeling...?",
        "No! NO!\nI don't need ANYONE!",
        "STOP IT!\nGet away from me!\nI'll tear you apart!",
        "...\nChara...\nDo you know why I'm\ndoing this...?",
        "I'm doing this because\nI care about you\nmore than anybody!",
        "I'm not ready for\nthis to end...\nI'm not ready to say\ngoodbye again...",
        "So, please...\nSTOP doing this...\nAND JUST LET ME\nWIN!!!",
      ],
      afterBeamSpeech: [
        "...\nChara...",
        "I'm so alone,\nChara...",
        "I'm so afraid,\nChara...",
        "Chara... I'm\nso sorry...",
      ],
      epilogueLines: [
        { pose: 'cry', text: "* I'm sorry... I always was a\n  crybaby, wasn't I?" },
        { pose: 'dry', text: "* Don't worry about me. Someone has\n  to take care of these flowers." },
        { pose: 'hug', text: "* Frisk... You're going to do great.\n* Take care of Mom and Dad for me!" },
      ],
      refused: '* But it refused.',
      victoryTitle: 'THE BARRIER WAS SHATTERED',
      victorySub: 'Every SOUL in the Underground resonated together!',
    },
    zh: {
      simTitle: '艾斯利爾·逐夢 (ASRIEL DREEMURR)',
      simSub: '7 個靈魂終極決戰 - 1:1 還原戰鬥模擬器',
      menuOpts: [
        '> 完整決戰 (NORMAL - 7 個靈魂完整劇情)',
        '+ 階段選擇練習 (PHASE SELECT)',
        '* 單一招式練習 (SINGLE ATTACK)',
        '# 語言切換：繁體中文',
        '< 返回地下世界大冒險',
      ],
      phaseOpts: [
        '1. 開場變身：小羊艾斯利爾降臨',
        '2. 第一階段：希望與夢想 (Hopes & Dreams)',
        '3. 終極噬滅者 (Hyper Goner)',
        '4. 第二階段：在絕望中燃燒 (Burn in Despair)',
        '5. 拯救世界！ (SAVE Lost Souls)',
        '6. 淚之終章：他的主題曲 (His Theme)',
        '< 返回主選單',
      ],
      singleOpts: [
        '* 群星熾燃 / 銀河爆裂 (Star Blazing)',
        '* 雷霆震擊 I & II (Shocker Breaker)',
        '* 混沌雙劍 / 混沌斬擊 (Chaos Saber)',
        '* 混沌殲滅砲 / 彩虹光束 (Chaos Buster)',
        '* 終極噬滅者漩渦 (Hyper Goner)',
        '* 死亡天使：彩虹彗星連彈',
        '* 絕望最終彩虹鐳射 (Final Laser)',
        '* 失落靈魂連戰 (4 組好友彈幕)',
        '< 返回主選單',
      ],
      noHitToggle: '+ 無敵練習盾牌 (練習不會扣死)',
      introLines: [
        { expr: 'kid0', text: '終於……\n我已經受夠當一朵花了。' },
        { expr: 'kid1', text: '哈囉！\nChara，你在嗎？' },
        { expr: 'kid2', text: '是我呀，\n你最好的朋友。' },
      ],
      p1TurnSpeech: [
        [],
        [{ expr: 1, text: '你知道嗎……\n我已經不在乎摧毀這個\n世界了。' }],
        [{ expr: 2, text: '當我打敗你並徹底掌握\n時間線之後……\n我只想把一切都重置。' }],
        [{ expr: 3, text: '你所有的進度……\n大家所有的記憶。\n我會將它們通通歸零！' }],
        [{ expr: 2, text: '這樣一來我們就能把一切\n再全部重玩一遍了。' }],
        [{ expr: 3, text: '而且你知道最棒的部分\n是什麼嗎？\n你還是會再來一次。' }],
        [{ expr: 1, text: '然後你會再次敗給我。' }],
        [{ expr: 3, text: '一次。' }],
        [{ expr: 3, text: '又一次！！！' }],
        [{ expr: 1, text: '因為你想要一個\n「幸福快樂的結局」。' }],
        [{ expr: 1, text: '因為你「深愛著\n你的朋友們」。' }],
        [{ expr: 1, text: '因為你「永遠不會\n輕言放棄」。' }],
        [{ expr: 2, text: '你的「決心」……\n那股支撐你走到這一步的\n力量……即將成為你的敗因！' }],
        [{ expr: 2, text: '好了，玩鬧到此為止！\n現在是時候徹底抹除\n這條時間線了！' }],
      ],
      p1TransformSpeech: [
        { expr: 0, text: '……就算接下了那招，\n你依然擋在我面前嗎……？' },
        { expr: 0, text: '哇……看來你真的\n非常特別呢。' },
        { expr: 3, text: '不過可別太得意了。' },
        { expr: 2, text: '到剛剛為止，我還只用了\n真正力量的冰山一角！' },
        { expr: 2, text: '就讓我看看你的「決心」\n能不能撐過這一擊！！' },
      ],
      p1Status: [
        '* 艾斯利爾準備發動「群星熾燃 (STAR BLAZING)」。',
        '* 艾斯利爾正在蓄力「雷霆震擊 (SHOCKER BREAKER)」。',
        '* 艾斯利爾召喚出「混沌雙劍 (CHAOS SABER)」。',
        '* 艾斯利爾正在蓄力「雷霆震擊 (SHOCKER BREAKER)」。',
        '* 艾斯利爾準備發動「群星熾燃 (STAR BLAZING)」。',
        '* 艾斯利爾舉起了「混沌殲滅砲 (CHAOS BUSTER)」。',
        '* 艾斯利爾召喚出「混沌雙劍 (CHAOS SABER)」。',
        '* 艾斯利爾舉起了「混沌殲滅砲 (CHAOS BUSTER)」。',
        '* 艾斯利爾準備發動「雷霆震擊 II」！',
        '* 艾斯利爾準備發動「銀河爆裂 (GALACTA BLAZING)」！',
        '* 艾斯利爾揮動「混沌斬擊 (CHAOS SLICER)」！',
        '* 艾斯利爾啟動終極「混沌巨砲 (CHAOS BLASTER)」！',
        '* 艾斯利爾準備發動「雷霆震擊 II」！',
        '* 艾斯利爾準備釋放「終極噬滅者 (HYPER GONER)」！',
      ],
      p1Act: {
        check: '* 艾斯利爾·逐夢 - ATK ∞ DEF ∞\n* 超越死亡的絕對神明 (God of Hyperdeath)！',
        hope1: '* 你緊緊抱持著「希望」……\n* 本回合承受的傷害降低了！（+1 HP）',
        hope2: '* 你繼續緊守著希望！\n* 傷害降低了！（+1 HP）',
        dream1: '* 你回想起自己為何來到這裡……\n* 你的背包塞滿了 \\Y最後的夢想\\W！（+4 HP）',
        dream2: '* 你的背包補滿了 \\Y最後的夢想\\W！（+4 HP）',
        missTxt: '* 你的攻擊無法觸及超越死亡的絕對之神。',
        mercyTxt: '* 他還聽不見任何寬恕的聲音。',
      },
      p2Speech: [
        '嗚哈哈哈哈……\n見識我真正的力量吧！',
        '我能感覺到……\n每次你瀕臨崩潰，\n這個世界對你的印象就少一分。',
        '竟然……還在撐著嗎？',
        '來吧！讓我看看你那份\n「決心」現在有什麼用！',
      ],
      struggleFail: '* 身體動彈不得。\n* 什麼事也沒發生。',
      saveAwake: [
        '* 身體動彈不得，什麼也沒發生。',
        '* 你試著伸手觸碰「存檔點 (SAVE)」……卻構不著。',
        '* 看來在這裡「存檔」真的已經不可能了。',
        '* ……但是……\n* 也許憑你現在這份微小的力量……\n* 你可以試著去「\\Y拯救 (SAVE)\\W」別的東西！',
      ],
      lostSouls: {
        undyne: {
          name: '安戴因 (Undyne)',
          Acts: ['燦爛微笑', '輕拍肩膀', '請她教做菜'],
          res: [
            '* 你對著迷失靈魂露出了她最愛的熱血笑容。',
            '* 你輕輕拍了拍這位迷失靈魂。',
            '* 你問這位迷失靈魂能不能教你做菜。',
          ],
          savedMsg: '* 等等……艾菲斯？動畫？還有你！\n* 安戴因的靈魂湧出決心與戰意！',
        },
        alphys: {
          name: '艾菲斯 (Alphys)',
          Acts: ['為她加油', '打電話', '聊最愛的動畫'],
          res: [
            '* 你告訴這位迷失靈魂你會永遠支持她。',
            '* 你撥通了她的電話……她開始緊張冒汗。',
            '* 你問她最喜歡的機器人動畫是哪一部。',
          ],
          savedMsg: '* 梅……梅塔頓……安戴因……大家！\n* 艾菲斯的靈魂發出耀眼光芒！',
        },
        skelebros: {
          name: '杉斯 & 帕派瑞斯 (Sans & Papyrus)',
          Acts: ['講骷髏冷笑話', '請教謎題', '想吃義大利麵', '發呆不動'],
          res: [
            '* 你講了個雙關骷髏冷笑話。\n* 杉斯笑了，帕派瑞斯崩潰大喊！',
            '* 你問迷失靈魂謎題要怎麼解。',
            '* 你說你想吃他親手煮的義大利麵。',
            '* 兩個迷失靈魂看起來一頭霧水。',
          ],
          savedMsg: '* 捏哈哈哈哈！！我就知道！\n* 別擔心，孩子，我們一直都在。',
        },
        parents: {
          name: '托麗爾 & 艾斯戈爾 (Toriel & Asgore)',
          Acts: ['緊緊擁抱', '提起奶油派', '倒一杯金花茶', '溫柔微笑'],
          res: [
            '* 你緊緊擁抱了兩位迷失靈魂。',
            '* 你讓他們想起了剛出爐的奶油肉桂派香味。',
            '* 你遞上一杯溫暖的黃金花茶。',
            '* 你對著他們露出了令人安心的微笑。',
          ],
          savedMsg: '* 堅強一點，我的孩子！／我們都在這裡陪著你！\n* 所有夥伴的靈魂都在艾斯利爾體內共鳴！',
        },
      },
      saveAsrielLine: '* 突然間你明白，靈魂深處還剩最後一個人\n  在等待著被拯救。\n* 你伸出手，輕聲呼喚他的名字……\n* \\Y艾斯利爾·逐夢 (ASRIEL DREEMURR)\\W。',
      finaleBubble: [
        '你……你到底做了什麼……？\n這股溫暖的感覺是……？',
        '不！不要！\n我不需要任何人的同情！',
        '快住手！\n離我遠一點！\n我要把你徹底撕碎！',
        '……\nChara……\n你知道為什麼我一直這樣\n戰鬥下去嗎……？',
        '我這樣做……是因為我比世上\n任何人都更在乎你呀！',
        '我還沒準備好讓一切結束……\n我還沒準備好再次對像你一樣\n的朋友說再見……',
        '所以，求求你……\n不要再反抗了……\n讓我贏這一次吧！！！',
      ],
      afterBeamSpeech: [
        '……\nChara……',
        '我好孤單……\nChara……',
        '我真的……好害怕……',
        '對不起……\n我真的好抱歉……',
      ],
      epilogueLines: [
        { pose: 'cry', text: '* 對不起……我一直都是個愛哭鬼吧。' },
        { pose: 'dry', text: '* 別擔心我，總要有人留下來照顧這些金花嘛。' },
        { pose: 'hug', text: '* Frisk……你到外面的世界一定會做得很好的。\n* 替我好好照顧媽媽和爸爸，好嗎？' },
      ],
      refused: '* 但它拒絕了。',
      victoryTitle: '結界已經被徹底粉碎了',
      victorySub: '所有地表與地底的 7 個靈魂與怪物之心已連結為一！',
    },
  };

  function hsvCss(hDeg, sPct = 90, lPct = 62) {
    return `hsl(${Math.round(((hDeg % 360) + 360) % 360)},${sPct}%,${lPct}%)`;
  }

  function formatHp(hp) {
    if (hp >= 1) return `${Math.ceil(hp)}`;
    if (hp >= 0.85) return '0.9';
    if (hp >= 0.4) return '0.5';
    if (hp >= 0.08) return '0.1';
    if (hp >= 0.008) return '0.01';
    return '0.0001';
  }

  // =========================================================================
  // ASRIEL 7-SOULS BOSS BATTLE ENGINE
  // =========================================================================
  function createAsrielBattle(G) {
    return {
      // Top-level state
      standalone: false,
      mode: 'title', // title | phase_menu | single_menu | intro | p1 | transform | p2 | lost_soul | finale | epilogue | victory
      sub: 'main',   // main | target | slice | act | item | mercy | save_list | ls_act | msg | bubble | dodge | refuse | hg_whiteout
      singlePractice: false,
      singleWaveIdx: -1,
      noHitMode: false,

      time: 0,
      cur: 0,
      subCur: 0,
      menuCursor: 0,
      bgScroll: 0,
      whiteAlpha: 0,
      shake: 0,
      invuln: 0,
      hopeActive: false,
      hopedCount: 0,
      dreamCount: 0,
      hp: 20, maxHp: 20,
      refusals: 0,
      damageTakenTotal: 0,
      seaTeaBoost: false,

      items: [
        { id: 'pie', en: 'ButtsPie', zh: '奶油肉桂派', heal: 99 },
        { id: 'noodles', en: 'I.Noodles', zh: '泡麵', heal: 90 },
        { id: 'steak', en: 'FaceSteak', zh: '臉型牛排', heal: 60 },
        { id: 'snow1', en: 'SnowPiece', zh: '雪人塊', heal: 45 },
        { id: 'snow2', en: 'SnowPiece', zh: '雪人塊', heal: 45 },
        { id: 'hero', en: 'L.Hero', zh: '傳奇英雄', heal: 40 },
        { id: 'seatea', en: 'SeaTea', zh: '海茶 (加速!)', heal: 10, speed: true },
        { id: 'dream', en: 'LastDream', zh: '最後的夢想', heal: 17 },
      ],

      // Arena & SOUL physics
      box: { x: 32, y: 250, w: 575, h: 140 },
      tBox: { x: 32, y: 250, w: 575, h: 140 },
      soulX: 320, soulY: 320, soulVy: 0,
      soulColor: 'red', // red | blue | green | yellow
      shieldDir: 0, // Undyne green shield 0:up,1:right,2:down,3:left

      // Fight slash
      barX: 40, barV: 9, sliceF: 0,
      // Refuse anim
      refuseT: 0, refuseStage: 0,

      // Dialog / Narrative text
      msg: '', mc: 0, onMsgDone: null,
      bubbles: [], bubIdx: 0, bubC: 0, onBubDone: null,
      statusTxt: '',

      // Phase progression
      p1Turn: 0,
      p2Turn: 0,
      struggles: 0,
      saveUnlocked: false,
      savedSouls: { undyne: false, alphys: false, skelebros: false, parents: false },
      activeLostSoul: null,
      lsActDone: 0,
      finTurn: 0,
      asrielCry: 0, // 0=normal, 1=cry, 2=cry2
      asrielFade: 0,
      panelIdx: 0,
      panelAlpha: 0,
      panelTimer: 0,
      epiIdx: 0,
      epiC: 0,

      // Intro state
      introStep: 0, introTick: 0, introChar: 0,

      // Articulated visual state for Phase 1 / Phase 2 / Hyper Goner
      afterimages: [],
      asX: 320, asY: 48, asExpr: 0, shrug: false,
      wingRot: 0,
      attackTimer: 0, attackDur: 180,
      currentAtk: null,
      bullets: [],
      beams: [],
      sabers: null,
      gun: null,
      goner: null,
      lastBeam: null,
      stars: [],
      bolts: [],
      playerShots: [],
      onHitFlash: 0,

      L() { return T[G.lang === 'zh' ? 'zh' : 'en']; },

      open(entry = 'title', standalone = true) {
        this.standalone = standalone;
        this.time = 0;
        this.hp = 20; this.maxHp = 20;
        this.refusals = 0;
        this.damageTakenTotal = 0;
        this.seaTeaBoost = false;
        this.hopeActive = false;
        this.hopedCount = 0; this.dreamCount = 0;
        this.menuCursor = 0;
        this.items = [
          { id: 'pie', en: 'ButtsPie', zh: '奶油肉桂派', heal: 99 },
          { id: 'noodles', en: 'I.Noodles', zh: '泡麵', heal: 90 },
          { id: 'steak', en: 'FaceSteak', zh: '臉型牛排', heal: 60 },
          { id: 'snow1', en: 'SnowPiece', zh: '雪人塊', heal: 45 },
          { id: 'snow2', en: 'SnowPiece', zh: '雪人塊', heal: 45 },
          { id: 'hero', en: 'L.Hero', zh: '傳奇英雄', heal: 40 },
          { id: 'seatea', en: 'SeaTea', zh: '海茶 (加速!)', heal: 10, speed: true },
          { id: 'dream', en: 'LastDream', zh: '最後的夢想', heal: 17 },
        ];
        this.resetEntities();
        if (entry === 'title') {
          this.mode = 'title';
          G.sfx.playBGM('asrielback', true, 0.45);
        } else {
          this.startPhase(entry);
        }
      },

      resetEntities() {
        this.bullets = []; this.beams = []; this.stars = []; this.bolts = [];
        this.playerShots = []; this.sabers = null; this.gun = null; this.goner = null;
        this.lastBeam = null; this.afterimages = [];
        this.soulColor = 'red'; this.soulVy = 0; this.shieldDir = 0;
        this.box = { x: 32, y: 250, w: 575, h: 140 };
        this.tBox = { x: 32, y: 250, w: 575, h: 140 };
        this.soulX = 320; this.soulY = 320;
        this.invuln = 0; this.shake = 0; this.whiteAlpha = 0;
        this.cur = 0; this.subCur = 0;
      },

      startPhase(tag) {
        this.singlePractice = false;
        this.singleWaveIdx = -1;
        this.resetEntities();
        this.hp = 20;
        this.p1Turn = 0; this.p2Turn = 0; this.finTurn = 0;
        this.struggles = 0; this.saveUnlocked = false;
        this.savedSouls = { undyne: false, alphys: false, skelebros: false, parents: false };
        this.asrielCry = 0; this.asrielFade = 0;
        this.statusTxt = '';
        if (tag === 'intro') {
          this.mode = 'intro';
          this.introStep = 0; this.introTick = 0; this.introChar = 0;
          G.sfx.playBGM('asrielback', true, 0.42);
        } else if (tag === 'p1') {
          this.mode = 'p1';
          this.sub = 'main';
          this.whiteAlpha = 1;
          this.asX = 320; this.asY = 46;
          this.statusTxt = this.L().p1Status[0];
          G.sfx.playBGM('hopes', true, 0.56);
        } else if (tag === 'hypergoner') {
          this.mode = 'p1';
          this.p1Turn = 13;
          this.whiteAlpha = 0.8;
          G.sfx.playBGM('hopes', true, 0.56);
          this.beginBubble(this.L().p1TurnSpeech[13], () => this.launchP1Wave(13));
        } else if (tag === 'p2') {
          this.mode = 'p2';
          this.sub = 'main';
          this.whiteAlpha = 1;
          G.sfx.playBGM('burn', true, 0.55);
          this.statusTxt = G.lang === 'zh' ? '* 整個世界正在崩塌終結。' : '* The whole world is ending.';
        } else if (tag === 'save') {
          this.mode = 'p2';
          this.sub = 'main';
          this.struggles = 4;
          this.saveUnlocked = true;
          this.whiteAlpha = 0.9;
          G.sfx.playBGM('savetheworld', true, 0.56);
          this.statusTxt = G.lang === 'zh' ? '* 夥伴的靈魂仍在某處呼喚著你！按 ACT (★ SAVE)！' : '* Select ★ SAVE to reach out to your friends\' SOULs!';
        } else if (tag === 'finale') {
          this.mode = 'finale';
          this.sub = 'bubble';
          this.finTurn = 0;
          this.asrielCry = 1;
          this.whiteAlpha = 1;
          G.sfx.playBGM('histheme', true, 0.55);
          this.beginBubble([this.L().finaleBubble[0]], () => this.launchFinaleWave(0));
        }
      },

      startSingleWave(idx) {
        this.singlePractice = true;
        this.singleWaveIdx = idx;
        this.resetEntities();
        this.hp = 20;
        const p2Like = idx === 5 || idx === 6;
        this.mode = idx === 6 ? 'finale' : (p2Like ? 'p2' : 'p1');
        if (idx === 5 || idx === 6) G.sfx.playBGM(idx === 6 ? 'histheme' : 'burn', true, 0.55);
        else if (idx === 7) G.sfx.playBGM('savetheworld', true, 0.55);
        else G.sfx.playBGM('hopes', true, 0.55);
        this.launchSingleWave(idx);
      },

      launchSingleWave(idx) {
        this.resetEntities();
        const L = this.L();
        if (idx === 0) {
          this.asX = 320; this.asY = 46;
          this.spawnAttack('star', { hard: this.time % 2 === 1 });
        } else if (idx === 1) {
          this.spawnAttack('shocker', { hard: true });
        } else if (idx === 2) {
          this.spawnAttack('saber', { hard: true });
        } else if (idx === 3) {
          this.spawnAttack('buster', { hard: true });
        } else if (idx === 4) {
          this.spawnAttack('hypergoner', {});
        } else if (idx === 5) {
          this.spawnAttack('p2_comets', {});
        } else if (idx === 6) {
          this.asrielCry = 1;
          this.spawnAttack('lastbeam', {});
        } else if (idx === 7) {
          const cycle = ['undyne', 'alphys', 'skelebros', 'parents'][(Math.floor(this.time / 10) % 4)];
          this.mode = 'lost_soul';
          this.activeLostSoul = cycle;
          this.spawnAttack('ls_' + cycle, {});
        }
      },

      beginMsg(txt, cb) {
        this.sub = 'msg';
        this.msg = txt; this.mc = 0;
        this.onMsgDone = cb || (() => { this.sub = 'main'; });
      },

      beginBubble(arr, cb) {
        this.sub = 'bubble';
        this.bubbles = (arr || []).map(x => typeof x === 'string' ? { expr: 0, text: x } : x);
        this.bubIdx = 0; this.bubC = 0;
        if (this.bubbles[0]) this.asExpr = this.bubbles[0].expr ?? 0;
        this.onBubDone = cb || (() => {});
      },

      hurt(dmg) {
        if (this.invuln > 0) return;
        if (this.currentAtk !== 'lastbeam' && (this.noHitMode || G.noHitShield || window.UT_NO_HIT_SHIELD)) {
          this.invuln = 28;
          G.sfx.sfx('bell', 0.45);
          return;
        }
        let realDmg = dmg;
        if (this.mode === 'p1' && this.hopeActive) {
          realDmg = Math.max(1, dmg - 3);
        }
        if (this.currentAtk === 'hypergoner') {
          this.hp = Math.min(this.hp, 1);
          this.invuln = 36; this.shake = 12;
          G.sfx.sfx('hurt', 0.65);
          return;
        }
        if (this.currentAtk === 'lastbeam') {
          G.sfx.sfx('hurt', 0.65);
          this.shake = 9; this.invuln = 24;
          if (this.hp > 1) this.hp = 1;
          else if (this.hp >= 0.85) this.hp = 0.5;
          else if (this.hp >= 0.4) this.hp = 0.1;
          else if (this.hp >= 0.08) this.hp = 0.01;
          else this.hp = 0.0001;
          return;
        }

        G.sfx.sfx('hurt', 0.6);
        this.invuln = 38;
        this.shake = 8;
        this.onHitFlash = 6;
        this.damageTakenTotal += realDmg;

        if (this.mode === 'p1' && this.hopeActive && this.hp > 1 && this.hp - realDmg <= 0) {
          this.hp = 1;
          return;
        }
        this.hp = Math.max(0, this.hp - realDmg);
        if (this.hp <= 0) {
          if (this.singlePractice) {
            // Instant restart prompt / refuse in single practice
            this.triggerRefuse();
          } else {
            this.triggerRefuse();
          }
        }
      },

      triggerRefuse() {
        this.sub = 'refuse';
        this.refuseT = 0;
        this.refuseStage = 0;
        this.refusals++;
        this.bullets = []; this.beams = []; this.stars = []; this.bolts = [];
        this.sabers = null; this.gun = null; this.goner = null; this.lastBeam = null;
        G.sfx.sfx('break1', 0.7);
      },

      // =====================================================================
      // ATTACK GENERATORS (1:1 Toby Fox GMX Waves)
      // =====================================================================
      spawnAttack(kind, opts = {}) {
        this.sub = 'dodge';
        this.currentAtk = kind;
        this.attackTimer = 0;
        this.hopeActive = this.hopeActive; // preserved for the wave
        this.bullets = []; this.beams = []; this.stars = []; this.bolts = [];
        this.playerShots = []; this.sabers = null; this.gun = null; this.goner = null; this.lastBeam = null;
        const hard = !!opts.hard;

        if (kind === 'star') {
          this.tBox = { x: 224, y: 244, w: 192, h: 148 };
          this.attackDur = hard ? 255 : 230;
          this.stars = { hard, explodedBig: false };
        } else if (kind === 'shocker') {
          this.tBox = { x: 215, y: 244, w: 210, h: 146 };
          this.attackDur = hard ? 235 : 205;
          this.bolts = { hard, idx: 0, gigaFired: false };
        } else if (kind === 'saber') {
          this.tBox = { x: 230, y: 248, w: 180, h: 140 };
          this.attackDur = hard ? 280 : 250;
          this.asY = 92;
          G.sfx.sfx('swordappear', 0.65);
          this.sabers = { hard, step: 0, phase: 'swing', count: 0, maxSwings: hard ? 6 : 5, curSide: 0, twinklesSpawned: false, timer: 0 };
        } else if (kind === 'buster') {
          this.tBox = { x: 215, y: 244, w: 210, h: 146 };
          this.attackDur = hard ? 260 : 240;
          this.gun = {
            hard, t: 0, stage: 'aim', salvo: 0, maxSalvo: hard ? 7 : 5,
            angle: 270, recoil: 0, meter: 0, beamTimer: 0, bx: 320, by: 120,
          };
          G.sfx.sfx('segapower', 0.55);
        } else if (kind === 'hypergoner') {
          this.tBox = { x: 24, y: 20, w: 592, h: 375 };
          this.soulX = 320; this.soulY = 335;
          this.attackDur = 340;
          this.goner = { t: 0, alpha: 0, jawOpen: 0, laughPlayed: false, chargePlayed: false, faceY: 0, debris: [] };
        } else if (kind === 'p2_comets') {
          this.tBox = { x: 224, y: 246, w: 192, h: 144 };
          this.attackDur = 210;
        } else if (kind === 'p2_orb_beam') {
          this.tBox = { x: 215, y: 244, w: 210, h: 146 };
          this.attackDur = 195;
        } else if (kind === 'lastbeam') {
          this.tBox = { x: 32, y: 250, w: 575, h: 140 };
          this.attackDur = 250;
          this.lastBeam = { t: 0, bw: 0, maxBw: 230, angle: 0 };
        } else if (kind === 'ls_undyne') {
          this.soulColor = 'green';
          this.tBox = { x: 250, y: 248, w: 140, h: 140 };
          this.soulX = 320; this.soulY = 318;
          this.attackDur = 200;
        } else if (kind === 'ls_alphys') {
          this.soulColor = 'yellow';
          this.tBox = { x: 230, y: 244, w: 180, h: 148 };
          this.soulX = 320; this.soulY = 365;
          this.attackDur = 210;
        } else if (kind === 'ls_skelebros') {
          this.soulColor = 'blue';
          this.tBox = { x: 195, y: 252, w: 250, h: 136 };
          this.soulX = 320; this.soulY = 374; this.soulVy = 0;
          this.attackDur = 205;
        } else if (kind === 'ls_parents') {
          this.soulColor = 'red';
          this.tBox = { x: 224, y: 244, w: 192, h: 148 };
          this.soulX = 320; this.soulY = 320;
          this.attackDur = 195;
        }
        this.soulX = Math.max(this.tBox.x + 14, Math.min(this.tBox.x + this.tBox.w - 14, this.soulX));
        this.soulY = Math.max(this.tBox.y + 14, Math.min(this.tBox.y + this.tBox.h - 14, this.soulY));
      },

      launchP1Wave(t) {
        const L = this.L();
        this.statusTxt = L.p1Status[Math.min(t, L.p1Status.length - 1)] || L.p1Status[0];
        if (t === 0 || t === 4) this.spawnAttack('star', { hard: false });
        else if (t === 9) this.spawnAttack('star', { hard: true });
        else if (t === 1 || t === 3) this.spawnAttack('shocker', { hard: false });
        else if (t === 8 || t === 12) this.spawnAttack('shocker', { hard: true });
        else if (t === 2 || t === 6) this.spawnAttack('saber', { hard: false });
        else if (t === 10) this.spawnAttack('saber', { hard: true });
        else if (t === 5 || t === 7) this.spawnAttack('buster', { hard: false });
        else if (t === 11) this.spawnAttack('buster', { hard: true });
        else if (t >= 13) this.spawnAttack('hypergoner', {});
      },

      launchFinaleWave(t) {
        if (t >= 6) {
          this.spawnAttack('lastbeam', {});
        } else if (t % 2 === 0) {
          this.spawnAttack('p2_comets', { weak: true });
        } else {
          this.spawnAttack('star', { hard: false, weak: true });
        }
      },

      finishWave() {
        this.hopeActive = false;
        this.asX = 320; this.asY = 46;
        this.tBox = { x: 32, y: 250, w: 575, h: 140 };
        this.soulColor = 'red';
        this.bullets = []; this.beams = []; this.sabers = null; this.gun = null; this.goner = null; this.lastBeam = null;

        if (this.singlePractice) {
          // Reloop cleanly for continuous Single-Attack training (c2-sans-fight style!)
          this.launchSingleWave(this.singleWaveIdx);
          return;
        }

        if (this.mode === 'p1') {
          if (this.currentAtk === 'hypergoner') {
            this.mode = 'transform';
            this.beginBubble(this.L().p1TransformSpeech.map(x => ({ ...x })), () => {
              this.whiteAlpha = 1.25;
              G.sfx.sfx('spellcast', 0.7);
              G.sfx.playBGM('burn', true, 0.55);
              this.mode = 'p2';
              this.sub = 'main';
              this.statusTxt = G.lang === 'zh' ? '* 整個世界正在崩塌終結。' : '* The whole world is ending.';
            });
            return;
          }
          this.p1Turn++;
          this.sub = 'main';
          this.statusTxt = this.L().p1Status[Math.min(this.p1Turn, this.L().p1Status.length - 1)] || '';
          return;
        }

        if (this.mode === 'p2') {
          this.p2Turn++;
          this.sub = 'main';
          const nSaved = Object.values(this.savedSouls).filter(Boolean).length;
          if (this.saveUnlocked) {
            this.statusTxt = nSaved === 4
              ? (G.lang === 'zh' ? '* 夥伴們的靈魂在艾斯利爾體內共鳴！點擊 ★ SAVE！' : '* Your friends\' SOULs resonate inside ASRIEL! Use ★ SAVE!')
              : (G.lang === 'zh' ? `* 艾斯利爾體內有什麼正在共鳴……（已拯救 ${nSaved}/4 組）` : `* Something resonates within ASRIEL... (${nSaved}/4 SAVED)`);
          }
          return;
        }

        if (this.mode === 'lost_soul') {
          this.sub = 'ls_act';
          this.statusTxt = G.lang === 'zh'
            ? `* 繼續呼喚 ${this.L().lostSouls[this.activeLostSoul].name}！（${this.lsActDone}/3）`
            : `* Keep calling out to ${this.L().lostSouls[this.activeLostSoul].name}! (${this.lsActDone}/3)`;
          return;
        }

        if (this.mode === 'finale') {
          if (this.finTurn >= 6) {
            this.beginBubble(this.L().afterBeamSpeech.map(tx => ({ expr: 0, text: tx })), () => {
              this.whiteAlpha = 1.2;
              G.sfx.sfx('create', 0.65);
              G.sfx.playBGM('reunited', true, 0.5);
              this.mode = 'epilogue';
              this.epiIdx = 0; this.epiC = 0;
            });
            return;
          }
          this.finTurn++;
          this.asrielFade = Math.min(0.85, this.finTurn * 0.14);
          this.sub = 'main';
          this.statusTxt = '* ...';
        }
      },

      // =====================================================================
      // INPUT HANDLERS (Shared across Desktop, Touch & Standalone Simulator)
      // =====================================================================
      onConfirm() {
        G.sfx.unlock();
        if (this.mode === 'title') {
          G.sfx.sfx('select', 0.6);
          if (this.menuCursor === 0) this.startPhase('intro');
          else if (this.menuCursor === 1) { this.mode = 'phase_menu'; this.menuCursor = 0; }
          else if (this.menuCursor === 2) { this.mode = 'single_menu'; this.menuCursor = 0; }
          else if (this.menuCursor === 3) { G.lang = G.lang === 'zh' ? 'en' : 'zh'; G.onUI?.(); }
          else if (this.menuCursor === 4) { this.exitToOverworld(); }
          return;
        }
        if (this.mode === 'phase_menu') {
          G.sfx.sfx('select', 0.6);
          const tags = ['intro', 'p1', 'hypergoner', 'p2', 'save', 'finale'];
          if (this.menuCursor < tags.length) this.startPhase(tags[this.menuCursor]);
          else { this.mode = 'title'; this.menuCursor = 0; }
          return;
        }
        if (this.mode === 'single_menu') {
          G.sfx.sfx('select', 0.6);
          if (this.menuCursor === 8) { this.noHitMode = !this.noHitMode; return; }
          if (this.menuCursor === 9) { this.mode = 'title'; this.menuCursor = 0; return; }
          this.startSingleWave(this.menuCursor);
          return;
        }
        if (this.mode === 'intro') {
          const line = this.L().introLines[this.introStep];
          if (line && this.introChar < line.text.length) { this.introChar = line.text.length; return; }
          if (this.introStep < this.L().introLines.length - 1) {
            this.introStep++; this.introChar = 0; this.introTick = 0;
          } else {
            this.startPhase('p1');
            G.sfx.sfx('create', 0.7);
          }
          return;
        }
        if (this.mode === 'epilogue') {
          const line = this.L().epilogueLines[this.epiIdx];
          if (line && this.epiC < line.text.length) { this.epiC = line.text.length; return; }
          if (this.epiIdx < this.L().epilogueLines.length - 1) {
            this.epiIdx++; this.epiC = 0;
          } else {
            this.mode = 'victory';
            this.cur = 0;
          }
          return;
        }
        if (this.mode === 'victory') {
          G.sfx.sfx('select', 0.6);
          if (this.cur === 0) this.startPhase('intro');
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
          const b = this.bubbles[this.bubIdx];
          if (!b) { this.onBubDone?.(); return; }
          const plain = stripCodes(b.text);
          if (this.bubC < plain.length) this.bubC = plain.length;
          else {
            this.bubIdx++;
            if (this.bubIdx < this.bubbles.length) {
              this.bubC = 0;
              this.asExpr = this.bubbles[this.bubIdx].expr ?? 0;
            } else {
              this.onBubDone?.();
            }
          }
          return;
        }
        if (this.sub === 'dodge' && this.soulColor === 'yellow') {
          G.sfx.sfx('abullet', 0.45);
          this.playerShots.push({ x: this.soulX, y: this.soulY - 12, vy: -8 });
          return;
        }

        if (this.sub === 'main') {
          G.sfx.sfx('select', 0.55);
          if (this.mode === 'finale') {
            this.beginBubble([this.L().finaleBubble[Math.min(this.finTurn, this.L().finaleBubble.length - 1)]], () => this.launchFinaleWave(this.finTurn));
            return;
          }
          if (this.mode === 'p2' && !this.saveUnlocked) {
            this.struggles++;
            if (this.struggles >= 4) {
              this.saveUnlocked = true;
              this.beginMsg(this.L().saveAwake.join('\n'), () => {
                this.whiteAlpha = 1.1;
                G.sfx.sfx('abreak2', 0.7);
                this.hp = this.maxHp;
                G.sfx.playBGM('savetheworld', true, 0.56);
                this.sub = 'main';
                this.statusTxt = G.lang === 'zh' ? '* 按 [ACT] (★ SAVE) 喚醒被困在艾斯利爾心中的夥伴！' : '* Select ★ SAVE to rescue your friends\' SOULs!';
              });
            } else {
              this.beginMsg(this.L().struggleFail, () => {
                const sp = this.L().p2Speech[Math.min(this.struggles - 1, this.L().p2Speech.length - 1)];
                this.beginBubble([sp], () => this.spawnAttack(this.p2Turn % 2 === 0 ? 'p2_comets' : 'p2_orb_beam'));
              });
            }
            return;
          }

          if (this.cur === 0) {
            this.sub = 'target';
          } else if (this.cur === 1) {
            if (this.mode === 'p2' && this.saveUnlocked) {
              this.sub = 'save_list'; this.subCur = 0;
            } else {
              this.sub = 'act'; this.subCur = 0;
            }
          } else if (this.cur === 2) {
            if (!this.items.length) {
              this.beginMsg(G.lang === 'zh' ? '* 你的背包是空的！用 ACT -> Dream 可以補滿最後的夢想。' : '* Inventory empty! Use ACT -> Dream to refill Last Dreams.', () => { this.sub = 'main'; });
            } else {
              this.sub = 'item'; this.subCur = 0;
            }
          } else if (this.cur === 3) {
            this.sub = 'mercy'; this.subCur = 0;
          }
          return;
        }

        if (this.sub === 'target') {
          this.sub = 'fight_bar';
          this.barX = 48; this.barV = 8.5;
          return;
        }
        if (this.sub === 'fight_bar') {
          G.sfx.sfx('laz', 0.6);
          this.sub = 'slice'; this.sliceF = 0;
          return;
        }
        if (this.sub === 'act') {
          G.sfx.sfx('select', 0.55);
          const L = this.L().p1Act;
          if (this.subCur === 0) {
            this.beginMsg(L.check, () => this.finishPlayerAction());
          } else if (this.subCur === 1) {
            this.hopeActive = true;
            this.hopedCount++;
            this.hp = Math.min(this.maxHp, this.hp + 1);
            G.sfx.sfx('heal', 0.6);
            this.beginMsg(this.hopedCount === 1 ? L.hope1 : L.hope2, () => this.finishPlayerAction());
          } else if (this.subCur === 2) {
            this.dreamCount++;
            while (this.items.length < 8) {
              this.items.push({ id: 'dream', en: 'LastDream', zh: '最後的夢想', heal: 17 });
            }
            this.hp = Math.min(this.maxHp, this.hp + 4);
            G.sfx.sfx('heal', 0.6);
            this.beginMsg(this.dreamCount === 1 ? L.dream1 : L.dream2, () => this.finishPlayerAction());
          }
          return;
        }
        if (this.sub === 'item') {
          const it = this.items[this.subCur];
          if (!it) return;
          this.items.splice(this.subCur, 1);
          this.hp = Math.min(this.maxHp, this.hp + it.heal);
          if (it.speed) this.seaTeaBoost = true;
          G.sfx.sfx('heal', 0.65);
          const name = G.lang === 'zh' ? it.zh : it.en;
          const m = G.lang === 'zh'
            ? `* 你使用了 ${name}！\n* HP 回復了（目前 ${formatHp(this.hp)}/${this.maxHp}）！`
            : `* You used the ${name}!\n* Recovered HP (${formatHp(this.hp)}/${this.maxHp})!`;
          this.beginMsg(m, () => this.finishPlayerAction());
          return;
        }
        if (this.sub === 'mercy') {
          G.sfx.sfx('select', 0.55);
          this.beginMsg(this.L().p1Act.mercyTxt, () => this.finishPlayerAction());
          return;
        }
        if (this.sub === 'save_list') {
          const keys = ['undyne', 'alphys', 'skelebros', 'parents'];
          const allSaved = keys.every(k => this.savedSouls[k]);
          G.sfx.sfx('select', 0.6);
          if (allSaved) {
            this.beginMsg(this.L().saveAsrielLine, () => {
              this.whiteAlpha = 1.2;
              G.sfx.sfx('abreak2', 0.75);
              G.sfx.playBGM('histheme', true, 0.55);
              this.mode = 'finale';
              this.finTurn = 0; this.asrielCry = 1;
              this.beginBubble([this.L().finaleBubble[0]], () => this.launchFinaleWave(0));
            });
            return;
          }
          const pick = keys[this.subCur];
          if (this.savedSouls[pick]) {
            const msg = G.lang === 'zh' ? `* ${this.L().lostSouls[pick].name} 的靈魂已經與你並肩！` : `* ${this.L().lostSouls[pick].name} is already standing with you!`;
            this.beginMsg(msg, () => { this.sub = 'save_list'; });
            return;
          }
          this.activeLostSoul = pick;
          this.lsActDone = 0;
          this.mode = 'lost_soul';
          this.whiteAlpha = 1;
          G.sfx.sfx('spearappear', 0.65);
          this.sub = 'ls_act'; this.subCur = 0;
          return;
        }
        if (this.sub === 'ls_act') {
          G.sfx.sfx('select', 0.6);
          const ls = this.L().lostSouls[this.activeLostSoul];
          const resTxt = ls.res[this.subCur] || ls.res[0];
          this.lsActDone++;
          if (this.lsActDone >= 3) {
            this.savedSouls[this.activeLostSoul] = true;
            this.hp = this.maxHp;
            G.sfx.sfx('heal', 0.7);
            G.sfx.sfx('sparkles', 0.7);
            this.beginMsg(resTxt + '\n' + ls.savedMsg, () => {
              this.whiteAlpha = 1.1;
              this.mode = 'p2';
              this.sub = 'main';
              const n = Object.values(this.savedSouls).filter(Boolean).length;
              this.statusTxt = n === 4
                ? (G.lang === 'zh' ? '* 最後一個人仍在等待拯救……點擊 ★ SAVE！' : '* One last SOUL needs to be SAVED... Click ★ SAVE!')
                : (G.lang === 'zh' ? `* 成功喚醒了 ${ls.name}！（${n}/4）` : `* SAVED ${ls.name}! (${n}/4 Friends Resonating)`);
            });
          } else {
            this.beginMsg(resTxt, () => this.spawnAttack('ls_' + this.activeLostSoul));
          }
        }
      },

      finishPlayerAction() {
        if (this.mode === 'p1') {
          const sp = this.L().p1TurnSpeech[this.p1Turn];
          if (sp && sp.length) this.beginBubble(sp, () => this.launchP1Wave(this.p1Turn));
          else this.launchP1Wave(this.p1Turn);
        } else if (this.mode === 'p2') {
          this.hp = Math.min(this.maxHp, this.hp + 5);
          this.spawnAttack(this.p2Turn % 2 === 0 ? 'p2_comets' : 'p2_orb_beam');
        } else {
          this.sub = 'main';
        }
      },

      onCancel() {
        if (this.mode === 'intro') { this.startPhase('p1'); return; }
        if (this.mode === 'phase_menu' || this.mode === 'single_menu') { this.mode = 'title'; this.menuCursor = 0; G.sfx.sfx('select', 0.45); return; }
        if (this.singlePractice && this.sub === 'dodge') {
          this.resetEntities(); this.mode = 'single_menu'; this.menuCursor = Math.max(0, this.singleWaveIdx); return;
        }
        if (this.sub === 'msg') { this.mc = 9999; return; }
        if (this.sub === 'bubble') { this.bubC = 9999; return; }
        if (['target', 'act', 'item', 'mercy', 'save_list'].includes(this.sub)) {
          this.sub = 'main'; G.sfx.sfx('select', 0.4);
        }
      },

      onNav(dir) {
        if (this.mode === 'title') {
          const n = 5;
          if (dir === 'up') this.menuCursor = (this.menuCursor + n - 1) % n;
          else if (dir === 'down') this.menuCursor = (this.menuCursor + 1) % n;
          else if (dir === 'left' || dir === 'right') { /* toggle lang quickly */ }
          G.sfx.sfx('squeak', 0.4);
          return;
        }
        if (this.mode === 'phase_menu') {
          const n = 7;
          if (dir === 'up') this.menuCursor = (this.menuCursor + n - 1) % n;
          else if (dir === 'down') this.menuCursor = (this.menuCursor + 1) % n;
          G.sfx.sfx('squeak', 0.4);
          return;
        }
        if (this.mode === 'single_menu') {
          const n = 10;
          if (dir === 'up') this.menuCursor = (this.menuCursor + n - 1) % n;
          else if (dir === 'down') this.menuCursor = (this.menuCursor + 1) % n;
          G.sfx.sfx('squeak', 0.4);
          return;
        }
        if (this.mode === 'victory') {
          if (dir === 'up' || dir === 'left') this.cur = (this.cur + 2) % 3;
          else if (dir === 'down' || dir === 'right') this.cur = (this.cur + 1) % 3;
          G.sfx.sfx('squeak', 0.4);
          return;
        }
        if (this.sub === 'dodge' && this.soulColor === 'green') {
          const m = { up: 0, right: 1, down: 2, left: 3 };
          if (dir in m) this.shieldDir = m[dir];
          return;
        }
        if (this.sub === 'dodge' && this.soulColor === 'blue' && dir === 'up') {
          if (this.soulY >= this.box.y + this.box.h - 14) {
            this.soulVy = -7.2;
          }
          return;
        }
        if (this.sub === 'main') {
          if (dir === 'left') this.cur = (this.cur + 3) % 4;
          else if (dir === 'right') this.cur = (this.cur + 1) % 4;
          G.sfx.sfx('squeak', 0.4);
        } else if (this.sub === 'act') {
          if (dir === 'up' || dir === 'down') this.subCur = (this.subCur + (dir === 'up' ? 2 : 1)) % 3;
          G.sfx.sfx('squeak', 0.4);
        } else if (this.sub === 'item') {
          const len = this.items.length; if (!len) return;
          if (dir === 'up' || dir === 'down') this.subCur = (this.subCur + 2) % len;
          else if (dir === 'left' || dir === 'right') this.subCur = (this.subCur + 1) % len;
          G.sfx.sfx('squeak', 0.4);
        } else if (this.sub === 'save_list') {
          const allSaved = Object.values(this.savedSouls).every(Boolean);
          if (!allSaved) {
            if (dir === 'up' || dir === 'down') this.subCur = (this.subCur + 2) % 4;
            else if (dir === 'left' || dir === 'right') this.subCur = (this.subCur + 1) % 4;
            G.sfx.sfx('squeak', 0.4);
          }
        } else if (this.sub === 'ls_act') {
          const n = this.L().lostSouls[this.activeLostSoul].Acts.length;
          if (dir === 'up') this.subCur = (this.subCur + n - 1) % n;
          else if (dir === 'down') this.subCur = (this.subCur + 1) % n;
          G.sfx.sfx('squeak', 0.4);
        }
      },

      onCanvasTap(cx, cy) {
        G.sfx.unlock();
        if (this.mode === 'title' || this.mode === 'phase_menu' || this.mode === 'single_menu') {
          const startY = this.mode === 'title' ? 210 : (this.mode === 'phase_menu' ? 118 : 102);
          const rowH = this.mode === 'title' ? 40 : (this.mode === 'phase_menu' ? 44 : 33);
          const n = this.mode === 'title' ? 5 : (this.mode === 'phase_menu' ? 7 : 10);
          const idx = Math.floor((cy - startY) / rowH);
          if (idx >= 0 && idx < n) { this.menuCursor = idx; this.onConfirm(); }
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
        if (this.standalone) { window.location.href = 'index.html'; }
        else { G.onExitAsriel?.(); }
      },

      // =====================================================================
      // 60FPS UPDATE LOOP
      // =====================================================================
      update(keys) {
        this.time++;
        this.bgScroll = (this.bgScroll + 2) % 800;
        this.wingRot += 0.08;
        if (this.whiteAlpha > 0) this.whiteAlpha = Math.max(0, this.whiteAlpha - 0.035);
        if (this.shake > 0) this.shake = Math.max(0, this.shake * 0.84 - 0.1);
        if (this.invuln > 0) this.invuln--;
        if (this.onHitFlash > 0) this.onHitFlash--;

        // Spawn rainbow afterimage trail for Phase 1 God of Hyperdeath
        if (this.mode === 'p1' && this.sub !== 'refuse' && !this.goner && this.time % 3 === 0) {
          this.afterimages.push({
            x: this.asX + Math.sin(this.time / 12) * 3,
            y: this.asY + Math.cos(this.time / 16) * 2,
            hue: (this.time * 7) % 360,
            alpha: 0.48,
            dx: -1.4 + Math.random() * 0.5,
          });
        }
        for (const a of this.afterimages) { a.x += a.dx; a.alpha -= 0.032; }
        this.afterimages = this.afterimages.filter(a => a.alpha > 0);

        if (this.mode === 'intro') {
          const line = this.L().introLines[this.introStep];
          if (line && this.introChar < line.text.length && this.time % 2 === 0) {
            this.introChar++;
            const ch = line.text[this.introChar - 1];
            if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice('asriel', 0);
          }
          return;
        }
        if (this.mode === 'epilogue') {
          const line = this.L().epilogueLines[this.epiIdx];
          if (line && this.epiC < line.text.length && this.time % 2 === 0) {
            this.epiC++;
            const ch = line.text[this.epiC - 1];
            if (ch && ch !== ' ' && ch !== '\n' && ch !== '*') G.sfx.voice('asriel', 0);
          }
          return;
        }

        // Smooth box tween
        this.box.x += (this.tBox.x - this.box.x) * 0.22;
        this.box.y += (this.tBox.y - this.box.y) * 0.22;
        this.box.w += (this.tBox.w - this.box.w) * 0.22;
        this.box.h += (this.tBox.h - this.box.h) * 0.22;

        if (this.sub === 'msg') {
          if (this.mc < stripCodes(this.msg).length) {
            this.mc++;
            const ch = stripCodes(this.msg)[this.mc - 1];
            if (ch && ch !== ' ' && ch !== '\n' && ch !== '*') G.sfx.voice('narrator', 0);
          }
          return;
        }
        if (this.sub === 'bubble') {
          const b = this.bubbles[this.bubIdx];
          if (b && this.bubC < stripCodes(b.text).length && this.time % 2 === 0) {
            this.bubC++;
            const ch = stripCodes(b.text)[this.bubC - 1];
            if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice('asrielboss', b.expr);
          }
          return;
        }
        if (this.sub === 'fight_bar') {
          this.barX += this.barV;
          if (this.barX >= 590) {
            G.sfx.sfx('laz', 0.5);
            this.sub = 'slice'; this.sliceF = 0;
          }
          return;
        }
        if (this.sub === 'slice') {
          this.sliceF += 0.22;
          if (this.sliceF >= 7.5) {
            this.beginMsg(this.L().p1Act.missTxt, () => this.finishPlayerAction());
          }
          return;
        }
        if (this.sub === 'refuse') {
          this.refuseT++;
          if (this.refuseT === 70) { G.sfx.sfx('break1', 0.75); this.refuseStage = 1; } // Heart rejoins!
          if (this.refuseT === 145) {
            this.whiteAlpha = 0.85;
            this.hp = this.maxHp;
            this.sub = 'main';
            this.resetEntities();
            this.statusTxt = this.L().refused;
          }
          return;
        }

        if (this.sub === 'dodge') this.updateDodge(keys);
      },

      updateDodge(keys) {
        this.attackTimer++;
        const bx = this.box.x + 8, by = this.box.y + 8, br = this.box.x + this.box.w - 8, bb = this.box.y + this.box.h - 8;

        // 1. SOUL Movement
        if (this.soulColor === 'green') {
          if (keys.up) this.shieldDir = 0;
          else if (keys.right) this.shieldDir = 1;
          else if (keys.down) this.shieldDir = 2;
          else if (keys.left) this.shieldDir = 3;
        } else if (this.soulColor === 'blue') {
          const ramp = keys.moveScale != null ? keys.moveScale : 1;
          const spd = (keys.cancel ? 1.2 : (this.seaTeaBoost ? 2.9 : 2.3)) * ramp;
          if (keys.left) this.soulX -= spd;
          if (keys.right) this.soulX += spd;
          if (keys.up && this.soulY >= bb - 7 && this.soulVy >= 0) this.soulVy = -6.8;
          if (!keys.up && this.soulVy < -1.5) this.soulVy *= 0.6;
          this.soulVy = Math.min(7.2, this.soulVy + 0.31);
          this.soulY += this.soulVy;
          if (this.soulY > bb - 6) { this.soulY = bb - 6; this.soulVy = 0; }
          if (this.soulY < by + 6) { this.soulY = by + 6; this.soulVy = 0; }
        } else {
          const ramp = keys.moveScale != null ? keys.moveScale : 1;
          const spd = (keys.cancel ? 1.2 : (this.seaTeaBoost ? 2.95 : 2.35)) * ramp;
          let dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
          let dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
          if (dx && dy) { dx *= 0.75; dy *= 0.75; }
          this.soulX += dx * spd;
          this.soulY += dy * spd;
          if (this.goner && this.goner.t > 80 && this.goner.t < 290) {
            // Hyper Goner suction force pulling SOUL up into the roaring jaws!
            const pullAng = Math.atan2(180 - this.soulY, 320 - this.soulX);
            this.soulX += Math.cos(pullAng) * 1.05;
            this.soulY += Math.sin(pullAng) * 1.45;
          }
        }
        this.soulX = Math.max(bx + 6, Math.min(br - 6, this.soulX));
        this.soulY = Math.max(by + 6, Math.min(bb - 6, this.soulY));

        // Yellow shooter SOUL projectiles (Lost Soul Alphys)
        for (const s of this.playerShots) s.y += s.vy;
        this.playerShots = this.playerShots.filter(s => s.y > this.box.y - 10);

        const kind = this.currentAtk;
        const t = this.attackTimer;

        // Pattern A: Star Blazing / Galacta Blazing
        if (kind === 'star') {
          const hard = this.stars.hard;
          if (t < this.attackDur - 55 && t % (hard ? 11 : 14) === 1) {
            if (t % 28 === 1) G.sfx.sfx('star', 0.45, 0.9 + Math.random() * 0.25);
            const fromLeft = Math.random() < 0.35;
            this.bullets.push({
              type: 'stormstar',
              x: fromLeft ? -40 : 420 + Math.random() * 280,
              y: -30 - Math.random() * 40,
              vx: fromLeft ? (4.5 + Math.random() * 2) : (-5.2 - Math.random() * 2.5),
              vy: 4.5 + Math.random() * 2,
              hue: (t * 17) % 360,
              splitY: this.box.y + 40 + Math.random() * (this.box.h - 45),
              big: false, trail: [], r: 10,
            });
          }
          if (t === this.attackDur - 58 && !this.stars.explodedBig) {
            this.stars.explodedBig = true;
            G.sfx.sfx('star', 0.65, 0.55);
            this.bullets.push({
              type: 'stormstar', x: 660, y: -60, vx: -5.2, vy: 4.3,
              hue: 50, splitY: 270, big: true, trail: [], r: 22,
            });
          }
        }

        // Pattern B: Shocker Breaker I & II
        else if (kind === 'shocker') {
          const hard = this.bolts.hard;
          const step = hard ? 14 : 18;
          if (t < 150 && t % step === 2) {
            const lane = (this.bolts.idx % 5);
            const reverse = Math.floor(this.bolts.idx / 5) % 2 === 1;
            const col = reverse ? (4 - lane) : lane;
            const lx = this.box.x + 22 + col * ((this.box.w - 44) / 4);
            this.bolts.idx++;
            G.sfx.sfx('target', 0.35);
            this.bullets.push({ type: 'warnbolt', x: lx, y: this.box.y + this.box.h / 2, timer: 22, w: 32, giga: false });
          }
          if (hard && t === 165 && !this.bolts.gigaFired) {
            this.bolts.gigaFired = true;
            G.sfx.sfx('target', 0.5);
            for (const xOff of [-70, 70]) {
              this.bullets.push({ type: 'warnbolt', x: 320 + xOff, y: this.box.y + this.box.h / 2, timer: 26, w: 66, giga: true });
            }
          }
        }

        // Pattern C: Chaos Saber / Chaos Slicer
        else if (kind === 'saber') {
          const S = this.sabers;
          S.timer++;
          const period = S.hard ? 26 : 32;
          if (S.count < S.maxSwings) {
            const local = S.timer % period;
            if (local === 1) {
              S.curSide = (S.count % 2);
              this.asX = S.curSide === 0 ? 275 : 365;
              G.sfx.sfx('pullback', 0.6);
            }
            if (local === period - 10) {
              this.shake = 6;
              G.sfx.sfx('swipe', 0.7);
              // Deadly half-arena slash hitbox
              const hx = S.curSide === 0 ? this.box.x : 320;
              this.bullets.push({
                type: 'saberslash', side: S.curSide, x: hx, y: this.box.y,
                w: this.box.w / 2 + 12, h: this.box.h, life: 9,
              });
              S.count++;
            }
          } else if (!S.twinklesSpawned) {
            S.twinklesSpawned = true;
            this.asX = 320; this.shake = 10;
            G.sfx.sfx('cinematiccut', 0.7);
            G.sfx.sfx('sparkles', 0.65);
            // Cross-box closing smash + exploding diamond twinkles!
            for (let i = 0; i < 16; i++) {
              const ang = (i / 16) * Math.PI * 2;
              this.bullets.push({
                type: 'starburst', x: 320, y: 315,
                vx: Math.cos(ang) * 3.1, vy: Math.sin(ang) * 3.1,
                hue: i * 22, r: 5, life: 70,
              });
            }
          }
        }

        // Pattern D: Chaos Buster / Chaos Blaster
        else if (kind === 'buster') {
          const gn = this.gun;
          gn.t++;
          const shotInterval = gn.hard ? 20 : 25;
          if (gn.salvo < gn.maxSalvo) {
            if (gn.t % shotInterval === 1) {
              gn.angle = Math.atan2(this.soulY - gn.by, this.soulX - gn.bx);
              gn.lines = (gn.salvo % 2 === 0) ? 3 : (gn.hard ? 5 : 4);
              G.sfx.sfx('target', 0.45);
            }
            if (gn.t % shotInterval === 14) {
              G.sfx.sfx('abullet', 0.6);
              gn.recoil = 8; gn.salvo++;
              const n = gn.lines;
              const spread = gn.hard ? 0.24 : 0.28;
              for (let i = 0; i < n; i++) {
                const a = gn.angle + (i - (n - 1) / 2) * spread;
                this.bullets.push({
                  type: 'gunbolt', x: gn.bx, y: gn.by,
                  vx: Math.cos(a) * 8.5, vy: Math.sin(a) * 8.5,
                  deg: -a * 180 / Math.PI, hue: (i * 55 + gn.t * 9) % 360, r: 5,
                });
              }
            }
          } else {
            // Final Rainbow Buster Beam!
            if (gn.beamTimer === 0) G.sfx.sfx('rainbowbeam', 0.75);
            gn.beamTimer++;
            this.shake = 7;
            if (gn.beamTimer < 45) {
              const ang = gn.angle + Math.sin(gn.beamTimer * 0.25) * 0.35;
              this.beams.push({ x: gn.bx, y: gn.by, angle: ang, w: 34, hue: (this.time * 18) % 360, life: 2 });
            }
          }
          gn.recoil *= 0.8;
        }

        // Pattern E: HYPER GONER (Full-screen Vortex!)
        else if (kind === 'hypergoner') {
          const Gg = this.goner; Gg.t++;
          if (Gg.t < 40) Gg.alpha = Math.min(1, Gg.t / 25);
          if (Gg.t === 42 && !Gg.laughPlayed) { Gg.laughPlayed = true; G.sfx.sfx('hg_laugh', 0.75); }
          if (Gg.t === 85 && !Gg.chargePlayed) { Gg.chargePlayed = true; G.sfx.sfx('hg_charge', 0.75); }
          if (Gg.t > 85 && Gg.t < 290) {
            this.shake = 4.5;
            if (Gg.t % 4 === 0) {
              const side = Math.floor(Math.random() * 4);
              const sx = side === 2 ? -20 : side === 3 ? 660 : Math.random() * 640;
              const sy = side === 0 ? -20 : side === 1 ? 490 : Math.random() * 420;
              const a = Math.atan2(175 - sy, 320 - sx);
              this.bullets.push({
                type: 'hgdebris', x: sx, y: sy,
                vx: Math.cos(a) * (4.5 + Math.random() * 3.5),
                vy: Math.sin(a) * (4.5 + Math.random() * 3.5),
                sc: 1.5, r: 10,
              });
            }
          }
          if (Gg.t > 295) this.whiteAlpha = Math.min(1.2, (Gg.t - 295) / 22);
        }

        // Pattern F: Phase 2 Rainbow Homing Comets & Blast Orbs
        else if (kind === 'p2_comets') {
          if (t < this.attackDur - 35 && t % 7 === 1) {
            const side = (Math.floor(t / 7) % 2);
            if (t % 14 === 1) G.sfx.sfx('segapower', 0.45, 0.85);
            const sx = side === 0 ? 150 : 490, sy = 155;
            const ang = Math.atan2(this.soulY - sy, this.soulX - sx) + (Math.random() - 0.5) * 0.4;
            this.bullets.push({
              type: 'comet', x: sx, y: sy,
              vx: Math.cos(ang) * 5.8, vy: Math.sin(ang) * 5.8,
              hue: (t * 21) % 360, hist: [], r: 6,
            });
          }
        } else if (kind === 'p2_orb_beam') {
          if (t < this.attackDur - 40 && t % 22 === 1) {
            G.sfx.sfx('star', 0.45, 1.2);
            const cx = 320 + Math.cos(t * 0.1) * 140;
            for (let i = 0; i < 6; i++) {
              const a = (i / 6) * Math.PI * 2 + t * 0.05;
              this.bullets.push({ type: 'starburst', x: cx, y: 200, vx: Math.cos(a) * 3.5, vy: Math.sin(a) * 3.5, hue: i * 60 + t, r: 5, life: 95 });
            }
          }
        }

        // Pattern G: Final Desperate Rainbow Beam (hits across UI!)
        else if (kind === 'lastbeam') {
          const lb = this.lastBeam; lb.t++;
          if (lb.t === 15) G.sfx.sfx('rainbowbeam', 0.75);
          if (lb.t >= 15) {
            this.shake = 7;
            lb.bw = Math.min(lb.maxBw, (lb.t - 15) * 14);
            // Hits center triangle regardless to enact canonical 1 -> 0.0001 scene, or dodgeable at far edges!
            const halfW = lb.bw * (Math.max(0.2, (this.soulY - 120) / 360));
            if (Math.abs(this.soulX - 320) < halfW && lb.t > 24) this.hurt(1);
          }
        }

        // Pattern H: Lost Souls Mini-Waves
        else if (kind === 'ls_undyne') {
          if (t % 22 === 2) {
            G.sfx.sfx('spearappear', 0.35);
            const d = (Math.floor(t / 22) + (t > 100 ? 1 : 0)) % 4;
            const pos = [
              { x: 320, y: this.box.y - 110, vx: 0, vy: 4.1, dir: 0 },
              { x: this.box.x + this.box.w + 110, y: 318, vx: -4.1, vy: 0, dir: 1 },
              { x: 320, y: this.box.y + this.box.h + 110, vx: 0, vy: -4.1, dir: 2 },
              { x: this.box.x - 110, y: 318, vx: 4.1, vy: 0, dir: 3 },
            ][d];
            this.bullets.push({ type: 'ls_arrow', ...pos, r: 7 });
          }
        } else if (kind === 'ls_alphys') {
          if (t % 18 === 2) {
            this.bullets.push({
              type: 'ls_zap',
              x: this.box.x + 22 + Math.random() * (this.box.w - 44),
              y: this.box.y - 10, vy: 2.3 + Math.random(), r: 10, destructible: Math.random() < 0.7,
            });
          }
        } else if (kind === 'ls_skelebros') {
          if (t % 28 === 2) {
            const fromLeft = (t / 28) % 2 === 0;
            const tall = Math.random() < 0.35 ? 52 : 28;
            this.bullets.push({
              type: 'ls_bone',
              x: fromLeft ? this.box.x - 12 : this.box.x + this.box.w + 12,
              y: this.box.y + this.box.h - tall, w: 12, h: tall,
              vx: fromLeft ? 3.5 : -3.5, vy: 0,
            });
          }
        } else if (kind === 'ls_parents') {
          if (t % 14 === 1) {
            G.sfx.sfx('chug', 0.28);
            const sx = t % 28 === 1 ? this.box.x + 12 : this.box.x + this.box.w - 12;
            const ang = Math.atan2(this.soulY - (this.box.y + 10), this.soulX - sx);
            this.bullets.push({
              type: 'ls_fire', x: sx, y: this.box.y + 10,
              vx: Math.cos(ang) * 3.4, vy: Math.sin(ang) * 3.4, r: 8,
            });
          }
        }

        // Update bullets & check collisions
        const nextBullets = [];
        for (const b of this.bullets) {
          if (b.type === 'stormstar') {
            b.trail.push({ x: b.x, y: b.y });
            if (b.trail.length > 5) b.trail.shift();
            b.x += b.vx; b.y += b.vy;
            if (b.y >= b.splitY) {
              const cnt = b.big ? 16 : 7;
              G.sfx.sfx(b.big ? 'explosion' : 'sparkles', 0.45, b.big ? 0.9 : 1.3);
              if (b.big) this.shake = 10;
              for (let i = 0; i < cnt; i++) {
                const a = (i / cnt) * Math.PI * 2;
                const spd = b.big ? 4.1 : 3.2;
                nextBullets.push({
                  type: 'starburst', x: b.x, y: b.y,
                  vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
                  hue: (b.hue + i * (360 / cnt)) % 360, r: 5, life: 90,
                });
              }
              continue;
            }
            nextBullets.push(b);
          } else if (b.type === 'warnbolt') {
            b.timer--;
            if (b.timer <= 0) {
              G.sfx.sfx(b.giga ? 'lithit2' : 'lithit', 0.6);
              this.shake = Math.max(this.shake, b.giga ? 11 : 6);
              nextBullets.push({ type: 'bolt', x: b.x, w: b.w, life: 13, giga: b.giga, hue: (this.time * 15) % 360 });
            } else nextBullets.push(b);
          } else if (b.type === 'bolt') {
            b.life--;
            if (Math.abs(this.soulX - b.x) < b.w * 0.42 && this.soulY > this.box.y) this.hurt(5);
            if (b.life > 0) nextBullets.push(b);
          } else if (b.type === 'saberslash') {
            b.life--;
            if (this.soulX >= b.x && this.soulX <= b.x + b.w && this.soulY >= b.y && this.soulY <= b.y + b.h) {
              this.hurt(5);
            }
            if (b.life > 0) nextBullets.push(b);
          } else if (b.type === 'comet') {
            b.hist.push({ x: b.x, y: b.y });
            if (b.hist.length > 12) b.hist.shift();
            // Gentle homing curve toward player
            b.vx += Math.max(-0.18, Math.min(0.18, (this.soulX - b.x) * 0.008));
            b.vy += Math.max(-0.18, Math.min(0.18, (this.soulY - b.y) * 0.008));
            const sp = Math.hypot(b.vx, b.vy);
            if (sp > 7.5) { b.vx = (b.vx / sp) * 7.5; b.vy = (b.vy / sp) * 7.5; }
            b.x += b.vx; b.y += b.vy;
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < b.r + 5) this.hurt(4);
            if (b.x > -40 && b.x < 680 && b.y > -40 && b.y < 520) nextBullets.push(b);
          } else if (b.type === 'ls_arrow') {
            b.x += b.vx; b.y += b.vy;
            const dToCenter = Math.hypot(b.x - 320, b.y - 318);
            if (dToCenter < 22) {
              if (b.dir === this.shieldDir) { G.sfx.sfx('arrow', 0.45); continue; } // Blocked!
            }
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < 9) this.hurt(3);
            else if (b.x > 100 && b.x < 540 && b.y > 120 && b.y < 460) nextBullets.push(b);
          } else if (b.type === 'ls_zap') {
            b.y += b.vy;
            let shotHit = false;
            if (b.destructible) {
              for (let si = this.playerShots.length - 1; si >= 0; si--) {
                const s = this.playerShots[si];
                if (Math.hypot(s.x - b.x, s.y - b.y) < 15) {
                  this.playerShots.splice(si, 1); shotHit = true; G.sfx.sfx('sparkles', 0.35); break;
                }
              }
            }
            if (shotHit) continue;
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < b.r + 4) this.hurt(3);
            if (b.y < this.box.y + this.box.h + 15) nextBullets.push(b);
          } else if (b.type === 'ls_bone') {
            b.x += b.vx;
            if (this.soulX + 5 > b.x && this.soulX - 5 < b.x + b.w && this.soulY + 5 > b.y && this.soulY - 5 < b.y + b.h) {
              this.hurt(3);
            }
            if (b.x > this.box.x - 40 && b.x < this.box.x + this.box.w + 40) nextBullets.push(b);
          } else {
            b.x += (b.vx || 0); b.y += (b.vy || 0);
            if (b.life !== undefined) { b.life--; if (b.life <= 0) continue; }
            if (b.type === 'hgdebris') {
              b.vx *= 1.035; b.vy *= 1.035;
              if (Math.hypot(b.x - 320, b.y - 175) < 16) continue;
            }
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < (b.r || 6) + 5) {
              this.hurt(this.mode === 'finale' ? 1 : (b.type === 'ls_fire' ? 3 : 5));
            }
            if (b.x > -80 && b.x < 720 && b.y > -80 && b.y < 550) nextBullets.push(b);
          }
        }
        this.bullets = nextBullets;

        // Beams collision
        const nextBeams = [];
        for (const bm of this.beams) {
          bm.life--;
          const px = this.soulX - bm.x, py = this.soulY - bm.y;
          const along = px * Math.cos(bm.angle) + py * Math.sin(bm.angle);
          const perp = Math.abs(-px * Math.sin(bm.angle) + py * Math.cos(bm.angle));
          if (along > 0 && perp < bm.w * 0.52) this.hurt(5);
          if (bm.life > 0) nextBeams.push(bm);
        }
        this.beams = nextBeams;

        if (this.attackTimer >= this.attackDur) {
          this.finishWave();
        }
      },

      // =====================================================================
      // 60FPS CANVAS RENDERER (640x480 Undertale Native)
      // =====================================================================
      render(ctx) {
        const L = this.L(), zh = G.lang === 'zh';
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 640, 480);

        if (this.shake > 0.3) {
          ctx.translate((Math.random() - 0.5) * this.shake * 2, (Math.random() - 0.5) * this.shake * 2);
        }

        // ---------------- SIMULATOR MENUS (c2-sans-fight style!) ----------------
        if (this.mode === 'title' || this.mode === 'phase_menu' || this.mode === 'single_menu') {
          this.drawPsychedelicBG(ctx, 0.28);
          ctx.fillStyle = 'rgba(0,0,0,0.62)';
          ctx.fillRect(0, 0, 640, 480);
          // Floating hyperdeath silhouette
          drawSprExt(ctx, 'spr_asriel_afterimager_full', 0, 520, 42 + Math.sin(this.time * 0.05) * 6, 1.5, 1.5, 0, hsvCss(this.time * 4, 80, 65), 0.35, false);

          drawRichText(ctx, L.simTitle, 44, 34, 999, { size: 32, color: hsvCss(this.time * 4, 90, 70) });
          drawRichText(ctx, L.simSub, 44, 72, 999, { size: 18, color: '#cccccc' });

          const list = this.mode === 'title'
            ? L.menuOpts
            : (this.mode === 'phase_menu' ? L.phaseOpts : [...L.singleOpts.slice(0, 8), L.noHitToggle + (this.noHitMode ? ' [ON]' : ' [OFF]'), L.singleOpts[8]]);
          const startY = this.mode === 'title' ? 210 : (this.mode === 'phase_menu' ? 118 : 102);
          const rowH = this.mode === 'title' ? 40 : (this.mode === 'phase_menu' ? 44 : 33);

          list.forEach((lbl, idx) => {
            const sel = this.menuCursor === idx;
            const y = startY + idx * rowH;
            if (sel) drawSpr(ctx, 'spr_heart', 0, 48, y + 4, 1, 1);
            drawRichText(ctx, lbl, 78, y, 999, { size: this.mode === 'single_menu' ? 18 : 22, color: sel ? '#ffff00' : '#ffffff' });
          });

          drawRichText(ctx, zh ? '↑↓ 選擇  ·  Z / 點擊確認  ·  X 返回' : '↑↓ Select · Z / Click Confirm · X Back', 44, 446, 999, { size: 16, color: '#888888' });
          ctx.restore();
          return;
        }

        // ---------------- INTRO CUTSCENE (Kid Asriel -> Transformation) ----------------
        if (this.mode === 'intro') {
          drawSpr(ctx, 'spr_kidasriel_front', Math.floor(this.time / 15) % 4, 286, 130, 2, 2);
          const line = L.introLines[this.introStep];
          if (line) {
            ctx.fillStyle = '#fff'; ctx.fillRect(380, 108, 224, 114);
            ctx.beginPath(); ctx.moveTo(380, 148); ctx.lineTo(364, 158); ctx.lineTo(380, 168); ctx.fill();
            drawRichText(ctx, line.text, 392, 118, this.introChar, { size: 18, lineH: 24, color: '#000000' });
          }
          drawRichText(ctx, zh ? '[X] 跳過開場' : '[X] Skip Intro', 460, 444, 999, { size: 16, color: '#777777' });
          ctx.restore();
          return;
        }

        // ---------------- EPILOGUE / VICTORY ----------------
        if (this.mode === 'epilogue') {
          const ep = L.epilogueLines[this.epiIdx];
          const sp = ep.pose === 'hug' ? 'spr_asriel_hug' : (ep.pose === 'dry' ? 'spr_asriel_tearsdry' : 'spr_asriel_armcry');
          drawSpr(ctx, sp, Math.floor(this.time / 12), 295, 160, 3, 3);
          if (ep.pose !== 'hug') drawSpr(ctx, 'spr_maincharau', 0, 292, 260, 2, 2);
          // 7 floating rainbow SOULs above
          const scols = ['spr_heartaqua', 'spr_heartorange', 'spr_heartblue', 'spr_heartpurple', 'spr_heartgreen', 'spr_heartyellow', 'spr_heart'];
          scols.forEach((sn, i) => {
            const ang = this.time * 0.03 + (i / 7) * Math.PI * 2;
            drawSpr(ctx, sn, 0, 312 + Math.cos(ang) * 95, 115 + Math.sin(ang) * 28, 1.5, 1.5);
          });
          ctx.fillStyle = '#000'; ctx.fillRect(32, 330, 576, 128);
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.strokeRect(32, 330, 576, 128);
          drawRichText(ctx, ep.text, 54, 352, this.epiC, { size: 22, lineH: 30 });
          if (this.whiteAlpha > 0) { ctx.fillStyle = `rgba(255,255,255,${Math.min(1, this.whiteAlpha)})`; ctx.fillRect(0, 0, 640, 480); }
          ctx.restore();
          return;
        }

        if (this.mode === 'victory') {
          this.drawPsychedelicBG(ctx, 0.25);
          ctx.fillStyle = 'rgba(0,0,0,0.68)'; ctx.fillRect(0, 0, 640, 480);
          drawSpr(ctx, 'spr_allsoul', Math.floor(this.time / 8), 296, 66, 3, 3);
          drawRichText(ctx, L.victoryTitle, 72, 134, 999, { size: 28, color: '#ffff00' });
          drawRichText(ctx, L.victorySub, 72, 174, 999, { size: 18, color: '#ffffff' });
          const stTxt = zh
            ? `拒絕死亡次數 (But it refused): ${this.refusals} 次\n累計受傷總量: ${this.damageTakenTotal} HP\n評價: ${this.refusals === 0 ? '★ 真·無死之決心大師！' : '❤ 拯救世界的希望之光！'}`
            : `Refusals ("But it refused."): ${this.refusals}\nTotal Damage Taken: ${this.damageTakenTotal} HP\nRank: ${this.refusals === 0 ? '★ TRUE PACIFIST MASTER!' : '❤ SAVIOR OF THE WORLD!'}`;
          drawRichText(ctx, stTxt, 72, 224, 999, { size: 20, lineH: 30, color: '#a8ffd0' });
          const vOpts = zh ? ['再戰完整版 7 SOULs', '單招練習模式 (Single Attacks)', '返回大冒險'] : ['Replay Full 7 SOULs', 'Single Attack Practice', 'Back to Overworld'];
          vOpts.forEach((lbl, i) => {
            const y = 340 + i * 38;
            if (this.cur === i) drawSpr(ctx, 'spr_heart', 0, 74, y + 5, 1, 1);
            drawRichText(ctx, lbl, 102, y, 999, { size: 22, color: this.cur === i ? '#ffff00' : '#ffffff' });
          });
          ctx.restore();
          return;
        }

        // ---------------- MAIN BATTLE RENDERING ----------------
        // Dramatic jet-black void for "* But it refused."
        if (this.sub === 'refuse') {
          ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480);
          if (this.refuseStage === 0) {
            const jx = this.refuseT > 40 ? (Math.random() - 0.5) * 5 : 0;
            const jy = this.refuseT > 40 ? (Math.random() - 0.5) * 5 : 0;
            drawSpr(ctx, 'spr_heartbreak', 0, 310 + jx, 224 + jy, 1.5, 1.5);
          } else {
            drawSpr(ctx, 'spr_heart', 0, 310, 224, 1.5, 1.5);
            drawRichText(ctx, L.refused, 200, 152, Math.floor((this.refuseT - 70) / 2), { size: 28, color: '#ffffff' });
          }
          ctx.restore();
          return;
        }

        // 1. Undulating HSV Checkerboard Rainbow Horizon
        if (this.mode !== 'lost_soul') this.drawPsychedelicBG(ctx, 0.52);
        else { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480); }

        // 2. Boss Sprite Layer
        if (this.mode === 'lost_soul') this.drawLostSoulBoss(ctx);
        else if (this.mode === 'p2' || this.mode === 'finale') this.drawAsrielP2(ctx);
        else if (!this.goner) this.drawAsrielP1(ctx);

        // Finale memory panels behind box
        if (this.mode === 'finale' && this.asrielFade > 0.25) {
          drawSprExt(ctx, 'spr_asrielpanels', Math.floor(this.finTurn / 2) % 5, 120, 40, 2, 2, 0, null, 0.55);
        }

        // 3. Speech Bubble
        if (this.sub === 'bubble' && this.bubbles[this.bubIdx]) {
          ctx.fillStyle = '#fff'; ctx.fillRect(392, 46, 224, 134);
          ctx.beginPath(); ctx.moveTo(392, 92); ctx.lineTo(374, 102); ctx.lineTo(392, 112); ctx.fill();
          drawRichText(ctx, this.bubbles[this.bubIdx].text, 404, 56, this.bubC, { size: 17, lineH: 22, color: '#000000', who: 'asrielboss', maxWidth: 202, maxHeight: 116 });
        }

        // 4. Battle Box & Contents
        ctx.fillStyle = 'rgba(0,0,0,0.92)';
        ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);
        ctx.strokeStyle = this.hopeActive ? '#80e8ff' : '#fff';
        ctx.lineWidth = 5;
        ctx.strokeRect(this.box.x, this.box.y, this.box.w, this.box.h);

        // Hyper Goner whole-screen suction horror drawn crisply inside the expanded battle arena!
        if (this.goner) this.drawHyperGoner(ctx);

        if (this.sub === 'main') {
          drawRichText(ctx, this.statusTxt || '* ...', this.box.x + 22, this.box.y + 20, 999, { size: 22, lineH: 30, maxWidth: this.box.w - 44, maxHeight: this.box.h - 32 });
        } else if (this.sub === 'msg') {
          drawRichText(ctx, this.msg, this.box.x + 22, this.box.y + 18, Math.floor(this.mc), { size: 21, lineH: 28, maxWidth: this.box.w - 44, maxHeight: this.box.h - 28 });
        } else if (this.sub === 'target') {
          if (this.subCur === 0) drawSpr(ctx, 'spr_heart', 0, 58, 286, 1, 1);
          drawRichText(ctx, `* ASRIEL DREEMURR   LV ∞`, 86, 280, 999, { size: 24 });
          ctx.fillStyle = '#00e8ff'; ctx.fillRect(380, 284, 190, 18);
        } else if (this.sub === 'fight_bar' || this.sub === 'slice') {
          drawSpr(ctx, 'spr_target', 0, 38, 256, 1, 1);
          if (this.sub === 'fight_bar') drawSpr(ctx, 'spr_targetchoice', Math.floor(this.time / 4), Math.round(this.barX), 262, 1, 1);
          else drawSpr(ctx, 'spr_slice_o', Math.min(5, Math.floor(this.sliceF)), 272, 68, 2, 2);
        } else if (this.sub === 'act') {
          const opts = zh ? ['* 檢查 (Check)', '* 希望 (Hope) [減傷]', '* 夢想 (Dream) [補道具]'] : ['* Check', '* Hope (Reduce DMG)', '* Dream (Get Last Dreams)'];
          opts.forEach((o, i) => {
            const y = 270 + i * 34;
            if (this.subCur === i) drawSpr(ctx, 'spr_heart', 0, 56, y + 6, 1, 1);
            drawRichText(ctx, o, 86, y, 999, { size: 22, color: this.subCur === i ? '#ffff00' : '#ffffff' });
          });
        } else if (this.sub === 'item') {
          this.items.slice(0, 8).forEach((it, i) => {
            const col = i % 2, row = Math.floor(i / 2);
            const ix = 76 + col * 260, iy = 264 + row * 28;
            if (this.subCur === i) drawSpr(ctx, 'spr_heart', 0, ix - 24, iy + 5, 1, 1);
            drawRichText(ctx, `* ${zh ? it.zh : it.en}`, ix, iy, 999, { size: 20, color: this.subCur === i ? '#ffff00' : '#ffffff' });
          });
        } else if (this.sub === 'mercy') {
          drawSpr(ctx, 'spr_heart', 0, 56, 286, 1, 1);
          drawRichText(ctx, zh ? '* 寬恕 (Spare)' : '* Spare', 86, 280, 999, { size: 24, color: '#ffff00' });
        } else if (this.sub === 'save_list') {
          const keys = ['undyne', 'alphys', 'skelebros', 'parents'];
          const allSaved = keys.every(k => this.savedSouls[k]);
          if (allSaved) {
            drawSpr(ctx, 'spr_heart', 0, 62, 304, 1, 1);
            drawRichText(ctx, zh ? '★ 拯救：艾斯利爾·逐夢 (ASRIEL DREEMURR)' : '★ SAVE: ASRIEL DREEMURR', 92, 298, 999, { size: 24, color: hsvCss(this.time * 8, 90, 70) });
          } else {
            keys.forEach((k, i) => {
              const col = i % 2, row = Math.floor(i / 2);
              const ix = 76 + col * 260, iy = 278 + row * 44;
              const sv = this.savedSouls[k];
              if (this.subCur === i) drawSpr(ctx, 'spr_heart', 0, ix - 26, iy + 5, 1, 1);
              drawRichText(ctx, `${sv ? '★' : '*'} ${L.lostSouls[k].name}`, ix, iy, 999, { size: 21, color: sv ? '#777777' : (this.subCur === i ? '#ffff00' : '#ffffff') });
            });
          }
        } else if (this.sub === 'ls_act') {
          const ls = L.lostSouls[this.activeLostSoul];
          ls.Acts.forEach((a, i) => {
            const y = 266 + i * 28;
            if (this.subCur === i) drawSpr(ctx, 'spr_heart', 0, 56, y + 5, 1, 1);
            drawRichText(ctx, `* ${a}`, 86, y, 999, { size: 20, color: this.subCur === i ? '#ffff00' : '#ffffff' });
          });
        }

        // 5. Dodge Layer (Bullets + Beams + SOUL)
        if (this.sub === 'dodge') {
          this.drawBulletsAndBeams(ctx);
          const soulSpr = { red: 'spr_heart', blue: 'spr_heartblue', green: 'spr_heartgreen', yellow: 'spr_heartyellow_flip' }[this.soulColor] || 'spr_heart';
          if (!this.invuln || Math.floor(this.invuln / 3) % 2 === 0) {
            drawSpr(ctx, soulSpr, 0, Math.round(this.soulX - 8), Math.round(this.soulY - 8), 1, 1);
          }
          if (this.noHitMode || G.noHitShield || window.UT_NO_HIT_SHIELD) {
            ctx.save(); ctx.strokeStyle = 'rgba(80,235,255,0.85)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(this.soulX, this.soulY, 14, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
          }
          if (this.soulColor === 'green') {
            // Draw Undyne's blocking shield arc!
            ctx.save(); ctx.strokeStyle = '#40ff40'; ctx.lineWidth = 4;
            const angs = [-Math.PI / 2, 0, Math.PI / 2, Math.PI][this.shieldDir];
            ctx.beginPath(); ctx.arc(this.soulX, this.soulY, 20, angs - 0.8, angs + 0.8); ctx.stroke();
            ctx.restore();
          }
        }

        // 6. Battle HUD & Buttons (with Final Laser tearing over buttons!)
        drawBattleHUD(ctx, { name: G.state.name || 'FRISK', lv: G.state.lv || 1, hp: Math.ceil(this.hp), maxHp: this.maxHp }, 398);
        if (this.hp < 1 && this.hp > 0) {
          ctx.fillStyle = '#000'; ctx.fillRect(332, 395, 180, 28);
          drawRichText(ctx, `${formatHp(this.hp)} / ${this.maxHp}`, 336, 398, 999, { size: 24, color: '#ffff00' });
        }

        const btSprs = ['spr_fightbt', (this.mode === 'p2' && this.saveUnlocked) ? 'spr_savebt' : 'spr_talkbt', 'spr_itembt', 'spr_sparebt'];
        const btX = [32, 185, 338, 491];
        for (let i = 0; i < 4; i++) {
          const sel = this.sub === 'main' && this.cur === i;
          drawSpr(ctx, btSprs[i], sel ? 0 : 1, btX[i], 430, 1, 1);
          if (sel) drawSpr(ctx, 'spr_heart', 0, btX[i] + 8, 444, 1, 1);
        }

        if (this.lastBeam && this.lastBeam.t >= 15) this.drawFinalRainbowLaser(ctx);

        if (this.singlePractice && this.sub === 'dodge') {
          drawRichText(ctx, zh ? '[X] 返回單招列表' : '[X] Exit Practice', 440, 10, 999, { size: 15, color: '#cccccc' });
        }
        if (this.whiteAlpha > 0) {
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, this.whiteAlpha)})`;
          ctx.fillRect(0, 0, 640, 480);
        }
        ctx.restore();
      },

      drawPsychedelicBG(ctx, alpha) {
        const bg = SPR['spr_asrielbg'];
        if (!bg || !bg.img.complete || !bg.img.naturalWidth) return;
        const hue = (this.time * 4) % 360;
        const col = hsvCss(hue, 92, 60);
        if (!this._bgCanv) {
          this._bgCanv = document.createElement('canvas');
          this._bgCanv.width = 640; this._bgCanv.height = 240;
          this._bgCtx = this._bgCanv.getContext('2d');
        }
        const bc = this._bgCtx;
        bc.globalCompositeOperation = 'source-over';
        bc.clearRect(0, 0, 640, 240);
        const parts = 14;
        for (let i = 0; i < parts; i++) {
          const sy = i * 16;
          const ox = ((this.bgScroll + i * 24) % 800);
          bc.drawImage(bg.img, ox, sy, 640, 16, 0, sy, 640, 16);
        }
        bc.globalCompositeOperation = 'source-in';
        bc.fillStyle = col;
        bc.fillRect(0, 0, 640, 240);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(this._bgCanv, 0, 0);
        ctx.restore();
      },

      drawAsrielP1(ctx) {
        for (const a of this.afterimages) {
          drawSprExt(ctx, 'spr_asriel_afterimager', 0, a.x, a.y, 2, 2, 0, hsvCss(a.hue, 90, 62), a.alpha, true);
        }
        const x = this.asX + Math.sin(this.time / 12) * 3;
        const y = this.asY + Math.cos(this.time / 15) * 4;
        const yoff = Math.sin(this.time / 8) * 1.5;

        drawSprExt(ctx, 'spr_asrielfeet', 0, x + yoff * 2, y + 56, 2, 2, 0, null, 1, true);
        drawSprExt(ctx, 'spr_torsoball', 0, x + yoff, y + 48, 2, 2, 0, null, 1, true);
        drawSprExt(ctx, 'spr_asrieltorso', 0, x + yoff, y + 48, 2, 2, 0, null, 1, true);
        drawSprExt(ctx, 'spr_asriellocket', 0, x + 2, y + 34, 2, 2, 0, null, 1, true);

        if (this.sabers) {
          const S = this.sabers;
          const period = S.hard ? 26 : 32;
          const local = S.timer % period;
          const windup = !S.twinklesSpawned && local < period - 10;
          const slashing = !S.twinklesSpawned && local >= period - 10;
          if (windup) {
            const sideSign = S.curSide === 0 ? -1 : 1;
            drawSprExt(ctx, 'spr_asriel_swordarm_power', 0, x + sideSign * 36, y + 38, sideSign < 0 ? 2 : -2, 2, sideSign * 22, null, 1, true);
            drawSprExt(ctx, 'spr_asriel_swordarm', 0, x - sideSign * 36, y + 38, sideSign > 0 ? 2 : -2, 2, 0, null, 1, true);
          } else if (slashing) {
            drawSprExt(ctx, 'spr_asriel_swordandsmear', 0, x - 150, y - 20, 2, 2, 0, hsvCss(this.time * 12, 90, 75), 0.9, false);
            drawSprExt(ctx, 'spr_asriel_swordextend', 0, x + (S.curSide === 0 ? -44 : 44), y + 42, 2, 2, 0, null, 1, true);
          } else {
            drawSprExt(ctx, 'spr_asriel_swordarm', 0, x - 36, y + 36, 2, 2, 0, null, 1, true);
            drawSprExt(ctx, 'spr_asriel_swordarm', 0, x + 36, y + 36, -2, 2, 0, null, 1, true);
          }
        } else if (this.gun) {
          const gdeg = -this.gun.angle * 180 / Math.PI + 90;
          drawSprExt(ctx, 'spr_asriel_gunarm', 0, x + 32, y + 38, 2, 2, gdeg, null, 1, true);
          drawSprExt(ctx, 'spr_asriel_gunarm_meter', Math.min(6, Math.floor((this.gun.t % 24) / 3)), x + 32, y + 38, 2, 2, gdeg, hsvCss(this.time * 12), 0.9, true);
          drawSprExt(ctx, 'spr_asrielarm_r', 0, x - 28, y + 38, -2, 2, 0, null, 1, true);
        } else {
          const arml = Math.sin(this.time / 12) * 5;
          drawSprExt(ctx, 'spr_asrielarm_r', 0, x - 28, y + 38, -2, 2, arml, null, 1, true);
          drawSprExt(ctx, 'spr_asrielarm_r', 0, x + 30, y + 38, 2, 2, -arml, null, 1, true);
        }

        drawSprExt(ctx, 'spr_asrielshoulder_r', 0, x - 28, y + 26, -2, 2, 0, null, 1, true);
        drawSprExt(ctx, 'spr_asrielshoulder_r', 0, x + 30, y + 26, 2, 2, 0, null, 1, true);
        drawSprExt(ctx, 'spr_asrielcollar', 0, x, y + 22, 2, 2, 0, null, 1, true);
        drawSprExt(ctx, 'spr_asrielhead', this.asExpr, x, y, 2, 2, 0, null, 1, true);
      },

      drawAsrielP2(ctx) {
        const x = 320, y = 112;
        const af = Math.floor(this.time / 6);
        const bob = Math.sin(this.time / 4);
        const bob2 = Math.sin(this.time / 16) * 4;
        const alpha = Math.max(0.15, 1 - this.asrielFade);
        const armRot = this.gun ? 35 : (Math.sin(this.time * 0.06) * 8);

        if (this.asrielFade < 0.7) {
          // spr_afinal_cosmoswing has opaque black mask outside + transparent wing feathers inside so spr_asrielbg shines inside!
          drawSprExt(ctx, 'spr_afinal_cosmoswing', af, x + 42, y - 52 + bob2, 2, 2, 0, null, alpha, false);
          drawSprExt(ctx, 'spr_afinal_cosmoswing', af, x - 44, y - 52 + bob2, -2, 2, 0, null, alpha, false);
          drawSprExt(ctx, 'spr_afinal_orbwing', af, x - 110, y - 52, 2, 2, 0, hsvCss(this.time * 7, 80, 70), alpha, false);
          drawSprExt(ctx, 'spr_afinal_orbwing', af, x + 108, y - 52, -2, 2, 0, hsvCss(this.time * 7, 80, 70), alpha, false);
          drawSprExt(ctx, 'spr_afinal_stem', af, x - 2, y + 146, 2, 2, 0, null, alpha, true);
          drawSprExt(ctx, 'spr_afinal_orb', af, x - 2, y + 68, 2, 2, 0, hsvCss(this.time * 6), alpha, true);
          drawSprExt(ctx, 'spr_afinal_arm', af, x - 58, y + 56 + bob * 2, 2, 2, armRot, null, alpha, true);
          drawSprExt(ctx, 'spr_afinal_arm', af, x + 56, y + 56 + bob * 2, -2, 2, -armRot, null, alpha, true);
          drawSprExt(ctx, 'spr_afinal_shoulder', af, x - 84, y + 32, 2, 2, 0, null, alpha, false);
          drawSprExt(ctx, 'spr_afinal_shoulder', af, x + 82, y + 32, -2, 2, 0, null, alpha, false);
        }
        const fSpr = this.asrielCry === 2 ? 'spr_afinal_face_cry2' : (this.asrielCry === 1 ? 'spr_afinal_face_cry' : 'spr_afinal_face');
        drawSprExt(ctx, fSpr, Math.floor(this.time / 8), x, y, 2, 2, 0, null, 1, true);
      },

      drawLostSoulBoss(ctx) {
        const k = this.activeLostSoul;
        const jx = (Math.random() - 0.5) * 1.5;
        if (k === 'undyne') {
          drawSprExt(ctx, 'spr_undyneb_noanim', 0, 270 + jx, 60, 2.3, 2.3, 0, '#dddddd');
        } else if (k === 'alphys') {
          drawSprExt(ctx, 'spr_alphyshelper_a', Math.floor(this.time / 12) % 2, 255 + jx, 82, 2.2, 2.2, 0, '#dddddd');
        } else if (k === 'skelebros') {
          drawSprExt(ctx, 'spr_sansb_legs', 0, 210 + jx, 165, 2, 2, 0, '#dddddd', 1, true);
          drawSprExt(ctx, 'spr_sansb_torso', 0, 210 + jx, 128, 2, 2, 0, '#dddddd', 1, true);
          drawSprExt(ctx, 'spr_sansb_face', 0, 210 + jx, 96, 2, 2, 0, '#dddddd', 1, true);
          drawSprExt(ctx, 'spr_papyrusboss', 0, 395 + jx, 54, 1.7, 1.7, 0, '#dddddd');
        } else if (k === 'parents') {
          drawSprExt(ctx, 'spr_torielboss', 0, 175 + jx, 52, 1.7, 1.7, 0, '#dddddd');
          drawSprExt(ctx, 'spr_asgore_flashsilhouette', 0, 325 + jx, 42, 1.4, 1.4, 0, '#dddddd');
        }
      },

      drawHyperGoner(ctx) {
        const Gg = this.goner;
        const shakeY = Gg.t > 85 ? Math.sin(Gg.t * 0.7) * 5 : 0;
        const open = Gg.t > 85 ? 24 : Math.max(0, Math.sin(Gg.t * 0.5) * 8);
        drawSprExt(ctx, 'spr_hg_leftovers', 0, 168, 20 + shakeY / 4, 2, 2, 0, null, Gg.alpha);
        drawSprExt(ctx, 'spr_hg_horns', 0, 168, 12 - open / 2, 2, 2, 0, null, Gg.alpha);
        drawSprExt(ctx, 'spr_hg_jaws', Math.floor(this.time / 4), 272, 198 + open, 2, 2, 0, null, Gg.alpha);
        drawSprExt(ctx, 'spr_hg_mainface', 0, 256, 72 + shakeY, 2, 2, 0, null, Gg.alpha);
      },

      drawBulletsAndBeams(ctx) {
        // Chaos Saber windup warning stripe
        if (this.sabers && !this.sabers.twinklesSpawned) {
          const S = this.sabers, period = S.hard ? 26 : 32, local = S.timer % period;
          if (local >= 4 && local < period - 10) {
            ctx.save();
            ctx.strokeStyle = this.time % 4 < 2 ? 'rgba(255,255,255,0.65)' : 'rgba(255,220,64,0.65)';
            ctx.setLineDash([6, 6]); ctx.lineWidth = 2;
            const hx = S.curSide === 0 ? this.box.x + 2 : 320;
            ctx.strokeRect(hx, this.box.y + 2, this.box.w / 2 - 4, this.box.h - 4);
            ctx.restore();
          }
        }
        // Player yellow shots
        ctx.fillStyle = '#ffff40';
        for (const s of this.playerShots) ctx.fillRect(s.x - 2, s.y - 8, 4, 14);

        for (const b of this.bullets) {
          if (b.type === 'stormstar') {
            for (let i = 0; i < b.trail.length; i++) {
              drawSprExt(ctx, 'spr_stormstar', 1, b.trail[i].x, b.trail[i].y, b.big ? 1.5 : 0.75, b.big ? 1.5 : 0.75, b.hue, hsvCss(b.hue), 0.35, true);
            }
            drawSprExt(ctx, b.big ? 'spr_stormstar_b' : 'spr_stormstar', 0, b.x, b.y, b.big ? 1.6 : 0.85, b.big ? 1.6 : 0.85, this.time * 6, hsvCss(b.hue), 1, true);
          } else if (b.type === 'starburst') {
            drawSprExt(ctx, 'spr_regstar', 0, b.x, b.y, 1, 1, this.time * 12, hsvCss(b.hue), 1, true);
          } else if (b.type === 'warnbolt') {
            ctx.save();
            ctx.strokeStyle = this.time % 4 < 2 ? '#ff3838' : '#ffff40';
            ctx.lineWidth = 2;
            ctx.strokeRect(b.x - b.w / 2, this.box.y + 4, b.w, this.box.h - 8);
            drawSpr(ctx, 'spr_rainbowtarget', Math.floor(this.time / 4), b.x - 10, this.box.y + 12, 1.3, 1.3);
            ctx.restore();
          } else if (b.type === 'bolt') {
            ctx.save();
            ctx.fillStyle = hsvCss(b.hue, 95, 70);
            ctx.fillRect(b.x - b.w * 0.42, 0, b.w * 0.84, 400);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(b.x - b.w * 0.2, 0, b.w * 0.4, 400);
            ctx.restore();
          } else if (b.type === 'saberslash') {
            ctx.fillStyle = 'rgba(255,255,255,0.45)';
            ctx.fillRect(b.x, b.y, b.w, b.h);
          } else if (b.type === 'gunbolt') {
            drawSprExt(ctx, 'spr_asriel_gunbolt', 0, b.x, b.y, 1.5, 1.5, b.deg, hsvCss(b.hue, 90, 70), 1, true);
          } else if (b.type === 'hgdebris') {
            drawSprExt(ctx, 'spr_hg_debris_small', 0, b.x, b.y, b.sc, b.sc, this.time * 9, '#ffffff', 0.9, true);
          } else if (b.type === 'comet') {
            ctx.save();
            ctx.strokeStyle = hsvCss(b.hue, 95, 65);
            ctx.lineWidth = 6; ctx.lineCap = 'round';
            if (b.hist.length > 1) {
              ctx.beginPath(); ctx.moveTo(b.hist[0].x, b.hist[0].y);
              for (const p of b.hist) ctx.lineTo(p.x, p.y);
              ctx.lineTo(b.x, b.y); ctx.stroke();
            }
            ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
          } else if (b.type === 'ls_arrow') {
            drawSprExt(ctx, 'spr_spearsaver', 0, b.x, b.y, 0.45, 0.45, -b.dir * 90 + 180, '#40e8ff', 1, false);
          } else if (b.type === 'ls_zap') {
            ctx.fillStyle = b.destructible ? '#ffe840' : '#ff4040';
            ctx.fillRect(b.x - 8, b.y - 8, 16, 16);
          } else if (b.type === 'ls_bone') {
            ctx.fillStyle = '#ffffff'; ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.fillRect(b.x - 3, b.y, b.w + 6, 6);
          } else if (b.type === 'ls_fire') {
            drawSpr(ctx, 'spr_torielflame', Math.floor(this.time / 4), b.x - 10, b.y - 10, 1.2, 1.2);
          }
        }

        // Chaos Buster aim line + active Rainbow Beams
        if (this.gun && this.gun.salvo < this.gun.maxSalvo) {
          const gn = this.gun;
          if (gn.t % 25 > 1 && gn.t % 25 < 14) {
            ctx.save();
            ctx.strokeStyle = this.time % 3 === 0 ? '#ff3030' : (this.time % 3 === 1 ? '#ffa020' : '#ffff30');
            ctx.lineWidth = 2;
            const n = gn.lines || 3;
            const spread = gn.hard ? 0.24 : 0.28;
            for (let i = 0; i < n; i++) {
              const a = gn.angle + (i - (n - 1) / 2) * spread;
              ctx.beginPath(); ctx.moveTo(gn.bx, gn.by);
              ctx.lineTo(gn.bx + Math.cos(a) * 520, gn.by + Math.sin(a) * 520);
              ctx.stroke();
            }
            ctx.restore();
          }
        }
        for (const bm of this.beams) {
          ctx.save();
          ctx.strokeStyle = hsvCss(bm.hue, 95, 65);
          ctx.lineWidth = bm.w;
          ctx.beginPath(); ctx.moveTo(bm.x, bm.y);
          ctx.lineTo(bm.x + Math.cos(bm.angle) * 600, bm.y + Math.sin(bm.angle) * 600);
          ctx.stroke();
          ctx.strokeStyle = '#ffffff'; ctx.lineWidth = bm.w * 0.42;
          ctx.stroke();
          ctx.restore();
        }
      },

      drawFinalRainbowLaser(ctx) {
        const lb = this.lastBeam;
        const wob = Math.sin(this.time * 0.5) * 28;
        ctx.save();
        ctx.globalAlpha = 0.78;
        ctx.fillStyle = hsvCss(this.time * 14, 95, 62);
        ctx.beginPath();
        ctx.moveTo(320, 128);
        ctx.lineTo(320 - lb.bw - wob, 490);
        ctx.lineTo(320 + lb.bw + wob, 490);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = hsvCss(this.time * 14 + 60, 95, 72);
        ctx.beginPath();
        ctx.moveTo(320, 128);
        ctx.lineTo(320 - lb.bw * 0.55 + wob * 0.5, 490);
        ctx.lineTo(320 + lb.bw * 0.55 - wob * 0.5, 490);
        ctx.closePath();
        ctx.fill();

        drawSprExt(ctx, 'spr_beamcircle', 0, 320, 128, 7 + Math.sin(this.time * 0.5) * 2.5, 7 + Math.sin(this.time * 0.5) * 2.5, 0, '#ffffff', 0.85, true);
        ctx.restore();
      },
    };
  }

  window.UTAsrielEngine = { createAsrielBattle };
})();
