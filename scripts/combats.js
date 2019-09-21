var monster = {
	id: 0,
	name: "",
	description: "",
	hp: 0,
	str: 0,
	def: 0,
	spd: 0,
	element: elementEnum.PHYS,
	exp: 0,
	gold: 0,
	drops: [],
	hitMessages: [""], //first message is for criticals
	castExposeSecrets: 0,
	exposeSecretsRounds: 0,
};

var currentRound = 0;

function addCombatText (txt)
{
	let e = $("<p></p>");
	e.html(txt);
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
	monster.spd = obj.spd + player.effMl;
	if (obj.hasOwnProperty("element") == true)
	{
		monster.element = obj.element;
		if (obj.element == elementEnum.FIRE)
		{
			$("#monsterAttackImage").attr("src", "./images/fire.png");
		}
		if (obj.element == elementEnum.ICE)
		{
			$("#monsterAttackImage").attr("src", "./images/ice.png");
		}
	}
	else
	{
		monster.element = elementEnum.PHYS;
		$("#monsterAttackImage").attr("src", "./images/sword.png");
	}
	monster.exp = obj.exp + player.effMl;
	monster.gold = obj.gold;
	monster.drops = obj.drops;
	monster.hitMessages = obj.hitMessages;
	monster.castExposeSecrets = 0;
	monster.exposeSecretsRounds = 0;
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
		if (skills[i].category == skillType.COMBAT && player.skills[i] > 0)
		{
			if (i == 43 && monster.castExposeSecrets == 1)
			{
				continue;
			}
			let newElement = $('<option></option>');
			newElement.val(skills[i].id);
			let cost = skills[i].cost;
			if (player.job == jobEnum.MEDIUM) {
				cost = Math.max(cost - 1, 0);
			}
			newElement.text(skills[i].name + " (" + cost + ")");
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
	function checkEndOfCombat()
	{
		if (player.hp <= 0 && monster.hp <= 0)
		{
			player.hp = 0;
			monster.hp = 0;
			addCombatText ("<strong>It's a tie! You and the enemy both got knocked out at the same time!</strong>");
			addCombatText ("<strong>Quite frankly it's embarassing. You should both feel ashamed of yourselves.</strong>");
			addCombatText ("<strong>No rewards for you. We're not going to give you anything for being joint loser. We're going to hold you to a higher standard than that.</strong>");
			endAdventure();
			return true;
		}
		else if (player.hp <= 0)
		{
			player.hp = 0;
			addCombatText ("<strong>You got knocked out! Heal up and try again!</strong>");
			endAdventure();
			return true;
		}
		else if (monster.hp <= 0)
		{
			monster.hp = 0;
			addCombatText ("<strong>You win the fight!</strong>");
			addCombatText (giveExp (monster.exp));
			addCombatText (giveGold (monster.gold, true));
			for (let i = 0; i < monster.drops.length; i++)
			{
				if (Math.random() * 100 < monster.drops[i].chance  * ((100 + player.effItemBoost) / 100))
				{
					gainItem (monster.drops[i].id, 1);
					let e = $("<p></p>");
					e.addClass("item_Image");
					e.html("You found a <img src='./images/" + items[monster.drops[i].id].icon + "'> " + items[monster.drops[i].id].name + "!");
					e.css("cursor", "pointer");
					e.attr({
						"onClick" : "openDialog (dialogType.ITEM, " + monster.drops[i].id + ");"
					});
					$("#combatText").append(e);
				}
			}
			let triggerEnd = true;
			if (combats[monster.id].hasOwnProperty("afterCombat") == true)
			{
				triggerEnd = combats[monster.id].afterCombat();
			}
			if (triggerEnd)
			{
				endAdventure();
			}
			return true;
		}
		else
		{
			return false;
		}
	}

	resetHint();
	if (player.hp == 0 || monster.hp == 0 || busy == false)
	{
		return;
	}
	if (action != -1)
	{
		$("#combatText").empty();
	}
	let damage = 0;
	let usingSkill = -1;
	let usingItem = -1;
	switch (action)
	{
		case -1:
			//monster went first
			break;
		case 0:
			//basic attack
			regularAttack (player.effStr, "You hit the monster.", "You wind up and overhead smash the monster!");
			break;
		case 1:
			//use skill
			var e = $("#skillDropdown");
			var value = parseInt(e.val());
			if (useCombatSkill (value))
			{
				usingSkill = value;
			}
			else
			{
				return;
			}
			break;
		case 2:
			//use item
			var e = $("#itemDropdown");
			var value = parseInt(e.val());
			if (useCombatItem (value))
			{
				usingItem = value;
			}
			else
			{
				return;
			}
			break;
		default:
			return;
	}
	if (!checkEndOfCombat())
	{
		if (monster.exposeSecretsRounds > 0)
		{
			monster.exposeSecretsRounds --;
			if (monster.exposeSecretsRounds > 0)
			{
				addCombatText("Your opponent stands there panicing, with a terrified expression on their face.");
			}
			else
			{
				addCombatText("Your opponent shakes its head and blinks. Looks like its gotten over the initial shock.");
			}
		}
		else
		{
			let isCrit = false;
			let overrideStandardAttack = false;
			let overrideCrit = false;
			switch (monster.element)
			{
				case elementEnum.PHYS:
					damage = monster.str - player.effDef;
					break;
				case elementEnum.FIRE:
					damage = monster.str - player.fireRes;
					break;
				case elementEnum.ICE:
					damage = monster.str - player.iceRes;
					break;
			}
			if (Math.random() * 100 < ((monster.spd - player.effSpd) / 5) + 10)
			{
				isCrit = true;
			}
			if (usingSkill != -1) {
				switch (usingSkill)
				{
					default:
						break;
				}
			}
			if (usingItem != -1) {
				switch (usingItem)
				{
					case 7:
						damage = Math.floor (damage * 0.2);
						break;
				}
			}
			if (isCrit == true && overrideCrit == false)
			{
				damage = Math.ceil (damage * 1.2);
			}
			if (overrideStandardAttack == false)
			{
				if (isCrit)
				{
					addCombatText ("<strong>CRITICAL!</strong> " + monster.hitMessages[0]);
				}
				else
				{
					let r = Math.floor(Math.random() * (monster.hitMessages.length - 1)) + 1;
					addCombatText (monster.hitMessages[r]);
				}
			}
			if (usingItem == 7)
			{
				addCombatText ("The cardboard panel shatters into pieces, but at least it dampened the blow.");
			}
			if (damage <= 0)
			{
				damage = 1;
			}
			switch (monster.element)
			{
				case elementEnum.PHYS:
					addCombatText ("You take " + damage + " damage!");
					break;
				case elementEnum.FIRE:
					addCombatText ("You take <span class='fire'>" + damage + "</span> damage!");
					break;
				case elementEnum.ICE:
					addCombatText ("You take <span class='ice'>" + damage + "</span> damage!");
					break;
			}
			player.hp -= damage;
			if (player.stormySeas == 1)
			{
				damage = calcIceDamage(5);
				addCombatText ("The cold winds from the sea hit your opponent for <span class='ice'>" + damage + "</span> damage!");
				monster.hp -= damage;
			}
			checkEndOfCombat();
		}
	}
	currentRound ++;
	redrawCombat ();
}

function useCombatSkill (x)
{
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
	if (player.job == jobEnum.MEDIUM) {
		cost = Math.max(cost - 1, 0);
	}
	if (cost > player.mp)
	{
		hint ("You haven't got enough MP to cast that skill!", "r");
		return false;
	}
	else
	{
		player.mp -= cost;
		if (skills[x].onUse())
		{
			return true;
		}
		else
		{
			player.mp += cost; //refund player MP due to failed skill cast
			return false;
		}
	}
}

function useCombatItem (x)
{
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
	openDialog (dialogType.SKILL, value);
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
	openDialog (dialogType.ITEM, value);
}

function regularAttack (value, hitMessage, critMessage)
{
	// hitMessage == "" means guaranteed critical
	let crit = false;
	if (hitMessage == "" || Math.random() * 100 < ((player.effSpd - monster.spd) / 4) + 10)
	{
		crit = true;
	}
	value -= monster.def;
	let showboating = false;
	if (crit && player.toggleSkills[0] == 1) { //Showboating wrestler skill
		if (player.mp > 0) {
			player.mp -= 1;
			value += 5;
			showboating = true;
		}
	}
	console.log("Crit: " + crit);
	console.log("Showboating: " + showboating);
	value = Math.max(value, 1);
	let fireDamage = calcFireDamage(player.fireDamage);
	let iceDamage = calcIceDamage(player.iceDamage);
	if (crit)
	{
		let critMultiplier = 1.2;
		if (player.skills[7]) //Pro Wrestling Magic wrestler skill
		{
			let effMag = player.effMag;
			if (showboating) {
				effMag += 5;
			}
			critMultiplier += Math.floor(effMag / 2)/100;
		}
		value = Math.ceil (value * critMultiplier);
		addCombatText ("<strong>CRITICAL!</strong> " + critMessage);
		if (showboating) {
			addCombatText ("You pull some fancy moves to make your critical attack do additional damage!");
		}
	}
	else
	{
		addCombatText (hitMessage);
	}
	let t = "It takes " + value;
	if (fireDamage > 0)
	{
		t += " <span class='fire'>(+" + fireDamage + ")</span>"
	}
	if (iceDamage > 0)
	{
		t += " <span class='ice'>(+" + iceDamage + ")</span>"
	}
	addCombatText (t + " damage!");
	monster.hp -= (value + fireDamage + iceDamage);
}

function calcFireDamage (fireDamage) {
	if (fireDamage == 0)
	{
		return 0;
	}
	if (monster.element == elementEnum.FIRE)
	{
		fireDamage = 1;
	}
	if (monster.element == elementEnum.ICE)
	{
		fireDamage *= 2;
	}
	return fireDamage;
}

function calcIceDamage (iceDamage) {
	if (iceDamage == 0)
	{
		return 0;
	}
	if (monster.element == elementEnum.FIRE)
	{
		iceDamage *= 2;
	}
	if (monster.element == elementEnum.ICE)
	{
		iceDamage = 1;
	}
	return iceDamage;
}