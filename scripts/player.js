var createNameInput = document.getElementById("create_name");
var jobForm = document.getElementById("jobForm");

var jobEnum = {
	WRESTLER: 0,
	MYSTIC: 1,
	PIRATE: 2
}

var optionEnum = {
	COMPACTINFOPANEL: 0,
	QUICKHEAL: 1,
	ZONEWARNINGS: 2,
	FOODQUALITY: 3,
}

var questEnumSize = 6;
var questEnum = {
	TUTORIAL: 0,
	TOWNHALL: 1,
	ORCCAMP: 2,
	YELLOWKEY: 3,
	BADGER: 4,
	HAPPYVILLE: 5
}

var zoneCounterEnum = {
	BASEMENT: 0,
	CANTEEN: 1,
	ORCMUNITIONS: 2,
	BADGERBADGERSETT: 3
}

var player = {
	version: 1, // game version, in case we need to make changes on load
	name: "Kieran",
	job: jobEnum.WRESTLER,
	day: 1,
	turns: 0,
	turnsToMidnight: 40,
	full: 0,
	fullMax: 10,
	level: 1,
	statLev: 1,
	exp: 0,
	expLev: 0,
	hp: 10,
	mp: 3,
	baseHpMax: 10,
	baseMpMax: 3,
	basePow: 5,
	baseDef: 4,
	baseInit: 0,
	effHpMax: 0,
	effMpMax: 0,
	effPow: 0,
	effDef: 0,
	effInit: 0,
	effCritChance: 0.1,
	effCritMultiplier: 1.2,
	effDamageReduction: 0,
	fireDamage: 0,
	iceDamage: 0,
	psychicDamage: 0,
	emotionalDamage: 0,
	fireRes: 0,
	iceRes: 0,
	psychicRes: 0,
	emotionalRes: 0,
	hpRegen: 0,
	mpRegen: 0,
	effItemBoost: 0,
	effItemBoostFood: 0,
	effGoldBoost: 0,
	effMl: 0,
	combatRate: 0,
	powGain: 4,
	defGain: 4,
	gold: 50,
	inventory: [],
	equipment: [//0 = hat, 1 = armour, 2 = weapon, 3 = shield, 4-7 = accs
		-1, -1, -1, -1, -1, -1, -1, -1
	],
	buffs: [],
	skills: [//0 = unowned, 1 = owned, 2 = permanent
	],
	toggleSkills: [],
	minionExp: [],
	minionLevels: [],
	minionNames: [],
	equippedMinions: [-1, -1],
	effMinionLevelBonus: 0,
	effMinionExpBonus: 0,
	castTimeManagement: false,
	options: [0, 0, 1, 0],
	drellaUDailyBigSkill: -1,
	drellaUDailySmallSkills: [],
	quests: [],
	mayorQuestsCompleted: 0,
	zoneCounters: [],
	combatQueue: []
};

var levelDeltas = [
	100,
	500,
	1500,
	3400,
	6500,
	11100,
	17500,
	26000,
	36900,
	50500
];

var statLevelDeltas = [
	100,
	200, 300,
	400, 500, 600,
	700, 800, 900, 1000,
	1100, 1200, 1300, 1400, 1500,
	1600, 1700, 1800, 1900, 2000, 2100,
	2200, 2300, 2400, 2500, 2600, 2700, 2800,
	2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600,
	3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400, 4500,
	4600, 4700, 4800, 4900, 5000, 5100, 5200, 5300, 5400, 5500
];

function createCharacter() {
	let name = createNameInput.value.trim();
	if (name == "") {
		hint ("You need to input a name!", "r");
		return;
	}
	let job = parseInt(jobForm.job.value);
	name = name.trim();
	name = name.substring(0, 30);
	player.name = name;
	player.job = job;
	player.inventory = [];
	player.equipment = [-1, -1, -1, -1, -1, -1, -1, -1];
	player.buffs = [];
	for (var i in player.skills) {
		if (player.skills[i] == 1) {
			player.skills[i] = 0;
		}
	}
	player.castTimeManagement = false;
	switch (job) {
		case jobEnum.WRESTLER:
			player.powGain = 5;
			player.defGain = 3;
			if (!player.skills[0]) {
				player.skills[0] = 1;
			}
			if (!player.skills[1]) {
				player.skills[1] = 1;
			}
			break;
		case jobEnum.MYSTIC:
			player.powGain = 4;
			player.defGain = 4;
			if (!player.skills[40]) {
				player.skills[40] = 1;
			}
			if (!player.skills[41]) {
				player.skills[41] = 1;
			}
			break;
		case jobEnum.PIRATE:
			player.powGain = 3;
			player.defGain = 5;
			if (!player.skills[20]) {
				player.skills[20] = 1;
			}
			if (!player.skills[21]) {
				player.skills[21] = 1;
			}
			break;
	}
	player.baseHpMax = 10;
	player.baseMpMax = 3;
	player.basePow = player.powGain;
	player.baseDef = player.defGain;
	player.baseInit = 0;
	for (var i in player.minionExp) {
		if (player.minionExp[i] != undefined && player.minionExp[i] != null) {
			player.minionExp[i] = 0;
			player.minionLevels = 1;
		}
	}
	player.minionNames = [];
	player.equippedMinions = [-1, -1];
	player.quests.fill(0, 0, questEnumSize);
	player.mayorQuestsCompleted = 0;
	player.zoneCounters = [];
	player.combatQueue = [];
	$("#characterCreation").hide();
	$("#mainGame").show();
	link_inventory.classList.remove("hide");
	link_settings.classList.remove("hide");
	$("#adventureAgainButton").hide();
	$("#returnToContainerButton").hide();
	calculateStats();
	player.hp = player.effHpMax;
	player.mp = player.effMpMax;
	player.gold = 50;
	redrawCharPane();
	redrawInfoPanel();
	randomiseDrellaUSkills();
	goToLocation ("intro");
}

function calculateStats ()
{
	player.fullMax = 10;
	player.effHpMax = player.baseHpMax;
	player.effMpMax = player.baseMpMax;
	player.effPow = player.basePow;
	player.effDef = player.baseDef;
	player.effInit = player.baseInit;
	player.effCritChance = 0.1;
	player.effCritMultiplier = 1.2;
	player.effDamageReduction = 0;
	player.fireDamage = 0;
	player.iceDamage = 0;
	player.psychicDamage = 0;
	player.emotionalDamage = 0;
	player.fireRes = 0;
	player.iceRes = 0;
	player.psychicRes = 0;
	player.emotionalRes = 0;
	player.hpRegen = 0;
	player.mpRegen = 0;
	player.effItemBoost = 0;
	player.effItemBoostFood = 0;
	player.effGoldBoost = 0;
	player.effMl = 0;
	player.combatRate = 0;
	player.effMinionLevelBonus = 0;
	player.effMinionExpBonus = 0;
	
	//apply equipment
	for (var i in player.equipment)
	{
		if (player.equipment[i] != -1)
		{
			if("onWear" in items[player.equipment[i]])
			{
				items[player.equipment[i]].onWear();
			}
		}
	}
	
	//apply buffs
	for (var i in player.buffs)
	{
		if ("effect" in effects[player.buffs[i].id]) {
			effects[player.buffs[i].id].effect();
		}
	}
	
	//apply passives
	for (var i in player.skills) {
		if (!player.skills[i]) {
			continue;
		}
		if (skills[i].category != skillType.PASSIVE) {
			continue;
		}
		if ("onUse" in skills[i]) {
			skills[i].onUse();
		}
	}

	//apply minion passives
	for (var i in player.equippedMinions) {
		if (player.equippedMinions[i] == -1) {
			continue;
		}
		if ("onPassive" in minions[player.equippedMinions[i]]) {
			minions[player.equippedMinions[i]].onPassive();
		}
	}

	//cap low stats to minimums
	if (player.effHpMax < 1)
		player.effHpMax = 1;
	if (player.hp > player.effHpMax)
		player.hp = player.effHpMax;
	if (player.effMpMax < 0)
		player.effMpMax = 0;
	if (player.mp > player.effMpMax)
		player.mp = player.effMpMax;
	if (player.effPow < 0)
		player.effPow = 0;
	if (player.effDef < 0)
		player.effDef = 0;

	if (player.job == jobEnum.WRESTLER)
	{
		player.hpRegen += Math.floor(player.effHpMax / 5);
	}
	redrawCharPane();
}

function giveExp (e)
{
	if (e <= 0)
		return;
	player.expLev += e;
	player.exp += e;
	let t = "You gained " + e + " experience points!";
	while (player.expLev >= statLevelDeltas[player.statLev-1])
	{
		player.expLev -= statLevelDeltas[player.statLev-1];
		player.statLev++;
		player.baseHpMax += 5;
		player.baseMpMax += 1;
		player.basePow += player.powGain;
		player.baseDef += player.defGain;
		player.baseInit += 2;
		t += "<br><strong>You grew your stats!</strong>";
		calculateStats();
	}
	while (player.exp >= levelDeltas[player.level-1])
	{
		player.exp -= levelDeltas[player.level-1];
		player.level++;
		t += "<br><strong>You levelled up!</strong>";
	}
	return t;
}

function giveGold (g, inCombat)
{
	if (g <= 0)
		return;
	if (inCombat == true)
	{
		let x = g;
		x += Math.floor(g * Math.random() * 0.25);
		x -= Math.floor(g * Math.random() * 0.25);//monster drops between +25% and -25%, weighted heavily to the middle
		g = Math.floor(x * ((100 + player.effGoldBoost) / 100));
	}
	player.gold += g;
	return "You gained " + g + " gold!";
}

function giveHp (h)
{
	if (h <= 0)
	{
		return;
	}
	player.hp += h;
	if (player.hp > player.effHpMax)
	{
		player.hp = player.effHpMax;
	}
	redrawCharPane();
	return "You gained " + h + " HP!";
}

function giveMp (m)
{
	if (m <= 0)
	{
		return;
	}
	player.mp += m;
	if (player.mp > player.effMpMax)
	{
		player.mp = player.effMpMax
	}
	redrawCharPane();
	return "You gained " + m + " MP!";
}

function eat (itemId)
{
	let turns = items[itemId].turns;
	let fullness = items[itemId].fullness;

	if (player.full + fullness > player.fullMax)
	{
		hint ("You're too full to eat that!", "r");
		return false;
	}
	else
	{
		player.full += fullness;
		player.turnsToMidnight += turns;
		if (player.skills[22])
		{
			player.hp = player.effHpMax;
		}
		return true;
	}
}

function eatMessage (itemId)
{
	let t = "You eat the ";
	t += items[itemId].name;
	t += ", delaying midnight by ";
	t += items[itemId].turns;
	if (items[itemId].turns > 1)
	{
		t += " turns";
	}
	else
	{
		t += " turn";
	}
	t += " and gaining ";
	t += items[itemId].fullness;
	t += " fullness.";
	return t;
}

function rest()
{
	if (player.turnsToMidnight <= 0)
	{
		goToLocation("noAdventuresWarning");
		return;
	}
	restRecovery();
	endAdventure();
	if (player.turnsToMidnight <= 0)
	{
		goToLocation("house");
	}
}

function restRecovery()
{
	let hp = Math.floor(Math.random()*10) + 30;
	let mp = Math.floor(Math.random()*3) + 5;
	hint (giveHp(hp) + " " + giveMp(mp), "g");
}

function buyHP (x) {
	if (x > player.effHpMax - player.hp) {
		x = player.effHpMax - player.hp;
	}
	if (x <= 0) {
		return;
	}
	if (busy == true) {
		hint("You're too busy to do that right now!", "r");
		return;
	}
	let cost = x * 2;
	if (player.skills[62]) {
		cost = x;
	}
	if (player.gold < cost) {
		hint("You can't afford that!", "r");
		return;
	}
	player.gold -= cost;
	hint(giveHp(x) + " It cost " + cost + " Gold.", "g");
	save();
}

function buyMP (x) {
	if (x > player.effMpMax - player.mp) {
		x = player.effMpMax - player.mp;
	}
	if (x <= 0) {
		return;
	}
	if (busy == true) {
		hint("You're too busy to do that right now!", "r");
		return;
	}
	let cost = x * 10;
	if (player.skills[62]) {
		cost = x * 5;
	}
	if (player.gold < cost) {
		hint("You can't afford that!", "r");
		return;
	}
	player.gold -= cost;
	hint(giveMp(x) + " It cost " + cost + " Gold.", "g");
	save();
}
