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
			if (player.zoneCounterBasement >= 5)
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
		noncombats: [],
		special: function ()
		{
			if (player.zoneCounterOrcMunitions == 1 && player.questOrcCamp < 6)
			{
				player.zoneCounterOrcMunitions = 0;
				beginCombat (combats[15]);
			}
			else
			{
				beginCombat (combats[14]);
			}
		}
	},
	{
		id: 6,
		name: "The Orc Camp Leader's Tent",
		level: 2,
		combatChance: 0,
		combats: [],
		noncombats: [],
		special: function ()
		{
			if (player.questOrcCamp >= 6)
			{
				beginNoncombat (noncombats[6]);
			}
			else if (player.equipment[5] == 25 ||
				player.equipment[6] == 25 ||
				player.equipment[7] == 25 ||
				player.equipment[8] == 25)
			{
				beginNoncombat (noncombats[7]);
			}
			else if (player.questOrcCamp < 5)
			{
				beginNoncombat (noncombats[4]);
			}
			else if (player.questOrcCamp == 5)
			{
				beginNoncombat (noncombats[5]);
			}
		}
	},
];