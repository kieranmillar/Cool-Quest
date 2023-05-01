var mayorTextDiv = document.getElementById("mayorText");

// Called when visiting the Mayor, handles all logic of what to display on that screen
function displayMayorText() {
    mayorTextDiv.textContent = "";
    if (player.hp == 0) {
        newMayorText("Out of HP? One way of healing up is to rest in your house! It costs turns instead of the gold you would pay at the doctor.");
    }

    // tutorial
    if (getQuestState(questEnum.TUTORIAL) < 8) {
        newMayorText("\"Ah hello, new to this town and looking for work are you? Are you on your own? Where is your sidekick?\"");
        newMayorText("\"Excuse me?\", you reply. \"I work on my own.\"");
        newMayorText("\"You're an adventurer right? You can't work on your own, every adventurer has someone with them. Sidekick, minion, familiar, companion, buddy, whatever you want to call it. I take it you're new to this whole adventuring business?\"");
        newMayorText("\"Well... uh... I was just on my way to get one now actually\", you lie.");
        newMayorText("\"Well I hear the general store in town has some bargains right now on minions. That might be a good place to go.\"");
        newMayorText("You thank the mayor, and set out with a new action plan: 1) Buy a minion from the general store. 2) Head to the pen at your house. 3) Select that minion to travel with you.");
        return;
    }

    // level 1
    if (getQuestState(questEnum.TOWNHALL) == 0 && getQuestState(questEnum.TUTORIAL) == 8) {
        newMayorText("\"Perfect timing, I have some work for you. I have lost the Town Hall's master key. I know I have a spare in the Town Hall basement, which you can reach through the hatch round the back. I'd go get it myself, but the basement has unfortunately been taken over by a band of marauding spider adventurers!\"");
        newMayorText("\"Sounds scary\", you reply. \"How big and dangerous are these spiders? 1 foot tall? 3 feet? Worse?\"");
        newMayorText("\"Oh, ahem, well, actually they are just normal house spiders, but I have a serious case of arachnophobia.\"");
        newMayorText("That doesn't sound to bad, this quest should be a piece of cake!");
        setQuestState(questEnum.TOWNHALL, 1);
    }
    else if (getQuestState(questEnum.TOWNHALL) == 1) {
        newMayorText("\"Any luck finding the key in the Town Hall Basement? Not yet? Please take a look when you next have a chance.\"");
    }
    else if (getQuestState(questEnum.TOWNHALL) == 2) {
        newMayorText("\"Good job finding the key! Just use it from your inventory and access to the rest of the Town Hall is all yours!\"");
    }
    else if (getQuestState(questEnum.TOWNHALL) == 3) {
        newMayorText("\"Well done on opening the Town Hall. You are free to explore it if you wish.\"");
        finishMayorQuest();
        setQuestState(questEnum.TOWNHALL, 4);
        if (player.level <= 1) {
            newMayorText("\"You aren't strong enough yet for my next task, come back when you reach level 2.\"");
        }
    }

    //level 2
    if (player.level >= 2 && getQuestState(questEnum.ORCCAMP) == 0) {
        newMayorText("\"A small army of orcs have gathered on the outskirts of town. We're worried that this could be an attack. Please can you find and talk to their leader.\"");
        setQuestState(questEnum.ORCCAMP, 1);
    }
    else if (getQuestState(questEnum.ORCCAMP) >= 1 && getQuestState(questEnum.ORCCAMP) <= 5) {
        newMayorText("\"Have you spoken to the leader of the orc camp on the outskirts of town yet? Maybe you can convince one of the majors to let you see the leader.\"");
    }
    else if (getQuestState(questEnum.ORCCAMP) == 6) {
        newMayorText("\"So the orcs aren't planning an attack? Well that's good news! I wonder what they are here for? I hope we can trust them.\"");
        finishMayorQuest();
        setQuestState(questEnum.ORCCAMP, 7);
        if (player.level <= 2) {
            newMayorText("\"You aren't strong enough yet for my next task, come back when you reach level 3.\"");
        }
    }

    //level 3
    if (player.level >= 3 && getQuestState(questEnum.HAPPYVILLE) == 0) {
        newMayorText("\"I've had a distress call from a village far off in the mountains to the West called Happyville.\"");
        newMayorText("\"They sound like a friendly bunch.\" you reply.");
        newMayorText("\"Ugh. You'd think so, but they're all so weird. The endless smiling, it's creepy. I think they're part of a strange demon-summoning cult.\"");
        newMayorText("You take a step back. \"Wow, OK, this went a direction I wasn't expecting. I take it you want me to help them? Are you sure they should be helped?\"");
        newMayorText("\"Well I'm certainly not going myself. If you could get them to do whatever you need to do to get them to stop calling me I'd be grateful.\"");
        setQuestState(questEnum.HAPPYVILLE, 1);
    }
    else if (getQuestState(questEnum.HAPPYVILLE) >= 1 && getQuestState(questEnum.HAPPYVILLE) <= 3) {
        newMayorText("\"Hey get a move on solving the problem those crazy Happyville people in the mountains are having! I really don't want them to phone me again, they give me the creeps!\"");
    }
    else if (getQuestState(questEnum.HAPPYVILLE) == 4) {
        newMayorText("\"What have you done? The phone is ringing off the hook now from those Happyville crazies! I wanted the calls reduced, not increased! You'd better solve this as soon as possible!\"");
    }
    else if (getQuestState(questEnum.HAPPYVILLE) == 5) {
        newMayorText("\"So they were a bunch of demon-summoning cultists after all, and you helped them summon the demon but defeated it anyway? Nice going, that should shut them up for a while.\"");
        finishMayorQuest();
        setQuestState(questEnum.HAPPYVILLE, 6);
        if (player.level <= 3) {
            newMayorText("\"You aren't strong enough yet for my next task, come back when you reach level 4.\"");
        }
    }

    //level 4
    if (player.level >= 4 && getQuestState(questEnum.FARM) == 0) {
        newMayorText("\"I've had reports that there's a crowd gathering at Eaty Farm on the outskirts of town. We're normally grateful for some tourism, but I hear these people are, how shall I say this, not a good look. See if you can scare them off.\"");
        setQuestState(questEnum.FARM, 1);
    }
    else if (getQuestState(questEnum.FARM) >= 1 && getQuestState(questEnum.FARM) <= 3) {
        newMayorText("\"How are things at the funny farm? Also, how are things going at Eaty Farm? Haha! Wait, why aren't you laughing?\"");
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

// Finishes a mayor quest. Rewards are not tied to a specific quest, but the number completed
function finishMayorQuest() {
    player.mayorQuestsCompleted++;
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
}

// Gains a Drella U course voucher and appends the item gain paragraph
function gainMayorVoucher() {
    gainItem(35, 1);
    let e = document.createElement("p");
    e.classList.add("item_Image");
    e.innerHTML = `You receive a <img src='./images/${items[35].icon}'> ${items[35].name}`;
    e.onclick = function () {
        openModal(modalType.ITEM, 35);
    }
    mayorTextDiv.appendChild(e);
}
