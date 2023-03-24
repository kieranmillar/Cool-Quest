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
		&& player.options[optionEnum.ZONEWARNINGS] == 1
		&& !zoneBypassedWarnings[z])
	{
		goToLocation ("toughZoneWarning");
		return;
	}
	if("special" in zones[z])
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
	let combatRate = zones[z].combatChance;
	if (combatRate != 0 && combatRate != 100) {
		combatRate += player.combatRate;
	}
	let r = Math.random();
	if (r * 100 < combatRate) {
		pickRandomCombat (z);
	}
	else {
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
		adventureAgainButton.html("Adventure Again at the " + zones[lastZone].name + " (<img src='./images/adventure.png' title='(1 Adventure)'>)");
		let returnToContainerButton = $("#returnToContainerButton");
		returnToContainerButton.show();
		returnToContainerButton.html(`Return to ${zones[lastZone].parentName}`);
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

// Pick a random combat from a zone. Rejects and rerolls if that combat is in the queue
function pickRandomCombat (zone) {
	let queueCopy = player.combatQueue.map(x => x);
	let working = true;
	let combatId = 0;
	while (working) {
		let r = Math.floor(Math.random() * zones[zone].combats.length);
		combatId = zones[zone].combats[r];
		let indexInQueueCopy = queueCopy.findIndex(x => x == combatId);
		if (indexInQueueCopy == -1){
			working = false;
		}
		else {
			queueCopy.splice(indexInQueueCopy, 1);
		}
	}
	beginCombat (combats[combatId]);
}

var zoneBypassedWarnings = [];

function bypassZoneLevelWarning()
{
	zoneBypassedWarnings[lastZone] = 1;
	adventure (lastZone);
}
