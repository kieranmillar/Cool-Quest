var skillNonComContainer = document.getElementById("skill_noncom");
var skillComContainer = document.getElementById("skill_com");
var skillPassiveContainer = document.getElementById("skill_passive");
var skillNonComTitle = document.getElementById("skill_noncomTitle");
var skillComTitle = document.getElementById("skill_comTitle");
var skillPassiveTitle = document.getElementById("skill_passiveTitle");

var trainerAllOwnedParagraph = document.getElementById("trainer_allOwned");
var trainerListDiv = document.getElementById("trainer_list");

// Cast a noncombat skill. Returns if successful.
function useNoncombatSkill(x) {
	if (x == -1) {
		hint("That's not a valid skill!", "r");
		return false;
	}
	if (!"onUse" in skills[x]) {
		hint("That's not a useable skill!", "r");
		return false;
	}
	let cost = skills[x].cost;
	if (cost > player.mp) {
		hint("You haven't got enough MP to cast that skill!", "r");
		return false;
	}
	if (skills[x].onUse()) {
		player.mp -= cost;
	}
	redrawCharPane();
	save();
	return true;
}

// Creates an element displaying the skill image and name, and can be clicked to open its description. Returns the element
function createSkillElement(id) {
	let e = document.createElement("span");
	e.classList.add("item_Image");
	let imgElement = document.createElement("img");
	imgElement.src = `./images/${skills[id].icon}`;
	e.appendChild(imgElement);
	let textNode = document.createTextNode(skills[id].name);
	e.appendChild(textNode);
	e.onclick = function () {
		openModal(modalType.SKILL, id);
	};
	return e;
}

// Display the skills menu
function displaySkills() {
	skillNonComContainer.replaceChildren();
	skillComContainer.replaceChildren();
	skillPassiveContainer.replaceChildren();
	let noncomCount = 0;
	let comCount = 0;
	let passiveCount = 0;
	let sortedSkillIds = [];
	for (let i in skills) {
		if (!player.skills[i]) {
			continue;
		}
		sortedSkillIds.push(i);
	}
	if (!player.options[optionEnum.SORTSKILLSBYSOURCE]) {
		sortedSkillIds.sort(function (a, b) {
			if (a === null || a === undefined || b === null || b === undefined) {
				return 0;
			}
			let x = 0;
			let y = 0;
			if ("cost" in skills[a]) {
				x = skills[a].cost;
			}
			if ("cost" in skills[b]) {
				y = skills[b].cost;
			}
			if (x < y) { return -1; }
			if (x > y) { return 1; }
			return 0;
		});
	}
	for (let i of sortedSkillIds) {
		let newElement = document.createElement("div");
		newElement.classList.add("item");
		let textImageDiv = createSkillElement(i);
		newElement.appendChild(textImageDiv);
		switch (skills[i].category) {
			case skillType.NONCOMBAT:
				let addButton = true;
				if (i == 66 && player.castTimeManagement) {
					addButton = false;
				}
				if (addButton) {
					let castButton = createItemElementButton(`Cast\n(${skills[i].cost} MP)`, function () { useNoncombatSkill(i) });
					newElement.appendChild(castButton);
				}
				skillNonComContainer.appendChild(newElement);
				noncomCount++;
				break;
			case skillType.COMBAT:
				skillComContainer.appendChild(newElement);
				comCount++;
				break;
			case skillType.PASSIVE:
				skillPassiveContainer.appendChild(newElement);
				passiveCount++;
				break;
		}
		if (noncomCount == 0) {
			hide(skillNonComTitle);
			hide(skillNonComContainer);
		}
		else {
			show(skillNonComTitle);
			show(skillNonComContainer);
		}
		if (comCount == 0) {
			hide(skillComTitle);
			hide(skillComContainer);
		}
		else {
			show(skillComTitle);
			show(skillComContainer);
		}
		if (passiveCount == 0) {
			hide(skillPassiveTitle);
			hide(skillPassiveContainer);
		}
		else {
			show(skillPassiveTitle);
			show(skillPassiveContainer);
		}
	}
}

// Display the personal trainer
function displayTrainer() {
	trainerListDiv.replaceChildren();
	let lastLevel = 0;
	let skillDisplayCount = 0;
	for (let i in skills) {
		if (player.skills[i]) {
			continue; // already owned
		}
		if (skills[i].source != player.job) {
			continue; // not a purchaseable skill for this class
		}
		if (skills[i].level != lastLevel) {
			lastLevel = skills[i].level;
			let newElement = document.createElement("h2");
			newElement.textContent = `Level ${lastLevel}`;
			trainerListDiv.appendChild(newElement);
		}
		let newElement = document.createElement("div");
		newElement.classList.add("item");
		let textImageDiv = createSkillElement(i);
		newElement.appendChild(textImageDiv);

		let buyButton = createItemElementButton(`Train\n(${skills[i].price} Gold)`, function () { buySkill(i) });
		newElement.appendChild(buyButton);
		trainerListDiv.appendChild(newElement);
		skillDisplayCount++;
	}
	if (skillDisplayCount == 0) {
		show(trainerAllOwnedParagraph);
	}
	else {
		hide(trainerAllOwnedParagraph);
	}
}

// Purchase a skill from the personal trainer
function buySkill(id) {
	if (player.skills[id] > 0) {
		hint("You already own that skill!", "r");
		return;
	}
	if (player.job != skills[id].source) {
		hint("You are the wrong job to learn that!", "r");
		return;
	}
	if (player.level < skills[id].level) {
		hint("You aren't a high enough level to learn that!", "r");
		return;
	}
	if (player.gold < skills[id].price) {
		hint("You can't afford that!", "r");
		return;
	}
	player.gold -= skills[id].price;
	player.skills[id] = 1;
	displayTrainer();
	hint(`You learned the skill ${skills[id].name}!`, "g");
	save();
	calculateStats();
}
