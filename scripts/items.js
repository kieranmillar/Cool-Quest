const itemType = {
	HAT: 0,
	ARMOUR: 1,
	WEAPON: 2,
	SHIELD: 3,
	SHOES: 4,
	ACC: 5,
	FOOD: 6,
	POTION: 7,
	MISC: 8
}

var items = [
	{
		id: 0,
		name: "confirmation letter",
		description: "A letter containing confirmation details of your house rental in Drella.",
		enchantment: "Will show you the way to your house",
		icon: "envelope.png",
		type: "Useable",
		category: itemType.MISC,
		sell: 0,
		onUse: function () {
			hint ("You commit your house's address to memory, then throw away the letter.", "g");
			$("#inventory_tutorial_1").hide();
			$("#inventory_tutorial_2").show();
			$("#link_house").show();
			player.questTutorial = 1;
			return true;
		}
	},
	{
		id: 1,
		name: "mystical postcard",
		description: "An enchanted postcard. It says 'VISIT DRELLA', and then in small letters it says 'Please, our tourism industry is dying!'",
		enchantment: "+1 Max HP<br />+1 STR<br />+1 MAG",
		icon: "mystical_postcard.png",
		type: "Accessory",
		category: itemType.ACC,
		equipStat: "MAG",
		equipValue: 1,
		sell: 0,
		onWear: function () {
			if (player.questTutorial == 2)
			{
				player.questTutorial = 3;
				$(".equip_tutorial").show();
				$(".house_tutorial_1").hide();
				$(".house_tutorial_2").show();
			}
			player.effHpMax += 1;
			player.effStr += 1;
			player.effMag += 1;
		}
	},
	{
		id: 2,
		name: "cookie",
		description: "You clicked the cookie. Gameplay at its finest!",
		enchantment: "+1 Fullness<br />+1 Turn to midnight<br />Restores 5 MP",
		icon: "cookie.png",
		type: "Food",
		category: itemType.FOOD,
		cost: 5,
		sell: 1,
		onUse: function () {
			let success = eat (1, 1);
			if (success == true)
			{
				hint (eatMessage (2, 1, 1) + " " + giveMp(5), "g");
			}
			return success;
		}
	},
	{
		id: 3,
		name: "stick",
		description: "What's brown and sticky? This.",
		enchantment: "+1 STR<br />+1 MAG",
		icon: "stick.png",
		type: "Weapon",
		category: itemType.WEAPON,
		equipStat: "STR",
		equipValue: 1,
		cost: 20,
		sell: 10,
		onWear: function () {
			player.effStr += 1;
			player.effMag += 1;
		}
	},
	{
		id: 4,
		name: "health potion",
		description: "This red potion is labelled as being filled with healing medicine. In reality it's just blood to replace all the blood you lost.",
		enchantment: "Restores 20-25 HP<br />Can be used in combat",
		icon: "red_potion.png",
		type: "Potion, Combat Item",
		category: itemType.POTION,
		cost: 60,
		sell: 20,
		onUse: function () {
			let x = Math.floor(Math.random() * 5) + 20;
			hint ("You drink the health potion. " + giveHp (x), "g");
			return true;
		},
		onCombat: function () {
			let x = Math.floor(Math.random() * 5) + 20;
			addCombatText ("You drink the health potion.");
			addCombatText (giveHp (x));
		}
	},
	{
		id: 5,
		name: "running shoes",
		description: "Run. Jump. Swim. Cycle. Die.",
		enchantment: "+30 SPD<br />-10 Max HP",
		icon: "running_shoes.png",
		type: "Shoes",
		category: itemType.SHOES,
		equipStat: "SPD",
		equipValue: 5,
		cost: 100,
		sell: 50,
		onWear: function () {
			player.effSpd += 30;
			player.effHpMax -= 10;
		}
	},
	{
		id: 6,
		name: "straightened paperclip",
		description: "A paperclip that has been pulled into a straight piece of metal by a bored worker. Perfect for stabbing.",
		enchantment: "+2 STR<br />Can be used in combat to deal 40 physical damage",
		icon: "straight_paperclip.png",
		type: "Weapon, Combat Item",
		category: itemType.WEAPON,
		equipStat: "STR",
		equipValue: 1,
		sell: 5,
		onWear: function () {
			player.effStr += 2;
		},
		onCombat: function () {
			addCombatText ("You hurl the paperclip at your enemy like a spear.");
			let damage = 40 - monster.def;
			if (damage <= 0)
			{
				damage = 1;
			}
			addCombatText ("It takes " + damage + " damage!");
			monster.hp -= damage;
		}
	},
	{
		id: 7,
		name: "cardboard panel",
		description: "A dry piece of cardboard box. Provides barely any defense, but also max HP for some reason.",
		enchantment: "+3 Max HP<br />+1 DEF<br />Can be used in combat to reduce incoming damage by 80%",
		icon: "cardboard_panel.png",
		type: "Shield, Combat Item",
		category: itemType.SHIELD,
		equipStat: "DEF",
		equipValue: 1,
		sell: 10,
		onWear: function () {
			player.effHpMax += 3;
			player.effDef += 1;
		},
		onCombat: function () {
			addCombatText ("You hold the cardboard panel out in front of yourself and brace for impact.");
		}
	},
	{
		id: 8,
		name: "tiny staff",
		description: "This tiny staff is wrapped in small threads of spider silk.",
		enchantment: "+1 Max MP<br />+3 MAG",
		icon: "tiny_staff.png",
		type: "Weapon",
		category: itemType.WEAPON,
		equipStat: "MAG",
		equipValue: 3,
		sell: 5,
		onWear: function () {
			player.effMpMax += 1;
			player.effMag += 3;
		}
	},
	{
		id: 9,
		name: "town hall key",
		description: "This key unlocks the front door of the town hall.",
		enchantment: "Unlocks the Town Hall",
		icon: "key.png",
		type: "Useable",
		category: itemType.MISC,
		sell: 0,
		onUse: function () {
			hint ("You unlock the door and the key vanishes, like all good video game keys.", "g");
			player.questTownHall = 3;
			return true;
		}
	},
	{
		id: 10,
		name: "dusty ring",
		description: "The dust has fused to this enchanted ring, dampening its effectiveness.",
		enchantment: "+3 STR<br />+3 MAG<br />+5 SPD",
		icon: "dusty_ring.png",
		type: "Accessory",
		category: itemType.ACC,
		equipStat: "MAG",
		equipValue: 4,
		sell: 20,
		onWear: function () {
			player.effStr += 3;
			player.effMag += 3;
			player.effSpd += 5;
		}
	},
	{
		id: 11,
		name: "tiny helmet",
		description: "This helmet is incredibly strong but fails to cover much area. Still, its better than nothing.",
		enchantment: "+2 DEF",
		icon: "tiny_helmet.png",
		type: "Hat",
		category: itemType.HAT,
		equipStat: "DEF",
		equipValue: 3,
		sell: 5,
		onWear: function () {
			player.effDef += 2;
		}
	},
	{
		id: 12,
		name: "tiny shoes",
		description: "Merely a few dozen sizes too small, it will fit comfortably on your big toe.",
		enchantment: "+5 SPD",
		icon: "tiny_shoes.png",
		type: "Shoes",
		category: itemType.SHOES,
		equipStat: "SPD",
		equipValue: 3,
		sell: 5,
		onWear: function () {
			player.effSpd += 5;
		}
	},
	{
		id: 13,
		name: "perfect pasty",
		description: "This pasty is so well made and cooked, you feel certain you'll never see another one like it in your lifetime.",
		enchantment: "+2 Fullness<br />+12 Turns to midnight",
		icon: "cookie.png",
		type: "Food",
		category: itemType.FOOD,
		sell: 200,
		onUse: function () {
			let success = eat (12, 2);
			if (success == true)
			{
				hint (eatMessage (13, 12, 2), "g");
			}
			return success;
		}
	},
	{
		id: 14,
		name: "microwave meal",
		description: "This is a chicken korma and rice, separated into two plastic containers. You conveniently can't tell the meat quality because it's covered in sauce.",
		enchantment: "+4 Fullness<br />+10 Turns to midnight",
		icon: "cookie.png",
		type: "Food",
		category: itemType.FOOD,
		sell: 20,
		onUse: function () {
			let success = eat (10, 4);
			if (success == true)
			{
				hint (eatMessage (14, 10, 4), "g");
			}
			return success;
		}
	},
	{
		id: 15,
		name: "crème brûlée",
		description: "This crème brûlée has just been heated and hasn't yet had time to cool. Its caramalised sugar topping is glowing with enchanted magic.",
		enchantment: "+1 Fullness<br />+2 Turns to midnight<br />10 turns of +5 DEF",
		icon: "cookie.png",
		type: "Food",
		category: itemType.FOOD,
		sell: 10,
		onUse: function () {
			let success = eat (2, 1);
			if (success == true)
			{
				hint (eatMessage (15, 2, 1) + " You gain 10 turns of Crème Casing.", "g");
				addBuff (4, 10);
			}
			return success;
		}
	},
	{
		id: 16,
		name: "oven gloves",
		description: "These gloves will protect your hands from heat, but they're a bit damp so they aren't very good at it.",
		enchantment: "+5 Fire Resistance",
		icon: "cookie.png",
		type: "Accessory",
		category: itemType.ACC,
		equipStat: "MAG",
		equipValue: 8,
		sell: 15,
		onWear: function () {
			player.fireRes += 5;
		}
	},
	{
		id: 17,
		name: "crème brûlée torch",
		description: "This is a tiny blowtorch designed to caramelize the sugar on top of a crème brûlée, but you can use it for all sorts of things, such as a fancy cigarette lighter.",
		enchantment: "+5 Fire Damage",
		icon: "cookie.png",
		type: "Weapon",
		category: itemType.WEAPON,
		equipStat: "STR",
		equipValue: 8,
		sell: 15,
		onWear: function () {
			player.fireDamage += 5;
		}
	},
	{
		id: 18,
		name: "orc fork",
		description: "Stick a fork in it, your enemy is done.",
		enchantment: "+7 STR<br />+7 MAG",
		icon: "cookie.png",
		type: "Weapon",
		category: itemType.WEAPON,
		equipStat: "STR",
		equipValue: 6,
		sell: 15,
		onWear: function () {
			player.effStr += 7;
			player.effMag += 7;
		}
	},
	{
		id: 19,
		name: "orc pork",
		description: "",
		enchantment: "+3 Fullness<br />+6 Turns to midnight<br />20 turns of +7 STR",
		icon: "cookie.png",
		type: "Food",
		category: itemType.FOOD,
		sell: 20,
		onUse: function () {
			let success = eat (6, 3);
			if (success == true)
			{
				hint (eatMessage (14, 10, 4) + " You gain 20 turns of Orcine Porcine Power.", "g");
				addBuff (6, 20);
			}
			return success;
		}
	},
];

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

function use (id)
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
	let itemPosition = checkInInventory (id);
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
			useLink.html("<input type='button' value='Use' onClick = 'use(" + player.inventory[i].id + ")'>");
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