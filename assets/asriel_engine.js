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
        '* Opening Fire Magic (Dreemurr Flames)',
        '* Star Blazing / Galacta Blazing',
        '* Shocker Breaker I & II',
        '* Chaos Saber / Chaos Slicer',
        '* Chaos Buster / Chaos Blaster',
        '* Hyper Goner Vortex',
        '* Angel of Death: Rainbow Comets',
        '* Angel of Death: Chaos Bombs & Orbs',
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
        [], // Turn 0: Pre-true-battle Dreemurr Fire Magic (no BGM!)
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
        '* It\'s the end.',
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
      struggleSteps: [
        '* Can\'t move your body.\n* Nothing happened.',
        '* You tried to reach\n  your SAVE file.\n* Nothing happened.',
        '* You tried again to reach\n  your SAVE file.\n* Nothing happened.',
      ],
      saveAwake: [
        '* Seems SAVING the game\n  really is impossible.',
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
        '* 開場火焰魔法 (Dreemurr Fire Magic)',
        '* 群星熾燃 / 銀河爆裂 (Star / Galacta Blazing)',
        '* 雷霆震擊 I & II (Shocker Breaker)',
        '* 混沌雙劍 / 混沌斬擊 (Chaos Saber / Slicer)',
        '* 混沌殲滅砲 / 混沌巨砲 (Chaos Buster / Blaster)',
        '* 終極噬滅者漩渦 (Hyper Goner)',
        '* 死亡天使：彩虹追尾彗星 (Rainbow Comets)',
        '* 死亡天使：混沌爆彈＆光球 (Chaos Bombs)',
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
        '* 這就是終點了。',
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
      struggleSteps: [
        '* 身體動彈不得。\n* 什麼事也沒發生。',
        '* 你試著觸碰「存檔點 (SAVE)」……\n* 什麼事也沒發生。',
        '* 你再次試著觸碰「存檔點 (SAVE)」……\n* 什麼事也沒發生。',
      ],
      saveAwake: [
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

      // Intro & reveal state (obj_asrielappear + obj_FinalWriter)
      introStep: 0, introTick: 0, introChar: 0,
      introWriterChar: 0, introRevealTimer: 0,

      // Articulated visual state for Phase 1 / Phase 2 / Hyper Goner / Finale
      afterimages: [],
      handSparks: [],
      blastOrbs: [],
      ultTarget: null,
      p1Siner: 0,
      p1SpecialNormal: true, // Turn 0 starts specialnormal=1 (Dreemurr Fire, no rainbow trail until Drop!)
      p1BgAlpha: 0,
      p1RevealTimer: 0,
      transformStretch: 0,
      asX: 320, asY: 48, asRely: 0, asAlpha: 1, asExpr: 0, shrug: false,
      armRotL: 0, armRotR: 0, armAlpha: 1, torsoRot: 0, headRot: 0, headY: 0,
      p2ArmRot: 0, p2Shake: 0, p2Radi: 0, p2RadiAlpha: 0, p2Darker: 0, p2BlackoutMsg: false,
      finaleBtnFall: false, finaleBtnShake: 0,
      finaleBtnY: [430, 430, 430, 430], finaleBtnVy: [0, 0, 0, 0], finaleBtnAng: [0, 0, 0, 0],
      finaleShout: '',
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
          G.sfx.stopBGM(); // Canonical: NO BGM before Asriel transforms!
        } else {
          this.startPhase(entry);
        }
      },

      playHisTheme() {
        G.sfx.playBGM('histheme', false, 0.55);
        const a = G.sfx.bgmAudio;
        if (a) {
          a.onended = () => {
            if (G.sfx.bgmName === 'histheme') G.sfx.playBGM('histheme_loop', true, 0.55);
          };
        }
      },

      resetEntities() {
        this.bullets = []; this.beams = []; this.stars = []; this.bolts = [];
        this.playerShots = []; this.sabers = null; this.gun = null; this.goner = null;
        this.lastBeam = null; this.afterimages = []; this.handSparks = [];
        this.blastOrbs = []; this.ultTarget = null;
        this.soulColor = 'red'; this.soulVy = 0; this.shieldDir = 0;
        this.box = { x: 32, y: 250, w: 575, h: 140 };
        this.tBox = { x: 32, y: 250, w: 575, h: 140 };
        this.soulX = 320; this.soulY = 320;
        this.invuln = 0; this.shake = 0; this.whiteAlpha = 0;
        this.cur = 0; this.subCur = 0;
        this.asAlpha = 1; this.armAlpha = 1; this.armRotL = 0; this.armRotR = 0;
        this.torsoRot = 0; this.headRot = 0; this.headY = 0; this.asRely = 0;
        this.transformStretch = 0;
        this.p2ArmRot = 0; this.p2Shake = 0; this.p2Radi = 0; this.p2RadiAlpha = 0; this.p2BlackoutMsg = false;
        this.finaleShout = '';
        this.sub = 'main'; this.currentAtk = null;
        this.waveQueue = []; this.chainIdx = 0; this.chainTotal = 0; this.diffLvl = 0;
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
        this.p2Darker = 0; this.p2BlackoutMsg = false;
        this.finaleBtnFall = false; this.finaleBtnShake = 0;
        this.finaleBtnY = [430, 430, 430, 430];
        this.finaleBtnVy = [0, 0, 0, 0];
        this.finaleBtnAng = [0, 0, 0, 0];
        this.statusTxt = '';
        if (tag === 'intro') {
          this.mode = 'intro';
          this.introStep = 0; this.introTick = 0; this.introChar = 0;
          this.introWriterChar = 0; this.introRevealTimer = 0;
          G.sfx.stopBGM(); // Canonical: NO BGM during pre-transformation Kid Asriel dialogue!
        } else if (tag === 'p1') {
          this.mode = 'p1';
          this.sub = 'main';
          this.whiteAlpha = 1;
          this.p1SpecialNormal = true;
          this.p1BgAlpha = 0;
          this.p1RevealTimer = 0;
          this.p1Siner = 0;
          this.asX = 320; this.asY = 50;
          this.statusTxt = this.L().p1Status[0];
          G.sfx.stopBGM(); // Canonical: NO BGM on Turn 0 Fire Magic; Hopes and Dreams kicks in on Turn 1 reveal!
          G.sfx.preloadBGM?.('hopes'); // Silent fetch so 20.1s beat-drop seek on Turn 1 is instant
        } else if (tag === 'hypergoner') {
          this.mode = 'p1';
          this.p1Turn = 13;
          this.p1SpecialNormal = false;
          this.p1BgAlpha = 0.5;
          this.whiteAlpha = 0.8;
          G.sfx.playBGM('hopes', true, 0.56, 20.1);
          this.beginBubble(this.L().p1TurnSpeech[13], () => this.launchP1Wave(13));
        } else if (tag === 'p2') {
          this.mode = 'p2';
          this.sub = 'main';
          this.cur = 1; // Canonical obj_asrielfinal forces cursor to Struggle (bmenucoord=1)
          this.whiteAlpha = 1;
          G.sfx.playBGM('burn', true, 0.55);
          this.statusTxt = G.lang === 'zh' ? '* 整個世界正在崩塌終結。' : '* The whole world is ending.';
        } else if (tag === 'save') {
          this.mode = 'p2';
          this.sub = 'main';
          this.cur = 1;
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
          this.playHisTheme();
          this.beginBubble([this.L().finaleBubble[0]], () => this.launchFinaleWave(0));
        }
      },

      startSingleWave(idx) {
        this.singlePractice = true;
        this.singleWaveIdx = idx;
        this.resetEntities();
        this.hp = 20;
        const p2Like = idx === 6 || idx === 7;
        this.mode = idx === 8 ? 'finale' : (p2Like ? 'p2' : 'p1');
        this.p1SpecialNormal = (idx === 0);
        this.p1BgAlpha = (idx === 0) ? 0 : 0.5;
        if (idx === 0) G.sfx.stopBGM();
        else if (idx === 8) this.playHisTheme();
        else if (p2Like) G.sfx.playBGM('burn', true, 0.55);
        else if (idx === 9) G.sfx.playBGM('savetheworld', true, 0.55);
        else G.sfx.playBGM('hopes', true, 0.55, 20.1);
        this.launchSingleWave(idx);
      },

      launchSingleWave(idx) {
        this.resetEntities();
        if (idx === 0) {
          this.p1SpecialNormal = true;
          this.p1BgAlpha = 0;
          this.asX = 320; this.asY = 50;
          this.spawnAttack('fire_magic', {});
        } else if (idx === 1) {
          this.asX = 320; this.asY = 45;
          this.spawnAttack('star', { hard: true });
        } else if (idx === 2) {
          this.spawnAttack('shocker', { hard: true });
        } else if (idx === 3) {
          this.spawnAttack('saber', { hard: true });
        } else if (idx === 4) {
          this.spawnAttack('buster', { hard: true });
        } else if (idx === 5) {
          this.spawnAttack('hypergoner', {});
        } else if (idx === 6) {
          this.spawnAttack('p2_comets', {});
        } else if (idx === 7) {
          this.spawnAttack('p2_orb_beam', {});
        } else if (idx === 8) {
          this.asrielCry = 1;
          this.spawnAttack('lastbeam', {});
        } else if (idx === 9) {
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
          this.shake = 9; this.invuln = 26;
          if (this.hp > 1) this.hp = 1;
          else if (this.hp >= 0.95) this.hp = 0.9;
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
          this.triggerRefuse();
        }
      },

      triggerRefuse() {
        this.sub = 'refuse';
        this.refuseT = 0;
        this.refuseStage = 0;
        this.refusals++;
        this.bullets = []; this.beams = []; this.stars = []; this.bolts = [];
        this.blastOrbs = []; this.ultTarget = null;
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
        this.attackWeak = !!opts.weak;
        this.bullets = []; this.beams = []; this.stars = []; this.bolts = [];
        this.handSparks = []; this.blastOrbs = []; this.ultTarget = null;
        this.playerShots = []; this.sabers = null; this.gun = null; this.goner = null; this.lastBeam = null;
        this.asAlpha = 1; this.armAlpha = 1; this.armRotL = 0; this.armRotR = 0;
        this.torsoRot = 0; this.headRot = 0; this.headY = 0;
        const hard = !!opts.hard;

        if (kind === 'fire_magic') {
          // Canonical ut_ref specialnormal=1 Opening Dreemurr Fire Helix (BORDER[6]: 180x135)
          this.tBox = { x: 227, y: 250, w: 180, h: 135 };
          this.attackDur = 140;
        } else if (kind === 'star') {
          this.tBox = { x: 162, y: 250, w: 310, h: 135 };
          this.attackDur = hard ? 260 : 245;
          this.asX = 320; this.asY = 45; this.asRely = 0;
          this.asExpr = 2;
          G.sfx.sfx('spellcast', 0.7);
          this.stars = { hard, windup: 18, explodedBig: false };
        } else if (kind === 'shocker') {
          // Canonical BORDER[17]: 310px wide box so 80px-spaced full-screen sweeps only land ~4 bolts inside!
          this.tBox = { x: 162, y: 250, w: 310, h: 135 };
          const cycles = Math.max(1, opts.cycles || 1);
          const cycleLen = hard ? 175 : 155;
          this.attackDur = 18 + cycles * cycleLen + 20;
          this.asX = 320; this.asY = 45; this.asRely = 0;
          this.asExpr = 2;
          G.sfx.sfx('spellcast', 0.7);
          this.bolts = { hard, windup: 18, cycles, cycleLen, idx: 0, gigaPhase: 0, trackCnt: 0 };
        } else if (kind === 'saber') {
          // Canonical BORDER[4]: compact 100x90 arena directly below Asriel (IMG_9414-9416)
          this.tBox = { x: 267, y: 295, w: 100, h: 90 };
          const swings = opts.swings || (hard ? 6 : 5);
          const period = hard ? 21 : 27; // Exact GML 30fps swing interval (0.70s / 0.90s!)
          this.attackDur = 14 + swings * period + 86;
          this.asX = 320; this.asY = 88; this.asRely = 0;
          this.armAlpha = 0;
          G.sfx.sfx('swordappear', 0.7);
          this.sabers = {
            hard, t: 0, sOffset: 40, armed: false, swingTimer: 0,
            count: 0, maxSwings: swings, curSide: 0, prevSide: -1, prev2Side: -1,
            smearAlpha: 0, smearSide: 0, swordSpriteTimer: 0,
            twinkleMode: false, twinkleT: 0, twinklesSpawned: false,
            lungeX: 320,
          };
        } else if (kind === 'buster') {
          // Canonical BORDER[17]: 310px wide arena + exact GML 9-salvo schedule at 30fps!
          this.tBox = { x: 162, y: 250, w: 310, h: 135 };
          const salvos = opts.salvos || 9;
          const sched = hard
            ? [[20, 3, 6], [12, 'r', 6], [10, 'r', 5], [10, 4, 4], [9, 3, 4], [9, 'r', 4], [8, 4, 4], [8, 4, 4], [8, 3, 8]]
            : [[20, 3, 6], [14, 4, 6], [12, 3, 5], [12, 4, 5], [11, 3, 4], [11, 4, 4], [10, 3, 4], [10, 4, 4], [10, 3, 8]];
          let st = 10;
          const plan = [];
          for (let i = 0; i < salvos; i++) {
            const [tele, linesSpec, shots] = sched[Math.min(i, sched.length - 1)];
            const lines = linesSpec === 'r' ? (Math.random() < 0.5 ? 3 : 4) : linesSpec;
            plan.push({ lockAt: st, tele, fireAt: st + tele, lines, shots });
            st += tele + shots * 2 + (hard ? 6 : 8);
          }
          const seqStart = st + 4;
          this.attackDur = seqStart + 88;
          this.asX = 320; this.asY = 45; this.asRely = 0;
          this.armAlpha = 0;
          this.gun = {
            hard, t: 0, bx: 344, by: 84, thisx: 344, thisy: 84,
            relx: 24, rely: 39, angle: Math.PI / 2, recoil: 0,
            salvo: 0, maxSalvo: salvos, plan, seqStart, curSalvo: null, shotsLeft: 0, fireCd: 0,
            lines: 3, aimFlash: 0,
            meter: false, meterCnt: 0, spinning: false, spinSpd: 0, spinAng: 0,
            unhinge: false, unhingeFrame: 0, blasting: false, beamW: 0, beamTimer: 0,
          };
          G.sfx.sfx('segapower', 0.45);
        } else if (kind === 'hypergoner') {
          // Canonical obj_hg_wholescreen at 30fps
          this.tBox = { x: -24, y: -24, w: 688, h: 528 };
          this.soulX = 320; this.soulY = 335;
          this.attackDur = 285;
          this.shrug = true;
          this.goner = {
            t: 0, alpha: 0, hgAlpha: 0, stage: 0,
            faceY: 0, faceScale: 0, siner: 0, cCounter: 0, rad: 20,
            laughPlayed: false, chargePlayed: false,
          };
        } else if (kind === 'p2_comets') {
          this.tBox = { x: 162, y: 250, w: 310, h: 135 };
          this.attackDur = opts.weak ? 140 : 155;
          this.ultTarget = { x: 320, y: 318 };
        } else if (kind === 'p2_orb_beam') {
          this.tBox = { x: 162, y: 250, w: 310, h: 135 };
          this.attackDur = 155;
          this.ultTarget = { x: 320, y: 318 };
        } else if (kind === 'finale_fire') {
          // Canonical Finale Crying Weak Stray Fireballs (bullettype=9)
          this.tBox = { x: 227, y: 250, w: 180, h: 135 };
          this.attackDur = 125;
        } else if (kind === 'lastbeam') {
          this.tBox = { x: 267, y: 295, w: 100, h: 90 };
          this.attackDur = 360;
          this.p2ArmRot = 0; this.p2Shake = 0; this.p2Radi = 0; this.p2RadiAlpha = 1;
          this.lastBeam = { t: 0, bw: 0, maxBw: 220, windup: 42, hitTick: 0 };
        } else if (kind === 'ls_undyne') {
          this.soulColor = 'green';
          this.tBox = { x: 256, y: 250, w: 128, h: 128 };
          this.soulX = 320; this.soulY = 314;
          this.attackDur = 145;
        } else if (kind === 'ls_alphys') {
          this.soulColor = 'yellow';
          this.tBox = { x: 230, y: 248, w: 180, h: 140 };
          this.soulX = 320; this.soulY = 362;
          this.attackDur = 150;
        } else if (kind === 'ls_skelebros') {
          this.soulColor = 'blue';
          this.tBox = { x: 195, y: 252, w: 250, h: 134 };
          this.soulX = 320; this.soulY = 374; this.soulVy = 0;
          this.attackDur = 150;
        } else if (kind === 'ls_parents') {
          this.soulColor = 'red';
          this.tBox = { x: 227, y: 250, w: 180, h: 135 };
          this.soulX = 320; this.soulY = 318;
          this.attackDur = 145;
        }
        this.diffLvl = this.mode === 'p1' ? Math.floor(this.p1Turn / 4)
          : this.mode === 'p2' ? Math.min(3, this.p2Turn)
          : this.mode === 'lost_soul' ? (this.lsActDone || 0)
          : 0;
        const scalableDur = !['shocker', 'saber', 'buster', 'hypergoner', 'lastbeam'].includes(kind);
        if (scalableDur && opts.durMul && opts.durMul !== 1) {
          this.attackDur = Math.round(this.attackDur * opts.durMul);
        }
        if (kind !== 'hypergoner') {
          this.soulX = Math.max(this.tBox.x + 14, Math.min(this.tBox.x + this.tBox.w - 14, this.soulX));
          this.soulY = Math.max(this.tBox.y + 14, Math.min(this.tBox.y + this.tBox.h - 14, this.soulY));
        }
      },

      // ---------------------------------------------------------------------
      // CANONICAL TURN TIMELINE: 1 attack per turn, exact Undertale order.
      // ---------------------------------------------------------------------
      P1_TIMELINE: [
        /* 0  */ [['fire_magic', {}]],
        /* 1  */ [['shocker', { hard: false }]],
        /* 2  */ [['saber', { hard: false, swings: 5 }]],
        /* 3  */ [['shocker', { hard: false }]],
        /* 4  */ [['star', { hard: false }]],
        /* 5  */ [['buster', { hard: false, salvos: 9 }]],
        /* 6  */ [['saber', { hard: false, swings: 5 }]],
        /* 7  */ [['buster', { hard: false, salvos: 9 }]],
        /* 8  */ [['shocker', { hard: true }]],
        /* 9  */ [['star', { hard: true }]],
        /* 10 */ [['saber', { hard: true, swings: 6 }]],
        /* 11 */ [['buster', { hard: true, salvos: 9 }]],
        /* 12 */ [['shocker', { hard: true }]],
        /* 13 */ [['hypergoner', {}]],
      ],

      runChain(chain) {
        const list = chain.map(([kind, opts]) => ({ kind, opts: { ...(opts || {}) } }));
        const first = list.shift();
        this.waveQueue = list;
        this.chainTotal = list.length + 1;
        this.chainIdx = 1;
        this.spawnAttack(first.kind, first.opts);
      },

      launchP1Wave(t) {
        const L = this.L();
        this.statusTxt = L.p1Status[Math.min(t, L.p1Status.length - 1)] || L.p1Status[0];
        const tl = this.P1_TIMELINE;
        this.runChain(tl[Math.min(t, tl.length - 1)]);
      },

      launchP2Wave() {
        const n = this.p2Turn;
        const kind = n % 2 === 0 ? 'p2_comets' : 'p2_orb_beam';
        this.runChain([[kind, {}]]);
      },

      launchLostSoulWave() {
        this.runChain([['ls_' + this.activeLostSoul, {}]]);
      },

      launchFinaleWave(t) {
        if (t >= 6) {
          this.asrielCry = 2;
          this.runChain([['lastbeam', {}]]);
        } else if (t <= 1) {
          this.asrielCry = 1;
          this.runChain([['p2_comets', { weak: true }]]);
        } else {
          this.asrielCry = 2;
          this.runChain([['finale_fire', { weak: true }]]);
        }
      },

      finishWave() {
        if (!this.singlePractice && this.waveQueue && this.waveQueue.length) {
          const nx = this.waveQueue.shift();
          this.chainIdx = (this.chainIdx || 1) + 1;
          this.shrug = false;
          this.soulColor = 'red';
          this.whiteAlpha = Math.max(this.whiteAlpha, 0.35);
          this.spawnAttack(nx.kind, nx.opts);
          return;
        }
        this.waveQueue = [];
        this.hopeActive = false;
        this.asX = 320; this.asY = 48; this.asAlpha = 1; this.armAlpha = 1;
        this.armRotL = 0; this.armRotR = 0; this.torsoRot = 0; this.headRot = 0; this.headY = 0;
        this.p2ArmRot = 0; this.p2Shake = 0; this.p2Radi = 0; this.p2RadiAlpha = 0;
        this.finaleShout = '';
        this.shrug = false;
        this.tBox = { x: 32, y: 250, w: 575, h: 140 };
        this.soulColor = 'red';
        this.bullets = []; this.beams = []; this.blastOrbs = []; this.handSparks = []; this.ultTarget = null;
        this.sabers = null; this.gun = null; this.goner = null; this.lastBeam = null;

        if (this.singlePractice) {
          this.launchSingleWave(this.singleWaveIdx);
          return;
        }

        if (this.mode === 'p1') {
          if (this.currentAtk === 'hypergoner') {
            this.mode = 'transform';
            this.shrug = false;
            this.beginBubble(this.L().p1TransformSpeech.map(x => ({ ...x })), () => {
              G.sfx.stopBGM(); // Silence during Angel of Death transformation until burn.mp3 starts!
              this.transformStretch = 0.05;
              G.sfx.sfx('spellcast', 0.7, 0.35);
              G.sfx.sfx('spellcast', 0.65, 0.55);
              setTimeout(() => G.sfx.sfx('spellcast', 0.6, 0.75), 180);
            });
            return;
          }
          // Canonical Turn 0 -> Turn 1: Hopes and Dreams beat-drop bursts in alongside rainbow tunnel!
          if (this.p1Turn === 0 && this.p1SpecialNormal) {
            this.p1SpecialNormal = false;
            this.p1BgAlpha = 0.52;
            this.whiteAlpha = 1.1;
            G.sfx.sfx('create', 0.65);
            G.sfx.playBGM('hopes', true, 0.56, 20.1);
          }
          this.p1Turn++;
          this.sub = 'main';
          this.statusTxt = this.L().p1Status[Math.min(this.p1Turn, this.L().p1Status.length - 1)] || '';
          return;
        }

        if (this.mode === 'p2') {
          this.p2Turn++;
          this.sub = 'main';
          if (!this.saveUnlocked) this.cur = 1;
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
          const lsTarget = this.activeLostSoul === 'parents' ? 4 : 3;
          this.statusTxt = G.lang === 'zh'
            ? `* 繼續呼喚 ${this.L().lostSouls[this.activeLostSoul].name}！（${this.lsActDone}/${lsTarget}）`
            : `* Keep calling out to ${this.L().lostSouls[this.activeLostSoul].name}! (${this.lsActDone}/${lsTarget})`;
          return;
        }

        if (this.mode === 'finale') {
          if (this.finTurn >= 6) {
            // Post-beam tears + Memory panels (turns 7..11 in obj_asrielfinal)
            this.asrielCry = 2;
            this.asrielFade = 0.25;
            this.panelIdx = 0; this.panelAlpha = 0; this.panelTimer = 0;
            this.beginBubble(this.L().afterBeamSpeech.map((tx, idx) => {
              return { expr: 5, text: tx, fadeStep: idx };
            }), () => {
              this.whiteAlpha = 1.25;
              G.sfx.sfx('create', 0.65);
              G.sfx.playBGM('reunited', true, 0.5);
              this.mode = 'epilogue';
              this.epiIdx = 0; this.epiC = 0;
            });
            return;
          }
          this.finTurn++;
          this.sub = 'main';
          this.cur = 1;
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
          if (this.menuCursor === 10) { this.noHitMode = !this.noHitMode; return; }
          if (this.menuCursor === 11) { this.mode = 'title'; this.menuCursor = 0; return; }
          this.startSingleWave(this.menuCursor);
          return;
        }
        if (this.mode === 'intro') {
          if (this.introStep >= this.L().introLines.length) {
            this.startPhase('p1');
            G.sfx.sfx('create', 0.7);
            return;
          }
          const line = this.L().introLines[this.introStep];
          if (line && this.introChar < line.text.length) { this.introChar = line.text.length; return; }
          if (this.introStep < this.L().introLines.length - 1) {
            this.introStep++; this.introChar = 0; this.introTick = 0;
          } else {
            // Canonical obj_asrielappear con=8..13: White flash into spr_asriel_afterimager_full + ASRIEL DREEMURR typewriter!
            this.introStep = this.L().introLines.length;
            this.introWriterChar = 0;
            this.introRevealTimer = 0;
            this.whiteAlpha = 1.15;
            G.sfx.sfx('create', 0.8);
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
              if (this.mode === 'transform' && G.sfx.bgmAudio) {
                const vols = [0.55, 0.42, 0.28, 0.14, 0.0];
                G.sfx.bgmAudio.volume = vols[Math.min(this.bubIdx, vols.length - 1)];
              }
              if (this.bubbles[this.bubIdx].fadeStep !== undefined) {
                this.asrielFade = Math.min(0.95, 0.25 + this.bubbles[this.bubIdx].fadeStep * 0.2);
                this.panelIdx = (this.bubbles[this.bubIdx].fadeStep) % 5;
                this.panelAlpha = 0;
                this.panelTimer = 0;
              }
            } else {
              this.onBubDone?.();
            }
          }
          return;
        }
        if (this.sub === 'dodge' && this.soulColor === 'yellow') {
          G.sfx.sfx('abullet', 0.45);
          this.playerShots.push({ x: this.soulX, y: this.soulY - 12, vy: -14 });
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
            this.p2BlackoutMsg = true;
            this.tBox = { x: 132, y: 185, w: 376, h: 112 };
            this.box = { ...this.tBox };
            if (this.struggles >= 4) {
              this.saveUnlocked = true;
              this.beginMsg(this.L().saveAwake.join('\n'), () => {
                this.p2BlackoutMsg = false;
                this.p2Darker = 0;
                this.tBox = { x: 32, y: 250, w: 575, h: 140 };
                this.box = { ...this.tBox };
                this.whiteAlpha = 1.15;
                G.sfx.sfx('abreak2', 0.75);
                this.hp = this.maxHp;
                G.sfx.playBGM('savetheworld', true, 0.56);
                this.sub = 'main';
                this.cur = 1;
                this.statusTxt = G.lang === 'zh' ? '* 按 [ACT] (★ SAVE) 喚醒被困在艾斯利爾心中的夥伴！' : '* Select ★ SAVE to rescue your friends\' SOULs!';
              });
            } else {
              const steps = this.L().struggleSteps || [this.L().struggleFail];
              const msgTxt = steps[Math.min(this.struggles - 1, steps.length - 1)];
              this.beginMsg(msgTxt, () => {
                this.p2BlackoutMsg = false;
                this.tBox = { x: 32, y: 250, w: 575, h: 140 };
                this.box = { ...this.tBox };
                const sp = this.L().p2Speech[Math.min(this.struggles - 1, this.L().p2Speech.length - 1)];
                this.beginBubble([sp], () => this.launchP2Wave());
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
          this.barX = 48; this.barV = 15.0;
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
              this.playHisTheme();
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
          const lsTarget = this.activeLostSoul === 'parents' ? 4 : 3;
          this.lsActDone++;
          if (this.lsActDone >= lsTarget) {
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
            this.beginMsg(resTxt, () => this.launchLostSoulWave());
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
          this.launchP2Wave();
        } else {
          this.sub = 'main';
        }
      },

      onCancel() {
        if (this.mode === 'intro') { this.startPhase('p1'); return; }
        if (this.mode === 'phase_menu' || this.mode === 'single_menu') { this.mode = 'title'; this.menuCursor = 0; G.sfx.sfx('select', 0.45); return; }
        if (this.singlePractice && (this.sub === 'dodge' || this.sub === 'refuse')) {
          this.resetEntities(); this.mode = 'single_menu'; this.sub = 'main'; this.currentAtk = null; this.menuCursor = Math.max(0, this.singleWaveIdx); G.sfx.sfx('select', 0.4); return;
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
          const n = 12;
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
            this.soulVy = -7.0;
          }
          return;
        }
        if (this.sub === 'main') {
          if ((this.mode === 'p2' && !this.saveUnlocked) || this.mode === 'finale') {
            this.cur = 1;
            return;
          }
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
          const startY = this.mode === 'title' ? 210 : (this.mode === 'phase_menu' ? 118 : 96);
          const rowH = this.mode === 'title' ? 40 : (this.mode === 'phase_menu' ? 44 : 27);
          const n = this.mode === 'title' ? 5 : (this.mode === 'phase_menu' ? 7 : 12);
          const idx = Math.floor((cy - startY) / rowH);
          if (idx >= 0 && idx < n) { this.menuCursor = idx; this.onConfirm(); }
          return;
        }
        if (this.sub === 'main' && cy >= 420) {
          if ((this.mode === 'p2' && !this.saveUnlocked) || this.mode === 'finale') {
            this.cur = 1; this.onConfirm(); return;
          }
          const btX = [32, 185, 338, 491];
          for (let i = 0; i < 4; i++) {
            if (cx >= btX[i] && cx <= btX[i] + 114) { this.cur = i; this.onConfirm(); return; }
          }
        }
        this.onConfirm();
      },

      exitToOverworld() {
        if (this.standalone) { window.location.href = 'overworld.html'; }
        else { G.onExitAsriel?.(); }
      },

      // =====================================================================
      // 30FPS CANONICAL LOGIC LOOP + HIGH-FPS SMOOTH INTERPOLATION
      // =====================================================================
      _snapCapture() {
        const bMap = new Map();
        for (const b of this.bullets) {
          bMap.set(b, { x: b.x, y: b.y, rot: b.rot || 0, deg: b.deg || 0, sc: b.sc || 1, scX: b.scX || 1 });
        }
        const sMap = new Map();
        for (const s of this.playerShots) sMap.set(s, { y: s.y });
        return {
          soulX: this.soulX, soulY: this.soulY,
          asX: this.asX, asY: this.asY, asRely: this.asRely,
          armRotL: this.armRotL, armRotR: this.armRotR, torsoRot: this.torsoRot,
          headRot: this.headRot, headY: this.headY, p2ArmRot: this.p2ArmRot,
          box: { ...this.box }, barX: this.barX, sliceF: this.sliceF,
          gun: this.gun ? { bx: this.gun.bx, by: this.gun.by, angle: this.gun.angle, beamW: this.gun.beamW } : null,
          bullets: bMap, playerShots: sMap,
        };
      },

      _applyInterp(interpAlpha) {
        const p = this._prevSnap;
        const a = Math.max(0, Math.min(1, interpAlpha !== undefined ? interpAlpha : (this._interpAlpha !== undefined ? this._interpAlpha : 1)));
        if (!p || a >= 0.999) return null;
        const saved = {
          soulX: this.soulX, soulY: this.soulY,
          asX: this.asX, asY: this.asY, asRely: this.asRely,
          armRotL: this.armRotL, armRotR: this.armRotR, torsoRot: this.torsoRot,
          headRot: this.headRot, headY: this.headY, p2ArmRot: this.p2ArmRot,
          box: { ...this.box }, barX: this.barX, sliceF: this.sliceF,
          gun: this.gun ? { bx: this.gun.bx, by: this.gun.by, angle: this.gun.angle, beamW: this.gun.beamW } : null,
          bullets: [],
          playerShots: [],
        };
        const lj = (prev, cur, maxJ = 80) => Math.abs(cur - prev) > maxJ ? cur : prev + (cur - prev) * a;
        this.soulX = lj(p.soulX, this.soulX, 60);
        this.soulY = lj(p.soulY, this.soulY, 60);
        this.asX = lj(p.asX, this.asX, 80);
        this.asY = lj(p.asY, this.asY, 80);
        this.asRely = lj(p.asRely, this.asRely, 40);
        this.armRotL = lj(p.armRotL, this.armRotL, 90);
        this.armRotR = lj(p.armRotR, this.armRotR, 90);
        this.torsoRot = lj(p.torsoRot, this.torsoRot, 45);
        this.headRot = lj(p.headRot, this.headRot, 45);
        this.headY = lj(p.headY, this.headY, 30);
        this.p2ArmRot = lj(p.p2ArmRot, this.p2ArmRot, 90);
        this.box.x = lj(p.box.x, this.box.x, 120);
        this.box.y = lj(p.box.y, this.box.y, 120);
        this.box.w = lj(p.box.w, this.box.w, 160);
        this.box.h = lj(p.box.h, this.box.h, 160);
        this.barX = lj(p.barX, this.barX, 80);
        this.sliceF = lj(p.sliceF, this.sliceF, 4);
        if (this.gun && p.gun) {
          this.gun.bx = lj(p.gun.bx, this.gun.bx, 120);
          this.gun.by = lj(p.gun.by, this.gun.by, 120);
          this.gun.beamW = lj(p.gun.beamW, this.gun.beamW, 80);
          const da = ((this.gun.angle - p.gun.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
          if (Math.abs(da) < 1.8) this.gun.angle = p.gun.angle + da * a;
        }
        for (const b of this.bullets) {
          const pb = p.bullets.get(b);
          if (!pb || Math.hypot(b.x - pb.x, b.y - pb.y) > 80) continue;
          saved.bullets.push([b, b.x, b.y, b.rot, b.deg, b.sc, b.scX]);
          b.x = pb.x + (b.x - pb.x) * a;
          b.y = pb.y + (b.y - pb.y) * a;
          if (b.rot !== undefined && Math.abs(b.rot - pb.rot) < 90) b.rot = pb.rot + (b.rot - pb.rot) * a;
          if (b.deg !== undefined && Math.abs(b.deg - pb.deg) < 90) b.deg = pb.deg + (b.deg - pb.deg) * a;
          if (b.sc !== undefined) b.sc = pb.sc + (b.sc - pb.sc) * a;
          if (b.scX !== undefined) b.scX = pb.scX + (b.scX - pb.scX) * a;
        }
        for (const s of this.playerShots) {
          const ps = p.playerShots.get(s);
          if (!ps || Math.abs(s.y - ps.y) > 40) continue;
          saved.playerShots.push([s, s.y]);
          s.y = ps.y + (s.y - ps.y) * a;
        }
        return saved;
      },

      _restoreInterp(saved) {
        if (!saved) return;
        this.soulX = saved.soulX; this.soulY = saved.soulY;
        this.asX = saved.asX; this.asY = saved.asY; this.asRely = saved.asRely;
        this.armRotL = saved.armRotL; this.armRotR = saved.armRotR; this.torsoRot = saved.torsoRot;
        this.headRot = saved.headRot; this.headY = saved.headY; this.p2ArmRot = saved.p2ArmRot;
        this.box = saved.box; this.barX = saved.barX; this.sliceF = saved.sliceF;
        if (this.gun && saved.gun) {
          this.gun.bx = saved.gun.bx; this.gun.by = saved.gun.by;
          this.gun.angle = saved.gun.angle; this.gun.beamW = saved.gun.beamW;
        }
        for (const [b, x, y, rot, deg, sc, scX] of saved.bullets) {
          b.x = x; b.y = y; b.rot = rot; b.deg = deg; b.sc = sc; b.scX = scX;
        }
        for (const [s, y] of saved.playerShots) s.y = y;
      },

      update(keys) {
        // 60Hz compatibility wrapper (used by Playwright harness & 60fps hosts): advances 1 canonical 30fps step every 2 ticks
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
        this.bgScroll = (this.bgScroll + 4) % 800;
        this.wingRot += 0.16;
        if (this.whiteAlpha > 0) this.whiteAlpha = Math.max(0, this.whiteAlpha - 0.06);
        if (this.shake > 0) this.shake = Math.max(0, this.shake * 0.72 - 0.2);
        if (this.invuln > 0) this.invuln--;
        if (this.onHitFlash > 0) this.onHitFlash--;
        if (this.mode === 'title' || this.mode === 'phase_menu' || this.mode === 'single_menu' || this.mode === 'victory') return;

        if (this.p2Darker > 0 && this.p2Darker < 0.88) {
          this.p2Darker = Math.min(0.88, this.p2Darker + 0.08);
        }

        // Phase 1 Transformation stretch animation (obj_asriel_body transform=1)
        if (this.mode === 'transform' && this.transformStretch > 0) {
          this.transformStretch += 0.48;
          this.shake = Math.min(11, this.transformStretch * 1.1);
          if (this.transformStretch >= 13) {
            this.transformStretch = 0;
            this.whiteAlpha = 1.45;
            G.sfx.playBGM('burn', true, 0.55);
            this.mode = 'p2';
            this.sub = 'main';
            this.cur = 1;
            this.statusTxt = G.lang === 'zh' ? '* 整個世界正在崩塌終結。' : '* The whole world is ending.';
          }
          return;
        }

        // Finale memory panel slow fade (obj_asrielpanels)
        if (this.mode === 'finale' && this.finTurn >= 6 && this.sub === 'bubble') {
          this.panelTimer++;
          if (this.panelTimer < 22) this.panelAlpha = Math.min(0.85, this.panelAlpha + 0.06);
        }

        // Phase 1 Wide Float & Rainbow Afterimage Trail (obj_asriel_body + obj_afterimage_asriel @ 30fps)
        if (this.mode === 'p1') {
          if (this.p1SpecialNormal) {
            this.asX = 320;
            this.asY = 50 + Math.sin(this.time / 8) * 4;
            this.asRely = 0;
          } else if (this.sub !== 'dodge' && this.sub !== 'refuse' && !this.goner) {
            this.p1Siner += 1;
            this.asX = 320 + Math.sin(this.p1Siner / 24) * 124;
            this.asRely = Math.sin(this.p1Siner / 12) * 10;
            this.asY = 48 + Math.sin(this.p1Siner / 6) * 2.2;
            this.torsoRot *= 0.65; this.headRot *= 0.65;
            this.armRotL *= 0.65; this.armRotR *= 0.65;
            this.afterimages.push({
              x: this.asX,
              y: this.asY + this.asRely,
              hue: 340,
              alpha: 0.5,
            });
          }
        }
        for (const a of this.afterimages) { a.hue = (a.hue + 14) % 360; a.alpha -= 0.025; }
        this.afterimages = this.afterimages.filter(a => a.alpha > 0.04);

        // Update obj_handlightning sparkles @ 30fps
        for (const h of this.handSparks) {
          h.x += h.vx; h.y += h.vy; h.vx *= 0.84; h.vy *= 0.84;
          h.sc += 0.14; h.rot += 16; h.t++; h.hue = (h.hue + 14) % 360;
          h.alpha = h.t <= 3 ? Math.min(1, h.alpha + 0.45) : h.alpha - 0.35;
        }
        this.handSparks = this.handSparks.filter(h => h.alpha > 0.02);

        // Update falling Finale buttons (FIGHT, ITEM, MERCY)
        if (this.finaleBtnFall) {
          for (const bi of [0, 2, 3]) {
            this.finaleBtnVy[bi] += 0.9;
            this.finaleBtnY[bi] += this.finaleBtnVy[bi];
            this.finaleBtnAng[bi] += (bi === 0 ? -9 : (bi === 2 ? 7 : 10));
          }
        }

        if (this.mode === 'intro') {
          this.introTick++;
          if (this.introStep >= this.L().introLines.length) {
            this.introRevealTimer++;
            const fullTitle = ' ASRIEL   DREEMURR ';
            if (this.introWriterChar < fullTitle.length && this.time % 3 === 0) {
              this.introWriterChar++;
              const ch = fullTitle[this.introWriterChar - 1];
              if (ch && ch !== ' ') G.sfx.voice('asriel', 0);
            }
            return;
          }
          const line = this.L().introLines[this.introStep];
          if (line && this.introChar < line.text.length) {
            this.introChar++;
            const ch = line.text[this.introChar - 1];
            if (ch && ch !== ' ' && ch !== '\n') G.sfx.voice('asriel', 0);
          }
          return;
        }
        if (this.mode === 'epilogue') {
          const line = this.L().epilogueLines[this.epiIdx];
          if (line && this.epiC < line.text.length) {
            this.epiC++;
            const ch = line.text[this.epiC - 1];
            if (ch && ch !== ' ' && ch !== '\n' && ch !== '*') G.sfx.voice('asriel', 0);
          }
          return;
        }

        // Smooth box tween
        this.box.x += (this.tBox.x - this.box.x) * 0.42;
        this.box.y += (this.tBox.y - this.box.y) * 0.42;
        this.box.w += (this.tBox.w - this.box.w) * 0.42;
        this.box.h += (this.tBox.h - this.box.h) * 0.42;

        if (this.sub === 'msg') {
          const plen = stripCodes(this.msg).length;
          if (this.mc < plen) {
            this.mc = Math.min(plen, this.mc + 1.5);
            const ch = stripCodes(this.msg)[Math.floor(this.mc) - 1];
            if (ch && ch !== ' ' && ch !== '\n' && ch !== '*') G.sfx.voice('narrator', 0);
          }
          return;
        }
        if (this.sub === 'bubble') {
          const b = this.bubbles[this.bubIdx];
          if (b && this.bubC < stripCodes(b.text).length) {
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
          this.sliceF += 0.44;
          if (this.sliceF >= 7.5) {
            this.beginMsg(this.L().p1Act.missTxt, () => this.finishPlayerAction());
          }
          return;
        }
        if (this.sub === 'refuse') {
          this.refuseT++;
          if (this.refuseT === 35) { G.sfx.sfx('break1', 0.75); this.refuseStage = 1; }
          if (this.refuseT === 75) {
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

        // 1. SOUL Movement: exact 30 FPS Undertale / c2-sans-fight speed (4 px/frame = 120 px/s, focus 2 px/frame = 60 px/s)
        if (this.soulColor === 'green') {
          if (keys.up) this.shieldDir = 0;
          else if (keys.right) this.shieldDir = 1;
          else if (keys.down) this.shieldDir = 2;
          else if (keys.left) this.shieldDir = 3;
        } else if (this.soulColor === 'blue') {
          const spd = keys.cancel ? 2.0 : (this.seaTeaBoost ? 5.0 : 4.0);
          if (keys.left) this.soulX -= spd;
          if (keys.right) this.soulX += spd;
          if (keys.up && this.soulY >= bb - 7 && this.soulVy >= 0) this.soulVy = -9.5;
          if (!keys.up && this.soulVy < -2.2) this.soulVy *= 0.55;
          this.soulVy = Math.min(11.0, this.soulVy + 0.55);
          this.soulY += this.soulVy;
          if (this.soulY > bb - 6) { this.soulY = bb - 6; this.soulVy = 0; }
          if (this.soulY < by + 6) { this.soulY = by + 6; this.soulVy = 0; }
        } else {
          const spd = keys.cancel ? 2.0 : (this.seaTeaBoost ? 5.0 : 4.0);
          let dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
          let dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
          if (dx && dy) { dx *= 0.72; dy *= 0.72; }
          this.soulX += dx * spd;
          this.soulY += dy * spd;
          // Hyper Goner vortex suction pull toward (320, 235)
          if (this.goner && this.goner.stage >= 2 && this.goner.cCounter < 185) {
            const pullAng = Math.atan2(235 - this.soulY, 320 - this.soulX);
            const pullSpd = this.goner.cCounter < 95 ? 1.85 : 2.85;
            this.soulX += Math.cos(pullAng) * pullSpd;
            this.soulY += Math.sin(pullAng) * pullSpd;
          }
        }
        if (this.goner) {
          this.soulX = Math.max(16, Math.min(624, this.soulX));
          this.soulY = Math.max(16, Math.min(400, this.soulY));
        } else {
          this.soulX = Math.max(bx + 6, Math.min(br - 6, this.soulX));
          this.soulY = Math.max(by + 6, Math.min(bb - 6, this.soulY));
        }

        // Update obj_ultimatarget smooth SOUL tracking + shoulder blast orbs @ 30fps
        if (this.ultTarget) {
          const td = Math.hypot(this.soulX - this.ultTarget.x, this.soulY - this.ultTarget.y);
          if (td > 2.5) {
            this.ultTarget.x += ((this.soulX - this.ultTarget.x) / td) * 2.8;
            this.ultTarget.y += ((this.soulY - this.ultTarget.y) / td) * 2.8;
          }
        }
        for (const o of this.blastOrbs) { o.sc += 0.75; o.alpha -= 0.11; }
        this.blastOrbs = this.blastOrbs.filter(o => o.alpha > 0);

        for (const s of this.playerShots) s.y += s.vy;
        this.playerShots = this.playerShots.filter(s => s.y > this.box.y - 10);

        const spawnHandSparks = (isLightning) => {
          const radL = (this.armRotL - 90 - 15) * Math.PI / 180;
          const radR = (this.armRotR - 90 + 15) * Math.PI / 180;
          const spots = [
            { x: this.asX - 28 + Math.cos(radL) * 86, y: this.asY + 38 - Math.sin(radL) * 86 },
            { x: this.asX + 30 + Math.cos(radR) * 86, y: this.asY + 38 - Math.sin(radR) * 86 },
          ];
          for (const sp of spots) {
            const ang = Math.random() * Math.PI * 2;
            const spd = 2.6 + Math.random() * 1.4;
            this.handSparks.push({
              x: sp.x, y: sp.y, vx: Math.cos(ang) * spd, vy: -Math.sin(ang) * spd,
              kind: isLightning ? 'bolt' : 'star',
              deg: ang * 180 / Math.PI, sc: isLightning ? 0.35 : 0.25,
              rot: Math.random() * 360, hue: Math.random() * 360, t: 0, alpha: 0.3,
            });
          }
        };

        const kind = this.currentAtk;
        const t = this.attackTimer;

        // Pattern 0: Canonical Opening Dreemurr Double-Helix Fire Magic @ 30fps (obj_1sidegen type 7)
        if (kind === 'fire_magic') {
          if (t < this.attackDur - 18 && t % 6 === 1) {
            if (t % 12 === 1) G.sfx.sfx('chug', 0.26, 1.05);
            const rDir = Math.floor(t / 6) % 2;
            this.bullets.push({
              type: 'dreemurr_fire',
              cx: this.box.x + this.box.w / 2,
              x: this.box.x + this.box.w / 2,
              y: this.box.y - 12,
              vy: 0.7, gy: 0.12, hSign: rDir === 0 ? 1 : -1,
              age: t, floor: false, r: 7,
            });
          }
        }

        // Pattern A: Star Blazing / Galacta Blazing @ 30fps (exact single final Big Star!)
        else if (kind === 'star') {
          const S = this.stars;
          if (t <= S.windup) {
            this.armRotL = -Math.min(130, t * 9.5);
            this.armRotR = Math.min(130, t * 9.5);
            if (t > 2) spawnHandSparks(false);
          } else {
            if (t < this.attackDur - 18) this.asAlpha = Math.max(0, this.asAlpha - 0.1);
            else { this.asExpr = 0; this.asAlpha = Math.min(1, this.asAlpha + 0.1); this.armRotL *= 0.72; this.armRotR *= 0.72; }
          }
          if (t >= S.windup && t < this.attackDur - 75 && t % (S.hard ? 7 : 9) === 0) {
            if (t % 18 === 0) G.sfx.sfx('star', 0.45, 0.9 + Math.random() * 0.25);
            const sx = S.hard && Math.random() < 0.25 ? (-40 - Math.random() * 90) : (480 + Math.random() * 420);
            const isLeft = sx < 0;
            const ang = (isLeft ? 325 : 215) * Math.PI / 180;
            const spd = S.hard ? (11.5 + Math.random() * 3.5) : (9.5 + Math.random() * 3.2);
            this.bullets.push({
              type: 'stormstar',
              x: sx, y: -95 - Math.random() * 65,
              vx: Math.cos(ang) * spd, vy: -Math.sin(ang) * spd,
              hue: (t * 24) % 360,
              splitY: this.box.y + 20 + Math.random() * (this.box.h - 46),
              big: false, hard: S.hard, prevs: [], oo: 0, rot: 0, r: 10,
            });
          }
          if (t === Math.max(S.windup + 10, this.attackDur - 82) && !S.explodedBig) {
            S.explodedBig = true;
            G.sfx.sfx('star', 0.7, 0.42);
            const ang = 215 * Math.PI / 180;
            this.bullets.push({
              type: 'stormstar', x: 700, y: -45,
              vx: Math.cos(ang) * 8.2, vy: -Math.sin(ang) * 8.2,
              hue: 48, splitY: 224, big: true, hard: S.hard, prevs: [], oo: 0, rot: 0, r: 22,
            });
          }
        }

        // Pattern B: Shocker Breaker I & II @ 30fps (obj_rainbowbolt_realgen — 80px wide screen-span sweeps!)
        else if (kind === 'shocker') {
          const B = this.bolts;
          if (t <= B.windup) {
            this.armRotL = -Math.min(130, t * 9.5);
            this.armRotR = Math.min(130, t * 9.5);
            if (t > 2) spawnHandSparks(true);
          } else {
            if (t < this.attackDur - 18) this.asAlpha = Math.max(0, this.asAlpha - 0.1);
            else { this.asExpr = 0; this.asAlpha = Math.min(1, this.asAlpha + 0.1); this.armRotL *= 0.72; this.armRotR *= 0.72; }
          }
          if (t >= B.windup) {
            const rawT = t - B.windup;
            const cLen = B.cycleLen || (B.hard ? 175 : 155);
            const cyc = Math.floor(rawT / cLen);
            const localT = rawT % cLen;
            if (cyc < (B.cycles || 1)) {
              if (!B.hard) {
                // H_MODE=0: 4 screen-wide 80px-spaced sweeps (-60..500, so only ~4 non-overlapping bolts hit the 310px box) then 3 Giga waves!
                const sweepWindows = [
                  { s: 2, e: 10, dir: 1 }, { s: 22, e: 30, dir: -1 },
                  { s: 42, e: 50, dir: 1 }, { s: 62, e: 70, dir: -1 },
                ];
                for (const sw of sweepWindows) {
                  if (localT >= sw.s && localT < sw.e) {
                    const step = localT - sw.s;
                    const idx = sw.dir === 1 ? step : (7 - step);
                    const tx = -60 + idx * 80;
                    G.sfx.sfx('target', 0.28);
                    this.bullets.push({ type: 'warnbolt', x: tx, y: 356, timer: 20, w: 28, giga: false });
                  }
                }
                if (localT === 90 || localT === 126) {
                  G.sfx.sfx('target', 0.5);
                  for (const gx of [200, 320, 440]) {
                    this.bullets.push({ type: 'warnbolt', x: gx, y: 356, timer: 20, w: 64, giga: true });
                  }
                } else if (localT === 108) {
                  G.sfx.sfx('target', 0.5);
                  for (const gx of [260, 380]) {
                    this.bullets.push({ type: 'warnbolt', x: gx, y: 356, timer: 20, w: 64, giga: true });
                  }
                }
              } else {
                // H_MODE=1 (Shocker Breaker II): 3 80px-spaced sweeps, staggered aimed bolts, then 5 rolling Giga bolts!
                const sweepWindows = [
                  { s: 2, e: 10, dir: 1 }, { s: 18, e: 26, dir: -1 }, { s: 34, e: 42, dir: 1 },
                ];
                for (const sw of sweepWindows) {
                  if (localT >= sw.s && localT < sw.e) {
                    const step = localT - sw.s;
                    const idx = sw.dir === 1 ? step : (7 - step);
                    const tx = -60 + idx * 80;
                    G.sfx.sfx('target', 0.28);
                    this.bullets.push({ type: 'warnbolt', x: tx, y: 356, timer: 20, w: 28, giga: false });
                  }
                }
                if (localT >= 52 && localT <= 70 && (localT - 52) % 3 === 0) {
                  G.sfx.sfx('target', 0.34);
                  this.bullets.push({ type: 'warnbolt', x: this.soulX, y: 356, timer: 20, w: 28, giga: false });
                }
                const gigaTimes = [82, 97, 112, 127, 142];
                const gIdx = gigaTimes.indexOf(localT);
                if (gIdx !== -1) {
                  G.sfx.sfx('target', 0.55);
                  this.bullets.push({ type: 'warnbolt', x: 200 + gIdx * 60, y: 356, timer: 20, w: 64, giga: true });
                }
              }
            }
          }
        }

        // Pattern C: Chaos Saber / Chaos Slicer @ 30fps (obj_asriel_swordmaster: 27/21 frame swings!)
        else if (kind === 'saber') {
          const S = this.sabers;
          if (!S) return;
          S.t++;
          S.smearAlpha = Math.max(0, S.smearAlpha - 0.18);
          S.swordSpriteTimer = Math.max(0, S.swordSpriteTimer - 1);
          this.torsoRot *= 0.65; this.headRot *= 0.72;
          if (!S.armed) {
            S.sOffset = Math.max(0, S.sOffset - 4);
            if (S.sOffset <= 0) {
              if (!S.grabDone) { S.grabDone = true; S.armDelay = 4; this.armAlpha = 1; G.sfx.sfx('grab', 0.6); }
              else if (--S.armDelay <= 0) { S.armed = true; }
            }
            return;
          }
          const period = S.hard ? 21 : 27;
          if (!S.twinkleMode) {
            S.swingTimer++;
            if (S.count < S.maxSwings) {
              const local = S.swingTimer % period;
              if (local === 1) {
                let pick = S.count === 0 ? 1 : (Math.random() < 0.5 ? 0 : 1); // Canonical: first slash ALWAYS from the right!
                if (pick === S.prevSide && pick === S.prev2Side) pick = 1 - pick;
                S.prev2Side = S.prevSide; S.prevSide = pick; S.curSide = pick;
                G.sfx.sfx('pullback', 0.6);
              }
              if (local >= 2 && local < period - 6) {
                const dirSign = S.curSide === 0 ? -1 : 1;
                const tgtX = 320 + dirSign * 22;
                this.asX += (tgtX - this.asX) * 0.4;
                this.torsoRot = dirSign * -10;
                this.headRot = dirSign * 14;
                if (S.curSide === 0) this.armRotL = 28; else this.armRotR = -28;
              }
              if (local === period - 6) {
                this.shake = 6;
                G.sfx.sfx('cinematiccut', 0.72);
                S.smearAlpha = 1;
                S.smearSide = S.curSide;
                S.swordSpriteTimer = 5;
                this.headRot = (S.curSide === 0 ? -16 : 16);
                this.armRotL = 0; this.armRotR = 0;
                const hx = S.curSide === 0 ? this.box.x : 318;
                this.bullets.push({
                  type: 'saberslash', side: S.curSide, x: hx, y: this.box.y,
                  w: this.box.w / 2 + 4, h: this.box.h, life: 4,
                });
                S.count++;
              }
            } else {
              S.twinkleMode = true;
              S.twinkleT = 0;
              G.sfx.sfx('segapower2', 0.7);
            }
          } else {
            S.twinkleT++;
            this.asX += (320 - this.asX) * 0.32;
            if (S.twinkleT < 18) {
              this.armRotL = Math.max(-28, this.armRotL - 3);
              this.armRotR = Math.min(28, this.armRotR + 3);
              this.headY = -Math.min(10, S.twinkleT * 0.7);
            } else if (S.twinkleT === 18) {
              S.twinklesSpawned = true;
              // Canonical m.b.setBorder(6): expand arena on shattering double slash!
              this.tBox = { x: 227, y: 250, w: 180, h: 135 };
              this.armRotL = 0; this.armRotR = 0;
              S.swordSpriteTimer = 6;
              S.smearAlpha = 1; S.smearSide = 2;
              this.shake = 9;
              G.sfx.sfx('cinematiccut', 0.75);
              G.sfx.sfx('sparkles', 0.7);
              for (let i = 0; i < 4; i++) {
                const sy = 256 + i * 32;
                for (const sgn of [-1, 1]) {
                  this.bullets.push({
                    type: 'swordtwinkle',
                    x: 320 + sgn * 34, y: sy,
                    vx: sgn * (0.5 + Math.random() * 0.5), vy: (Math.random() - 0.5) * 2.0,
                    ax: sgn * (0.06 + Math.random() * 0.08),
                    rot: Math.random() * 360, alpha: 1, life: 52, r: 4,
                  });
                }
              }
            } else if (S.twinkleT > 26) {
              this.asY = Math.max(48, this.asY - 2.5);
              this.headY *= 0.65;
            }
          }
        }

        // Pattern D: Chaos Buster / Chaos Blaster @ 30fps (obj_gunarm_firepattern exact schedule)
        else if (kind === 'buster') {
          const gn = this.gun;
          if (!gn) return;
          gn.t++;
          gn.bx += (gn.thisx - gn.bx) * 0.45;
          gn.by += (gn.thisy - gn.by) * 0.45;
          const muzzleDist = 112;
          if (gn.salvo < gn.maxSalvo) {
            const nextP = gn.plan[gn.salvo];
            if (nextP && gn.t === nextP.lockAt) {
              gn.angle = Math.atan2(this.soulY - gn.by, this.soulX - gn.bx);
              gn.lines = nextP.lines;
              gn.aimFlash = nextP.tele;
              gn.curSalvo = nextP;
              G.sfx.sfx('target', 0.45);
            }
            if (gn.aimFlash > 0) gn.aimFlash--;
            if (gn.curSalvo && gn.t === gn.curSalvo.fireAt) {
              gn.shotsLeft = gn.curSalvo.shots;
              gn.fireCd = 0;
            }
            if (gn.shotsLeft > 0) {
              if (gn.fireCd <= 0) {
                G.sfx.sfx('abullet', 0.65);
                gn.bx -= Math.cos(gn.angle) * 7;
                gn.by -= Math.sin(gn.angle) * 7;
                gn.recoil = 6;
                const n = gn.curSalvo.lines;
                const spread = gn.hard ? 0.28 : 0.34; // Fan so 3-line aims center (move!), 4-line splits center (stand still!)
                const mx = gn.bx + Math.cos(gn.angle) * muzzleDist;
                const my = gn.by + Math.sin(gn.angle) * muzzleDist;
                const spd = gn.hard ? 11.5 : 10.5;
                for (let i = 0; i < n; i++) {
                  const a = gn.angle + (i - (n - 1) / 2) * spread;
                  this.bullets.push({
                    type: 'gunbolt', x: mx, y: my,
                    vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
                    deg: -a * 180 / Math.PI, spin: (i % 2 === 0 ? 12 : -12), hue: (i * 55 + gn.t * 14) % 360, r: 4,
                  });
                }
                gn.shotsLeft--;
                gn.fireCd = 2;
                if (gn.shotsLeft <= 0) {
                  gn.curSalvo = null;
                  gn.salvo++;
                }
              } else {
                gn.fireCd--;
              }
            }
          } else if (gn.t >= gn.seqStart) {
            if (!gn.meter) {
              gn.meter = true; gn.meterCnt = 0; gn.spinning = true; gn.spinSpd = 45; gn.spinAng = 0;
              G.sfx.sfx('segapower', 0.65, 0.72);
            }
            if (gn.meterCnt < 7) gn.meterCnt += 0.5;
            if (gn.spinning) {
              gn.spinAng += gn.spinSpd;
              gn.spinSpd -= 3;
              if (gn.spinSpd <= 0) {
                gn.spinning = false;
                gn.unhinge = true;
                gn.angle = Math.atan2(this.soulY - gn.by, this.soulX - gn.bx);
              }
            } else if (gn.unhinge) {
              gn.unhingeFrame = Math.min(5, gn.unhingeFrame + 0.75);
              if (gn.unhingeFrame >= 5 && !gn.blasting) {
                gn.blasting = true;
                gn.beamW = 68;
                gn.beamTimer = 0;
                G.sfx.sfx('rainbowbeam', 0.78);
              }
            }
            if (gn.blasting) {
              gn.beamTimer++;
              this.shake = 5;
              gn.bx = gn.thisx + (Math.random() - 0.5) * 6;
              gn.by = gn.thisy - Math.random() * 10 - 6;
              const ang = gn.angle;
              const nx = Math.cos(ang), ny = Math.sin(ang);
              const px = this.soulX - gn.bx, py = this.soulY - gn.by;
              const along = px * nx + py * ny;
              const perp = Math.abs(-px * ny + py * nx);
              if (along > 0 && perp < gn.beamW * 0.46 && gn.beamW > 8) this.hurt(5);

              // Starburst radial rings spawn ONLY on Chaos Blaster (hard=true); normal Chaos Buster has a clean beam (IMG_9418)!
              if (gn.hard && gn.beamTimer <= 12 && gn.beamTimer % 3 === 1) {
                const rotOff = gn.beamTimer * 12;
                const sx0 = gn.bx + nx * muzzleDist, sy0 = gn.by + ny * muzzleDist;
                for (let i = 0; i < 16; i++) {
                  const ra = (rotOff + i * 22.5) * Math.PI / 180;
                  this.bullets.push({
                    type: 'starburst', x: sx0, y: sy0,
                    vx: Math.cos(ra) * 5.2, vy: -Math.sin(ra) * 5.2,
                    accel: 0.14, hue: (i * 22 + gn.beamTimer * 18) % 360,
                    rot: 0, spin: 10, curve: 0, r: 4, life: 60,
                  });
                }
              }
              if (gn.beamTimer > 15) gn.beamW = Math.max(0, gn.beamW - 3.6);
            }
          }
          gn.recoil *= 0.65;
        }

        // Pattern E: HYPER GONER @ 30fps (obj_hg_wholescreen + obj_hg_body + obj_hg_debris)
        else if (kind === 'hypergoner') {
          const Gg = this.goner; if (!Gg) return; Gg.t++;
          if (Gg.stage === 0) {
            this.asAlpha = Math.max(0, this.asAlpha - 0.1);
            Gg.hgAlpha = Math.min(1, Gg.hgAlpha + 0.08);
            if (Gg.hgAlpha >= 1 && Gg.t > 16) {
              Gg.stage = 1;
              G.sfx.sfx('hg_laugh', 0.78);
            }
          } else if (Gg.stage === 1) {
            Gg.siner++;
            Gg.faceY = Math.sin(Gg.siner * 1.1) * 14 - 8;
            Gg.faceScale = Math.sin(Gg.siner * 1.1) * 0.25 - 0.2;
            if (Gg.t > 56) {
              Gg.stage = 2;
              G.sfx.sfx('hg_charge', 0.82);
            }
          } else {
            Gg.cCounter++;
            Gg.hgAlpha = Math.max(0.14, Gg.hgAlpha - 0.012);
            Gg.rad = Math.max(20, (Gg.cCounter - 95) * 1.45);
            this.shake = 5;
            if (Gg.cCounter < 185 && Gg.cCounter % 2 === 0) {
              const side = Math.floor(Math.random() * 4);
              const sx = side === 2 ? -30 : side === 3 ? 670 : Math.random() * 640;
              const sy = side === 0 ? -30 : side === 1 ? 510 : Math.random() * 460;
              const a = Math.atan2(240 - sy, 320 - sx);
              this.bullets.push({
                type: 'hgdebris', x: sx, y: sy,
                vx: Math.cos(a) * 4.5, vy: Math.sin(a) * 4.5,
                sc: 1.85, r: 9,
              });
            }
            if (Gg.cCounter < 180 && Math.hypot(this.soulX - 320, this.soulY - 240) < Math.max(16, Gg.rad - 6)) {
              this.hurt(5);
            }
            if (Gg.cCounter > 120) {
              this.whiteAlpha = Math.min(1.25, (Gg.cCounter - 120) / 48);
            }
          }
        }

        // Pattern F1: Phase 2 Canonical obj_ultimagen @ 30fps
        else if (kind === 'p2_comets') {
          const spawnSalvo = (side) => {
            const sx = side === 0 ? 160 : 480, sy = 128;
            this.blastOrbs.push({ x: sx, y: sy, sc: 1.4, alpha: 0.95, hue: (t * 22) % 360 });
            G.sfx.sfx('segapower', 0.45, 0.84);
          };
          const spawnUltBullet = (side) => {
            const sx = side === 0 ? 160 : 480, sy = 128;
            const slow = this.attackWeak ? 0.65 : 1.0;
            const vx = (side === 0 ? -1 : 1) * (7.2 + Math.random() * 4.8) * slow;
            const vy = (2.8 + Math.random() * 4.2) * slow;
            this.bullets.push({
              type: 'ult_comet', side, x: sx, y: sy, vx, vy,
              hue: Math.random() * 360,
              hist: Array.from({ length: 14 }, () => ({ x: sx, y: sy })),
              r: 5, life: 110,
            });
          };
          const tc = t < 1 ? t : ((t - 1) % 120) + 1;
          const live = t < this.attackDur - 24;
          if (live) {
            if (tc === 8 || tc === 48) spawnSalvo(0);
            if (tc === 28 || tc === 68) spawnSalvo(1);
            if (tc === 92) { spawnSalvo(0); spawnSalvo(1); }
            if ((tc >= 10 && tc <= 18 && tc % 2 === 0) || (tc >= 50 && tc <= 58 && tc % 2 === 0)) spawnUltBullet(0);
            if ((tc >= 30 && tc <= 38 && tc % 2 === 0) || (tc >= 70 && tc <= 78 && tc % 2 === 0)) spawnUltBullet(1);
            if (!this.attackWeak && tc >= 94 && tc <= 108 && tc % 2 === 0) spawnUltBullet(Math.random() < 0.5 ? 0 : 1);
          }
        }

        // Pattern F2: Phase 2 Chaos Bombs & Shoulder Comets @ 30fps
        else if (kind === 'p2_orb_beam') {
          const bombInt = Math.max(15, 22 - (this.diffLvl || 0) * 2);
          const cometInt = Math.max(20, 28 - (this.diffLvl || 0) * 2);
          if (t < this.attackDur - 32 && t % bombInt === 3) {
            G.sfx.sfx('spellcast', 0.48, 1.15);
            const bx2 = this.box.x + 28 + Math.random() * (this.box.w - 56);
            const by2 = this.box.y + 24 + Math.random() * (this.box.h - 48);
            this.bullets.push({
              type: 'chaosbomb', x: bx2, y: by2,
              stage: 0, sc: 0.85, angle: 0, alpha: 1, timer: 0, hue: (t * 24) % 360, r: 12,
            });
          }
          if (t < this.attackDur - 32 && t % cometInt === 12) {
            const side = (Math.floor(t / cometInt) % 2);
            const sx = side === 0 ? 160 : 480, sy = 128;
            this.blastOrbs.push({ x: sx, y: sy, sc: 1.4, alpha: 0.9, hue: (t * 26) % 360 });
            G.sfx.sfx('segapower', 0.4, 0.9);
            for (let k = 0; k < 2; k++) {
              this.bullets.push({
                type: 'ult_comet', side, x: sx, y: sy,
                vx: (side === 0 ? -1 : 1) * (7.2 + k * 2.2), vy: 3.4 + k * 2.0,
                hue: (t * 19 + k * 70) % 360,
                hist: Array.from({ length: 14 }, () => ({ x: sx, y: sy })),
                r: 5, life: 105,
              });
            }
          }
        }

        // Pattern F3: Finale Crying Weak Stray Fireballs @ 30fps (steers away from SOUL)
        else if (kind === 'finale_fire') {
          if (t < this.attackDur - 18 && t % 5 === 1) {
            if (t % 10 === 1) G.sfx.sfx('chug', 0.22, 0.78);
            const sx = this.box.x + 12 + Math.random() * (this.box.w - 24);
            const sy = this.box.y - 8;
            const ang = Math.atan2(this.soulY - sy, this.soulX - sx) + (Math.random() - 0.5) * 0.4;
            this.bullets.push({
              type: 'cry_fire', x: sx, y: sy,
              vx: Math.cos(ang) * 3.8, vy: Math.sin(ang) * 3.8,
              r: 5, life: 80,
            });
          }
        }

        // Pattern G: Final Desperate Rainbow Beam @ 30fps (obj_afinal_body + obj_lastbeam)
        else if (kind === 'lastbeam') {
          const lb = this.lastBeam; if (!lb) return; lb.t++;
          const zh = G.lang === 'zh';
          if (lb.t < lb.windup) {
            this.p2ArmRot = Math.min(148, lb.t * 4.8);
            this.p2Shake = Math.min(6, lb.t * 0.22);
            this.p2Radi = Math.min(60, lb.t * 1.6);
            if (lb.t % 5 === 1) G.sfx.sfx('spellcast', 0.48, 0.5 + (lb.t / lb.windup) * 0.65);
          } else if (lb.t === lb.windup) {
            this.asrielCry = 2;
            this.p2Shake = 5;
            this.p2RadiAlpha = 0;
            G.sfx.sfx('rainbowbeam', 0.8);
          } else {
            this.shake = 6;
            this.p2Shake = 6;
            const bTime = lb.t - lb.windup;
            if (bTime < 8) lb.bw = Math.min(lb.maxBw, bTime * 30);
            if (bTime === 78) {
              lb.bw += 80; lb.maxBw += 80;
              this.finaleBtnShake = 1;
              this.finaleShout = zh ? '快住手！！' : 'STOP IT!!';
              G.sfx.sfx('rainbowbeam', 0.72, 1.25);
            }
            if (bTime === 170) {
              lb.bw += 260; lb.maxBw += 260;
              this.finaleBtnShake = 2;
              this.finaleBtnFall = true;
              this.finaleShout = zh ? '現在就給我住手！！！' : 'STOP IT NOW!!!';
              G.sfx.sfx('rainbowbeam', 0.85, 1.45);
            }
            if (bTime > 265) {
              this.finaleShout = '';
              lb.bw = Math.max(0, lb.bw - 18);
            }
            if ([4, 44, 84, 124, 164, 204, 244].includes(bTime)) {
              this.hurt(1);
            }
          }
        }

        // Pattern H: Lost Souls Mini-Waves @ 30fps
        else if (kind === 'ls_undyne') {
          const step = (this.diffLvl || 0) >= 2 ? 11 : 14;
          if (t < this.attackDur - 18 && t % step === 2) {
            G.sfx.sfx('spearappear', 0.35);
            const d = (Math.floor(t / step) + (t > 60 ? 1 : 0)) % 4;
            const pos = [
              { x: 320, y: this.box.y - 110, vx: 0, vy: 5.2, dir: 0 },
              { x: this.box.x + this.box.w + 110, y: 314, vx: -5.2, vy: 0, dir: 1 },
              { x: 320, y: this.box.y + this.box.h + 110, vx: 0, vy: -5.2, dir: 2 },
              { x: this.box.x - 110, y: 314, vx: 5.2, vy: 0, dir: 3 },
            ][d];
            this.bullets.push({ type: 'ls_arrow', ...pos, r: 7 });
          }
        } else if (kind === 'ls_alphys') {
          const step = (this.diffLvl || 0) >= 2 ? 9 : 11;
          if (t < this.attackDur - 18 && t % step === 2) {
            this.bullets.push({
              type: 'ls_zap',
              x: this.box.x + 22 + Math.random() * (this.box.w - 44),
              y: this.box.y - 10, vy: 4.0 + Math.random() * 1.5, r: 9, destructible: Math.random() < 0.7,
            });
          }
        } else if (kind === 'ls_skelebros') {
          const step = (this.diffLvl || 0) >= 2 ? 14 : 18;
          if (t < this.attackDur - 18 && t % step === 2) {
            const fromLeft = Math.floor(t / step) % 2 === 0;
            const tall = Math.random() < 0.35 ? 48 : 26;
            this.bullets.push({
              type: 'ls_bone',
              x: fromLeft ? this.box.x - 12 : this.box.x + this.box.w + 12,
              y: this.box.y + this.box.h - tall, w: 10, h: tall,
              vx: fromLeft ? 5.8 : -5.8, vy: 0,
            });
          }
        } else if (kind === 'ls_parents') {
          const step = (this.diffLvl || 0) >= 2 ? 7 : 9;
          if (t < this.attackDur - 18 && t % step === 1) {
            G.sfx.sfx('chug', 0.28);
            const sx = Math.floor(t / step) % 2 === 0 ? this.box.x + 12 : this.box.x + this.box.w - 12;
            const ang = Math.atan2(this.soulY - (this.box.y + 10), this.soulX - sx);
            this.bullets.push({
              type: 'ls_fire', x: sx, y: this.box.y + 10,
              vx: Math.cos(ang) * 5.6, vy: Math.sin(ang) * 5.6, r: 6,
            });
          }
        }

        // Update bullets & check collisions @ 30fps (tightened fair c2-sans-fight-like hitboxes)
        const nextBullets = [];
        for (const b of this.bullets) {
          if (b.type === 'dreemurr_fire') {
            b.age += 1;
            if (!b.floor) {
              b.vy += b.gy;
              b.y += b.vy;
              if (b.y >= this.box.y + this.box.h - 12) {
                b.y = this.box.y + this.box.h - 12;
                b.vy = 0;
                b.floor = true;
              }
            }
            b.x = b.cx + b.hSign * Math.sin(b.age / 10) * 58;
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < 9) this.hurt(3);
            if (!b.floor || b.age < 75) nextBullets.push(b);
          } else if (b.type === 'stormstar') {
            b.prevs.unshift({ x: b.x, y: b.y });
            if (b.prevs.length > 4) b.prevs.pop();
            b.x += b.vx; b.y += b.vy; b.oo = 1 - b.oo;
            if (b.big) b.rot += 2;
            if (b.y >= b.splitY) {
              G.sfx.sfx(b.big ? 'explosion' : 'sparkles', 0.48, b.big ? 0.95 : 1.35);
              if (b.big) this.shake = 7;
              nextBullets.push({
                type: 'explodestar', x: b.x, y: b.y,
                big: b.big, hue: b.hue, sc: b.big ? 2 : 1, alpha: 1, rot: b.rot, life: 16,
              });
              const baseAng = Math.random() * 360;
              if (!b.big) {
                for (let i = 0; i < 7; i++) {
                  const a = (baseAng + i * 51.42857) * Math.PI / 180;
                  nextBullets.push({
                    type: 'starburst', x: b.x, y: b.y,
                    vx: Math.cos(a) * 1.5, vy: -Math.sin(a) * 1.5,
                    accel: b.hard ? 0.22 : 0.18, curve: b.hard ? 1.5 : 0,
                    hue: (b.hue + i * 51) % 360, rot: 0, spin: 5, r: 4, life: 65,
                  });
                }
              } else {
                const rings = [
                  { cnt: 20, step: 18, spd: 2.0, accel: 0.28, off: 0 },
                  { cnt: 20, step: 18, spd: 1.0, accel: 0.22, off: 9 },
                  { cnt: 20, step: 18, spd: 0.3, accel: 0.16, off: 4 },
                ];
                for (const rg of rings) {
                  for (let i = 0; i < rg.cnt; i++) {
                    const a = (baseAng + rg.off + i * rg.step) * Math.PI / 180;
                    nextBullets.push({
                      type: 'starburst', x: b.x, y: b.y,
                      vx: Math.cos(a) * rg.spd, vy: -Math.sin(a) * rg.spd,
                      accel: rg.accel, curve: b.hard ? 1.4 : 0,
                      hue: (b.hue + i * 18) % 360, rot: 0, spin: 6, r: 4, life: 75,
                    });
                  }
                }
              }
              continue;
            }
            nextBullets.push(b);
          } else if (b.type === 'explodestar') {
            b.life--;
            b.alpha -= 0.06;
            b.sc += b.big ? 0.22 : 0.12;
            if (b.life > 0 && b.alpha > 0) nextBullets.push(b);
          } else if (b.type === 'starburst') {
            b.life--;
            b.rot += (b.spin || 6);
            if (b.curve) {
              const ca = b.curve * Math.PI / 180;
              const nvx = b.vx * Math.cos(ca) - b.vy * Math.sin(ca);
              const nvy = b.vx * Math.sin(ca) + b.vy * Math.cos(ca);
              b.vx = nvx; b.vy = nvy;
            }
            if (b.accel) {
              const sp = Math.hypot(b.vx, b.vy);
              if (sp > 0.01) {
                const nsp = Math.min(11.0, sp + b.accel);
                b.vx = (b.vx / sp) * nsp;
                b.vy = (b.vy / sp) * nsp;
              }
            }
            b.x += b.vx; b.y += b.vy;
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < b.r + 3.5) this.hurt(5);
            if (b.life > 0 && b.x > -40 && b.x < 680 && b.y > -40 && b.y < 520) nextBullets.push(b);
          } else if (b.type === 'warnbolt') {
            b.timer--;
            if (b.timer <= 0) {
              G.sfx.sfx(b.giga ? 'lithit2' : 'lithit', 0.62, b.giga ? 0.8 : 0.65);
              this.shake = Math.max(this.shake, b.giga ? 8 : 3.5);
              nextBullets.push({
                type: 'bolt', x: b.x, baseX: b.x, w: b.w, alpha: 1, scX: b.giga ? 4 : 2,
                age: 0, frame: Math.random() < 0.5 ? 0 : 1, giga: b.giga, hue: (this.time * 22) % 360,
              });
            } else nextBullets.push(b);
          } else if (b.type === 'bolt') {
            b.age++;
            b.hue = (b.hue + 14) % 360;
            const jit = b.giga ? 10 : 5;
            b.x = b.baseX + (Math.random() - 0.5) * jit * 2;
            if (b.age > (b.giga ? 3 : 2)) {
              b.alpha -= 0.14;
              if (b.alpha < 0.5) b.scX = Math.max(0.2, b.scX - 0.28);
            }
            if (b.alpha > 0.72 && Math.abs(this.soulX - b.baseX) < b.w * 0.40 && this.soulY > this.box.y) this.hurt(5);
            if (b.alpha > 0.08) nextBullets.push(b);
          } else if (b.type === 'saberslash') {
            b.life--;
            if (this.soulX >= b.x && this.soulX <= b.x + b.w && this.soulY >= b.y && this.soulY <= b.y + b.h) {
              this.hurt(5);
            }
            if (b.life > 0) nextBullets.push(b);
          } else if (b.type === 'swordtwinkle') {
            b.vx += b.ax;
            b.x += b.vx; b.y += b.vy;
            b.life--;
            if (b.life < 14) b.alpha -= 0.08;
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < 7) this.hurt(5);
            if (b.alpha > 0.05 && b.x > 0 && b.x < 640) nextBullets.push(b);
          } else if (b.type === 'ult_comet') {
            const tx = this.ultTarget ? this.ultTarget.x : this.soulX;
            const ty = this.ultTarget ? this.ultTarget.y : this.soulY;
            let hh = Math.max(-0.85, Math.min(0.85, (tx - b.x) / 22));
            if (b.side === 0 && hh < 0) hh = 0;
            if (b.side === 1 && hh > 0) hh = 0;
            let vv = Math.max(-0.85, Math.min(0.55, (ty - b.y) / 22));
            b.vx += hh; b.vy += vv;
            const sp = Math.hypot(b.vx, b.vy);
            const maxSp = this.attackWeak ? 9.5 : 15.0;
            if (sp > maxSp) { b.vx = (b.vx / sp) * maxSp; b.vy = (b.vy / sp) * maxSp; }
            b.x += b.vx; b.y += b.vy;
            b.hist.unshift({ x: b.x, y: b.y });
            if (b.hist.length > 14) b.hist.pop();
            b.hue = (b.hue + 18) % 360;
            b.life--;
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < b.r + 3.5) this.hurt(this.attackWeak ? 1 : 4);
            if (b.life > 0 && b.x > -90 && b.x < 730 && b.y > -90 && b.y < 520) nextBullets.push(b);
          } else if (b.type === 'chaosbomb') {
            b.angle += 10;
            b.timer++;
            if (b.stage === 0) {
              b.sc -= 0.045;
              if (b.sc <= 0.25) b.stage = 1;
            } else if (b.stage === 1) {
              b.sc += 0.28;
              if (b.sc >= 1.65) {
                b.stage = 2;
                G.sfx.sfx('explosion', 0.45, 1.25);
                this.shake = Math.max(this.shake, 5);
                for (let i = 0; i < 10; i++) {
                  const a = (i / 10) * Math.PI * 2 + b.timer * 0.08;
                  nextBullets.push({
                    type: 'starburst', x: b.x, y: b.y,
                    vx: Math.cos(a) * 5.2, vy: Math.sin(a) * 5.2,
                    hue: (b.hue + i * 36) % 360, rot: 0, spin: 8, r: 4, life: 58,
                  });
                }
              }
            } else {
              b.sc += 0.05;
              b.alpha -= 0.14;
            }
            if (b.stage === 1 && Math.hypot(b.x - this.soulX, b.y - this.soulY) < 13) this.hurt(4);
            if (b.alpha > 0.05) nextBullets.push(b);
          } else if (b.type === 'cry_fire') {
            const d = Math.hypot(b.x - this.soulX, b.y - this.soulY);
            if (d < 46 && d > 1) {
              b.vx += ((b.x - this.soulX) / d) * 0.52;
              b.vy += ((b.y - this.soulY) / d) * 0.52;
            }
            b.x += b.vx; b.y += b.vy; b.life--;
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < 7) this.hurt(1);
            if (b.life > 0 && b.y < this.box.y + this.box.h + 24) nextBullets.push(b);
          } else if (b.type === 'ls_arrow') {
            b.x += b.vx; b.y += b.vy;
            const dToCenter = Math.hypot(b.x - 320, b.y - 314);
            if (dToCenter < 24 && b.dir === this.shieldDir) { G.sfx.sfx('arrow', 0.45); continue; }
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < 7.5) this.hurt(3);
            else if (b.x > 100 && b.x < 540 && b.y > 120 && b.y < 460) nextBullets.push(b);
          } else if (b.type === 'ls_zap') {
            b.y += b.vy;
            let shotHit = false;
            if (b.destructible) {
              for (let si = this.playerShots.length - 1; si >= 0; si--) {
                const s = this.playerShots[si];
                if (Math.hypot(s.x - b.x, s.y - b.y) < 16) {
                  this.playerShots.splice(si, 1); shotHit = true; G.sfx.sfx('sparkles', 0.35); break;
                }
              }
            }
            if (shotHit) continue;
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < b.r + 2) this.hurt(3);
            if (b.y < this.box.y + this.box.h + 15) nextBullets.push(b);
          } else if (b.type === 'ls_bone') {
            b.x += b.vx;
            if (this.soulX + 4 > b.x && this.soulX - 4 < b.x + b.w && this.soulY + 4 > b.y && this.soulY - 4 < b.y + b.h) {
              this.hurt(3);
            }
            if (b.x > this.box.x - 40 && b.x < this.box.x + this.box.w + 40) nextBullets.push(b);
          } else {
            b.x += (b.vx || 0); b.y += (b.vy || 0);
            if (b.life !== undefined) { b.life--; if (b.life <= 0) continue; }
            if (b.type === 'hgdebris') {
              b.vx *= 1.08; b.vy *= 1.08;
              b.sc = Math.max(0.05, b.sc - 0.04);
              if (Math.hypot(b.x - 320, b.y - 240) < 16) continue;
            }
            if (Math.hypot(b.x - this.soulX, b.y - this.soulY) < (b.r || 5) + 3.5) {
              this.hurt(this.mode === 'finale' ? 1 : (b.type === 'ls_fire' ? 3 : 5));
            }
            if (b.x > -80 && b.x < 720 && b.y > -80 && b.y < 550) nextBullets.push(b);
          }
        }
        this.bullets = nextBullets;

        if (this.attackTimer >= this.attackDur) {
          this.finishWave();
        }
      },

      // =====================================================================
      // 60FPS/120FPS INTERPOLATED CANVAS RENDERER (640x480 Undertale Native)
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

        // ---------------- SIMULATOR MENUS (c2-sans-fight style!) ----------------
        if (this.mode === 'title' || this.mode === 'phase_menu' || this.mode === 'single_menu') {
          this.drawPsychedelicBG(ctx, 0.32, 'p1');
          ctx.fillStyle = 'rgba(0,0,0,0.62)';
          ctx.fillRect(0, 0, 640, 480);
          drawSprExt(ctx, 'spr_asriel_afterimager_full', 0, 520, 42 + Math.sin(this.time * 0.1) * 6, 1.5, 1.5, 0, hsvCss(this.time * 8, 80, 65), 0.35, false);

          drawRichText(ctx, L.simTitle, 44, 28, 999, { size: 30, color: hsvCss(this.time * 8, 90, 70) });
          drawRichText(ctx, L.simSub, 44, 64, 999, { size: 17, color: '#cccccc' });

          const list = this.mode === 'title'
            ? L.menuOpts
            : (this.mode === 'phase_menu' ? L.phaseOpts : [...L.singleOpts.slice(0, 10), L.noHitToggle + (this.noHitMode ? ' [ON]' : ' [OFF]'), L.singleOpts[10]]);
          const startY = this.mode === 'title' ? 210 : (this.mode === 'phase_menu' ? 118 : 96);
          const rowH = this.mode === 'title' ? 40 : (this.mode === 'phase_menu' ? 44 : 27);

          list.forEach((lbl, idx) => {
            const sel = this.menuCursor === idx;
            const y = startY + idx * rowH;
            if (sel) drawSpr(ctx, 'spr_heart', 0, 46, y + 3, 1, 1);
            drawRichText(ctx, lbl, 74, y, 999, { size: this.mode === 'single_menu' ? 16 : 21, color: sel ? '#ffff00' : '#ffffff', maxWidth: 540, maxHeight: rowH - 2 });
          });

          drawRichText(ctx, zh ? '↑↓ 選擇  ·  Z / 點擊確認  ·  X 返回' : '↑↓ Select · Z / Click Confirm · X Back', 44, 448, 999, { size: 15, color: '#888888' });
          ctx.restore();
          return;
        }

        // ---------------- INTRO CUTSCENE (obj_asrielappear + obj_FinalWriter) ----------------
        if (this.mode === 'intro') {
          if (this.introStep < L.introLines.length) {
            if (this.introStep === 0) {
              const turnF = Math.min(9, Math.floor(this.introTick / 8));
              drawSpr(ctx, 'spr_kidasriel_back', turnF, 284, 136, 2, 2);
            } else {
              drawSpr(ctx, 'spr_kidasriel_front', Math.floor(this.time / 8) % 4, 286, 130, 2, 2);
            }
            const line = L.introLines[this.introStep];
            if (line) {
              ctx.fillStyle = '#fff'; ctx.fillRect(380, 108, 224, 114);
              ctx.beginPath(); ctx.moveTo(380, 148); ctx.lineTo(364, 158); ctx.lineTo(380, 168); ctx.fill();
              drawRichText(ctx, line.text, 392, 118, this.introChar, { size: 18, lineH: 24, color: '#000000' });
            }
          } else {
            // Canonical obj_asrielappear con>=10: Full silhouette + wide shaking ASRIEL DREEMURR text!
            const fy = 28 + Math.sin(this.introRevealTimer / 3) * 2.5;
            drawSpr(ctx, 'spr_asriel_afterimager_full', 0, 257, fy, 2, 2);
            const fullTitle = 'ASRIEL   DREEMURR';
            const shown = fullTitle.slice(0, this.introWriterChar);
            ctx.save();
            ctx.font = 'bold 46px "Determination Sans", "Determination Mono", monospace';
            const tw = ctx.measureText(fullTitle).width;
            const wx = Math.round((640 - tw) / 2), wy = 286;
            drawRichText(ctx, shown, wx + (Math.random() - 0.5) * 3, wy + (Math.random() - 0.5) * 3, 999, { size: 46, color: 'rgba(255,255,255,0.95)' });
            drawRichText(ctx, shown, wx + (Math.random() - 0.5) * 5, wy + (Math.random() - 0.5) * 4, 999, { size: 46, color: 'rgba(255,255,255,0.68)' });
            for (let g = 2; g <= 5; g++) {
              drawRichText(ctx, shown, wx + (Math.random() - 0.5) * g * 4.5, wy + (Math.random() - 0.5) * g * 3, 999, { size: 46, color: `rgba(255,255,255,${Math.max(0.16, 0.72 - g * 0.12)})` });
            }
            ctx.restore();
          }
          drawRichText(ctx, zh ? '[Z] 繼續  ·  [X] 跳過開場' : '[Z] Next · [X] Skip Intro', 360, 444, 999, { size: 16, color: '#777777' });
          if (this.whiteAlpha > 0) {
            ctx.fillStyle = `rgba(255,255,255,${Math.min(1, this.whiteAlpha)})`;
            ctx.fillRect(0, 0, 640, 480);
          }
          ctx.restore();
          return;
        }

        // ---------------- EPILOGUE / VICTORY ----------------
        if (this.mode === 'epilogue') {
          const ep = L.epilogueLines[this.epiIdx];
          if (ep.pose === 'hug') {
            drawSpr(ctx, 'spr_asriel_hug', Math.floor(this.time / 12), 295, 160, 3, 3);
          } else {
            const sp = ep.pose === 'dry' ? 'spr_asriel_tearsdry' : 'spr_asriel_armcry';
            drawSpr(ctx, sp, Math.floor(this.time / 12), 295, 160, 3, 3);
            drawSpr(ctx, 'spr_maincharau', 0, 294, 260, 2, 2);
          }
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
          this.drawPsychedelicBG(ctx, 0.25, 'p1');
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
        if (this.sub === 'refuse') {
          ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480);
          if (this.refuseStage === 0) {
            const jx = this.refuseT > 20 ? (Math.random() - 0.5) * 5 : 0;
            const jy = this.refuseT > 20 ? (Math.random() - 0.5) * 5 : 0;
            drawSpr(ctx, 'spr_heartbreak', 0, 310 + jx, 224 + jy, 1.5, 1.5);
          } else {
            drawSpr(ctx, 'spr_heart', 0, 310, 224, 1.5, 1.5);
            drawRichText(ctx, L.refused, 200, 152, Math.max(0, this.refuseT - 35), { size: 28, color: '#ffffff' });
          }
          ctx.restore();
          return;
        }

        // Canonical Struggle Blackout ("You tried to reach your SAVE file. Nothing happened." - IMG_9423/9424)
        if (this.p2BlackoutMsg) {
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, 640, 480);
          ctx.fillStyle = '#000';
          ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 4;
          ctx.strokeRect(this.box.x, this.box.y, this.box.w, this.box.h);
          drawRichText(ctx, this.msg, this.box.x + 20, this.box.y + 18, Math.floor(this.mc), { size: 20, lineH: 27, maxWidth: this.box.w - 40, maxHeight: this.box.h - 28 });
          ctx.restore();
          return;
        }

        // 1. Canonical Backgrounds: P1 obj_roundedge 3D tunnel vs P2/Finale pure #000000 sky (IMG_9422)
        if (this.mode === 'lost_soul' || this.mode === 'p2' || this.mode === 'finale') {
          ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 640, 480);
        } else {
          if (!this.p1SpecialNormal) this.drawPsychedelicBG(ctx, Math.max(0.55, this.p1BgAlpha), 'p1');
        }

        // 2. Boss Sprite Layer
        if (this.mode === 'lost_soul') this.drawLostSoulBoss(ctx);
        else if (this.mode === 'p2' || this.mode === 'finale') this.drawAsrielP2(ctx);
        else this.drawAsrielP1(ctx);

        // Finale memory panels (obj_asrielpanels: 120, 56, 2x2)
        if (this.mode === 'finale' && this.asrielFade > 0.2) {
          drawSprExt(ctx, 'spr_asrielpanels', Math.min(4, this.panelIdx), 120, 56, 2, 2, 0, null, Math.min(0.8, this.panelAlpha));
        }

        // P2 SAVE Awakening Darkness (obj_afinal_body darker=1)
        if (this.p2Darker > 0) {
          ctx.fillStyle = `rgba(0,0,0,${this.p2Darker})`;
          ctx.fillRect(0, 0, 640, 480);
        }

        // 3. Speech Bubble
        if (this.sub === 'bubble' && this.bubbles[this.bubIdx]) {
          ctx.fillStyle = '#fff'; ctx.fillRect(392, 46, 224, 134);
          ctx.beginPath(); ctx.moveTo(392, 92); ctx.lineTo(374, 102); ctx.lineTo(392, 112); ctx.fill();
          drawRichText(ctx, this.bubbles[this.bubIdx].text, 404, 56, this.bubC, { size: 17, lineH: 22, color: '#000000', who: 'asrielboss', maxWidth: 202, maxHeight: 116 });
        }

        // 4. Battle Box & Contents (Hyper Goner expands box over the whole screen!)
        if (this.goner) {
          ctx.fillStyle = '#000';
          ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);
          this.drawHyperGoner(ctx);
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 4;
          ctx.strokeRect(this.box.x, this.box.y, this.box.w, this.box.h);
        } else {
          ctx.fillStyle = 'rgba(0,0,0,0.92)';
          ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);
          ctx.strokeStyle = this.hopeActive ? '#80e8ff' : '#fff';
          ctx.lineWidth = 5;
          ctx.strokeRect(this.box.x, this.box.y, this.box.w, this.box.h);
        }

        if (this.sub === 'main') {
          drawRichText(ctx, this.statusTxt || '* ...', this.box.x + 22, this.box.y + 20, 999, { size: 22, lineH: 30, maxWidth: this.box.w - 44, maxHeight: this.box.h - 32 });
        } else if (this.sub === 'msg') {
          drawRichText(ctx, this.msg, this.box.x + 22, this.box.y + 18, Math.floor(this.mc), { size: 21, lineH: 28, maxWidth: this.box.w - 44, maxHeight: this.box.h - 28 });
        } else if (this.sub === 'target') {
          if (this.subCur === 0) drawSpr(ctx, 'spr_heart', 0, 58, 286, 1, 1);
          if (this.mode === 'p1' && !this.p1SpecialNormal) {
            // Canonical obj_asriel_body lines 597-608: 17 dancing rainbow letters!
            const phrase = ' Asriel Dreemurr ';
            for (let i = 0; i < phrase.length; i++) {
              const ch = phrase[i];
              if (ch === ' ') continue;
              const lx = 104 + i * 16 + Math.sin((this.time * 0.5 + i) / 5) * 6;
              const ly = 276 + Math.cos((this.time * 0.5 + i) / 5) * 4;
              drawRichText(ctx, ch, lx, ly, 999, { size: 24, color: hsvCss((this.time * 4 + i * 14) % 360, 82, 68) });
            }
          } else {
            drawRichText(ctx, `* ASRIEL DREEMURR   LV ∞`, 86, 280, 999, { size: 24 });
          }
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
            ctx.save(); ctx.strokeStyle = '#40ff40'; ctx.lineWidth = 4;
            const angs = [-Math.PI / 2, 0, Math.PI / 2, Math.PI][this.shieldDir];
            ctx.beginPath(); ctx.arc(this.soulX, this.soulY, 20, angs - 0.8, angs + 0.8); ctx.stroke();
            ctx.restore();
          }
        }

        // 6. Battle HUD & Buttons (with Final Laser shaking/knocking buttons offscreen!)
        const hudName = G.state.name || (this.standalone ? 'CHARA' : 'FRISK');
        drawBattleHUD(ctx, { name: hudName, lv: G.state.lv || 1, hp: Math.ceil(this.hp), maxHp: this.maxHp }, 398);
        if (this.hp < 1 && this.hp > 0) {
          ctx.fillStyle = '#000'; ctx.fillRect(332, 395, 180, 28);
          drawRichText(ctx, `${formatHp(this.hp)} / ${this.maxHp}`, 336, 398, 999, { size: 24, color: '#ffff00' });
        }

        const btSprs = ['spr_fightbt', (this.mode === 'p2' && this.saveUnlocked) ? 'spr_savebt' : 'spr_talkbt', 'spr_itembt', 'spr_sparebt'];
        const btX = [32, 185, 338, 491];
        const lockToSave = ((this.mode === 'p2' && !this.saveUnlocked) || this.mode === 'finale');
        for (let i = 0; i < 4; i++) {
          const sel = this.sub === 'main' && this.cur === i;
          const dim = (lockToSave && i !== 1) ? 0.32 : 1;
          const shkX = (this.finaleBtnShake === 1 && i !== 1) ? (Math.random() - 0.5) * 8 : 0;
          const shkY = (this.finaleBtnShake === 1 && i !== 1) ? (Math.random() - 0.5) * 8 : 0;
          const byPos = (this.mode === 'finale' && this.finaleBtnFall) ? this.finaleBtnY[i] : 430;
          const bAng = (this.mode === 'finale' && this.finaleBtnFall) ? this.finaleBtnAng[i] : 0;
          if (byPos < 520) {
            drawSprExt(ctx, btSprs[i], sel ? 0 : 1, btX[i] + shkX, byPos + shkY, 1, 1, bAng, null, dim, false);
            if (sel) drawSpr(ctx, 'spr_heart', 0, btX[i] + 8, byPos + 14, 1, 1);
          }
        }

        if (this.lastBeam && this.lastBeam.t >= this.lastBeam.windup) {
          this.drawFinalRainbowLaser(ctx);
        }
        if (this.finaleShout) {
          ctx.save();
          ctx.fillStyle = '#fff'; ctx.fillRect(398, 52, 214, 72);
          ctx.beginPath(); ctx.moveTo(398, 76); ctx.lineTo(380, 86); ctx.lineTo(398, 96); ctx.fill();
          drawRichText(ctx, this.finaleShout, 412, 70, 999, { size: 22, color: '#000000' });
          ctx.restore();
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

      drawPsychedelicBG(ctx, alpha, variant = 'p1', destRects = null) {
        const bg = SPR['spr_asrielbg'];
        if (!bg || !bg.img.complete || !bg.img.naturalWidth) return;
        const hue = Math.round((this.time * 5) % 360);
        if (!this._bgCanv) {
          this._bgCanv = document.createElement('canvas');
          this._bgCanv.width = 160; this._bgCanv.height = 96;
          this._bgCtx = this._bgCanv.getContext('2d');
        }
        const bc = this._bgCtx;
        bc.save();
        bc.globalCompositeOperation = 'source-over';
        bc.fillStyle = '#000';
        bc.fillRect(0, 0, 160, 96);
        bc.imageSmoothingEnabled = false;

        if (variant === 'p1') {
          // Canonical obj_roundedge: grayscale luminance mosaic * cohesive HSV multiply -> green/blue/magenta/red with pure black voids!
          if ('filter' in bc) bc.filter = 'grayscale(1) contrast(1.65) brightness(1.35)';
          const strips = 14;
          for (let i = 0; i < strips; i++) {
            const p = i / strips;
            const sy = Math.floor((80 + i * 24) % 400);
            const sx = Math.floor((this.bgScroll * 0.6 + i * 32) % 800);
            const dx = Math.floor(80 + p * 74);
            const ldx = Math.floor(80 - p * 74);
            const dw = Math.max(4, Math.floor(6 + p * 14));
            const dh = Math.floor(54 + p * 42);
            const dy = Math.floor(14 - p * 14);
            bc.drawImage(bg.img, sx, sy, 48, 120, dx, dy, dw, dh);
            bc.save();
            bc.translate(ldx, dy);
            bc.scale(-1, 1);
            bc.drawImage(bg.img, sx, sy, 48, 120, 0, 0, dw, dh);
            bc.restore();
          }
          bc.filter = 'none';
          bc.globalCompositeOperation = 'multiply';
          bc.fillStyle = hsvCss(120 + hue, 92, 62);
          bc.fillRect(0, 0, 160, 96);
        } else {
          // Canonical Phase 2 dark crimson/prism stained-glass mosaic clipped to wing rects (IMG_9422)
          if ('filter' in bc) bc.filter = 'grayscale(1) contrast(1.55) brightness(1.2)';
          for (const off of [0, 80]) {
            const sx = (this.bgScroll + off) % 800;
            bc.drawImage(bg.img, sx, 20, 220, 180, 0, 0, 80, 96);
            bc.save();
            bc.translate(160, 0);
            bc.scale(-1, 1);
            bc.drawImage(bg.img, sx, 20, 220, 180, 0, 0, 80, 96);
            bc.restore();
          }
          bc.filter = 'none';
          bc.globalCompositeOperation = 'multiply';
          const pGrad = bc.createLinearGradient(0, 0, 160, 96);
          const hBase = 342 + Math.sin(this.time * 0.08) * 18;
          pGrad.addColorStop(0, hsvCss(hBase, 92, 52));
          pGrad.addColorStop(0.5, hsvCss(hBase - 22, 88, 44));
          pGrad.addColorStop(1, hsvCss(hBase + 16, 92, 50));
          bc.fillStyle = pGrad;
          bc.fillRect(0, 0, 160, 96);
        }
        bc.restore();

        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.globalAlpha = alpha;
        if (destRects) {
          for (const rc of destRects) {
            ctx.save();
            if (rc.flip) {
              ctx.translate(rc.x + rc.w, rc.y);
              ctx.scale(-1, 1);
              ctx.drawImage(this._bgCanv, 0, 0, 160, 96, 0, 0, rc.w, rc.h);
            } else {
              ctx.drawImage(this._bgCanv, 0, 0, 160, 96, rc.x, rc.y, rc.w, rc.h);
            }
            ctx.restore();
          }
        } else {
          ctx.drawImage(this._bgCanv, 0, 0, 160, 96, 0, 0, 640, 384);
          const grad = ctx.createLinearGradient(0, 220, 0, 384);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(1, 'rgba(0,0,0,0.92)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 220, 640, 164);
        }
        ctx.restore();
      },

      drawAsrielP1(ctx) {
        if (!this.p1SpecialNormal) {
          for (const a of this.afterimages) {
            drawSprExt(ctx, 'spr_asriel_afterimager', 0, a.x, a.y, 2, 2, 0, hsvCss(a.hue, 92, 62), a.alpha, true);
          }
        }

        const al = this.asAlpha;
        const st = this.transformStretch;
        const x = this.asX;
        const rely = this.asRely;
        const y = this.asY + (this.transformStretch > 0 ? Math.sin(this.time / 3) * 0.5 : 0);
        const yoff = Math.sin(this.p1Siner / 6 || this.time / 6);

        if (al > 0.02) {
          ctx.save();
          ctx.fillStyle = `rgba(0,0,0,${al})`;
          ctx.fillRect(x - 40, y + 20 + rely, 82, 26);
          ctx.restore();

          drawSprExt(ctx, 'spr_asrielfeet', 0, x + yoff * 2, y + 56 + rely * 0.9, 2 + st, 2, this.torsoRot, null, al, true);
          drawSprExt(ctx, 'spr_torsoball', 0, x + yoff, y + 48 + rely, 2 + st, 2, 0, null, al, true);
          drawSprExt(ctx, 'spr_asrieltorso', 0, x + yoff, y + 48 + rely, 2 + st, 2, this.torsoRot, null, al, true);
          drawSprExt(ctx, 'spr_asriellocket', 0, x + 2, y + 34 + rely * 1.2, 2 + st, 2, 0, null, al, true);

          if (this.sabers) {
            const S = this.sabers;
            if (!S.armed) {
              const oo = (this.time % 2 === 0) ? 1 : -1;
              drawSprExt(ctx, 'spr_asriel_sword', 0, x - 36 + oo * S.sOffset - 22, y + 35 - 148, 2, 2, 0, null, Math.min(1, 1 - S.sOffset / 45), false);
              drawSprExt(ctx, 'spr_asriel_sword', 0, x + 36 + oo * S.sOffset + 22, y + 35 - 148, -2, 2, 0, null, Math.min(1, 1 - S.sOffset / 45), false);
            } else {
              const activeSlash = S.swordSpriteTimer > 0;
              const shakeX = (S.twinkleMode && !S.twinklesSpawned) ? (Math.random() - 0.5) * 6 : 0;
              const shakeY = (S.twinkleMode && !S.twinklesSpawned) ? (Math.random() - 0.5) * 6 : 0;
              const armSprPower = (S.twinkleMode && !S.twinklesSpawned && this.time % 2 === 0) ? 'spr_asriel_swordarm_power' : 'spr_asriel_swordarm';

              if (activeSlash) {
                if (!S.twinklesSpawned) {
                  if (S.curSide === 0) {
                    drawSprExt(ctx, 'spr_asriel_swordarm', 0, x + 38, y + 35, -2, 2, -14, null, al, true);
                  } else {
                    drawSprExt(ctx, 'spr_asriel_swordarm', 0, x - 38, y + 35, 2, 2, 14, null, al, true);
                  }
                }
              } else {
                drawSprExt(ctx, armSprPower, 0, x - 38 + shakeX, y + 35 + shakeY, 2, 2, this.armRotL, null, al, true);
                drawSprExt(ctx, armSprPower, 0, x + 38 + shakeX, y + 35 + shakeY, -2, 2, this.armRotR, null, al, true);
              }
            }
          } else if (this.gun) {
            drawSprExt(ctx, 'spr_asrielarm_r', 0, x - 28, y + 38 + rely * 1.2, -2, 2, 0, null, al * 0.35, true);
          } else if (this.shrug) {
            drawSprExt(ctx, 'spr_asrielarm_r_shrug', 0, x - 28, y + 38 + rely * 1.2, -2, 2, 0, null, al, true);
            drawSprExt(ctx, 'spr_asrielarm_r_shrug', 0, x + 30, y + 38 + rely * 1.2, 2, 2, 0, null, al, true);
          } else {
            const idleSwing = (this.armRotL === 0 && this.armRotR === 0) ? Math.sin(this.time / 7) * 4 : 0;
            drawSprExt(ctx, 'spr_asrielarm_r', 0, x - 28, y + 38 + rely * 1.2, -2 - st, 2, this.armRotL + idleSwing, null, al * this.armAlpha, true);
            drawSprExt(ctx, 'spr_asrielarm_r', 0, x + 30, y + 38 + rely * 1.2, 2 + st, 2, this.armRotR - idleSwing, null, al * this.armAlpha, true);
          }

          drawSprExt(ctx, 'spr_asrielshoulder_r', 0, x - 28, y + 26 + rely * 1.2, -2 - st, 2, 0, null, al, true);
          drawSprExt(ctx, 'spr_asrielshoulder_r', 0, x + 30, y + 26 + rely * 1.2, 2 + st, 2, 0, null, al, true);
          drawSprExt(ctx, 'spr_asrielcollar', 0, x, y + 22 + rely, 2 + st, 2, 0, null, al, true);

          if (this.shrug) {
            drawSprExt(ctx, 'spr_asriel_headshake_sassy', Math.floor(this.time / 3) % 4, x, y + rely * 1.2 + this.headY, 2 + st, 2, this.headRot, null, al, true);
          } else {
            drawSprExt(ctx, 'spr_asrielhead', this.asExpr, x, y + rely * 1.2 + this.headY, 2 + st, 2, this.headRot, null, al, true);
          }
        }

        // Render Chaos Buster Gun Arm independently so recoil & 360 spin align perfectly!
        if (this.gun) {
          const gn = this.gun;
          const gDeg = (-gn.angle * 180 / Math.PI + 90) + (gn.spinning ? gn.spinAng : 0);
          if (gn.meter) {
            const lit = Math.min(7, Math.floor(gn.meterCnt));
            for (let i = 0; i < lit; i++) {
              const mc = hsvCss((this.time * 24 - i * 24) % 360, 88, 65);
              drawSprExt(ctx, 'spr_asriel_gunarm_meter', i, gn.bx, gn.by, 2, 2, gDeg, mc, 1, true);
            }
          }
          if (gn.unhinge) {
            const uf = gn.blasting ? (4 + (this.time % 2)) : Math.min(5, Math.floor(gn.unhingeFrame));
            drawSprExt(ctx, 'spr_asriel_gunarm_unhinge', uf, gn.bx, gn.by, 2, 2, gDeg, null, 1, true);
          } else {
            const sf = gn.recoil > 2 ? 2 : 0;
            drawSprExt(ctx, 'spr_asriel_gunarm_shot', sf, gn.bx, gn.by, 2, 2, gDeg, null, 1, true);
          }
        }

        // Hand Lightning / Star Charge Sparkles
        for (const h of this.handSparks) {
          const sprN = h.kind === 'bolt' ? 'spr_handlightning' : 'spr_regstar';
          drawSprExt(ctx, sprN, 0, h.x, h.y, h.sc, h.kind === 'bolt' ? 1 : h.sc, h.kind === 'bolt' ? h.deg : h.rot, hsvCss(h.hue, 80, 68), h.alpha, true);
        }
      },

      drawAsrielP2(ctx) {
        const x = 320, y = 112;
        const af = Math.floor(this.time / 3);
        const bob = Math.sin(this.time / 2);
        const bob2 = Math.sin(this.time / 8) * 4;
        const alpha = Math.max(0.05, 1 - this.asrielFade);
        const armRot = this.lastBeam ? this.p2ArmRot : (this.gun ? 35 : Math.sin(this.time * 0.12) * 8);
        const rx = (Math.random() - 0.5) * this.p2Shake * 1.4;
        const ry = (Math.random() - 0.5) * this.p2Shake * 2.4;

        if (alpha > 0.12) {
          const wy = y - 52 + bob2;
          // Draw animated crimson/prism stained-glass behind ONLY the two cosmoswing cutouts (pure #000000 sky!)
          this.drawPsychedelicBG(ctx, alpha * 0.82, 'p2', [
            { x: x - 44 - 312, y: wy, w: 312, h: 226, flip: true },
            { x: x + 42, y: wy, w: 312, h: 226, flip: false },
          ]);
          drawSprExt(ctx, 'spr_afinal_cosmoswing', af, x + 42, wy, 2, 2, 0, null, alpha, false);
          drawSprExt(ctx, 'spr_afinal_cosmoswing', af, x - 44, wy, -2, 2, 0, null, alpha, false);
          drawSprExt(ctx, 'spr_afinal_orbwing', af, x - 110, y - 52, 2, 2, 0, hsvCss(this.time * 10, 72, 42), alpha, false);
          drawSprExt(ctx, 'spr_afinal_orbwing', af, x + 108, y - 52, -2, 2, 0, hsvCss(this.time * 10, 72, 42), alpha, false);
          drawSprExt(ctx, 'spr_afinal_stem', af, x - 2, y + 146, 2, 2, 0, null, alpha, true);
          drawSprExt(ctx, 'spr_afinal_orb', af, x - 2, y + 68, 2, 2, 0, null, alpha, true);
          drawSprExt(ctx, 'spr_afinal_arm', af, x - 58 + rx, y + 56 + bob * 2 + ry, 2, 2, armRot, null, alpha, true);
          drawSprExt(ctx, 'spr_afinal_arm', af, x + 56 + rx, y + 56 + bob * 2 + ry, -2, 2, -armRot, null, alpha, true);
          drawSprExt(ctx, 'spr_afinal_shoulder', af, x - 84, y + 32, 2, 2, 0, null, alpha, false);
          drawSprExt(ctx, 'spr_afinal_shoulder', af, x + 82, y + 32, -2, 2, 0, null, alpha, false);
        }
        const fSpr = this.asrielCry === 2 ? 'spr_afinal_face_cry2' : (this.asrielCry === 1 ? 'spr_afinal_face_cry' : 'spr_afinal_face');
        drawSprExt(ctx, fSpr, Math.floor(this.time / 4), x + rx * 0.3, y + ry * 0.3, 2, 2, 0, null, 1, true);

        // Finale LastBeam Arm-Charge Concentric Rings + Spr_Beamcircle Orbs!
        if (this.lastBeam && this.p2RadiAlpha > 0.05 && this.p2Radi > 2) {
          const radAng = (-this.p2ArmRot - 90) * Math.PI / 180;
          const armx = Math.cos(radAng) * 145;
          const army = -Math.sin(radAng) * 145;
          const rCur = this.p2Radi + Math.sin(this.time * 0.6) * (this.p2Radi / 8);
          ctx.save();
          ctx.globalAlpha = this.p2RadiAlpha;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          for (const ox of [x + 56 + armx, x - 58 - armx]) {
            const oy = y + 56 + army;
            ctx.beginPath(); ctx.arc(ox, oy, Math.max(2, rCur), 0, Math.PI * 2); ctx.stroke();
            const scOrb = Math.max(0.4, (2 * rCur) / 40);
            drawSprExt(ctx, 'spr_beamcircle', 0, ox, oy, scOrb, scOrb, 0, '#ffffff', this.p2RadiAlpha, true);
          }
          ctx.restore();
        }
      },

      drawLostSoulBoss(ctx) {
        const k = this.activeLostSoul;
        const jx = (Math.random() - 0.5) * 1.5;
        const lsTarget = k === 'parents' ? 4 : 3;
        const tint = this.lsActDone >= lsTarget ? null : '#cfcfcf';
        let faceRect = null;
        if (k === 'undyne') {
          drawSprExt(ctx, 'spr_undyneb_noanim', 0, 265 + jx, 42, 2, 2, 0, tint);
          faceRect = { x: 274, y: 58, w: 68, h: 36 };
        } else if (k === 'alphys') {
          drawSprExt(ctx, 'spr_alphyshelper_a', Math.floor(this.time / 12) % 2, 255 + jx, 82, 2, 2, 0, tint);
          faceRect = { x: 280, y: 102, w: 72, h: 30 };
        } else if (k === 'skelebros') {
          drawSprExt(ctx, 'spr_sansb_legs', 0, 210 + jx, 165, 2, 2, 0, tint, 1, true);
          drawSprExt(ctx, 'spr_sansb_torso', 0, 210 + jx, 128, 2, 2, 0, tint, 1, true);
          drawSprExt(ctx, 'spr_sansb_face', 0, 210 + jx, 96, 2, 2, 0, tint, 1, true);
          drawSprExt(ctx, 'spr_papyrusboss', 0, 355 + jx, 38, 1, 1, 0, tint);
          faceRect = { x: 184, y: 78, w: 54, h: 28 };
        } else if (k === 'parents') {
          drawSprExt(ctx, 'spr_torielboss', 0, 170 + jx, 46, 1, 1, 0, tint);
          drawSprExt(ctx, 'spr_asgore_wrap', 0, 326 + jx, 40, 1.75, 1.75, 0, tint);
          drawSprExt(ctx, this.lsActDone >= lsTarget ? 'spr_asgore_wrapshock' : 'spr_asgore_wrapface', 0, 378 + jx, 52, 1.75, 1.75, 0, tint);
          faceRect = { x: 182, y: 70, w: 46, h: 22 };
        }
        // Canonical Lost Soul flickering dark eye-mask / static bar (removed when Saved!)
        if (this.lsActDone < lsTarget && faceRect) {
          const rects = [faceRect];
          if (k === 'skelebros') rects.push({ x: 384, y: 62, w: 58, h: 28 });
          if (k === 'parents') rects.push({ x: 388, y: 86, w: 58, h: 24 });
          ctx.save();
          for (const rc of rects) {
            ctx.fillStyle = '#000';
            ctx.fillRect(rc.x, rc.y, rc.w, rc.h);
            ctx.fillStyle = 'rgba(255,255,255,0.65)';
            for (let i = 0; i < 6; i++) {
              const sy = rc.y + Math.random() * rc.h;
              const sw = 10 + Math.random() * (rc.w - 14);
              ctx.fillRect(rc.x + Math.random() * (rc.w - sw), sy, sw, 2);
            }
          }
          ctx.restore();
        }
      },

      drawHyperGoner(ctx) {
        const Gg = this.goner;
        const al = Gg.hgAlpha;
        if (Gg.stage < 2) {
          drawSprExt(ctx, 'spr_hg_leftovers', 0, 176, 16 + Gg.faceY / 6, 2, 2, 0, null, al);
          drawSprExt(ctx, 'spr_hg_horns', 0, 176, 16 - Gg.faceY / 2, 2, 2, 0, null, al);
          drawSprExt(ctx, 'spr_hg_jaws', Math.floor(this.time / 4), 280, 264 - Gg.faceY / 2, 2, 2, 0, null, al);
          drawSprExt(ctx, 'spr_hg_mainface', 0, 264, 88 + Gg.faceY, 2, Math.max(0.4, 2 + Gg.faceScale), 0, null, al);
        } else {
          // Canonical scr_fx_waver_scanline over spr_hg_laughing + 20 radial suction streaks!
          const lg = SPR['spr_hg_laughing'];
          if (lg && lg.img.complete && lg.img.naturalWidth) {
            ctx.save();
            ctx.globalAlpha = al;
            const amp = Math.min(44, 6 + Gg.cCounter * 0.35);
            for (let sy = 0; sy < lg.h; sy += 2) {
              const ox = Math.sin((sy + Gg.cCounter * 3) / 10) * amp;
              ctx.drawImage(lg.img, 0, sy, lg.w, 2, 160 + ox, 16 + sy * 2, lg.w * 2, 4);
            }
            ctx.restore();
          }
          // 20 white/gray radial vortex suction lines from all 4 screen edges toward (320, 240)
          ctx.save();
          ctx.globalAlpha = Math.max(0.25, 1 - al);
          ctx.lineWidth = 2;
          for (let i = 0; i < 20; i++) {
            const cx = 320 + (Math.random() - 0.5) * 18;
            const cy = 240 + (Math.random() - 0.5) * 18;
            let ex = 0, ey = 0;
            const side = i % 4;
            if (side === 0) { ex = Math.random() * 640; ey = 480; }
            else if (side === 1) { ex = Math.random() * 640; ey = 0; }
            else if (side === 2) { ex = 0; ey = Math.random() * 480; }
            else { ex = 640; ey = Math.random() * 480; }
            const g = ctx.createLinearGradient(cx, cy, ex, ey);
            g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#777777');
            ctx.strokeStyle = g;
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
          }
          // Center singularity hazard ring
          ctx.globalAlpha = 1;
          ctx.strokeStyle = '#008000';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(320, 240, Gg.rad, 0, Math.PI * 2); ctx.stroke();
          // Growing white vortex sphere (cCounter > 110)
          if (Gg.cCounter > 110) {
            ctx.fillStyle = `rgba(255,255,255,${Math.min(1, (Gg.cCounter - 110) / 55)})`;
            ctx.beginPath(); ctx.arc(320, 240, (Gg.cCounter - 110) * 1.4, 0, Math.PI * 2); ctx.fill();
          }
          ctx.restore();
        }
      },

      drawBulletsAndBeams(ctx) {
        for (const o of this.blastOrbs) {
          drawSprExt(ctx, 'spr_beamcircle', 0, o.x, o.y, o.sc, o.sc, 0, hsvCss(o.hue, 95, 70), o.alpha, true);
        }
        if (this.ultTarget && this.currentAtk === 'p2_comets') {
          drawSprExt(ctx, 'spr_redtarget', 0, this.ultTarget.x, this.ultTarget.y, 2, 2, 0, '#ff4040', 0.55, false);
        }

        // Chaos Saber / Slicer pure white crescent smears & blade extending into box (IMG_9415 & IMG_9416)
        if (this.mode === 'p1' && this.sabers && this.sabers.armed && this.asAlpha > 0.02) {
          const S = this.sabers;
          const ax = this.asX, al = this.asAlpha;
          const ay = this.asY + (this.transformStretch > 0 ? Math.sin(this.time / 3) * 0.5 : 0);
          if (S.smearAlpha > 0.05) {
            if (S.smearSide === 0 || S.smearSide === 2) {
              drawSprExt(ctx, 'spr_asriel_swordsmear', 0, ax - 14, ay - 52, -1.45, 2.02, 0, '#ffffff', S.smearAlpha, false);
            }
            if (S.smearSide === 1 || S.smearSide === 2) {
              drawSprExt(ctx, 'spr_asriel_swordsmear', 0, ax + 14, ay - 52, 1.45, 2.02, 0, '#ffffff', S.smearAlpha, false);
            }
          }
          if (S.swordSpriteTimer > 0) {
            const bladeSpr = S.twinklesSpawned ? 'spr_asriel_swordextend_shatter' : 'spr_asriel_swordextend';
            if (S.twinklesSpawned) {
              drawSprExt(ctx, bladeSpr, 0, ax - 36, ay + 46, 2, 2.05, 0, null, al, true);
              drawSprExt(ctx, bladeSpr, 0, ax + 36, ay + 46, -2, 2.05, 0, null, al, true);
            } else if (S.curSide === 0) {
              drawSprExt(ctx, bladeSpr, 0, ax - 36, ay + 44, 2, 2.05, 0, null, al, true);
            } else {
              drawSprExt(ctx, bladeSpr, 0, ax + 36, ay + 44, -2, 2.05, 0, null, al, true);
            }
          }
        }

        ctx.fillStyle = '#ffff40';
        for (const s of this.playerShots) ctx.fillRect(s.x - 2, s.y - 8, 4, 14);

        for (const b of this.bullets) {
          if (b.type === 'stormstar') {
            // Canonical obj_stormstar: pastel trailing silhouettes + clean unoccluded star (IMG_9421)
            const sc = b.big ? 0.96 : 0.64;
            const col = hsvCss(b.hue, 50, 78);
            if (b.prevs[4]) drawSprExt(ctx, 'spr_stormstar', 1, b.prevs[4].x, b.prevs[4].y, sc, sc, b.rot, col, 0.35, true);
            if (b.prevs[2]) drawSprExt(ctx, 'spr_stormstar', 1, b.prevs[2].x, b.prevs[2].y, sc, sc, b.rot, col, 0.5, true);
            drawSprExt(ctx, b.big ? 'spr_stormstar_b' : 'spr_stormstar', 0, b.x, b.y, sc, sc, b.rot, col, 1, true);
          } else if (b.type === 'explodestar') {
            drawSprExt(ctx, b.big ? 'spr_stormstar_b' : 'spr_stormstar', 0, b.x, b.y, b.sc * 0.72, b.sc * 0.72, b.rot, '#ffffff', b.alpha, true);
          } else if (b.type === 'starburst') {
            drawSprExt(ctx, 'spr_regstar', 0, b.x, b.y, 0.85, 0.85, b.rot, '#ffffff', 1, true);
          } else if (b.type === 'warnbolt') {
            drawSprExt(ctx, 'spr_rainbowtarget', Math.floor(this.time / 2) % 2, b.x, b.y, b.giga ? 3 : 2, b.giga ? 3 : 2, 0, null, 1, true);
          } else if (b.type === 'bolt') {
            // Canonical obj_rainbowbolt: actual spr_rainbowbolt + pure white core flash clamped above HUD!
            const col = hsvCss(b.hue, 88, 65);
            drawSprExt(ctx, 'spr_rainbowbolt', b.frame, b.x, -10, b.scX, 1.98, 0, col, b.alpha, true);
            if (b.alpha > 0.78) {
              ctx.save();
              ctx.fillStyle = `rgba(255,255,255,${Math.min(1, (b.alpha - 0.7) * 3)})`;
              const rw = 24 * b.scX;
              ctx.fillRect(b.x - rw / 2, 0, rw, 390);
              ctx.restore();
            }
          } else if (b.type === 'saberslash') {
            ctx.fillStyle = 'rgba(255,255,255,0.16)';
            ctx.fillRect(b.x, b.y, b.w, b.h);
          } else if (b.type === 'swordtwinkle') {
            drawSprExt(ctx, 'spr_asriel_swordtwinkle', 0, b.x, b.y, 2, 2, b.rot, '#ffffff', b.alpha, true);
          } else if (b.type === 'gunbolt') {
            drawSprExt(ctx, 'spr_asriel_gunbolt', 0, b.x, b.y, 1.35, 1.35, b.deg + (this.time * (b.spin || 6)), '#ffffff', 1, true);
          } else if (b.type === 'hgdebris') {
            drawSprExt(ctx, 'spr_hg_debris_small', 0, b.x, b.y, b.sc, b.sc, this.time * 16, '#ffffff', 0.92, true);
          } else if (b.type === 'ult_comet') {
            const h = b.hist;
            ctx.save();
            ctx.lineCap = 'round';
            for (let i = 0; i < h.length - 1; i++) {
              const frac = 1 - i / (h.length - 1);
              ctx.strokeStyle = hsvCss(b.hue + i * 6, 70, 82);
              ctx.globalAlpha = 0.25 + frac * 0.65;
              ctx.lineWidth = Math.max(0.7, frac * 4.2);
              ctx.beginPath();
              ctx.moveTo(h[i].x, h[i].y);
              ctx.lineTo(h[i + 1].x, h[i + 1].y);
              ctx.stroke();
            }
            ctx.restore();
            const deg = -Math.atan2(b.vy, b.vx) * 180 / Math.PI;
            drawSprExt(ctx, 'spr_ultimabullet', 0, b.x, b.y, 0.88, 0.88, deg, hsvCss(b.hue, 45, 90), 1, true);
          } else if (b.type === 'chaosbomb') {
            drawSprExt(ctx, 'spr_chaosbomb', 0, b.x, b.y, b.sc, b.sc, b.angle, hsvCss(b.hue, 90, 70), b.alpha, true);
          } else if (b.type === 'dreemurr_fire' || b.type === 'cry_fire' || b.type === 'ls_fire') {
            const al = b.type === 'cry_fire' ? 0.72 : 1;
            drawSprExt(ctx, 'spr_firebullet', Math.floor(this.time / 2) % 2, b.x - 8, b.y - 8, 1, 1, 0, null, al, false);
          } else if (b.type === 'ls_arrow') {
            drawSprExt(ctx, 'spr_spearsaver', 0, b.x, b.y, 0.45, 0.45, -b.dir * 90 + 180, '#40e8ff', 1, false);
          } else if (b.type === 'ls_zap') {
            drawSprExt(ctx, 'spr_litsaver', 0, b.x - 7, b.y - 12, 0.6, 0.25, 0, b.destructible ? '#ffe840' : '#ff4040', 1, false);
          } else if (b.type === 'ls_bone') {
            drawSprExt(ctx, 'spr_s_bonewall', 0, b.x, b.y, 1, b.h / 50, 0, '#ffffff', 1, false);
          }
        }

        // Chaos Buster target laser lines + massive rainbow blast beam
        if (this.gun) {
          const gn = this.gun;
          const mDist = 112;
          const bx0 = gn.bx + Math.cos(gn.angle) * mDist;
          const by0 = gn.by + Math.sin(gn.angle) * mDist;
          if (gn.aimFlash > 0) {
            ctx.save();
            ctx.strokeStyle = this.time % 3 === 0 ? '#ff3030' : (this.time % 3 === 1 ? '#ffa020' : '#ffff30');
            ctx.lineWidth = 2;
            const n = gn.lines || 3;
            const spread = gn.hard ? 0.28 : 0.34;
            for (let i = 0; i < n; i++) {
              const a = gn.angle + (i - (n - 1) / 2) * spread;
              ctx.beginPath(); ctx.moveTo(bx0, by0);
              ctx.lineTo(bx0 + Math.cos(a) * 580, by0 + Math.sin(a) * 580);
              ctx.stroke();
            }
            ctx.restore();
          }
          if (gn.blasting && gn.beamW > 1) {
            ctx.save();
            const bx1 = bx0 + Math.cos(gn.angle) * 620;
            const by1 = by0 + Math.sin(gn.angle) * 620;
            const px = -Math.sin(gn.angle), py = Math.cos(gn.angle);
            const grad = ctx.createLinearGradient(bx0, by0, bx0 + Math.cos(gn.angle) * 260, by0 + Math.sin(gn.angle) * 260);
            grad.addColorStop(0, hsvCss((gn.beamTimer * 24) % 360, 95, 58));
            grad.addColorStop(0.5, hsvCss((gn.beamTimer * 24 + 65) % 360, 95, 62));
            grad.addColorStop(1, hsvCss((gn.beamTimer * 24 + 130) % 360, 95, 58));
            ctx.lineCap = 'butt';
            ctx.strokeStyle = grad;
            ctx.lineWidth = gn.beamW;
            ctx.beginPath(); ctx.moveTo(bx0, by0); ctx.lineTo(bx1, by1); ctx.stroke();
            ctx.lineWidth = gn.beamW * 0.42;
            ctx.strokeStyle = hsvCss((gn.beamTimer * 24 + 30) % 360, 90, 74);
            ctx.beginPath(); ctx.moveTo(bx0 + px * 4, by0 + py * 4); ctx.lineTo(bx1 + px * 4, by1 + py * 4); ctx.stroke();
            ctx.restore();
          }
        }
      },

      drawFinalRainbowLaser(ctx) {
        const lb = this.lastBeam;
        const wob = Math.sin(this.time) * 26;
        ctx.save();
        ctx.globalAlpha = 0.78;
        ctx.fillStyle = hsvCss(this.time * 24, 95, 62);
        ctx.beginPath();
        ctx.moveTo(320, 128);
        ctx.lineTo(320 - lb.bw - wob, 490);
        ctx.lineTo(320 + lb.bw + wob, 490);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = hsvCss(this.time * 24 + 60, 95, 72);
        ctx.beginPath();
        ctx.moveTo(320, 128);
        ctx.lineTo(320 - lb.bw * 0.55 + wob * 0.5, 490);
        ctx.lineTo(320 + lb.bw * 0.55 - wob * 0.5, 490);
        ctx.closePath();
        ctx.fill();

        drawSprExt(ctx, 'spr_beamcircle', 0, 320, 128, 7 + Math.sin(this.time) * 2.5, 7 + Math.sin(this.time) * 2.5, 0, '#ffffff', 0.85, true);
        ctx.restore();
      },
    };
  }

  window.UTAsrielEngine = { createAsrielBattle };
})();
