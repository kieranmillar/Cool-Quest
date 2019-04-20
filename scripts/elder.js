function displayElderText ()
{
    $("#elderText").empty();
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