var busy = false;
var currentNoncom = 0;
var lastZone = -1;

function goToLocation (l)
{
	if (busy == true)
	{
		hint ("You're too busy to leave now!", "r");
		return;
	}
	resetHint ();
	$(".location").hide();
	switch (l) {
		case "combat":
			$("#loc_combat").show();
			break;
		case "noncombat":
			$("#loc_noncombat").show();
			break;
		case "intro":
			gainItem(0, 1);
			$("#loc_intro").show();
			break;
		case "inventory":
			$("#loc_inventory").show();
			displayInventory();
			break;
		case "equipment":
			$("#loc_equipment").show();
			displayEquipment();
			break;
		case "skills":
			$("#loc_skills").show();
			displaySkills();
			break;
		default:
		case "map":
			$("#loc_map").show();
			$("#map_townButton").hide();
			$("#map_outskirtsButton").hide();
			if (player.quests[questEnum.TUTORIAL] >= 5)
			{
				$("#map_townButton").show();
			}
			if (player.quests[questEnum.ORCCAMP] >= 1)
			{
				$("#map_outskirtsButton").show();
			}
			break;
		case "house":
			$("#loc_house").show();
			if (player.quests[questEnum.TUTORIAL] == 1)
			{
				$("#link_equipment").show();
				$("#inventory_tutorial_2").hide();
				$("#house_normal").hide();
				gainItem(1, 1);
				player.quests[questEnum.TUTORIAL] = 2;
			}
			else if (player.quests[questEnum.TUTORIAL] == 3)
			{
				$(".equip_tutorial").hide();
				$("#link_skills").show();
				player.quests[questEnum.TUTORIAL] = 4;
			}
			else if (player.quests[questEnum.TUTORIAL] == 5)
			{
				$(".buff_tutorial").hide();
				$("#link_town").show();
				$("#link_town_hall").show();
				gainItem(2, 1);
				player.quests[questEnum.TUTORIAL] = 6;
			}
			if (player.turnsToMidnight <= 0)
			{
				$("#house_sleep_button").show();
				$("#house_rest_button").hide();
			}
			else
			{
				$("#house_sleep_button").hide();
				$("#house_rest_button").show();
			}
			break;
		case "sleep":
			$("#loc_sleep").show();
			sleep();
			break;
		case "town":
			$("#loc_town").show();
			$(".house_tutorial_3").hide()
			$("#house_normal").show();
			player.quests[questEnum.TUTORIAL] = 7;
			if (player.quests[questEnum.TOWNHALL] >= 1)
			{
				$("#town_area_town_hall").show();
			}
			else
			{
				$("#town_area_town_hall").hide();
			}
			break;
		case "elder":
			$("#loc_elder").show();
			displayElderText();
			break;
		case "cid":
			$("#loc_cid").show();
			displayCidText();
			break;
		case "pawnShop":
			$("#loc_pawnShop").show();
			displayPawnShop();
			break;
		case "shopGeneral":
			$("#loc_shopGeneral").show();
			break;
		case "trainer":
			$("#loc_trainer").show();
			displayTrainer();
			break;
		case "doctor":
			$("#loc_doctor").show();
			break;
		case "town_hall":
			$("#loc_town_hall").show();
			if (!player.quests[questEnum.TOWNHALL])
			{
				$("#town_hall_basement").hide();
				$("#town_hall_taxOffice").hide();
				$("#town_hall_canteen").hide();
			}
			else if (player.quests[questEnum.TOWNHALL] < 3)
			{
				$("#town_hall_basement").show();
				$("#town_hall_taxOffice").hide();
				$("#town_hall_canteen").hide();
			}
			else
			{
				$("#town_hall_basement").show();
				$("#town_hall_taxOffice").show();
				$("#town_hall_canteen").show();
			}
			break;
		case "dungeons":
			$("#loc_dungeons").show();
			$("#dungeons_closedYellowDoorText").hide();
			if (!player.quests[questEnum.YELLOWKEY])
			{
				$("#dungeons_closedYellowDoor").show();
				$("#dungeons_yellowDoor").hide();
			}
			else
			{
				$("#dungeons_closedYellowDoor").hide();
				$("#dungeons_yellowDoor").show();
			}
			break;
		case "outskirts":
			$("#loc_outskirts").show();
			break;
		case "orcCamp":
			$("#loc_orcCamp").show();
			if (player.quests[questEnum.ORCCAMP] == 1)
			{
				$(".orcCamp_intro").show();
				player.quests[questEnum.ORCCAMP] = 2;
			}
			else
			{
				$(".orcCamp_intro").hide();
			}
			break;
		case "toughZoneWarning":
			$("#loc_toughZoneWarning").show();
			$("#recommendedZoneLevel").text(zones[lastZone].level);
			break;
		case "noAdventuresWarning":
			$("#loc_noAdventuresWarning").show();
			break;
		case "settings":
			$("#loc_settings").show();
			break;
	}
}

function showClosedYellowDoorText()
{
	$("#dungeons_closedYellowDoorText").show();
}
