var nonComHints = [];

function noncombatButton (text, choice, hintText)
{
	if (nonComHints[currentNoncom] === undefined || nonComHints[currentNoncom] === null) {
		nonComHints[currentNoncom] = [];
	}
	if (nonComHints[currentNoncom][choice] == 1)
	{
		text += " (" + hintText + ")";
	}
	return text;
}

function noncombatChoice (c)
{
	resetHint();
	if (busy == false)
		return;
	$("#noncombatText").empty();
	busy = false;
	noncombats[currentNoncom].choices[c].onChoosing();
	nonComHints[currentNoncom][c] = 1;
	$("#noncombatButtons").empty();
	if (busy == true)
		return;
	endAdventure();
}

function addNoncombatText (txt)
{
	let e = $("<p></p>");
	e.html(txt);
	$("#noncombatText").append(e);
}

function getNoncombatItem(id, amount)
{
	gainItem (id, amount);
	let e = $("<p></p>");
	e.addClass("item_Image");
	e.html("You found a <img src='./images/" + items[id].icon + "'> " + items[id].name + "!");
	e.css("cursor", "pointer");
	e.attr({
		"onClick" : "openDialog (dialogType.ITEM, " + id + ");"
	});
	$("#noncombatText").append(e);
}

function beginNoncombat (obj)
{
	if (player.hp == 0 || busy == true)
		return;
	goToLocation ("noncombat");
	busy = true;
	currentNoncom = obj.id;
	$("#noncombatText").empty();
	$("#noncombatTitle").text(obj.title);
	addNoncombatText (obj.description + "<br />");
	$("#adventureAgainButton").hide();
	if (obj.hasOwnProperty("result") == true)
	{
		obj.result();
	}
	else
	{
		let buttonContainer = $("#noncombatButtons");
		for (let i = 0; i < obj.choices.length; i ++)
		{
			buttonContainer.append("<button onClick = 'noncombatChoice(" + i + ")'>" + resolveProperty(obj.choices[i].buttonText) + "</button>");
		}
	}
}