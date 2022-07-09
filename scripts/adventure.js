function adventure (z)
{
	if (player.turnsToMidnight <= 0)
	{
		goToLocation ("noAdventuresWarning");
		return;
	}
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

function endAdventure()
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
	calculateStats ();
	giveHp(player.hpRegen);
	giveMp(player.mpRegen);
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