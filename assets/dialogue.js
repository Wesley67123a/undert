// Complete Authentic Bilingual (EN / 繁中) Script, Items, Monsters & Full Ruins Walkthrough
window.UT_ITEMS = {
  Candy:   { en: "Monster Candy", zh: "怪物糖果", short: "MnstrCndy", type: "heal", hp: 10, descEn: "* Heals 10 HP\n* Has a distinct, non-licorice\n  flavor.", descZh: "* 恢復 10 HP\n* 有著獨特的非甘草風味。" },
  Donut:   { en: "Spider Donut",  zh: "蜘蛛甜甜圈", short: "SpidrDont", type: "heal", hp: 12, descEn: "* Heals 12 HP\n* A donut made with Spider Cider\n  in the batter.", descZh: "* 恢復 12 HP\n* 麵糊裡摻了蜘蛛蘋果汁的甜甜圈。" },
  Cider:   { en: "Spider Cider",  zh: "蜘蛛蘋果汁", short: "SpidrCidr", type: "heal", hp: 24, descEn: "* Heals 24 HP\n* Made with whole spiders,\n  not just the juice.", descZh: "* 恢復 24 HP\n* 用整隻蜘蛛鮮榨而成。" },
  Pie:     { en: "Butterscotch Pie", zh: "奶油肉桂派", short: "ButtsPie", type: "heal", hp: 99, descEn: "* All HP\n* Butterscotch-cinnamon pie,\n  one slice.", descZh: "* 恢復全部 HP\n* 一片溫暖的奶油糖肉桂派。" },
  Bandage: { en: "Bandage",       zh: "繃帶",     short: "Bandage",   type: "heal", hp: 10, descEn: "* Heals 10 HP\n* It has already been used\n  several times.", descZh: "* 恢復 10 HP\n* 看起來已經重複用過好幾次了。" },
  Stick:   { en: "Stick",         zh: "木枝",     short: "Stick",     type: "weapon", atk: 0, descEn: "* Weapon AT 0\n* Its bark is worse than\n  its bite.", descZh: "* 武器 AT 0\n* 叫聲比咬人還兇的樹枝。" },
  ToyKnife:{ en: "Toy Knife",     zh: "玩具刀",   short: "Toy Knife", type: "weapon", atk: 3, descEn: "* Weapon AT 3\n* Made of plastic. A rarity\n  nowadays.", descZh: "* 武器 AT 3\n* 塑膠製的玩具刀，如今相當罕見。" },
  Ribbon:  { en: "Faded Ribbon",  zh: "褪色緞帶", short: "Ribbon",    type: "armor",  def: 3, descEn: "* Armor DF 3\n* If you're cuter, monsters\n  won't hit you as hard.", descZh: "* 防具 DF 3\n* 變可愛的話，怪物下手也會輕一點。" }
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
    nameEn: "Whimsun", nameZh: "微風妖", spr: "spr_whimsun", hp: 10, maxHp: 10, atk: 4, def: 0, exp: 2, gold: 2, bgm: "battle", spareStart: true,
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
    nameEn: "Loox", nameZh: "獨眼怪", spr: "spr_loox", hp: 50, maxHp: 50, atk: 6, def: 4, exp: 7, gold: 5, bgm: "battle",
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
    nameEn: "Vegetoid", nameZh: "蔬菜怪", spr: "spr_vegetoid", hp: 72, maxHp: 72, atk: 6, def: 6, exp: 6, gold: 4, bgm: "battle",
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
    nameEn: "Migosp", nameZh: "米戈蟲", spr: "spr_migosphappy", hp: 40, maxHp: 40, atk: 5, def: 4, exp: 5, gold: 4, bgm: "battle", spareStart: true,
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
    nameEn: "Toriel", nameZh: "托麗爾", spr: "spr_torielboss", hp: 440, maxHp: 440, atk: 6, def: 1, exp: 150, gold: 0, bgm: "heartache",
    encounterEn: "* Toriel blocks the way!", encounterZh: "* 托麗爾擋住了去路！",
    idleEn: ["* Toriel blocks the way!", "* Toriel looks through you.", "* Toriel is preparing a\n  magical attack.", "* Toriel takes a deep breath."],
    idleZh: ["* 托麗爾擋住了去路！", "* 托麗爾將視線穿過了你。", "* 托麗爾正在凝聚火焰魔法。", "* 托麗爾深深吸了一口氣。"],
    acts: [
      { id: "check", en: "Check", zh: "查看" },
      { id: "talk",  en: "Talk",  zh: "交談" }
    ]
  }
};

window.UT_WALKTHROUGH = [
  { id: 1,  room: 1,  titleEn: "01. Intro Story & Title", titleZh: "01. 開場傳說與標題", tipEn: "Watch the 11-panel legend of Humans & Monsters, or press [X] to skip straight to the Title Screen.", tipZh: "觀看人類與怪物的 11 幕傳說，或按 [X] 跳至標題畫面。" },
  { id: 4,  room: 4,  titleEn: "02. Golden Flower Bed (room_area1)", titleZh: "02. 金色花海 (room_area1)", tipEn: "Inspect the golden flowers with [Z], then walk right across the 680px cavern to the purple archway.", tipZh: "按 [Z] 調查金黃色花海，接著往右走進紫色拱門。" },
  { id: 5,  room: 5,  titleEn: "03. Flowey & Toriel Rescue", titleZh: "03. 小花遭遇戰與托麗爾救援", tipEn: "Meet Flowey. Dodge or touch his 'friendliness pellets'—Toriel rescues you with fire magic and leads you into the Ruins.", tipZh: "遇見小花 Flowey。躲開或碰觸「友愛顆粒」，托麗爾會用火焰救下你並帶你進入遺跡。" },
  { id: 6,  room: 6,  titleEn: "04. Ruins Entrance & SAVE #1", titleZh: "04. 遺跡大階梯與存檔點 #1", tipEn: "Follow Toriel up the grand double staircase. Touch the glowing yellow star to SAVE your game!", tipZh: "跟隨托麗爾走上雙側大階梯，調查發光黃星即可存檔並回滿血。" },
  { id: 7,  room: 7,  titleEn: "05. Six Plates Puzzle (room_ruins2)", titleZh: "05. 六踏板謎題 (room_ruins2)", tipEn: "Toriel demonstrates stepping on the outer four floor switches and flips the lever to open the stone door.", tipZh: "托麗爾會親自示範踩下左右四個踏板並拉下牆上拉桿開門。" },
  { id: 8,  room: 8,  titleEn: "06. Bridges & Labeled Switches", titleZh: "06. 小橋與黃箭頭開關房", tipEn: "Cross both bridges and press the TWO wall switches marked with Toriel's yellow arrows to retract the spikes.", tipZh: "走過木橋，按下托麗爾畫了黃色箭頭標記的兩個牆壁開關即可收起地刺。" },
  { id: 9,  room: 9,  titleEn: "07. Dummy Practice Battle", titleZh: "07. 訓練假人戰鬥教學", tipEn: "Inspect the Dummy -> choose ACT -> Talk to end the fight peacefully and make Toriel proud!", tipZh: "調查假人進入戰鬥 → 選擇 ACT → Talk 與假人聊天即可和平過關！" },
  { id: 10, room: 10, titleEn: "08. Froggit & Spike Bridge", titleZh: "08. 青蛙遭遇與地刺吊橋", tipEn: "Walk north-east: Toriel glares at an approaching Froggit, then guides you step-by-step across the retracting spike bridge.", tipZh: "托麗爾會用眼神嚇退 Froggit，接著牽著你一步步走過自動收起的地刺橋。" },
  { id: 11, room: 11, titleEn: "09. Independence Hall & Cell Phone", titleZh: "09. 獨立長廊與獲得手機", tipEn: "Walk all 2500px to the far right! Toriel pops out from behind the pillar and gives you the CELL PHONE ([C] Menu -> CELL).", tipZh: "獨自往右走到底！托麗爾會從柱子後現身並送你手機（按 [C] 開啟選單撥打）。" },
  { id: 12, room: 12, titleEn: "10. Leaf Pile Hub & SAVE #2", titleZh: "10. 落葉堆存檔點 #2", tipEn: "SAVE at the star in the leaves. Go NORTH first for free Monster Candy, then SOUTHEAST to continue!", tipZh: "在落葉堆存檔。可先往北拿免費怪物糖果，再往右下出口前進。" },
  { id: 13, room: 13, titleEn: "11. Secret: Monster Candy Dish", titleZh: "11. 支線：怪物糖果台", tipEn: "Take up to 3 pieces of Monster Candy (+10 HP each). Taking a 4th spills the bowl onto the floor!", tipZh: "最多可拿 3 顆怪物糖果（各補 10 HP），拿第 4 顆會把糖果碗弄翻！" },
  { id: 14, room: 14, titleEn: "12. Cracked Floor Drop (room_ruins8)", titleZh: "12. 裂縫落穴房 (room_ruins8)", tipEn: "Step onto the cracked tiles to drop into the lower leaf room, then take the RIGHT doorway to climb up past the gap!", tipZh: "踩上裂縫掉進下層落葉房，走右側門即可爬回上層對岸！" },
  { id: 15, room: 15, titleEn: "13. First Rock & Pie Call", titleZh: "13. 推石謎題與口味電話", tipEn: "Answer Toriel's Cinnamon vs. Butterscotch call, then push the grey rock onto the floor plate to lower the spikes.", tipZh: "接聽托麗爾詢問肉桂或奶油糖口味的電話，並將石頭推上踏板收起地刺。" },
  { id: 16, room: 16, titleEn: "14. Cracked Floor Leaf Maze", titleZh: "14. 裂縫迷宮（下層落葉提示）", tipEn: "If you fall, check the red leaf trail on the lower floor! Safe path upstairs: go 4 tiles right along the middle, dip down, then right.", tipZh: "掉到下層可看到落葉排出的安全路線！爬回上層照著安全路徑走即可通過。" },
  { id: 17, room: 17, titleEn: "15. Three Rocks & Talking Rock", titleZh: "15. 三顆石頭與說話石頭", tipEn: "Talk [Z] to the bottom rock twice so it slides onto its plate; when it moves off, talk to it once more so it stays put!", tipZh: "對最下方的石頭按 [Z] 對話請牠移到踏板上；若牠移開，再對話一次請牠留步即可！" },
  { id: 18, room: 18, titleEn: "16. Mouse Hole & Stuck Cheese", titleZh: "16. 老鼠洞與陳年起司存檔點", tipEn: "Inspect the mouse hole & cheese table, and SAVE at SAVE Point #3.", tipZh: "調查老鼠洞與起司桌，並在存檔點 #3 存檔。" },
  { id: 19, room: 19, titleEn: "17. Napstablook Miniboss & Bake Sale", titleZh: "17. 幽靈 Napstablook 與蜘蛛義賣", tipEn: "Go EAST first for the Spider Bake Sale (7G Donut / 18G Cider). Then inspect Napstablook -> ACT -> Cheer 3x -> Spare!", tipZh: "先往右逛蜘蛛烘焙義賣（7G 甜甜圈／18G 蘋果汁）。再調查幽靈選擇 Cheer 鼓勵三次即可寬恕並往北走！" },
  { id: 21, room: 21, titleEn: "18. Three Froggits & Microscopic Frog", titleZh: "18. 三隻青蛙與牆縫迷你蛙", tipEn: "Chat with the Froggits and inspect the wall crack in the center to spot the secret 4th microscopic frog!", tipZh: "與青蛙們交談，並調查中央牆縫發現隱藏的第四隻超迷你青蛙！" },
  { id: 22, room: 22, titleEn: "19. Six Pits & Secret Faded Ribbon", titleZh: "19. 六洞謎題與隱藏褪色緞帶", tipEn: "Drop into BOTTOM-LEFT pit for the Faded Ribbon (DF +3)! Drop into TOP-MIDDLE pit and flip the lever to retract the spikes!", tipZh: "跳進左下洞拿【褪色緞帶 (DF+3)】！跳進上排中間洞拉下隱藏開關即可收起地刺！" },
  { id: 23, room: 23, titleEn: "20. Rotating Perspective Switches (15A-D)", titleZh: "20. 旋轉視角四色開關房", tipEn: "Room 1 (15A): press BLUE switch. Room 2 (15B): press RED switch. Room 3 (15C): press GREEN switch behind pillar! Room 4 (15D): walk east!", tipZh: "第 1 間按藍色開關 → 第 2 間按紅色開關 → 第 3 間按柱子後的綠色開關 → 第 4 間直接往右過關！" },
  { id: 30, room: 30, titleEn: "21. Secret: City Balcony & Toy Knife", titleZh: "21. 支線：地下古城陽台與玩具刀", tipEn: "From the Crossroads (room 28), go EAST -> NORTH to reach the twilight city balcony and pick up the Toy Knife (AT +3)!", tipZh: "在十字路口往右再往上走到古城陽台，拾取地上的【玩具刀 (AT+3)】！" },
  { id: 31, room: 31, titleEn: "22. Black Tree & Toriel's Cottage", titleZh: "22. 黑枯樹與托麗爾家門前", tipEn: "From Crossroads go NORTH. Toriel heals you! SAVE at SAVE Point #4 and step inside her cozy home.", tipZh: "從十字路口往北走，托麗爾會替你回滿血！存檔後走進溫馨小屋。" },
  { id: 32, room: 32, titleEn: "23. Exploring Toriel's Home & Pie", titleZh: "23. 探索托麗爾的家與肉桂派", tipEn: "Go RIGHT down the hallway (check the Mirror!) into the first bedroom and SLEEP in the bed to get the Butterscotch Pie!", tipZh: "往右走進臥室走廊（別忘了照鏡子！），進第一間臥室上床睡覺即可獲得整塊奶油肉桂派！" },
  { id: 38, room: 38, titleEn: "24. The Basement & Boss Toriel", titleZh: "24. 地下室長廊與托麗爾 Boss 戰", tipEn: "Talk to Toriel in the Living Room ('How to exit the RUINS') until she goes downstairs. Follow her through Basement 1-4. In battle, choose MERCY -> Spare repeatedly (13x) to spare her!", tipZh: "去客廳向托麗爾詢問如何離開遺跡，跟隨她走過地下室四段長廊。Boss 戰中持續選擇 MERCY -> Spare 寬恕她即可感化通關！" },
  { id: 43, room: 43, titleEn: "25. Flowey's Judgment & Ruins Exit", titleZh: "25. 小花最終評語與踏出遺跡", tipEn: "Walk up the long purple corridor to hear Flowey's verdict on your choices, then step through the grand door to complete The Ruins!", tipZh: "走過漫長紫色走廊聽取小花的最終評語，推開遺跡大門迎接 UNDERTALE 標題完美謝幕！" }
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
      "",
      "",
      "",
      ""
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
      43: "Ruins - Final Chamber"
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
      dodge1: [
        { expr: "side",   text: "Hey buddy, you\nmissed them.\nLet's try again,\nokay?" }
      ],
      dodge2: [
        { expr: "pissed", text: "Is this a joke?\nAre you braindead?\nRUN. INTO. THE.\nBULLETS!!!" },
        { expr: "evil",   text: "...You know what...\nfriendliness pellets." }
      ],
      evilHit: [
        { expr: "evil",   text: "You idiot." },
        { expr: "evil",   text: "In this world, it's\nKILL or BE killed." },
        { expr: "laugh",  text: "Why would ANYONE pass\nup an opportunity\nlike this!?" },
        { expr: "evil",   text: "DIE." }
      ],
      evilDodge: [
        { expr: "evil",   text: "You know what's going\non here, don't you?" },
        { expr: "laugh",  text: "You just wanted to\nsee me suffer.\nDIE." }
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
    plaqueRuins1: ["* Only the fearless may proceed.\n* Brave ones, foolish ones.\n* Both walk not the middle road."],
    torielRuins2: [
      { who: "toriel", expr: "normal", text: "* Welcome to your new home,\n  innocent one." },
      { who: "toriel", expr: "normal", text: "* Allow me to educate you in the\n  operation of the RUINS." },
      { who: "toriel", expr: "happy",  text: "* The RUINS are full of puzzles.\n* Ancient fusions between\n  diversions and doorkeys." },
      { who: "toriel", expr: "normal", text: "* One must solve them to move\n  from room to room.\n* Please adjust yourself to the\n  sight of them." }
    ],
    torielRuins3Intro: [
      { who: "toriel", expr: "normal", text: "* To make progress here, you\n  will need to trigger several\n  switches." },
      { who: "toriel", expr: "happy",  text: "* Do not worry, I have labelled\n  the ones that you need to\n  flip." }
    ],
    torielRuins3Sw1: [
      { who: "toriel", expr: "happy",  text: "* Splendid!\n* I am proud of you, little one.\n* Let us move to the next room." }
    ],
    torielRuins3Wrong: [
      { who: "toriel", expr: "side",   text: "* Wow! You are very proactive!\n* ...However, that is the wrong\n  switch. Look for the markings!" }
    ],
    signStayPath: ["* Stay on the path."],
    noteSwitch1: ["* Toriel's markings:\n  \"Please press this switch.\""],
    noteSwitch2: ["* Toriel's markings:\n  \"Also, please press this switch.\""],
    torielRuins4Intro: [
      { who: "toriel", expr: "normal", text: "* As a human living in the\n  UNDERGROUND, monsters may\n  attack you." },
      { who: "toriel", expr: "normal", text: "* You will need to be prepared\n  for this situation.\n* However, worry not! The\n  process is simple." },
      { who: "toriel", expr: "happy",  text: "* When you encounter a monster,\n  you will enter a \\YFIGHT\\W.\n* While in a \\YFIGHT\\W, strike up\n  a friendly conversation!" },
      { who: "toriel", expr: "normal", text: "* Stall for time, and I will\n  come to resolve the conflict.\n* Practice talking to the dummy!" }
    ],
    torielDummyGood: [{ who: "toriel", expr: "happy", text: "* Ah, very good!\n* You are very good." }],
    torielDummyHit:  [{ who: "toriel", expr: "side",  text: "* Ahh, the dummies are not for\n  fighting!\n* They are for talking!\n* We do not want to hurt anybody,\n  do we...? Come now." }],
    torielDummyFlee: [{ who: "toriel", expr: "side",  text: "* ...You ran away from a dummy?\n* Well, I suppose nobody was\n  hurt. Come along!" }],
    torielRuins5Intro: [
      { who: "toriel", expr: "normal", text: "* There is another puzzle in\n  this room...\n* I wonder if you can solve it?" }
    ],
    torielRuins5Bridge: [
      { who: "toriel", expr: "side",   text: "* This is the puzzle, but...\n* Here, take my hand for a\n  moment." }
    ],
    torielRuins5Done: [
      { who: "toriel", expr: "happy",  text: "* Puzzles seem a little too\n  dangerous for now.\n* You did wonderfully!" }
    ],
    plaqueBlueprint: ["* The western room is the\n  eastern room's blueprint."],
    torielRuins6Start: [
      { who: "toriel", expr: "normal", text: "* You have done excellently thus\n  far, my child." },
      { who: "toriel", expr: "side",   text: "* However... I have a difficult\n  request to ask of you." },
      { who: "toriel", expr: "side",   text: "* I would like you to walk to\n  the end of the room by\n  yourself.\n* Forgive me for this." }
    ],
    torielRuins6End: [
      { who: "toriel", expr: "happy",  text: "* Greetings, my child.\n* Do not worry, I did not leave\n  you." },
      { who: "toriel", expr: "normal", text: "* I was merely behind this\n  pillar the whole time.\n* Thank you for trusting me." },
      { who: "toriel", expr: "normal", text: "* However, there was an important\n  reason for this exercise...\n* To test your independence." },
      { who: "toriel", expr: "side",   text: "* I must attend to some business,\n  and you must stay alone for a\n  while. Please remain here." },
      { who: "toriel", expr: "happy",  text: "* Oh! Before I go, take this\n  \\YCELL PHONE\\W!\n* Press \\Y[C]\\W anytime if you\n  have a need for anything!" }
    ],
    call1: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "normal", text: "* Hello? This is TORIEL.\n* You have not left the room,\n  have you?" },
      { who: "toriel", expr: "side",   text: "* There are a few puzzles ahead\n  that I have yet to explain.\n* It would be dangerous to try\n  to solve them yourself." },
      { who: "toriel", expr: "happy",  text: "* Be good, alright?\n* Click..." }
    ],
    call2Choice: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "normal", text: "* Hello? This is TORIEL.\n* For no reason in particular...\n* Which do you prefer?" },
      { who: "toriel", expr: "happy",  text: "* Cinnamon, or butterscotch?", choices: ["Cinnamon", "Butterscotch"], choiceKey: "piePref" }
    ],
    call2After: [
      { who: "toriel", expr: "happy",  text: "* Oh, I see!\n* Thank you very much!\n* Click..." }
    ],
    call3Confirm: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "side",   text: "* Hello? This is TORIEL.\n* You do not DISLIKE\n  {PIE}, do you?" },
      { who: "toriel", expr: "happy",  text: "* I know what your preference is,\n  but I wanted to make sure!\n* Thank you for being patient!\n* Click..." }
    ],
    call4Allergy: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "side",   text: "* Hello? You do not have any\n  allergies, do you?\n* Huh? Why am I asking?" },
      { who: "toriel", expr: "happy",  text: "* No reason... No reason at all!\n* Click..." }
    ],
    call5Pockets: [
      { who: "narrator", text: "* Ring... Ring..." },
      { who: "toriel", expr: "normal", text: "* Hello! I realized there may be\n  items lying around the RUINS." },
      { who: "toriel", expr: "happy",  text: "* Feel free to pick them up, but\n  leave room in your pockets for\n  things you really like! Click..." }
    ],
    phoneHello: [{ who: "toriel", expr: "happy", text: "* Ring... This is TORIEL.\n* Oh, you just wanted to say\n  hello...? Well then, 'Hello!'\n* I hope that suffices. Hee hee." }],
    phoneAbout: [{ who: "toriel", expr: "side",  text: "* Ring... You want to know more\n  about me?\n* Well, I am afraid there is not\n  much to say. Just a silly old\n  lady who worries too much!" }],
    phoneMom1:  [{ who: "toriel", expr: "blush", text: "* Ring... Huh?\n* Did you just call me... 'Mom'?\n* Well... I suppose...\n* Would that make you happy?" }, { who: "toriel", expr: "happy", text: "* Please call me whatever you\n  like! Click..." }],
    phoneMom2:  [{ who: "toriel", expr: "happy", text: "* Ring... Yes, my child?\n* Do stay safe in the RUINS!\n* Click..." }],
    phoneFlirt1:[{ who: "toriel", expr: "blush", text: "* Ring... H-huh...?\n* Oh dear, I do not know how to\n  respond to that! Ha ha...\n* You are an interesting child." }],
    phoneFlirt2:[{ who: "toriel", expr: "blush", text: "* Ring... Hee hee, stop that,\n  my child! Focus on the road\n  ahead! Click..." }],
    candyPrompt: { text: "* It says 'take one.'\n* Take a piece of candy?", choices: ["Yes", "No"] },
    candy1: ["* You took a piece of candy.\n* (Monster Candy added to ITEMs.)"],
    candy2: ["* You took more candy.\n* How disgusting..."],
    candy3: ["* You take another piece.\n* You feel like the scum of\n  the earth."],
    candy4: ["* You took too much too fast.\n* The candy spills onto the\n  floor.\n* Look at what you've done."],
    candySpilled: ["* Look at what you've done."],
    frogRuins7: [
      "* Ribbit, ribbit.\n* (Excuse me, human. I have some\n  advice about battling monsters.)",
      "* (If you \\YACT\\W a certain way or\n  \\YFIGHT\\W until you almost defeat\n  them, their name turns \\YYELLOW\\W!)",
      "* (When a monster does not want\n  to fight anymore, please...\n  Use some \\YMERCY\\W, human. Ribbit.)"
    ],
    rockSign: ["* Three out of four grey rocks\n  recommend you push them."],
    plaqueLeaves: ["* Please don't step on the\n  leaves."],
    plaqueUpper10: ["* Look beneath to find the way\n  across the cracks."],
    talkRock1: ["* WHOA there, pardner!\n* Who said you could push me\n  around?"],
    talkRock2: ["* Hmm? So you're ASKING me to\n  move over?\n* Okay, just for you, pumpkin."],
    talkRock3: ["* Hmmm? You want me to STAY\n  there?\n* You're giving me a real\n  workout. Okay, I won't budge!"],
    talkRockDone: ["* Don't worry, pumpkin!\n* I'm staying right on this\n  plate for ya!"],
    mouseHole: ["* Just a regular mouse hole."],
    cheeseTable: ["* This cheese has been here\n  quite a long time.\n* It's stuck to the table..."],
    blookPrompt: { text: "* This ghost keeps saying 'z'\n  out loud repeatedly, pretending\n  to sleep. Move it with force?", choices: ["Yes", "No"] },
    blookAfter: [
      "* hnnnnnnnnnn...\n* oh, i'm sorry... were you\n  trying to walk through here?",
      "* i usually come to the RUINS\n  because there's nobody around,\n  but today i met somebody nice...",
      "* oh, i'm rambling again...\n  i'll get out of your way..."
    ],
    bakeSign: ["* Spider Bake Sale\n* All proceeds go to real\n  spiders."],
    webSmallPrompt: { text: "* A spider web with a Bake Sale\n  flyer. Leave 7G for a Donut?", choices: ["Pay 7G", "Do not"] },
    webBigPrompt:   { text: "* A giant web. Leave 18G for\n  fresh Spider Cider?", choices: ["Pay 18G", "Do not"] },
    bakeBoughtDonut: ["* Some spiders crawled down and\n  handed you a Spider Donut!"],
    bakeBoughtCider: ["* Some spiders crawled down and\n  handed you a jug of Spider\n  Cider!"],
    bakeNoGold: ["* You didn't have enough gold.\n* The spiders pat your pockets\n  sympathetically."],
    bakeFull: ["* Your ITEM pockets are full!"],
    frogXAdvice: [
      "* Ribbit, ribbit. (Sigh...)\n* (Whenever I talk, my friend\n  skips my words with \\Y[X]\\W.)",
      "* (Well, at least YOU listen\n  to me. Thank you! Ribbit.)"
    ],
    frogYellow: [
      "* Ribbit, ribbit.\n* (Yellow names mean you can\n  \\YSPARE\\W a monster!)",
      "* (Everyone in the RUINS appreciates\n  your kindness. Ribbit.)"
    ],
    frogFour: [
      "* Ribbit, ribbit.\n* (Have you ever spotted the\n  \\Yfourth frog\\W in this room?)"
    ],
    tinyFrog: ["* (Upon closer inspection...\n  There is a microscopic frog\n  waving from inside the crack!)"],
    signOneSwitch: ["* There is just one switch."],
    ribbonGet: ["* You found the \\YFaded Ribbon\\W!\n* (Added to ITEMs — equip it\n  from [C] -> ITEM for +3 DF!)"],
    blookPit: ["* oh... i didn't expect anyone\n  to fall down here...\n* sorry, i'll fade away now..."],
    switchClick: ["* Click!\n* You hear spikes retracting\n  upstairs!"],
    plaque15A: ["* Press the \\Bblue switch\\W.\n* Oh, and if you fall down,\n  everything resets? No, just\n  mind the pillars!"],
    plaque15B: ["* Please press the \\Rred switch\\W."],
    plaque15C: ["* Please press the \\Ggreen switch\\W."],
    plaque15D: ["* Are you not proud of yourself?\n* Wait—the room was rotating\n  each time! Proceed east!"],
    plaque15E: ["* Error! Did you press the wrong\n  color? Step north to retry!"],
    frogGroceries: [
      "* Ribbit, ribbit.\n* (Just between you and me...\n  I saw \\BTORIEL\\W come out of here\n  carrying groceries!)",
      "* (I didn't ask what they were\n  for... We're all too shy to\n  talk to her. Ribbit.)"
    ],
    toyKnifeGet: ["* You found the \\YToy Knife\\W!\n* (Added to ITEMs — equip it\n  from [C] -> ITEM for +3 AT!)"],
    torielOutsideHome: [
      { who: "toriel", expr: "side",   text: "* Oh dear, that took longer than\n  I thought it would!" },
      { who: "narrator", text: "* Ring... (Your phone rings while\n  Toriel stands right in front\n  of you.)" },
      { who: "toriel", expr: "happy",  text: "* How did you get here, my child?\n* Are you hurt? Here, I will\n  heal you right away." },
      { who: "toriel", expr: "normal", text: "* I should not have left you\n  alone for so long.\n* Come inside—I have prepared a\n  surprise for you!" }
    ],
    homeVase: ["* Encouraging golden flowers in\n  a neat ceramic vase."],
    homeCalendar: ["* An old calendar from the\n  beginning of 201X.\n* A date is circled in red."],
    torielHallTour: [
      { who: "toriel", expr: "happy",  text: "* Do you smell that?\n* Surprise! It is a butterscotch-\n  cinnamon pie!" },
      { who: "toriel", expr: "normal", text: "* I thought we might celebrate\n  your arrival.\n* And look—this first door is\n  your very own room!" },
      { who: "toriel", expr: "happy",  text: "* If you are tired, feel free\n  to take a nap! I will be in\n  the living room." }
    ],
    mirrorNormal: ["* It's you!"],
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
    kitchenPie: ["* A freshly baked pie is cooling\n  on the counter.\n* Its size intimidates you too\n  much to eat it whole."],
    kitchenStove: ["* The stovetop is very clean.\n* Toriel must use fire magic\n  instead."],
    kitchenSink: ["* There is some white fur stuck\n  in the sink drain."],
    kitchenFridge: ["* Inside the fridge is a\n  name-brand chocolate bar and\n  jars of snails."],
    livingFire: ["* The fire isn't burning hot...\n* Just pleasantly warm.\n* You could put your hand\n  inside."],
    livingBooks: ["* '72 Uses for Snails.'\n* How riveting."],
    livingChair: ["* Toriel's chair.\n* Its name is Chairiel."],
    livingTable: ["* Enough seating for a family."],
    torielLivingAsk1: [
      { who: "toriel", expr: "happy",  text: "* Up already, I see?\n* Make yourself at home, my\n  child!" },
      { who: "toriel", expr: "normal", text: "* What would you like to talk\n  about?", choices: ["How to exit the RUINS", "Snail facts"], choiceKey: "livingChoice1" }
    ],
    torielSnailFact: [
      { who: "toriel", expr: "happy",  text: "* Oh! Did you know that snails\n  make terrible shoelaces?\n* Fascinating, is it not? Hee hee!" }
    ],
    torielExit1: [
      { who: "toriel", expr: "side",   text: "* ...Um. How about an exciting\n  snail fact instead?\n* Did you know snails breathe\n  slowly...?" }
    ],
    torielExit2: [
      { who: "toriel", expr: "cold",   text: "* ...\n* I have to do something.\n* Stay here." }
    ],
    basement1: [
      { who: "toriel", expr: "side",   text: "* You wish to know how to return\n  'home,' do you not?" },
      { who: "toriel", expr: "cold",   text: "* Ahead of us lies the end of\n  the RUINS.\n* A one-way exit to the rest of\n  the underground." },
      { who: "toriel", expr: "cold",   text: "* I am going to destroy it.\n* No one will ever be able to\n  leave again.\n* Now be a good child and go\n  upstairs." }
    ],
    basement2: [
      { who: "toriel", expr: "cold",   text: "* Every human that falls down\n  here meets the same fate.\n* I have seen it again and\n  again." },
      { who: "toriel", expr: "side",   text: "* They come.\n* They leave.\n* They die." },
      { who: "toriel", expr: "cold",   text: "* You naive child... If you\n  leave the RUINS...\n* They... \\RASGORE\\W... will kill\n  you." },
      { who: "toriel", expr: "cold",   text: "* I am only protecting you, do\n  you understand?\n* ...Go to your room." }
    ],
    basement3: [
      { who: "toriel", expr: "cold",   text: "* Do not try to stop me.\n* This is your final warning." }
    ],
    basement4: [
      { who: "toriel", expr: "cold",   text: "* You want to leave so badly?\n* Hmph.\n* You are just like the others." },
      { who: "toriel", expr: "cold",   text: "* There is only one solution to\n  this.\n* Prove yourself...\n* Prove to me you are strong\n  enough to survive!" }
    ],
    torielSpareLines: [
      ".....",
      "..... .....",
      "...What are you\ndoing?",
      "Attack or run\naway!",
      "What are you\nproving this way?",
      "Fight me or\nleave!",
      "Stop looking at\nme that way.",
      "Go upstairs!",
      "...I know you want\nto go home, but...",
      "Please... Go\nupstairs now.",
      "I promise I will\ntake good care of\nyou here.",
      "Ha ha... Pathetic,\nis it not? I cannot\nsave even a single\nchild.",
      "No, I understand.\nYou would just be\nunhappy trapped\ndown here."
    ],
    torielAfterSpared: [
      { who: "toriel", expr: "side",   text: "* The RUINS are very small once\n  you get used to them.\n* It would not be right for you\n  to grow up in a place like\n  this." },
      { who: "toriel", expr: "side",   text: "* My expectations... My\n  loneliness... My fear...\n* For you, my child, I will put\n  them aside." },
      { who: "toriel", expr: "happy",  text: "* If you truly wish to leave\n  the RUINS, I will not stop\n  you.\n* However, when you leave...\n  Please do not come back." },
      { who: "toriel", expr: "happy",  text: "* Be good, won't you?\n* ...My child." }
    ],
    floweyEndPacifist: [
      { who: "flowey", expr: "normal", text: "* Clever. Verrrryyy clever.\n* You think you're really smart,\n  don't you?" },
      { who: "flowey", expr: "wink",   text: "* In this world, it's kill or be\n  killed.\n* So you were able to play by\n  your own rules." },
      { who: "flowey", expr: "evil",   text: "* You spared the life of a\n  single person.\n* Hee hee hee... What will you\n  do if you meet a relentless\n  killer?" },
      { who: "flowey", expr: "laugh",  text: "* I'll be watching you!\n* Hee hee hee..." }
    ],
    floweyEndNeutral: [
      { who: "flowey", expr: "evil",   text: "* Hee hee hee...\n* So you didn't hold back after\n  all!" },
      { who: "flowey", expr: "laugh",  text: "* Down here, nobody's innocent.\n* Let's see how far your\n  'determination' takes you!" }
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
      "",
      "",
      "",
      ""
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
      43: "遺跡 - 最終大廳"
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
      dodge1: [
        { expr: "side",   text: "嘿老兄，你沒接到喔。\n我們再試一次，好嗎？" }
      ],
      dodge2: [
        { expr: "pissed", text: "你在耍我嗎？\n你是腦袋壞掉了嗎？\n給我撞向那些子彈！！！" },
        { expr: "evil",   text: "……我是說……\n友愛顆粒。" }
      ],
      evilHit: [
        { expr: "evil",   text: "你這個白癡。" },
        { expr: "evil",   text: "在這個世界裡，\n不是殺人就是被殺。" },
        { expr: "laugh",  text: "怎麼會有人放過\n這麼好的機會呢！？" },
        { expr: "evil",   text: "去死吧。" }
      ],
      evilDodge: [
        { expr: "evil",   text: "你早就知道怎麼回事了，\n對吧？" },
        { expr: "laugh",  text: "你只是想看我難堪而已。\n去死吧。" }
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
    plaqueRuins1: ["* 唯有無畏者得以通行。\n* 勇敢者、愚昧者，\n  皆不走中間之路。"],
    torielRuins2: [
      { who: "toriel", expr: "normal", text: "* 歡迎來到你的新家，純真的孩子。" },
      { who: "toriel", expr: "normal", text: "* 容我向你說明遺跡的運作方式。" },
      { who: "toriel", expr: "happy",  text: "* 遺跡裡充滿了謎題——\n  古老的機關與門鎖的結合。" },
      { who: "toriel", expr: "normal", text: "* 必須解開謎題才能前往下個房間。\n* 請看我示範一次吧！" }
    ],
    torielRuins3Intro: [
      { who: "toriel", expr: "normal", text: "* 想通過這裡，你必須觸發\n  好幾個牆上的開關。" },
      { who: "toriel", expr: "happy",  text: "* 別擔心，我已經在需要按下的\n  開關旁做了標記！" }
    ],
    torielRuins3Sw1: [
      { who: "toriel", expr: "happy",  text: "* 太棒了！\n* 我真為你驕傲，小傢伙。\n* 我們前往下一個房間吧。" }
    ],
    torielRuins3Wrong: [
      { who: "toriel", expr: "side",   text: "* 哇，你真積極！\n* ……不過那是錯的開關喔，\n  請找我有畫黃色箭頭的開關！" }
    ],
    signStayPath: ["* 請走在小徑上。"],
    noteSwitch1: ["* 托麗爾的標記：\n  「請按下這個開關。」"],
    noteSwitch2: ["* 托麗爾的標記：\n  「也請按下這個開關。」"],
    torielRuins4Intro: [
      { who: "toriel", expr: "normal", text: "* 身為住在地下世界的人類，\n  怪物可能會向你發起攻擊。" },
      { who: "toriel", expr: "normal", text: "* 不過別擔心！應對方法很簡單。" },
      { who: "toriel", expr: "happy",  text: "* 遭遇怪物進入\\Y戰鬥\\W時，\n  請試著和對方友善地\\Y聊天\\W！" },
      { who: "toriel", expr: "normal", text: "* 只要爭取時間，我就會過來化解\n  衝突。先對這個假人練習看看吧！" }
    ],
    torielDummyGood: [{ who: "toriel", expr: "happy", text: "* 啊，做得太好了！\n* 你真是個好孩子。" }],
    torielDummyHit:  [{ who: "toriel", expr: "side",  text: "* 哎呀，假人不是拿來打架的，\n  是拿來練習聊天的呀！\n* 我們不想傷害任何人，對吧……？" }],
    torielDummyFlee: [{ who: "toriel", expr: "side",  text: "* ……你從假人面前逃跑了？\n* 好吧，至少沒有人受傷，走吧！" }],
    torielRuins5Intro: [
      { who: "toriel", expr: "normal", text: "* 這個房間裡還有另一個謎題……\n* 不知道你能不能解開呢？" }
    ],
    torielRuins5Bridge: [
      { who: "toriel", expr: "side",   text: "* 前面就是那個地刺謎題，不過……\n* 來，先牽著我的手走過去吧。" }
    ],
    torielRuins5Done: [
      { who: "toriel", expr: "happy",  text: "* 這謎題對現在的你來說還是\n  太危險了點。我們繼續前進吧！" }
    ],
    plaqueBlueprint: ["* 西側房間正是東側房間的藍圖。"],
    torielRuins6Start: [
      { who: "toriel", expr: "normal", text: "* 到目前為止你表現得非常棒，\n  我的孩子。" },
      { who: "toriel", expr: "side",   text: "* 不過……我有個困難的請求想拜託你。" },
      { who: "toriel", expr: "side",   text: "* 請你試著獨自一人走到這條走廊\n  的盡頭。\n* 請原諒我這麼做。" }
    ],
    torielRuins6End: [
      { who: "toriel", expr: "happy",  text: "* 你好呀，我的孩子！\n* 別擔心，我沒有丟下你。" },
      { who: "toriel", expr: "normal", text: "* 我從頭到尾都躲在這根柱子後面。\n* 謝謝你願意相信我。" },
      { who: "toriel", expr: "normal", text: "* 剛才的練習有個重要的目的……\n  就是測試你能否獨立行動。" },
      { who: "toriel", expr: "side",   text: "* 我有點事必須離開一下，你得獨自\n  待一會兒。請乖乖留在這裡喔。" },
      { who: "toriel", expr: "happy",  text: "* 喔！離開前，這支\\Y手機\\W給你！\n* 有任何需要，隨時按 \\Y[C]\\W 打給我！" }
    ],
    call1: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "normal", text: "* 喂？我是托麗爾。\n* 你還乖乖待在房間裡吧？" },
      { who: "toriel", expr: "side",   text: "* 前面還有幾個我還沒說明的謎題，\n  自己亂闖會很危險的。" },
      { who: "toriel", expr: "happy",  text: "* 要乖喔，好嗎？\n* 喀噠……" }
    ],
    call2Choice: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "normal", text: "* 喂？我是托麗爾。\n* 沒什麼特別的原因，只是想問……\n* 你比較喜歡哪一種口味？" },
      { who: "toriel", expr: "happy",  text: "* 肉桂，還是奶油糖？", choices: ["肉桂 (Cinnamon)", "奶油糖 (Butterscotch)"], choiceKey: "piePref" }
    ],
    call2After: [
      { who: "toriel", expr: "happy",  text: "* 喔，原來如此！\n* 非常謝謝你！\n* 喀噠……" }
    ],
    call3Confirm: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "side",   text: "* 喂？我是托麗爾。\n* 你應該不會「討厭」{PIE}吧？" },
      { who: "toriel", expr: "happy",  text: "* 我知道你比較喜歡哪個了，\n  只是想再確認一下！謝謝你的耐心！\n* 喀噠……" }
    ],
    call4Allergy: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "side",   text: "* 喂？你沒有對什麼食物過敏吧？\n* 咦？問我為什麼這麼問？" },
      { who: "toriel", expr: "happy",  text: "* 沒什麼……完全沒什麼原因喔！\n* 喀噠……" }
    ],
    call5Pockets: [
      { who: "narrator", text: "* 嘟嚕嚕……嘟嚕嚕……" },
      { who: "toriel", expr: "normal", text: "* 喂！我突然想到遺跡裡可能散落著\n  一些小東西。" },
      { who: "toriel", expr: "happy",  text: "* 你可以撿起來，但記得留點口袋\n  空間給真正喜歡的好東西喔！喀噠……" }
    ],
    phoneHello: [{ who: "toriel", expr: "happy", text: "* 嘟……我是托麗爾。\n* 喔，你只是想打招呼嗎？\n* 那麼——「你好呀！」嘻嘻。" }],
    phoneAbout: [{ who: "toriel", expr: "side",  text: "* 嘟……你想多了解我一點？\n* 哎呀，我只是個愛操心的老婦人\n  罷了！" }],
    phoneMom1:  [{ who: "toriel", expr: "blush", text: "* 嘟……咦？\n* 你剛才叫我……「媽媽」嗎？\n* 那樣會讓你開心嗎？" }, { who: "toriel", expr: "happy", text: "* 只要你喜歡，怎麼稱呼我都可以喔！\n* 喀噠……" }],
    phoneMom2:  [{ who: "toriel", expr: "happy", text: "* 嘟……怎麼了，我的孩子？\n* 路上一定要小心喔！" }],
    phoneFlirt1:[{ who: "toriel", expr: "blush", text: "* 嘟……咦、咦……？\n* 天哪，我真不知道該怎麼回答！\n* 你真是個有趣的孩子，哈哈……" }],
    phoneFlirt2:[{ who: "toriel", expr: "blush", text: "* 嘟……嘻嘻，別鬧了孩子，\n  專心看路喔！" }],
    candyPrompt: { text: "* 上面寫著「請拿一顆」。\n* 要拿一顆怪物糖果嗎？", choices: ["拿一顆", "不拿"] },
    candy1: ["* 你拿了一顆怪物糖果。\n* (已放入 ITEM 背包。)"],
    candy2: ["* 你又拿了一顆糖果。\n* 真貪心……"],
    candy3: ["* 你再拿了一顆。\n* 你覺得自己簡直罪大惡極。"],
    candy4: ["* 你拿得太猛了！\n* 整碗糖果翻倒在地上……\n* 看看你幹的好事。"],
    candySpilled: ["* 看看你幹的好事。"],
    frogRuins7: [
      "* 呱呱。(打擾了，人類。\n  我有個關於戰鬥的建議想告訴你。)",
      "* (如果你透過 \\YACT\\W 友善互動，名字\n  變成\\Y黃色\\W時就能選擇 \\YMERCY\\W 寬恕！)",
      "* (當怪物不想再戰鬥時，請展現\n  仁慈吧，人類。呱呱。)"
    ],
    rockSign: ["* 四顆灰色石頭中有三顆\n  推薦你推它們。"],
    plaqueLeaves: ["* 請勿踩踏落葉。"],
    plaqueUpper10: ["* 觀察下層的痕跡即可找到安全路徑。"],
    talkRock1: ["* 喂喂，老兄！\n* 誰准你隨便推我走的？"],
    talkRock2: ["* 嗯？你是禮貌地「拜託」我移過去嗎？\n* 好吧，看在你的份上就動一下吧。"],
    talkRock3: ["* 唔？你希望我一直待在踏板上？\n* 真拿你沒辦法，我就站著不動囉！"],
    talkRockDone: ["* 放心吧小傢伙！\n* 我會幫你穩穩壓住這塊踏板的！"],
    mouseHole: ["* 只是一個普通的老鼠洞。"],
    cheeseTable: ["* 這塊起司已經放在這很久了，\n  牢牢黏在桌面上……"],
    blookPrompt: { text: "* 這隻幽靈嘴裡一直唸著「zzzz」裝睡。\n* 要強行把牠移開嗎？", choices: ["是", "否"] },
    blookAfter: [
      "* 唔唔唔……\n* 啊，對不起……你是想從這裡過去嗎？",
      "* 我平常來遺跡是因為這裡沒別人，\n  沒想到今天遇到了親切的人……",
      "* 糟了，我又在碎碎唸了……\n  這就讓開，不打擾你了……"
    ],
    bakeSign: ["* 蜘蛛烘焙義賣！\n* 所有收益全數捐給真正的蜘蛛。"],
    webSmallPrompt: { text: "* 貼著義賣傳單的小蜘蛛網。\n* 要投下 7G 買蜘蛛甜甜圈嗎？", choices: ["支付 7G", "算了"] },
    webBigPrompt:   { text: "* 巨大的蜘蛛網。\n* 要投下 18G 買蜘蛛蘋果汁嗎？", choices: ["支付 18G", "算了"] },
    bakeBoughtDonut: ["* 幾隻小蜘蛛爬下來，遞給你一個\n  蜘蛛甜甜圈！"],
    bakeBoughtCider: ["* 幾隻小蜘蛛爬下來，遞給你一壺\n  蜘蛛蘋果汁！"],
    bakeNoGold: ["* 你的金幣不夠。\n* 小蜘蛛同情地拍了拍你的口袋。"],
    bakeFull: ["* 你的背包已經滿了！"],
    frogXAdvice: [
      "* 呱呱。(嘆氣……每次我說話，\n  朋友都按 \\Y[X]\\W 跳過我的台詞。)",
      "* (還好你有認真聽我說話，謝謝你！)"
    ],
    frogYellow: [
      "* 呱呱。(當怪物名字變成\\Y黃色\\W時，\n  就代表可以寬恕牠們囉！)",
      "* (遺跡裡的大家都很感謝你的溫柔。)"
    ],
    frogFour: [
      "* 呱呱。(你有發現這個房間裡的\n  \\Y第四隻青蛙\\W藏在哪裡嗎？)"
    ],
    tinyFrog: ["* (仔細往牆縫裡一看……\n  裡面竟然有一隻超迷你的小青蛙\n  正在對你揮手！)"],
    signOneSwitch: ["* 這裡只有一個開關。"],
    ribbonGet: ["* 你找到了\\Y褪色緞帶\\W！\n* (可在 [C] -> ITEM 裝備，DF +3！)"],
    blookPit: ["* 啊……沒想到會有人掉下來這裡……\n* 抱歉，我馬上消失……"],
    switchClick: ["* 喀噠！\n* 樓上傳來了地刺收起的聲音！"],
    plaque15A: ["* 請按下\\B藍色開關\\W。"],
    plaque15B: ["* 請按下\\R紅色開關\\W。"],
    plaque15C: ["* 請按下\\G綠色開關\\W。"],
    plaque15D: ["* 發現了嗎？每個房間其實只是\n  旋轉了方向而已！往東前進吧！"],
    plaque15E: ["* 哎呀！按錯顏色了嗎？\n  往北走重新挑戰吧！"],
    frogGroceries: [
      "* 呱呱。(偷偷告訴你……我剛才看到\n  \\B托麗爾\\W提著採買的食材從這裡出去！)",
      "* (大家都太害羞了，沒敢問她要做什麼。)"
    ],
    toyKnifeGet: ["* 你找到了\\Y玩具刀\\W！\n* (可在 [C] -> ITEM 裝備，AT +3！)"],
    torielOutsideHome: [
      { who: "toriel", expr: "side",   text: "* 哎呀，比我想像中花了更久時間！" },
      { who: "narrator", text: "* 嘟嚕嚕……(托麗爾明明就站在面前，\n  你的手機卻響了起來。)" },
      { who: "toriel", expr: "happy",  text: "* 你是怎麼自己走到這裡的，孩子？\n* 有受傷嗎？來，讓我替你治療吧！" },
      { who: "toriel", expr: "normal", text: "* 我不該把你一個人留那麼久的。\n* 快進屋吧——我準備了驚喜要給你！" }
    ],
    homeVase: ["* 花瓶裡插著充滿元氣的金色花朵。"],
    homeCalendar: ["* 201X 年初的舊日曆，\n  其中一天被紅筆圈了起來。"],
    torielHallTour: [
      { who: "toriel", expr: "happy",  text: "* 你聞到了嗎？\n* 驚喜！是剛烤好的奶油糖肉桂派！" },
      { who: "toriel", expr: "normal", text: "* 我想慶祝你的到來。\n* 看——第一扇門就是專屬於你的房間！" },
      { who: "toriel", expr: "happy",  text: "* 走累了就先進房睡個午覺吧！\n* 我會在客廳等你。" }
    ],
    mirrorNormal: ["* 是你自己！"],
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
    kitchenPie: ["* 料理台上放涼著剛烤好的派。\n* 它巨大得令你不敢直接整顆吃掉。"],
    kitchenStove: ["* 爐台乾淨得發亮——\n  托麗爾做菜肯定都用火魔法。"],
    kitchenSink: ["* 水槽排水口卡著一點白色的毛。"],
    kitchenFridge: ["* 冰箱裡有一條名牌巧克力棒\n  和幾罐蝸牛。"],
    livingFire: ["* 壁爐裡的火焰一點也不燙人，\n  只有令人安心的溫暖。"],
    livingBooks: ["* 《蝸牛的 72 種用途》。\n* 真是太吸引人了。"],
    livingChair: ["* 托麗爾的扶手椅，\n  名字叫作「椅麗爾 (Chairiel)」。"],
    livingTable: ["* 足以讓一家人圍坐用餐的餐桌。"],
    torielLivingAsk1: [
      { who: "toriel", expr: "happy",  text: "* 已經睡醒了嗎？\n* 把這裡當成自己的家吧，孩子！" },
      { who: "toriel", expr: "normal", text: "* 你想聊些什麼呢？", choices: ["如何離開遺跡", "聽蝸牛冷知識"], choiceKey: "livingChoice1" }
    ],
    torielSnailFact: [
      { who: "toriel", expr: "happy",  text: "* 喔！你知道蝸牛完全不適合拿來\n  當鞋帶嗎？很有趣對吧！嘻嘻！" }
    ],
    torielExit1: [
      { who: "toriel", expr: "side",   text: "* ……唔，不然我們來聊有趣的\n  蝸牛知識好嗎？" }
    ],
    torielExit2: [
      { who: "toriel", expr: "cold",   text: "* ……\n* 我有件事非做不可。\n* 待在這裡別動。" }
    ],
    basement1: [
      { who: "toriel", expr: "side",   text: "* 你很想知道怎麼回「家」，\n  對吧？" },
      { who: "toriel", expr: "cold",   text: "* 前方就是遺跡的盡頭——\n  通往地下世界其他地方的單向出口。" },
      { who: "toriel", expr: "cold",   text: "* 我現在就要去把它毀掉。\n* 這樣就再也沒有人能離開了。\n* 乖孩子，現在回樓上去吧。" }
    ],
    basement2: [
      { who: "toriel", expr: "cold",   text: "* 每一個跌落到這裡的人類，\n  最終都迎來了相同的命運。" },
      { who: "toriel", expr: "side",   text: "* 他們到來。\n* 他們離開。\n* 他們死去。" },
      { who: "toriel", expr: "cold",   text: "* 天真的孩子……一旦你離開遺跡，\n  他們……\\R艾斯戈爾 (ASGORE)\\W……\n  會殺了你的。" },
      { who: "toriel", expr: "cold",   text: "* 我只是在保護你，你明白嗎？\n* ……回你的房間去。" }
    ],
    basement3: [
      { who: "toriel", expr: "cold",   text: "* 不要試圖阻止我。\n* 這是最後的警告。" }
    ],
    basement4: [
      { who: "toriel", expr: "cold",   text: "* 你就這麼想離開嗎？\n* 哼……你跟其他人一模一樣。" },
      { who: "toriel", expr: "cold",   text: "* 事到如今只有一個辦法了。\n* 證明給我看……\n* 證明你有足以在外面活下去的力量！" }
    ],
    torielSpareLines: [
      "……",
      "…………",
      "……你在做什麼？",
      "快攻擊我，\n或者逃跑啊！",
      "你這樣做想證明\n什麼？",
      "跟我戰鬥，\n否則就回樓上去！",
      "別用那種眼神\n看著我。",
      "回樓上去！",
      "……我知道你想回家，\n可是……",
      "求求你……\n現在回樓上去吧。",
      "我保證我會在這裡\n好好照顧你的。",
      "哈哈……很可悲對吧？\n我甚至連一個孩子\n都留不住。",
      "不，我明白了。\n把你關在這裡，\n你也只會不快樂。"
    ],
    torielAfterSpared: [
      { who: "toriel", expr: "side",   text: "* 習慣之後，遺跡其實非常狹小。\n* 讓你在這樣的地方長大，\n  對你並不公平。" },
      { who: "toriel", expr: "side",   text: "* 我的期望……我的孤獨……我的恐懼……\n* 為了你，我的孩子，\n  我會將它們全都放下。" },
      { who: "toriel", expr: "happy",  text: "* 如果你真的想離開遺跡，\n  我不會再阻攔你了。\n* 但離開之後……請不要再回來。" },
      { who: "toriel", expr: "happy",  text: "* 要好好保重喔。\n* ……我的孩子。" }
    ],
    floweyEndPacifist: [
      { who: "flowey", expr: "normal", text: "* 真聰明，真是太聰明了。\n* 你以為自己很了不起，對吧？" },
      { who: "flowey", expr: "wink",   text: "* 在這個世界裡，不是殺人就是被殺。\n* 你卻靠自己的規則一個也沒殺。" },
      { who: "flowey", expr: "evil",   text: "* 嘻嘻嘻……要是接下來遇到\n  毫不留情的殺手，你又該怎麼辦呢？" },
      { who: "flowey", expr: "laugh",  text: "* 我會一直盯著你的！\n* 嘻嘻嘻……" }
    ],
    floweyEndNeutral: [
      { who: "flowey", expr: "evil",   text: "* 嘻嘻嘻……\n* 結果你還是痛下殺手了嘛！" },
      { who: "flowey", expr: "laugh",  text: "* 在這地底沒有人是無辜的。\n* 就讓我看看你的「決心」能走多遠！" }
    ]
  }
};
