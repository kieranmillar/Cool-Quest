var noncombats = [
	{
		id: 0,
		title: "A Taxing Adventure",
		description: "You manage to sneak into a calm corner of the office. Here you find three sturdy cardboard boxes in front of you, each one oozing terrifying levels of boredom. You figure you have time to loot one of them before the sheer boredom of it all forces you to make a hasty retreat.\n",
		choices: [
			{
				buttonText: "Open the dull, brown box (20 gold)",
				onChoosing: function()
				{
					addNoncombatText ("You open the brown box and find an unmarked envelope. Unable to contain yourself from the excitement of finding another sealed container inside the first one, you tear it open, and gold goes flying everywhere! Looks like somebody tried to pay their taxes with cash.");
					addNoncombatText ("You scramble around to pick up as much gold as you can, and only manage to pick up a small amount before boredom settles back in. You quickly leave before you go mad.");
					addNoncombatText (giveGold(20, false));
				}
			},
			{
				buttonText: "Open the dull, grey box (15 exp, -1 HP)",
				onChoosing: function()
				{
					addNoncombatText ("You go to open the grey box, and find it to be sealed shut! Well, this is certainly not going to stop you and you decide to open it with brute force. You struggle to pick up the box, and slowly raise it over your head, before throwing it down again onto the ground, right onto your toe!");
					addNoncombatText ("Muttering under your breath, you hobble out of the room, but at least you got a workout.");
					addNoncombatText (giveExp(15));
					addNoncombatText ("You lose 1 HP!");
					player.hp -= 1;
				}
			},
			{
				buttonText: "Open the dull, white box (get cookie)",
				onChoosing: function()
				{
					addNoncombatText ("You open the white box and it's full of cookies. Confused, you look on the side and it is addressed to the local bakery. You aren't sure why it's here, but you aren't one to miss out on an opportunity for free baked goods. You figure you can take one and nobody will notice.");
					getNoncombatItem (2, 1);
				}
			}
		],
	},
	{
		id: 1,
		title: "Debasement of The Basement",
		description: "You get a rare quiet moment to yourself, and take the opportunity to look at things a little more closely.\n",
		choices: [
			{
				buttonText: "Look on the desk (Once: get town hall key; otherwise: get health potion)",
				onChoosing: function()
				{
					if (player.questTownHall == 0)
					{
						player.questTownHall = 1;
						addNoncombatText ("The desk in the corner of the room contains uninteresting dusty books and potions. The key to unlock the town hall is sitting in clear view in the middle of the desk. You grab it, and pleased with a job well done, turn around and head out of the basement.");
						getNoncombatItem (9, 1);
					}
					else
					{
						addNoncombatText ("You snag a red potion from the desk. This will come in handy!");
						getNoncombatItem (4, 1);
					}
				}
			},
			{
				buttonText: "Look on the shelves (get dusty ring)",
				onChoosing: function()
				{
					addNoncombatText ("You look on the shelves on the wall. There is row after row of dusty books, dusty tools, and all sorts of dusty trinkets. All of them seem useless, but a slightly glowing ring catches your eye.");
					addNoncombatText ("It appears to be an enchanted ring, but the layers of dust that have accumulated over the years have magically fused to the ring, and become part of it. Still, it might have some use left in it.");
					getNoncombatItem (10, 1);
				}
			},
			{
				buttonText: "Look for trouble (fight a monster)",
				onChoosing: function()
				{
					let r = Math.random();
					r = Math.floor (r * zones[1].combats.length);
					beginCombat (combats[zones[1].combats[r]]);
				}
			}
		],
	}
];

function noncombatChoice (c)
{
	resetHint();
	if (busy == false)
		return;
	$("#noncombatText").empty();
	busy = false;
	noncombats[currentNoncom].choices[c].onChoosing();
	$("#noncombatButtons").empty();
	if (busy == true)
		return;
	endAdventure();
}

function addNoncombatText (txt)
{
	let e = $("<p></p>");
	e.text(txt);
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
		"onClick" : "openDialog (ITEM, " + id + ");"
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
	addNoncombatText (obj.description);
	let buttomContainer = $("#noncombatButtons");
	for (let i = 0; i < obj.choices.length; i ++)
	{
		buttomContainer.append("<button onClick = 'noncombatChoice(" + i + ")'>" + obj.choices[i].buttonText + "</button>");
	}
	$("#noncombatTitle").text(obj.title);
	$("#adventureAgainButton").hide();
}