function sleep()
{
	$("#sleep_text").empty();
	
	newSleepText("You lie down on your bed and get some well needed rest, so you're ready for the day ahead.");
	
	if (player.juggles.length > 0)
	{
		newSleepText("You can't juggle while sleeping, so you drop all your juggling balls.");
	}
	
	let newElement = $('<h2></h2>');
	newElement.text("A new day has begun!");
	$("#sleep_text").append(newElement);
	
	restRecovery();
	player.turnsToMidnight = 40;
	player.day++;
	player.full = 0;
	player.juggles = [];
	redrawCharPane();
	redrawInfoPanel();
}

function newSleepText(t)
{
	let newElement = $('<p></p>');
	newElement.text(t);
	$("#sleep_text").append(newElement);
}
