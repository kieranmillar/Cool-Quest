var penIntroContainerParagraph = document.getElementById("pen_introContainer");
var penContainerDiv = document.getElementById("pen_container");
var showMinionTutorialOneOff = false;

// Returns true or false if you own the minion or not
function getMinionOwned(id) {
    return !(player.minionLevels[id] === null || player.minionLevels[id] === undefined);
}

// Returns minion's current base level calculated from its exp
// Returns 0 if you don't own the minion yet
function getMinionBaseLevel(id) {
    let minionLevel = player.minionLevels[id];
    if (minionLevel == null || minionLevel == undefined) {
        return 0;
    }
    return minionLevel;
}

// Returns minion's current level + level boosts from buffs
// Returns 0 if you don't own the minion yet
function getMinionLevel(id) {
    let baseLevel = getMinionBaseLevel(id);
    if (baseLevel == 0) {
        return 0;
    }
    return baseLevel + player.effMinionLevelBonus;
}

// Give a minion exp
// Returns boolean of if this caused it to level up
function gainMinionExp(id, amount) {
    if (!getMinionOwned(id)) {
        return false;
    }
    let baseLevel = getMinionBaseLevel(id);
    if (baseLevel >= 20) {
        return false;
    }
    player.minionExp[id] += amount;
    let levelledUp = false;
    while (player.minionExp[id] >= player.minionLevels[id] * 6) {
        levelledUp = true;
        player.minionExp[id] -= player.minionLevels[id] * 6;
        player.minionLevels[id]++;
    }
    if (player.minionLevels[id] >= 20) {
        player.minionLevels[id] = 20;
        player.minionExp[id] = 0;
    }
    return levelledUp;
}

// called each round in combat, deals with all things minion related
function minionCombatRound() {
    numberOfEquippedMinions = player.equippedMinions.filter(x => x != -1).length;
    for (let i = 0; i < 2; i++) {
        let thisMinion = player.equippedMinions[i];
        if (thisMinion == -1) {
            continue;
        }
        if ("onCombatRound" in minions[thisMinion]) {
            minions[thisMinion].onCombatRound();
        }
    }
}

// called when winning combat, deals with all things minion related
function minionCombatWin() {
    numberOfEquippedMinions = player.equippedMinions.filter(x => x != -1).length;
    for (let i = 0; i < 2; i++) {
        let thisMinion = player.equippedMinions[i];
        if (thisMinion == -1) {
            continue;
        }
        if ("onCombatWin" in minions[thisMinion]) {
            minions[thisMinion].onCombatWin();
        }
        let exp = (2 + player.effMinionExpBonus) / numberOfEquippedMinions;
        if (player.minionLevels[thisMinion] < 20) {
            addMinionCombatText(`${player.minionNames[thisMinion]} gained ${exp} experience.`, thisMinion);
            if (gainMinionExp(thisMinion, exp)) {
                addMinionCombatText(`<strong>${player.minionNames[thisMinion]} levelled up!</strong>`, thisMinion);
            }
        }
    }
}

// Collect a new minion
function gainMinion(id) {
    if (getMinionOwned(id)) {
        return;
    }
    player.minionExp[id] = 0;
    player.minionLevels[id] = 1;
    if (player.minionNames[id] == null || player.minionNames[id] == undefined) {
        let defaultNameList = [
            "Harry",
            "Barry",
            "Larry",
            "Gary",
            "Carrie",
            "Kenny",
            "Benny",
            "Lennie",
            "Denny",
            "Jenny",
            "Penny",
            "Holly",
            "Dolly",
            "Molly",
            "Ollie",
            "Wally",
            "Bonnie",
            "Connie",
            "Donny",
            "Johnny",
            "Ronnie"
        ];
        let defaultName = defaultNameList[Math.floor(Math.random() * defaultNameList.length)];
        player.minionNames[id] = defaultName;
    }
    hint(`You add ${player.minionNames[id]} the ${minions[id].name} to your pen!`, "g");
}

// Unequips a minion
function unequipMinion(id) {
    let index = player.equippedMinions.findIndex(x => x == id);
    if (index == -1) {
        hint("You don't have that minion with you!", "r");
        return;
    }
    player.equippedMinions[index] = -1;
    hint(`You returned ${player.minionNames[id]} the ${minions[id].name} to your pen`, "g");
    calculateStats();
    save();
    displayPen();
}

// Equips a minion, unequipping if necessary
function equipMinion(id) {
    if (player.quests[questEnum.TUTORIAL] == 7) {
        player.quests[questEnum.TUTORIAL] = 8;
        showMinionTutorialOneOff = true;
    }
    if (!getMinionOwned(id)) {
        hint(`You don't own that minion!`, "r");
        return;
    }
    if (player.skills[29]) { // Extra Crew skill
        if (player.equippedMinions[0] == -1) {
            player.equippedMinions[0] = id;
        } else {
            player.equippedMinions[1] = id;
        }
    }
    else {
        player.equippedMinions[0] = id;
    }
    hint(`You took ${player.minionNames[id]} the ${minions[id].name} with you!`, "g");
    calculateStats();
    save();
    displayPen();
}

// Pops up a prompt to rename a minion
function renameMinion(id) {
    let newName = prompt(`Rename ${player.minionNames[id]} the ${minions[id].name}`, player.minionNames[id]);
    if (!newName) {
        return;
    }
    newName = newName.trim();
    newName = newName.substring(0, 30);
    player.minionNames[id] = newName;
    redrawCharPane();
    save();
    displayPen();
}

// display the minion pen in your house
function displayPen() {
    if (showMinionTutorialOneOff) {
        penIntroContainerParagraph.textContent = "With a minion at the ready, you now feel confident enough to do some real adventuring. Time to return to the mayor and get started, for real this time."
        showMinionTutorialOneOff = false;
    }
    else {
        penIntroContainerParagraph.textContent = "You visit your minions, playing around in the pen.";
    }

    let minionCount = 0;
    penContainerDiv.replaceChildren();

    for (let i = 0; i < player.minionLevels.length; i++) {
        if (!player.minionLevels[i]) {
            continue;
        }

        let minionWrapper = document.createElement("div");
        minionWrapper.classList.add("minion");
        let innerWrapper = document.createElement("span");
        let newElement = document.createElement("span");
        newElement.classList.add("item_Image");
        newElement.innerHTML = `<img src="./images/${minions[i].icon}"><span class="wrappableText">${player.minionNames[i]} the ${minions[i].name}</span>`;
        newElement.addEventListener("click", function() {
            openModal(modalType.MINION, i);
        });
        innerWrapper.appendChild(newElement);
        newElement = document.createElement("p");
        newElement.textContent = `Level: ${getMinionBaseLevel(i)}`;
        innerWrapper.appendChild(newElement);
        if (getMinionBaseLevel(i) < 20) {
            newElement = document.createElement("p");
            newElement.textContent = `Exp: ${player.minionExp[i]} / ${getMinionBaseLevel(i) * 6}`;
            innerWrapper.appendChild(newElement);
        }
        minionWrapper.appendChild(innerWrapper);
        if (player.equippedMinions.includes(i)) {
            let unequipButton = document.createElement("span");
            unequipButton.innerHTML = `<input type = 'button' value = 'Put back' onClick = 'unequipMinion(${i})'>`;
            minionWrapper.appendChild(unequipButton);
        }
        else {
            let equipButton = document.createElement("span");
            equipButton.innerHTML = `<input type = 'button' value = 'Take with you' onClick = 'equipMinion(${i})'>`;
            minionWrapper.appendChild(equipButton);
        }

        let renameButton = document.createElement("span");
            renameButton.innerHTML = `<input type = 'button' value = 'Rename' onClick = 'renameMinion(${i})'>`;
            minionWrapper.appendChild(renameButton);

        penContainerDiv.appendChild(minionWrapper);
        minionCount ++;
    }

    if (minionCount == 0) {
        let newElement = document.createElement("p");
        newElement.textContent = "You don't have any minions.";
	    penContainerDiv.appendChild(newElement);
    }
}
