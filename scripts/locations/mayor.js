var mayorTextDiv = document.getElementById("mayorText");

// Called when visiting the Mayor, handles all logic of what to display on that screen
function displayMayorText() {
    mayorTextDiv.textContent = "";
    if (player.hp == 0) {
        newMayorText("Out of HP? One way of healing up is to rest in your house! It costs turns instead of the gold you would pay at the doctor.");
    }

    // level 1
    if (!player.quests[questEnum.TOWNHALL]) {
        newMayorText("\"Ah hello, new to this town and looking for work are you? Well, as luck would have it, I have lost the Town Hall's master key. I know I have a spare in the Town Hall basement, which you can reach through the hatch round the back. I'd go get it myself, but the basement has unfortunately been taken over by a band of marauding spider adventurers!\"");
        newMayorText("\"Sounds scary\", you reply. \"How big and dangerous are these spiders? 1 foot tall? 3 feet? Worse?\"");
        newMayorText("\"Oh, ahem, well, actually they are just normal house spiders, but I have a serious case of arachnophobia.\"");
        newMayorText("That doesn't sound to bad, this quest should be a piece of cake!");
        player.quests[questEnum.TOWNHALL] = 1;
        save();
    }
    else if (player.quests[questEnum.TOWNHALL] == 1) {
        newMayorText("\"Any luck finding the key in the Town Hall Basement? Not yet? Please take a look when you next have a chance.\"");
    }
    else if (player.quests[questEnum.TOWNHALL] == 2) {
        newMayorText("\"Good job finding the key! Just use it from your inventory and access to the rest of the Town Hall is all yours!\"");
    }
    else if (player.quests[questEnum.TOWNHALL] == 3) {
        newMayorText("\"Well done on opening the Town Hall. You are free to explore it if you wish.\"");
        player.quests[questEnum.TOWNHALL] = 4;
        finishMayorQuest();
		if (player.level <= 1) {
			newMayorText("\"You aren't strong enough yet for my next task, come back when you reach level 2.\"");
		}
    }

    //level 2
    if (player.level >= 2 && !player.quests[questEnum.ORCCAMP]) {
        newMayorText("\"A small army of orcs have gathered on the outskirts of town. We're worried that this could be an attack. Please can you find and talk to their leader.\"");
        player.quests[questEnum.ORCCAMP] = 1;
        save();
    }
    else if (player.quests[questEnum.ORCCAMP] >= 1 && player.quests[questEnum.ORCCAMP] <= 5) {
        newMayorText("\"Have you spoken to the leader of the orc camp on the outskirts of town yet? Maybe you can convince one of the majors to let you see the leader.\"");
    }
    else if (player.quests[questEnum.ORCCAMP] == 6) {
		newMayorText("\"So the orcs aren't planning an attack? Well that's good news! I wonder what they are here for? I hope we can trust them.\"");
        player.quests[questEnum.ORCCAMP] = 7;
        finishMayorQuest();
		if (player.level <= 2) {
			newMayorText("\"You aren't strong enough yet for my next task, come back when you reach level 3.\"");
		}
    }

    if (mayorTextDiv.textContent === "") {
        newMayorText("\"I have nothing for you right now. Please come back later when you are stronger.\"");
    }
}

// Adds a new paragraph of text on the Mayor screen
function newMayorText(t) {
    let newElement = document.createElement("p");
    newElement.textContent = t;
	mayorTextDiv.appendChild(newElement);
}

function finishMayorQuest() {
    player.mayorQuestsCompleted ++;
    switch (player.mayorQuestsCompleted) {
        case 1:
            newMayorText("\"Sorry, while I'm happy to help out, I don't work for free. I hope you understand\" you reply.");
            newMayorText("\"Ah yes, of course\" says the Mayor. \"There is one small problem. It's very hard to get budget approved to pay for mercenaries, and I'm currently under heavy scrutiny for my personal allowance, if you know what I mean.\"");
            newMayorText("He ponders for a moment. \"Ah, I know just the thing.\" The Mayor pulls out a draw in his desk and hands you a voucher.");
            gainMayorVoucher()
            newMayorText("\"What's this?\" you ask.");
            newMayorText("\"It's a voucher for a course at the town's university, Drella U. While I can;t offer you money, I have plenty of these going spare, a whole drawer full of them.\"");
            newMayorText("It's not really the sort of thing you were looking for, but you suppose it will have to do.");
            break;
        case 2:
            newMayorText("\"I suppose you'll be looking for another reward?\" asks the Mayor. \"I'm afraid I still can only offer you a course voucher.\"");
            newMayorText("\"I do have rent to pay you know\" you reply.");
            newMayorText("\"Yes, well, bureaucracy, you know how it is.\" He hands you another voucher.");
            gainMayorVoucher()
            newMayorText("Well, maybe another one won't hurt.");
            break;
    }
    save();
}

function gainMayorVoucher() {
	gainItem (35, 1);
	let newElement = document.createElement("p");
	newElement.classList.add("item_Image");
	newElement.innerHTML = `You receive a <img src='./images/${items[35].icon}'> ${items[35].name}!`;
	newElement.addEventListener("click", function() {
        openDialog(dialogType.ITEM, 35);
    });
	mayorTextDiv.appendChild(newElement);
}
