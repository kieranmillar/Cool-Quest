var happyvilleShopPaperCountSpan = document.getElementById("happyvilleShop_paperCount");
var happyvilleShopContainerDiv = document.getElementById("happyvilleShop_container");
var happyvilleTreeContainerDiv = document.getElementById("happyvilleTree_container");

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

    let foodHeader = document.createElement("h2");
    foodHeader.textContent = "Food";
    happyvilleShopContainerDiv.appendChild(foodHeader);
    let foodContainer = document.createElement("div");
    foodContainer.classList.add("inv_container");
    foodContainer.appendChild(createHappyvilleShopItem(45)); // candy cane
    foodContainer.appendChild(createHappyvilleShopItem(49)); // festive pudding
    happyvilleShopContainerDiv.appendChild(foodContainer);

    let potionsHeader = document.createElement("h2");
    potionsHeader.textContent = "Potions";
    happyvilleShopContainerDiv.appendChild(potionsHeader);
    let potionsContainer = document.createElement("div");
    potionsContainer.classList.add("inv_container");
    potionsContainer.appendChild(createHappyvilleShopItem(48)); // ritual candle
    potionsContainer.appendChild(createHappyvilleShopItem(50)); // Happyville snowglobe
    happyvilleShopContainerDiv.appendChild(potionsContainer);

    let miscHeader = document.createElement("h2");
    miscHeader.textContent = "Misc";
    happyvilleShopContainerDiv.appendChild(miscHeader);
    let miscContainer = document.createElement("div");
    miscContainer.classList.add("inv_container");
    miscContainer.appendChild(createHappyvilleShopItem(37)); // present
    happyvilleShopContainerDiv.appendChild(miscContainer);

    let weaponsHeader = document.createElement("h2");
    weaponsHeader.textContent = "Weapons";
    happyvilleShopContainerDiv.appendChild(weaponsHeader);
    let weaponsContainer = document.createElement("div");
    weaponsContainer.classList.add("inv_container");
    weaponsContainer.appendChild(createHappyvilleShopItem(46)); // icicle
    happyvilleShopContainerDiv.appendChild(weaponsContainer);

    if (!getMinionOwned(1)) {
        let minionHeader = document.createElement("h2");
        minionHeader.textContent = "Minions";
        happyvilleShopContainerDiv.appendChild(minionHeader);
        let minionContainer = document.createElement("div");
        minionContainer.classList.add("inv_container");
        if (!getMinionOwned(1)) {
            minionContainer.appendChild(createHappyvilleShopMinion(1, 30)); // rapping wrapping robot
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
        openModal(modalType.ITEM, id);
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
        openModal(modalType.MINION, id);
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

// display the happyville tree location
function displayHappyvilleTree() {
    happyvilleTreeContainerDiv.replaceChildren();
    let presentCount = getItemAmount(37);
    if (player.quests[questEnum.HAPPYVILLE] > 3) {
        addHappyvilleTreeText("The tree has been destroyed, and in its place is Santa's Workshop.");
    }
    else if (presentCount >= 20) {
        addHappyvilleTreeText("TODO: Summoning text");
        loseItem(37, 20);
        player.quests[questEnum.HAPPYVILLE] = 4;
    }
    else if(player.quests[questEnum.HAPPYVILLE] == 2) {
        addHappyvilleTreeText("You head towards the large tree in the centre of the village square. A large crowd is gathered there, and everyone looks glum. You push your way to the front of the crowd, and spot who appears to be the person most in charge here.");
        addHappyvilleTreeText("\"Oh, are you from Drella? Thank you! They normally never answer us, but I knew they'd understand the gravity of the situation this time!\"");
        addHappyvilleTreeText("\"What's the problem?\" you ask.");
        addHappyvilleTreeText("\"It's time for our village's seasonal festivities. We usually place a large pile of presents under the tree, but somebody keeps stealing them all.\"");
        addHappyvilleTreeText("\"What are the presents for? They don't feel like something that's hard to replace.\"");
        addHappyvilleTreeText("\"Oh the presents are just... a generous offering... uh I mean... they represent the spirit of kindness and giving. It's a traditional thing. Anyway, we're struggling to get enough presents together in one place, we were hoping someone who is clearly not from around here wouldn't be targetted by the thieves and so might be able to bring the presents here.\"");
        addHappyvilleTreeText("\"So where can I find these presents?\" you ask.");
        addHappyvilleTreeText("\"We produce them at the present factory so that's a good place to look. Perhaps you could also hunt down the thief, who we think is hiding in the Reindeer Forest. Also, we still have some for sale at the gift shop if you find yourself with any wrapping paper, which we could use to make more presents. We need 20 presents.\"");
        addHappyvilleTreeText("Just then another person walks up to you both. \"Hey boss, it's almost time for the summoning, we got the presents yet?\"");
        addHappyvilleTreeText("\"Hahaha please ignore him... he means summoning... everybody in town, to here, for the ritual... festivities! The festivities!\"");
        addHappyvilleTreeText("Whatever. You head off to look for presents.");
        player.quests[questEnum.HAPPYVILLE] = 3;
    }
    else {
        let presentText = presentCount + " presents";
        if (presentCount == 1) {
            presentText = "1 present";
        }
        if (presentCount == 0) {
            drellaUVoucherCountSpan.textContent = "no presents";
        }
        addHappyvilleTreeText(`"We still need enough presents to go under the tree. You currently have ${presentText}. Please could you bring us 20 of them."`);
        addHappyvilleTreeText("\"You should be able to find plenty of presents in the present factory, or by trading in wrapping paper at the gift shop. There are reports of a thief who hides in the nearby forest who has been stealing presents too.\"");
    }

    displayQuestLog();
    save();
}

// adds a paragraph of text to the happyville tree location
function addHappyvilleTreeText(text) {
    let newParagraph = document.createElement("p");
    newParagraph.textContent = text;
    happyvilleTreeContainerDiv.appendChild(newParagraph);
}
