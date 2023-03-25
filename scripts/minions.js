// Returns minion's current base level calculated from its exp
// Returns 0 if you don't own the minion yet
function getMinionBaseLevel(id) {
    let exp = player.minions[id];
    if (exp == null || player.exp == undefined) {
        return 0;
    }
    let level = 1;
    let expToNextLevel = 10;
    while (exp >= expToNextLevel) {
        level++;
        exp -= expToNextLevel;
        expToNextLevel += 10;
    }
    return level;
}

// Returns minion's current level + level boosts from buffs
// Returns 0 if you don't own the minion yet
function getMinionLevel(id) {
    return getMinionBaseLevel(id) + player.effMinionLevelBonus;
}

// Give a minion exp
// Returns boolean of if this caused it to level up
function gainMinionExp(id, amount) {
    if (player.minions[id] == undefined || player.minions[id] == null) {
        return false;
    }
    let baseLevel = getMinionBaseLevel(id);
    if (baseLevel >= 20) {
        return false;
    }
    player.minions[id] += amount;
    if (player.minions[id] > 1900) {
        player.minions[id] = 1900; // exp for base level 20
    }
    if (getMinionBaseLevel(id) > baseLevel) {
        return true;
    }
    return false;
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
        if (player.minions[thisMinion] < 1900) {
            addCombatText(`${player.minionNames[thisMinion]} gained ${exp} experience.`);
            if (gainMinionExp(thisMinion, exp)) {
                addCombatText(`<strong>${player.minionNames[thisMinion]} levelled up!</strong>`);
            }
        }
    }
}

// Collect a new minion
function gainMinion(id) {
    if (player.minions[id] !== null && player.minions[id] !== undefined) {
        return;
    }
    player.minions[id] = 0;
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
    let defaultName = Math.floor(Math.random() * defaultNameList.length);
    player.minionNames[id] = defaultName;
    hint(`You add ${defaultName} the ${minions[id].name} to your pen!`, "g");
}