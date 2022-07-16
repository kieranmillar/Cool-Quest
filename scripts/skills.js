function displaySkills()
{
	let toggleDiv = $("#skill_toggle");
	toggleDiv.empty();
	let noncomDiv = $("#skill_noncom");
	noncomDiv.empty();
	let comDiv = $("#skill_com");
	comDiv.empty();
	let juggleDiv = $("#skill_juggle");
	juggleDiv.empty();
	let passiveDiv = $("#skill_passive");
	passiveDiv.empty();
	let toggleCount = 0;
	let noncomCount = 0;
	let comCount = 0;
	let passiveCount = 0;
	let juggleCount = 0;
	for (var i in skills)
	{
		if (!player.skills[i])
		{
			continue;
		}
		var newElement = $('<div></div>');
		newElement.addClass("item");
		var textImageDiv = $('<span></span>');
		textImageDiv.addClass("item_Image");
		textImageDiv.html("<image src='./images/" + skills[i].icon + "'><span>" + skills[i].name + "</span>");
		textImageDiv.attr({"onClick" : "openDialog (dialogType.SKILL, " + i + ");"});
		newElement.append(textImageDiv);
		switch (skills[i].category)
		{
			case skillType.NONCOMBAT:
				var castLink = $('<span></span>');
				castLink.html("<input type = 'button' value = 'Cast\n(" + skills[i].cost + " MP)' onClick = 'useNoncombatSkill(" + i + ")'>");
				newElement.append(castLink);
				noncomDiv.append(newElement);
				noncomCount ++;
				break;
			case skillType.COMBAT:
				comDiv.append(newElement);
				comCount ++;
				break;
			case skillType.PASSIVE:
				passiveDiv.append(newElement);
				passiveCount ++;
				break;
			case skillType.JUGGLE:
				var castLink = $('<span></span>');
				castLink.html("<input type = 'button' value = 'Summon\n(" + skills[i].cost + " MP)' onClick = 'useNoncombatSkill(" + i + ")'>");
				newElement.append(castLink);
				juggleDiv.append(newElement);
				juggleCount ++;
				break;
			case skillType.TOGGLEABLE:
				var castLink = $('<span></span>');
				let text = "off";
				if (player.toggleSkills[skills[i].toggleId] == 1) {
					text = "on";
				}
				castLink.html("<input type = 'button' value = 'Toggle\n(Currently " +  text + ")' onClick = 'toggleSkill(" + i + ")'>");
				newElement.append(castLink);
				toggleDiv.append(newElement);
				toggleCount ++;
			
		}
		let toggleTitle = $("#skill_toggle_title");
		if (toggleCount == 0)
		{
			toggleTitle.hide();
			toggleDiv.hide();
		}
		else
		{
			toggleTitle.show();
			toggleDiv.show();
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
		let juggleTitle = $("#skill_juggle_title");
		if (juggleCount == 0)
		{
			juggleTitle.hide();
			juggleDiv.hide();
		}
		else
		{
			juggleTitle.show();
			juggleDiv.show();
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
	let lastLevel = 0;
	for (var i in skills)
	{
		if (!player.skills[i])
		{
			if (skills[i].job == player.job)
			{
				if (skills[i].level != lastLevel)
				{
					lastLevel = skills[i].level;
					var newElement = $('<h2></h2>');
					newElement.text("Level " + lastLevel);
					trainerDiv.append(newElement);
				}
				var newElement = $('<div></div>');
				newElement.addClass("item");
				var textImageDiv = $('<span></span>');
				textImageDiv.addClass("item_Image");
				textImageDiv.html("<image src='./images/" + skills[i].icon + "'><span>" + skills[i].name + "</span>");
				textImageDiv.attr({"onClick" : "openDialog (dialogType.SKILL, " + i + ");"});
				newElement.append(textImageDiv);
				var buyLink = $('<span></span>');
				buyLink.html("<input type = 'button' value = 'Train\n(" + skills[i].price + " Gold)' onClick = 'buySkill(" + i + ")'>");
				newElement.append(buyLink);
				trainerDiv.append(newElement);
			}
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
	if (player.job != skills[id].job)
	{
		hint ("You haare the wrong job to learn that!", "r");
		return;
	}
	if (player.level < skills[id].level)
	{
		hint ("You aren't a high enough level to learn that!", "r");
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
	redrawCharPane();
}

function toggleSkill (x) {
	x = parseInt(x);
	if (x == -1)
	{
		hint ("That's not a valid skill!", "r");
		return false;
	}
	if (player.toggleSkills[skills[x].toggleId] == 1) {
		player.toggleSkills[skills[x].toggleId] = 0;
	}
	else {
		player.toggleSkills[skills[x].toggleId] = 1;
	}
	displaySkills();
	save();
	return true;
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
	if (skills[x].onUse())
	{
		player.mp -= cost;
	}
	redrawCharPane();
	save ();
	return true;
}