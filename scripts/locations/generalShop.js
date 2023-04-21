var generalShopContainerDiv = document.getElementById("generalShop_container");

// display the general shop location
function displayGeneralShop() {
    generalShopContainerDiv.replaceChildren();

    let foodHeader = document.createElement("h2");
    foodHeader.textContent = "Food";
    generalShopContainerDiv.appendChild(foodHeader);
    let foodContainer = document.createElement("div");
    foodContainer.classList.add("inv_container");
    foodContainer.appendChild(createGeneralShopItem(2)); // cookie
    generalShopContainerDiv.appendChild(foodContainer);

    let potionsHeader = document.createElement("h2");
    potionsHeader.textContent = "Potions";
    generalShopContainerDiv.appendChild(potionsHeader);
    let potionsContainer = document.createElement("div");
    potionsContainer.classList.add("inv_container");
    potionsContainer.appendChild(createGeneralShopItem(4)); // health potion
    generalShopContainerDiv.appendChild(potionsContainer);

    let armourHeader = document.createElement("h2");
    armourHeader.textContent = "Armour";
    generalShopContainerDiv.appendChild(armourHeader);
    let armourContainer = document.createElement("div");
    armourContainer.classList.add("inv_container");
    armourContainer.appendChild(createGeneralShopItem(39)); // "lousy t-shirt" t-shirt
    armourContainer.appendChild(createGeneralShopItem(40)); // gaudy tropical shirt
    armourContainer.appendChild(createGeneralShopItem(41)); // fleecing fleece
    armourContainer.appendChild(createGeneralShopItem(42)); // tinfoil-lined jacket
    armourContainer.appendChild(createGeneralShopItem(43)); // business suit
    generalShopContainerDiv.appendChild(armourContainer);

    let weaponsHeader = document.createElement("h2");
    weaponsHeader.textContent = "Weapons";
    generalShopContainerDiv.appendChild(weaponsHeader);
    let weaponsContainer = document.createElement("div");
    weaponsContainer.classList.add("inv_container");
    weaponsContainer.appendChild(createGeneralShopItem(3)); // stick
    generalShopContainerDiv.appendChild(weaponsContainer);

    let accessoryHeader = document.createElement("h2");
    accessoryHeader.textContent = "Accessories";
    generalShopContainerDiv.appendChild(accessoryHeader);
    let accessoryContainer = document.createElement("div");
    accessoryContainer.classList.add("inv_container");
    accessoryContainer.appendChild(createGeneralShopItem(5)); // nihilistic running shoes
    generalShopContainerDiv.appendChild(accessoryContainer);

    if (!player.quests[questEnum.YELLOWKEY]) {
        let dungeonKeysHeader = document.createElement("h2");
        dungeonKeysHeader.textContent = "Dungeon Keys";
        generalShopContainerDiv.appendChild(dungeonKeysHeader);
        let dungeonKeysContainer = document.createElement("div");
        dungeonKeysContainer.classList.add("inv_container");
        if (!player.quests[questEnum.YELLOWKEY]) {
            dungeonKeysContainer.appendChild(createGeneralShopItem(30)); // yellow key
        }
        generalShopContainerDiv.appendChild(dungeonKeysContainer);
    }

    if (!getMinionOwned(0) || !getMinionOwned(3)) {
        let minionHeader = document.createElement("h2");
        minionHeader.textContent = "Minions";
        generalShopContainerDiv.appendChild(minionHeader);
        let minionContainer = document.createElement("div");
        minionContainer.classList.add("inv_container");
        if (!getMinionOwned(0)) {
            minionContainer.appendChild(createGeneralShopMinion(0, 10)); // nurse leech
        }
        if (!getMinionOwned(3)) {
            minionContainer.appendChild(createGeneralShopMinion(3, 500)); // fluffy kitten
        }
        generalShopContainerDiv.appendChild(minionContainer);
    }
}

// Creates the html elements for an item in the shop. Returns the created element
function createGeneralShopItem(id) {
    let itemWrapper = document.createElement("div");
    itemWrapper.classList.add("item");
    let newElement = document.createElement("span");
    newElement.classList.add("item_Image");
    newElement.innerHTML = `<img src="./images/${items[id].icon}"><span class="wrappableText">${items[id].name}</span>`;
    newElement.addEventListener("click", function() {
        openDialog(dialogType.ITEM, id);
    });
    itemWrapper.appendChild(newElement);

    let buyButton = document.createElement("span");
    buyButton.innerHTML = `<input type='button' value='Buy\n(${items[id].cost} Gold)' onClick='buyGeneralShopItem(${id})'>`;
    itemWrapper.appendChild(buyButton);
    return itemWrapper;
}

// Creates the html elements for a minion in the shop. Returns the created element
function createGeneralShopMinion(id, cost) {
    let minionWrapper = document.createElement("div");
    minionWrapper.classList.add("item");
    let newElement = document.createElement("span");
    newElement.classList.add("item_Image");
    newElement.innerHTML = `<img src="./images/${minions[id].icon}"><span class="wrappableText">${minions[id].name}</span>`;
    newElement.addEventListener("click", function() {
        openDialog(dialogType.MINION, id);
    });
    minionWrapper.appendChild(newElement);

    let buyButton = document.createElement("span");
    buyButton.innerHTML = `<input type='button' value='Buy\n(${cost} Gold)' onClick='buyGeneralShopMinion(${id}, ${cost})'>`;
    minionWrapper.appendChild(buyButton);
    return minionWrapper;
}

// buy an item from the general shop
function buyGeneralShopItem (id) {
    if (player.quests[questEnum.TUTORIAL] < 8) {
        hint("Buy a minion first, wouldn't want to run out of money!", "r");
        return;
    }
    buyItem(id, 1);
    displayGeneralShop();
}

// buy a minion from the general shop
function buyGeneralShopMinion (id, cost) {
    if (player.gold < cost) {
        hint("You can't afford that!", "r");
        return;
    }
	player.gold -= cost;
    gainMinion(id);
    save();
    redrawCharPane();
    displayGeneralShop();
}
