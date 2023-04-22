var noncombatTitleDiv = document.getElementById("noncombatTitle");
var noncombatTextDiv = document.getElementById("noncombatText");
var noncombatButtonsContainer = document.getElementById("noncombatButtons");

var nonComHints = [];
var currentNoncom = 0;

// Constructs the text to appear on a non-combat choice button
function noncombatButton(text, choice, hintText) {
	if (nonComHints[currentNoncom] === undefined || nonComHints[currentNoncom] === null) {
		nonComHints[currentNoncom] = [];
	}
	if (nonComHints[currentNoncom][choice] == 1) {
		text += ` (${hintText})`;
	}
	return text;
}

// Execute a non-combat choice button
function noncombatChoice(noncombatId, choiceId) {
	resetHint();
	if (!busy) {
		return;
	}
	noncombatTextDiv.replaceChildren();
	busy = false;
	let costsTurn = noncombats[noncombatId].choices[choiceId].onChoosing();
	nonComHints[noncombatId][choiceId] = 1;
	noncombatButtonsContainer.replaceChildren();
	if (busy) {
		return;
	}
	endAdventure(costsTurn);
}

// Adds a paragraph of text to a non-combat
function addNoncombatText(txt) {
	let e = document.createElement("p");
	e.innerHTML = txt;
	noncombatTextDiv.appendChild(e);
}

// gain an item in a noncombat
function getNoncombatItem(id, amount) {
	gainItem(id, amount);
	let e = document.createElement("p");
	e.classList.add("item_Image");
	let amountText = "a";
	if (amount > 1) {
		amountText = amount;
	}
	e.innerHTML = `You found ${amountText} <img src='./images/${items[id].icon}'> ${items[id].name}`;
	e.onclick = function() {
		openDialog (dialogType.ITEM, id);
	}
	noncombatTextDiv.appendChild(e);
}

// Execute a non-combat adventure
function beginNoncombat(id) {
	if (player.hp == 0 || busy == true) {
		return;
	}
	if (!goToLocation("noncombat")) {
		return;
	}
	busy = true;
	currentNoncom = id;
	noncombatTextDiv.replaceChildren();
	noncombatTitleDiv.textContent = noncombats[id].title;
	addNoncombatText(noncombats[id].description + "<br>");
	hide(adventureAgainButton);
	hide(returnToContainerButton);
	if ("result" in noncombats[id]) {
		noncombats[id].result();
	}
	else {
		for (let i = 0; i < noncombats[id].choices.length; i ++) {
			let e = document.createElement("button");
			e.textContent = resolveProperty(noncombats[id].choices[i].buttonText);
			e.onclick = function() {
				noncombatChoice(id, i);
			};
			noncombatButtonsContainer.appendChild(e);
		}
	}
}
