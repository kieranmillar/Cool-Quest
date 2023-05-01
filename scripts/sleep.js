var sleepTextDiv = document.getElementById("sleep_text");

// What happens when you sleep in your house at the end of the day
function sleep() {
	sleepTextDiv.textContent = "";

	newSleepText("You lie down on your bed and get some well needed rest, so you're ready for the day ahead.");

	let newElement = document.createElement("h2");
	newElement.textContent = "A new day has begun!";
	sleepTextDiv.appendChild(newElement);

	hint(restRecovery(), "g");
	player.turnsToMidnight = 40;
	player.day++;
	player.full = 0;
	player.castTimeManagement = false;
	player.castLaserPhysics = false;
	player.lawTarget = -1;
	player.journalismTarget = -1;
	player.freeRestsUsed = 0;
	player.freeRunAwaysUsed = 0;
	randomiseDrellaUSkills();
	redrawCharPane();
	redrawBuffPane();
	save();
}

// Adds a new paragraph of text onto the sleep screen
function newSleepText(t) {
	let newElement = document.createElement("p");
	newElement.textContent = t;
	sleepTextDiv.appendChild(newElement);
}

// Rest at your house
function rest() {
	let hintText = "";
	if (player.freeRestsUsed < player.effFreeRests) {
		hintText = restRecovery();
		player.freeRestsUsed++;
		save();
	}
	else {
		if (player.turnsToMidnight <= 0) {
			goToLocation("noAdventuresWarning");
			return;
		}
		hintText = restRecovery();
		endAdventure();
	}
	goToLocation("house");
	hint(hintText, "g");
}

// Recovery granted by resting and sleeping. Returns the hint text
function restRecovery() {
	let hp = Math.floor(Math.random() * 10) + 30;
	let mp = Math.floor(Math.random() * 3) + 5;
	return `${gainHp(hp)} ${gainMp(mp)}`;
}
