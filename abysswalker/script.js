// --- Constants & Data ---
const enemies = [
    { name: "スライム", hpMod: 1.0, atkMod: 0.8, defMod: 0.5, expMod: 1.0, goldMod: 1.0 },
    { name: "ゴブリン", hpMod: 1.2, atkMod: 1.2, defMod: 0.8, expMod: 1.5, goldMod: 1.5 },
    { name: "スケルトン", hpMod: 0.8, atkMod: 1.5, defMod: 0.4, expMod: 1.2, goldMod: 1.2 },
    { name: "ダークナイト", hpMod: 2.0, atkMod: 1.5, defMod: 1.5, expMod: 3.0, goldMod: 2.5 },
    { name: "ドラゴン", hpMod: 5.0, atkMod: 3.0, defMod: 2.0, expMod: 10.0, goldMod: 8.0 }
];

const equipData = [
    { id: 'w1', name: '木の剣', desc: 'ATK+1', type: 'atk', val: 1, rarity: 'common', prob: 0.1 },
    { id: 'a1', name: '布の服', desc: 'DEF+1', type: 'def', val: 1, rarity: 'common', prob: 0.1 },
    { id: 'w2', name: '鋼の剣', desc: 'ATK+15', type: 'atk', val: 15, rarity: 'rare', prob: 0.01 },
    { id: 'a2', name: '鉄の鎧', desc: 'DEF+15', type: 'def', val: 15, rarity: 'rare', prob: 0.01 },
    { id: 'h1', name: '命の指輪', desc: 'MaxHP+100', type: 'hp', val: 100, rarity: 'rare', prob: 0.01 },
    { id: 'w3', name: '魔剣', desc: 'ATK+250', type: 'atk', val: 250, rarity: 'epic', prob: 0.001 },
    { id: 'a3', name: '竜の鱗鎧', desc: 'DEF+250', type: 'def', val: 250, rarity: 'epic', prob: 0.001 },
    { id: 'w4', name: '神の剣', desc: 'ATK+5000', type: 'atk', val: 5000, rarity: 'legendary', prob: 0.0001 },
    { id: 'a4', name: '神の盾', desc: 'DEF+5000', type: 'def', val: 5000, rarity: 'legendary', prob: 0.0001 },
    { id: 'h2', name: '神の祝福', desc: 'MaxHP+20000', type: 'hp', val: 20000, rarity: 'legendary', prob: 0.0001 },
    { id: 'm1', name: '創世の剣', desc: 'ATK+50000', type: 'atk', val: 50000, rarity: 'mythic', prob: 0.00001 },
    { id: 'm2', name: 'イージスの盾', desc: 'DEF+50000', type: 'def', val: 50000, rarity: 'mythic', prob: 0.00001 },
    { id: 'm3', name: '世界樹の指輪', desc: 'MaxHP+200000', type: 'hp', val: 200000, rarity: 'mythic', prob: 0.00001 },
    { id: 'm4', name: '破壊神の鎌', desc: 'ATK+100000', type: 'atk', val: 100000, rarity: 'mythic', prob: 0.000005 },
    { id: 'm5', name: '全能のオーブ', desc: 'MaxHP+500000', type: 'hp', val: 500000, rarity: 'mythic', prob: 0.000005 },
    { id: 'p1', name: '狂戦士の証', desc: 'ATK+10%', type: 'atk%', val: 10, rarity: 'epic', prob: 0.005 },
    { id: 'p2', name: '鉄壁の紋章', desc: 'DEF+10%', type: 'def%', val: 10, rarity: 'epic', prob: 0.005 },
    { id: 'p3', name: '生命の杯', desc: 'MaxHP+10%', type: 'hp%', val: 10, rarity: 'epic', prob: 0.005 },
    { id: 'm6', name: '神魔の魂', desc: 'ATK+100%', type: 'atk%', val: 100, rarity: 'mythic', prob: 0.00001 }
];

const achData = [
    { id: 'kill1', name: '初めての勝利', desc: '敵を1体倒す', reward: '10 G', req: null },
    { id: 'kill100', name: 'スレイヤー', desc: '敵を100体倒す', reward: '500 G', req: 'kill1' },
    { id: 'kill1000', name: '魔王', desc: '敵を1000体倒す', reward: '10000 G', req: 'kill100' },
    { id: 'kill10000', name: '破壊神', desc: '敵を10000体倒す', reward: 'ATK+50%', req: 'kill1000' },
    { id: 'floor10', name: '深淵への歩み', desc: '10階層に到達する', reward: '基本ATK+5', req: null },
    { id: 'floor50', name: '深層の探求者', desc: '50階層に到達する', reward: '基本ATK+50', req: 'floor10' },
    { id: 'floor100', name: 'アビスウォーカー', desc: '100階層に到達する', reward: '基本ATK+1000', req: 'floor50' },
    { id: 'floor200', name: '奈落の王', desc: '200階層に到達する', reward: 'MaxHP+50%', req: 'floor100' },
    { id: 'lvl10', name: 'ベテラン戦士', desc: 'レベル10になる', reward: '基本MaxHP+50', req: null },
    { id: 'lvl50', name: '英雄', desc: 'レベル50になる', reward: '基本MaxHP+500', req: 'lvl10' },
    { id: 'die1', name: '死は成長の糧', desc: '初めて死亡する', reward: '基本DEF+5', req: null },
    { id: 'die10', name: '死に戻り', desc: '10回死亡する', reward: '基本DEF+50', req: 'die1' },
    { id: 'mythic1', name: '神話の始まり', desc: '神話(Mythic)装備を1種類手に入れる', reward: '基本ATK+5000', req: null },
    { id: 'mythic3', name: '神々の加護', desc: '神話(Mythic)装備を3種類手に入れる', reward: '基本MaxHP+50000', req: 'mythic1' },
    { id: 'mythic5', name: '世界の覇者', desc: '神話(Mythic)装備を全5種類手に入れる', reward: '基本ATK+50000', req: 'mythic3' }
];

// --- State Management ---
const defaultState = {
    name: "", // Player name for ranking
    floor: 1,
    lvl: 1,
    exp: 0,
    baseHp: 100, // Changed to baseStats
    currentHp: 100,
    baseAtk: 10,
    baseDef: 5,
    bonusHpPct: 0,
    bonusAtkPct: 0,
    bonusDefPct: 0,
    gold: 0,
    costAtk: 10,
    costDef: 10,
    costHp: 20,
    inventory: [],
    autoBattle: false,
    stayOnFloor: false,
    stats: {
        kills: 0,
        maxFloor: 1,
        deaths: 0
    },
    achievements: [],
    inventory: {} // { 'w1': 5, 'a2': 1 }
};

let player = JSON.parse(localStorage.getItem('rpg_save_v2')) || { ...defaultState };
player.autoBattle = false; // Always start with auto-battle OFF on page load

// Backward compatibility or migration
if (player.bonusHpPct === undefined) {
    player.bonusHpPct = 0;
    player.bonusAtkPct = 0;
    player.bonusDefPct = 0;
}
if (player.stayOnFloor === undefined) {
    player.stayOnFloor = false;
}
if (!player.inventory) {
    player = { ...defaultState }; // Force reset for major architecture change
    localStorage.removeItem('rpg_save'); // clear old save if it exists
}
if (player.currentHp > calculateMaxHp()) player.currentHp = calculateMaxHp();

let enemy = null;
let isAuto = false;
let autoInterval = null;

// --- DOM Elements ---
const el = {
    floor: document.getElementById('player-floor'),
    exp: document.getElementById('player-exp'),
    reqExp: document.getElementById('player-req-exp'),
    expBar: document.getElementById('player-exp-bar'),
    hp: document.getElementById('player-hp'),
    maxHp: document.getElementById('player-maxhp'),
    hpText: document.getElementById('player-hp-text'),
    hpBar: document.getElementById('player-hp-bar'),
    floor: document.getElementById('player-floor'),
    maxFloor: document.getElementById('player-max-floor'),
    lvl: document.getElementById('player-lvl'),
    atk: document.getElementById('player-atk'),
    def: document.getElementById('player-def'),
    gold: document.getElementById('player-gold'),
    
    eName: document.getElementById('enemy-name'),
    eHpBar: document.getElementById('enemy-hp-bar'),
    eHp: document.getElementById('enemy-hp'),
    eMaxHp: document.getElementById('enemy-maxhp'),
    
    log: document.getElementById('battle-log'),
    
    btnExplore: document.getElementById('btn-explore'),
    btnAttack: document.getElementById('btn-attack'),
    btnHeal: document.getElementById('btn-heal'),
    btnAuto: document.getElementById('auto-btn'),
    btnStay: document.getElementById('stay-btn'), // New element
    
    costAtk: document.getElementById('cost-atk'),
    costDef: document.getElementById('cost-def'),
    costHp: document.getElementById('cost-hp'),
    btnUpgAtk: document.getElementById('btn-upg-atk'),
    btnUpgDef: document.getElementById('btn-upg-def'),
    btnUpgHp: document.getElementById('btn-upg-hp'),

    btnInventory: document.getElementById('btn-inventory'),
    btnAchievements: document.getElementById('btn-achievements'),
    btnRanking: document.getElementById('btn-ranking'),
    
    modalInventory: document.getElementById('inventory-modal'),
    modalAchievements: document.getElementById('achievements-modal'),
    modalName: document.getElementById('name-modal'),
    modalRanking: document.getElementById('ranking-modal'),
    
    btnCloseInv: document.getElementById('btn-close-inv'),
    btnCloseAch: document.getElementById('btn-close-ach'),
    btnCloseRanking: document.getElementById('btn-close-ranking'),
    
    btnFloorJump: document.getElementById('btn-floor-jump'),
    modalFloor: document.getElementById('floor-jump-modal'),
    btnCloseFloor: document.getElementById('btn-close-floor'),
    floorList: document.getElementById('floor-list'),
    
    invList: document.getElementById('inventory-list'),
    btnSaveName: document.getElementById('btn-save-name'),
    btnCancelName: document.getElementById('btn-cancel-name'),
    
    playerNameInput: document.getElementById('player-name-input'),
    achievementsList: document.getElementById('achievements-list'),
    inventoryList: document.getElementById('inventory-list'),
    rankingList: document.getElementById('ranking-list')
};

// --- Logic ---
function calculateMaxHp() {
    let hp = player.baseHp;
    let pct = player.bonusHpPct;
    for (const [id, qty] of Object.entries(player.inventory)) {
        const item = equipData.find(e => e.id === id);
        if (item && item.type === 'hp') hp += item.val * qty;
    }
    for (const [id, qty] of Object.entries(player.inventory)) {
        const item = equipData.find(e => e.id === id);
        if (item && item.type === 'hp%') pct += item.val * qty;
    }
    return Math.floor(hp * (1 + pct / 100));
}

function calculateAtk() {
    let atk = player.baseAtk;
    let pct = player.bonusAtkPct;
    for (const [id, qty] of Object.entries(player.inventory)) {
        const item = equipData.find(e => e.id === id);
        if (item && item.type === 'atk') atk += item.val * qty;
    }
    for (const [id, qty] of Object.entries(player.inventory)) {
        const item = equipData.find(e => e.id === id);
        if (item && item.type === 'atk%') pct += item.val * qty;
    }
    return Math.floor(atk * (1 + pct / 100));
}

function calculateDef() {
    let def = player.baseDef;
    let pct = player.bonusDefPct;
    for (const [id, qty] of Object.entries(player.inventory)) {
        const item = equipData.find(e => e.id === id);
        if (item && item.type === 'def') def += item.val * qty;
    }
    for (const [id, qty] of Object.entries(player.inventory)) {
        const item = equipData.find(e => e.id === id);
        if (item && item.type === 'def%') pct += item.val * qty;
    }
    return Math.floor(def * (1 + pct / 100));
}

function saveGame() {
    localStorage.setItem('rpg_save_v2', JSON.stringify(player));
}

function updateUI() {
    if (el.floor) el.floor.textContent = player.floor;
    if (el.maxFloor) el.maxFloor.textContent = player.stats.maxFloor;
    if (el.lvl) el.lvl.textContent = player.lvl;
    
    const maxHp = calculateMaxHp();
    el.hp.textContent = player.currentHp;
    el.maxHp.textContent = maxHp;
    el.atk.textContent = calculateAtk();
    el.def.textContent = calculateDef();
    el.gold.textContent = player.gold;
    
    const expReq = getExpReq();
    if (el.expBar) el.expBar.style.width = `${(player.exp / expReq) * 100}%`;
    
    if (el.btnAuto) el.btnAuto.checked = player.autoBattle;
    if (el.btnStay) {
        if (player.stayOnFloor) {
            el.btnStay.textContent = "🔄 階層固定: ON";
            el.btnStay.style.color = "var(--gold)";
        } else {
            el.btnStay.textContent = "🔄 階層固定: OFF";
            el.btnStay.style.color = "var(--text-dim)";
        }
    }
    
    if (el.exp && el.reqExp) {
        el.exp.textContent = player.exp;
        el.reqExp.textContent = expReq;
    }
    el.hpBar.style.width = `${(Math.max(0, player.currentHp) / maxHp) * 100}%`;
    
    el.costAtk.textContent = player.costAtk;
    el.costDef.textContent = player.costDef;
    el.costHp.textContent = player.costHp;
    
    el.btnUpgAtk.disabled = player.gold < player.costAtk;
    el.btnUpgDef.disabled = player.gold < player.costDef;
    el.btnUpgHp.disabled = player.gold < player.costHp;
    el.btnHeal.disabled = player.gold < 5 || player.currentHp >= maxHp || enemy !== null;

    if (enemy) {
        el.btnExplore.disabled = true;
        el.btnAttack.disabled = false;
    } else {
        el.btnExplore.disabled = false;
        el.btnAttack.disabled = true;
    }
}

function getExpReq() {
    return Math.floor(100 * Math.pow(1.5, player.lvl - 1));
}

function log(msg, type = 'system') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = msg;
    el.log.prepend(entry);
    if (el.log.children.length > 50) el.log.removeChild(el.log.lastChild);
}

function getMythicCount() {
    let count = 0;
    const mythicIds = ['m1', 'm2', 'm3', 'm4', 'm5'];
    for (const id of mythicIds) {
        if (player.inventory[id] && player.inventory[id] > 0) {
            count++;
        }
    }
    return count;
}

function checkAchievements() {
    let unlockedAny = false;
    achData.forEach(ach => {
        if (player.achievements.includes(ach.id)) return;
        
        if (ach.req && !player.achievements.includes(ach.req)) return;

        let conditionMet = false;
        switch(ach.id) {
            case 'kill1': conditionMet = player.stats.kills >= 1; break;
            case 'kill100': conditionMet = player.stats.kills >= 100; break;
            case 'kill1000': conditionMet = player.stats.kills >= 1000; break;
            case 'kill10000': conditionMet = player.stats.kills >= 10000; break;
            case 'floor10': conditionMet = player.stats.maxFloor >= 10; break;
            case 'floor50': conditionMet = player.stats.maxFloor >= 50; break;
            case 'floor100': conditionMet = player.stats.maxFloor >= 100; break;
            case 'floor200': conditionMet = player.stats.maxFloor >= 200; break;
            case 'lvl10': conditionMet = player.lvl >= 10; break;
            case 'lvl50': conditionMet = player.lvl >= 50; break;
            case 'die1': conditionMet = player.stats.deaths >= 1; break;
            case 'die10': conditionMet = player.stats.deaths >= 10; break;
            case 'mythic1': conditionMet = getMythicCount() >= 1; break;
            case 'mythic3': conditionMet = getMythicCount() >= 3; break;
            case 'mythic5': conditionMet = getMythicCount() >= 5; break;
        }

        if (conditionMet) {
            player.achievements.push(ach.id);
            
            if (ach.id.includes('kill') && ach.reward.includes('G')) player.gold += parseInt(ach.reward.split(' ')[0]);
            
            if (ach.reward.includes('%')) {
                if (ach.reward.includes('ATK')) player.bonusAtkPct += parseInt(ach.reward.match(/\d+/)[0]);
                if (ach.reward.includes('DEF')) player.bonusDefPct += parseInt(ach.reward.match(/\d+/)[0]);
                if (ach.reward.includes('MaxHP')) { 
                    player.bonusHpPct += parseInt(ach.reward.match(/\d+/)[0]);
                    player.currentHp = calculateMaxHp(); 
                }
            } else {
                if (ach.reward.includes('ATK')) player.baseAtk += parseInt(ach.reward.split('+')[1]);
                if (ach.reward.includes('MaxHP')) { player.baseHp += parseInt(ach.reward.split('+')[1]); player.currentHp += parseInt(ach.reward.split('+')[1]); }
                if (ach.reward.includes('DEF')) player.baseDef += parseInt(ach.reward.split('+')[1]);
            }

            log(`🏆 実績解除: ${ach.name} (${ach.reward})`, 'system');
            unlockedAny = true;
        }
    });
    
    if (unlockedAny) {
        updateUI();
        saveGame();
    }
}

function spawnEnemy() {
    let isBoss = (player.floor % 100 === 0);
    const scale = Math.pow(1.03, player.floor - 1);
    
    if (isBoss) {
        enemy = {
            name: `B${player.floor}F 【深淵の主】アビスロード`,
            hp: Math.floor(20 * scale * 10),
            maxHp: Math.floor(20 * scale * 10),
            atk: Math.floor(5 * scale * 5),
            def: Math.floor(2 * scale * 5),
            exp: Math.floor(20 * scale * 20),
            gold: Math.floor(10 * scale * 20),
            isBoss: true
        };
        log(`🚨 警告：階層の主が姿を現した...！`, 'enemy-attack');
    } else {
        const template = enemies[Math.floor(Math.random() * enemies.length)];
        enemy = {
            name: `B${player.floor}F ${template.name}`,
            hp: Math.floor(20 * scale * template.hpMod),
            maxHp: Math.floor(20 * scale * template.hpMod),
            atk: Math.floor(5 * scale * template.atkMod),
            def: Math.floor(2 * scale * template.defMod),
            exp: Math.floor(20 * scale * template.expMod),
            gold: Math.floor(10 * scale * template.goldMod),
            isBoss: false
        };
        log(`${enemy.name} が現れた！`, 'system');
    }
    
    el.eName.textContent = enemy.name;
    if (isBoss) el.eName.style.color = '#ff5252';
    else el.eName.style.color = 'var(--text-main)';
    
    el.eHpBar.style.width = '100%';
    if (el.eHp && el.eMaxHp) {
        el.eHp.textContent = enemy.hp;
        el.eMaxHp.textContent = enemy.maxHp;
    }
    
    updateUI();
}

function attack() {
    if (!enemy) return;
    
    const pAtk = calculateAtk();
    const pDef = calculateDef();
    
    let pDmg = Math.max(1, pAtk - enemy.def + Math.floor(Math.random() * (pAtk * 0.1 + 1)));
    enemy.hp -= pDmg;
    log(`あなたの攻撃！ ${enemy.name} に ${pDmg} のダメージ！`, 'damage');
    
    el.eHpBar.style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;
    if (el.eHp) el.eHp.textContent = Math.max(0, enemy.hp);
    
    if (enemy.hp <= 0) {
        winBattle();
        return;
    }
    
    let eDmg = Math.max(1, enemy.atk - pDef + Math.floor(Math.random() * (enemy.atk * 0.1 + 1)));
    player.currentHp -= eDmg;
    log(`${enemy.name}の攻撃！ あなたは ${eDmg} のダメージを受けた。`, 'enemy-attack');
    
    if (player.currentHp <= 0) {
        die();
        return;
    }
    updateUI();
}

function rollDrops(isBoss = false) {
    let dropped = false;
    equipData.forEach(item => {
        let prob = item.prob;
        if (isBoss) prob *= 10; // Bosses have 10x drop rate
        
        if (Math.random() < prob) {
            player.inventory[item.id] = (player.inventory[item.id] || 0) + 1;
            
            let logType = 'system';
            if (item.rarity === 'rare') logType = 'heal';
            if (item.rarity === 'epic') logType = 'rare-drop';
            if (item.rarity === 'legendary') logType = 'legendary-drop';
            if (item.rarity === 'mythic') logType = 'mythic-drop';
            
            log(`✨ 【${item.rarity.toUpperCase()}】${item.name} をドロップした！`, logType);
            dropped = true;
        }
    });
    if (dropped) renderInventory();
}

function winBattle() {
    log(`${enemy.name} を倒した！`, 'system');
    log(`${enemy.exp} EXP と ${enemy.gold} G を獲得。`, 'heal');
    
    player.exp += enemy.exp;
    player.gold += enemy.gold;
    
    if (!player.stayOnFloor) {
        player.floor++;
    }
    
    player.stats.kills++;
    if (player.floor > player.stats.maxFloor) player.stats.maxFloor = player.floor;
    
    rollDrops(enemy.isBoss);
    checkLevelUp();
    checkAchievements();
    submitScore(); // Auto submit score on win
    
    enemy = null;
    el.eName.textContent = "No Enemy";
    el.eName.style.color = 'var(--text-main)';
    el.eHpBar.style.width = '0%';
    if (el.eHp) {
        el.eHp.textContent = "0";
        el.eMaxHp.textContent = "0";
    }
    
    updateUI();
    saveGame();
}

function checkLevelUp() {
    let req = getExpReq();
    while (player.exp >= req) {
        player.exp -= req;
        player.lvl++;
        player.baseHp += 10;
        player.currentHp += 10;
        player.baseAtk += 2;
        player.baseDef += 1;
        log(`レベルアップ！ Lv.${player.lvl} になった！`, 'system');
        req = getExpReq();
    }
}

function die() {
    log(`あなたは死んでしまった... 10階層後退して再スタートします。`, 'enemy-attack');
    player.currentHp = calculateMaxHp();
    player.floor = Math.max(1, player.floor - 10);
    
    player.stats.deaths++;
    checkAchievements();
    submitScore(); // Auto submit score on death
    
    enemy = null;
    el.eName.textContent = "No Enemy";
    el.eHpBar.style.width = '0%';
    if (el.eHp) {
        el.eHp.textContent = "0";
        el.eMaxHp.textContent = "0";
    }
    
    updateUI();
    saveGame();
}

el.btnExplore.addEventListener('click', spawnEnemy);
el.btnAttack.addEventListener('click', attack);

el.btnHeal.addEventListener('click', () => {
    const maxHp = calculateMaxHp();
    if (player.gold >= 5 && player.currentHp < maxHp && !enemy) {
        player.gold -= 5;
        player.currentHp = Math.min(maxHp, player.currentHp + Math.floor(maxHp * 0.5));
        log(`ポーションを飲みHPが回復した。`, 'heal');
        updateUI();
        saveGame();
    }
});

function buyUpgrade(type) {
    if (type === 'atk' && player.gold >= player.costAtk) {
        player.gold -= player.costAtk;
        player.baseAtk += 2;
        player.costAtk = Math.ceil(player.costAtk * 1.15);
    } else if (type === 'def' && player.gold >= player.costDef) {
        player.gold -= player.costDef;
        player.baseDef += 1;
        player.costDef = Math.ceil(player.costDef * 1.15);
    } else if (type === 'hp' && player.gold >= player.costHp) {
        player.gold -= player.costHp;
        player.baseHp += 10;
        player.currentHp += 10;
        player.costHp = Math.ceil(player.costHp * 1.15);
    }
    updateUI();
    saveGame();
}

el.btnUpgAtk.addEventListener('click', () => buyUpgrade('atk'));
el.btnUpgDef.addEventListener('click', () => buyUpgrade('def'));
el.btnUpgHp.addEventListener('click', () => buyUpgrade('hp'));

function toggleAuto() {
    isAuto = el.btnAuto.checked;
    player.autoBattle = isAuto;
    saveGame();
    if (isAuto) {
        log("【AUTO BATTLE START】", 'system');
        autoInterval = setInterval(autoAction, 800);
    } else {
        log("【AUTO BATTLE STOP】", 'system');
        clearInterval(autoInterval);
    }
    updateUI();
}

el.btnStay.addEventListener('click', () => {
    player.stayOnFloor = !player.stayOnFloor;
    updateUI();
    saveGame();
});

function autoAction() {
    if (player.currentHp <= 0) return;
    if (!enemy) {
        const maxHp = calculateMaxHp();
        if (player.currentHp < maxHp * 0.4 && player.gold >= 5) {
            el.btnHeal.click();
        } else {
            spawnEnemy();
        }
    } else {
        attack();
    }
}

el.btnAuto.addEventListener('change', toggleAuto);

// --- Modal UI Renders ---
function renderInventory() {
    el.inventoryList.innerHTML = '';
    let hasItems = false;
    for (const [id, qty] of Object.entries(player.inventory)) {
        if (qty > 0) {
            hasItems = true;
            const itemDef = equipData.find(e => e.id === id);
            const div = document.createElement('div');
            div.className = 'inv-item';
            div.innerHTML = `
                <div class="inv-info">
                    <span class="inv-name rarity-${itemDef.rarity}">${itemDef.name}</span>
                    <span class="inv-desc">${itemDef.desc} (Stack: ${qty})</span>
                </div>
                <div class="inv-qty">x${qty}</div>
            `;
            el.inventoryList.appendChild(div);
        }
    }
    if (!hasItems) {
        el.inventoryList.innerHTML = '<div style="text-align:center; opacity:0.5; margin-top:20px;">装備を一つも持っていない...</div>';
    }
}

function renderAchievements() {
    el.achievementsList.innerHTML = '';
    let foundVisible = false;

    achData.forEach(ach => {
        const isUnlocked = player.achievements.includes(ach.id);
        const isReqMet = !ach.req || player.achievements.includes(ach.req);
        
        // Show only if unlocked or prerequisite is met
        if (isUnlocked || isReqMet) {
            foundVisible = true;
            const div = document.createElement('div');
            div.className = `ach-item ${isUnlocked ? 'unlocked' : ''}`;
            div.innerHTML = `
                <div class="ach-info">
                    <span class="ach-name">${ach.name}</span>
                    <span class="ach-desc">${ach.desc}</span>
                    <span class="ach-reward">報酬: ${ach.reward}</span>
                </div>
                <div class="ach-status">${isUnlocked ? '★' : '☆'}</div>
            `;
            el.achievementsList.appendChild(div);
        }
    });

    if (!foundVisible) {
        el.achievementsList.innerHTML = '<div style="text-align:center; opacity:0.5; margin-top:20px;">達成可能な実績がない...</div>';
    }
}

// Ranking API Logic
async function fetchRanking() {
    el.rankingList.innerHTML = '<div style="text-align:center;">ロード中...</div>';
    try {
        const res = await fetch('/api/ranking');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        
        el.rankingList.innerHTML = '';
        if (data.length === 0) {
            el.rankingList.innerHTML = '<div style="text-align:center; opacity:0.5;">まだ記録がありません</div>';
            return;
        }
        
        data.forEach((p, index) => {
            const rank = index + 1;
            let rankStr = `${rank}位`;
            let color = "var(--text-main)";
            if (rank === 1) { rankStr = '🥇 1位'; color = 'var(--legendary)'; }
            if (rank === 2) { rankStr = '🥈 2位'; color = '#c0c0c0'; }
            if (rank === 3) { rankStr = '🥉 3位'; color = '#cd7f32'; }
            
            const div = document.createElement('div');
            div.className = 'inv-item';
            div.style.borderColor = color;
            div.innerHTML = `
                <div class="inv-info" style="flex-direction: row; align-items: center; justify-content: space-between; width: 100%; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1; overflow: hidden;">
                        <span style="font-weight: bold; font-size: 1.2rem; color: ${color}; white-space: nowrap; flex-shrink: 0; min-width: 65px;">${rankStr}</span>
                        <span class="inv-name" style="font-size: 1.1rem; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</span>
                    </div>
                    <div style="text-align: right; flex-shrink: 0;">
                        <div style="font-size: 1.1rem; color: var(--gold); font-weight: bold;">Max B${p.maxFloor}F</div>
                        <div style="font-size: 0.8rem; color: var(--text-dim);">Lv.${p.lvl}</div>
                    </div>
                </div>
            `;
            el.rankingList.appendChild(div);
        });
    } catch (e) {
        el.rankingList.innerHTML = '<div style="text-align:center; color: #ff5252;">ランキングの取得に失敗しました</div>';
        console.error(e);
    }
}

function submitScore() {
    if (!player.name) return; // Do not submit if no name
    fetch('/api/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: player.name,
            maxFloor: player.stats.maxFloor,
            lvl: player.lvl
        })
    }).catch(console.error);
}

// Modal Listeners
el.btnRanking.addEventListener('click', () => {
    if (!player.name) {
        el.modalName.style.display = 'flex';
        el.playerNameInput.focus();
    } else {
        el.modalRanking.style.display = 'flex';
        fetchRanking();
    }
});

el.btnSaveName.addEventListener('click', () => {
    const val = el.playerNameInput.value.trim();
    if (val) {
        player.name = val;
        saveGame();
        el.modalName.style.display = 'none';
        
        // Immediately submit score and open ranking
        submitScore();
        el.modalRanking.style.display = 'flex';
        fetchRanking();
    }
});

el.btnCancelName.addEventListener('click', () => {
    el.modalName.style.display = 'none';
});

el.btnCloseRanking.addEventListener('click', () => {
    el.modalRanking.style.display = 'none';
});

// Floor Jump Logic
el.btnFloorJump.addEventListener('click', () => {
    renderFloorList();
    el.modalFloor.style.display = 'flex';
});

el.btnCloseFloor.addEventListener('click', () => {
    el.modalFloor.style.display = 'none';
});

function renderFloorList() {
    el.floorList.innerHTML = '';
    let maxF = player.maxFloor || 1;
    
    // Add floor 1 button
    const btn1 = document.createElement('button');
    btn1.className = 'action-btn shop-btn';
    btn1.style.marginBottom = '10px';
    btn1.innerText = `B1F に移動`;
    btn1.onclick = () => jumpToFloor(1);
    el.floorList.appendChild(btn1);

    // Add buttons for every 50 floors up to maxFloor
    for (let f = 50; f <= maxF; f += 50) {
        const btn = document.createElement('button');
        btn.className = 'action-btn shop-btn';
        btn.style.marginBottom = '10px';
        btn.innerText = `B${f}F に移動`;
        btn.onclick = () => jumpToFloor(f);
        el.floorList.appendChild(btn);
    }
}

function jumpToFloor(floorNumber) {
    player.floor = floorNumber;
    
    // Reset enemy state so a new one spawns for this floor
    enemy = null;
    el.eName.innerText = 'No Enemy';
    el.eHpBar.style.width = '0%';
    el.eHp.innerText = '0';
    el.eMaxHp.innerText = '0';
    el.eName.style.color = 'var(--text-main)';
    
    // Hide modal and update UI
    el.modalFloor.style.display = 'none';
    
    addLog(`B${floorNumber}F に移動した！`, 'system');
    saveData();
    updateUI();
}

el.btnInventory.addEventListener('click', () => {
    renderInventory();
    el.modalInventory.style.display = 'flex';
});
el.btnCloseInv.addEventListener('click', () => {
    el.modalInventory.style.display = 'none';
});

el.btnAchievements.addEventListener('click', () => {
    renderAchievements();
    el.modalAchievements.style.display = 'flex';
});
el.btnCloseAch.addEventListener('click', () => {
    el.modalAchievements.style.display = 'none';
});

// Initial renders
updateUI();

// --- Mobile Navigation ---
const navBtns = document.querySelectorAll('.nav-btn');
const panels = {
    'panel-status': document.getElementById('panel-status'),
    'panel-battle': document.getElementById('panel-battle'),
    'panel-shop': document.getElementById('panel-shop')
};

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        Object.values(panels).forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        if (panels[targetId]) panels[targetId].classList.add('active');
    });
});

// Prevent double-tap to zoom on iOS Safari
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });
