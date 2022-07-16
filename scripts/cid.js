var cidTextDiv = document.getElementById("cidText");

// Called when visiting Cid, handles all logic of what to display on that screen
function displayCidText () {
    cidTextDiv.textContent = "";

    // level 1
    if (player.level == 1) {
        newCidText("Hey are you the new mercenary the Elder hired? While his tasks are the most important, if you're ever looking for more things to do, I'll have some odd jobs others would like you to do. I don't have anything for you yet though, come back when you've reached level 2.");
    }

    //level 2
    if (player.level >= 2 && player.questBadger == 0) {
        newCidText("A new job has come in, the client's offering 400 Gold if you're interested. On the outskirts of the town is the Badger Badger Sett, where the Badger Badgers live. My client is looking for somebody to get three Badger Badger badges for them.");
        player.questBadger = 1;
        if (player.questOrcCamp == 0) {
            newCidText("Oh, you don't know about the outskirts of town yet? I'm honored you came to visit me first, but in the future after you level up visiting the Elder should be your first priority.");
        }
    }
    else if (player.questBadger == 1 && getItemAmount(31) < 3) {
        newCidText("How goes the hunt for three Badger Badger badges? You can get them from the Badger Badger Sett. 400 Gold's waiting for you!");
    }
    if (player.questBadger == 1 && getItemAmount(31) >= 3) {
		newCidText("Hey, good job on getting three Badger Badger badges. Want to trade them in for 400 Gold?");
        let badgerButton = document.createElement("button");
	    badgerButton.innerHTML = "Trade 3 Badger Badger badges for 400 Gold";
	    cidTextDiv.appendChild(badgerButton);
	    badgerButton.addEventListener ("click", function() {
		    loseItem (31, 3);
            giveGold(400, false);
            player.questBadger = 2;
            goToLocation("cid");
            hint("You trade in 3 Badger Badger badges for 400 Gold.", "g");
            redrawCharPane();
            return;
	    });
    }

    if (cidTextDiv.innerHTML === "") {
        newCidText("Sorry buddy, the only jobs I have left require you to be stronger. Come back when you've levelled up.");
    }
}

// Adds a new paragraph of text on Cid's screen
function newCidText(t) {
    let newElement = document.createElement("p");
    newElement.innerHTML = t;
	cidTextDiv.appendChild(newElement);
}