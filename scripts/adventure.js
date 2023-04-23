var adventureAgainButton = document.getElementById("adventureAgainButton");
var returnToContainerButton = document.getElementById("returnToContainerButton");

var zoneBypassedWarnings = [];

// Adventure in a zone
function adventure(id) {
	if (busy == true) {
		hint("You're too busy to leave now!", "r");
		return;
	}
	if (player.turnsToMidnight <= 0) {
		goToLocation("noAdventuresWarning");
		return;
	}
	if (player.hp <= 0) {
		hint("You can't adventure with 0 HP! Go rest at your house or visit the doctor.", "r");
		return;
	}
	lastZone = id;
	if (zones[id].level > player.level
		&& player.options[optionEnum.ZONEWARNINGS] == 1
		&& !zoneBypassedWarnings[id]) {
		goToLocation("toughZoneWarning");
		return;
	}
	if("special" in zones[id]) {
		zones[id].special();
	}
	else {
		genericAdventure(id);
	}
}

// Generic way to determine the result of adventuring in a zone
function genericAdventure(id) {
	let combatRate = zones[id].combatChance;
	if (combatRate != 0 && combatRate != 100) {
		combatRate += player.combatRate;
	}
	if (Math.random() * 100 < combatRate) {
		pickRandomCombat(id);
	}
	else {
		let r = Math.floor(Math.random() * zones[id].noncombats.length);
		beginNoncombat(zones[id].noncombats[r]);
	}
}

// Ends an adventure, can optionally pass in false to make it not take a turn
function endAdventure(costsTurn = true) {
	busy = false;
	if (lastZone != -1) {
		adventureAgainButton.innerHTML = `Adventure Again at ${zones[lastZone].name} (<img src='./images/adventure.png' title='(1 Adventure)'>)`;
		show(adventureAgainButton);
		returnToContainerButton.innerHTML = `Return to ${zones[lastZone].parentName}`;
		show(returnToContainerButton);
	}
	if (costsTurn) {
		for (let i = player.buffs.length - 1; i >= 0; i --) {
			// we loop through buffs in reverse order because if a buff runs out it removes it from the array
			decreaseBuff(player.buffs[i].id, 1);
		}
		player.turns ++;
		player.turnsToMidnight --;
		calculateStats();
		gainHp(player.hpRegen);
		gainMp(player.mpRegen);
		redrawBuffPane();
	}
	save();
}

// Pick a random combat from a zone. Rejects and rerolls if that combat is in the queue
function pickRandomCombat(zone) {
	let queueCopy = player.combatQueue.map(x => x);
	let combatsCopy = zones[zone].combats.map(x => x);
	combatsCopy = combatsCopy.filter(x => x != player.lawTarget);
	if (combatsCopy.length == 0) {
		beginNoncombat(14);
		return;
	}
	let working = true;
	let combatId = 0;
	while (working) {
		let r = Math.floor(Math.random() * combatsCopy.length);
		combatId = combatsCopy[r];
		let indexInQueueCopy = queueCopy.findIndex(x => x == combatId);
		if (indexInQueueCopy == -1) {
			working = false;
		}
		else {
			queueCopy.splice(indexInQueueCopy, 1);
		}
	}
	beginCombat (combats[combatId]);
}

// Bypasses the warning if your level is too low for a zone. Stops asking you for the rest of this session (not saved)
function bypassZoneLevelWarning() {
	zoneBypassedWarnings[lastZone] = 1;
	adventure(lastZone);
}
