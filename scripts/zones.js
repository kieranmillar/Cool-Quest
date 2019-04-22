var zones = [
	{
		id: 0,
		name: "The Town Hall Basement",
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
		combatChance: 70,
		combats: [3, 4],
		noncombats: [1]
	},
];

function adventure (z)
{
	if (player.hp == 0)
	{
		hint ("You can't adventure with 0 HP! Go rest at your house.", "r");
		return;
	}
	if (busy == true)
	{
		hint ("You're too busy to leave now!", "r");
		return;
	}
	$(".newDay").hide();
	lastZone = z;
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
		let r2 = Math.random();
		r2 = Math.floor (r2 * zones[z].combats.length);
		beginCombat (combats[zones[z].combats[r2]]);
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
		$(".newDay").show();
	}
	calculateStats ();
	if (player.job == "Wrestler")
	{
		giveHp(Math.ceil(player.effHpMax / 2));
	}
	giveHp(player.effHpRegen);
	giveMp(player.effMpRegen);
	redrawInfoPanel();
	save();
}