var mainGameDiv = document.getElementById("mainGame");

// Doctor
var quickHealDiv = document.getElementById("quickHeal");
var doctor_hp_input = document.getElementById("doctor_hp_input");
var doctor_hp_button = document.getElementById("doctor_hp_button");
var doctor_mp_input = document.getElementById("doctor_mp_input");
var doctor_mp_button = document.getElementById("doctor_mp_button");
var quickHeal_hp_input = document.getElementById("quickHeal_hp_input");
var quickHeal_hp_button = document.getElementById("quickHeal_hp_button");
var quickHeal_mp_input = document.getElementById("quickHeal_mp_input");
var quickHeal_mp_button = document.getElementById("quickHeal_mp_button");
const changeEvent = new CustomEvent("change");

// Options checkboxes
var option_compactBuffPaneCheckbox = document.getElementById("option_compactBuffPane");
var option_quickHealCheckbox = document.getElementById("option_quickHeal");
var option_zoneWarningsCheckbox = document.getElementById("option_zoneWarnings");
var option_foodQualityCheckbox = document.getElementById("option_foodQuality");
var option_cidQuestLogCheckbox = document.getElementById("option_cidQuestLog");
var option_sortSkillsBySourceCheckbox = document.getElementById("option_sortSkillsBySource");

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
	hide(characterCreationDiv);
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

	option_compactBuffPaneCheckbox.checked = player.options[optionEnum.COMPACTBUFFPANE];
	option_quickHealCheckbox.checked = player.options[optionEnum.QUICKHEAL];
	if (player.options[optionEnum.QUICKHEAL]) {
		show(quickHealDiv);
	}
	else {
		hide(quickHealDiv);
	}
	option_zoneWarningsCheckbox.checked = player.options[optionEnum.ZONEWARNINGS];
	option_foodQualityCheckbox.checked = player.options[optionEnum.FOODQUALITY];
	option_cidQuestLogCheckbox.checked = player.options[optionEnum.CIDQUESTLOG];
	option_sortSkillsBySourceCheckbox.checked = player.options[optionEnum.SORTSKILLSBYSOURCE];
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
				show(quickHealDiv);
			}
			else {
				player.options[optionEnum.QUICKHEAL] = 0;
				hide(quickHealDiv);
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

	doctor_hp_input.addEventListener("change", function() {
		let hpCost = 2;
		if (player.skills[62]) {
			hpCost = 1;
		}
		doctor_hp_button.textContent = `Restore (${parseInt(doctor_hp_input.value) * hpCost} Gold)`;
	});
	doctor_mp_input.addEventListener("change", function() {
		let mpCost = 10;
		if (player.skills[62]) {
			mpCost = 8;
		}
		doctor_mp_button.textContent = `Restore (${parseInt(doctor_mp_input.value) * mpCost} Gold)`;
	});
	quickHeal_hp_input.addEventListener("change", function() {
		let hpCost = 2;
		if (player.skills[62]) {
			hpCost = 1;
		}
		quickHeal_hp_button.textContent = `Restore (${parseInt(quickHeal_hp_input.value) * hpCost} Gold)`;
	});
	quickHeal_mp_input.addEventListener("change", function() {
		let mpCost = 10;
		if (player.skills[62]) {
			mpCost = 8;
		}
		quickHeal_mp_button.textContent = `Restore (${parseInt(quickHeal_mp_input.value) * mpCost} Gold)`;
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
		hide(quickHealDiv);
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
