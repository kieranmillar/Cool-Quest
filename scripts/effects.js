function addBuff (id, turns)
{
	let buffPosition = -1;
	for (var i in player.buffs)
	{
		if (player.buffs[i].id == id)
		{
			buffPosition = i;
			break;
		}
	}
	if (buffPosition == -1)
	{
		player.buffs.push({id: id, turns: turns});
	}
	else
	{
		player.buffs[buffPosition].turns += turns;
	}
	player.buffs.sort(function(a,b){return a.turns - b.turns;});
	calculateStats();
	redrawInfoPanel();
	return true;
}

function decreaseBuff (id, turns) //turns = -1 means remove entire buff
{
	let buffPosition = -1;
	for (var i in player.buffs)
	{
		if (player.buffs[i].id == id)
		{
			buffPosition = i;
			break;
		}
	}
	if (buffPosition == -1)
	{
		return false; // don't have the buff anyway
	}
	else
	{
		player.buffs[buffPosition].turns -= turns;
		if (turns == -1)
			player.buffs[buffPosition].turns = 0;
		if (player.buffs[buffPosition].turns <= 0)
			player.buffs.splice(buffPosition, 1);
		return true;
	}
}
