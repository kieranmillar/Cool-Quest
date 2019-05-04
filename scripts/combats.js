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
	monster.spd = obj.spd;
	if (obj.hasOwnProperty("element") == true)
	{
		monster.element = obj.element;
	}
	else
	{
		monster.element = elementEnum.PHYS;
	}
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
		if (skills[i].category == skillType.COMBAT && player.skills[i] > 0)
		{
			let newElement = $('<option></option>');
			newElement.val(skills[i].id);
			let cost = skills[i].cost;
			if (player.job == jobEnum.MYSTIC) {
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
			regularAttack (player.effStr - monster.def, "You hit the monster.", "You wind up and overhead smash the monster!");
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
				damage = monster.str - player.effDef - player.fireRes;
				break;
			case elementEnum.ICE:
				damage = monster.str - player.effDef - player.iceRes;
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
	if (player.job == jobEnum.MYSTIC) {
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
	}
	skills[x].onUse();
	return true;
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
	if (value <= 0)
	{
		value = 1;
	}
	let fireDamage = calcFireDamage(player.fireDamage);
	let iceDamage = calcIceDamage(player.iceDamage);
	if (hitMessage == "" || Math.random() * 100 < ((player.effSpd - monster.spd) / 4) + 10)
	{
		let critMultiplier = 1.2;
		if (player.skills[3])
		{
			critMultiplier += Math.floor(player.effMag / 2)/100;
		}
		value = Math.ceil (value * critMultiplier);
		addCombatText ("<strong>CRITICAL!</strong> " + critMessage);
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