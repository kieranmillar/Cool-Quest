// Some elements are always present, just hidden, so save them into a variable on startup to avoid navigating the DOM each time

// Links are the top pane icons
var linkElements = document.querySelectorAll(".link");
var link_inventory = document.getElementById("link_inventory");
var link_equipment = document.getElementById("link_equipment");
var link_skills = document.getElementById("link_skills");
var link_map = document.getElementById("link_map");
var link_house = document.getElementById("link_house");
var link_town = document.getElementById("link_town");
var link_settings = document.getElementById("link_settings");

// The locations
var locationElements = document.querySelectorAll(".location");
var location_combatDiv = document.getElementById("loc_combat");
var location_noncombatDiv = document.getElementById("loc_noncombat");
var location_inventory = document.getElementById("loc_inventory");
var location_equipment = document.getElementById("loc_equipment");
var location_skills = document.getElementById("loc_skills");
var location_map = document.getElementById("loc_map");
var location_house = document.getElementById("loc_house");
var location_sleep = document.getElementById("loc_sleep");
var location_town = document.getElementById("loc_town");
var location_elder = document.getElementById("loc_elder");
var location_cid = document.getElementById("loc_cid");
var location_pawnShop = document.getElementById("loc_pawnShop");
var location_shopGeneral = document.getElementById("loc_shopGeneral");
var location_trainer = document.getElementById("loc_trainer");
var location_drellaU = document.getElementById("loc_drellaU");
var location_doctor = document.getElementById("loc_doctor");
var location_townHall = document.getElementById("loc_townHall");
var location_dungeons = document.getElementById("loc_dungeons");
var location_outskirts = document.getElementById("loc_outskirts");
var location_orcCamp = document.getElementById("loc_orcCamp");
var location_toughZoneWarning = document.getElementById("loc_toughZoneWarning");
var location_noAdventuresWarning = document.getElementById("loc_noAdventuresWarning");
var location_settings = document.getElementById("loc_settings");

// Various misc buttons
var map_townButton = document.getElementById("map_townButton");
var map_outskirtsButton = document.getElementById("map_outskirtsButton");
var house_sleepButton = document.getElementById("house_sleepButton");
var house_restButton = document.getElementById("house_restButton");
var town_townHallButton = document.getElementById("town_townHallButton");
var townHall_taxOfficeButton = document.getElementById("townHall_taxOfficeButton");
var townHall_canteenButton = document.getElementById("townHall_canteenButton");
var dungeons_closedYellowDoorButton = document.getElementById("dungeons_closedYellowDoorButton");
var dungeons_yellowDoorButton = document.getElementById("dungeons_yellowDoorButton");
var orcCamp_leaderTentButton = document.getElementById("orcCamp_leaderTentButton");

// Introduction and tutorial texts
var location_intro = document.getElementById("loc_intro");
var inventory_tutorial1 = document.getElementById("inventory_tutorial1");
var inventory_tutorial2 = document.getElementById("inventory_tutorial2");
var equip_tutorial = document.getElementById("equip_tutorial");
var buff_tutorial = document.getElementById("buff_tutorial");
var house_tutorial1 = document.getElementById("house_tutorial1");
var house_tutorial2 = document.getElementById("house_tutorial2");
var house_tutorial3 = document.getElementById("house_tutorial3");
var house_normal = document.getElementById("house_normal");
var orcCamp_intro = document.getElementById("orcCamp_intro");

// Other misc things
var dungeons_closedYellowDoorText = document.getElementById("dungeons_closedYellowDoorText");
var recommendedZoneLevel = document.getElementById("recommendedZoneLevel");

var busy = false;
var currentNoncom = 0;
var lastZone = -1;

// Changes location i.e. the "page" you are looking at
// Returns if successful
function goToLocation (l) {
	if (busy == true) {
		hint ("You're too busy to leave now!", "r");
		return false;
	}
	resetHint();
	locationElements.forEach(location => location.classList.add("hide"));
	switch (l) {
		case "combat":
			location_combatDiv.classList.remove("hide");
			break;
		case "noncombat":
			location_noncombatDiv.classList.remove("hide");
			break;
		case "intro":
			gainItem(0, 1);
			location_intro.classList.remove("hide");
			break;
		case "inventory":
			location_inventory.classList.remove("hide");
			displayInventory();
			break;
		case "equipment":
			location_equipment.classList.remove("hide");
			displayEquipment();
			break;
		case "skills":
			location_skills.classList.remove("hide");
			displaySkills();
			break;
		default:
		case "map":
			location_map.classList.remove("hide");
			map_townButton.classList.add("hide");
			map_outskirtsButton.classList.add("hide");
			if (player.quests[questEnum.TUTORIAL] >= 5) {
				map_townButton.classList.remove("hide");
			}
			if (player.quests[questEnum.ORCCAMP] >= 1) {
				map_outskirtsButton.classList.remove("hide");
			}
			break;
		case "house":
			location_house.classList.remove("hide");
			if (player.quests[questEnum.TUTORIAL] == 1) {
				link_equipment.classList.remove("hide");
				inventory_tutorial2.classList.add("hide");
				house_normal.classList.add("hide");
				gainItem(1, 1);
				player.quests[questEnum.TUTORIAL] = 2;
			}
			else if (player.quests[questEnum.TUTORIAL] == 3) {
				equip_tutorial.classList.add("hide");
				link_skills.classList.remove("hide");
				player.quests[questEnum.TUTORIAL] = 4;
			}
			else if (player.quests[questEnum.TUTORIAL] == 5) {
				buff_tutorial.classList.add("hide");
				link_town.classList.remove("hide");
				gainItem(2, 1);
				player.quests[questEnum.TUTORIAL] = 6;
			}
			if (player.turnsToMidnight <= 0) {
				house_sleepButton.classList.remove("hide");
				house_restButton.classList.add("hide");
			}
			else {
				house_sleepButton.classList.add("hide");
				house_restButton.classList.remove("hide");
			}
			break;
		case "sleep":
			location_sleep.classList.remove("hide");
			sleep();
			break;
		case "town":
			location_town.classList.remove("hide");
			house_tutorial3.classList.add("hide");
			house_normal.classList.remove("hide");
			player.quests[questEnum.TUTORIAL] = 7;
			if (player.quests[questEnum.TOWNHALL] >= 1) {
				town_townHallButton.classList.remove("hide");
			}
			else {
				town_townHallButton.classList.add("hide");
			}
			break;
		case "elder":
			location_elder.classList.remove("hide");
			displayElderText();
			break;
		case "cid":
			location_cid.classList.remove("hide");
			displayCidText();
			break;
		case "pawnShop":
			location_pawnShop.classList.remove("hide");
			displayPawnShop();
			break;
		case "shopGeneral":
			location_shopGeneral.classList.remove("hide");
			break;
		case "trainer":
			location_trainer.classList.remove("hide");
			displayTrainer();
			break;
		case "drellaU":
			location_drellaU.classList.remove("hide");
			displayDrellaU();
			break;
		case "doctor":
			location_doctor.classList.remove("hide");
			break;
		case "townHall":
			location_townHall.classList.remove("hide");
			if (player.quests[questEnum.TOWNHALL] < 3) {
				townHall_taxOfficeButton.classList.add("hide");
				townHall_canteenButton.classList.add("hide");
			}
			else {
				townHall_taxOfficeButton.classList.remove("hide");
				townHall_canteenButton.classList.remove("hide");
			}
			break;
		case "dungeons":
			location_dungeons.classList.remove("hide");
			dungeons_closedYellowDoorText.classList.add("hide");
			if (!player.quests[questEnum.YELLOWKEY]) {
				dungeons_closedYellowDoorButton.classList.remove("hide");
				dungeons_yellowDoorButton.classList.add("hide");
			}
			else {
				dungeons_closedYellowDoorButton.classList.add("hide");
				dungeons_yellowDoorButton.classList.remove("hide");
			}
			break;
		case "outskirts":
			location_outskirts.classList.remove("hide");
			break;
		case "orcCamp":
			location_orcCamp.classList.remove("hide");
			if (player.quests[questEnum.ORCCAMP] == 1) {
				orcCamp_intro.classList.remove("hide");
				player.quests[questEnum.ORCCAMP] = 2;
			}
			else {
				orcCamp_intro.classList.add("hide");
			}
			if (player.quests[questEnum.ORCCAMP] < 6) {
				orcCamp_leaderTentButton.innerHTML = "Adventure in the Orc Camp Leader's Tent (<img src='./images/adventure.png' title='(1 Adventure)'>)";
			}
			else {
				orcCamp_leaderTentButton.innerHTML = "Visit the Orc Camp Leader's Tent";
			}
			break;
		case "toughZoneWarning":
			location_toughZoneWarning.classList.remove("hide");
			recommendedZoneLevel.textContent = parseInt(zones[lastZone].level);
			break;
		case "noAdventuresWarning":
			location_noAdventuresWarning.classList.remove("hide");
			break;
		case "settings":
			location_settings.classList.remove("hide");
			break;
	}
	return true;
}

// Show some text when you click on the closed yellow door in the dungeons
function showClosedYellowDoorText() {
	dungeons_closedYellowDoorText.classList.remove("hide");
}
