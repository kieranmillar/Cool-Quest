function redrawCharPane ()
{
	$("#char_day").text(player.day);
	$("#char_turnsToMidnight").text(player.turnsToMidnight);
	$("#char_turns").text(player.turns);
	$("#char_full").text(player.full);
	$("#char_fullMax").text(player.fullMax);
	$("#char_name").text(player.name);
	switch (player.job)
	{
		case jobEnum.WRESTLER:
			$("#char_job").text("Wrestler");
			break;
		case jobEnum.PIRATE:
			$("#char_job").text("Pirate");
			break;
		case jobEnum.MYSTIC:
			$("#char_job").text("Mystic");
			break;
		case jobEnum.JUGGLER:
			$("#char_job").text("Juggler");
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
	for (var i in player.buffs)
	{
		let t = "<div class='item item_Image' onClick='openDialog (dialogType.BUFF, " + player.buffs[i].id + ");'><img src=./images/" + effects[player.buffs[i].id].icon + ">";
		if (player.optionCompactInfoPanel == 0) {
			t += effects[player.buffs[i].id].name + " ";
		}
		t += "(" + player.buffs[i].turns + ")</div>";
		buffDiv.append(t);
		buffCount ++;
	}
	let juggleDiv = $("#juggleList");
	let juggleTitle = $("#juggleTitle");
	juggleDiv.empty();
	let juggleCount = 0;
	for (var i in player.juggles)
	{
		let t = "<div class='item item_Image' onClick='openDialog (dialogType.JUGGLE, " + player.juggles[i] + ");'><img src=./images/" + jugglingBalls[player.juggles[i]].icon + ">";
		if (player.optionCompactInfoPanel == 0) {
			t += jugglingBalls[player.juggles[i]].name + " ";
		}
		juggleDiv.append(t);
		juggleCount ++;
	}
	if (juggleCount != 0)
	{
		juggleTitle.show();
	}
	else
	{
		juggleTitle.hide();
	}
	if (buffCount + juggleCount == 0)
	{
		$("#infoPanel").hide();
	}
	else
	{
		$("#infoPanel").show();
	}
	$("#infoPanel").removeClass();
	if (player.optionCompactInfoPanel == 1)
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
	BUFF: 2,
	JUGGLE: 3,
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
		case dialogType.SKILL:
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
		case dialogType.BUFF:
			d.dialog( "option", "title", effects[id].name );
			t = "<img src='./images/" + effects[id].icon + "'>";
			t += "<p>" + resolveProperty (effects[id].description) + "</p>";
			t += "<p class='enchantment'>" + effects[id].enchantment + "</p>";
			d.html(t);
			break;
		case dialogType.JUGGLE:
			d.dialog( "option", "title", jugglingBalls[id].name );
			t = "<img src='./images/" + jugglingBalls[id].icon + "'>";
			t += "<p>" + resolveProperty (jugglingBalls[id].description) + "</p>";
			t += "<p class='enchantment'>" + resolveProperty (jugglingBalls[id].enchantment) + "</p>";
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
			$("#link_town_hall").show();
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
	redrawInfoPanel();
	if (player.optionCompactInfoPanel)
	{
		$("#option_compactInfoPanel").prop("checked", true);
	}
	else
	{
		$("#option_compactInfoPanel").prop("checked", false);
	}
	if (player.optionQuickHeal)
	{
		$("#quickHeal").show();
		$("#option_quickHeal").prop("checked", true);
	}
	else
	{
		$("#quickHeal").hide();
		$("#option_quickHeal").prop("checked", false);
	}
	if (player.optionZoneWarnings)
	{
		$("#option_zoneWarnings").prop("checked", true);
	}
	else
	{
		$("#option_zoneWarnings").prop("checked", false);
	}
}

function toggleOption(option) {
	switch (option)
	{
		case 'compactInfoPanel':
			if (player.optionCompactInfoPanel == 0)
			{
				player.optionCompactInfoPanel = 1;
			}
			else
			{
				player.optionCompactInfoPanel = 0;
			}
			redrawInfoPanel();
			break;
		case 'quickHeal':
			if (player.optionQuickHeal == 0)
			{
				player.optionQuickHeal = 1;
				$("#quickHeal").show();
			}
			else
			{
				player.optionQuickHeal = 0;
				$("#quickHeal").hide();
			}
			redrawInfoPanel();
			break;
		case 'zoneWarnings':
			if (player.optionZoneWarnings == 0)
			{
				player.optionZoneWarnings = 1;
			}
			else
			{
				player.optionZoneWarnings = 0;
			}
			break;
	}
	save();
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
	$("#doctor_hp_input").change(function(){
		$("#doctor_hp_button").text("Restore (" + parseInt($('#doctor_hp_input').val()) * 2 + " Gold)");
	});
	$("#doctor_mp_input").change(function(){
		$("#doctor_mp_button").text("Restore (" + parseInt($('#doctor_mp_input').val()) * 10 + " Gold)");
	});
	$("#quickHeal_hp_input").change(function(){
		$("#quickHeal_hp_button").text("Restore (" + parseInt($('#quickHeal_hp_input').val()) * 2 + " Gold)");
	});
	$("#quickHeal_mp_input").change(function(){
		$("#quickHeal_mp_button").text("Restore (" + parseInt($('#quickHeal_mp_input').val()) * 10 + " Gold)");
	});
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
		$("#quickHeal").hide();
	}
	hint ("Welcome to Cool Quest!", "g");
});