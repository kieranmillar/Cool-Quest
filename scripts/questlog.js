var questLogContainer = document.getElementById("char_questLogContainer");

// displays the quest log
function displayQuestLog() {
    questLogContainer.replaceChildren();
    if (getQuestState(questEnum.TUTORIAL) < 8) {
        addQuestLogEntry("Complete the tutorial");
        return;
    }
    if (getQuestState(questEnum.TOWNHALL) == 0) {
        addQuestLogEntry("Visit the mayor");
    }
    if (getQuestState(questEnum.TOWNHALL) == 1) {
        addQuestLogEntry("Find the town hall key in the basement");
    }
    if (getQuestState(questEnum.TOWNHALL) == 2) {
        addQuestLogEntry("Use the town hall key from your inventory");
    }
    if (getQuestState(questEnum.TOWNHALL) == 3) {
        addQuestLogEntry("Return to the mayor");
    }
    if (getQuestState(questEnum.TOWNHALL) == 4 && player.level == 1) {
        addQuestLogEntry("Reach level 2");
    }
    if (getQuestState(questEnum.ORCCAMP) == 0 && player.level >= 2) {
        addQuestLogEntry("Visit the mayor");
    }
    if (getQuestState(questEnum.ORCCAMP) == 1) {
        addQuestLogEntry("Visit the orc camp at the outskirts of town");
    }
    if (getQuestState(questEnum.ORCCAMP) >= 2 && getQuestState(questEnum.ORCCAMP) <= 4) {
        addQuestLogEntry("Find a way to talk to the orc camp leader");
    }
    if (getQuestState(questEnum.ORCCAMP) == 5) {
        addQuestLogEntry("Talk to the orc camp leader");
    }
    if (getQuestState(questEnum.ORCCAMP) == 6) {
        addQuestLogEntry("Return to the mayor");
    }
    if (getQuestState(questEnum.ORCCAMP) == 7 && player.level == 2) {
        addQuestLogEntry("Reach level 3");
    }
    if (getQuestState(questEnum.HAPPYVILLE) == 0 && player.level >= 3) {
        addQuestLogEntry("Visit the mayor");
    }
    if (getQuestState(questEnum.HAPPYVILLE) == 1 || getQuestState(questEnum.HAPPYVILLE) == 2) {
        addQuestLogEntry("Talk to the citizens of Happyville in the mountains");
    }
    if (getQuestState(questEnum.HAPPYVILLE) == 3) {
        addQuestLogEntry("Collect 20 presents and bring them to the large tree in Happyville");
    }
    if (getQuestState(questEnum.HAPPYVILLE) == 4) {
        addQuestLogEntry("Defeat Santa in Happyville");
    }
    if (getQuestState(questEnum.HAPPYVILLE) == 5) {
        addQuestLogEntry("Return to the mayor");
    }
    if (getQuestState(questEnum.HAPPYVILLE) == 6 && player.level == 3) {
        addQuestLogEntry("Reach level 4");
    }
    if (getQuestState(questEnum.FARM) == 0 && player.level >= 4) {
        addQuestLogEntry("Visit the mayor");
    }
    if (getQuestState(questEnum.FARM) == 1 || getQuestState(questEnum.FARM) == 2) {
        addQuestLogEntry("Investigate Eaty Farm in the outskirts of town");
    }
    if (player.options[optionEnum.CIDQUESTLOG]) {
        if (getQuestState(questEnum.BADGER) == 1) {
            addQuestLogEntry("Collect 3 Badger Badger badges from the Badger Badger Sett for Cid");
        }
        if (getQuestState(questEnum.MUD) == 1) {
            addQuestLogEntry("Collect 2 small globs of mud from the Deadly Dungeons of Death for Cid");
        }
    }
}

// adds an entry to the quest log
function addQuestLogEntry(text) {
    let e = document.createElement("li");
    e.textContent = text;
    questLogContainer.appendChild(e);
}
