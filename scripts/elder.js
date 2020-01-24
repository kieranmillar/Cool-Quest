function displayElderText ()
{
    $("#elderText").empty();
    if (player.hp == 0)
    {
        newElderText("Out of HP? One way of healing up is to rest in your house! It costs turns, but it is free!");
    }

    // level 1

    if (player.questTownHall == 0)
    {
        newElderText("Ah it's good to see you. Before we get down to serious business, I have lost the key to the Town Hall's main entrance. I know I have a spare in the Town Hall basement, which you can reach through the hatch round the back, however it has been taken over by marauding bands of spider adventurers. Please can you go in and find it. If you can, I'll give you free roam of the Town Hall!");
        player.questTownHall = 1;
    }
    else if (player.questTownHall == 1)
    {
        newElderText("Any luck finding the key in the Town Hall Basement? Not yet? Please take a look when you next have a chance.");
    }
    else if (player.questTownHall == 2)
    {
        newElderText("Good job finding the key! Just use it from your inventory and access to the Town Hall is all yours!");
    }
    else if (player.questTownHall == 3)
    {
        newElderText("Well done on opening the Town Hall. You are free to explore it if you wish.");
        player.questTownHall = 4;
    }

    //level 2

    if (player.level >= 2 && player.questOrcCamp == 0)
    {
        newElderText("A small army of orcs have gathered on the outskirts of town. We're worried that this could be an attack. Please can you find and talk to their leader.");
        player.questOrcCamp = 1;
    }
    else if (player.questOrcCamp >= 1 && player.questOrcCamp <= 5)
    {
        newElderText("Have you spoken to the leader of the orc camp on the outskirts of town yet? Maybe you can convince one of the majors to let you see the leader.");
    }
    else if (player.questOrcCamp == 6)
    {
        newElderText("So the orcs aren't planning an attack? Well that's good news! I wonder what they are here for? I hope we can trust them.");
        player.questOrcCamp = 7;
    }

    if ($("#elderText").is(':empty')) {
        newElderText("I have nothing for you right now. Please come back later when you are stronger.");
    }
}

function newElderText (t)
{
    let newElement = $('<p></p>');
    newElement.text(t);
	$("#elderText").append(newElement);
}