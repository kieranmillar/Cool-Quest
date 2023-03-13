function equip (e)
{
	let c = items[e].category;
	if (c >= 5)
	{
		return;
	}
	let slot = 0;
	switch (c)
	{
		case itemType.HAT:
		case itemType.ARMOUR:
		case itemType.WEAPON:
		case itemType.SHIELD:
			slot = c;
			break;
		case itemType.ACC:
			if (player.equipment[4] == -1)
			{
				slot = 4;
			}
			else if (player.equipment[5] == -1)
			{
				slot = 5;
			}
			else if (player.job != jobEnum.PIRATE)
			{
				slot = 6;
			}
			else if (player.equipment[6] == -1)
			{
				slot = 6;
			}
			else
			{
				slot = 7;
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
		calculateStats();
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

function getItemAmount(id) {
	const itemPosition = checkInInventory(id);
	if (itemPosition == -1) {
		return 0;
	}
	return player.inventory[itemPosition].amount;
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
	for (i = 5; i < 8; i++)
	{
		$("#inv_" + i).empty();
	}
	
	for (var i in player.inventory)
	{
		if (items[player.inventory[i].id].category < 5)
		{
			continue;
		}
		var newElement = $('<div></div>');
		newElement.addClass("item");
		var textImageDiv = $('<span></span>');
		textImageDiv.addClass("item_Image");
		textImageDiv.html("<img src='./images/" + items[player.inventory[i].id].icon + "'><span>" + items[player.inventory[i].id].name + " x" + player.inventory[i].amount + "</span>");
		textImageDiv.attr({
			"onClick" : "openDialog (dialogType.ITEM, " + player.inventory[i].id + ");",
		});
		newElement.append(textImageDiv);
		if (items[player.inventory[i].id].hasOwnProperty("onUse") == true)
		{
			var useLink = $('<span></span>');
			let buttonText = "Use";
			if  (items[player.inventory[i].id].category == itemType.FOOD)
			{
				buttonText = "Eat";
				if (player.options[optionEnum.FOODQUALITY] == 1)
				{
					var quality = Math.round((items[player.inventory[i].id].turns / items[player.inventory[i].id].fullness) * 100) / 100;
					buttonText += "\n(" + items[player.inventory[i].id].fullness + "F " + quality + "Q)";
				}
			}
			useLink.html("<input type='button' value='" + buttonText + "' onClick = 'useItem(" + player.inventory[i].id + ")'>");
			newElement.append(useLink);
		}
		$("#inv_" + items[player.inventory[i].id].category).append(newElement);
	}

	let haveItems = false;
	for (let i = 5; i < 8; i++)
	{
		if ($("#inv_" + i).is(":empty"))
		{
			$("#inv_" + i).hide();
			$("#inv_" + i + "_title").hide();
		}
		else
		{
			$("#inv_" + i).show();
			$("#inv_" + i + "_title").show();
			haveItems = true;
		}
	}

	if (haveItems)
	{
		$("#inv_empty").hide();
	}
	else
	{
		$("#inv_empty").show();
	}
}

function displayEquipment()
{
	for (let i = 0; i < 8; i ++)
	{
		if (player.equipment[i] != -1)
		{
			$(".equip" + i).show()
			$("#worn_" + i).html("<span class='item_Image'><image src='./images/" + items[player.equipment[i]].icon + "'><span>" + items[player.equipment[i]].name + " <input type='button' value='Unequip' onclick='unequip(" +i + ")'></span>");
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

	for (let i = 0; i < 5; i++)
	{
		$("#equip_" + i).empty();
	}

	for (var i in player.inventory)
	{
		if (items[player.inventory[i].id].category >= 5)
		{
			continue;
		}
		var newElement = $('<div></div>');
		newElement.addClass("item");
		var textImageDiv = $('<span></span>');
		textImageDiv.addClass("item_Image");
		textImageDiv.html("<image src='./images/" + items[player.inventory[i].id].icon + "'><span>" + items[player.inventory[i].id].name + " x" + player.inventory[i].amount + "</span>");
		textImageDiv.attr({
			"onClick" : "openDialog (dialogType.ITEM, " + player.inventory[i].id + ");"
		});
		newElement.append(textImageDiv);
		var equipLink = $('<span></span>');
		equipLink.html("<input type='button' value='Equip' onClick='equip(" + player.inventory[i].id + ")'>");
		newElement.append(equipLink);
		$("#equip_" + items[player.inventory[i].id].category).append(newElement);
	}

	let haveItems = false;
	for (let i = 0; i < 5; i++)
	{
		if ($("#equip_" + i).is(":empty"))
		{
			$("#equip_" + i).hide();
			$("#equip_" + i + "_title").hide();
		}
		else
		{
			$("#equip_" + i).show();
			$("#equip_" + i + "_title").show();
			haveItems = true;
		}
	}

	if (haveItems)
	{
		$("#equip_empty").hide();
	}
	else
	{
		$("#equip_empty").show();
	}
}

function displayPawnShop()
{
	for (i = 0; i < 8; i++)
	{
		$("#pawn_" + i).empty();
	}
	
	for (var i in player.inventory)
	{
		if (items[player.inventory[i].id].sell == 0)
		{
			continue;
		}
		var newElement = $('<div></div>');
		newElement.addClass("item");
		var textImageDiv = $('<span></span>');
		textImageDiv.addClass("item_Image");
		textImageDiv.html("<img src='./images/" + items[player.inventory[i].id].icon + "'><span>" + items[player.inventory[i].id].name + " x" + player.inventory[i].amount + "</span>");
		textImageDiv.attr({
			"onClick" : "openDialog (dialogType.ITEM, " + player.inventory[i].id + ");",
		});
		newElement.append(textImageDiv);
		var sellLink = $('<span></span>');
		sellLink.html("<input type='button' value='Sell\n(" + items[player.inventory[i].id].sell + " Gold)' onClick = 'sellItem(" + player.inventory[i].id + ")'>");
		newElement.append(sellLink);
		$("#pawn_" + items[player.inventory[i].id].category).append(newElement);
	}

	let haveItems = false;
	for (let i = 0; i < 8; i++)
	{
		if ($("#pawn_" + i).is(":empty"))
		{
			$("#pawn_" + i).hide();
			$("#pawn_" + i + "_title").hide();
		}
		else
		{
			$("#pawn_" + i).show();
			$("#pawn_" + i + "_title").show();
			haveItems = true;
		}
	}

	if (haveItems)
	{
		$("#pawn_empty").hide();
	}
	else
	{
		$("#pawn_empty").show();
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

function sellItem (id)
{
	if (items[id].sell == 0)
	{
		hint ("You can't sell that item!", "r");
		return;
	}
	if (!loseItem(id, 1))
	{
		hint ("You don't have that item to sell!", "r");
		return;
	}
	else
	{
		hint ("You sold a " + items[id].name + ". " + giveGold (items[id].sell, false), "g");
		save ();
		redrawCharPane();
		displayPawnShop();
	}
}
