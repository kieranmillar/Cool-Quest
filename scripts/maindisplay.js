// Some elements are always present, just hidden, so save them into a variable on startup to avoid navigating the DOM each time

var charPaneNameSpan = document.getElementById("char_name");
var charPaneJobSpan = document.getElementById("char_job");
var charPaneLevelSpan = document.getElementById("char_level");
var charPaneGoldSpan = document.getElementById("char_gold");
var charPaneHPSpan = document.getElementById("char_hp");
var charPaneBaseHPMaxSpan = document.getElementById("char_baseHpMax");
var charPaneEffHPMaxSpan = document.getElementById("char_effHpMax");
var charPaneHPProgress = document.getElementById("char_hpProgress");
var charPaneMPSpan = document.getElementById("char_mp");
var charPaneBaseMPMaxSpan = document.getElementById("char_baseMpMax");
var charPaneEffMPMaxSpan = document.getElementById("char_effMpMax");
var charPaneMPProgress = document.getElementById("char_mpProgress");
var charPaneBasePowSpan = document.getElementById("char_basePow");
var charPaneEffPowSpan = document.getElementById("char_effPow");
var charPaneBaseDefSpan = document.getElementById("char_baseDef");
var charPaneEffDefSpan = document.getElementById("char_effDef");
var charPaneBaseInitSpan = document.getElementById("char_baseInit");
var charPaneEffInitSpan = document.getElementById("char_effInit");
var charPaneExpSpan = document.getElementById("char_exp");
var charPaneExpProgress = document.getElementById("char_expProgress");
var charPaneStatExpSpan = document.getElementById("char_statExp");
var charPaneStatExpProgress = document.getElementById("char_statExpProgress");
var charPaneDaySpan = document.getElementById("char_day");
var charPaneTurnsToMidnightSpan = document.getElementById("char_turnsToMidnight");
var charPaneTurnsSpan = document.getElementById("char_turns");
var charPaneFullSpan = document.getElementById("char_full");
var charPaneFullMaxSpan = document.getElementById("char_fullMax");
var charPaneMinionContainerDiv = document.getElementById("char_minionContainer");

var buffPane = document.getElementById("buffPane");
var buffList = document.getElementById("buffList");

var hintBar = document.getElementById("hintBar");

var modal = document.getElementById("modal");
var modal_titleText = document.getElementById("modal_titleText");
var modal_image = document.getElementById("modal_image");
var modal_text = document.getElementById("modal_text");
var modal_enchantment = document.getElementById("modal_enchantment");

// Hide a DOM element
function hide(e) {
	e.classList.add("hide");
}

// Show a DOM element
function show(e) {
	e.classList.remove("hide");
}

// Redraws the character pane
function redrawCharPane() {
	charPaneNameSpan.textContent = player.name;
	switch (player.job) {
		case jobEnum.WRESTLER:
			charPaneJobSpan.textContent = "Wrestler";
			break;
		case jobEnum.MYSTIC:
			charPaneJobSpan.textContent = "Mystic";
			break;
		case jobEnum.PIRATE:
			charPaneJobSpan.textContent = "Pirate";
			break;
	}
	charPaneLevelSpan.textContent = player.level;
	charPaneGoldSpan.textContent = player.gold;

    charPaneHPSpan.textContent = player.hp;
	displayBuffedStat(
		player.baseHpMax,
		player.effHpMax,
		charPaneBaseHPMaxSpan,
		charPaneEffHPMaxSpan
	);
	charPaneHPProgress.value = player.hp;
    charPaneHPProgress.max = player.effHpMax;

	charPaneMPSpan.textContent = player.mp;
	displayBuffedStat(
		player.baseMpMax,
		player.effMpMax,
		charPaneBaseMPMaxSpan,
		charPaneEffMPMaxSpan
	);
	charPaneMPProgress.value = player.mp;
    charPaneMPProgress.max = player.effMpMax;

	displayBuffedStat(
		player.basePow,
		player.effPow,
		charPaneBasePowSpan,
		charPaneEffPowSpan
	);

	displayBuffedStat(
		player.baseDef,
		player.effDef,
		charPaneBaseDefSpan,
		charPaneEffDefSpan
	);

	displayBuffedStat(
		player.baseInit,
		player.effInit,
		charPaneBaseInitSpan,
		charPaneEffInitSpan
	);

    charPaneExpSpan.textContent = `${player.exp}/${levelDeltas[player.level-1]}`;
    charPaneExpProgress.value = player.exp;
    charPaneExpProgress.max = levelDeltas[player.level-1];
	charPaneStatExpSpan.textContent = `${player.expLev}/${statLevelDeltas[player.statLev-1]}`;
    charPaneStatExpProgress.value = player.expLev;
    charPaneStatExpProgress.max = statLevelDeltas[player.statLev-1];

	charPaneDaySpan.textContent = player.day;
	charPaneTurnsToMidnightSpan.textContent = player.turnsToMidnight;
	charPaneTurnsSpan.textContent = player.turns;
    charPaneFullSpan.textContent = player.full;
	charPaneFullMaxSpan.textContent = player.fullMax;

	charPaneMinionContainerDiv.replaceChildren();
	numberOfEquippedMinions = player.equippedMinions.filter(x => x != -1).length;
	if (numberOfEquippedMinions > 0) {
	    charPaneMinionContainerDiv.appendChild(document.createElement("hr"));
		for (let i = 0; i < 2; i++) {
			let thisMinion = player.equippedMinions[i];
			if (thisMinion == -1) {
				continue;
			}
			let newElement = document.createElement("p");
			newElement.classList.add("item_Image");	
			newElement.innerHTML = `<img src="./images/${minions[thisMinion].icon}"><span class="wrappableText">${player.minionNames[thisMinion]} the ${minions[thisMinion].name}</span>`;
			newElement.onclick = function() {
				openModal(modalType.MINION, thisMinion);
			};
			charPaneMinionContainerDiv.appendChild(newElement);
			newElement = document.createElement("p");
			newElement.textContent = `Level: ${getMinionLevel(thisMinion)}`;
			charPaneMinionContainerDiv.appendChild(newElement);
			if (getMinionBaseLevel(thisMinion) < 20) {
				newElement = document.createElement("p");
				newElement.textContent = `Exp: ${player.minionExp[thisMinion]} / ${getMinionBaseLevel(thisMinion) * 6}`;
				charPaneMinionContainerDiv.appendChild(newElement);
				newElement = document.createElement("progress");
				newElement.value = player.minionExp[thisMinion];
				newElement.max = getMinionBaseLevel(thisMinion) * 6;
				charPaneMinionContainerDiv.appendChild(newElement);
			}
		}
	}

	doctor_hp_input.max = player.effHpMax - player.hp;
	doctor_hp_input.value = player.effHpMax - player.hp;
	doctor_hp_input.dispatchEvent(changeEvent);
	doctor_mp_input.max = player.effMpMax - player.mp;
	doctor_mp_input.value = player.effMpMax - player.mp;
	doctor_mp_input.dispatchEvent(changeEvent);
	quickHeal_hp_input.max = player.effHpMax - player.hp;
	quickHeal_hp_input.value = player.effHpMax - player.hp;
	quickHeal_hp_input.dispatchEvent(changeEvent);
	quickHeal_mp_input.max = player.effMpMax - player.mp;
	quickHeal_mp_input.value = player.effMpMax - player.mp;
	quickHeal_mp_input.dispatchEvent(changeEvent);
}

// Display a char pane stat value and its buffed value. Pass in the values and the element references
function displayBuffedStat(baseStat, effStat, baseStatSpan, effStatSpan) {
	if (effStat == baseStat) {
		hide(effStatSpan);
		baseStatSpan.textContent = baseStat;
	}
	else {
		effStatSpan.textContent = effStat;
		show(effStatSpan);
		if (effStat > baseStat) {
			effStatSpan.classList.add("blue");
            effStatSpan.classList.remove("red");
		}
		else {
			effStatSpan.classList.add("red");
            effStatSpan.classList.remove("blue");
		}
		baseStatSpan.textContent = ` (${baseStat})`;
	}
}

// Redraws the buff pane
function redrawBuffPane() {
	buffList.replaceChildren();
	let buffCount = 0;
	for (let buff of player.buffs) {
		let buffDiv = document.createElement("div");
		buffDiv.classList.add("item", "item_Image");
		buffDiv.onclick = function() {
			openModal(modalType.BUFF, buff.id);
		};
		let imageElement = document.createElement("img");
		imageElement.src = `./images/${effects[buff.id].icon}`;
		buffDiv.appendChild(imageElement);
		let text = "";
		if (!player.options[optionEnum.COMPACTBUFFPANE]) {
			text += effects[buff.id].name + " ";
		}
		text += `(${buff.turns})`;
		let textNode = document.createTextNode(text);
		buffDiv.appendChild(textNode);
		buffList.appendChild(buffDiv);
		buffCount ++;
	}
	if (buffCount == 0) {
		hide(buffPane);
	}
	else {
		show(buffPane);
	}
	if (player.options[optionEnum.COMPACTBUFFPANE] == 1) {
		buffPane.classList.add("smallBuffPane");
	}
	else {
		buffPane.classList.remove("smallBuffPane");
	}
}

// Clears the hint from the hint bar
function resetHint() {
	hintBar.textContent = "";
	hintBar.className = "";
	hintBar.style.transitionDuration = "0s";
	hintBar.classList.add("hintBar", "g");
}

// Sets the hint bar text. Arguments are the text, and the single character class name for the colour, g or r (grey or red).
function hint(txt, c) {
	hintBar.textContent = txt;
	hintBar.className = "";
	hintBar.style.transitionDuration = "0s";
	hintBar.classList.add("hintBar", "w");
	setTimeout(function() {
		hintBar.style.transitionDuration = "500ms";
		hintBar.classList.remove("w");
		hintBar.classList.add(c);
	}, 100);
}

const modalType = {
	ITEM: 0,
	SKILL: 1,
	BUFF: 2,
	MINION: 3
}

// Opens the modal which displays info about items/skills etc.
// Arguments are a member of modalType and the id (id context depends on modalType value)
function openModal(type, id) {
	if (id < 0) {
		return;
	}
	if (type == modalType.ITEM) {
		modal_titleText.textContent = items[id].name;
		modal_image.src = `./images/${items[id].icon}`;

		modal_text.replaceChildren();
		let desc = document.createElement("p");
		desc.innerHTML = resolveProperty(items[id].description);
		modal_text.appendChild(desc);
		let itemType = document.createElement("p");
		itemType.textContent = `Type: ${items[id].type}`;
		modal_text.appendChild(itemType);
		let sell = document.createElement("p");
		if(items[id].sell == 0) {
			sell.textContent = "Cannot be sold";
		}
		else {
			sell.textContent = `Sell price: ${items[id].sell} Gold`;
		}
		modal_text.appendChild(sell);

		modal_enchantment.innerText = resolveProperty(items[id].enchantment);
	}
	else if (type == modalType.SKILL) {
		modal_titleText.textContent = skills[id].name;
		modal_image.src = `./images/${skills[id].icon}`;

		modal_text.replaceChildren();
		let desc = document.createElement("p");
		desc.innerHTML = resolveProperty(skills[id].description);
		modal_text.appendChild(desc);
		let skillTypeName = "";
		switch (skills[id].category) {
			case skillType.COMBAT:
				skillTypeName = "Combat";
				break;
			case skillType.NONCOMBAT:
				skillTypeName = "Non-combat";
				break;
			case skillType.PASSIVE:
				skillTypeName = "Passive";
				break;
		}
		let skillTypeParagraph = document.createElement("p");
		skillTypeParagraph.textContent = `Type: ${skillTypeName}`;
		modal_text.appendChild(skillTypeParagraph);
		if ("cost" in skills[id] && skills[id].cost > 0) {
			let cost = document.createElement("p");
			cost.textContent = `Cost: ${skills[id].cost} MP`;
			modal_text.appendChild(cost);
		}

		modal_enchantment.innerText = resolveProperty(skills[id].enchantment);
	}
	else if (type == modalType.BUFF) {
		modal_titleText.textContent = effects[id].name;
		modal_image.src = `./images/${effects[id].icon}`;

		modal_text.replaceChildren();
		let desc = document.createElement("p");
		desc.innerHTML = resolveProperty(effects[id].description);
		modal_text.appendChild(desc);

		modal_enchantment.innerText = resolveProperty(effects[id].enchantment);
	}
	else if (type == modalType.MINION) {
		let title = "";
		if (getMinionOwned(id)) {
			title = `${player.minionNames[id]} the ${minions[id].name}`;
		}
		else {
			title = minions[id].name;
		}
		modal_titleText.textContent = title;

		modal_image.src = `./images/${minions[id].icon}`;

		modal_text.replaceChildren();
		let desc = document.createElement("p");
		desc.innerHTML = resolveProperty(minions[id].description);
		modal_text.appendChild(desc);

		modal_enchantment.innerText = resolveProperty(minions[id].enchantment);
	}
	show(modal);
}

// Close the modal
function closeModal() {
	hide(modal);
}
