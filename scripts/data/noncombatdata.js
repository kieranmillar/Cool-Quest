var noncombats = [
	{
		id: 0,
		title: "Debasement of The Basement",
		description: "You get a rare quiet moment to yourself, and take the opportunity to look at things a little more closely.",
		choices: [
			{
				buttonText: function () {return noncombatButton ("Look on the desk", 0, "Once: get town hall key; otherwise: get health potion");},
				onChoosing: function ()
				{
					if (player.quests[questEnum.TOWNHALL] == 1)
					{
						player.quests[questEnum.TOWNHALL] = 2;
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
				buttonText: function () {return noncombatButton ("Look on the shelves", 1, "get dusty ring");},
				onChoosing: function ()
				{
					addNoncombatText ("You look on the shelves on the wall. There is row after row of dusty books, dusty tools, and all sorts of dusty trinkets. All of them seem useless, but a slightly glowing ring catches your eye.");
					addNoncombatText ("It appears to be an enchanted ring, but the layers of dust that have accumulated over the years have magically fused to the ring, and become part of it. Still, it might have some use left in it.");
					getNoncombatItem (10, 1);
				}
			},
			{
				buttonText: function () {return noncombatButton ("Look for trouble", 2, "fight a monster");},
				onChoosing: function ()
				{
					pickRandomCombat (0);
				}
			}
		],
	},
	{
		id: 1,
		title: "A Taxing Adventure",
		description: "You manage to sneak into a calm corner of the office. Here you find three sturdy cardboard boxes in front of you, each one oozing terrifying levels of boredom. You figure you have time to loot one of them before the sheer boredom of it all forces you to make a hasty retreat.",
		choices: [
			{
				buttonText: function () {return noncombatButton ("Open the dull, white box", 0, "30 gold");},
				onChoosing: function ()
				{
					addNoncombatText ("You open the brown box and find an unmarked envelope. Unable to contain yourself from the excitement of finding another sealed container inside the first one, you tear it open, and gold goes flying everywhere! Looks like somebody tried to pay their taxes with cash.");
					addNoncombatText ("You scramble around to pick up as much gold as you can, and only manage to pick up a small amount before boredom settles back in. You quickly leave before you go mad.");
					addNoncombatText (giveGold(30, false));
				}
			},
			{
				buttonText: function () {return noncombatButton ("Open the dull, grey box", 1, "15 exp, -1 HP");},
				onChoosing: function ()
				{
					addNoncombatText ("You go to open the grey box, and find it to be sealed shut! Well, this is certainly not going to stop you and you decide to open it with brute force. You struggle to pick up the box, and slowly raise it over your head, before throwing it down again onto the ground, right onto your toe!");
					addNoncombatText ("Muttering under your breath, you hobble out of the room, but at least you got a workout.");
					addNoncombatText (giveExp(15));
					addNoncombatText ("You lose 1 HP!");
					player.hp -= 1;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Open the dull, brown box", 2, "get cardboard panel");},
				onChoosing: function ()
				{
					addNoncombatText ("You try to open the brown box, but it's sealed shut with tape. Given that it's only cardboard, you give it a big tug, and end up ripping a big chunk off of the box.");
					addNoncombatText ("Turns out the box was empty, but hey, you got some sweet free cardboard! There's treasure everywhere!");
					getNoncombatItem (7, 1);
				}
			}
		],
	},
	{
		id: 2,
		title: "The Hour Has Pasty",
		description: "You walk over to the counter and look to see if anything is being served up today. You don't see anything, but during this rare moment avoiding a fight, you figure you can pop around the other side and take a closer look.",
		result: function () {
			if (!player.zoneCounters[zoneCounterEnum.CANTEEN]) {
				player.zoneCounters[zoneCounterEnum.CANTEEN] = 1;
				addNoncombatText ("At first glance all of the food has already been stolen, but then, tucked in the far corner of the counter you find an overlooked item.");
				addNoncombatText ("It's a pasty. But not just any old pasty. Having sat near, but not on, the hot plate, it has been cooked very slowly. You tear a small bit off the edge, and a waft of steam comes out. A lovely smell of beef, potatoes and swede hits you like a sledgehammer.");
				addNoncombatText ("Yes, this wasn't just any old pasty. This pasty was unique. This pasty was perfect! You knew that you would never again find another pasty quite like it during your lifetime. This pasty had aged like a fine wine.");
				addNoncombatText ("What's that? Meat-based food doesn't age well like wine? Who's telling this story, me or you? If I want a pasty to improve with age, by golly I'm going to make it happen!");
				getNoncombatItem (13, 1);
				endAdventure();
			}
			else
			{
				$("#noncombatText").empty();
				busy = false;
				pickRandomCombat (2);
			}
		},
	},
	{
		id: 3,
		title: "Barrack Oh Bother",
		description: "You manage to sneak into the barracks unnoticed. Where would you like to explore?",
		choices: [
			{
				buttonText: function () {return noncombatButton ("Enter the dorms", 0, "fight a drunk orc infantryman");},
				onChoosing: function ()
				{
					beginCombat (combats[12]);
				}
			},
			{
				buttonText: function () {return noncombatButton ("Enter the armoury", 1, "get a random piece of orc equipment");},
				onChoosing: function ()
				{
					addNoncombatText ("You enter the armoury and find a whole heap of equipment in a messy pile. These orcs don't seem particularly well organised.");
					addNoncombatText ("You go to sort through the pile, but hear whistling off in the distance, so decide to quickly grab the first random piece of equipment you get your hands on and run away.");
					getNoncombatItem (Math.floor(Math.random() * 4) + 19, 1);//random item between ids 19 and 22
				}
			},
			{
				buttonText: function () {return noncombatButton ("Enter the first aid room", 2, "get 3 health potions");},
				onChoosing: function ()
				{
					addNoncombatText ("You enter the first aid room, expecting to find bandages, plasters, that sort of thing. Instead you recoil in horror as you open the door to a room filled with all manner of horrible-looking sharp instruments and shelves full of mystery liquids. Serves you right for giving orc science the benefit of the doubt for even a second.");
					addNoncombatText ("You don't really recognise or feel comfortable around most of the objects available to you, but do find a box filled with some generic health potions. Given its the only thing you recognise, you pocket some of them and quickly head out of the room.");
					getNoncombatItem (4, 1);
					getNoncombatItem (4, 1);
					getNoncombatItem (4, 1);
				}
			}
		]
	},
	{
		id: 4,
		title: "It's Not That Easy",
		description: "You casually stroll up to the leaders tent. A group of guards immediately pounce on you and give you a beating! Maybe the direct approach isn't going to work. Perhaps you can find a high ranking official somewhere that will help you find a way in.",
		result: function () {
			addNoncombatText("You take 3 damage!");
			player.hp -= 3;
			if (player.hp < 0) {
				player.hp = 0;
			}
			busy = false;
			redrawCharPane();
		}
	},
	{
		id: 5,
		title: "Army of Me",
		description: 'The Major lets you into the tent. In the centre is a large strangely dressed orc looking over a map. She looks up and leaps out of her chair.</p><p>"What are you doing here?! How did you get in?"</p><p>"Well you see I came to-"</p><p>"<strong>SILENCE!</strong> Leave at once or I\'ll force you to leave!"</p><p>Well, so much for diplomacy.',
		choices: [
			{
				buttonText: function () {return noncombatButton ("Lay the smackdown", 0, "fight Björc");},
				onChoosing: function ()
				{
					beginCombat (combats[16]);
				}
			}
		]
	},
	{
		id: 6,
		title: "Your Work Here is Done",
		description: "You made a deal with Björc to leave her alone. You'd better hold up your end of the bargain.</p><button onClick=\"goToLocation('orcCamp')\">Return to the Orc Camp</button><p>",
		result: function () {
			busy = false;
		}
	},
	{
		id: 7,
		title: "Army of Me",
		description: 'You show your medal to the guards, and they let you in without a fight. In the centre is a large strangely dressed orc looking over a map. She looks up and leaps out of her chair.</p><p>"What are you doing here?! How did you get in?"</p><p>"Well you see I came to-"</p><p>"<strong>SILENCE!</strong> Leave at once or I\'ll force you to leave!"</p><p>Well, so much for diplomacy.',
		choices: [
			{
				buttonText: function () {return noncombatButton ("Lay the smackdown", 0, "fight Björc");},
				onChoosing: function ()
				{
					beginCombat (combats[16]);
				}
			}
		]
	},
	{
		id: 8,
		title: "Mud for the Mud God",
		description: "One of the walls of this room is a made of a strange red substance. Most of it seems solid, but a large section is bulging out that seems quite gooey and could be separated off from the rest of the wall.</p><p>You get the feeling that might be a very dangerous idea though. This stuff feels like... it's almost alive...",
		choices: [
			{
				buttonText: function () {return noncombatButton ("Cut the mud", 0, "fight a Mud Baby");},
				onChoosing: function ()
				{
					beginCombat (combats[20]);
				}
			},
			{
				buttonText: function () {return noncombatButton ("Find another fight", 1, "fight a random monster");},
				onChoosing: function ()
				{
					pickRandomCombat (7);
				}
			}
		]
	},
	{
		id: 9,
		title: "(Magic Trevor or Narwhals reference?))",
		description: "TODO",
		choices: [
			{
				buttonText: function () {return noncombatButton ("Approach the Baby", 0, "fight a Mud Baby");},
				onChoosing: function ()
				{
					beginCombat (combats[20]);
				}
			},
			{
				buttonText: function () {return noncombatButton ("Find another fight", 1, "fight a monster");},
				onChoosing: function ()
				{
					pickRandomCombat (8);
				}
			}
		]
	},
	{
		id: 10,
		title: "Back from the Conference",
		description: "TODO",
		choices: [
			{
				buttonText: function () {return noncombatButton ("Approach the Baby", 0, "fight a Mud Baby");},
				onChoosing: function ()
				{
					beginCombat (combats[20]);
				}
			},
			{
				buttonText: function () {return noncombatButton ("Find another fight", 1, "fight a monster");},
				onChoosing: function ()
				{
					pickRandomCombat (8);
				}
			}
		]
	},
	{
		id: 11,
		title: "No Time Like the Present",
		description: "TODO",
		result: function () {
			getNoncombatItem (37, 3);
			endAdventure();
		}
	},
];
