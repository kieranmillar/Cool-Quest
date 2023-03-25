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
    return getMinionBaseLevel(id) + player.effMinionLevelBonus;
}

// Give a minion exp
// Returns boolean of if this caused it to level up
function gainMinionExp(id, amount) {
    if (player.minionExp[id] == undefined || player.minionExp[id] == null) {
        return false;
    }
    let baseLevel = getMinionBaseLevel(id);
    if (baseLevel >= 20) {
        return false;
    }
    player.minionExp[id] += amount;
    let levelledUp = false;
    while (player.minionExp[id] >= player.minionLevels[id] * 10) {
        levelledUp = true;
        player.minionExp[id] -= player.minionLevels[id] * 10;
        player.minionLevels[id]++;
    }
    if (player.minionLevels[id] >= 20) {
        player.minionLevels[id] = 20;
        player.minionExp[id] = 0;
    }
    return levelledUp;
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
        if (player.minionLevels[thisMinion] <= 20) {
            addCombatText(`${player.minionNames[thisMinion]} gained ${exp} experience.`);
            if (gainMinionExp(thisMinion, exp)) {
                addCombatText(`<strong>${player.minionNames[thisMinion]} levelled up!</strong>`);
            }
        }
    }
}

// Collect a new minion
function gainMinion(id) {
    if (player.minionExp[id] !== null && player.minionExp[id] !== undefined) {
        return;
    }
    player.minionExp[id] = 0;
    player.minionLevels[id] = 1;
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
    hint(`You add ${defaultName} the ${minions[id].name} to your pen!`, "g");
}