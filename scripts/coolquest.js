var mainGameDiv = document.getElementById("mainGame");

// Checks if a property of an object is a function, and executes it if so, otherwise returns its value
function resolveProperty(input) {
	if (typeof input === 'function'){
        return input();
    } else {
        return input;
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
	redrawBuffPane();
	if (player.options[optionEnum.COMPACTBUFFPANE]) {
		$("#option_compactBuffPane").prop("checked", true);
	}
	else {
		$("#option_compactBuffPane").prop("checked", false);
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
		case 'compactBuffPane':
			if (!player.options[optionEnum.COMPACTBUFFPANE]) {
				player.options[optionEnum.COMPACTBUFFPANE] = 1;
			}
			else {
				player.options[optionEnum.COMPACTBUFFPANE] = 0;
			}
			redrawBuffPane();
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
			redrawBuffPane();
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
		hide(mainGameDiv);
		linkElements.forEach(link => hide(link));
		hide(inventory_tutorial2);
		hide(equip_tutorial);
		hide(buff_tutorial);
		hide(house_tutorial2);
		hide(house_tutorial3);
		$("#quickHeal").hide();
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
