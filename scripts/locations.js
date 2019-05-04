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
			if (player.questTutorial >= 5)
			{
				$("#map_townButton").show();
			}
			if (player.questOrcCamp >= 1)
			{
				$("#map_outskirtsButton").show();
			}
			break;
		case "house":
			$("#loc_house").show();
			if (player.questTutorial == 1)
			{
				$("#link_equipment").show();
				$("#inventory_tutorial_2").hide();
				$("#house_normal").hide();
				gainItem(1, 1);
				player.questTutorial = 2;
			}
			else if (player.questTutorial == 2)
			{
			}
			else if (player.questTutorial == 3)
			{
				$(".equip_tutorial").hide();
				$("#link_skills").show();
				player.questTutorial = 4;
			}
			else if (player.questTutorial == 4)
			{
			}
			else if (player.questTutorial == 5)
			{
				$(".buff_tutorial").hide();
				$("#link_town").show();
				$("#link_town_hall").show();
				gainItem(2, 1);
				player.questTutorial = 6;
			}
			else if (player.questTutorial == 6)
			{
			}
			else
			{
			}
			break;
		case "town":
			$("#loc_town").show();
			$(".house_tutorial_3").hide()
			$("#house_normal").show();
			player.questTutorial = 7;
			if (player.questTownHall >= 1)
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
			if (player.questTownHall == 0)
			{
				$("#town_hall_basement").hide();
				$("#town_hall_taxOffice").hide();
				$("#town_hall_canteen").hide();
			}
			else if (player.questTownHall < 3)
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
		case "outskirts":
			$("#loc_outskirts").show();
			break;
		case "orcCamp":
			$("#loc_orcCamp").show();
			break;
		case "toughZoneWarning":
			$("#loc_toughZoneWarning").show();
			$("#recommendedZoneLevel").text(zones[lastZone].level);
			break;
		case "settings":
			$("#loc_settings").show();
			break;
	}
}