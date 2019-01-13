var currentRound = 0;

var monster = {
	id: 0,
	name: "",
	description: "",
	hp: 0,
	str: 0,
	def: 0,
	spd: 0,
	exp: 0,
	gold: 0,
	drops: [],
	hitMessages: [""] //first message is for criticals
};

var combats = [
	{
		id: 0,
		name: "a piece of paper",
		description: "This isn't any old piece of paper, this horrifying bureaucratic nightmare is filled with checkboxes and places to detail sources of income. You'd better tear it up, before it causes you to fall asleep.",
		icon: "empty.png",
		hp: 6,
		str: 5,
		def: 1,
		spd: -20,
		exp: 8,
		gold: 5,
		drops: [
			{id: 6, chance: 40},
		],
		hitMessages: [
			"It audits your arse, asking probing questions about your internal affairs.",
			"It blows in the wind towards you and slashes you in the face. Agh! Papercut!",
			"You grab it and try to fold it in half as many times as possible, but get so frustrated at trying to fold it a 7th time that you headbutt the wall in anger.",
			"It folds itself into an oragami sword and slashes you!"
		]
	},
	{
		id: 1,
		name: "a soggy cardboard box",
		description: "You turn the corner and a soggy cardboard box is sitting there, looking as sorry for itself as a carboard box can. You know how to fight your way out of one, but can you fight your way into one?",
		icon: "empty.png",
		hp: 10,
		str: 3,
		def: 0,
		spd: -50,
		exp: 9,
		gold: 7,
		drops: [
			{id: 7, chance: 40}
		],
		hitMessages: [
			"A nearby box flings open, and out springs an angry bobcat, which snarls and slashes you repeatedly in the face!",
			"You get closer, and are really grossed out by the wet sliminess of soggy cardboard. You retch.",
			"You heavily stare at the cardboard, waiting for it to make a move. It just sits there, and you find the whole thing so boring you fall asleep, hitting your head on the concrete floor.",
			"You slip in the wet puddle the box is sitting in, and twist your ankle."
		]
	},
	{
		id: 2,
		name: "restless magical energy",
		description: "The frequent concentration of magic users gathering in one place often causes magical energies to coalesce into an uncontrollable ball. It randomly fires off sparks and is generally a bit of a nuisance. This is one of those balls.",
		icon: "restless_energy.png",
		hp: 12,
		str: 6,
		def: 0,
		spd: -10,
		exp: 9,
		gold: 7,
		drops: [],
		hitMessages: [
			"The energy ball suddenly releases a large burst of energy, hitting you in the chest and sending you flying!",
			"A spark flies out and singes your eyebrows.",
			"You dive out of the way of a large energy burst, but it still glances your arm.",
			"A wave of energy flies off, knocking a nearby shelf. A book falls onto your head."
		]
	},
	{
		id: 3,
		name: "a spider wizard",
		description: "This spider has been infected with magical energies and has learned how to use them. However it's too small to do too much damage.",
		icon: "spider_wizard.png",
		hp: 8,
		str: 7,
		def: 1,
		spd: -20,
		exp: 11,
		gold: 6,
		drops: [
			{id: 8, chance: 30}
		],
		hitMessages: [
			"You accidentally walk into its web. The web crackles with magical energy!",
			"It fires tiny magic missiles at your chest. It stings a little.",
			"It casts a spell on itself, temporarily growing to twice the size! It then punches you in the face.",
			"It slaps you in the face. This isn't so bad, but it happens 8 times in a row."
		]
	},
	{
		id: 4,
		name: "an enchanted dust ball",
		description: "This big ball of dust has rolled around in a small breeze gathering magical flakes of dust. Now it has a life of its own!",
		icon: "dust_ball.png",
		hp: 5,
		str: 5,
		def: 3,
		spd: 0,
		exp: 8,
		gold: 5,
		drops: [],
		hitMessages: [
			"The dust ball flies into your mouth, choking you.",
			"The dust ball commands its pet, the dust bunny, to attack you. The bunny sinks its teeth into your wrist.",
			"The dust ball gracefully blows in the wind towards you, then slashes you with a sharp splinter contained within it.",
			"You get tangled up inside the dust ball! In the struggle to break free you hit your head on the wall."
		]
	}
];

function addCombatText (txt)
{
	let e = $("<p></p>");
	e.text(txt);
	$("#combatText").append(e);
}

function beginCombat (obj)
{
	if (player.hp == 0 || busy == true)
		return;
	goToLocation ("combat");
	busy = true;
	monster.id = obj.id;
	monster.name = obj.name;
	monster.description = obj.description;
	$("#monsterImg").attr("src", "./images/big/" + obj.icon);
	monster.hp = obj.hp + player.effMl;
	if (monster.hp < 1)
		monster.hp = 1;
	monster.str = obj.str + player.effMl;
	if (monster.str < 1)
		monster.str = 1;
	monster.def = obj.def + player.effMl;
	if (monster.def < 0)
		monster.def = 0;
	monster.spd = obj.spd;
	monster.exp = obj.exp;
	monster.gold = obj.gold;
	monster.drops = obj.drops;
	monster.hitMessages = obj.hitMessages;
	$("#combatText").empty();
	addCombatText (monster.description);
	currentRound = 0;
	$("#concentrationParagraph").show();
	$("#combatButtons").show();
	$("#adventureAgainButton").hide();
	//calculate who goes first
	if (Math.random() * 100 > player.effSpd - monster.spd + 50)
	{
		//monster went first
		addCombatText ("The monster's speed gives it the edge!");
		combatRound (-1);
	}
	else
		currentRound ++;
		redrawCombat ();
}

function redrawCombat ()
{
	redrawCharPane ();
	$("#combatRound").text(currentRound);
	$("#monsterName").text(monster.name);
	$("#monsterHP").text(monster.hp);
	$("#monsterStr").text(monster.str);
	$("#monsterDef").text(monster.def);
	if (busy == false)
	{
		$("#combatButtons").hide();
	}
	else
	{
		constructCombatSkillDropdown();
		constructCombatItemDropdown();
	}
}

function constructCombatSkillDropdown ()
{
	let e = $("#skillDropdown");
	e.empty();
	let newElement = $('<option></option>');
	newElement.val(-1);
	newElement.text("- Choose a skill -");
	e.append(newElement);
	for (let i = 0; i < skills.length; i++)
	{
		if (skills[i].category == COMBAT && player.skills[i] > 0)
		{
			let newElement = $('<option></option>');
			newElement.val(skills[i].id);
			newElement.text(skills[i].name + " (" + skills[i].cost + ")");
			e.append(newElement);
		}
	}
}

function constructCombatItemDropdown ()
{
	let e = $("#itemDropdown");
	e.empty();
	let newElement = $('<option></option>');
	newElement.val(-1);
	newElement.text("- Choose an item -");
	e.append(newElement);
	let itemCount = 0;
	for (let i = 0; i < player.inventory.length; i++)
	{
		if (items[player.inventory[i].id].hasOwnProperty("onCombat") == true)
		{
			let newElement = $('<option></option>');
			newElement.val(player.inventory[i].id);
			newElement.text(items[player.inventory[i].id].name + " (" + player.inventory[i].amount + ")");
			e.append(newElement);
			itemCount ++;
		}
	}
	if (itemCount == 0)
	{
		$("combatItemRow").hide();
	}
	else
	{
		$("combatItemRow").show();
	}
}

function combatRound (action)
{
	resetHint();
	if (player.hp == 0 || monster.hp == 0 || busy == false)
		return;
	if (action != -1)
	{
		$("#combatText").empty();
	}
	let damage = 0;
	let block = false;
	switch (action)
	{
		case -1:
			//monster went first
			break;
		case 0:
			//basic attack
			regularAttack (player.effStr - monster.def, "You hit the monster.", "You wind up and overhead smash the monster!");
			break;
		case 1:
			//block
			block = true;
			addCombatText ("You brace yourself.");
			break;
		case 2:
			//use skill
			var e = $("#skillDropdown");
			var value = e.val();
			if (useCombatSkill (value) == false)
			{
				return;
			}
			break;
		case 3:
			//use item
			var e = $("#itemDropdown");
			var value = e.val();
			if (useCombatItem (value) == false)
			{
				return;
			}
			break;
		default:
			return;
	}
	if (monster.hp <= 0)
	{
		monster.hp = 0;
		addCombatText ("You win the fight!");
		addCombatText (giveExp (monster.exp));
		addCombatText (giveGold (monster.gold, true));
		for (let i = 0; i < monster.drops.length; i++)
		{
			if (Math.random() * 100 < monster.drops[i].chance)
			{
				gainItem (monster.drops[i].id, 1);
				let e = $("<p></p>");
				e.addClass("item_Image");
				e.html("You found a <img src='./images/" + items[monster.drops[i].id].icon + "'> " + items[monster.drops[i].id].name + "!");
				e.css("cursor", "pointer");
				e.attr({
					"onClick" : "openDialog (ITEM, " + monster.drops[i].id + ");"
				});
				$("#combatText").append(e);
			}
		}
		endAdventure();
	}
	else
	{
		damage = monster.str - player.effDef;
		if (damage <= 0)
			damage = 1;
		if (block == true)
			damage = Math.ceil (damage / 2);
		if (Math.random() * 100 < ((monster.spd - player.effSpd) / 5) + 10)
		{
			damage = Math.ceil (damage*1.2);
			addCombatText ("CRITICAL! " + monster.hitMessages[0]);
		}
		else
		{
			let r = Math.floor(Math.random() * (monster.hitMessages.length - 1)) + 1;
			addCombatText (monster.hitMessages[r]);
		}
		addCombatText ("You take " + damage + " damage!");
		player.hp -= damage;
		if (player.hp <= 0)
		{
			player.hp = 0;
			addCombatText ("You got knocked out! Heal up and try again!");
			endAdventure();
		}
	}
	currentRound ++;
	redrawCombat ();
}

function useCombatSkill (x)
{
	x = parseInt(x);
	if (x == -1)
	{
		hint ("You've got to actually choose a skill to cast!", "r");
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
	return true;
}

function useCombatItem (x)
{
	x = parseInt(x);
	if (x == -1)
	{
		hint ("You've got to actually choose an item to use!", "r");
		return false;
	}
	if(items[x].hasOwnProperty("onCombat") == false)
	{
		hint ("That item can't be used in combat!", "r");
		return false;
	}
	let itemPosition = checkInInventory (x);
	if (itemPosition == -1)
	{
		hint ("You don't own any of that item!", "r");
		return false;
	}
	items[x].onCombat();
	loseItem(x, 1);
	return true;
}

function pressedViewSkillbutton ()
{
	var e = $("#skillDropdown");
	var value = parseInt(e.val());
	if (value == -1)
	{
		hint ("You've got to actually choose a skill to view!", "r");
		return false;
	}
	openDialog (SKILL, value);
}

function pressedViewItembutton ()
{
	var e = $("#itemDropdown");
	var value = parseInt(e.val());
	if (value == -1)
	{
		hint ("You've got to actually choose an item to view!", "r");
		return false;
	}
	openDialog (ITEM, value);
}

function regularAttack (value, hitMessage, critMessage)
{
	// hitMessage == "" means guaranteed critical
	if (value <= 0)
	{
		value = 1;
	}
	if (hitMessage == "" || Math.random() * 100 < ((player.effSpd - monster.spd) / 4) + 10)
	{
		value = Math.ceil (value*1.2);
		addCombatText ("CRITICAL! " + critMessage);
		addCombatText ("It takes " + value + " damage!");
	}
	else
	{
		addCombatText (hitMessage);
		addCombatText ("It takes " + value + " damage!");
	}
	monster.hp -= value;
}