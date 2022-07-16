var sleepTextDiv = document.getElementById("sleep_text");

// What happens when you sleep in your house at the end of the day
function sleep() {
	sleepTextDiv.textContent = "";
	
	newSleepText("You lie down on your bed and get some well needed rest, so you're ready for the day ahead.");
	
	if (player.juggles.length > 0)
	{
		newSleepText("You can't juggle while sleeping, so you drop all your juggling balls.");
	}
	
	let newElement = document.createElement("h2");
	newElement.textContent = "A new day has begun!";
	sleepTextDiv.appendChild(newElement);
	
	restRecovery();
	player.turnsToMidnight = 40;
	player.day++;
	player.full = 0;
	player.juggles = [];
	redrawCharPane();
	redrawInfoPanel();
}

// Adds a new paragraph of text onto the sleep screen
function newSleepText(t) {
	let newElement = document.createElement("p");
	newElement.textContent = t;
	sleepTextDiv.appendChild(newElement);
}
