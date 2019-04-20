var busy = false;
var currentNoncom = 0;
var lastZone = -1;

function redrawCharPane ()
{
	$("#char_day").text(player.day);
	$("#char_turnsToMidnight").text(player.turnsToMidnight);
	$("#char_turns").text(player.turns);
	$("#char_full").text(player.full);
	$("#char_fullMax").text(player.fullMax);
	$("#char_name").text(player.name);
	$("#char_job").text(player.job);
	$("#char_level").text(player.level);
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
		player.baseStr,
		player.effStr,
		$("#char_baseStr"),
		$("#char_effStr")
	);
	displayBuffedStat (
		player.baseDef,
		player.effDef,
		$("#char_baseDef"),
		$("#char_effDef")
	);
	displayBuffedStat (
		player.baseMag,
		player.effMag,
		$("#char_baseMag"),
		$("#char_effMag")
	);
	displayBuffedStat (
		player.baseSpd,
		player.effSpd,
		$("#char_baseSpd"),
		$("#char_effSpd")
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
	$("#char_gold").text(player.gold);
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

function redrawInfoPane ()
{
	let buffDiv = $("#buffList");
	buffDiv.empty();
	let buffCount = 0;
	for (var i in player.buffs)
	{
		buffDiv.append("<div class='item item_Image' onClick='openDialog (dialogType.BUFF, " + player.buffs[i].id + ");'><img src=./images/" + effects[player.buffs[i].id].icon + ">" + effects[player.buffs[i].id].name + " (" + player.buffs[i].turns + ")</div>");
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

function resolveProperty (input) {
	if (typeof input === 'function'){
        return input();
    } else {
        return input;
    }
}

const dialogType = {
	ITEM: 0,
	SKILL: 1,
	BUFF: 2
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
			if(items[id].hasOwnProperty("equipStat") == true)
			{
				t += "<p>Requirement: " + items[id].equipValue + " " + items[id].equipStat + "</p>";
			}
			t += "<p class='enchantment'>" + items[id].enchantment + "</p>";
			d.html(t);
			break;
		case dialogType.dialogType.SKILL:
			d.dialog( "option", "title", skills[id].name );
			t = "<img src='./images/" + skills[id].icon + "'>";
			t += "<p>" + resolveProperty (skills[id].description) + "</p>";
			t += "<p>Type: " + skills[id].type + "</p>";
			if (skills[id].cost > 0)
			{
				t += "<p>Cost: " + skills[id].cost + " MP</p>";
			}
			t += "<p class='enchantment'>" + skills[id].enchantment + "</p>";
			d.html(t);
			break;
		case dialogType.dialogType.BUFF:
			d.dialog( "option", "title", effects[id].name );
			t = "<img src='./images/" + effects[id].icon + "'>";
			t += "<p>" + resolveProperty (effects[id].description) + "</p>";
			t += "<p class='enchantment'>" + effects[id].enchantment + "</p>";
			d.html(t);
			break;
	}
}

function save()
{
	localStorage.setItem("playerStored", JSON.stringify(player));
	localStorage.setItem("nonComHintsStored", JSON.stringify(nonComHints));
}

function load()
{
	$.extend(true, player, JSON.parse(localStorage.getItem("playerStored")));
	nonComHints = JSON.parse(localStorage.getItem("nonComHintsStored"));
	$("#characterCreation").hide();
	$("#inventory_tutorial_2").hide();
	$(".equip_tutorial").hide();
	$(".buff_tutorial").hide();
	$(".house_tutorial_2").hide();
	$(".house_tutorial_3").hide();
	if (player.questTutorial < 7)
	{
		$(".link").hide();
		$("#link_inventory").show();
		$("#link_map").show();
		$("#link_settings").show();
		$("#house_normal").hide();
		if (player.questTutorial > 0)
		{
			$("#inventory_tutorial_1").hide();
			$("#inventory_tutorial_2").show();
			$("#link_house").show();
		}
		if (player.questTutorial > 1)
		{
			$("#link_equipment").show();
			$("#inventory_tutorial_2").hide();
		}
		if (player.questTutorial > 2)
		{
			$(".equip_tutorial").show();
			$(".house_tutorial_1").hide();
			$(".house_tutorial_2").show();
		}
		if (player.questTutorial > 3)
		{
			$(".equip_tutorial").hide();
			$("#link_skills").show();
		}
		if (player.questTutorial > 4)
		{
			$(".buff_tutorial").show();
			$(".house_tutorial_2").hide();
			$(".house_tutorial_3").show();
		}
		if (player.questTutorial > 5)
		{
			$(".buff_tutorial").hide();
			$("#link_town").show();
			$("#link_dungeon").show();
		}
	}
	else
	{
		$("#inventory_tutorial_1").hide();
		$(".house_tutorial_1").hide();
		$(".house_tutorial_2").hide();
		$(".house_tutorial_3").hide();
		$(".buff_tutorial").hide();
		$(".equip_tutorial").hide();
	}
	goToLocation("map");
	$(".newDay").hide();
	$("#adventureAgainButton").hide();
	calculateStats();
	redrawInfoPane();
}

function wipe() {
	var confirmation = confirm("Are you sure you want to permanently erase your savefile?");
	if(confirmation === true){
		localStorage.clear();
		location.reload(); 
	}
}

$(document).ready(function(){
	$("#dialog").dialog({ autoOpen: false });
	if (localStorage.getItem("playerStored") != null)
	{
		load();
	}
	else
	{
		$("#mainGame").hide();
		$(".link").hide();
		$("#inventory_tutorial_2").hide();
		$(".equip_tutorial").hide();
		$(".buff_tutorial").hide();
		$(".house_tutorial_2").hide();
		$(".house_tutorial_3").hide();
	}
	hint ("Welcome to Cool Quest!", "g");
});