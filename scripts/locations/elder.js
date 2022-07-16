var elderTextDiv = document.getElementById("elderText");

// Called when visiting the Elder, handles all logic of what to display on that screen
function displayElderText() {
    elderTextDiv.textContent = "";
    if (player.hp == 0) {
        newElderText("Out of HP? One way of healing up is to rest in your house! It costs turns instead of gold.");
    }

    // level 1
    if (!player.quests[questEnum.TOWNHALL]) {
        newElderText("Ah it's good to see you. Before we get down to serious business, I have lost the key to the Town Hall's main entrance. I know I have a spare in the Town Hall basement, which you can reach through the hatch round the back, however it has been taken over by marauding bands of spider adventurers. Please can you go in and find it. If you can, I'll give you free roam of the Town Hall!");
        player.quests[questEnum.TOWNHALL] = 1;
    }
    else if (player.quests[questEnum.TOWNHALL] == 1) {
        newElderText("Any luck finding the key in the Town Hall Basement? Not yet? Please take a look when you next have a chance.");
    }
    else if (player.quests[questEnum.TOWNHALL] == 2) {
        newElderText("Good job finding the key! Just use it from your inventory and access to the Town Hall is all yours!");
    }
    else if (player.quests[questEnum.TOWNHALL] == 3) {
		let txt = "Well done on opening the Town Hall. You are free to explore it if you wish.";
		if (player.level <= 1) {
			txt += " You aren't strong enough yet for my next task, come back when you reach level 2.";
		}
        newElderText(txt);
        player.quests[questEnum.TOWNHALL] = 4;
    }

    //level 2
    if (player.level >= 2 && !player.quests[questEnum.ORCCAMP]) {
        newElderText("A small army of orcs have gathered on the outskirts of town. We're worried that this could be an attack. Please can you find and talk to their leader.");
        player.quests[questEnum.ORCCAMP] = 1;
    }
    else if (player.quests[questEnum.ORCCAMP] >= 1 && player.quests[questEnum.ORCCAMP] <= 5) {
        newElderText("Have you spoken to the leader of the orc camp on the outskirts of town yet? Maybe you can convince one of the majors to let you see the leader.");
    }
    else if (player.quests[questEnum.ORCCAMP] == 6) {
		let txt = "So the orcs aren't planning an attack? Well that's good news! I wonder what they are here for? I hope we can trust them.";
		if (player.level <= 2) {
			txt += " You aren't strong enough yet for my next task, come back when you reach level 3.";
		}
        newElderText(txt);
        player.quests[questEnum.ORCCAMP] = 7;
    }

    if (elderTextDiv.textContent === "") {
        newElderText("I have nothing for you right now. Please come back later when you are stronger.");
    }
}

// Adds a new paragraph of text on the Elder screen
function newElderText(t) {
    let newElement = document.createElement("p");
    newElement.textContent = t;
	elderTextDiv.appendChild(newElement);
}
