var charPaneMinionContainerDiv = document.getElementById("char_minionContainer");

function redrawCharPane() {
	$("#char_day").text(player.day);
	$("#char_turnsToMidnight").text(player.turnsToMidnight);
	$("#char_turns").text(player.turns);
	$("#char_full").text(player.full);
	$("#char_fullMax").text(player.fullMax);
	$("#char_name").text(player.name);
	switch (player.job) {
		case jobEnum.WRESTLER:
			$("#char_job").text("Wrestler");
			break;
		case jobEnum.MYSTIC:
			$("#char_job").text("Mystic");
			break;
		case jobEnum.PIRATE:
			$("#char_job").text("Pirate");
			break;
	}
	$("#char_level").text(player.level);
	$("#char_gold").text(player.gold);
	$("#char_hp").text(player.hp);
	displayBuffedStat (
		player.baseHpMax,
		player.effHpMax,
		$("#char_baseHpMax"),
		$("#char_effHpMax")
	);
	$("#char_hpProgress").attr({
		"value": player.hp,
		"max": player.effHpMax
	});
	$("#char_mp").text(player.mp);
	displayBuffedStat (
		player.baseMpMax,
		player.effMpMax,
		$("#char_baseMpMax"),
		$("#char_effMpMax")
	);
	$("#char_mpProgress").attr({
		"value": player.mp,
		"max": player.effMpMax
	});
	displayBuffedStat (
		player.basePow,
		player.effPow,
		$("#char_basePow"),
		$("#char_effPow")
	);
	displayBuffedStat (
		player.baseDef,
		player.effDef,
		$("#char_baseDef"),
		$("#char_effDef")
	);
	displayBuffedStat (
		player.baseInit,
		player.effInit,
		$("#char_baseInit"),
		$("#char_effInit")
	);
	$("#char_exp").text(player.exp + "/" + levelDeltas[player.level-1]);
	$("#char_expProgress").attr({
		"value": player.exp,
		"max": levelDeltas[player.level-1]
	});
	$("#char_statExp").text(player.expLev + "/" + statLevelDeltas[player.statLev-1]);
	$("#char_statExpProgress").attr({
		"value": player.expLev,
		"max": statLevelDeltas[player.statLev-1]
	});
	$("#doctor_hp_input").attr("max", player.effHpMax - player.hp);
	$("#doctor_hp_input").val(player.effHpMax - player.hp);
	$("#doctor_hp_input").trigger("change");
	$("#doctor_mp_input").attr("max", player.effMpMax - player.mp);
	$("#doctor_mp_input").val(player.effMpMax - player.mp);
	$("#doctor_mp_input").trigger("change");
	$("#quickHeal_hp_input").attr("max", player.effHpMax - player.hp);
	$("#quickHeal_hp_input").val(player.effHpMax - player.hp);
	$("#quickHeal_hp_input").trigger("change");
	$("#quickHeal_mp_input").attr("max", player.effMpMax - player.mp);
	$("#quickHeal_mp_input").val(player.effMpMax - player.mp);
	$("#quickHeal_mp_input").trigger("change");

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
			newElement.addEventListener("click", function() {
				openDialog(dialogType.MINION, thisMinion);
			});
			charPaneMinionContainerDiv.appendChild(newElement);
			newElement = document.createElement("p");
			newElement.textContent = `Level: ${getMinionLevel(thisMinion)}`;
			charPaneMinionContainerDiv.appendChild(newElement);
			if (getMinionBaseLevel(thisMinion) < 20) {
				newElement = document.createElement("p");
				newElement.textContent = `Exp: ${player.minionExp[thisMinion]} / ${getMinionBaseLevel(thisMinion) * 6}`;
				charPaneMinionContainerDiv.appendChild(newElement);
				newElement = document.createElement("progress");
				newElement.setAttribute("value", player.minionExp[thisMinion]);
				newElement.setAttribute("max", getMinionBaseLevel(thisMinion) * 6);
				charPaneMinionContainerDiv.appendChild(newElement);
			}
		}
	}

	displayQuestLog();
}

function displayBuffedStat (baseStat, effStat, baseStatSpan, effStatSpan)
{
	let baseSpan = $(baseStatSpan);
	let effSpan = $(effStatSpan);
	if (effStat == baseStat)
	{
		effSpan.hide();
		baseSpan.text(baseStat);
	}
	else
	{
		effSpan.text(effStat);
		effSpan.show();
		if (effStat > baseStat)
		{
			effSpan.css("color", "blue");
		}
		else
		{
			effSpan.css("color", "red");
		}
		baseSpan.text(" (" + baseStat + ")");
	}
}

function redrawInfoPanel ()
{
	let buffDiv = $("#buffList");
	buffDiv.empty();
	let buffCount = 0;
	for (let i in player.buffs)
	{
		let t = "<div class='item item_Image' onClick='openDialog (dialogType.BUFF, " + player.buffs[i].id + ");'><img src=./images/" + effects[player.buffs[i].id].icon + ">";
		if (!player.options[optionEnum.COMPACTINFOPANEL]) {
			t += effects[player.buffs[i].id].name + " ";
		}
		t += "(" + player.buffs[i].turns + ")</div>";
		buffDiv.append(t);
		buffCount ++;
	}
	if (buffCount == 0)
	{
		$("#infoPanel").hide();
	}
	else
	{
		$("#infoPanel").show();
	}
	$("#infoPanel").removeClass();
	if (player.options[optionEnum.COMPACTINFOPANEL] == 1)
	{
		$("#infoPanel").addClass("smallInfoPanel");
	}
}

function resetHint()
{
	let hintDiv = $(".hintBar");
	hintDiv.text("");
	hintDiv.removeClass();
	hintDiv.css("transition-duration", "0s");
	hintDiv.addClass("hintBar g");
}

function hint(txt, c)
{
	let hintDiv = $(".hintBar");
	hintDiv.text(txt);
	hintDiv.removeClass();
	hintDiv.css("transition-duration", "0s");
	hintDiv.addClass("hintBar w");
	setTimeout(function (){
		hintDiv.css("transition-duration", "500ms");
		hintDiv.toggleClass("w");
		hintDiv.toggleClass(c);
	}, 100)
}

// Checks if a property of an object is a function, and executes it if so, otherwise returns its value
function resolveProperty(input) {
	if (typeof input === 'function'){
        return input();
    } else {
        return input;
    }
}

// Hide a DOM element
function hide(e) {
	e.classList.add("hide");
}

// Show a DOM element
function show(e) {
	e.classList.remove("hide");
}

const dialogType = {
	ITEM: 0,
	SKILL: 1,
	BUFF: 2,
	MINION: 3
}

function openDialog (type, id)
{
	if (id < 0)
	{
		return;
	}
	let d = $("#dialog");
	d.dialog("open");
	switch (type)
	{
		case dialogType.ITEM:
			d.dialog( "option", "title", items[id].name );
			t = "<img src='./images/" + items[id].icon + "'>";
			t += "<p>" + resolveProperty (items[id].description) + "</p>";
			t += "<p>Type: " + items[id].type + "</p>";
			if(items[id].sell == 0)
			{
				t += "<p>Cannot be sold</p>";
			}
			else
			{
				t += "<p>Sell price: " + items[id].sell +" gold</p>";
			}
			t += "<p class='enchantment'>" + items[id].enchantment + "</p>";
			d.html(t);
			break;
		case dialogType.SKILL:
			d.dialog( "option", "title", skills[id].name );
			t = "<img src='./images/" + skills[id].icon + "'>";
			t += "<p>" + resolveProperty (skills[id].description) + "</p>";
			let typeText = "";
			switch (skills[id].category) {
				case skillType.COMBAT:
					typeText = "Combat";
					break;
				case skillType.NONCOMBAT:
					typeText = "Non-combat";
					break;
				case skillType.PASSIVE:
					typeText = "Passive";
					break;
			}
			t += "<p>Type: " + typeText + "</p>";
			if ("cost" in skills[id] && skills[id].cost > 0)
			{
				t += "<p>Cost: " + skills[id].cost + " MP</p>";
			}
			t += "<p class='enchantment'>" + resolveProperty (skills[id].enchantment) + "</p>";
			d.html(t);
			break;
		case dialogType.BUFF:
			d.dialog( "option", "title", effects[id].name );
			t = "<img src='./images/" + effects[id].icon + "'>";
			t += "<p>" + resolveProperty (effects[id].description) + "</p>";
			t += "<p class='enchantment'>" + effects[id].enchantment + "</p>";
			d.html(t);
			break;
		case dialogType.MINION:
			let title = "";
			if (getMinionOwned(id)) {
				title = player.minionNames[id] + " the " + minions[id].name;
			}
			else {
				title = minions[id].name;
			}
			d.dialog( "option", "title", title);
			t = "<img src='./images/" + minions[id].icon + "'>";
			t += "<p>" + resolveProperty (minions[id].description) + "</p>";
			t += "<p class='enchantment'>" + minions[id].enchantment + "</p>";
			d.html(t);
			break;
	}
}

// Save the game
function save() {
	localStorage.setItem("playerStored", JSON.stringify(player));
	localStorage.setItem("nonComHintsStored", JSON.stringify(nonComHints));
}

// Equivalent to JQuery's extend function, does a deep copy merge of two objects.
// Needed for merging in the loaded player as current player model may have been added to.
// Taken from GeeWhizBang's answer to https://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
// Takes any number of objects as arguments, and merges them all, giving precedence to the values in objects provided in later arguments
function extend() {
	function forEachIn(obj, fn) {
		let index = 0;
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				fn(obj[key], key, index++);
			}
		}
	}

    let result = {};
    for (let i = 0; i < arguments.length; i++) {
        forEachIn(arguments[i],
            function(obj, key) {
                result[key] = obj;
            });
    }
    return result;
}

// Load the game
function load() {
	player = extend(player, JSON.parse(localStorage.getItem("playerStored")));
	nonComHints = JSON.parse(localStorage.getItem("nonComHintsStored"));
	$("#characterCreation").hide();
	hide(inventory_tutorial2);
	hide(equip_tutorial);
	hide(buff_tutorial);
	hide(house_tutorial2);
	hide(house_tutorial3);

	// If we load mid-tutorial we may have to hide or display some stuff
	if (player.quests[questEnum.TUTORIAL] < 7) {
		linkElements.forEach(link => hide(link));
		show(link_inventory);
		show(link_map);
		show(link_settings);
		show(house_normal);
		if (player.quests[questEnum.TUTORIAL] > 0) {
			hide(inventory_tutorial1);
			show(inventory_tutorial2);
			show(link_house);
		}
		if (player.quests[questEnum.TUTORIAL] > 1) {
			show(link_equipment);
			hide(inventory_tutorial2);
		}
		if (player.quests[questEnum.TUTORIAL] > 2) {
			show(equip_tutorial);
			hide(house_tutorial1);
			show(house_tutorial2);
		}
		if (player.quests[questEnum.TUTORIAL] > 3) {
			hide(equip_tutorial);
			show(link_skills);
		}
		if (player.quests[questEnum.TUTORIAL] > 4) {
			show(buff_tutorial);
			hide(house_tutorial2);
			show(house_tutorial3);
		}
		if (player.quests[questEnum.TUTORIAL] > 5) {
			hide(buff_tutorial);
			show(link_town);
		}
	}
	else {
		hide(inventory_tutorial1);
		hide(house_tutorial1);
		hide(house_tutorial2);
		hide(house_tutorial3);
		hide(buff_tutorial);
		hide(equip_tutorial);
	}

	goToLocation("map");
	hide(adventureAgainButton);
	hide(returnToContainerButton);
	calculateStats();
	redrawInfoPanel();
	if (player.options[optionEnum.COMPACTINFOPANEL]) {
		$("#option_compactInfoPanel").prop("checked", true);
	}
	else {
		$("#option_compactInfoPanel").prop("checked", false);
	}
	if (player.options[optionEnum.QUICKHEAL]) {
		$("#quickHeal").show();
		$("#option_quickHeal").prop("checked", true);
	}
	else {
		$("#quickHeal").hide();
		$("#option_quickHeal").prop("checked", false);
	}
	if (player.options[optionEnum.ZONEWARNINGS]) {
		$("#option_zoneWarnings").prop("checked", true);
	}
	else {
		$("#option_zoneWarnings").prop("checked", false);
	}
	if (player.options[optionEnum.FOODQUALITY]) {
		$("#option_foodQuality").prop("checked", true);
	}
	else {
		$("#option_foodQuality").prop("checked", false);
	}
	if (player.options[optionEnum.CIDQUESTLOG]) {
		$("#option_cidQuestLog").prop("checked", true);
	}
	else {
		$("#option_cidQuestLog").prop("checked", false);
	}
	if (player.options[optionEnum.SORTSKILLSBYSOURCE]) {
		$("#option_sortSkillsBySource").prop("checked", true);
	}
	else {
		$("#option_sortSkillsBySource").prop("checked", false);
	}
}

function toggleOption(option) {
	switch (option)	{
		case 'compactInfoPanel':
			if (!player.options[optionEnum.COMPACTINFOPANEL]) {
				player.options[optionEnum.COMPACTINFOPANEL] = 1;
			}
			else {
				player.options[optionEnum.COMPACTINFOPANEL] = 0;
			}
			redrawInfoPanel();
			break;
		case 'quickHeal':
			if (!player.options[optionEnum.QUICKHEAL]) {
				player.options[optionEnum.QUICKHEAL] = 1;
				$("#quickHeal").show();
			}
			else {
				player.options[optionEnum.QUICKHEAL] = 0;
				$("#quickHeal").hide();
			}
			redrawInfoPanel();
			break;
		case 'zoneWarnings':
			if (!player.options[optionEnum.ZONEWARNINGS]) {
				player.options[optionEnum.ZONEWARNINGS] = 1;
			}
			else {
				player.options[optionEnum.ZONEWARNINGS] = 0;
			}
			break;
		case 'foodQuality':
			if (!player.options[optionEnum.FOODQUALITY]) {
				player.options[optionEnum.FOODQUALITY] = 1;
			}
			else {
				player.options[optionEnum.FOODQUALITY] = 0;
			}
			break;
		case 'cidQuestLog':
			if (!player.options[optionEnum.CIDQUESTLOG]) {
				player.options[optionEnum.CIDQUESTLOG] = 1;
			}
			else {
				player.options[optionEnum.CIDQUESTLOG] = 0;
			}
			displayQuestLog();
			break;
		case 'sortSkillsBySource':
			if (!player.options[optionEnum.SORTSKILLSBYSOURCE]) {
				player.options[optionEnum.SORTSKILLSBYSOURCE] = 1;
			}
			else {
				player.options[optionEnum.SORTSKILLSBYSOURCE] = 0;
			}
			break;
		default:
			console.error("That's not a valid option!");
	}
	save();
}

function wipe() {
	let confirmation = confirm("Are you sure you want to permanently erase your savefile?");
	if (confirmation === true) {
		localStorage.clear();
		location.reload(); 
	}
}

document.addEventListener('DOMContentLoaded', function() {
	$("#dialog").dialog({ autoOpen: false });
	$("#doctor_hp_input").change(function(){
		let hpCost = 2;
		if (player.skills[62]) {
			hpCost = 1;
		}
		$("#doctor_hp_button").text("Restore (" + parseInt($('#doctor_hp_input').val()) * hpCost + " Gold)");
	});
	$("#doctor_mp_input").change(function(){
		let mpCost = 10;
		if (player.skills[62]) {
			mpCost = 8;
		}
		$("#doctor_mp_button").text("Restore (" + parseInt($('#doctor_mp_input').val()) * mpCost + " Gold)");
	});
	$("#quickHeal_hp_input").change(function(){
		let hpCost = 2;
		if (player.skills[62]) {
			hpCost = 1;
		}
		$("#quickHeal_hp_button").text("Restore (" + parseInt($('#quickHeal_hp_input').val()) * hpCost + " Gold)");
	});
	$("#quickHeal_mp_input").change(function(){
		let mpCost = 10;
		if (player.skills[62]) {
			mpCost = 8;
		}
		$("#quickHeal_mp_button").text("Restore (" + parseInt($('#quickHeal_mp_input').val()) * mpCost + " Gold)");
	});
	if (localStorage.getItem("playerStored") != null) {
		load();
	}
	else {
		$("#mainGame").hide();
		linkElements.forEach(link => hide(link));
		hide(inventory_tutorial2);
		hide(equip_tutorial);
		hide(buff_tutorial);
		hide(house_tutorial2);
		hide(house_tutorial3);
		$("#quickHeal").hide();
		$("#option_compactInfoPanel").prop("checked", false);
		$("#option_quickHeal").prop("checked", false);
		$("#option_zoneWarnings").prop("checked", true);
		$("#option_foodQuality").prop("checked", false);
	}
	hide(loadingDiv);
	gameDiv.classList.add("flex");

	hint ("Welcome to Cool Quest!", "g");
});

function debug_giveAllItems() {
	for (let i = 0; i < items.length; i++) {
		gainItem(i, 1);
	}
}

function debug_giveAllSkills() {
	for (let i = 0; i < skills.length; i++) {
		if (!player.skills[i]) {
			player.skills[i] = 1;
		}
	}
}

function debug_giveAllEffects() {
	for (let i = 0; i < effects.length; i++) {
		addBuff(i, 10);
	}
}

function debug_giveAllMinions() {
	for (let i = 0; i < minions.length; i++) {
		if (!getMinionOwned(i)) {
			gainMinion(i);
		}
	}
}
