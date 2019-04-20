var effects = [
	{
		id: 0,
		name: "Wrestling With Your Thoughts",
		description: "You are at peace with wrestling.",
		enchantment: "+3 Max MP<br />+5 STR",
		icon: "wrestle_thought.png",
		effect: function()
		{
			player.effMpMax += 3;
			player.effStr += 5;
		}
	},
	{
		id: 1,
		name: "Pirate Might",
		description: "Might makes right.",
		enchantment: "+2 Max HP<br />+2 Max MP<br />+2 STR<br />+2 DEF",
		icon: "cookie.png",
		effect: function()
		{
			player.effHpMax += 2;
			player.effMpMax += 2;
			player.effStr += 2;
			player.effDef += 2;
		}
	},
	{
		id: 2,
		name: "Ancestral Motivation",
		description: "You've received reassurances from your ancestors and are feeling motivated.",
		enchantment: "+1 DEF<br />+3 MAG<br />+4 SPD",
		icon: "ghost_talk.png",
		effect: function()
		{
			player.effDef += 1;
			player.effMag += 3;
			player.effSpd += 4;
		}
	},
	{
		id: 3,
		name: "Well Balanced",
		description: "Juggling should be enjoyed as part of a well balanced lifestyle.",
		enchantment: "+2 STR<br />+2 DEF<br />+2 MAG<br />+2 SPD",
		icon: "cookie.png",
		effect: function()
		{
			player.effStr += 2;
			player.effDef += 2;
			player.effMag += 2;
			player.effSpd += 2;
		}
	}
];

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
	redrawInfoPane();
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