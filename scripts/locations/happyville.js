var happyvilleShopPaperCountSpan = document.getElementById("happyvilleShop_paperCount");
var happyvilleShopContainerDiv = document.getElementById("happyvilleShop_container");

// display the happyville shop location
function displayHappyvilleShop() {
    let wrappingPaperCount = getItemAmount(36);
    if (wrappingPaperCount) {
        happyvilleShopPaperCountSpan.textContent = wrappingPaperCount;
    }
    else {
        happyvilleShopPaperCountSpan.textContent = "no";
    }
    happyvilleShopContainerDiv.replaceChildren();

    let miscHeader = document.createElement("h2");
    miscHeader.textContent = "Miscellaneous";
    happyvilleShopContainerDiv.appendChild(miscHeader);
    let miscContainer = document.createElement("div");
    miscContainer.classList.add("inv_container");
    miscContainer.appendChild(createHappyvilleShopItem(37)); // present
    happyvilleShopContainerDiv.appendChild(miscContainer);

    if (!getMinionOwned(1)) {
        let minionHeader = document.createElement("h2");
        minionHeader.textContent = "Minions";
        happyvilleShopContainerDiv.appendChild(minionHeader);
        let minionContainer = document.createElement("div");
        minionContainer.classList.add("inv_container");
        if (!getMinionOwned(1)) {
            minionContainer.appendChild(createHappyvilleShopMinion(0, 30)); // rapping wrapping robot
        }
        happyvilleShopContainerDiv.appendChild(minionContainer);
    }
}

// Creates the html elements for an item in the shop. Returns the created element
function createHappyvilleShopItem(id) {
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
    buyButton.innerHTML = `<input type='button' value='Buy (${items[id].cost}\nwrapping\npaper)' onClick='buyHappyvilleShopItem(${id})'>`;
    itemWrapper.appendChild(buyButton);
    return itemWrapper;
}

// Creates the html elements for a minion in the shop. Returns the created element
function createHappyvilleShopMinion(id, cost) {
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
    buyButton.innerHTML = `<input type='button' value='Buy (${cost}\nwrapping\npaper)' onClick='buyHappyvilleShopMinion(${id}, ${cost})'>`;
    minionWrapper.appendChild(buyButton);
    return minionWrapper;
}

// buy an item from the happyville shop
function buyHappyvilleShopItem (id) {
    if (!loseItem(36, items[id].cost)) {
        hint("You can't afford that!", "r");
        return;
    }
    gainItem (id, 1);
	hint ("You purchased a " + items[id].name + "!", "g");
    save();
    displayHappyvilleShop();
}

// buy a minion from the happyville shop
function buyHappyvilleShopMinion (id, cost) {
    if (!loseItem(36, cost)) {
        hint("You can't afford that!", "r");
        return;
    }
    gainMinion(id);
    save();
    displayHappyvilleShop();
}
