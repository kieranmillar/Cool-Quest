var combatTextDiv = document.getElementById("combatText");
var monsterImage = document.getElementById("monsterImage");
var monsterAttackImage = document.getElementById("monsterAttackImage");
var combatButtons = document.getElementById("combatButtons");
var monsterNameSpan = document.getElementById("monsterName");
var monsterHPSpan = document.getElementById("monsterHP");
var monsterPowSpan = document.getElementById("monsterPow");
var monsterDefSpan = document.getElementById("monsterDef");
var combatRoundSpan = document.getElementById("combatRound");
var skillDropdown = document.getElementById("skillDropdown");
var itemDropdown = document.getElementById("itemDropdown");
var combatItemRow = document.getElementById("combatItemRow");
var combat_runAwayButton = document.getElementById("combat_runAwayButton");

var monster = {
	id: 0,
	name: "",
	description: "",
	hp: 0,
	pow: 0,
	def: 0,
	init: 0,
	element: elementEnum.PHYSICAL,
	boss: false,
	exp: 0,
	gold: 0,
	drops: [],
	hitMessages: [""], //first message is for criticals
	castPounce: 0,
	castSpecialDelivery: 0,
	castCannonBlast: 0,
	castExposeSecrets: 0,
	stunThisRound: false,
	exposeSecretsRounds: 0,
};

var currentRound = 0;
var lastUsedCombatSkill = -1;

// Adds a paragraph of text to the combat screen
function addCombatText(text) {
	let e = document.createElement("p");
	e.innerHTML = text;
	combatTextDiv.appendChild(e);
}

// Adds a paragraph of text to the combat screen alongside a minion image
function addMinionCombatText(text, id) {
	let e = document.createElement("p");
	e.innerHTML = `<img src="./images/${minions[id].icon}"><span class="wrappableText">${text}</span>`;
	combatTextDiv.appendChild(e);
}

// Gain an item dropped from a combat
function gainItemDrop(id, amount) {
	gainItem(id, amount);
	let e = document.createElement("p");
	e.classList.add("item_Image");
	let amountText = "a";
	if (amount > 1) {
		amountText = amount;
	}
	e.innerHTML = `You found ${amountText} <img src='./images/${items[id].icon}'> ${items[id].name}`;
	e.onclick = function() {
		openModal (modalType.ITEM, id);
	}
	combatTextDiv.appendChild(e);
}

// Starts a new combat. Pass in the full monster object for the first argument, the second argument is optional and will replace the description text
function beginCombat(obj, descriptionOverride = "") {
	if (player.hp == 0 || busy == true) {
		return;
	}
	if (!goToLocation("combat")) {
		return;
	}
	busy = true;
	if (player.combatQueue.length >= 5) {
		player.combatQueue.shift();
	}
	player.combatQueue.push(obj.id);
	monster.id = obj.id;
	monster.name = obj.name;
	if (descriptionOverride == "") {
		monster.description = obj.description;
	}
	else {
		monster.description = descriptionOverride;
	}
	
	monsterImage.src = `./images/big/${obj.icon}`;
	monster.hp = obj.hp + player.effMl;
	if (!"fixedStats" in obj || !obj.fixedStats) {
		// Stats can vary by 10%, with triangular distrbution
		monster.hp += Math.floor(monster.hp * Math.random() * 0.1);
		monster.hp -= Math.floor(monster.hp * Math.random() * 0.1);
	}
	monster.hp = Math.max(monster.hp, 1);
	monster.pow = obj.pow + player.effMl;
	if (!"fixedStats" in obj || !obj.fixedStats) {
		monster.pow += Math.floor(monster.pow * Math.random() * 0.1);
		monster.pow -= Math.floor(monster.pow * Math.random() * 0.1);
	}
	monster.pow = Math.max(monster.pow, 1);
	monster.def = obj.def + player.effMl;
	if ((!"fixedStats" in obj || !obj.fixedStats) && obj.def != 999) {
		monster.def += Math.floor(monster.def * Math.random() * 0.1);
		monster.def -= Math.floor(monster.def * Math.random() * 0.1);
	}
	monster.def = Math.max(monster.def, 0);
	monster.init = obj.init + player.effMl;
	if (!"fixedStats" in obj || !obj.fixedStats) {
		monster.init += Math.floor(monster.init * Math.random() * 0.1);
		monster.init -= Math.floor(monster.init * Math.random() * 0.1);
	}
	if ("element" in obj) {
		monster.element = obj.element;
		switch (obj.element) {
			case elementEnum.FIRE:
				monsterAttackImage.src = "./images/fire.png";
				break;
			case elementEnum.ICE:
				monsterAttackImage.src = "./images/ice.png";
				break;
			case elementEnum.PSYCHIC:
				monsterAttackImage.src = "./images/psychic_brain.png";
				break;
			case elementEnum.EMOTIONAL:
				monsterAttackImage.src = "./images/emotional.png";
				break;
		}
	}
	else {
		monster.element = elementEnum.PHYSICAL;
		monsterAttackImage.src = "./images/sword.png";
	}
	if ("boss" in obj && obj.boss) {
		monster.boss = true;
	}
	else {
		monster.boss = false;
	}
	monster.exp = obj.exp + (player.effMl * 2);
	monster.gold = obj.gold;
	monster.drops = obj.drops;
	monster.hitMessages = obj.hitMessages;
	monster.castPounce = 0;
	monster.castSpecialDelivery = 0;
	monster.castCannonBlast = 0;
	monster.castExposeSecrets = 0;
	monster.stunThisRound = false;
	monster.exposeSecretsRounds = 0;
	combatTextDiv.replaceChildren();
	addCombatText(monster.description);
	currentRound = 0;
	show(combatButtons);
	hide(adventureAgainButton);
	hide(returnToContainerButton);

	if (haveBuff(10)) { // Dramatic Entrance
		addCombatText("As you strut into combat, a camera crew surrounds you and bunches of fireworks set off. One of the fireworks falls over and heads straight for your opponent!");
		let dramaticEntranceDamage = calcFireDamage(20 + player.fireDamage);
		addCombatText("Your opponent takes <span class='fire'>" + dramaticEntranceDamage + "</span> fire damage!");
		monster.hp -= dramaticEntranceDamage;
	}
	if (!checkEndOfCombat()) {
		//calculate who goes first
		if (Math.random() * 100 > player.effInit - monster.init + 50) {
			//monster went first
			addCombatText("The monster's speed gives it the edge!");
			combatRound(-1);
		}
		else {
			currentRound ++;
		}
	}
	redrawCombat();
}

// Redraw the combat screen ui
function redrawCombat() {
	redrawCharPane();
	combatRoundSpan.textContent = currentRound;
	monsterNameSpan.textContent = monster.name;
	monsterHPSpan.textContent = monster.hp;
	monsterPowSpan.textContent = monster.pow;
	monsterDefSpan.textContent = monster.def;
	if (!busy) {
		hide(combatButtons);
	}
	else {
		constructCombatSkillDropdown();
		constructCombatItemDropdown();
		let freeRunAwaysRemaining = player.effFreeRunAways - player.freeRunAwaysUsed;
		if (freeRunAwaysRemaining > 0) {
			combat_runAwayButton.textContent = `Run Away (${freeRunAwaysRemaining} free remaining)`;
		}
		else {
			combat_runAwayButton.textContent = "Run Away";
		}
	}
}

// Constructs the skill dropdown used in combat
function constructCombatSkillDropdown() {
	skillDropdown.replaceChildren();
	let newOption = document.createElement("option");
	newOption.value = -1;
	newOption.textContent = "- Choose a skill -";
	skillDropdown.appendChild(newOption);

	let combatSkillIds = [];
	for (let i = 0; i < skills.length; i++) {
		if (skills[i].category != skillType.COMBAT || !player.skills[i]) {
			continue;
		}
		if (i == 1 && monster.castPounce == 1) {
			continue;
		}
		if (i == 24 && monster.castSpecialDelivery == 1) {
			continue;
		}
		if (i == 43 && monster.castExposeSecrets == 1) {
			continue;
		}
		combatSkillIds.push(i);
	}
	combatSkillIds.sort(function(a, b) {
		if (a === null || a === undefined || b === null || b === undefined) {
			return 0;
		}
		let x = 0;
		let y = 0;
		if("cost" in skills[a]) {
			x = skills[a].cost;
		}
		if("cost" in skills[b]) {
			y = skills[b].cost;
		}
		if (x < y) {return -1;}
		if (x > y) {return 1;}
		return 0;
	});
	for (let id of combatSkillIds) {
		let newOption = document.createElement("option");
		newOption.value = id;
		let cost = Math.max(skills[id].cost - player.effCombatCostReduction, 0);
		newOption.textContent = `${skills[id].name} (${cost} MP)`;
		if (lastUsedCombatSkill == id) {
			newOption.selected = "selected";
		}
		skillDropdown.appendChild(newOption);
	}
}

// Constructs the item dropdown used in combat
function constructCombatItemDropdown() {
	itemDropdown.replaceChildren();
	let newOption = document.createElement("option");
	newOption.value = -1;
	newOption.textContent = "- Choose an item -";
	itemDropdown.appendChild(newOption);

	let itemCount = 0;
	for (let i = 0; i < player.inventory.length; i++) {
		if ("onCombat" in items[player.inventory[i].id]) {
			let newOption = document.createElement("option");
			newOption.value = player.inventory[i].id;
			newOption.textContent = `${items[player.inventory[i].id].name} (${player.inventory[i].amount})`;
			itemDropdown.appendChild(newOption);
			itemCount ++;
		}
	}
	if (itemCount == 0) {
		hide(combatItemRow);
	}
	else {
		show(combatItemRow);
	}
}

// returns if combat is over or not
function checkEndOfCombat() {
	if (player.hp <= 0 && monster.hp <= 0) {
		player.hp = 0;
		monster.hp = 0;
		addCombatText("<strong>It's a tie! You and the enemy both got knocked out at the same time!</strong>");
		addCombatText("<strong>Quite frankly it's embarassing. You should both feel ashamed of yourselves.</strong>");
		addCombatText("<strong>No rewards for you. We're not going to give you anything for being joint loser. We're going to hold you to a higher standard than that.</strong>");
		endAdventure();
		return true;
	}
	else if (player.hp <= 0) {
		player.hp = 0;
		addCombatText("<strong>You got knocked out! Heal up and try again!</strong>");
		endAdventure();
		return true;
	}
	else if (monster.hp <= 0) {
		monster.hp = 0;
		addCombatText("<strong>You win the fight!</strong>");
		minionCombatWin();
		addCombatText(giveExp(monster.exp));
		addCombatText(giveGold(monster.gold, true));
		for (let i = 0; i < monster.drops.length; i++) {
			let totalItemBoost = player.effItemBoost;
			if (items[monster.drops[i].id].category == itemType.FOOD) {
				totalItemBoost += player.effItemBoostFood;
			}
			if (Math.random() * 100 < monster.drops[i].chance  * ((100 + totalItemBoost) / 100)) {
				gainItemDrop(monster.drops[i].id, 1);
			}
		}
		let triggerEnd = true;
		if ("afterCombat" in combats[monster.id]) {
			triggerEnd = combats[monster.id].afterCombat();
		}
		if (triggerEnd) {
			endAdventure();
		}
		return true;
	}
	else {
		return false;
	}
}

// Triggers a round of combat
function combatRound(action) {
	resetHint();
	if (player.hp == 0 || monster.hp == 0 || busy == false) {
		return;
	}
	if (action != -1) {
		combatTextDiv.replaceChildren();
	}
	let damage = 0;
	let usingSkill = -1;
	let usingItem = -1;
	monster.stunThisRound = false;
	switch (action) {
		case -1:
			//monster went first
			break;
		case 0:
			//basic attack
			regularAttack (player.effPow, "You hit the monster.", "You deliver a critical blow!");
			break;
		case 1:
			//use skill
			let selectedSkill = parseInt(skillDropdown.value);
			if (useCombatSkill(selectedSkill)) {
				usingSkill = selectedSkill;
			}
			else {
				return;
			}
			break;
		case 2:
			//use item
			let selectedItem = parseInt(itemDropdown.value);
			if (useCombatItem(selectedItem)) {
				usingItem = selectedItem;
			}
			else {
				return;
			}
			break;
		case 3:
			//run away
			let freeRunAwaysRemaining = player.effFreeRunAways - player.freeRunAwaysUsed;
			let runAwayCostsTurn = true;
			if (freeRunAwaysRemaining > 0) {
				runAwayCostsTurn = false;
				player.freeRunAwaysUsed ++;
			}
			let texts = [];
			if (runAwayCostsTurn) {
				texts = [
					"You nope right out of there as fast as you can.",
					"\"Look over there! A three-headed monkey!\" you shout. As your opponent is distracted you get out of there.",
					"\"Those that fight and run away may live to fight another day\", you tell yourself, as you sprint off at high speed.",
					"\"Ah, uh... sorry, I just remembered I have a dentist appointment right now\", you tell your opponent as you run off."
				];
			}
			else {
				texts = [
					"You talk things over with your opponent and you both agree to go your own seaprate ways.",
					"You negotiate a peace treaty with your opponent and walk away in different directions.",
					"You give your opponent a big hug and they hug you back. You both agree to let things be.",
					"You share funny childhood memories with your opponent, and before you know it, you have made a good friend. You both agree to stop fighting."
				];
			}
			addCombatText(texts[Math.floor(Math.random() * texts.length)]);
			endAdventure(runAwayCostsTurn);
			redrawCombat();
			return;
		default:
			return;
	}
	if (action != -1) {
		minionCombatRound();
	}
	if (monster.castCannonBlast == 2) {
		addCombatText("Fire in the hole! The ground shakes as the cannon fuse burns all the way down and the cannon blasts a giant cannonball at your opponent with an almighty <strong>KABOOM!</strong>");
		let cannonDamage = Math.floor(player.effPow * 1.6) - monster.def;
		cannonDamage = Math.max(cannonDamage, 1);
		addCombatText(`Your opponent takes ${cannonDamage} damage!`);
		monster.hp -= cannonDamage;
		monster.castCannonBlast = 3;
	}
	if (monster.castCannonBlast == 1) {
		monster.castCannonBlast = 2;
	}
	if (!checkEndOfCombat()) {
		if (monster.stunThisRound) {
			// It is the responsibility of the stun source to provide the combat text
		}
		else if (monster.exposeSecretsRounds > 0) {
			monster.exposeSecretsRounds --;
			if (monster.exposeSecretsRounds > 0) {
				addCombatText("Your opponent stands there panicing, with a terrified expression on their face.");
			}
			else {
				addCombatText("Your opponent shakes its head and blinks. Looks like its gotten over the initial shock.");
			}
		}
		else {
			let isCrit = false;
			let overrideStandardAttack = false;
			let overrideCrit = false;
			switch (monster.element) {
				case elementEnum.PHYSICAL:
					damage = Math.floor((monster.pow - player.effDef) * (1 - player.effDamageReduction));
					break;
				case elementEnum.FIRE:
					damage = monster.pow - player.fireRes;
					break;
				case elementEnum.ICE:
					damage = monster.pow - player.iceRes;
					break;
				case elementEnum.PSYCHIC:
					damage = monster.pow - player.psychicRes;
					break;
				case elementEnum.EMOTIONAL:
					damage = monster.pow - player.emotionalRes;
					break;
			}
			if (Math.random() * 100 < 10) {
				isCrit = true;
			}
			if (usingSkill != -1) {
				switch (usingSkill) {
					// placeholder for special overrides when using a skill, if needed
					default:
						break;
				}
			}
			if (usingItem != -1) {
				switch (usingItem) {
					case 7:
						damage = Math.floor(damage * 0.2);
						break;
				}
			}
			if (isCrit == true && overrideCrit == false) {
				damage = Math.ceil(damage * 1.2);
			}
			if ("special" in combats[monster.id]) {
				overrideStandardAttack = combats[monster.id].special();
			}
			if (!overrideStandardAttack) {
				if (isCrit) {
					addCombatText(`<strong>CRITICAL!</strong> ${monster.hitMessages[0]}`);
				}
				else {
					let r = Math.floor(Math.random() * (monster.hitMessages.length - 1)) + 1;
					addCombatText(monster.hitMessages[r]);
				}
			}
			if (usingItem == 7) {
				addCombatText("The cardboard panel shatters into pieces, but at least it dampened the blow.");
			}
			damage = Math.max(damage, 1);
			switch (monster.element) {
				case elementEnum.PHYSICAL:
					addCombatText(`You take ${damage} damage!`);
					break;
				case elementEnum.FIRE:
					addCombatText(`You take <span class='fire'>${damage}</span> fire damage!`);
					break;
				case elementEnum.ICE:
					addCombatText(`You take <span class='ice'>${damage}</span> ice damage!`);
					break;
				case elementEnum.PSYCHIC:
					addCombatText(`You take <span class='psychic'>${damage}</span> psychic damage!`);
					break;
				case elementEnum.EMOTIONAL:
					addCombatText(`You take <span class='emotional'>${damage}</span> emotional damage!`);
					break;
			}
			player.hp -= damage;
			if (haveBuff(7)) { // Storm of the Seas
				damage = calcIceDamage(10 + player.iceDamage);
				addCombatText(`The cold winds from the sea hit your opponent for <span class='ice'>${damage}</span> damage!`);
				monster.hp -= damage;
			}
			if (!checkEndOfCombat()) {
				if (currentRound == 8) {
					addCombatText("<strong>Your opponent is growing impatient, they're about to get very mad. You should look to end this fight quickly.</strong>");
				}
				if (currentRound == 9) {
					addCombatText("<strong>Your opponent is tired of this combat, and completely flips out.</strong>");
				}
				if (currentRound >= 9) {
					let powIncrease = Math.max(5, Math.floor(monster.pow * 0.1));
					addCombatText(`<strong>Your opponent's attack grows by ${powIncrease} due to their rage.</strong>`);
					monster.pow += powIncrease;
				}
			}
		}
	}
	currentRound ++;
	redrawCombat();
}

// Cast a combat skill in combat. Returns if successful
function useCombatSkill(id) {
	if (id == -1) {
		hint ("You didn't choose a skill to cast!", "r");
		return false;
	}
	if(!"onUse" in skills[id]) {
		hint ("That's not a useable skill!", "r");
		return false;
	}
	let cost = Math.max(skills[id].cost - player.effCombatCostReduction, 0);
	if (cost > player.mp) {
		hint ("You haven't got enough MP to cast that skill!", "r");
		return false;
	}
	else {
		player.mp -= cost;
		lastUsedCombatSkill = id;
		if (skills[id].onUse()) {
			return true;
		}
		else {
			player.mp += cost; //refund player MP due to failed skill cast
			return false;
		}
	}
}

// Use an item in combat. Returns if successful
function useCombatItem(id) {
	if (id == -1) {
		hint("You didn't choose an item to use!", "r");
		return false;
	}
	if(!"onCombat" in items[id]) {
		hint ("That item can't be used in combat!", "r");
		return false;
	}
	let amount = getItemAmount(id);
	if (amount == 0) {
		hint("You don't own any of that item!", "r");
		return false;
	}
	items[id].onCombat();
	loseItem(id, 1);
	return true;
}

// Pressing the view button next to the skill dropdown in combat
function pressedViewSkillbutton() {
	let value = parseInt(skillDropdown.value);
	if (value == -1) {
		hint("You didn't choose a skill to view!", "r");
		return false;
	}
	openModal(modalType.SKILL, value);
}

// Pressing the view button next to the item dropdown in combat
function pressedViewItembutton() {
	let value = parseInt(itemDropdown.value);
	if (value == -1) {
		hint("You didn't choose an item to view!", "r");
		return false;
	}
	openModal(modalType.ITEM, value);
}

// Performs a regular attack. 1st argument is the POW value its based on. An empty string for a hit message guarantees a critical hit
function regularAttack(value, hitMessage, critMessage) {
	let crit = false;
	if (hitMessage == "" || Math.random() * 100 < player.effCritChance) {
		crit = true;
	}
	value -= monster.def;
	value = Math.max(value, 1);
	let fireDamage = calcFireDamage(player.fireDamage);
	let iceDamage = calcIceDamage(player.iceDamage);
	let psychicDamage = calcPsychicDamage(player.psychicDamage);
	let emotionalDamage = calcIceDamage(player.emotionalDamage);
	if (crit) {
		value = Math.ceil(value * ((100 + player.effCritMultiplier) / 100));
		addCombatText(`<strong>CRITICAL!</strong> ${critMessage}`);
	}
	else {
		addCombatText(hitMessage);
	}
	let t = `Your opponent takes ${value}`;
	if (fireDamage > 0) {
		t += ` <span class='fire'>+${fireDamage}</span>`
	}
	if (iceDamage > 0) {
		t += ` <span class='ice'>+${iceDamage}</span>`
	}
	if (psychicDamage > 0) {
		t += ` <span class='psychic'>+${psychicDamage}</span>`
	}
	if (emotionalDamage > 0) {
		t += ` <span class='emotional'>+${emotionalDamage}</span>`
	}
	addCombatText(t + " damage!");
	monster.hp -= (value + fireDamage + iceDamage + psychicDamage + emotionalDamage);
}

// Calculate fire damage taken by monster
function calcFireDamage(fireDamage) {
	if (fireDamage == 0) {
		return 0;
	}
	if (monster.element == elementEnum.FIRE) {
		fireDamage = 1;
	}
	if (monster.element == elementEnum.ICE) {
		fireDamage *= 2;
	}
	return fireDamage;
}

// Calculate ice damage taken by monster
function calcIceDamage(iceDamage) {
	if (iceDamage == 0) {
		return 0;
	}
	if (monster.element == elementEnum.FIRE) {
		iceDamage *= 2;
	}
	if (monster.element == elementEnum.ICE) {
		iceDamage = 1;
	}
	return iceDamage;
}

// Calculate psychic damage taken by monster
function calcPsychicDamage(psychicDamage) {
	if (psychicDamage == 0) {
		return 0;
	}
	if (monster.element == elementEnum.PSYCHIC) {
		psychicDamage = 1;
	}
	if (monster.element == elementEnum.EMOTIONAL) {
		psychicDamage *= 2;
	}
	return psychicDamage;
}

// Calculate emotional damage taken by monster
function calcEmotionalDamage(emotionalDamage) {
	if (emotionalDamage == 0) {
		return 0;
	}
	if (monster.element == elementEnum.PSYCHIC) {
		emotionalDamage *= 2;
	}
	if (monster.element == elementEnum.EMOTIONAL) {
		emotionalDamage = 1;
	}
	return emotionalDamage;
}
