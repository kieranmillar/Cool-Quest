var inv_emptyParagraph = document.getElementById("inv_empty");
var equip_emptyParagraph = document.getElementById("equip_empty");
var pawn_emptyParagraph = document.getElementById("pawn_empty");
var accessory4Div = document.getElementById("accessory4");

// Equip an item
function equip(id) {
	let type = items[id].category;
	if (type >= 5) {
		return;
	}
	let slot = 0;
	switch (type) {
		case itemType.HAT:
		case itemType.ARMOUR:
		case itemType.WEAPON:
		case itemType.SHIELD:
			slot = type;
			break;
		case itemType.ACC:
			if (player.equipment[4] == -1) {
				slot = 4;
			}
			else if (player.equipment[5] == -1) {
				slot = 5;
			}
			else if (player.job != jobEnum.PIRATE) {
				slot = 6;
			}
			else if (player.equipment[6] == -1) {
				slot = 6;
			}
			else {
				slot = 7;
			}
			break;
	}
	if (player.equipment[slot] == id) {
		hint("You already have that equipped in that slot!", "r");
		return;
	}
	if (player.equipment[slot] != -1) {
		gainItem(player.equipment[slot], 1);
	}
	player.equipment[slot] = id;
	loseItem(id, 1);
	displayEquipment();
	calculateStats();
	hint(`You equipped a ${items[player.equipment[slot]].name}.`, "g");
	save();
}

// Unequip an item from a specific equipment slot
function unequip(slot) {
	let x = player.equipment[slot];
	if (x == -1) {
		return;
	}
	gainItem(x, 1);
	player.equipment[slot] = -1;
	displayEquipment();
	calculateStats();
	hint(`You unequipped a ${items[x].name}.`, "g");
	save();
}

// Use an item
function useItem(id) {
	if(!"onUse" in items[id]) {
		hint("That's not a useable item!", "r");
		return;
	}
	if (items[id].onUse() == true) {
		loseItem(id, 1);
		displayInventory();
		calculateStats();
		save();
	}
}

// Gets the position of an item in your inventory. Returns its index in the inventory array, or -1 if not found
function checkInInventory(id) {
	return player.inventory.findIndex(x => x.id == id);
}

// Gets the amount of an item in your inventory
function getItemAmount(id) {
	const itemPosition = checkInInventory(id);
	if (itemPosition == -1) {
		return 0;
	}
	return player.inventory[itemPosition].amount;
}

// Adds an item to your inventory, sorts your inventory if new, and marks it as having been owned at some point
function gainItem(id, amount) {
	player.ownedItems[id] = 1;
	const itemPosition = checkInInventory(id);
	if (itemPosition == -1) {
		player.inventory.push({id: id, amount: amount});
		player.inventory.sort(function(a,b){
			if (a === null || a === undefined || b === null || b === undefined) {
				return 0;
			}
			let x = items[a.id].name.toLowerCase();
			let y = items[b.id].name.toLowerCase();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}
	else {
		player.inventory[itemPosition].amount += amount;
	}
}

// Lose quantities of an item from your inventory. Returns if successful
function loseItem(id, amount) {
	let itemPosition = checkInInventory(id);
	if (itemPosition == -1) {
		return false; // don't own the item anyway
	}
	else {
		if (player.inventory[itemPosition].amount > amount) {
			player.inventory[itemPosition].amount -= amount;
			return true;
		}
		else if (player.inventory[itemPosition].amount == amount) {
			player.inventory.splice(itemPosition, 1);
			return true;
		}
		else {
			return false; //don't own enough
		}
	}
}

// Creates an element displaying the item image and name, and can be clicked to open its dialog. Returns the element
// Arguments are the item id and optionally the amount (shown only if you pass in a number greater than zero)
function createItemElement(id, amount = 0) {
	let e = document.createElement("span");
	e.classList.add("item_Image");
	let imgElement = document.createElement("img");
	imgElement.src = `./images/${items[id].icon}`;
	e.appendChild(imgElement);
	let textSpan = document.createElement("span");
	textSpan.textContent = items[id].name;
	if (amount > 0) {
		textSpan.textContent += ` x${amount}`;
	}
	e.appendChild(textSpan);
	e.onclick = function() {
		openDialog (dialogType.ITEM, id);
	};
	return e;
}

// Creates a button intended to go onto the end of an item or skill element. Returns the element
// Arguments are the text displayed on the button, and a callback function to execute when the button is pressed
function createItemElementButton(text, callBack) {
	let e = document.createElement("button");
	e.classList.add("item_button");
	e.innerText = text;
	e.onclick = callBack;
	return e;
}

// Displays the inventory screen
function displayInventory() {
	for (let i = 5; i < 8; i++) {
		document.getElementById(`inv_${i}`).replaceChildren();
	}
	
	for (let invItem of player.inventory) {
		let type = items[invItem.id].category;
		if (type < 5) {
			continue;
		}
		let itemDiv = document.createElement("div");
		itemDiv.classList.add("item");
		let e = createItemElement(invItem.id, invItem.amount);
		itemDiv.append(e);
		if ("onUse" in items[invItem.id]) {
			let buttonText = "Use";
			if (type == itemType.FOOD) {
				buttonText = "Eat";
				if (player.options[optionEnum.FOODQUALITY] == 1) {
					let quality = Math.round((items[invItem.id].turns / items[invItem.id].fullness) * 100) / 100;
					buttonText += `\n(${items[invItem.id].fullness}F ${quality}Q)`;
				}
			}
			let button = createItemElementButton(buttonText, function() {useItem(invItem.id);});
			itemDiv.appendChild(button);
		}
		document.getElementById(`inv_${type}`).appendChild(itemDiv);
	}

	let haveItems = false;
	for (let i = 5; i < 8; i++) {
		let invContainer = document.getElementById(`inv_${i}`);
		let invTitle = document.getElementById(`inv_${i}_title`);
		if (invContainer.textContent == "") {
			hide(invContainer);
			hide(invTitle);
		}
		else {
			show(invContainer);
			show(invTitle);
			haveItems = true;
		}
	}
	if (haveItems) {
		hide(inv_emptyParagraph);
	}
	else {
		show(inv_emptyParagraph);
	}
}

// Displays the equipment screen
function displayEquipment() {
	for (let i = 0; i < 8; i++) {
		let equippedDiv = document.getElementById(`worn_${i}`);
		equippedDiv.replaceChildren();
		if (player.equipment[i] != -1) {
			show(equippedDiv);
			let e = createItemElement(player.equipment[i], 0);
			equippedDiv.append(e);
			let button = createItemElementButton("Unequip", function() {unequip(i);});
			equippedDiv.appendChild(button);
		}
		else {
			hide(equippedDiv);
		}
	}

	if (player.job == jobEnum.PIRATE) {
		show(accessory4Div);
	}
	else {
		hide(accessory4Div);
	}

	for (let i = 0; i < 5; i++) {
		document.getElementById(`equip_${i}`).replaceChildren();
	}

	for (let invItem of player.inventory) {
		let type = items[invItem.id].category;
		if (type >= 5) {
			continue;
		}

		let itemDiv = document.createElement("div");
		itemDiv.classList.add("item");
		let e = createItemElement(invItem.id, invItem.amount);
		itemDiv.append(e);

		let button = createItemElementButton("Equip", function() {equip(invItem.id);});
		itemDiv.appendChild(button);
		document.getElementById(`equip_${type}`).appendChild(itemDiv);
	}

	let haveItems = false;
	for (let i = 0; i < 5; i++) {
		let equipContainer = document.getElementById(`equip_${i}`);
		let equipTitle = document.getElementById(`equip_${i}_title`);
		if (equipContainer.textContent == "") {
			hide(equipContainer);
			hide(equipTitle);
		}
		else {
			show(equipContainer);
			show(equipTitle);
			haveItems = true;
		}
	}
	if (haveItems) {
		hide(equip_emptyParagraph);
	}
	else {
		show(equip_emptyParagraph);
	}
}

// Display the pawn shop
function displayPawnShop() {
	for (i = 0; i < 8; i++) {
		document.getElementById(`pawn_${i}`).replaceChildren();
	}
	
	for (let invItem of player.inventory) {
		if (items[invItem.id].sell == 0) {
			continue;
		}

		let itemDiv = document.createElement("div");
		itemDiv.classList.add("item");
		let e = createItemElement(invItem.id, invItem.amount);
		itemDiv.append(e);

		let button = createItemElementButton(`Sell\n(${items[invItem.id].sell} Gold)`, function() {sellItem(invItem.id);});
		itemDiv.appendChild(button);
		document.getElementById(`pawn_${items[invItem.id].category}`).appendChild(itemDiv);
	}

	let haveItems = false;
	for (let i = 0; i < 8; i++) {
		let pawnContainer = document.getElementById(`pawn_${i}`);
		let pawnTitle = document.getElementById(`pawn_${i}_title`);
		if (pawnContainer.textContent == "") {
			hide(pawnContainer);
			hide(pawnTitle);
		}
		else {
			show(pawnContainer);
			show(pawnTitle);
			haveItems = true;
		}
	}
	if (haveItems) {
		hide(pawn_emptyParagraph);
	}
	else {
		show(pawn_emptyParagraph);
	}
}

// Buy an item for its cost in gold
function buyItem(id, amount) {
	totalCost = items[id].cost * amount;
	if (player.gold < totalCost) {
		hint("You can't afford that!", "r");
		return;
	}
	player.gold -= totalCost;
	gainItem(id, amount);
	redrawCharPane();
	hint(`You purchased a ${items[id].name}!`, "g");
	save();
}

// Sell an item for gold in the pawn shop
function sellItem(id) {
	if (items[id].sell == 0) {
		hint("You can't sell that item!", "r");
		return;
	}
	if (!loseItem(id, 1)) {
		hint("You don't have that item to sell!", "r");
		return;
	}
	else {
		hint(`You sold a ${items[id].name}. ${giveGold(items[id].sell, false)}`, "g");
		save();
		redrawCharPane();
		displayPawnShop();
	}
}
