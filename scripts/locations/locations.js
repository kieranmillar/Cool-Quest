// Some elements are always present, just hidden, so save them into a variable on startup to avoid navigating the DOM each time

// Loading
var loadingDiv = document.getElementById("loading");
var gameDiv = document.getElementById("game");

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
var location_pen = document.getElementById("loc_pen");
var location_town = document.getElementById("loc_town");
var location_mayor = document.getElementById("loc_mayor");
var location_cid = document.getElementById("loc_cid");
var location_pawnShop = document.getElementById("loc_pawnShop");
var location_shopGeneral = document.getElementById("loc_shopGeneral");
var location_trainer = document.getElementById("loc_trainer");
var location_drellaU = document.getElementById("loc_drellaU");
var location_doctor = document.getElementById("loc_doctor");
var location_townHall = document.getElementById("loc_townHall");
var location_outskirts = document.getElementById("loc_outskirts");
var location_orcCamp = document.getElementById("loc_orcCamp");
var location_mountains = document.getElementById("loc_mountains");
var location_happyville = document.getElementById("loc_happyville");
var location_happyvilleTree = document.getElementById("loc_happyvilleTree");
var location_happyvilleShop = document.getElementById("loc_happyvilleShop");
var location_dungeons = document.getElementById("loc_dungeons");
var location_toughZoneWarning = document.getElementById("loc_toughZoneWarning");
var location_noAdventuresWarning = document.getElementById("loc_noAdventuresWarning");
var location_settings = document.getElementById("loc_settings");

// Various misc buttons
var map_townButton = document.getElementById("map_townButton");
var map_outskirtsButton = document.getElementById("map_outskirtsButton");
var map_mountainsButton = document.getElementById("map_mountainsButton");
var house_sleepButton = document.getElementById("house_sleepButton");
var house_restButton = document.getElementById("house_restButton");
var town_townHallButton = document.getElementById("town_townHallButton");
var townHall_basementButton = document.getElementById("townHall_basementButton");
var townHall_taxOfficeButton = document.getElementById("townHall_taxOfficeButton");
var townHall_canteenButton = document.getElementById("townHall_canteenButton");
var orcCamp_leaderTentButton = document.getElementById("orcCamp_leaderTentButton");
var happyville_bigTreeButton = document.getElementById("happyville_bigTreeButton");
var happyville_santasWorkshopButton = document.getElementById("happyville_santasWorkshopButton");
var dungeons_closedYellowDoorButton = document.getElementById("dungeons_closedYellowDoorButton");
var dungeons_yellowDoorButton = document.getElementById("dungeons_yellowDoorButton");

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
var happyville_intro = document.getElementById("happyville_intro");

// Other misc things
var dungeons_closedYellowDoorText = document.getElementById("dungeons_closedYellowDoorText");
var recommendedZoneLevel = document.getElementById("recommendedZoneLevel");

var busy = false;
var lastZone = -1;

// Changes location i.e. the "page" you are looking at
// Returns if successful
function goToLocation (l) {
	if (busy == true) {
		hint("You're too busy to leave now!", "r");
		return false;
	}
	resetHint();
	locationElements.forEach(location => hide(location));
	switch (l) {
		case "combat":
			show(location_combatDiv);
			break;
		case "noncombat":
			show(location_noncombatDiv);
			break;
		case "intro":
			gainItem(0, 1);
			show(location_intro);
			break;
		case "inventory":
			show(location_inventory);
			displayInventory();
			break;
		case "equipment":
			show(location_equipment);
			displayEquipment();
			break;
		case "skills":
			show(location_skills);
			if (getQuestState(questEnum.TUTORIAL) > 6) {
				hide(buff_tutorial);
			}
			displaySkills();
			break;
		default:
		case "map":
			show(location_map);
			hide(map_townButton);
			hide(map_outskirtsButton);
			hide(map_mountainsButton);
			if (getQuestState(questEnum.TUTORIAL) >= 6) {
				show(map_townButton);
			}
			if (getQuestState(questEnum.ORCCAMP) >= 1) {
				show(map_outskirtsButton);
			}
			if (getQuestState(questEnum.HAPPYVILLE) >= 1) {
				show(map_mountainsButton);
			}
			break;
		case "house":
			show(location_house);
			if (getQuestState(questEnum.TUTORIAL) == 1) {
				show(link_equipment);
				hide(inventory_tutorial2);
				hide(house_normal);
				gainItem(1, 1);
				setQuestState(questEnum.TUTORIAL, 2);
			}
			else if (getQuestState(questEnum.TUTORIAL) == 3) {
				hide(equip_tutorial);
				show(link_skills);
				setQuestState(questEnum.TUTORIAL, 4);
			}
			else if (getQuestState(questEnum.TUTORIAL) == 5) {
				hide(buff_tutorial);
				show(link_town);
				gainItem(2, 1);
				setQuestState(questEnum.TUTORIAL, 6);
			}
			if (player.turnsToMidnight <= 0) {
				show(house_sleepButton);
				hide(house_restButton);
			}
			else {
				hide(house_sleepButton);
				show(house_restButton);
			}
			if (player.freeRestsUsed < player.effFreeRests) {
				house_restButton.innerHTML = `Rest (${player.effFreeRests - player.freeRestsUsed} free rests remaining)`;
			}
			else {
				house_restButton.innerHTML = "Rest (Restore HP and MP) (<img src='./images/adventure.png' title='(1 Adventure)'>)";
			}
			break;
		case "sleep":
			show(location_sleep);
			sleep();
			break;
		case "pen":
			show(location_pen);
			displayPen();
			break;
		case "town":
			show(location_town);
			hide(house_tutorial3);
			show(house_normal);
			if (getQuestState(questEnum.TUTORIAL) == 6) {
				setQuestState(questEnum.TUTORIAL, 7);
			}
			break;
		case "townHall":
			show(location_townHall);
			if (getQuestState(questEnum.TOWNHALL) >= 1) {
				show(townHall_basementButton);
			}
			else {
				hide(townHall_basementButton);
			}
			if (getQuestState(questEnum.TOWNHALL) < 3) {
				hide(townHall_taxOfficeButton);
				hide(townHall_canteenButton);
			}
			else {
				show(townHall_taxOfficeButton);
				show(townHall_canteenButton);
			}
			break;
		case "mayor":
			show(location_mayor);
			displayMayorText();
			break;
		case "cid":
			show(location_cid);
			displayCidText();
			break;
		case "pawnShop":
			show(location_pawnShop);
			displayPawnShop();
			break;
		case "shopGeneral":
			show(location_shopGeneral);
			displayGeneralShop();
			break;
		case "trainer":
			show(location_trainer);
			displayTrainer();
			break;
		case "drellaU":
			show(location_drellaU);
			displayDrellaU();
			break;
		case "doctor":
			show(location_doctor);
			break;
		case "outskirts":
			show(location_outskirts);
			break;
		case "orcCamp":
			show(location_orcCamp);
			if (getQuestState(questEnum.ORCCAMP) == 1) {
				show(orcCamp_intro);
				setQuestState(questEnum.ORCCAMP, 2);
			}
			else {
				hide(orcCamp_intro);
			}
			if (getQuestState(questEnum.ORCCAMP) < 6) {
				orcCamp_leaderTentButton.innerHTML = "Adventure in the Orc Camp Leader's Tent (<img src='./images/adventure.png' title='(1 Adventure)'>)";
			}
			else {
				orcCamp_leaderTentButton.innerHTML = "Visit the Orc Camp Leader's Tent";
			}
			break;
		case "mountains":
			show(location_mountains);
			break;
		case "happyville":
			show(location_happyville);
			if (getQuestState(questEnum.HAPPYVILLE) == 1) {
				show(happyville_intro);
				setQuestState(questEnum.HAPPYVILLE, 2);
			}
			else {
				hide(happyville_intro);
			}
			if (getQuestState(questEnum.HAPPYVILLE) < 4) {
				show(happyville_bigTreeButton);
				hide(happyville_santasWorkshopButton);
			}
			else {
				hide(happyville_bigTreeButton);
				show(happyville_santasWorkshopButton);
			}
			if (getQuestState(questEnum.HAPPYVILLE) < 5) {
				happyville_santasWorkshopButton.innerHTML = "Adventure in Santa's Workshop (<img src='./images/adventure.png' title='(1 Adventure)'>)";
			}
			else {
				happyville_santasWorkshopButton.innerHTML = "Visit Santa's Workshop";
			}
			break;
		case "happyvilleTree":
			show(location_happyvilleTree);
			displayHappyvilleTree();
			break;
		case "happyvilleShop":
			show(location_happyvilleShop);
			displayHappyvilleShop();
			break;
		case "dungeons":
			show(location_dungeons);
			hide(dungeons_closedYellowDoorText);
			if (getQuestState(questEnum.YELLOWKEY) == 0) {
				show(dungeons_closedYellowDoorButton);
				hide(dungeons_yellowDoorButton);
			}
			else {
				hide(dungeons_closedYellowDoorButton);
				show(dungeons_yellowDoorButton);
			}
			break;
		case "toughZoneWarning":
			show(location_toughZoneWarning);
			recommendedZoneLevel.textContent = parseInt(zones[lastZone].level);
			break;
		case "noAdventuresWarning":
			show(location_noAdventuresWarning);
			break;
		case "settings":
			show(location_settings);
			break;
	}
	return true;
}

// Show some text when you click on the closed yellow door in the dungeons
function showClosedYellowDoorText() {
	show(dungeons_closedYellowDoorText);
}
