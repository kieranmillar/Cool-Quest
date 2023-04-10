var mayorTextDiv = document.getElementById("mayorText");

// Called when visiting the Mayor, handles all logic of what to display on that screen
function displayMayorText() {
    mayorTextDiv.textContent = "";
    if (player.hp == 0) {
        newMayorText("Out of HP? One way of healing up is to rest in your house! It costs turns instead of the gold you would pay at the doctor.");
    }

    // tutorial
    if (player.quests[questEnum.TUTORIAL] < 8) {
        newMayorText("\"Ah hello, new to this town and looking for work are you? Are you on your own? Where is your sidekick?\"");
        newMayorText("\"Excuse me?\", you reply. \"I work on my own.\"");
        newMayorText("\"You're an adventurer right? You can't work on your own, every adventurer has someone with them. Sidekick, minion, familiar, companion, buddy, whatever you want to call it. I take it you're new to this whole adventuring business?\"");
        newMayorText("\"Well... uh... I was just on my way to get one now actually\", you lie.");
        newMayorText("\"Well I hear the general store in town has some bargains right now on minions. That might be a good place to go.\"");
        newMayorText("You thank the mayor, and set out with a new action plan: 1) Buy a minion from the general store. 2) Head to the pen at your house. 3) Select that minion to travel with you.");
        save();
        return;
    }

    // level 1
    if (!player.quests[questEnum.TOWNHALL] && player.quests[questEnum.TUTORIAL] == 8) {
        newMayorText("\"Perfect timing, I have some work for you. I have lost the Town Hall's master key. I know I have a spare in the Town Hall basement, which you can reach through the hatch round the back. I'd go get it myself, but the basement has unfortunately been taken over by a band of marauding spider adventurers!\"");
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

    //level 3
    if (player.level >= 3 && !player.quests[questEnum.HAPPYVILLE]) {
        newMayorText("\"I've had a distress call from a village far off in the mountains to the West called Happyville.\"");
        newMayorText("\"They sound like a friendly bunch.\" you reply.");
        newMayorText("\"Ugh. You'd think so, but they're all so weird. The endless smiling, it's creepy. I think they're part of a strange demon-summoning cult.\"");
        newMayorText("You take a step back. \"Wow, OK, this went a direction I wasn't expecting. I take it you want me to help them? Are you sure they should be helped?\"");
        newMayorText("\"Well I'm certainly not going myself. If you could get them to do whatever you need to do to get them to stop calling me I'd be grateful.\"");
        player.quests[questEnum.HAPPYVILLE] = 1;
        save();
    }
    else if (player.quests[questEnum.HAPPYVILLE] >= 1  && player.quests[questEnum.HAPPYVILLE] <= 4) {
        newMayorText("\"Hey get a move on solving the problem those crazy Happyville people in the mountains are having! I really don't want them to phone me again, they give me the creeps!\"");
    }
    else if (player.quests[questEnum.HAPPYVILLE] == 5) {
		newMayorText("\"So they were a bunch of demon-summoning cultists after all, and you helped them summon the demon but defeated it anyway? Nice going, that should shut them up for a while.\"");
        player.quests[questEnum.HAPPYVILLE] = 6;
        finishMayorQuest();
		if (player.level <= 3) {
			newMayorText("\"You aren't strong enough yet for my next task, come back when you reach level 4.\"");
		}
    }

    if (mayorTextDiv.textContent === "") {
        newMayorText("\"I have nothing for you right now. Please come back later when you are stronger.\"");
    }

    displayQuestLog();
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
            newMayorText("\"It's a voucher for a course at the town's university, Drella U. While I can't offer you money, I have plenty of these going spare, a whole drawer full of them.\"");
            newMayorText("It's not really the sort of thing you were looking for, but you suppose it will have to do.");
            break;
        case 2:
            newMayorText("\"I suppose you'll be looking for another reward?\" asks the Mayor. \"I'm afraid I still can only offer you a course voucher.\"");
            newMayorText("\"I do have rent to pay you know\" you reply.");
            newMayorText("\"Yes, well, bureaucracy, you know how it is.\" He hands you another voucher.");
            gainMayorVoucher()
            newMayorText("Well, maybe another one won't hurt.");
            break;
        case 3:
            newMayorText("\"So... when it comes to a reward, are you planning on giving me another voucher?\" you ask.");
            newMayorText("\"Oh, that's what you want is it? I wasn't going to but if that's what you want then sure, have another one.\" The mayor opens his drawer.");
            newMayorText("\"No wait, that's not what...\"");
            gainMayorVoucher()
            newMayorText("\"I'm glad I could provide you with the reward that you really wanted. Here's hoping the next work I have for you will go this well!\"");
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
