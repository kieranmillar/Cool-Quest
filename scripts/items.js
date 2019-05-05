function equip (e)
{
	let c = items[e].category;
	if (c >= 6)
	{
		return;
	}
	let x = items[e].equipStat;
	switch (x)
	{
		case "STR":
			if (player.baseStr < items[e].equipValue)
			{
				hint ("You don't have enough STR to equip that!", "r");
				return;
			}
			break;
		case "DEF":
			if (player.baseDef < items[e].equipValue)
			{
				hint ("You don't have enough DEF to equip that!", "r");
				return;
			}
			break;
		case "MAG":
			if (player.baseMag < items[e].equipValue)
			{
				hint ("You don't have enough MAG to equip that!", "r");
				return;
			}
			break;
		case "SPD":
			if (player.baseSpd < items[e].equipValue)
			{
				hint ("You don't have enough SPD to equip that!", "r");
				return;
			}
			break;
		default:
			return;
	}
	let slot = 0;
	switch (c)
	{
		case itemType.HAT:
		case itemType.ARMOUR:
		case itemType.WEAPON:
		case itemType.SHIELD:
		case itemType.SHOES:
			slot = c;
			break;
		case itemType.ACC:
			if (player.equipment[5] == -1)
			{
				slot = 5;
			}
			else if (player.equipment[6] == -1)
			{
				slot = 6;
			}
			else if (player.job != jobEnum.PIRATE)
			{
				slot = 7;
			}
			else if (player.equipment[7] == -1)
			{
				slot = 7;
			}
			else
			{
				slot = 8;
			}
			break;
	}
	if (player.equipment[slot] != -1)
	{
		gainItem(player.equipment[slot], 1);
	}
	player.equipment[slot] = e;
	loseItem(e, 1);
	displayEquipment();
	calculateStats();
	hint ("You equipped a " + items[player.equipment[slot]].name + ".", "g");
	save ();
}

function unequip (slot)
{
	let x = player.equipment[slot];
	if (x == -1)
	{
		return;
	}
	gainItem (x, 1);
	player.equipment[slot] = -1;
	displayEquipment();
	calculateStats();
	hint ("You unequipped a " + items[x].name + ".", "g");
	save ();
}

function useItem (id)
{
	if(items[id].hasOwnProperty("onUse") == false)
	{
		hint("That's not a useable item!", "r");
		return;
	}
	if (items[id].onUse() == true)
	{
		loseItem (id, 1);
		displayInventory ();
		save ();
	}
}

function checkInInventory (id)
{
	let itemPosition = -1;
	for (var i in player.inventory)
	{
		if (player.inventory[i].id == id)
		{
			itemPosition = i;
			break;
		}
	}
	return itemPosition;
}

function gainItem (id, amount)
{
	const itemPosition = checkInInventory (id);
	if (itemPosition == -1)
	{
		player.inventory.push({id: id, amount: amount});
		player.inventory.sort(function(a,b){
			let x = items[a.id].name.toLowerCase();
			let y = items[b.id].name.toLowerCase();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}
	else
		player.inventory[itemPosition].amount += amount;
}

function loseItem (id, amount)
{
	let itemPosition = checkInInventory (id);
	if (itemPosition == -1)
	{
		return false; // don't own the item anyway
	}
	else
	{
		if (player.inventory[itemPosition].amount > amount)
		{
			player.inventory[itemPosition].amount -= amount;
			return true;
		}
		else if (player.inventory[itemPosition].amount == amount)
		{
			player.inventory.splice(itemPosition, 1);
			return true;
		}
		else
			return false; //don't own enough
	}
}

function displayInventory()
{
	let foodDiv = $("#inv_food");
	foodDiv.empty();
	let potionDiv = $("#inv_potion");
	potionDiv.empty();
	let miscDiv = $("#inv_misc");
	miscDiv.empty();
	let foodTitle = $("#inv_food_title");
	let potionTitle = $("#inv_potion_title");
	let miscTitle = $("#inv_misc_title");
	let foodCount = 0;
	let potionCount = 0;
	let miscCount = 0;
	for (var i in player.inventory)
	{
		var newElement = $('<div></div>');
		newElement.addClass("item");
		var textImageDiv = $('<span></span>');
		textImageDiv.addClass("item_Image");
		textImageDiv.html("<img src='./images/" + items[player.inventory[i].id].icon + "'/><span>" + items[player.inventory[i].id].name + " x" + player.inventory[i].amount + "</span>");
		textImageDiv.attr({
			"onClick" : "openDialog (dialogType.ITEM, " + player.inventory[i].id + ");",
		});
		newElement.append(textImageDiv);
		if (items[player.inventory[i].id].hasOwnProperty("onUse") == true)
		{
			var useLink = $('<span></span>');
			useLink.html("<input type='button' value='Use' onClick = 'useItem(" + player.inventory[i].id + ")'>");
			newElement.append(useLink);
		}
		switch (items[player.inventory[i].id].category)
		{
			case itemType.FOOD:
				foodDiv.append(newElement);
				foodCount ++;
				break;
			case itemType.POTION:
				potionDiv.append(newElement);
				potionCount ++;
				break;
			case itemType.MISC:
				miscDiv.append(newElement);
				miscCount ++;
				break;
			default:
		}
	}
	if (foodCount == 0)
	{
		foodTitle.hide();
		foodDiv.hide();
	}
	else
	{
		foodTitle.show();
		foodDiv.show();
	}
	if (potionCount == 0)
	{
		potionTitle.hide();
		potionDiv.hide();
	}
	else
	{
		potionTitle.show();
		potionDiv.show();
	}
	if (miscCount == 0)
	{
		miscTitle.hide();
		miscDiv.hide();
	}
	else
	{
		miscTitle.show();
		miscDiv.show();
	}
	let emptyDiv = $("#inv_empty");
	if (foodCount + potionCount + miscCount == 0)
	{
		emptyDiv.show();
	}
	else
	{
		emptyDiv.hide();
	}
}

function displayEquipment()
{
	for (let i = 0; i < 9; i ++)
	{
		if (player.equipment[i] != -1)
		{
			$(".equip" + i).show()
			$("#worn_" + i).html("<span class='item_Image'><image src='./images/" + items[player.equipment[i]].icon + "'/><span>" + items[player.equipment[i]].name + " <input type='button' value='Unequip' onclick='unequip(" +i + ")'></span>");
			$("#worn_" + i).attr({
				"onClick" : "openDialog (dialogType.ITEM, " + player.equipment[i] + ");"
			});
		}
		else
		{
			$(".equip" + i).hide();
			$("#worn_" + i).attr({
				"onClick" : ""
			});
		}
		if (player.job == jobEnum.PIRATE)
		{
			$("#accessory4").show();
		}
		else
		{
			$("#accessory4").hide();
		}
	}
	let hatDiv = $("#equip_hat");
	hatDiv.empty();
	let armourDiv = $("#equip_armour");
	armourDiv.empty();
	let weaponDiv = $("#equip_weapon");
	weaponDiv.empty();
	let shieldDiv = $("#equip_shield");
	shieldDiv.empty();
	let shoesDiv = $("#equip_shoes");
	shoesDiv.empty();
	let accDiv = $("#equip_acc");
	accDiv.empty();
	let hatTitle = $("#equip_hat_title");
	let armourTitle = $("#equip_armour_title");
	let weaponTitle = $("#equip_weapon_title");
	let shieldTitle = $("#equip_shield_title");
	let shoesTitle = $("#equip_shoes_title");
	let accTitle = $("#equip_acc_title");
	let hatCount = 0;
	let armourCount = 0;
	let weaponCount = 0;
	let shieldCount = 0;
	let shoesCount = 0;
	let accCount = 0;
	for (var i in player.inventory)
	{
		if (items[player.inventory[i].id].category >= 6)
		{
			continue;
		}
		var newElement = $('<div></div>');
		newElement.addClass("item");
		var textImageDiv = $('<span></span>');
		textImageDiv.addClass("item_Image");
		textImageDiv.html("<image src='./images/" + items[player.inventory[i].id].icon + "'/><span>" + items[player.inventory[i].id].name + " x" + player.inventory[i].amount + "</span>");
		textImageDiv.attr({
			"onClick" : "openDialog (dialogType.ITEM, " + player.inventory[i].id + ");"
		});
		newElement.append(textImageDiv);
		var equipLink = $('<span></span>');
		equipLink.html("<input type='button' value='Equip' onClick='equip(" + player.inventory[i].id + ")'>");
		newElement.append(equipLink);
		switch (items[player.inventory[i].id].category)
		{
			case itemType.HAT:
				hatDiv.append(newElement);
				hatCount ++;
				break;
			case itemType.ARMOUR:
				armourDiv.append(newElement);
				armourCount ++;
				break;
			case itemType.WEAPON:
				weaponDiv.append(newElement);
				weaponCount ++;
				break;
			case itemType.SHIELD:
				shieldDiv.append(newElement);
				shieldCount ++;
				break;
			case itemType.SHOES:
				shoesDiv.append(newElement);
				shoesCount ++;
				break;
			case itemType.ACC:
				accDiv.append(newElement);
				accCount ++;
				break;
		}
	}
	if (hatCount == 0)
	{
		hatTitle.hide();
		hatDiv.hide();
	}
	else
	{
		hatTitle.show();
		hatDiv.show();
	}
	if (armourCount == 0)
	{
		armourTitle.hide();
		armourDiv.hide();
	}
	else
	{
		armourTitle.show();
		armourDiv.show();
	}
	if (weaponCount == 0)
	{
		weaponTitle.hide();
		weaponDiv.hide();
	}
	else
	{
		weaponTitle.show();
		weaponDiv.show();
	}
	if (shieldCount == 0)
	{
		shieldTitle.hide();
		shieldDiv.hide();
	}
	else
	{
		shieldTitle.show();
		shieldDiv.show();
	}
	if (shoesCount == 0)
	{
		shoesTitle.hide();
		shoesDiv.hide();
	}
	else
	{
		shoesTitle.show();
		shoesDiv.show();
	}
	if (accCount == 0)
	{
		accTitle.hide();
		accDiv.hide();
	}
	else
	{
		accTitle.show();
		accDiv.show();
	}
	let emptyDiv = $("#equip_empty");
	if (hatCount + armourCount + weaponCount + shieldCount + shoesCount + accCount == 0)
	{
		emptyDiv.show();
	}
	else
	{
		emptyDiv.hide();
	}
}

function buyItem (id, amount)
{
	totalCost = items[id].cost * amount;
	if (player.gold >= totalCost)
	{
		player.gold -= totalCost;
		gainItem (id, amount);
		redrawCharPane ();
		hint ("You purchased a " + items[id].name + "!", "g");
		save ();
	}
	else
	{
		hint ("You can't afford that!", "r");
	}
}