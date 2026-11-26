// Complete Authentic Bilingual (EN / 繁中) Script, Items, Monsters & Full Ruins + Snowdin + Genocide Walkthrough
window.UT_ITEMS = {
  Candy:      { en: "Monster Candy",    zh: "怪物糖果",   short: "MnstrCndy", type: "heal",   hp: 10, descEn: "* Heals 10 HP\n* Has a distinct, non-licorice\n  flavor.", descZh: "* 恢復 10 HP\n* 有著獨特的非甘草風味。" },
  Donut:      { en: "Spider Donut",     zh: "蜘蛛甜甜圈", short: "SpidrDont", type: "heal",   hp: 12, descEn: "* Heals 12 HP\n* A donut made with Spider Cider\n  in the batter.", descZh: "* 恢復 12 HP\n* 麵糊裡摻了蜘蛛蘋果汁的甜甜圈。" },
  Cider:      { en: "Spider Cider",     zh: "蜘蛛蘋果汁", short: "SpidrCidr", type: "heal",   hp: 24, descEn: "* Heals 24 HP\n* Made with whole spiders,\n  not just the juice.", descZh: "* 恢復 24 HP\n* 用整隻蜘蛛鮮榨而成。" },
  Pie:        { en: "Butterscotch Pie", zh: "奶油肉桂派", short: "ButtsPie",  type: "heal",   hp: 99, descEn: "* All HP\n* Butterscotch-cinnamon pie,\n  one slice.", descZh: "* 恢復全部 HP\n* 一片溫暖的奶油糖肉桂派。" },
  Bandage:    { en: "Bandage",          zh: "繃帶",       short: "Bandage",   type: "heal",   hp: 10, descEn: "* Heals 10 HP\n* It has already been used\n  several times.", descZh: "* 恢復 10 HP\n* 看起來已經重複用過好幾次了。" },
  Stick:      { en: "Stick",            zh: "木枝",       short: "Stick",     type: "weapon", atk: 0, descEn: "* Weapon AT 0\n* Its bark is worse than\n  its bite.", descZh: "* 武器 AT 0\n* 叫聲比咬人還兇的樹枝。" },
  ToyKnife:   { en: "Toy Knife",        zh: "玩具刀",     short: "Toy Knife", type: "weapon", atk: 3, descEn: "* Weapon AT 3\n* Made of plastic. A rarity\n  nowadays.", descZh: "* 武器 AT 3\n* 塑膠製的玩具刀，如今相當罕見。" },
  Ribbon:     { en: "Faded Ribbon",     zh: "褪色緞帶",   short: "Ribbon",    type: "armor",  def: 3, descEn: "* Armor DF 3\n* If you're cuter, monsters\n  won't hit you as hard.", descZh: "* 防具 DF 3\n* 變可愛的話，怪物下手也會輕一點。" },
  ToughGlove: { en: "Tough Glove",      zh: "粗皮手套",   short: "TuffGlove", type: "weapon", atk: 5, descEn: "* Weapon AT 5\n* A worn pink leather glove.\n* For five-fingered folk.", descZh: "* 武器 AT 5\n* 磨損的粉紅皮手套（攻擊時可連按 Z 出拳！）。" },
  Bandanna:   { en: "Manly Bandanna",   zh: "男子漢頭巾", short: "Mandanna",  type: "armor",  def: 7, descEn: "* Armor DF 7\n* It has seen some wear.\n* It has abs drawn on it.", descZh: "* 防具 DF 7\n* 上面畫著帥氣腹肌的頭巾。" },
  SnowPiece:  { en: "Snowman Piece",    zh: "雪人碎片",   short: "SnowPiece", type: "heal",   hp: 45, descEn: "* Heals 45 HP\n* Please take this to the ends\n  of the earth.", descZh: "* 恢復 45 HP\n* 請帶著它走向世界的盡頭。" },
  NiceCream:  { en: "Nice Cream",       zh: "好棒冰淇淋", short: "NiceCream", type: "heal",   hp: 15, descEn: "* Heals 15 HP\n* Instead of a joke, the wrapper\n  says something nice.", descZh: "* 恢復 15 HP\n* 包裝紙上寫著溫暖稱讚你的話語。" },
  Bisicle:    { en: "Bisicle",          zh: "雙生冰棒",   short: "Bisicle",   type: "heal",   hp: 11, nextItem: "Unisicle", descEn: "* Heals 11 HP\n* It's a two-pronged popsicle,\n  so you can eat it twice.", descZh: "* 恢復 11 HP (可吃兩次！)\n* 雙叉冰棒，吃一半還能留一半。" },
  Unisicle:   { en: "Unisicle",         zh: "單支冰棒",   short: "Unisicle",  type: "heal",   hp: 11, descEn: "* Heals 11 HP\n* It's a single-pronged popsicle.\n* Wait, that's just normal...", descZh: "* 恢復 11 HP\n* 吃剩一半的單支冰棒。" },
  CinnaBun:   { en: "Cinnamon Bun",     zh: "肉桂捲",     short: "CinnaBun",  type: "heal",   hp: 22, descEn: "* Heals 22 HP\n* A cinnamon roll in the shape\n  of a bunny.", descZh: "* 恢復 22 HP\n* 烤成兔子形狀的香甜肉桂捲。" }
};

window.UT_MONSTERS = {
  dummy: {
    nameEn: "Dummy", nameZh: "訓練假人", spr: "spr_dummybattle", hp: 15, maxHp: 15, atk: 0, def: 0, exp: 0, gold: 0, bgm: "dummy",
    encounterEn: "* You encountered the Dummy.", encounterZh: "* 你遭遇了訓練用假人。",
    idleEn: ["* The Dummy stands still.", "* The Dummy looks like it's\n  about to fall over."],
    idleZh: ["* 假人靜靜地站著。", "* 假人看起來隨時會倒下。"],
    acts: [
      { id: "check", en: "Check", zh: "查看" },
      { id: "talk",  en: "Talk",  zh: "交談" }
    ]
  },
  froggit: {
    nameEn: "Froggit", nameZh: "蛙吉特", spr: "spr_froggit", hp: 30, maxHp: 30, atk: 4, def: 4, exp: 3, gold: 4, bgm: "battle",
    encounterEn: "* Froggit hopped close!", encounterZh: "* Froggit 蹦了過來！",
    idleEn: ["* Froggit doesn't seem to\n  know why it's here.", "* Froggit hops to and fro.", "* The battlefield is filled\n  with the smell of mustard\n  seed."],
    idleZh: ["* Froggit 似乎不知道自己\n  為什麼在這。", "* Froggit 左右蹦蹦跳跳。", "* 戰場上瀰漫著芥末籽的氣味。"],
    acts: [
      { id: "check",      en: "Check",      zh: "查看" },
      { id: "compliment", en: "Compliment", zh: "稱讚" },
      { id: "threat",     en: "Threat",     zh: "威嚇" }
    ]
  },
  whimsun: {
    nameEn: "Whimsun", nameZh: "微風妖", spr: "spr_whimsun", hurtSpr: "spr_whimsunhurt", hp: 10, maxHp: 10, atk: 4, def: 0, exp: 2, gold: 2, bgm: "battle", spareStart: true,
    encounterEn: "* Whimsun appeared meekly.", encounterZh: "* Whimsun 怯生生地出現了。",
    idleEn: ["* Whimsun keeps muttering\n  'I'm sorry' under its breath.", "* Whimsun avoids eye contact.", "* Whimsun is hyperventilating."],
    idleZh: ["* Whimsun 小聲喃喃著\n  「對不起……」。", "* Whimsun 不敢直視你的眼睛。", "* Whimsun 緊張得快喘不過氣。"],
    acts: [
      { id: "check",     en: "Check",     zh: "查看" },
      { id: "console",   en: "Console",   zh: "安慰" },
      { id: "terrorize", en: "Terrorize", zh: "嚇唬" }
    ]
  },
  moldsmal: {
    nameEn: "Moldsmal", nameZh: "果凍怪", spr: "spr_moldsmal", hp: 50, maxHp: 50, atk: 6, def: 0, exp: 3, gold: 3, bgm: "battle", spareStart: true,
    encounterEn: "* Moldsmal blocked the way!", encounterZh: "* Moldsmal 擋住了去路！",
    idleEn: ["* Moldsmal burbles quietly.", "* Moldsmal waits pensively.", "* The aroma of lime gelatin\n  wafts through."],
    idleZh: ["* Moldsmal 發出咕嚕咕嚕的聲音。", "* Moldsmal 若有所思地晃動。", "* 空氣中飄著萊姆果凍的香氣。"],
    acts: [
      { id: "check",   en: "Check",   zh: "查看" },
      { id: "imitate", en: "Imitate", zh: "模仿" },
      { id: "flirt",   en: "Flirt",   zh: "調情" }
    ]
  },
  loox: {
    nameEn: "Loox", nameZh: "獨眼怪", spr: "spr_loox", hurtSpr: "spr_looxhurt", hp: 50, maxHp: 50, atk: 6, def: 4, exp: 7, gold: 5, bgm: "battle",
    encounterEn: "* Loox drew near!", encounterZh: "* Loox 靠了過來！",
    idleEn: ["* Loox is gazing at you.", "* Loox gnashes its teeth.", "* Smells like eyedrops."],
    idleZh: ["* Loox 正盯著你看。", "* Loox 咬牙切齒。", "* 聞起來像眼藥水。"],
    acts: [
      { id: "check",    en: "Check",         zh: "查看" },
      { id: "dontpick", en: "Don't Pick On", zh: "不欺負牠" },
      { id: "pickon",   en: "Pick On",       zh: "捉弄牠" }
    ]
  },
  vegetoid: {
    nameEn: "Vegetoid", nameZh: "蔬菜怪", spr: "spr_vegetoid", hurtSpr: "spr_vegetoidhurt", hp: 72, maxHp: 72, atk: 6, def: 6, exp: 6, gold: 4, bgm: "battle",
    encounterEn: "* Vegetoid came out of the\n  earth!", encounterZh: "* Vegetoid 從土裡鑽了出來！",
    idleEn: ["* Vegetoid's here for your\n  health.", "* Vegetoid gives a mysterious\n  chuckle.", "* Smells like steamed carrots."],
    idleZh: ["* Vegetoid 關心你的飲食均衡。", "* Vegetoid 發出神秘的笑聲。", "* 聞起來像蒸紅蘿蔔。"],
    acts: [
      { id: "check",  en: "Check",  zh: "查看" },
      { id: "dinner", en: "Dinner", zh: "開飯" },
      { id: "devour", en: "Devour", zh: "啃咬" }
    ]
  },
  migosp: {
    nameEn: "Migosp", nameZh: "米戈蟲", spr: "spr_migosphappy", hurtSpr: "spr_migosphurt", hp: 40, maxHp: 40, atk: 5, def: 4, exp: 5, gold: 4, bgm: "battle", spareStart: true,
    encounterEn: "* Migosp crawled up close!", encounterZh: "* Migosp 爬了過來！",
    idleEn: ["* Migosp is swinging happily\n  all by itself!", "* Migosp gives a carefree\n  wiggle."],
    idleZh: ["* Migosp 自顧自開心地跳舞！", "* Migosp 無憂無慮地扭動身體。"],
    acts: [
      { id: "check", en: "Check", zh: "查看" },
      { id: "talk",  en: "Talk",  zh: "交談" }
    ]
  },
  blook: {
    nameEn: "Napstablook", nameZh: "納普斯特", spr: "spr_napstabattle", hp: 88, maxHp: 88, atk: 5, def: 4, exp: 0, gold: 0, bgm: "ghost",
    encounterEn: "* Here comes Napstablook.", encounterZh: "* Napstablook 飄了過來。",
    idleEn: ["* Napstablook is staring into\n  the distance.", "* Napstablook looks just a\n  little bit better.", "* Napstablook weighs anchor."],
    idleZh: ["* Napstablook 望向遠方發呆。", "* Napstablook 看起來心情好一點點了。", "* Napstablook 輕輕飄浮著。"],
    acts: [
      { id: "check",  en: "Check",  zh: "查看" },
      { id: "cheer",  en: "Cheer",  zh: "鼓勵" },
      { id: "flirt",  en: "Flirt",  zh: "調情" },
      { id: "threat", en: "Threat", zh: "威嚇" }
    ]
  },
  toriel: {
    nameEn: "Toriel", nameZh: "托麗爾", spr: "spr_torielboss", hurtSpr: "spr_torielboss_hurt", hp: 440, maxHp: 440, atk: 6, def: 1, exp: 150, gold: 0, bgm: "heartache",
    encounterEn: "* Toriel blocks the way!", encounterZh: "* 托麗爾擋住了去路！",
    idleEn: ["* Toriel blocks the way!", "* Toriel looks through you.", "* Toriel is preparing a\n  magical attack.", "* Toriel takes a deep breath."],
    idleZh: ["* 托麗爾擋住了去路！", "* 托麗爾將視線穿過了你。", "* 托麗爾正在凝聚火焰魔法。", "* 托麗爾深深吸了一口氣。"],
    acts: [
      { id: "check", en: "Check", zh: "查看" },
      { id: "talk",  en: "Talk",  zh: "交談" }
    ]
  },
  // SNOWDIN MONSTERS & BOSSES
  snowdrake: {
    nameEn: "Snowdrake", nameZh: "雪鳥怪", spr: "spr_snowdrake", hp: 74, maxHp: 74, atk: 6, def: 2, exp: 22, gold: 18, bgm: "battle",
    encounterEn: "* Snowdrake fluttered forth!", encounterZh: "* Snowdrake 拍著翅膀現身了！",
    idleEn: ["* Snowdrake is assessing the\n  crowd.", "* Snowdrake is thinking up its\n  next ice pun.", "* Smells like a wet pillow."],
    idleZh: ["* Snowdrake 正在觀察觀眾反應。", "* Snowdrake 正在構思下一個冰雪冷笑話。", "* 聞起來像潮濕的羽絨枕頭。"],
    acts: [
      { id: "check",  en: "Check",  zh: "查看" },
      { id: "laugh",  en: "Laugh",  zh: "捧場大笑" },
      { id: "heckle", en: "Heckle", zh: "吐槽喝倒采" }
    ]
  },
  icecap: {
    nameEn: "Ice Cap", nameZh: "冰帽怪", spr: "spr_icecap", hurtSpr: "spr_icecaphurt", hp: 48, maxHp: 48, atk: 6, def: 0, exp: 17, gold: 17, bgm: "battle",
    encounterEn: "* Ice Cap struts into view.", encounterZh: "* Ice Cap 驕傲地走了出來。",
    idleEn: ["* Ice Cap is thinking about a\n  certain article of clothing.", "* Ice Cap wants its hat to be\n  admired.", "* It smells like frozen sweat."],
    idleZh: ["* Ice Cap 滿腦子都是頭上的冰帽。", "* Ice Cap 渴望有人注意牠的帽子。", "* 聞起來像結冰的汗水。"],
    acts: [
      { id: "check",      en: "Check",      zh: "查看" },
      { id: "ignore",     en: "Ignore",     zh: "無視帽子" },
      { id: "steal",      en: "Steal",      zh: "摘下冰帽" },
      { id: "compliment", en: "Compliment", zh: "稱讚" }
    ]
  },
  lesserdog: {
    nameEn: "Lesser Dog", nameZh: "小犬座衛兵", spr: "spr_lesserdoge", hurtSpr: "spr_lesserdogehurt", hp: 60, maxHp: 60, atk: 6, def: 0, exp: 18, gold: 15, bgm: "battle",
    encounterEn: "* Lesser Dog appears.", encounterZh: "* 小犬座衛兵出現了！",
    idleEn: ["* Lesser Dog is barking\n  excitedly!", "* Lesser Dog's neck keeps\n  growing longer with excitement!", "* Lesser Dog is going where no\n  dog has gone before."],
    idleZh: ["* 小犬座興奮地汪汪叫！", "* 小犬座因為太開心，脖子越伸越長！", "* 小犬座的脖子已經突破天際了！"],
    acts: [
      { id: "check",  en: "Check",  zh: "查看" },
      { id: "pet",    en: "Pet",    zh: "撫摸" },
      { id: "beckon", en: "Beckon", zh: "招手呼喚" }
    ]
  },
  gyftrot: {
    nameEn: "Gyftrot", nameZh: "禮鹿怪", spr: "spr_gyftrot", hp: 114, maxHp: 114, atk: 7, def: 3, exp: 35, gold: 30, bgm: "battle",
    encounterEn: "* Gyftrot confronts you!", encounterZh: "* Gyftrot 氣呼呼地擋在面前！",
    idleEn: ["* Gyftrot distrusts your\n  youthful demeanor.", "* Gyftrot stumbles beneath the\n  weight of its decorations.", "* Smells like pine needles."],
    idleZh: ["* Gyftrot 懷疑你也是來惡作劇的青少年。", "* 鹿角上掛滿了重物，讓牠搖搖晃晃。", "* 聞起來像松針與聖誕樹。"],
    acts: [
      { id: "check",      en: "Check",      zh: "查看" },
      { id: "undecorate", en: "Undecorate", zh: "取下鹿角裝飾" },
      { id: "gift",       en: "Gift",       zh: "送禮" }
    ]
  },
  doggo: {
    nameEn: "Doggo", nameZh: "道格 (盲劍犬)", spr: "spr_movedoge", hp: 70, maxHp: 70, atk: 6, def: 1, exp: 30, gold: 30, bgm: "battle",
    encounterEn: "* Doggo blocks the way!", encounterZh: "* 哨兵道格 (Doggo) 擋住了去路！",
    idleEn: ["* Doggo is looking around\n  suspiciously. (Don't move\n  during \\BBLUE\\W attacks!)", "* Doggo's ears twitch.\n  (Tip: Stand still for \\BBLUE\\W,\n  then choose ACT -> Pet!)", "* Doggo is trembling because\n  something petted him!"],
    idleZh: ["* 道格警惕地四處張望。\n  (看到\\B藍色攻擊\\W時請保持靜止不動！)", "* 道格的耳朵動了動。\n  (躲過藍刃後選擇 ACT -> 撫摸！)", "* 道格因為被摸了頭而激動發抖！"],
    acts: [
      { id: "check", en: "Check", zh: "查看" },
      { id: "pet",   en: "Pet",   zh: "撫摸" }
    ]
  },
  dogi: {
    nameEn: "Dogamy & Dogaressa", nameZh: "狗夫婦衛兵 (Dogi)", spr: "spr_mandoge", hp: 108, maxHp: 108, atk: 7, def: 4, exp: 60, gold: 50, bgm: "battle",
    encounterEn: "* Dogi assault you!", encounterZh: "* 皇家狗夫婦衛兵發動了突襲！",
    idleEn: ["* The Dogi are practicing for\n  the annual Nose Nuzzle\n  Championships.", "* The dogs are sniffing around\n  to identify your scent.", "* The Dogi realize you smell\n  like a lost puppy!"],
    idleZh: ["* 狗夫婦正在練習年度磨鼻子大賽。", "* 兩隻狗正用鼻子嗅聞你的氣味。", "* 狗夫婦把你當成迷路的小狗了！"],
    acts: [
      { id: "check",   en: "Check",       zh: "查看" },
      { id: "roll",    en: "Roll Around", zh: "在雪地打滾" },
      { id: "resniff", en: "Re-Sniff",    zh: "請牠們重聞" },
      { id: "pet",     en: "Pet",         zh: "撫摸兩隻狗" }
    ]
  },
  greaterdog: {
    nameEn: "Greater Dog", nameZh: "大犬座重甲衛兵", spr: "spr_greatdog", hp: 105, maxHp: 105, atk: 7, def: 4, exp: 80, gold: 60, bgm: "dogsong",
    encounterEn: "* It's the Greater Dog.", encounterZh: "* 大犬座重甲衛兵從雪堆裡鑽了出來！",
    idleEn: ["* Greater Dog is watching you\n  intently.", "* Greater Dog wants your\n  attention! (Try ACT -> Beckon\n  -> Pet -> Play -> Pet!)", "* Greater Dog curls up in your\n  lap happily!"],
    idleZh: ["* 大犬座目不轉睛地盯著你看。", "* 大犬座很想找你玩！\n  (依序選擇：招手 → 撫摸 → 丟雪球 → 撫摸！)", "* 大犬座開心地縮在你懷裡撒嬌！"],
    acts: [
      { id: "check",  en: "Check",  zh: "查看" },
      { id: "beckon", en: "Beckon", zh: "招手呼喚" },
      { id: "pet",    en: "Pet",    zh: "撫摸" },
      { id: "play",   en: "Play",   zh: "丟雪球陪玩" }
    ]
  },
  papyrus: {
    nameEn: "Papyrus", nameZh: "帕派瑞斯", spr: "spr_papyrusboss", hp: 680, maxHp: 680, atk: 8, def: 2, exp: 200, gold: 0, bgm: "nyeh",
    encounterEn: "* Papyrus blocks the way!", encounterZh: "* 偉大的帕派瑞斯擋住了去路！",
    idleEn: [
      "* Papyrus is preparing a bone\n  attack! (Press \\B[UP]\\W to jump\n  when your SOUL is \\BBLUE\\W!)",
      "* Papyrus rattles his bones.",
      "* Papyrus is styling his battle\n  body.",
      "* Papyrus is dabbing bone polish\n  behind his ear."
    ],
    idleZh: [
      "* 帕派瑞斯準備發動骨頭攻擊！\n  (當靈魂變成\\B藍色\\W時，按 \\B[上方向鍵]\\W 跳躍！)",
      "* 帕派瑞斯的骨頭喀啦作響。",
      "* 帕派瑞斯正擺出帥氣的戰鬥姿勢。",
      "* 帕派瑞斯偷偷在耳後噴了一點骨頭香水。"
    ],
    acts: [
      { id: "check",  en: "Check",  zh: "查看" },
      { id: "flirt",  en: "Flirt",  zh: "約會調情" },
      { id: "insult", en: "Insult", zh: "挑釁" }
    ]
  }
};

window.UT_WALKTHROUGH = [
  { id: 1,  room: 1,  titleEn: "01. Intro Story & Title", titleZh: "01. 開場傳說與標題", tipEn: "Watch the 11-panel legend of Humans & Monsters, or press [X] to skip straight to the Title Screen.", tipZh: "觀看人類與怪物的 11 幕傳說，或按 [X] 跳至標題畫面。" },
  { id: 4,  room: 4,  titleEn: "02. Golden Flower Bed (room_area1)", titleZh: "02. 金色花海 (room_area1)", tipEn: "Inspect the golden flowers with [Z], then walk right across the cavern to the purple archway.", tipZh: "按 [Z] 調查金黃色花海，接著往右走進紫色拱門。" },
  { id: 5,  room: 5,  titleEn: "03. Flowey & Toriel Rescue", titleZh: "03. 小花遭遇戰與托麗爾救援", tipEn: "Meet Flowey. Dodge or touch his 'friendliness pellets'—Toriel rescues you with fire magic and leads you into the Ruins.", tipZh: "遇見小花 Flowey。躲開或碰觸「友愛顆粒」，托麗爾會用火焰救下你並帶你進入遺跡。" },
  { id: 6,  room: 6,  titleEn: "04. Ruins Entrance & SAVE #1", titleZh: "04. 遺跡大階梯與存檔點 #1", tipEn: "Follow Toriel up the grand double staircase. Touch the glowing yellow star to SAVE your game!", tipZh: "跟隨托麗爾走上雙側大階梯，調查發光黃星即可存檔並回滿血。" },
  { id: 7,  room: 7,  titleEn: "05. Six Plates Puzzle (room_ruins2)", titleZh: "05. 六踏板謎題 (room_ruins2)", tipEn: "Toriel demonstrates stepping on the outer four floor switches and flips the lever to open the stone door.", tipZh: "托麗爾會親自示範踩下左右四個踏板並拉下牆上拉桿開門。" },
  { id: 8,  room: 8,  titleEn: "06. Bridges & Labeled Switches", titleZh: "06. 小橋與黃箭頭開關房", tipEn: "Cross both bridges and press the TWO wall switches marked with Toriel's yellow arrows to retract the spikes.", tipZh: "走過木橋，按下托麗爾畫了黃色箭頭標記的兩個牆壁開關即可收起地刺。" },
  { id: 9,  room: 9,  titleEn: "07. Dummy Practice Battle", titleZh: "07. 訓練假人戰鬥教學", tipEn: "Inspect the Dummy -> choose ACT -> Talk to end the fight peacefully and make Toriel proud!", tipZh: "調查假人進入戰鬥 → 選擇 ACT → Talk 與假人聊天即可和平過關！" },
  { id: 10, room: 10, titleEn: "08. Froggit & Spike Bridge", titleZh: "08. 青蛙遭遇與地刺吊橋", tipEn: "Walk north-east: Toriel glares at an approaching Froggit, then guides you across the retracting spike bridge.", tipZh: "托麗爾會用眼神嚇退 Froggit，接著引導你走過自動收起的地刺橋。" },
  { id: 11, room: 11, titleEn: "09. Independence Hall & Cell Phone", titleZh: "09. 獨立長廊與獲得手機", tipEn: "Walk all 2500px to the far right! Toriel pops out from behind the pillar and gives you the CELL PHONE ([C] Menu -> CELL).", tipZh: "獨自往右走到底！托麗爾會從柱子後現身並送你手機（按 [C] 開啟選單撥打）。" },
  { id: 12, room: 12, titleEn: "10. Leaf Pile Hub & Genocide Grinding", titleZh: "10. 落葉堆存檔點 & 屠殺線刷怪提示", tipEn: "SAVE at the star. Go NORTH for free Monster Candy, then SOUTHEAST. (For Genocide Route: defeat 20 monsters in the Ruins before Toriel until '* But nobody came.' appears!)", tipZh: "在落葉堆存檔，往北可拿怪物糖果。（若想走【屠殺線 Genocide】：在見托麗爾前於遺跡擊殺滿 20 隻怪物，直到出現「* 但是誰也沒有來。」！）" },
  { id: 14, room: 14, titleEn: "11. Cracked Floor Drop (room_ruins8)", titleZh: "11. 裂縫落穴房 (room_ruins8)", tipEn: "Step onto the cracked tiles to drop into the lower leaf room, then take the RIGHT doorway to climb up past the gap!", tipZh: "踩上裂縫掉進下層落葉房，走右側門即可爬回上層對岸！" },
  { id: 15, room: 15, titleEn: "12. First Rock & Pie Call", titleZh: "12. 推石謎題與口味電話", tipEn: "Answer Toriel's Cinnamon vs. Butterscotch call, then push the grey rock right onto the floor plate to lower the spikes.", tipZh: "接聽托麗爾詢問肉桂或奶油糖口味的電話，並將石頭往右推上踏板收起地刺。" },
  { id: 16, room: 16, titleEn: "13. Cracked Floor Leaf Maze", titleZh: "13. 裂縫迷宮（下層落葉提示）", tipEn: "Walk along the safe path (or fall 11 times to trigger Toby Fox's pit-disable mercy mechanic!) and exit right.", tipZh: "沿著上層安全路徑通過（或連續掉下去即可自動解除陷阱）並往右前進。" },
  { id: 17, room: 17, titleEn: "14. Three Rocks & Talking Rock", titleZh: "14. 三顆石頭與說話石頭", tipEn: "Push the top 2 rocks onto their plates, and press [Z] on the bottom Talking Rock so it slides onto the third plate!", tipZh: "把上方兩顆石頭推上踏板，再對最下方的說話石頭按 [Z] 請牠移上第三個踏板！" },
  { id: 19, room: 19, titleEn: "15. Napstablook Miniboss & Bake Sale", titleZh: "15. 幽靈 Napstablook 與蜘蛛義賣", tipEn: "Go EAST for Spider Bake Sale (7G Donut / 18G Cider). Inspect Napstablook -> ACT -> Cheer 3x -> Spare! (In Genocide, Napstablook vanishes automatically.)", tipZh: "往右可逛蜘蛛義賣。調查幽靈選擇 Cheer 鼓勵三次即可寬恕！（屠殺線中幽靈會自動消失。）" },
  { id: 22, room: 22, titleEn: "16. Six Pits & Secret Faded Ribbon", titleZh: "16. 六洞謎題與隱藏褪色緞帶", tipEn: "Drop into BOTTOM-LEFT pit for the Faded Ribbon (DF +3)! Drop into TOP-MIDDLE pit and flip the lever to retract the exit spikes!", tipZh: "跳進左下洞拿【褪色緞帶 (DF+3)】！跳進上排中間洞拉下隱藏拉桿即可收起出口地刺！" },
  { id: 23, room: 23, titleEn: "17. Rotating Perspective Switches (15A-D)", titleZh: "17. 旋轉視角四色開關房", tipEn: "Room 23 (15A): press BLUE switch. Room 24 (15B): press RED switch. Room 25 (15C): press GREEN switch. Room 26 (15D): walk east!", tipZh: "第 1 間按藍色開關 → 第 2 間按紅色開關 → 第 3 間按綠色開關 → 第 4 間直接往右過關！" },
  { id: 30, room: 30, titleEn: "18. City Balcony & Toy Knife", titleZh: "18. 地下古城陽台與玩具刀", tipEn: "From Crossroads (room 28), go EAST -> NORTH to reach the twilight balcony and pick up the Toy Knife (AT +3)!", tipZh: "在十字路口往右再往上走到古城陽台，拾取地上的【玩具刀 (AT+3)】！" },
  { id: 32, room: 32, titleEn: "19. Toriel's Home & Butterscotch Pie", titleZh: "19. 托麗爾的家與奶油肉桂派", tipEn: "Go RIGHT down the hallway into the first bedroom and SLEEP in the bed to receive the Butterscotch Pie!", tipZh: "往右走進臥室走廊（屠殺線照鏡子會顯示「是我，Chara。」），進第一間房睡覺可獲得奶油肉桂派！" },
  { id: 41, room: 41, titleEn: "20. Boss Toriel & Ruins Exit", titleZh: "20. 托麗爾 Boss 戰與離開遺跡", tipEn: "Pacifist: Choose MERCY -> Spare 13x. Genocide (20 kills): 1-hit critical strike (22,424 DMG)! Then pass Flowey in Room 43 to enter Snowdin!", tipZh: "和平線：持續選 MERCY -> Spare 13 次。屠殺線：一擊打出 22424 傷害！接著穿過 43 號房推開大門進入【雪町 Snowdin】！" },
  // SNOWDIN WALKTHROUGH (Rooms 44..81)
  { id: 44, room: 44, titleEn: "21. Snowdin Forest Entrance (room_tundra1)", titleZh: "21. 雪町森林入口 (room_tundra1)", tipEn: "Step out of the Ruins into the snowy woods. (Inspect the bush by the door to spot a hidden camera!) Walk east.", tipZh: "踏出遺跡大門進入白雪森林（門邊灌木叢藏著監視攝影機！），往右前進。" },
  { id: 45, room: 45, titleEn: "22. Sans's Handshake & Convenient Lamp", titleZh: "22. Sans 放屁墊握手與剛好形狀的檯燈", tipEn: "Walk east across the 2720px forest path. Sans snaps the heavy branch, shakes your hand with a whoopee cushion, and hides you behind the Conveniently-Shaped Lamp when Papyrus arrives!", tipZh: "往右走到木橋前，Sans 會從身後出現並用放屁墊跟你握手，接著在帕派瑞斯登場時叫你躲進「形狀剛好的檯燈」後面！" },
  { id: 46, room: 46, titleEn: "23. Box Road SAVE & Tough Glove", titleZh: "23. 箱子路存檔點與粗皮手套", tipEn: "SAVE at Box Road! Open the Dimensional Box [Z] to take the TOUGH GLOVE (AT +5, mash [Z] during attacks!). Optional: go north to Room 47 to inspect the fishing rod.", tipZh: "在箱子路存檔！調查次元箱 [Z] 取出【粗皮手套 (AT+5，攻擊時連按 Z 四連擊)】！（Snowdin 屠殺線需在此區擊殺 16 隻怪物。）" },
  { id: 48, room: 48, titleEn: "24. Doggo Sentry Mini-Boss (Blue Attack)", titleZh: "24. 盲劍犬道格 Doggo (藍色靜止教學)", tipEn: "Doggo can only see moving things! During his BLUE sword sweep, STAND COMPLETELY STILL to take 0 damage, then choose ACT -> Pet -> Spare!", tipZh: "道格只能看見移動的物體！當【藍色長刀】掃過時請保持完全靜止不動，接著選 ACT -> 撫摸 (Pet) 即可寬恕！" },
  { id: 49, room: 49, titleEn: "25. Invisible Electricity Maze", titleZh: "25. 隱形電擊迷宮（帕派瑞斯觸電）", tipEn: "Step toward the maze—because Papyrus is holding the electric orb, it shocks HIM instead and deactivates the maze!", tipZh: "踏進迷宮一步——因為拿著電球的是帕派瑞斯本人，電流反而電到他自己並直接解除了迷宮！" },
  { id: 50, room: 50, titleEn: "26. Sans's Word Search & The Snowman", titleZh: "26. Sans 填字遊戲與雪人碎片", tipEn: "Go NORTH into Room 51 first and talk to the Snowman to receive the SNOWMAN PIECE (heals 45 HP!), then go EAST past Sans's word search.", tipZh: "先往北走進 51 號房與雪人對話獲得【雪人碎片 (補 45 HP)】，再往右經過 Sans 的填字遊戲攤位。" },
  { id: 53, room: 53, titleEn: "27. Nice Cream Guy & Hidden Snow Switch", titleZh: "27. 好棒冰淇淋與雪地隱藏開關", tipEn: "Buy Nice Cream (15G, +15 HP) at the bottom-left, then inspect the snow near the trees by the right fence [Z] to uncover the hidden switch and lower the spikes!", tipZh: "可在左下角向兔耳小哥買好棒冰淇淋（15G），再調查右側柵欄樹下的雪堆 [Z] 按下隱藏開關收起地刺！" },
  { id: 55, room: 55, titleEn: "28. Dogamy & Dogaressa (Dogi Mini-Boss)", titleZh: "28. 皇家狗夫婦衛兵 Dogi 戰", tipEn: "In battle: choose ACT -> Roll Around (so you smell like a weird puppy!) -> Re-Sniff -> Pet -> Spare!", tipZh: "戰鬥中依序選擇：ACT -> 在雪地打滾 (Roll Around) → 請牠們重聞 (Re-Sniff) → 撫摸 (Pet) 即可和平過關！" },
  { id: 56, room: 56, titleEn: "29. Frozen Spaghetti & XO Puzzles (Rooms 56-59)", titleZh: "29. 結凍義大利麵與 XO 踩地磚謎題", tipEn: "SAVE by Papyrus's frozen spaghetti! In Rooms 57-59, step on the 'X' tiles to turn them into 'O's and press the switch (or in Genocide, walk right past them!).", tipZh: "在冷凍義大利麵旁存檔！在 57~59 號房踩過所有 X 地磚變為 O 後按下開關（屠殺線可直接無視謎題走過去！）。" },
  { id: 60, room: 60, titleEn: "30. Multicolor Tile Puzzle & Ice XO", titleZh: "30. 七彩地磚機與溜冰場謎題 (60-64)", tipEn: "Watch Papyrus's tile machine generate a straight line! Save at the Dog House (#61), slide across the Ice Entrance (#63) right into the Snow Poff zone (#66)!", tipZh: "帕派瑞斯的七彩地磚機會轉出一條直線讓你直接通過！在狗屋存檔後，滑過 63 號溜冰場前往雪堆房！" },
  { id: 66, room: 66, titleEn: "31. Snow Poffs & Greater Dog Mini-Boss", titleZh: "31. 雪球堆與大犬座重甲衛兵戰", tipEn: "Walk right to encounter Greater Dog! In battle: choose ACT -> Beckon -> Pet -> Play -> Pet -> Pet -> Spare! Then cross the Gauntlet Bridge (#67).", tipZh: "往右觸發大犬座重甲衛兵戰！依序選 ACT -> 招手 → 撫摸 → 丟雪球 → 撫摸兩次即可寬恕，再走過恐怖吊橋 (#67)。" },
  { id: 68, room: 68, titleEn: "32. Snowdin Town, Shop, Inn & Grillby's", titleZh: "32. 雪町鎮、商店、旅店與 Grillby 酒吧", tipEn: "Explore Snowdin Town! Visit the Shop (buy Manly Bandanna DF+7, Bisicle, Cinnamon Bun; or Steal in Genocide!), Snowed Inn, Grillby's, Librarby, and Sans & Papyrus's House!", tipZh: "探索雪町小鎮！可進商店買男子漢頭巾 (DF+7) 與雙生冰棒（屠殺線可洗劫商店！）、住旅店、逛 Grillby 酒吧與骷髏兄弟家！" },
  { id: 81, room: 81, titleEn: "33. Boss Papyrus (Blue SOUL Jump) & Finale", titleZh: "33. 帕派瑞斯最終 Boss 戰 (藍魂跳躍)", tipEn: "Walk east into the misty outskirts (#81) to face PAPYRUS! When your SOUL turns BLUE, press [UP] to jump over his bone waves and COOL DUDE attack! Spare him (or 1-hit kill in Genocide) and walk east to complete Snowdin!", tipZh: "往右走進濃霧郊外 (#81) 迎戰帕派瑞斯！當靈魂變成【藍色】時，按【上方向鍵】跳過骨頭海與 COOL DUDE 必殺技！戰勝後往右走即可完成雪町篇！" }
];

window.UT_DIALOGUE = {
  en: {
    introSlides: [
      "Long ago, two races\nruled over Earth:\nHUMANS and MONSTERS.",
      "One day, war broke\nout between the two\nraces.",
      "After a long battle,\nthe humans were\nvictorious.",
      "They sealed the monsters\nunderground with a magic\nspell.",
      "Many years later...",
      "      MT. EBOTT\n        201X",
      "Legends say that those\nwho climb the mountain\nnever return.",
      "", "", "", ""
    ],
    roomNames: {
      1: "Intro Story", 2: "Mt. Ebott Chasm", 3: "Title Menu",
      4: "Ruins - Flower Bed", 5: "Ruins - Flowey's Spot",
      6: "Ruins - Entrance", 7: "Ruins - Floor Switches", 8: "Ruins - Labeled Switches",
      9: "Ruins - Dummy Room", 10: "Ruins - Spike Bridge", 11: "Ruins - Long Hallway",
      12: "Ruins - Leaf Pile", 13: "Ruins - Candy Pedestal", 14: "Ruins - Falling Leaves",
      15: "Ruins - First Rock", 16: "Ruins - Cracked Maze", 17: "Ruins - Three Rocks",
      18: "Ruins - Mouse Hole", 19: "Ruins - Napstablook", 20: "Ruins - Spider Bake Sale",
      21: "Ruins - Froggit Hall", 22: "Ruins - Six Holes",
      23: "Ruins - Blue Switch", 24: "Ruins - Red Switch", 25: "Ruins - Green Switch",
      26: "Ruins - Perspective End", 27: "Ruins - Error Room",
      28: "Ruins - Crossroads", 29: "Ruins - Side Passage", 30: "Ruins - City Balcony",
      31: "Ruins - Home Exterior", 32: "Home - Foyer", 33: "Home - Living Room",
      34: "Home - Hallway", 35: "Home - Toriel's Room", 36: "Home - Your Room",
      37: "Home - Kitchen", 38: "Basement - Hall 1", 39: "Basement - Hall 2",
      40: "Basement - Hall 3", 41: "Basement - Ruins Door", 42: "Basement - Exit Hall",
      43: "Ruins - Final Chamber",
      44: "Snowdin - Ruins Exit", 45: "Snowdin - Forest Bridge", 46: "Snowdin - Box Road",
      47: "Snowdin - Frozen Lake", 48: "Snowdin - Doggo Station", 49: "Snowdin - Electric Maze",
      50: "Snowdin - Word Search", 51: "Snowdin - The Snowman", 52: "Snowdin - Pine Path",
      53: "Snowdin - Nice Cream & Snow", 54: "Snowdin - Snowball Golf", 55: "Snowdin - Dogi Marriage",
      56: "Snowdin - Spaghetti", 57: "Snowdin - XO Puzzle 1", 58: "Snowdin - XO Puzzle 2",
      59: "Snowdin - XO Puzzle 3", 60: "Snowdin - Tile Machine", 61: "Snowdin - Dog House",
      62: "Snowdin - Ice Underpass", 63: "Snowdin - Ice Puzzle", 64: "Snowdin - Gyftrot Woods",
      65: "Snowdin - Cliff Vista", 66: "Snowdin - Snow Poffs", 67: "Snowdin - Gauntlet Bridge",
      68: "Snowdin - Town", 69: "Snowdin - North Street", 70: "Snowdin - River Dock",
      71: "Snowdin - Snowed Inn", 72: "Snowdin - Inn Bedroom", 73: "Snowdin - Grillby's",
      74: "Snowdin - Librarby", 75: "Snowdin - Capture Shed", 76: "Snowdin - Skeleton House",
      77: "Snowdin - Papyrus's Room", 78: "Snowdin - Sans's Room", 81: "Snowdin - Misty Outskirts"
    },
    flowers: ["* Golden flowers.\n* They must have broken your fall."],
    floweyIntro: [
      { who: "flowey", expr: "normal", text: "* Howdy!\n* I'm \\YFLOWEY\\W.\n* \\YFLOWEY\\W the \\YFLOWER\\W!" },
      { who: "flowey", expr: "wink",   text: "* Hmmm...\n* You're new to the UNDERGROUND,\n  aren'tcha?" },
      { who: "flowey", expr: "normal", text: "* Golly, you must be so confused.\n* Someone ought to teach you how\n  things work around here!" },
      { who: "flowey", expr: "wink",   text: "* I guess little old me will\n  have to do.\n* Ready? Here we go!" }
    ],
    floweyBattle: {
      intro: [
        { expr: "normal", text: "See that heart?\nThat is your SOUL,\nthe very culmination\nof your being!" },
        { expr: "normal", text: "Your SOUL starts off\nweak, but can grow\nstrong if you gain\na lot of LV." },
        { expr: "wink",   text: "What's LV stand for?\nWhy, LOVE, of course!\nYou want some LOVE,\ndon't you?" },
        { expr: "wink",   text: "Down here, LOVE is\nshared through...\nlittle white...\n'friendliness pellets.'" },
        { expr: "normal", text: "Move around!\nGet as many as\nyou can!" }
      ],
      dodge1: [{ expr: "side", text: "Hey buddy, you\nmissed them.\nLet's try again,\nokay?" }],
      dodge2: [
        { expr: "pissed", text: "Is this a joke?\nAre you braindead?\nRUN. INTO. THE.\nBULLETS!!!" },
        { expr: "evil",   text: "...You know what...\nfriendliness pellets." }
      ],
      evilHit: [
        { expr: "evil",  text: "You idiot." },
        { expr: "evil",  text: "In this world, it's\nKILL or BE killed." },
        { expr: "laugh", text: "Why would ANYONE pass\nup an opportunity\nlike this!?" },
        { expr: "evil",  text: "DIE." }
      ],
      evilDodge: [
        { expr: "evil",  text: "You know what's going\non here, don't you?" },
        { expr: "laugh", text: "You just wanted to\nsee me suffer.\nDIE." }
      ]
    },
    torielRescue: [
      { who: "toriel", expr: "side",   text: "* What a terrible creature,\n  torturing such a poor,\n  innocent youth..." },
      { who: "toriel", expr: "normal", text: "* Ah, do not be afraid, my child.\n* I am \\BTORIEL\\W, caretaker of\n  the \\YRUINS\\W." },
      { who: "toriel", expr: "happy",  text: "* I pass through this place\n  every day to see if anyone\n  has fallen down." },
      { who: "toriel", expr: "normal", text: "* You are the first human to\n  come here in a long time.\n* Come! I will guide you through\n  the catacombs." }
    ],
    save1: "* (The shadow of the RUINS looms\n  above, filling you with\n  determination.)",
    save2: "* (Playfully crinkling through the\n  leaves fills you with\n  determination.)",
    save3: "* (Knowing the mouse might one day\n  leave its hole and get the cheese...\n  It fills you with determination.)",
    save4: "* (Seeing such a cute, tidy house\n  in the RUINS gives you\n  determination.)",
    save5: "* (The convenience of that lamp\n  still fills you with\n  determination.)",
    save6: "* (Knowing the mouse might one day\n  heat up the spaghetti...\n  It fills you with determination.)",
    save7: "* (Seeing such a strange dog house\n  fills you with determination.)",
    save8: "* (The sight of such a friendly\n  town fills you with\n  determination.)",
    plaqueRuins1: ["* Only the fearless may proceed.\n* Brave ones, foolish ones.\n* Both walk not the middle road."],
    torielRuins2: [
      { who: "toriel", expr: "normal", text: "* Welcome to your new home,\n  innocent one." },
      { who: "toriel", expr: "happy",  text: "* The RUINS are full of puzzles.\n* One must solve them to move\n  from room to room.\n* Watch me demonstrate!" }
    ],
    torielRuins3Intro: [
      { who: "toriel", expr: "normal", text: "* To make progress here, you\n  will need to trigger several\n  switches." },
      { who: "toriel", expr: "happy",  text: "* Do not worry, I have labelled\n  the ones that you need to\n  flip." }
    ],
    torielRuins3Sw1: [{ who: "toriel", expr: "happy", text: "* Splendid!\n* I am proud of you, little one.\n* Let us move to the next room." }],
    torielRuins3Wrong: [{ who: "toriel", expr: "side", text: "* Wow! You are very proactive!\n* ...However, that is the wrong\n  switch. Look for the markings!" }],
    signStayPath: ["* Stay on the path."],
    noteSwitch1: ["* Toriel's markings:\n  \"Please press this switch.\""],
    noteSwitch2: ["* Toriel's markings:\n  \"Also, please press this switch.\""],
    torielRuins4Intro: [
      { who: "toriel", expr: "normal", text: "* As a human living in the\n  UNDERGROUND, monsters may\n  attack you." },
      { who: "toriel", expr: "happy",  text: "* When you encounter a monster,\n  you will enter a \\YFIGHT\\W.\n* While in a \\YFIGHT\\W, strike up\n  a friendly conversation!" },
      { who: "toriel", expr: "normal", text: "* Stall for time, and I will\n  come to resolve the conflict.\n* Practice talking to the dummy!" }
    ],
    torielDummyGood: [{ who: "toriel", expr: "happy", text: "* Ah, very good!\n* You are very good." }],
    torielDummyHit:  [{ who: "toriel", expr: "side",  text: "* Ahh, the dummies are not for\n  fighting!\n* They are for talking!\n* We do not want to hurt anybody,\n  do we...? Come now." }],
    torielDummyFlee: [{ who: "toriel", expr: "side",  text: "* ...You ran away from a dummy?\n* Well, I suppose nobody was\n  hurt. Come along!" }],
    torielRuins5Intro: [{ who: "toriel", expr: "normal", text: "* There is another puzzle in\n  this room...\n* I wonder if you can solve it?" }],
    torielRuins5Bridge: [{ who: "toriel", expr: "side", text: "* This is the puzzle, but...\n* Here, take my hand for a\n  moment." }],
    torielRuins5Done: [{ who: "toriel", expr: "happy", text: "* Puzzles seem a little too\n  dangerous for now.\n* You did wonderfully!" }],
    plaqueBlueprint: ["* The western room is the\n  eastern room's blueprint."],
    torielRuins6Start: [
      { who: "toriel", expr: "normal", text: "* You have done excellently thus\n  far, my child." },
      { who: "toriel", expr: "side",   text: "* I would like you to walk to\n  the end of the room by\n  yourself.\n* Forgive me for this." }
    ],
    torielRuins6End: [
      { who: "toriel", expr: "happy",  text: "* Greetings, my child.\n* Do not worry, I did not leave\n  you. I was behind this pillar!" },
      { who: "toriel", expr: "normal", text: "* I must attend to some business,\n  and you must stay alone for a\n  while." },
      { who: "toriel", expr: "happy",  text: "* Oh! Before I go, take this\n  \\YCELL PHONE\\W!\n* Press \\Y[C]\\W anytime if you\n  have a need for anything!" }
    ],
    call1: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "normal", text: "* Hello? This is TORIEL.\n* There are a few puzzles ahead\n  that I have yet to explain.\n* Be good, alright? Click..." }
    ],
    call2Choice: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "normal", text: "* Hello? This is TORIEL.\n* For no reason in particular...\n* Which do you prefer?" },
      { who: "toriel", expr: "happy",  text: "* Cinnamon, or butterscotch?", choices: ["Cinnamon", "Butterscotch"], choiceKey: "piePref" }
    ],
    call2After: [{ who: "toriel", expr: "happy", text: "* Oh, I see!\n* Thank you very much!\n* Click..." }],
    call3Confirm: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "side",   text: "* Hello? This is TORIEL.\n* You do not DISLIKE\n  {PIE}, do you?" },
      { who: "toriel", expr: "happy",  text: "* I know what your preference is,\n  but I wanted to make sure!\n* Click..." }
    ],
    call4Allergy: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "side",   text: "* Hello? You do not have any\n  allergies, do you?\n* No reason at all! Click..." }
    ],
    call5Pockets: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "happy",  text: "* Hello! Feel free to pick up\n  items in the RUINS, but leave\n  room in your pockets! Click..." }
    ],
    phoneHello: [{ who: "toriel", expr: "happy", text: "* Ring... This is TORIEL.\n* Oh, you just wanted to say\n  hello...? Well then, 'Hello!'\n* I hope that suffices. Hee hee." }],
    phoneAbout: [{ who: "toriel", expr: "side",  text: "* Ring... You want to know more\n  about me?\n* Just a silly old lady who\n  worries too much!" }],
    phoneMom1:  [{ who: "toriel", expr: "blush", text: "* Ring... Huh?\n* Did you just call me... 'Mom'?\n* Please call me whatever you\n  like! Click..." }],
    phoneMom2:  [{ who: "toriel", expr: "happy", text: "* Ring... Yes, my child?\n* Do stay safe! Click..." }],
    phoneFlirt1:[{ who: "toriel", expr: "blush", text: "* Ring... H-huh...?\n* Oh dear, I do not know how to\n  respond to that! Ha ha..." }],
    phoneFlirt2:[{ who: "toriel", expr: "blush", text: "* Ring... Hee hee, stop that,\n  my child! Focus on the road\n  ahead! Click..." }],
    candyPrompt: { text: "* It says 'take one.'\n* Take a piece of candy?", choices: ["Yes", "No"] },
    candy1: ["* You took a piece of candy.\n* (Monster Candy added to ITEMs.)"],
    candy2: ["* You took more candy.\n* How disgusting..."],
    candy3: ["* You take another piece.\n* You feel like the scum of\n  the earth."],
    candy4: ["* You took too much too fast.\n* The candy spills onto the\n  floor.\n* Look at what you've done."],
    candySpilled: ["* Look at what you've done."],
    frogRuins7: [
      "* Ribbit, ribbit.\n* (If you \\YACT\\W a certain way or\n  \\YFIGHT\\W until you almost defeat\n  them, their name turns \\YYELLOW\\W!)",
      "* (When a monster does not want\n  to fight anymore, please...\n  Use some \\YMERCY\\W, human. Ribbit.)"
    ],
    rockSign: ["* Three out of four grey rocks\n  recommend you push them."],
    plaqueLeaves: ["* Please don't step on the\n  leaves."],
    plaqueUpper10: ["* Look beneath to find the way\n  across the cracks."],
    talkRock1: ["* WHOA there, pardner!\n* Who said you could push me\n  around?\n* Hmm? You're ASKING me to move?\n* Okay, just for you, pumpkin!"],
    talkRock3: ["* Hmmm? You want me to STAY\n  there?\n* Okay, I won't budge an inch!"],
    talkRockDone: ["* Don't worry, pumpkin!\n* I'm staying right on this\n  plate for ya!"],
    mouseHole: ["* Just a regular mouse hole."],
    cheeseTable: ["* This cheese has been here\n  quite a long time.\n* It's stuck to the table..."],
    blookPrompt: { text: "* This ghost keeps saying 'z'\n  out loud repeatedly, pretending\n  to sleep. Move it with force?", choices: ["Yes", "No"] },
    blookAfter: [
      "* hnnnnnnnnnn...\n* oh, i'm sorry... were you\n  trying to walk through here?",
      "* i usually come to the RUINS\n  because there's nobody around,\n  but today i met somebody nice..."
    ],
    bakeSign: ["* Spider Bake Sale\n* All proceeds go to real\n  spiders."],
    webSmallPrompt: { text: "* A spider web with a Bake Sale\n  flyer. Leave 7G for a Donut?", choices: ["Pay 7G", "Do not"] },
    webBigPrompt:   { text: "* A giant web. Leave 18G for\n  fresh Spider Cider?", choices: ["Pay 18G", "Do not"] },
    bakeBoughtDonut: ["* Some spiders crawled down and\n  handed you a Spider Donut!"],
    bakeBoughtCider: ["* Some spiders crawled down and\n  handed you a jug of Spider\n  Cider!"],
    bakeNoGold: ["* You didn't have enough gold.\n* The spiders pat your pockets\n  sympathetically."],
    bakeFull: ["* Your ITEM pockets are full!"],
    frogXAdvice: ["* Ribbit, ribbit.\n* (Whenever I talk, my friend\n  skips my words with \\Y[X]\\W.\n  Thank you for listening!)"],
    frogYellow: ["* Ribbit, ribbit.\n* (Yellow names mean you can\n  \\YSPARE\\W a monster!)"],
    frogFour: ["* Ribbit, ribbit.\n* (Have you ever spotted the\n  \\Yfourth frog\\W in this room?)"],
    tinyFrog: ["* (Upon closer inspection...\n  There is a microscopic frog\n  waving from inside the crack!)"],
    signOneSwitch: ["* There is just one switch."],
    ribbonGet: ["* You found the \\YFaded Ribbon\\W!\n* (Added to ITEMs — equip it\n  from [C] -> ITEM for +3 DF!)"],
    blookPit: ["* oh... i didn't expect anyone\n  to fall down here...\n* sorry, i'll fade away now..."],
    switchClick: ["* Click!\n* You hear spikes retracting!"],
    plaque15A: ["* Press the \\Bblue switch\\W."],
    plaque15B: ["* Please press the \\Rred switch\\W."],
    plaque15C: ["* Please press the \\Ggreen switch\\W."],
    plaque15D: ["* Are you not proud of yourself?\n* Wait—the room was rotating\n  each time! Proceed east!"],
    plaque15E: ["* Error! Did you press the wrong\n  color? Step north to retry!"],
    frogGroceries: ["* Ribbit, ribbit.\n* (I saw \\BTORIEL\\W come out of here\n  carrying groceries!)"],
    toyKnifeGet: ["* You found the \\YToy Knife\\W!\n* (Added to ITEMs — equip it\n  from [C] -> ITEM for +3 AT!)"],
    torielOutsideHome: [
      { who: "toriel", expr: "side",   text: "* Oh dear, that took longer than\n  I thought it would!" },
      { who: "toriel", expr: "happy",  text: "* How did you get here, my child?\n* Here, I will heal you right\n  away. Come inside!" }
    ],
    homeVase: ["* Encouraging golden flowers in\n  a neat ceramic vase."],
    homeCalendar: ["* An old calendar from the\n  beginning of 201X.\n* A date is circled in red."],
    torielHallTour: [
      { who: "toriel", expr: "happy",  text: "* Do you smell that?\n* Surprise! It is a butterscotch-\n  cinnamon pie!" },
      { who: "toriel", expr: "normal", text: "* This first door is your very\n  own room! Feel free to take a\n  nap. I'll be in the living room." }
    ],
    mirrorNormal: ["* It's you!"],
    mirrorGenocide: ["\\R* It's me, Chara."],
    hallPlant: ["* Oh! It is a 'water sausage.'"],
    hallPainting: ["* A quiet painting of the\n  Underground's Delta Rune."],
    hallLocked: ["* This room is under\n  renovations."],
    yourToys: ["* Look at all these cool toys!\n* They don't interest you at all."],
    yourShoes: ["* Shoes of disparate sizes are\n  neatly lined up in the closet."],
    yourPhoto: ["* A dusty photo frame."],
    yourBedPrompt: { text: "* This bed looks super comfy.\n* Lie down and go to sleep?", choices: ["Sleep", "Stay up"] },
    yourBedWake: ["* You slept soundly...\n* Your HP was maxed out!"],
    pieFloorPrompt: { text: "* There's a slice of Butterscotch-\n  Cinnamon Pie on the floor!\n* Take it?", choices: ["Take Pie", "Leave it"] },
    pieTaken: ["* You got the \\YButterscotch Pie\\W!"],
    torRoomBed: ["* Definitely bigger than a twin-\n  sized bed."],
    torRoomDiary: ["* It's Toriel's diary:\n  'Why did the skeleton want a\n   friend? Because she was\n   feeling BONELY...'"],
    torRoomCactus: ["* Ah, the cactus.\n* Truly the most tsundere of\n  plants."],
    torRoomSocks: ["* You peek inside the drawer...\n* Just neatly folded socks."],
    torRoomChair: ["* A medium-sized chair."],
    kitchenPie: ["* A freshly baked pie is cooling\n  on the counter."],
    kitchenStove: ["* The stovetop is very clean.\n* Toriel must use fire magic\n  instead."],
    kitchenSink: ["* There is some white fur stuck\n  in the sink drain."],
    kitchenFridge: ["* Inside the fridge is a\n  name-brand chocolate bar and\n  jars of snails."],
    kitchenGenocide: ["\\R* Where are the knives."],
    livingFire: ["* The fire isn't burning hot...\n* Just pleasantly warm."],
    livingBooks: ["* '72 Uses for Snails.'\n* How riveting."],
    livingChair: ["* Toriel's chair.\n* Its name is Chairiel."],
    livingTable: ["* Enough seating for a family."],
    torielLivingAsk1: [
      { who: "toriel", expr: "happy",  text: "* Up already, I see?\n* Make yourself at home, my\n  child!" },
      { who: "toriel", expr: "normal", text: "* What would you like to talk\n  about?", choices: ["How to exit the RUINS", "Snail facts"], choiceKey: "livingChoice1" }
    ],
    torielSnailFact: [{ who: "toriel", expr: "happy", text: "* Oh! Did you know that snails\n  make terrible shoelaces?\n* Fascinating, is it not? Hee hee!" }],
    torielExit1: [{ who: "toriel", expr: "side", text: "* ...Um. How about an exciting\n  snail fact instead?" }],
    torielExit2: [{ who: "toriel", expr: "cold", text: "* ...\n* I have to do something.\n* Stay here." }],
    basement1: [
      { who: "toriel", expr: "side",   text: "* Ahead of us lies the end of\n  the RUINS.\n* A one-way exit to the rest of\n  the underground." },
      { who: "toriel", expr: "cold",   text: "* I am going to destroy it.\n* No one will ever be able to\n  leave again.\n* Now go upstairs." }
    ],
    basement2: [
      { who: "toriel", expr: "cold",   text: "* Every human that falls down\n  here meets the same fate.\n* They come. They leave. They die." },
      { who: "toriel", expr: "cold",   text: "* You naive child... If you\n  leave the RUINS...\n* They... \\RASGORE\\W... will kill\n  you." }
    ],
    basement3: [{ who: "toriel", expr: "cold", text: "* Do not try to stop me.\n* This is your final warning." }],
    basement4: [
      { who: "toriel", expr: "cold",   text: "* You want to leave so badly?\n* Hmph. You are just like the\n  others." },
      { who: "toriel", expr: "cold",   text: "* Prove yourself...\n* Prove to me you are strong\n  enough to survive!" }
    ],
    torielSpareLines: [
      ".....", "..... .....", "...What are you\ndoing?", "Attack or run\naway!",
      "What are you\nproving this way?", "Fight me or\nleave!", "Stop looking at\nme that way.",
      "Go upstairs!", "...I know you want\nto go home, but...", "Please... Go\nupstairs now.",
      "I promise I will\ntake good care of\nyou here.",
      "Ha ha... Pathetic,\nis it not? I cannot\nsave even a single\nchild.",
      "No, I understand.\nYou would just be\nunhappy trapped\ndown here."
    ],
    torielAfterSpared: [
      { who: "toriel", expr: "side",   text: "* The RUINS are very small once\n  you get used to them.\n* It would not be right for you\n  to grow up in a place like\n  this." },
      { who: "toriel", expr: "happy",  text: "* If you truly wish to leave\n  the RUINS, I will not stop\n  you.\n* Be good, won't you?\n* ...My child." }
    ],
    floweyEndPacifist: [
      { who: "flowey", expr: "normal", text: "* Clever. Verrrryyy clever.\n* You think you're really smart,\n  don't you?" },
      { who: "flowey", expr: "evil",   text: "* You spared the life of a\n  single person.\n* What will you do if you meet\n  a relentless killer?" },
      { who: "flowey", expr: "laugh",  text: "* I'll be watching you!\n* Hee hee hee..." }
    ],
    floweyEndNeutral: [
      { who: "flowey", expr: "evil",   text: "* Hee hee hee...\n* So you didn't hold back after\n  all!" },
      { who: "flowey", expr: "laugh",  text: "* Down here, nobody's innocent.\n* Let's see how far your\n  'determination' takes you!" }
    ],
    floweyEndGenocide: [
      { who: "flowey", expr: "normal", text: "* Hahaha...\n* You're not really human,\n  are you?" },
      { who: "flowey", expr: "wink",   text: "* No. You're empty inside.\n* Just like me.\n* In fact... You're \\RChara\\W,\n  right?" },
      { who: "flowey", expr: "evil",   text: "* We're still inseparable,\n  after all these years...\n* Listen. I have a plan to\n  become all-powerful." },
      { who: "flowey", expr: "laugh",  text: "* Let's destroy everything in\n  this wretched world.\n* Everyone, everything in\n  these worthless memories...\n  Let's turn 'em all to dust." }
    ],
    // SNOWDIN DIALOGUE
    snowBushCamera: ["* (There's a video camera\n  hidden in the bushes.)"],
    sansBridgeIntro: [
      { who: "sans", expr: "dark",   text: "* Human." },
      { who: "sans", expr: "dark",   text: "* Don't you know how to greet\n  a new pal?\n* Turn around and shake my\n  hand." },
      { who: "narrator",             text: "* (Pfffffftttt...)\n* (The sound of a whoopee\n  cushion echoes in the woods!)" },
      { who: "sans", expr: "wink",   text: "* heheheh... the old whoopee\n  cushion in the hand trick.\n* it's ALWAYS funny." },
      { who: "sans", expr: "normal", text: "* anyways, you're a human,\n  right?\n* that's hilarious.\n* i'm \\Bsans\\W. sans the skeleton." },
      { who: "sans", expr: "normal", text: "* i'm actually supposed to be\n  on watch for humans right now.\n* but... y'know...\n* i don't really care about\n  capturing anybody." },
      { who: "sans", expr: "wink",   text: "* now my brother, \\YPAPYRUS\\W...\n* he's a human-hunting FANATIC.\n* hey, actually, i think that's\n  him over there.\n* quick, behind that\n  \\Yconveniently-shaped lamp\\W!" }
    ],
    sansBridgeGeno: [
      { who: "sans", expr: "dark",   text: "* Human.\n* Don't you know how to greet\n  a new pal?\n* Turn around and shake my\n  hand." },
      { who: "narrator",             text: "* (Pfffffftttt...)" },
      { who: "sans", expr: "noeyes", text: "* ...huh.\n* the old whoopee cushion in\n  the hand trick.\n* usually people almeno crack\n  a smile." },
      { who: "sans", expr: "normal", text: "* i'm sans. my brother papyrus\n  is coming.\n* even if you don't feel like\n  hiding... humour him, okay?" }
    ],
    papyrusLampScene: [
      { who: "papyrus", expr: "mad",    text: "SANS!! HAVE YOU FOUND\nA HUMAN YET???" },
      { who: "sans",    expr: "wink",   text: "* yeah.Actually, i think i\n  just saw one right by that\n  lamp." },
      { who: "papyrus", expr: "mad",    text: "SANS!! I DON'T HAVE TIME\nFOR YOUR PUNS!!\nTHE ROYAL GUARD NEEDS ME!" },
      { who: "papyrus", expr: "normal", text: "I WILL CAPTURE A HUMAN!\nTHEN, I, \\YPAPYRUS\\W, WILL GET\nALL THE THINGS I UTTERLY\nDESERVE!\nNYEH HEH HEH HEH HEH!!!" },
      { who: "sans",    expr: "wink",   text: "* well, that worked out.\n* you can come out now, kid.\n* see ya up ahead." }
    ],
    boxRoadGlove: ["* You checked inside the\n  Dimensional Box...\n* You found the \\YTough Glove\\W!\n  (Weapon AT +5 — mash [Z] during\n  attacks!)"],
    boxRoadEmpty: ["* The Dimensional Box is\n  resting peacefully."],
    fishingRodSign: ["* Looked at the fishing rod.\n* Bound to the end of the line\n  is a photo of a weird monster\n  with 'Call From Mom!' written\n  on it."],
    doggoIntro: [
      { who: "narrator", text: "* 'SENTRY STATION'\n* Is someone there!?\n* Just a second! Let me finish\n  smoking this dog treat!" },
      { who: "narrator", text: "* Wait... Did something move!?\n* I can only see moving things!\n* If something IS moving, I'll\n  MAKE sure it never moves\n  again!" }
    ],
    doggoAfter: ["* WHAT!? I'VE BEEN PET!!\n* Something petted me without\n  moving at all!\n* I need some dog treats to\n  think about this..."],
    electricMazeIntro: [
      { who: "papyrus", expr: "normal", text: "HUMAN! IN THIS AREA, I HAVE\nDEVISED AN INVISIBLE\nELECTRICITY MAZE!" },
      { who: "papyrus", expr: "cool",   text: "WHEN YOU TOUCH THE WALLS,\nTHIS ORB I AM HOLDING WILL\nADMINISTER A HEARTY ZAP!\nGO AHEAD! TRY IT!" },
      { who: "narrator",                text: "* (ZAAAAP!!)\n* (Because Papyrus was holding\n  the orb, he shocked himself!)" },
      { who: "papyrus", expr: "wacky",  text: "SANS!! WHY DID THE HUMAN\nNOT GET SHOCKED!?" },
      { who: "sans",    expr: "wink",   text: "* i think the human has to\n  hold the orb." },
      { who: "papyrus", expr: "normal", text: "OH, INDEED!! HOLD THIS\nPLEASE — WAIT, NO!\nFORGET IT! NYEH HEH HEH!" }
    ],
    wordSearchIntro: [
      { who: "papyrus", expr: "normal", text: "SANS!! WHAT IS THIS!?\nA MONSTER KIDZ WORD SEARCH!?\nYOU WERE SUPPOSED TO SET UP\nA PUZZLE!!" },
      { who: "sans",    expr: "wink",   text: "* hey, nothing stops a human\n  in their tracks like a\n  word search." },
      { who: "papyrus", expr: "mad",    text: "UNBELIEVABLE!!\nHUMAN! WHICH IS HARDER:\nJUNIOR JUMBLE OR CROSSWORD!?\nBAH! I'LL PREPARE THE NEXT\nPUZZLE MYSELF!" }
    ],
    wordSearchGeno: [
      { who: "papyrus", expr: "sweat",  text: "HUMAN...? YOU WALKED RIGHT\nOVER THE WORD SEARCH WITHOUT\nEVEN LOOKING AT IT..." },
      { who: "sans",    expr: "noeyes", text: "* ...kid, my brother worked\n  really hard on his puzzles.\n* it wouldn't kill you to\n  play along." }
    ],
    snowmanGive: [
      "* Hello, traveller!\n* I am a snowman. I want to see\n  the world, but I cannot move.",
      "* Please, take a piece of me\n  and carry it very far away...\n* (You got the \\YSnowman Piece\\W!\n  Heals 45 HP.)"
    ],
    snowmanThanks: ["* Thank you! Please take good\n  care of that Snowman Piece!"],
    niceCreamPrompt: { text: "* Hello! Would you like to buy\n  some Nice Cream for 15G?\n  (Heals 15 HP!)", choices: ["Buy (15G)", "No thanks"] },
    niceCreamBought: ["* Here you go! Have a super-\n  duper day!\n* (Nice Cream added to ITEMs.)"],
    snowSwitchFound: ["* Hidden beneath the snow was\n  a switch! *Click!*\n* The spikes to the southeast\n  retracted!"],
    dogiIntro: [
      "* Stop right there!\n* What's that smell...?\n  (Sniff, sniff)",
      "* A HUMAN!! Eliminating you\n  will put us in first place\n  for the Nose Nuzzle\n  Championships!"
    ],
    spaghettiNote: ["* 'HUMAN!! PLEASE ENJOY THIS\n  SPAGHETTI. (LITTLE DO YOU\n  KNOW, THIS SPAGHETTI IS A\n  TRAP!! NYEH HEH HEH! -PAPYRUS)'\n* (It's frozen solid to the\n  table.)"],
    xoSign: ["* Step on every 'X' to turn it\n  into an 'O', then press the\n  switch to lower the spikes!"],
    tileMachineScene: [
      { who: "papyrus", expr: "cool",   text: "HUMAN!! BEHOLD!\nTHE MULTICOLOR TILE PUZZLE!\nRED TILES ARE IMPASSABLE!\nYELLOW TILES ARE ELECTRIC!" },
      { who: "papyrus", expr: "normal", text: "ORANGE TILES MAKE YOU SMELL\nLIKE ORANGES! AND LEMON TILES\nSUMMON PIRANHAS! UNDERSTAND!?\nGREAT! HERE WE GO!!" },
      { who: "narrator",                text: "* (Beep boop... The machine\n  generated a straight line\n  of harmless pink tiles!)" },
      { who: "papyrus", expr: "wacky",  text: ".........\nNYEH HEH HEH!! YOU GOT LUCKY\nTHIS TIME, HUMAN!!" }
    ],
    greaterDogIntro: [
      "* You inspect the suspiciously\n  large snow poff...\n* Suddenly, a giant armored dog\n  bursts out of the snow!"
    ],
    gauntletBridgeScene: [
      { who: "papyrus", expr: "cool",   text: "HALT, HUMAN!!\nWELCOME TO THE DEADLY GAUNTLET\nOF DEADLY TERROR!!" },
      { who: "papyrus", expr: "normal", text: "WHEN I SAY THE WORD, THIS\nBRIDGE WILL SPEW FLAMES,\nSPIKES, CANNONS, AND...\nA DOG ON A ROPE!?" },
      { who: "papyrus", expr: "sweat",  text: "You know what? This seems\na little TOO easy to defeat\nyou with.\nI'LL SAVE IT FOR LATER!\nAWAY IT GOES! NYEH HEH HEH!" },
      { who: "sans",    expr: "wink",   text: "* don't sweat it, kid.\n* papyrus is actually pretty\n  cool once you get to know him." }
    ],
    gauntletBridgeGeno: [
      { who: "papyrus", expr: "sweat",  text: "HUMAN... YOU DIDN'T EVEN\nFLINCH AT MY DEADLY GAUNTLET.\nI... I WILL TURN IT OFF." },
      { who: "sans",    expr: "noeyes", text: "* ...if you keep going the way\n  you are now...\n* you're gonna have a \\Rbad time\\W." }
    ],
    snowdinShopPrompt: {
      text: "* Welcome to Snowdin Shop!\n  What would you like to buy?",
      choices: ["Bisicle (15G) / CinnaBun (25G)", "Manly Bandanna (50G, DF+7)"]
    },
    snowdinShopGenoPrompt: {
      text: "* The shopkeeper evacuated...\n* A note reads: 'Please don't\n  hurt my family.'",
      choices: ["Steal 758G & Items", "Leave"]
    },
    snowdinInnPrompt: {
      text: "* Welcome to Snowed Inn!\n  Rest here to boost your HP\n  above maximum (30 HP)?",
      choices: ["Rest (Free!)", "No thanks"]
    },
    papyrusBossIntro: [
      { who: "papyrus", expr: "normal", text: "HUMAN...\nALLOW ME TO TELL YOU ABOUT\nSOME COMPLEX FEELINGS." },
      { who: "papyrus", expr: "sweat",  text: "FEELINGS LIKE... THE JOY OF\nFINDING ANOTHER PASTA LOVER.\nTHE ADMIRATION FOR ANOTHER'S\nPUZZLE-SOLVING SKILLS..." },
      { who: "papyrus", expr: "cool",   text: "THESE FEELINGS... MUST BE\nWHAT YOU ARE FEELING RIGHT\nNOW!! I CAN HARDLY IMAGINE\nWHAT IT'S LIKE TO MEET ME!" },
      { who: "papyrus", expr: "normal", text: "AFTER I CAPTURE YOU, I'LL\nFINALLY JOIN THE ROYAL GUARD!\nEN GARDE, HUMAN!\nNYEH HEH HEH!!" }
    ],
    papyrusBossGenoIntro: [
      { who: "papyrus", expr: "sweat",  text: "HOLD IT, HUMAN!\nHEY, QUIT MOVING WHILE I'M\nTALKING TO YOU!" },
      { who: "papyrus", expr: "sweat",  text: "AT FIRST, I WAS AFRAID OF\nYOUR WEIRD SHAMBLING ABOUT...\nAND YOUR DUSTY HANDS..." },
      { who: "papyrus", expr: "normal", text: "BUT I, PAPYRUS, SEE PAST THAT!\nYOU MUST JUST BE LOST!\nSO I WON'T FIGHT YOU.\nI'LL BE YOUR FRIEND AND GUIDE\nYOU ON THE RIGHT PATH!" }
    ],
    papyrusAfterSpared: [
      { who: "papyrus", expr: "sweat",  text: "Wowie... I couldn't even\ndefeat you...\nAnd you didn't even hurt me!" },
      { who: "papyrus", expr: "cool",   text: "WAIT!! WE CAN STILL BE\nFRIENDS!! YOU CAN VISIT MY\nHOUSE IN SNOWDIN TOWN ANYTIME!" },
      { who: "papyrus", expr: "normal", text: "AND TO EXIT SNOWDIN INTO\nWATERFALL, JUST WALK PAST ME\nTO THE EAST! NYEH HEH HEH!!" }
    ]
  },

  zh: {
    introSlides: [
      "很久以前，兩個種族\n統治著地球：\n人類與怪物。",
      "有一天，兩個種族\n之間爆發了戰爭。",
      "經過漫長的戰役後，\n人類獲得了勝利。",
      "他們用一道魔法咒語\n將怪物封印在地下。",
      "許多年以後……",
      "      伊波特山\n       201X 年",
      "傳說爬上這座山的人，\n從來沒有回來過。",
      "", "", "", ""
    ],
    roomNames: {
      1: "開場故事", 2: "伊波特山深淵", 3: "標題選單",
      4: "遺跡 - 金色花海", 5: "遺跡 - 小花草地",
      6: "遺跡 - 入口大階梯", 7: "遺跡 - 踏板房", 8: "遺跡 - 標記開關房",
      9: "遺跡 - 假人房", 10: "遺跡 - 地刺長橋", 11: "遺跡 - 獨立長廊",
      12: "遺跡 - 落葉堆", 13: "遺跡 - 糖果台", 14: "遺跡 - 落穴地板",
      15: "遺跡 - 第一顆石頭", 16: "遺跡 - 裂縫迷宮", 17: "遺跡 - 三顆石頭",
      18: "遺跡 - 老鼠洞", 19: "遺跡 - 幽靈路口", 20: "遺跡 - 蜘蛛烘焙義賣",
      21: "遺跡 - 青蛙長廊", 22: "遺跡 - 六洞謎題",
      23: "遺跡 - 藍色開關", 24: "遺跡 - 紅色開關", 25: "遺跡 - 綠色開關",
      26: "遺跡 - 視角終點", 27: "遺跡 - 隱藏錯誤房",
      28: "遺跡 - 十字路口", 29: "遺跡 - 側邊小徑", 30: "遺跡 - 古城陽台",
      31: "遺跡 - 家門前枯樹", 32: "家 - 玄關", 33: "家 - 客廳",
      34: "家 - 臥室走廊", 35: "家 - 托麗爾的房間", 36: "家 - 你的房間",
      37: "家 - 廚房", 38: "地下室 - 長廊 1", 39: "地下室 - 長廊 2",
      40: "地下室 - 長廊 3", 41: "地下室 - 遺跡大門", 42: "地下室 - 出口長廊",
      43: "遺跡 - 最終大廳",
      44: "雪町 - 遺跡外雪林", 45: "雪町 - 木橋與檯燈", 46: "雪町 - 箱子路",
      47: "雪町 - 結冰湖畔", 48: "雪町 - 盲劍犬哨站", 49: "雪町 - 隱形電擊迷宮",
      50: "雪町 - 填字遊戲攤", 51: "雪町 - 旅人雪人", 52: "雪町 - 松林小徑",
      53: "雪町 - 冰淇淋與雪堆", 54: "雪町 - 雪球高爾夫", 55: "雪町 - 狗夫婦哨站",
      56: "雪町 - 冷凍義大利麵", 57: "雪町 - XO 謎題 1", 58: "雪町 - XO 謎題 2",
      59: "雪町 - XO 謎題 3", 60: "雪町 - 七彩地磚機", 61: "雪町 - 小犬座狗屋",
      62: "雪町 - 冰洞下層", 63: "雪町 - 溜冰場謎題", 64: "雪町 - 禮鹿森林",
      65: "雪町 - 雪崖遠眺", 66: "雪町 - 雪堆與大犬座", 67: "雪町 - 致命恐怖吊橋",
      68: "雪町 - 雪町鎮大街", 69: "雪町 - 北側街道", 70: "雪町 - 渡船人碼頭",
      71: "雪町 - 雪屋旅店大廳", 72: "雪町 - 旅店客房", 73: "雪町 - Grillby 酒吧",
      74: "雪町 - 拼錯字圖書館", 75: "雪町 - 帕派瑞斯車庫", 76: "雪町 - 骷髏兄弟的家",
      77: "雪町 - 帕派瑞斯房間", 78: "雪町 - Sans 的房間", 81: "雪町 - 濃霧郊外 (Boss)"
    },
    flowers: ["* 金黃色的花朵。\n* 肯定是它們接住了墜落的你。"],
    floweyIntro: [
      { who: "flowey", expr: "normal", text: "* 哈囉！\n* 我是\\Y小花 (FLOWEY)\\W。\n* 一朵名叫\\Y小花\\W的\\Y花\\W！" },
      { who: "flowey", expr: "wink",   text: "* 嗯……\n* 你是新來到地下世界的吧？" },
      { who: "flowey", expr: "normal", text: "* 天哪，你一定一頭霧水吧。\n* 總得有人教教你這裡的規矩！" },
      { who: "flowey", expr: "wink",   text: "* 看來只好由小小的我代勞囉。\n* 準備好了嗎？開始吧！" }
    ],
    floweyBattle: {
      intro: [
        { expr: "normal", text: "看見那顆愛心了嗎？\n那就是你的靈魂 (SOUL)，\n你存在的全部結晶！" },
        { expr: "normal", text: "你的靈魂一開始很脆弱，\n但只要累積大量 LV\n就能變得強大。" },
        { expr: "wink",   text: "LV 代表什麼？\n當然是 LOVE (愛) 囉！\n你也想要一點愛，對吧？" },
        { expr: "wink",   text: "在這裡，LOVE 是透過……\n這些小小的白色\n「友愛顆粒」分享的。" },
        { expr: "normal", text: "快移動吧！\n盡可能多接一點！" }
      ],
      dodge1: [{ expr: "side", text: "嘿老兄，你沒接到喔。\n我們再試一次，好嗎？" }],
      dodge2: [
        { expr: "pissed", text: "你在耍我嗎？\n你是腦袋壞掉了嗎？\n給我撞向那些子彈！！！" },
        { expr: "evil",   text: "……我是說……\n友愛顆粒。" }
      ],
      evilHit: [
        { expr: "evil",  text: "你這個白癡。" },
        { expr: "evil",  text: "在這個世界裡，\n不是殺人就是被殺。" },
        { expr: "laugh", text: "怎麼會有人放過\n這麼好的機會呢！？" },
        { expr: "evil",  text: "去死吧。" }
      ],
      evilDodge: [
        { expr: "evil",  text: "你早就知道怎麼回事了，\n對吧？" },
        { expr: "laugh", text: "你只是想看我難堪而已。\n去死吧。" }
      ]
    },
    torielRescue: [
      { who: "toriel", expr: "side",   text: "* 多麼可怕的傢伙，居然這樣\n  折磨一個無辜的孩子……" },
      { who: "toriel", expr: "normal", text: "* 啊，別害怕，我的孩子。\n* 我是\\B托麗爾 (TORIEL)\\W，\n  這座\\Y遺跡\\W的看守者。" },
      { who: "toriel", expr: "happy",  text: "* 我每天都會經過這裡，\n  看看有沒有人跌落下來。" },
      { who: "toriel", expr: "normal", text: "* 你是很久以來第一個來到這裡的\n  人類。來吧！我會引導你穿過\n  這座地下墓穴。" }
    ],
    save1: "* (遺跡的陰影籠罩在上方，\n  使你充滿了決心。)",
    save2: "* (開心地踩過沙沙作響的落葉，\n  使你充滿了決心。)",
    save3: "* (深知老鼠總有一天會離開洞穴\n  拿到那塊起司……\n  這使你充滿了決心。)",
    save4: "* (望見遺跡裡如此可愛整潔的小屋，\n  使你充滿了決心。)",
    save5: "* (那盞形狀剛好的檯燈，\n  依然使你充滿了決心。)",
    save6: "* (深知老鼠總有一天會學會\n  用微波爐加熱那盤義大利麵……\n  這使你充滿了決心。)",
    save7: "* (看見這麼奇妙的長脖子狗屋，\n  使你充滿了決心。)",
    save8: "* (望見如此溫馨熱鬧的雪町小鎮，\n  使你充滿了決心。)",
    plaqueRuins1: ["* 唯有無畏者得以通行。\n* 勇敢者、愚昧者，\n  皆不走中間之路。"],
    torielRuins2: [
      { who: "toriel", expr: "normal", text: "* 歡迎來到你的新家，純真的孩子。" },
      { who: "toriel", expr: "happy",  text: "* 遺跡裡充滿了謎題，必須解開才能\n  前往下個房間。請看我示範一次吧！" }
    ],
    torielRuins3Intro: [
      { who: "toriel", expr: "normal", text: "* 想通過這裡，你必須觸發\n  兩個牆上的開關。" },
      { who: "toriel", expr: "happy",  text: "* 別擔心，我已經在需要按下的\n  開關旁做了黃色標記！" }
    ],
    torielRuins3Sw1: [{ who: "toriel", expr: "happy", text: "* 太棒了！\n* 我真為你驕傲，小傢伙。\n* 我們前往下一個房間吧。" }],
    torielRuins3Wrong: [{ who: "toriel", expr: "side", text: "* 哇，你真積極！\n* ……不過那是錯的開關喔，\n  請找我有畫黃色箭頭的開關！" }],
    signStayPath: ["* 請走在小徑上。"],
    noteSwitch1: ["* 托麗爾的標記：\n  「請按下這個開關。」"],
    noteSwitch2: ["* 托麗爾的標記：\n  「也請按下這個開關。」"],
    torielRuins4Intro: [
      { who: "toriel", expr: "normal", text: "* 身為住在地下世界的人類，\n  怪物可能會向你發起攻擊。" },
      { who: "toriel", expr: "happy",  text: "* 遭遇怪物進入\\Y戰鬥\\W時，\n  請試著和對方友善地\\Y聊天\\W！\n* 先對這個假人練習看看吧！" }
    ],
    torielDummyGood: [{ who: "toriel", expr: "happy", text: "* 啊，做得太好了！\n* 你真是個好孩子。" }],
    torielDummyHit:  [{ who: "toriel", expr: "side",  text: "* 哎呀，假人不是拿來打架的，\n  是拿來練習聊天的呀！" }],
    torielDummyFlee: [{ who: "toriel", expr: "side",  text: "* ……你從假人面前逃跑了？\n* 好吧，至少沒有人受傷，走吧！" }],
    torielRuins5Intro: [{ who: "toriel", expr: "normal", text: "* 這個房間裡還有另一個謎題……\n* 不知道你能不能解開呢？" }],
    torielRuins5Bridge: [{ who: "toriel", expr: "side", text: "* 前面就是那個地刺謎題，不過……\n* 來，先牽著我的手走過去吧。" }],
    torielRuins5Done: [{ who: "toriel", expr: "happy", text: "* 這謎題對現在的你來說還是\n  太危險了點。我們繼續前進吧！" }],
    plaqueBlueprint: ["* 西側房間正是東側房間的藍圖。"],
    torielRuins6Start: [
      { who: "toriel", expr: "normal", text: "* 到目前為止你表現得非常棒，\n  我的孩子。" },
      { who: "toriel", expr: "side",   text: "* 請你試著獨自一人走到這條走廊\n  的盡頭。\n* 請原諒我這麼做。" }
    ],
    torielRuins6End: [
      { who: "toriel", expr: "happy",  text: "* 你好呀，我的孩子！\n* 別擔心，我從頭到尾都躲在柱子後！" },
      { who: "toriel", expr: "side",   text: "* 我有點事必須離開一下，\n  請乖乖留在這裡喔。" },
      { who: "toriel", expr: "happy",  text: "* 喔！離開前，這支\\Y手機\\W給你！\n* 有任何需要，隨時按 \\Y[C]\\W 打給我！" }
    ],
    call1: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "normal", text: "* 喂？我是托麗爾。\n* 前面還有幾個我還沒說明的謎題，\n  要乖喔！喀噠……" }
    ],
    call2Choice: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "normal", text: "* 喂？我是托麗爾。\n* 沒什麼特別的原因，只是想問……\n* 你比較喜歡哪一種口味？" },
      { who: "toriel", expr: "happy",  text: "* 肉桂，還是奶油糖？", choices: ["肉桂 (Cinnamon)", "奶油糖 (Butterscotch)"], choiceKey: "piePref" }
    ],
    call2After: [{ who: "toriel", expr: "happy", text: "* 喔，原來如此！\n* 非常謝謝你！喀噠……" }],
    call3Confirm: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "side",   text: "* 喂？我是托麗爾。\n* 你應該不會「討厭」{PIE}吧？\n* 只是想再確認一下！喀噠……" }
    ],
    call4Allergy: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "side",   text: "* 喂？你沒有對什麼食物過敏吧？\n* 完全沒什麼特別原因喔！喀噠……" }
    ],
    call5Pockets: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "happy",  text: "* 喂！遺跡裡可能散落著一些道具，\n  記得留點背包空間喔！喀噠……" }
    ],
    phoneHello: [{ who: "toriel", expr: "happy", text: "* 嘟……我是托麗爾。\n* 喔，你只是想打招呼嗎？\n* 那麼——「你好呀！」嘻嘻。" }],
    phoneAbout: [{ who: "toriel", expr: "side",  text: "* 嘟……你想多了解我一點？\n* 我只是個愛操心的老婦人罷了！" }],
    phoneMom1:  [{ who: "toriel", expr: "blush", text: "* 嘟……咦？你剛才叫我「媽媽」嗎？\n* 只要你喜歡，怎麼稱呼我都可以喔！" }],
    phoneMom2:  [{ who: "toriel", expr: "happy", text: "* 嘟……怎麼了，我的孩子？\n* 路上一定要小心喔！" }],
    phoneFlirt1:[{ who: "toriel", expr: "blush", text: "* 嘟……天哪，我真不知道該怎麼回答！\n* 你真是個有趣的孩子，哈哈……" }],
    phoneFlirt2:[{ who: "toriel", expr: "blush", text: "* 嘟……嘻嘻，別鬧了孩子，\n  專心看路喔！" }],
    candyPrompt: { text: "* 上面寫著「請拿一顆」。\n* 要拿一顆怪物糖果嗎？", choices: ["拿一顆", "不拿"] },
    candy1: ["* 你拿了一顆怪物糖果。\n* (已放入 ITEM 背包。)"],
    candy2: ["* 你又拿了一顆糖果。\n* 真貪心……"],
    candy3: ["* 你再拿了一顆。\n* 你覺得自己簡直罪大惡極。"],
    candy4: ["* 你拿得太猛了！\n* 整碗糖果翻倒在地上……\n* 看看你幹的好事。"],
    candySpilled: ["* 看看你幹的好事。"],
    frogRuins7: [
      "* 呱呱。(如果你透過 \\YACT\\W 友善互動，\n  名字變成\\Y黃色\\W時就能選擇 \\YMERCY\\W 寬恕！)",
      "* (當怪物不想再戰鬥時，請展現\n  仁慈吧，人類。呱呱。)"
    ],
    rockSign: ["* 四顆灰色石頭中有三顆\n  推薦你推它們。"],
    plaqueLeaves: ["* 請勿踩踏落葉。"],
    plaqueUpper10: ["* 觀察下層的痕跡即可找到安全路徑。"],
    talkRock1: ["* 喂喂，老兄！誰准你隨便推我的？\n* 嗯？你是禮貌地「拜託」我移過去嗎？\n* 好吧，看在你的份上就移到踏板上吧！"],
    talkRock3: ["* 唔？你希望我一直待在踏板上？\n* 真拿你沒辦法，我就站著不動囉！"],
    talkRockDone: ["* 放心吧小傢伙！\n* 我會幫你穩穩壓住這塊踏板的！"],
    mouseHole: ["* 只是一個普通的老鼠洞。"],
    cheeseTable: ["* 這塊起司已經放在這很久了，\n  牢牢黏在桌面上……"],
    blookPrompt: { text: "* 這隻幽靈嘴裡一直唸著「zzzz」裝睡。\n* 要強行把牠移開嗎？", choices: ["是", "否"] },
    blookAfter: [
      "* 唔唔唔……\n* 啊，對不起……你是想從這裡過去嗎？",
      "* 我平常來遺跡是因為這裡沒別人，\n  沒想到今天遇到了親切的人……"
    ],
    bakeSign: ["* 蜘蛛烘焙義賣！\n* 所有收益全數捐給真正的蜘蛛。"],
    webSmallPrompt: { text: "* 貼著義賣傳單的小蜘蛛網。\n* 要投下 7G 買蜘蛛甜甜圈嗎？", choices: ["支付 7G", "算了"] },
    webBigPrompt:   { text: "* 巨大的蜘蛛網。\n* 要投下 18G 買蜘蛛蘋果汁嗎？", choices: ["支付 18G", "算了"] },
    bakeBoughtDonut: ["* 幾隻小蜘蛛爬下來，遞給你一個\n  蜘蛛甜甜圈！"],
    bakeBoughtCider: ["* 幾隻小蜘蛛爬下來，遞給你一壺\n  蜘蛛蘋果汁！"],
    bakeNoGold: ["* 你的金幣不夠。\n* 小蜘蛛同情地拍了拍你的口袋。"],
    bakeFull: ["* 你的背包已經滿了！"],
    frogXAdvice: ["* 呱呱。(每次我說話，朋友都按 \\Y[X]\\W\n  跳過我的台詞。謝謝你聽我說話！)"],
    frogYellow: ["* 呱呱。(當怪物名字變成\\Y黃色\\W時，\n  就代表可以寬恕牠們囉！)"],
    frogFour: ["* 呱呱。(你有發現這個房間裡的\n  \\Y第四隻青蛙\\W藏在哪裡嗎？)"],
    tinyFrog: ["* (仔細往牆縫裡一看……\n  裡面竟然有一隻超迷你的小青蛙\n  正在對你揮手！)"],
    signOneSwitch: ["* 這裡只有一個開關。"],
    ribbonGet: ["* 你找到了\\Y褪色緞帶\\W！\n* (可在 [C] -> ITEM 裝備，DF +3！)"],
    blookPit: ["* 啊……沒想到會有人掉下來這裡……\n* 抱歉，我馬上消失……"],
    switchClick: ["* 喀噠！\n* 傳來了地刺收起的聲音！"],
    plaque15A: ["* 請按下\\B藍色開關\\W。"],
    plaque15B: ["* 請按下\\R紅色開關\\W。"],
    plaque15C: ["* 請按下\\G綠色開關\\W。"],
    plaque15D: ["* 發現了嗎？每個房間其實只是\n  旋轉了方向而已！往東前進吧！"],
    plaque15E: ["* 哎呀！按錯顏色了嗎？\n  往北走重新挑戰吧！"],
    frogGroceries: ["* 呱呱。(我剛才看到\\B托麗爾\\W提著\n  採買的食材從這裡出去喔！)"],
    toyKnifeGet: ["* 你找到了\\Y玩具刀\\W！\n* (可在 [C] -> ITEM 裝備，AT +3！)"],
    torielOutsideHome: [
      { who: "toriel", expr: "side",   text: "* 哎呀，比我想像中花了更久時間！" },
      { who: "toriel", expr: "happy",  text: "* 你是怎麼自己走到這裡的，孩子？\n* 來，讓我替你治療並進屋吧！" }
    ],
    homeVase: ["* 花瓶裡插著充滿元氣的金色花朵。"],
    homeCalendar: ["* 201X 年初的舊日曆，\n  其中一天被紅筆圈了起來。"],
    torielHallTour: [
      { who: "toriel", expr: "happy",  text: "* 你聞到了嗎？\n* 驚喜！是剛烤好的奶油糖肉桂派！" },
      { who: "toriel", expr: "normal", text: "* 第一扇門就是專屬於你的房間！\n  走累了就先進房睡個午覺吧！" }
    ],
    mirrorNormal: ["* 是你自己！"],
    mirrorGenocide: ["\\R* 是我，Chara。"],
    hallPlant: ["* 喔！是一株「水香腸」盆栽。"],
    hallPainting: ["* 一幅描繪地下世界三角符文的畫。"],
    hallLocked: ["* 這個房間正在整修中。"],
    yourToys: ["* 滿箱子的玩具！\n* 不過你一點興趣也沒有。"],
    yourShoes: ["* 衣櫃裡整齊排著各種尺寸的鞋子。"],
    yourPhoto: ["* 積了一點灰塵的相框。"],
    yourBedPrompt: { text: "* 這張床看起來超舒服。\n* 要躺下來睡一覺嗎？", choices: ["睡覺", "還不要"] },
    yourBedWake: ["* 你香甜地睡了一覺……\n* HP 完全恢復了！"],
    pieFloorPrompt: { text: "* 地板上放著一盤奶油糖肉桂派！\n* 要收進背包嗎？", choices: ["收下肉桂派", "先放著"] },
    pieTaken: ["* 你獲得了\\Y奶油肉桂派\\W！"],
    torRoomBed: ["* 比單人床還要大上許多的雙人床。"],
    torRoomDiary: ["* 是托麗爾的日記：\n  「為什麼骷髏想要交朋友？\n    因為她覺得很『骨』單……」"],
    torRoomCactus: ["* 啊，仙人掌。\n* 植物界裡最傲嬌的存在。"],
    torRoomSocks: ["* 你偷看了一下抽屜……\n  裡面整齊摺著滿滿的襪子。"],
    torRoomChair: ["* 一張尺寸適中的木椅。"],
    kitchenPie: ["* 料理台上放涼著剛烤好的派。"],
    kitchenStove: ["* 爐台乾淨得發亮——\n  托麗爾做菜肯定都用火魔法。"],
    kitchenSink: ["* 水槽排水口卡著一點白色的毛。"],
    kitchenFridge: ["* 冰箱裡有一條名牌巧克力棒\n  和幾罐蝸牛。"],
    kitchenGenocide: ["\\R* 刀子在哪裡。"],
    livingFire: ["* 壁爐裡的火焰一點也不燙人，\n  只有令人安心的溫暖。"],
    livingBooks: ["* 《蝸牛的 72 種用途》。\n* 真是太吸引人了。"],
    livingChair: ["* 托麗爾的扶手椅，\n  名字叫作「椅麗爾 (Chairiel)」。"],
    livingTable: ["* 足以讓一家人圍坐用餐的餐桌。"],
    torielLivingAsk1: [
      { who: "toriel", expr: "happy",  text: "* 已經睡醒了嗎？\n* 把這裡當成自己的家吧，孩子！" },
      { who: "toriel", expr: "normal", text: "* 你想聊些什麼呢？", choices: ["如何離開遺跡", "聽蝸牛冷知識"], choiceKey: "livingChoice1" }
    ],
    torielSnailFact: [{ who: "toriel", expr: "happy", text: "* 喔！你知道蝸牛完全不適合拿來\n  當鞋帶嗎？很有趣對吧！嘻嘻！" }],
    torielExit1: [{ who: "toriel", expr: "side", text: "* ……唔，不然我們來聊有趣的\n  蝸牛知識好嗎？" }],
    torielExit2: [{ who: "toriel", expr: "cold", text: "* ……\n* 我有件事非做不可。\n* 待在這裡別動。" }],
    basement1: [
      { who: "toriel", expr: "side",   text: "* 前方就是遺跡的盡頭——\n  通往地下世界其他地方的單向出口。" },
      { who: "toriel", expr: "cold",   text: "* 我現在就要去把它毀掉。\n* 乖孩子，現在回樓上去吧。" }
    ],
    basement2: [
      { who: "toriel", expr: "cold",   text: "* 每一個跌落到這裡的人類，\n  最終都迎來了相同的命運。\n  他們到來、他們離開、他們死去。" },
      { who: "toriel", expr: "cold",   text: "* 一旦你離開遺跡，\n  \\R艾斯戈爾 (ASGORE)\\W 會殺了你的。" }
    ],
    basement3: [{ who: "toriel", expr: "cold", text: "* 不要試圖阻止我。\n* 這是最後的警告。" }],
    basement4: [
      { who: "toriel", expr: "cold",   text: "* 你就這麼想離開嗎？\n* 哼……你跟其他人一模一樣。" },
      { who: "toriel", expr: "cold",   text: "* 證明給我看……\n* 證明你有足以在外面活下去的力量！" }
    ],
    torielSpareLines: [
      "……", "…………", "……你在做什麼？", "快攻擊我，\n或者逃跑啊！",
      "你這樣做想證明\n什麼？", "跟我戰鬥，\n否則就回樓上去！", "別用那種眼神\n看著我。",
      "回樓上去！", "……我知道你想回家，\n可是……", "求求你……\n現在回樓上去吧。",
      "我保證我會在這裡\n好好照顧你的。",
      "哈哈……很可悲對吧？\n我甚至連一個孩子\n都留不住。",
      "不，我明白了。\n把你關在這裡，\n你也只會不快樂。"
    ],
    torielAfterSpared: [
      { who: "toriel", expr: "side",   text: "* 習慣之後，遺跡其實非常狹小。\n* 讓你在這樣的地方長大，\n  對你並不公平。" },
      { who: "toriel", expr: "happy",  text: "* 如果你真的想離開遺跡，\n  我不會再阻攔你了。\n* 要好好保重喔……我的孩子。" }
    ],
    floweyEndPacifist: [
      { who: "flowey", expr: "normal", text: "* 真聰明，真是太聰明了。\n* 你以為自己很了不起，對吧？" },
      { who: "flowey", expr: "evil",   text: "* 嘻嘻嘻……要是接下來遇到\n  毫不留情的殺手，你又該怎麼辦呢？" },
      { who: "flowey", expr: "laugh",  text: "* 我會一直盯著你的！\n* 嘻嘻嘻……" }
    ],
    floweyEndNeutral: [
      { who: "flowey", expr: "evil",   text: "* 嘻嘻嘻……\n* 結果你還是痛下殺手了嘛！" },
      { who: "flowey", expr: "laugh",  text: "* 在這地底沒有人是無辜的。\n* 就讓我看看你的「決心」能走多遠！" }
    ],
    floweyEndGenocide: [
      { who: "flowey", expr: "normal", text: "* 哈哈哈……\n* 你根本不是人類，對吧？" },
      { who: "flowey", expr: "wink",   text: "* 你的內心和我一樣空洞。\n* 事實上……你是 \\RChara\\W，對吧？" },
      { who: "flowey", expr: "evil",   text: "* 經過了這麼多年，我們依然密不可分。\n* 聽好，我有個能獲得無上力量的計畫。" },
      { who: "flowey", expr: "laugh",  text: "* 讓我們把這個可悲世界裡的一切\n  全都化為塵埃吧！" }
    ],
    // SNOWDIN DIALOGUE (繁中)
    snowBushCamera: ["* (灌木叢裡竟然藏著一台監視攝影機。)"],
    sansBridgeIntro: [
      { who: "sans", expr: "dark",   text: "* 人類。" },
      { who: "sans", expr: "dark",   text: "* 難道你不知道該怎麼跟新朋友\n  打招呼嗎？\n* 轉過身來，跟我握個手吧。" },
      { who: "narrator",             text: "* (噗～～～～～！)\n* (響亮的放屁墊聲音迴盪在雪林裡！)" },
      { who: "sans", expr: "wink",   text: "* 呵呵呵……掌中放屁墊的老把戲，\n  永遠都這麼好笑。" },
      { who: "sans", expr: "normal", text: "* 話說回來，你是人類對吧？真逗。\n* 我叫 \\Bsans\\W，骷髏 sans。" },
      { who: "sans", expr: "normal", text: "* 我本來應該在這看守有沒有人類經過，\n  不過嘛……我其實一點也不想抓任何人。" },
      { who: "sans", expr: "wink",   text: "* 但我老弟 \\Y帕派瑞斯 (PAPYRUS)\\W\n  可是個抓人類狂熱份子。\n* 糟糕，他來了！快躲到那盞\n  \\Y形狀剛好的檯燈\\W後面！" }
    ],
    sansBridgeGeno: [
      { who: "sans", expr: "dark",   text: "* 人類。\n* 難道你不知道該怎麼跟新朋友打招呼嗎？\n* 轉過身來，跟我握個手吧。" },
      { who: "narrator",             text: "* (噗～～～～～！)" },
      { who: "sans", expr: "noeyes", text: "* ……咦，掌中放屁墊的老把戲，\n  一般人好歹也會笑一下吧。" },
      { who: "sans", expr: "normal", text: "* 我叫 sans，我老弟帕派瑞斯要來了。\n* 就算你懶得躲，也多少配合他一下吧。" }
    ],
    papyrusLampScene: [
      { who: "papyrus", expr: "mad",    text: "SANS！！你找到人類了沒！？" },
      { who: "sans",    expr: "wink",   text: "* 喔，我好像看到那盞檯燈旁邊\n  有一個喔。" },
      { who: "papyrus", expr: "mad",    text: "SANS！！我沒空聽你講雙關冷笑話！\n皇家衛隊還等著我立大功呢！" },
      { who: "papyrus", expr: "normal", text: "我一定會親手抓住人類！\n到時候我，\\Y偉大的帕派瑞斯\\W，\n就會成為萬眾矚目的焦點！\n喔呵呵呵呵呵 (NYEH HEH HEH)！！" },
      { who: "sans",    expr: "wink",   text: "* 好啦，他走了，你可以出來囉。\n* 前面見啦，小鬼。" }
    ],
    boxRoadGlove: ["* 你打開了次元箱……\n* 裡面有一副\\Y粗皮手套 (Tough Glove)\\W！\n  (武器 AT +5，攻擊時可連按 Z 出拳！)"],
    boxRoadEmpty: ["* 次元箱安靜地放在路邊。"],
    fishingRodSign: ["* 釣竿的魚線末端綁著一張奇怪怪物的照片，\n  上面寫著「媽媽來電！」。"],
    doggoIntro: [
      { who: "narrator", text: "* 「哨兵站」\n* 誰在那裡！？等我抽完這根狗餅乾！" },
      { who: "narrator", text: "* 等等……剛才有東西在動嗎！？\n* 我只能看見移動中的物體！\n* 如果有東西敢動，我就砍到它再也\n  動不了為止！" }
    ],
    doggoAfter: ["* 什麼！？我竟然被摸頭了！！\n* 有東西一動也不動就摸到了我！\n* 我得去吃點狗餅乾冷靜一下……"],
    electricMazeIntro: [
      { who: "papyrus", expr: "normal", text: "人類！我在這片雪地上佈置了\n「隱形電擊迷宮」！" },
      { who: "papyrus", expr: "cool",   text: "只要你踩錯一步，我手上這顆電球\n就會狠狠電你一下！快試試看吧！" },
      { who: "narrator",                text: "* (滋滋滋滋——啪！！)\n* (因為拿著電球的是帕派瑞斯自己，\n  他被電得全身冒煙！)" },
      { who: "papyrus", expr: "wacky",  text: "SANS！！為什麼被電的人是我！？" },
      { who: "sans",    expr: "wink",   text: "* 我想應該是人類要拿著電球才對吧。" },
      { who: "papyrus", expr: "normal", text: "原來如此！人類，幫我拿著這顆——\n算了！這關不算！喔呵呵呵呵！" }
    ],
    wordSearchIntro: [
      { who: "papyrus", expr: "normal", text: "SANS！！這是什麼！？\n兒童報紙的填字遊戲！？\n我不是叫你準備謎題攔住人類嗎！！" },
      { who: "sans",    expr: "wink",   text: "* 嘿，沒有什麼比填字遊戲更能讓人類\n  停下腳步的了。" },
      { who: "papyrus", expr: "mad",    text: "太離譜了！！\n下一個謎題我要親自出馬！！" }
    ],
    wordSearchGeno: [
      { who: "papyrus", expr: "sweat",  text: "人類……？你連看都沒看一眼\n就直接踩過了這張謎題紙……" },
      { who: "sans",    expr: "noeyes", text: "* ……小鬼，我老弟花了很多心思準備謎題。\n* 稍微配合他一下不會少塊肉吧。" }
    ],
    snowmanGive: [
      "* 你好呀，旅人！\n* 我是一個雪人，很想去看看外面的世界，\n  可惜我一步也動不了。",
      "* 求求你，帶走我身上的一小塊雪，\n  帶著它走向遙遠的地方吧……\n* (你獲得了\\Y雪人碎片\\W！可恢復 45 HP。)"
    ],
    snowmanThanks: ["* 謝謝你！請帶著我的碎片去看看外面的世界吧！"],
    niceCreamPrompt: { text: "* 歡迎光臨！要花 15G 買一支\n  好棒冰淇淋 (Nice Cream，補 15 HP) 嗎？", choices: ["購買 (15G)", "不用了"] },
    niceCreamBought: ["* 來，請慢用！祝你有個超棒的一天！\n* (好棒冰淇淋已放入背包。)"],
    snowSwitchFound: ["* 雪堆底下藏著一個開關！*喀噠！*\n* 右下方的地刺收起來了！"],
    dogiIntro: [
      "* 站住！那是什麼氣味……？(嗅嗅)",
      "* 是人類！！只要解決掉你，我們就能奪下\n  年度磨鼻子大賽的冠軍了！"
    ],
    spaghettiNote: ["* 「人類！！請盡情享用這盤義大利麵吧！\n  （你絕對想不到這其實是個美食陷阱！！\n  喔呵呵呵！——帕派瑞斯留）」\n* (義大利麵已經結凍黏在桌子上了。)"],
    xoSign: ["* 踩過所有「X」地磚使其變成「O」，\n  再按下開關即可收起地刺！"],
    tileMachineScene: [
      { who: "papyrus", expr: "cool",   text: "人類！！見識我的「七彩電子地磚謎題」吧！\n紅磚禁止通行！黃磚會漏電！\n橘磚會讓你變成柳丁味，檸檬磚會召喚食人魚！" },
      { who: "papyrus", expr: "normal", text: "聽懂了嗎！？很好，啟動機器！！" },
      { who: "narrator",                text: "* (嗶嗶啵啵……地磚機轉出了一整排\n  完全無害的粉紅直線通道！)" },
      { who: "papyrus", expr: "wacky",  text: "…………\n喔呵呵呵！！算你這次運氣好，人類！！" }
    ],
    greaterDogIntro: [
      "* 你走近那座大得異常的雪堆……\n* 突然間，身穿巨大重甲的大犬座衛兵\n  從雪堆裡蹦了出來！"
    ],
    gauntletBridgeScene: [
      { who: "papyrus", expr: "cool",   text: "站住，人類！！\n歡迎來到「致命恐怖的死亡吊橋」！！" },
      { who: "papyrus", expr: "normal", text: "只要我一聲令下，這座吊橋就會噴出火焰、\n尖刺、大砲，還有一隻綁在繩子上的小狗！" },
      { who: "papyrus", expr: "sweat",  text: "……等等，這樣對付你好像太缺乏運動家\n精神了。我還是把機關收起來吧！\n下次再跟你堂堂正正對決！喔呵呵呵！" },
      { who: "sans",    expr: "wink",   text: "* 別介意，小鬼。\n* 帕派瑞斯其實是個很善良的傢伙。" }
    ],
    gauntletBridgeGeno: [
      { who: "papyrus", expr: "sweat",  text: "人類……面對我的死亡吊橋，\n你的眼神居然連一絲波動都沒有。\n我……我還是把機關關掉好了。" },
      { who: "sans",    expr: "noeyes", text: "* ……如果你繼續這樣殺下去……\n* 你接下來肯定會過得很\\R難受 (bad time)\\W。" }
    ],
    snowdinShopPrompt: {
      text: "* 歡迎光臨雪町商店！\n  今天想買點什麼呢？",
      choices: ["雙生冰棒 (15G) / 肉桂捲 (25G)", "男子漢頭巾 (50G, DF+7)"]
    },
    snowdinShopGenoPrompt: {
      text: "* 店員已經撤離了……\n* 桌上留著字條：「請不要傷害我的家人。」",
      choices: ["拿走收銀機 758G 與商品", "離開"]
    },
    snowdinInnPrompt: {
      text: "* 歡迎來到雪屋旅店！\n  要休息一晚，將 HP 提升至上限以上 (30 HP) 嗎？",
      choices: ["休息一晚 (免費！)", "不用了"]
    },
    papyrusBossIntro: [
      { who: "papyrus", expr: "normal", text: "人類……\n容我向你訴說我此刻複雜的心情。" },
      { who: "papyrus", expr: "sweat",  text: "找到另一位義大利麵同好的喜悅……\n對你解謎才華的欽佩……" },
      { who: "papyrus", expr: "cool",   text: "這些肯定就是你現在對我抱持的崇拜之情吧！\n能遇見我這麼酷的骷髏，你一定激動壞了！" },
      { who: "papyrus", expr: "normal", text: "只要抓到你，我就能正式加入皇家衛隊！\n放馬過來吧，人類！喔呵呵呵呵！！" }
    ],
    papyrusBossGenoIntro: [
      { who: "papyrus", expr: "sweat",  text: "站住，人類！\n我還在跟你說話，別一直往前走啊！" },
      { who: "papyrus", expr: "sweat",  text: "老實說，你滿手塵埃、步履蹣跚的模樣\n一開始確實讓我有點害怕……" },
      { who: "papyrus", expr: "normal", text: "但我，偉大的帕派瑞斯，看穿了這一切！\n你一定只是迷失了方向！所以我不會攻擊你，\n讓我當你的朋友，引導你走回正途吧！" }
    ],
    papyrusAfterSpared: [
      { who: "papyrus", expr: "sweat",  text: "哇喔……我竟然連你都打不贏……\n而且你還一根指頭都沒傷到我！" },
      { who: "papyrus", expr: "cool",   text: "既然如此，我就破例准許你當我的好朋友！\n隨時歡迎來雪町鎮我的家裡作客！" },
      { who: "papyrus", expr: "normal", text: "想前往下一區「瀑布 (Waterfall)」的話，\n只要從我身後往右走就可以囉！喔呵呵呵！" }
    ]
  }
};
