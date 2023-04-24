var cidTextDiv = document.getElementById("cidText");

// Called when visiting Cid, handles all logic of what to display on that screen
function displayCidText () {
    cidTextDiv.textContent = "";

    // level 1
    if (player.level == 1) {
        newCidText("Hey are you the new mercenary? While the Mayor's tasks are the most important, if you're ever looking for more things to do, I'll have some odd jobs others would like you to do. I don't have anything for you yet though, come back when you've reached level 2.");
    }

    //level 2
    if (player.level >= 2 && getQuestState(questEnum.BADGER) == 0) {
        newCidText("A new job has come in, the client's offering 400 Gold if you're interested. On the outskirts of the town is the Badger Badger Sett, where the Badger Badgers live. My client is looking for somebody to get three Badger Badger badges for them.");
        setQuestState(questEnum.BADGER, 1);
        if (getQuestState(questEnum.ORCCAMP) == 0) {
            newCidText("Oh, you don't know about the outskirts of town yet? I'm honored you came to visit me first, but in the future after you level up visiting the Mayor should be your first priority.");
        }
    }
    else if (getQuestState(questEnum.BADGER) == 1 && getItemAmount(31) < 3) {
        newCidText("How goes the hunt for three Badger Badger badges? You can get them from the Badger Badger Sett. 400 Gold's waiting for you!");
    }
    if (getQuestState(questEnum.BADGER) == 1 && getItemAmount(31) >= 3) {
		newCidText("Hey, good job on getting three Badger Badger badges. Want to trade them in for 400 Gold?");
        let badgerButton = document.createElement("button");
	    badgerButton.textContent = "Trade 3 Badger Badger badges for 400 Gold";
	    cidTextDiv.appendChild(badgerButton);
	    badgerButton.onclick = function() {
		    loseItem (31, 3);
            gainGold(400);
            redrawCharPane();
		    setQuestState(questEnum.BADGER, 2);
            goToLocation("cid");
            hint("You trade in 3 Badger Badger badges for 400 Gold.", "g");

	    };
    }

    //level 2
    if (player.level >= 3 && getQuestState(questEnum.MUD) == 0) {
        newCidText("Someone who called himself a \"Mud Coordinator\", whatever that is, has asked for me to find someone to help them get a hold of 2 globs of \"Awakened Mud\" from the Deadly Dungeons of Death in the mountains. They've handed me this huge sword I can give out as a reward, what do you say?");
        setQuestState(questEnum.MUD, 1);
    }
    else if (getQuestState(questEnum.MUD) == 1 && getItemAmount(51) < 2) {
        newCidText("How's it going getting hold of a pair of globs of that special mud? You might need to buy a key from the general store to gain access to the dungeons.");
    }
    if (getQuestState(questEnum.MUD) == 1 && getItemAmount(51) >= 2) {
		newCidText("Ah, you found some of that \"Awakened Mud\"? If you let me have that I can give you this large sword.");
        let mudButton = document.createElement("button");
	    mudButton.textContent = "Trade 2 small globs of mud for a Really Big Sword";
	    cidTextDiv.appendChild(mudButton);
	    mudButton.onclick = function() {
		    loseItem(51, 2);
            gainItem(52, 1);
			setQuestState(questEnum.MUD, 2);
            goToLocation("cid");
            hint("You trade in 2 small globs of mud for a Really Big Sword.", "g");
	    };
    }

    if (cidTextDiv.textContent === "") {
        newCidText("Sorry buddy, the only jobs I have left require you to be stronger. Come back when you've levelled up.");
    }
}

// Adds a new paragraph of text on Cid's screen
function newCidText(t) {
    let newElement = document.createElement("p");
    newElement.textContent = t;
	cidTextDiv.appendChild(newElement);
}
