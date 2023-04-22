var combatTextDiv = document.getElementById("combatText");
var monsterImage = document.getElementById("monsterImage");
var monsterAttackImage = document.getElementById("monsterAttackImage");
var combatButtons = document.getElementById("combatButtons");
var monsterNameSpan = document.getElementById("monsterName");
var monsterHPSpan = document.getElementById("monsterHP");
var monsterPowSpan = document.getElementById("monsterPow");
var monsterDefSpan = document.getElementById("monsterDef");
var combatRoundSpan = document.getElementById("combatRound");

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
		openDialog (dialogType.ITEM, id);
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
	if (monster.hp < 1)
		monster.hp = 1;
	monster.pow = obj.pow + player.effMl;
	if (!"fixedStats" in obj || !obj.fixedStats) {
		monster.pow += Math.floor(monster.pow * Math.random() * 0.1);
		monster.pow -= Math.floor(monster.pow * Math.random() * 0.1);
	}
	if (monster.pow < 1)
		monster.pow = 1;
	monster.def = obj.def + player.effMl;
	if ((!"fixedStats" in obj || !obj.fixedStats) && obj.def != 999) {
		monster.def += Math.floor(monster.def * Math.random() * 0.1);
		monster.def -= Math.floor(monster.def * Math.random() * 0.1);
	}
	if (monster.def < 0)
		monster.def = 0;
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
	}
}

// Constructs the skill picker used in combat
function constructCombatSkillDropdown() {
	let e = $("#skillDropdown");
	e.empty();
	let newElement = $('<option></option>');
	newElement.val(-1);
	newElement.text("- Choose a skill -");
	e.append(newElement);
	for (let i = 0; i < skills.length; i++) {
		if (skills[i].category == skillType.COMBAT && player.skills[i] > 0) {
			if (i == 1 && monster.castPounce == 1) {
				continue;
			}
			if (i == 24 && monster.castSpecialDelivery == 1) {
				continue;
			}
			if (i == 43 && monster.castExposeSecrets == 1) {
				continue;
			}
			let newElement = $('<option></option>');
			newElement.val(skills[i].id);
			let cost = Math.max(skills[i].cost - player.effCombatCostReduction, 0);
			newElement.text(skills[i].name + " (" + cost + " MP)");
			if (lastUsedCombatSkill == i) {
				newElement.attr("selected", "selected");
			}
			
			e.append(newElement);
		}
	}
}

function constructCombatItemDropdown ()
{
	let e = $("#itemDropdown");
	e.empty();
	let newElement = $('<option></option>');
	newElement.val(-1);
	newElement.text("- Choose an item -");
	e.append(newElement);
	let itemCount = 0;
	for (let i = 0; i < player.inventory.length; i++)
	{
		if ("onCombat" in items[player.inventory[i].id])
		{
			let newElement = $('<option></option>');
			newElement.val(player.inventory[i].id);
			newElement.text(items[player.inventory[i].id].name + " (" + player.inventory[i].amount + ")");
			e.append(newElement);
			itemCount ++;
		}
	}
	if (itemCount == 0)
	{
		$("combatItemRow").hide();
	}
	else
	{
		$("combatItemRow").show();
	}
}

// returns if combat is over or not
function checkEndOfCombat() {
	if (player.hp <= 0 && monster.hp <= 0) {
		player.hp = 0;
		monster.hp = 0;
		addCombatText ("<strong>It's a tie! You and the enemy both got knocked out at the same time!</strong>");
		addCombatText ("<strong>Quite frankly it's embarassing. You should both feel ashamed of yourselves.</strong>");
		addCombatText ("<strong>No rewards for you. We're not going to give you anything for being joint loser. We're going to hold you to a higher standard than that.</strong>");
		endAdventure();
		return true;
	}
	else if (player.hp <= 0) {
		player.hp = 0;
		addCombatText ("<strong>You got knocked out! Heal up and try again!</strong>");
		endAdventure();
		return true;
	}
	else if (monster.hp <= 0) {
		monster.hp = 0;
		addCombatText ("<strong>You win the fight!</strong>");
		minionCombatWin();
		addCombatText (giveExp (monster.exp));
		addCombatText (giveGold (monster.gold, true));
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
		$("#combatText").empty();
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
			var e = $("#skillDropdown");
			var value = parseInt(e.val());
			if (useCombatSkill(value)) {
				usingSkill = value;
			}
			else {
				return;
			}
			break;
		case 2:
			//use item
			var e = $("#itemDropdown");
			var value = parseInt(e.val());
			if (useCombatItem(value)) {
				usingItem = value;
			}
			else {
				return;
			}
			break;
		default:
			return;
	}
	if (action != -1) {
		minionCombatRound();
	}
	if (monster.castCannonBlast == 2) {
		addCombatText ("Fire in the hole! The ground shakes as the cannon fuse burns all the way down and the cannon blasts a giant cannonball at your opponent with an almighty <strong>KABOOM!</strong>");
			let cannonDamage = Math.floor(player.effPow * 1.6) - monster.def;
			if (cannonDamage <= 0)
			{
				cannonDamage = 1;
			}
			addCombatText ("Your opponent takes " + cannonDamage + " damage!");
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
					addCombatText("<strong>CRITICAL!</strong> " + monster.hitMessages[0]);
				}
				else {
					let r = Math.floor(Math.random() * (monster.hitMessages.length - 1)) + 1;
					addCombatText(monster.hitMessages[r]);
				}
			}
			if (usingItem == 7) {
				addCombatText ("The cardboard panel shatters into pieces, but at least it dampened the blow.");
			}
			if (damage <= 0) {
				damage = 1;
			}
			switch (monster.element) {
				case elementEnum.PHYSICAL:
					addCombatText ("You take " + damage + " damage!");
					break;
				case elementEnum.FIRE:
					addCombatText ("You take <span class='fire'>" + damage + "</span> fire damage!");
					break;
				case elementEnum.ICE:
					addCombatText ("You take <span class='ice'>" + damage + "</span> ice damage!");
					break;
				case elementEnum.PSYCHIC:
					addCombatText ("You take <span class='psychic'>" + damage + "</span> psychic damage!");
					break;
				case elementEnum.EMOTIONAL:
					addCombatText ("You take <span class='emotional'>" + damage + "</span> emotional damage!");
					break;
			}
			player.hp -= damage;
			if (haveBuff(7)) { // Storm of the Seas
				damage = calcIceDamage(10 + player.iceDamage);
				addCombatText("The cold winds from the sea hit your opponent for <span class='ice'>" + damage + "</span> damage!");
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
		hint ("You've got to actually choose a skill to cast!", "r");
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

function useCombatItem (x)
{
	if (x == -1)
	{
		hint ("You've got to actually choose an item to use!", "r");
		return false;
	}
	if(!"onCombat" in items[x])
	{
		hint ("That item can't be used in combat!", "r");
		return false;
	}
	let itemPosition = checkInInventory (x);
	if (itemPosition == -1)
	{
		hint ("You don't own any of that item!", "r");
		return false;
	}
	items[x].onCombat();
	loseItem(x, 1);
	return true;
}

function pressedViewSkillbutton ()
{
	var e = $("#skillDropdown");
	var value = parseInt(e.val());
	if (value == -1)
	{
		hint ("You've got to actually choose a skill to view!", "r");
		return false;
	}
	openDialog (dialogType.SKILL, value);
}

function pressedViewItembutton ()
{
	var e = $("#itemDropdown");
	var value = parseInt(e.val());
	if (value == -1)
	{
		hint ("You've got to actually choose an item to view!", "r");
		return false;
	}
	openDialog (dialogType.ITEM, value);
}

function regularAttack (value, hitMessage, critMessage)
{
	// hitMessage == "" means guaranteed critical
	let crit = false;
	if (hitMessage == "" || Math.random() < player.effCritChance)
	{
		crit = true;
	}
	value -= monster.def;
	value = Math.max(value, 1);
	let fireDamage = calcFireDamage(player.fireDamage);
	let iceDamage = calcIceDamage(player.iceDamage);
	let psychicDamage = calcPsychicDamage(player.psychicDamage);
	let emotionalDamage = calcIceDamage(player.emotionalDamage);
	if (crit)
	{
		value = Math.ceil (value * player.effCritMultiplier);
		addCombatText ("<strong>CRITICAL!</strong> " + critMessage);
	}
	else
	{
		addCombatText (hitMessage);
	}
	let t = "Your opponent takes " + value;
	if (fireDamage > 0)
	{
		t += " <span class='fire'>+" + fireDamage + "</span>"
	}
	if (iceDamage > 0)
	{
		t += " <span class='ice'>+" + iceDamage + "</span>"
	}
	if (psychicDamage > 0)
	{
		t += " <span class='psychic'>+" + psychicDamage + "</span>"
	}
	if (emotionalDamage > 0)
	{
		t += " <span class='emotional'>+" + emotionalDamage + "</span>"
	}
	addCombatText (t + " damage!");
	monster.hp -= (value + fireDamage + iceDamage + psychicDamage + emotionalDamage);
}

function calcFireDamage (fireDamage) {
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

function calcIceDamage (iceDamage) {
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

function calcPsychicDamage (psychicDamage) {
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

function calcEmotionalDamage (emotionalDamage) {
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
