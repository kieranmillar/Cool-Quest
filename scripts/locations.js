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
				$("#link_dungeon").show();
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
		case "dungeon":
			$("#loc_dungeon").show();
			if (player.questTownHall == 0)
			{
				$("#dungeon_basement").hide();
				$("#dungeon_taxOffice").hide();
			}
			else if (player.questTownHall < 3)
			{
				$("#dungeon_basement").show();
				$("#dungeon_taxOffice").hide();
			}
			else
			{
				$("#dungeon_basement").show();
				$("#dungeon_taxOffice").show();
			}
			break;
		case "settings":
			$("#loc_settings").show();
			break;
	}
}