var jobEnum = {
	WRESTLER: 0,
	PIRATE: 1,
	MYSTIC: 2,
	JUGGLER: 3,
}

var player = {
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
	hp: 5,
	mp: 1,
	baseHpMax: 5,
	baseMpMax: 1,
	baseStr: 5,
	baseDef: 4,
	baseMag: 3,
	baseSpd: 4,
	effHpMax: 0,
	effMpMax: 0,
	effStr: 0,
	effDef: 0,
	effMag: 0,
	effSpd: 0,
	fireDamage: 0,
	iceDamage: 0,
	fireRes: 0,
	iceRes: 0,
	effHpRegen: 0,
	effMpRegen: 0,
	effItemBoost: 0,
	effGoldBoost: 0,
	effMl: 0,
	hpGain: 5,
	mpGain: 1,
	strGain: 5,
	defGain: 4,
	magGain: 3,
	spdGain: 4,
	gold: 0,
	inventory: [],
	equipment: [//0 = hat, 1 = armour, 2 = weapon, 3 = shield, 4 = shoes, 5-8 = accs
		-1, -1, -1, -1, -1, -1, -1, -1, -1
	],
	buffs: [],
	skills: [//0 = unowned, 1 = owned, 2 = permanent
	],
	juggles: [],
	optionSmallInfoPanel: 0,
	optionQuickHeal: 0,
	questTutorial: 0,
	questTownHall: 0,
	zoneCounterBasement: 0,
	zoneCounterCanteen: 0
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

function createCharacter()
{
	let name = $("#create_name").val();
	if (name == "")
	{
		hint ("You need to input a name!", "r");
		return;
	}
	let job = parseInt($("input[type='radio'][name='job']:checked").val());
	player.name = name;
	player.job = job;
	player.inventory = [];
	player.equipment = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
	player.buffs = [];
	player.juggles = [];
	for (var i in player.skills)
	{
		if (player.skills[i] == 1)
		{
			player.skills[i] = 0;
		}
	}
	switch (job)
	{
		case jobEnum.WRESTLER:
			player.hpGain = 8;
			player.mpGain = 1;
			player.strGain = 5;
			player.defGain = 4;
			player.magGain = 3;
			player.spdGain = 4;
			if (!player.skills[0])
			{
				player.skills[0] = 1;
			}
			if (!player.skills[1])
			{
				player.skills[1] = 1;
			}
			break;
		case jobEnum.PIRATE:
			player.hpGain = 5;
			player.mpGain = 2;
			player.strGain = 4;
			player.defGain = 5;
			player.magGain = 4;
			player.spdGain = 3;
			if (!player.skills[2])
			{
				player.skills[2] = 1;
			}
			if (!player.skills[3])
			{
				player.skills[3] = 1;
			}
			break;
		case jobEnum.MYSTIC:
			player.hpGain = 4;
			player.mpGain = 3;
			player.strGain = 4;
			player.defGain = 3;
			player.magGain = 5;
			player.spdGain = 4;
			if (!player.skills[4])
			{
				player.skills[4] = 1;
			}
			if (!player.skills[5])
			{
				player.skills[5] = 1;
			}
			break;
		case jobEnum.JUGGLER:
			player.hpGain = 6;
			player.mpGain = 2;
			player.strGain = 3;
			player.defGain = 4;
			player.magGain = 4;
			player.spdGain = 5;
			if (!player.skills[6])
			{
				player.skills[6] = 1;
			}
			if (!player.skills[7])
			{
				player.skills[7] = 1;
			}
	}
	player.baseHpMax = player.hpGain;
	player.baseMpMax = player.mpGain;
	player.baseStr = player.strGain;
	player.baseDef = player.defGain;
	player.baseMag = player.magGain;
	player.baseSpd = player.spdGain;
	$("#characterCreation").hide();
	$("#mainGame").show();
	$("#link_inventory").show();
	$("#link_map").show();
	$("#link_settings").show();
	$(".newDay").hide();
	$("#adventureAgainButton").hide();
	calculateStats();
	player.hp = player.effHpMax;
	player.mp = player.effMpMax;
	redrawCharPane();
	redrawInfoPanel();
	goToLocation ("intro");
}

function calculateStats ()
{
	player.fullMax = 10;
	player.effHpMax = player.baseHpMax;
	player.effMpMax = player.baseMpMax;
	player.effStr = player.baseStr;
	player.effDef = player.baseDef;
	player.effMag = player.baseMag;
	player.effSpd = player.baseSpd;
	player.fireDamage = 0;
	player.iceDamage = 0;
	player.fireRes = 0;
	player.iceRes = 0;
	player.effHpRegen = 0;
	player.effMpRegen = 0;
	player.effItemBoost = 0;
	player.effGoldBoost = 0;
	player.effMl = 0;
	
	//apply equipment
	for (var i in player.equipment)
	{
		if (player.equipment[i] != -1)
		{
			if(items[player.equipment[i]].hasOwnProperty("onWear"))
			{
				items[player.equipment[i]].onWear();
			}
		}
	}
	
	//apply buffs
	for (var i in player.buffs)
	{
		effects[player.buffs[i].id].effect();
	}

	//apply juggling balls
	for (var i in player.juggles)
	{
		jugglingBalls[player.juggles[i]].effect();
	}
	
	//apply passives

	
	//cap low stats to minimums
	if (player.effHpMax < 1)
		player.effHpMax = 1;
	if (player.hp > player.effHpMax)
		player.hp = player.effHpMax;
	if (player.effMpMax < 0)
		player.effMpMax = 0;
	if (player.mp > player.effMpMax)
		player.mp = player.effMpMax;
	if (player.effStr < 0)
		player.effStr = 0;
	if (player.effDef < 0)
		player.effDef = 0;
	if (player.effMag < 0)
		player.effMag = 0;
	if (player.effSpd < 0)
		player.effSpd = 0;

	if (player.job == jobEnum.WRESTLER)
	{
		player.effHpRegen += Math.floor(player.effHpMax / 4);
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
		player.baseHpMax += player.hpGain;
		player.baseMpMax += player.mpGain;
		player.baseStr += player.strGain;
		player.baseDef += player.defGain;
		player.baseMag += player.magGain;
		player.baseSpd += player.spdGain;
		t += "\n<strong>You grew your stats!</strong>";
		calculateStats();
	}
	while (player.exp >= levelDeltas[player.level-1])
	{
		player.exp -= levelDeltas[player.level-1];
		player.level++;
		t += "\n<strong>You levelled up!</strong>";
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
		g = Math.floor(x * ((100+player.effGoldBoost) / 100));
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

function eat (turns, fullness)
{
	if (player.full + fullness > player.fullMax)
	{
		hint ("You're too full to eat that!", "r");
		return false;
	}
	else
	{
		player.full += fullness;
		player.turnsToMidnight += turns;
		redrawCharPane();
		return true;
	}
}

function eatMessage (itemId, turns, fullness)
{
	let t = "You eat the ";
	t += items[itemId].name;
	t += ", delaying midnight by ";
	t += turns;
	if (turns > 1)
	{
		t += " turns";
	}
	else
	{
		t += " turn";
	}
	t += " and gaining ";
	t += fullness;
	t += " fullness.";
	return t;
}

function rest ()
{
	let hp = Math.floor(Math.random()*10) + 30;
	let mp = Math.floor(Math.random()*3) + 5;
	hint (giveHp(hp) + " " + giveMp(mp), "g");
	endAdventure ();
}

function buyHP (x)
{
	if (x > player.effHpMax - player.hp)
	{
		x = player.effHpMax - player.hp;
	}
	if (x <= 0)
	{
		return;
	}
	if (busy == true)
	{
		hint ("You're too busy to do that right now!", "r");
		return;
	}
	let cost = x * 2;
	if (player.gold < cost)
	{
		hint ("You can't afford that!", "r");
		return;
	}
	player.gold -= cost;
	hint (giveHp(x) + " It cost " + cost + " Gold.", "g");
	save ();
}

function buyMP (x)
{
	if (x > player.effMpMax - player.mp)
	{
		x = player.effMpMax - player.mp;
	}
	if (x <= 0)
	{
		return;
	}
	if (busy == true)
	{
		hint ("You're too busy to do that right now!", "r");
		return;
	}
	let cost = x * 10;
	if (player.gold < cost)
	{
		hint ("You can't afford that!", "r");
		return;
	}
	player.gold -= cost;
	hint (giveMp(x) + " It cost " + cost + " Gold.", "g");
	save ();
}