var COMBAT = 0;
var NONCOMBAT = 1;
var PASSIVE = 2;

var skills = [
	{
		id: 0,
		name: "Wrestle with your Thoughts",
		description: "You meditate over the deep energies of wrestling, putting you into a trance.",
		enchantment: "10 turns of:<br />+3 Max MP<br />+5 STR",
		icon: "wrestle_thought.png",
		type: "Non-combat",
		category: NONCOMBAT,
		cost: 1,
		price: 0,
		onUse: function () {
			if (player.questTutorial == 4)
			{
				player.questTutorial = 5;
				$(".buff_tutorial").show();
				$(".house_tutorial_2").hide();
				$(".house_tutorial_3").show();
			}
			hint ("You think deeply about wrestling, gaining 10 turns of Wrestling Your Thoughts!", "g");
			addBuff (0, 10);
		}
	},
	{
		id: 1,
		name: "Pounce",
		description: "Leap at your foe for an extra hard hit.",
		enchantment: "A regular attack that's guaranteed to be critical",
		icon: "pounce.png",
		type: "Combat",
		category: COMBAT,
		cost: 1,
		price: 0,
		onUse: function () {
			regularAttack (player.effStr - monster.def, "", "You leap forward at your opponent with sheer ferocity!");
		}
	},
	{
		id: 2,
		name: "Contemplate Designs",
		description: "You consider the capability of your new powers, and the potential of magical fashion.",
		enchantment: "10 turns of:<br />+2 Max HP<br />+2 Max MP<br />+2 STR<br />+2 DEF",
		icon: "creative.png",
		type: "Non-combat",
		category: NONCOMBAT,
		cost: 1,
		price: 0,
		onUse: function () {
			if (player.questTutorial == 4)
			{
				player.questTutorial = 5;
				$(".buff_tutorial").show();
				$(".house_tutorial_2").hide();
				$(".house_tutorial_3").show();
			}
			hint ("You get creative, gaining 10 turns of Creative Potential!", "g");
			addBuff (1, 10);
		}
	},
	{
		id: 3,
		name: "Cut",
		description: "Cut the enemy as if they were a piece of cloth.",
		enchantment: "A regular attack with +5 STR",
		icon: "scissors.png",
		type: "Combat",
		category: COMBAT,
		cost: 1,
		price: 0,
		onUse: function () {
			regularAttack (player.effStr + 5 - monster.def, "You pull your trusty crafting scissors out of your pocket and cut your opponent.", "You pull your trusty crafting scissors out of your pocket and stab them in the eye! Well, that works too I supposse.");
		}
	},
	{
		id: 4,
		name: "Ancestral Pep Talk",
		description: "Who you gonna call? Ask your dead ancestral relatives for help and advice.",
		enchantment: "10 turns of:<br />+4 MAG<br />+4 SPD",
		icon: "ghost_talk.png",
		type: "Non-combat",
		category: NONCOMBAT,
		cost: 1,
		price: 0,
		onUse: function () {
			if (player.questTutorial == 4)
			{
				player.questTutorial = 5;
				$(".buff_tutorial").show();
				$(".house_tutorial_2").hide();
				$(".house_tutorial_3").show();
			}
			hint ("You talk to your ancestors, gaining 10 turns of Ancestral Motivation!", "g");
			addBuff (2, 10);
		}
	},
	{
		id: 5,
		name: "Channel Mystical Energies",
		description: "Channels your newly-discovered magical powers into your weapon.",
		enchantment: "A regular attack using MAG instead of STR",
		icon: "magic_sword.png",
		type: "Combat",
		category: COMBAT,
		cost: 1,
		price: 0,
		onUse: function () {
			regularAttack (player.effMag - monster.def, "You channel your magic force and hit your opponent.", "You overload your magic force and clobber your opponent!");
		}
	},
	{
		id: 6,
		name: "Cheerlead At Self",
		description: "Nobody is around to cheer you on, so you will cheer yourself.",
		enchantment: "10 turns of:<br />+2 STR<br />+2 DEF<br />+2 MAG<br />+2 SPD",
		icon: "cheerleader.png",
		type: "Non-combat",
		category: NONCOMBAT,
		cost: 1,
		price: 0,
		onUse: function () {
			if (player.questTutorial == 4)
			{
				player.questTutorial = 5;
				$(".buff_tutorial").show();
				$(".house_tutorial_2").hide();
				$(".house_tutorial_3").show();
			}
			hint ("You dance and chant in the mirror, gaining 10 turns of Cheered Up!", "g");
			addBuff (3, 10);
		}
	},
	{
		id: 7,
		name: "Slap",
		description: "It's time to throw down the gauntlet.",
		enchantment: "Deals 15 physical damage, ignoring enemy defense",
		icon: "hand.png",
		type: "Combat",
		category: COMBAT,
		cost: 1,
		price: 0,
		onUse: function () {
			addCombatText ("You slap the monster around the face or face-equivalent, hurting it both physically and socially.");
			addCombatText ("It takes 15 damage!");
			monster.hp -= 15;
		}
	},
];

function displaySkills()
{
	let noncomDiv = $("#skill_noncom");
	noncomDiv.empty();
	let comDiv = $("#skill_com");
	comDiv.empty();
	let passiveDiv = $("#skill_passive");
	passiveDiv.empty();
	let noncomCount = 0;
	let comCount = 0;
	let passiveCount = 0;
	for (let i = 0; i < player.skills.length; i++)
	{
		if (player.skills[i] == 0)
		{
			continue;
		}
		var newElement = $('<div></div>');
		newElement.addClass("item");
		var textImageDiv = $('<span></span>');
		textImageDiv.addClass("item_Image");
		textImageDiv.html("<image src='./images/" + skills[i].icon + "'/><span>" + skills[i].name + "</span>");
		textImageDiv.attr({"onClick" : "openDialog (SKILL, " + i + ");"});
		newElement.append(textImageDiv);
		switch (skills[i].category)
		{
			case NONCOMBAT:
				var castLink = $('<span></span>');
				castLink.html("<input type = 'button' value = 'Cast\n(" + skills[i].cost + " MP)' onClick = 'useNoncombatSkill(" + i + ")'>");
				newElement.append(castLink);
				noncomDiv.append(newElement);
				noncomCount ++;
				break;
			case COMBAT:
				comDiv.append(newElement);
				comCount ++;
				break;
			case PASSIVE:
				passiveDiv.append(newElement);
				passiveCount ++;
		}
		let noncomTitle = $("#skill_noncom_title");
		if (noncomCount == 0)
		{
			noncomTitle.hide();
			noncomDiv.hide();
		}
		else
		{
			noncomTitle.show();
			noncomDiv.show();
		}
		let comTitle = $("#skill_com_title");
		if (comCount == 0)
		{
			comTitle.hide();
			comDiv.hide();
		}
		else
		{
			comTitle.show();
			comDiv.show();
		}
		let passiveTitle = $("#skill_passive_title");
		if (passiveCount == 0)
		{
			passiveTitle.hide();
			passiveDiv.hide();
		}
		else
		{
			passiveTitle.show();
			passiveDiv.show();
		}
	}
}

function displayTrainer()
{
	let trainerDiv = $("#trainerList");
	trainerDiv.empty();
	let x = 0;
	if (player.job == "Wrestler")
	{
		//x = 8;
	}
	else if (player.job == "Pirate")
	{
		//x = 28;
	}
	else if (player.job == "Mystic")
	{
		//x = 48;
	}
	else if (player.job == "Juggler")
	{
		//x = 68;
	}
	for (let i = x; i < 8 + x; i++)
	{
		if (player.skills[i] == 0)
		{
			var newElement = $('<div></div>');
			newElement.addClass("item");
			var textImageDiv = $('<span></span>');
			textImageDiv.addClass("item_Image");
			textImageDiv.html("<image src='./images/" + skills[i].icon + "'/><span>" + skills[i].name + "</span>");
			textImageDiv.attr({"onClick" : "openDialog (SKILL, " + i + ");"});
			newElement.append(textImageDiv);
			var buyLink = $('<span></span>');
			buyLink.html("<input type = 'button' value = 'Train\n(" + skills[i].price + " Gold)' onClick = 'buySkill(" + i + ")'>");
			newElement.append(buyLink);
			trainerDiv.append(newElement);
		}
	}
}

function buySkill (id)
{
	if (player.skills[id] > 0)
	{
		hint ("You already own that skill!", "r");
		return;
	}
	if (player.gold >= skills[id].price)
	{
		player.gold -= skills[id].price;
		player.skills[id] = 1;
		displayTrainer();
		hint ("You learned the skill " + skills[id].name + "!", "g");
		save ();
	}
	else
	{
		hint ("You can't afford that!", "r");
	}
}

function useNoncombatSkill (x)
{
	x = parseInt(x);
	if (x == -1)
	{
		hint ("That's not a valid skill!", "r");
		return false;
	}
	if(skills[x].hasOwnProperty("onUse") == false)
	{
		hint ("That's not a useable skill!", "r");
		return false;
	}
	let cost = skills[x].cost;
	if (cost > player.mp)
	{
		hint ("You haven't got enough MP to cast that skill!", "r");
		return false;
	}
	else
	{
		player.mp -= cost;
	}
	skills[x].onUse();
	save ();
	return true;
}