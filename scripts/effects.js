// Add some number of turns to a buff. Adds it to the list if currently inactive
function addBuff (id, turns) {
	let buffPosition = player.buffs.findIndex(x => x.id == id);
	if (buffPosition == -1) {
		player.buffs.push({id: id, turns: turns});
	}
	else {
		player.buffs[buffPosition].turns += turns;
	}
	player.buffs.sort(function(a,b){return a.turns - b.turns;});
	calculateStats();
	redrawInfoPanel();
	return true;
}

// Decrease some number of turns from a buff. A turn value of -1 removes all turns. Removes the buff from the list when turns reduces to 0.
function decreaseBuff (id, turns) {
	let buffPosition = player.buffs.findIndex(x => x.id == id);
	if (buffPosition == -1) {
		return false; // don't have the buff anyway
	}
	else {
		player.buffs[buffPosition].turns -= turns;
		if (turns == -1) {
			player.buffs[buffPosition].turns = 0;
		}
		if (player.buffs[buffPosition].turns <= 0) {
			player.buffs.splice(buffPosition, 1);
		}
		return true;
	}
}
