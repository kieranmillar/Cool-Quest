var zones = [
	{
		id: 0,
		name: "The Town Hall Basement",
		level: 1,
		combatChance: 90,
		combats: [0, 1, 2],
		noncombats: [0],
		special: function ()
		{
			player.zoneCounterBasement ++;
			if (player.zoneCounterBasement == 5)
			{
				player.zoneCounterBasement = 0;
				beginNoncombat (noncombats[0]);
			}
			else
			{
				genericAdventure(0);
			}
		}
	},
	{
		id: 1,
		name: "The Town Hall Tax Office",
		level: 1,
		combatChance: 70,
		combats: [3, 4],
		noncombats: [1]
	},
	{
		id: 2,
		name: "The Town Hall Canteen",
		level: 2,
		combatChance: 90,
		combats: [5, 6, 7],
		noncombats: [2]
	},
	{
		id: 3,
		name: "The Orc Camp Mess Hall",
		level: 2,
		combatChance: 100,
		combats: [8, 9, 10, 11],
		noncombats: []
	},
	{
		id: 4,
		name: "The Orc Camp Barracks",
		level: 2,
		combatChance: 75,
		combats: [8, 12, 13],
		noncombats: [3]
	},
	{
		id: 5,
		name: "The Orc Camp Munitions Store",
		level: 3,
		combatChance: 100,
		combats: [14],
		noncombats: []
	},
	{
		id: 6,
		name: "The Orc Camp Leader's Tent",
		level: 2,
		combatChance: 0,
		combats: [],
		noncombats: [4]
	},
];

function adventure (z)
{
	if (player.hp == 0)
	{
		hint ("You can't adventure with 0 HP! Go rest at your house or visit the doctor.", "r");
		return;
	}
	if (busy == true)
	{
		hint ("You're too busy to leave now!", "r");
		return;
	}
	$(".newDay").hide();
	lastZone = z;
	if (zones[z].level > player.level
		&& player.optionZoneWarnings == 1
		&& !zoneBypassedWarnings[z])
	{
		goToLocation ("toughZoneWarning");
		return;
	}
	if(zones[z].hasOwnProperty("special"))
	{
		zones[z].special();
	}
	else
	{
		genericAdventure(z);
	}
}

function genericAdventure (z)
{
	let r = Math.random();
	if (r * 100 < zones[z].combatChance)
	{
		pickRandomCombat (z);
	}
	else
	{
		let r2 = Math.random();
		r2 = Math.floor (r2 * zones[z].noncombats.length);
		beginNoncombat (noncombats[zones[z].noncombats[r2]]);
	}
}

function endAdventure ()
{
	busy = false;
	if (lastZone != -1)
	{
		let adventureAgainButton = $("#adventureAgainButton");
		adventureAgainButton.show();
		adventureAgainButton.html("Adventure Again at the " + zones[lastZone].name + " (<img src='./images/adventure.png' title='(1 Adventure)'/>)");
	}
	for (let i = player.buffs.length - 1; i >= 0; i --)
	{
		decreaseBuff (player.buffs[i].id, 1);
	}
	player.turns ++;
	player.turnsToMidnight --;
	if (player.turnsToMidnight <= 0)
	{
		player.turnsToMidnight = 40;
		player.day ++;
		player.full = 0;
		player.juggles = [];
		$(".newDay").show();
	}
	calculateStats ();
	giveHp(player.effHpRegen);
	giveMp(player.effMpRegen);
	redrawInfoPanel();
	save();
}

function pickRandomCombat (zone)
{
	let r = Math.random();
	r = Math.floor (r * zones[zone].combats.length);
	beginCombat (combats[zones[zone].combats[r]]);
}

var zoneBypassedWarnings = [];

function bypassZoneLevelWarning()
{
	zoneBypassedWarnings[lastZone] = 1;
	adventure (lastZone);
}