// Some elements are always present, just hidden, so save them into a variable on startup to avoid navigating the DOM each time

// Character pane
var charPaneNameSpan = document.getElementById("char_name");
var charPaneJobSpan = document.getElementById("char_job");
var charPaneLevelSpan = document.getElementById("char_level");
var charPaneGoldSpan = document.getElementById("char_gold");
var charPaneHPSpan = document.getElementById("char_hp");
var charPaneBaseHPMaxSpan = document.getElementById("char_baseHpMax");
var charPaneEffHPMaxSpan = document.getElementById("char_effHpMax");
var charPaneHPProgress = document.getElementById("char_hpProgress");
var charPaneMPSpan = document.getElementById("char_mp");
var charPaneBaseMPMaxSpan = document.getElementById("char_baseMpMax");
var charPaneEffMPMaxSpan = document.getElementById("char_effMpMax");
var charPaneMPProgress = document.getElementById("char_mpProgress");
var charPaneBasePowSpan = document.getElementById("char_basePow");
var charPaneEffPowSpan = document.getElementById("char_effPow");
var charPaneBaseDefSpan = document.getElementById("char_baseDef");
var charPaneEffDefSpan = document.getElementById("char_effDef");
var charPaneBaseInitSpan = document.getElementById("char_baseInit");
var charPaneEffInitSpan = document.getElementById("char_effInit");
var charPaneExpSpan = document.getElementById("char_exp");
var charPaneExpProgress = document.getElementById("char_expProgress");
var charPaneStatExpSpan = document.getElementById("char_statExp");
var charPaneStatExpProgress = document.getElementById("char_statExpProgress");
var charPaneDaySpan = document.getElementById("char_day");
var charPaneTurnsToMidnightSpan = document.getElementById("char_turnsToMidnight");
var charPaneTurnsSpan = document.getElementById("char_turns");
var charPaneFullSpan = document.getElementById("char_full");
var charPaneFullMaxSpan = document.getElementById("char_fullMax");

var charPaneMinionContainerDiv = document.getElementById("char_minionContainer");

// Buff pane


// Hide a DOM element
function hide(e) {
	e.classList.add("hide");
}

// Show a DOM element
function show(e) {
	e.classList.remove("hide");
}

// Redraws the character pane
function redrawCharPane() {
	charPaneNameSpan.textContent = player.name;
	switch (player.job) {
		case jobEnum.WRESTLER:
			charPaneJobSpan.textContent = "Wrestler";
			break;
		case jobEnum.MYSTIC:
			charPaneJobSpan.textContent = "Mystic";
			break;
		case jobEnum.PIRATE:
			charPaneJobSpan.textContent = "Pirate";
			break;
	}
	charPaneLevelSpan.textContent = player.level;
	charPaneGoldSpan.textContent = player.gold;

    charPaneHPSpan.textContent = player.hp;
	displayBuffedStat(
		player.baseHpMax,
		player.effHpMax,
		charPaneBaseHPMaxSpan,
		charPaneEffHPMaxSpan
	);
	charPaneHPProgress.value = player.hp;
    charPaneHPProgress.max = player.effHpMax;

	charPaneMPSpan.textContent = player.mp;
	displayBuffedStat(
		player.baseMpMax,
		player.effMpMax,
		charPaneBaseMPMaxSpan,
		charPaneEffMPMaxSpan
	);
	charPaneMPProgress.value = player.mp;
    charPaneMPProgress.max = player.effMpMax;

	displayBuffedStat(
		player.basePow,
		player.effPow,
		charPaneBasePowSpan,
		charPaneEffPowSpan
	);

	displayBuffedStat(
		player.baseDef,
		player.effDef,
		charPaneBaseDefSpan,
		charPaneEffDefSpan
	);

	displayBuffedStat(
		player.baseInit,
		player.effInit,
		charPaneBaseInitSpan,
		charPaneEffInitSpan
	);

    charPaneExpSpan.textContent = `${player.exp}/${levelDeltas[player.level-1]}`;
    charPaneExpProgress.value = player.exp;
    charPaneExpProgress.max = levelDeltas[player.level-1];
	charPaneStatExpSpan.textContent = `${player.expLev}/${statLevelDeltas[player.statLev-1]}`;
    charPaneStatExpProgress.value = player.expLev;
    charPaneStatExpProgress.max = statLevelDeltas[player.statLev-1];

	charPaneDaySpan.textContent = player.day;
	charPaneTurnsToMidnightSpan.textContent = player.turnsToMidnight;
	charPaneTurnsSpan.textContent = player.turns;
    charPaneFullSpan.textContent = player.full;
	charPaneFullMaxSpan.textContent = player.fullMax;

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
			newElement.onclick = function() {
				openDialog(dialogType.MINION, thisMinion);
			};
			charPaneMinionContainerDiv.appendChild(newElement);
			newElement = document.createElement("p");
			newElement.textContent = `Level: ${getMinionLevel(thisMinion)}`;
			charPaneMinionContainerDiv.appendChild(newElement);
			if (getMinionBaseLevel(thisMinion) < 20) {
				newElement = document.createElement("p");
				newElement.textContent = `Exp: ${player.minionExp[thisMinion]} / ${getMinionBaseLevel(thisMinion) * 6}`;
				charPaneMinionContainerDiv.appendChild(newElement);
				newElement = document.createElement("progress");
				newElement.value = player.minionExp[thisMinion];
				newElement.max = getMinionBaseLevel(thisMinion) * 6;
				charPaneMinionContainerDiv.appendChild(newElement);
			}
		}
	}

	displayQuestLog();
}

// Display a char pane stat value and its buffed value. Pass in the values and the element references
function displayBuffedStat(baseStat, effStat, baseStatSpan, effStatSpan) {
	if (effStat == baseStat) {
		hide(effStatSpan);
		baseStatSpan.textContent = baseStat;
	}
	else {
		effStatSpan.textContent = effStat;
		show(effStatSpan);
		if (effStat > baseStat) {
			effStatSpan.classList.add("blue");
            effStatSpan.classList.remove("red");
		}
		else {
			effStatSpan.classList.add("red");
            effStatSpan.classList.remove("blue");
		}
		baseStatSpan.textContent = ` (${baseStat})`;
	}
}

function redrawBuffPane() {
	let buffDiv = $("#buffList");
	buffDiv.empty();
	let buffCount = 0;
	for (let i in player.buffs)
	{
		let t = "<div class='item item_Image' onClick='openDialog (dialogType.BUFF, " + player.buffs[i].id + ");'><img src=./images/" + effects[player.buffs[i].id].icon + ">";
		if (!player.options[optionEnum.COMPACTBUFFPANE]) {
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
	if (player.options[optionEnum.COMPACTBUFFPANE] == 1)
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
