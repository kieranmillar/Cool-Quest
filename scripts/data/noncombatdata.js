/*
id: Same number as its position in the array
title: Title of the noncombat
description: Paragraph of description text. Use paragraph breaks if you need to add more and it's a choice nonombat
result: (optional) a function that, if present, means this is not a choice noncombat. If not meant to take a turn, use "busy = false;" otherwise "endAdventure()"
choices: (optional) an array of objects, which means this is a choice noncobat. Objects have these properties:
--- buttonText: A function returning the noncombatButton method
--- onChoosing: A function with code for what to do if you press this button. Returns a boolean of if it is to take a turn (but this is ignored if something sets busy to true)
*/

var noncombats = [
	{
		id: 0,
		title: "Debasement of The Basement",
		description: "You get a rare quiet moment to yourself, and take the opportunity to look at things a little more closely.",
		choices: [
			{
				buttonText: function () {return noncombatButton ("Look on the desk", 0, "Once: get town hall key; otherwise: get health potion");},
				onChoosing: function () {
					if (player.quests[questEnum.TOWNHALL] == 1) {
						player.quests[questEnum.TOWNHALL] = 2;
						addNoncombatText ("The desk in the corner of the room contains uninteresting dusty books and potions. The key to unlock the town hall is sitting in clear view in the middle of the desk. You grab it, and pleased with a job well done, turn around and head out of the basement.");
						getNoncombatItem (9, 1);
					}
					else {
						addNoncombatText ("You snag a red potion from the desk. This will come in handy!");
						getNoncombatItem (4, 1);
					}
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Look on the shelves", 1, "get dusty ring");},
				onChoosing: function () {
					addNoncombatText ("You look on the shelves on the wall. There is row after row of dusty books, dusty tools, and all sorts of dusty trinkets. All of them seem useless, but a slightly glowing ring catches your eye.");
					addNoncombatText ("It appears to be an enchanted ring, but the layers of dust that have accumulated over the years have magically fused to the ring, and become part of it. Still, it might have some use left in it.");
					getNoncombatItem (10, 1);
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Look for trouble", 2, "fight a monster");},
				onChoosing: function () {
					pickRandomCombat (0);
					return true;
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
				onChoosing: function () {
					addNoncombatText ("You open the brown box and find an unmarked envelope. Unable to contain yourself from the excitement of finding another sealed container inside the first one, you tear it open, and gold goes flying everywhere! Looks like somebody tried to pay their taxes with cash.");
					addNoncombatText ("You scramble around to pick up as much gold as you can, and only manage to pick up a small amount before boredom settles back in. You quickly leave before you go mad.");
					addNoncombatText (giveGold(30, false));
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Open the dull, grey box", 1, "15 exp, -1 HP");},
				onChoosing: function () {
					addNoncombatText ("You go to open the grey box, and find it to be sealed shut! Well, this is certainly not going to stop you and you decide to open it with brute force. You struggle to pick up the box, and slowly raise it over your head, before throwing it down again onto the ground, right onto your toe!");
					addNoncombatText ("Muttering under your breath, you hobble out of the room, but at least you got a workout.");
					addNoncombatText (giveExp(15));
					addNoncombatText ("You lose 1 HP!");
					player.hp -= 1;
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Open the dull, brown box", 2, "get cardboard panel");},
				onChoosing: function () {
					addNoncombatText ("You try to open the brown box, but it's sealed shut with tape. Given that it's only cardboard, you give it a big tug, and end up ripping a big chunk off of the box.");
					addNoncombatText ("Turns out the box was empty, but hey, you got some sweet free cardboard! There's treasure everywhere!");
					getNoncombatItem (7, 1);
					return true;
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
			else {
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
				onChoosing: function () {
					beginCombat (combats[12]);
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Enter the armoury", 1, "get a random piece of orc equipment");},
				onChoosing: function () {
					addNoncombatText ("You enter the armoury and find a whole heap of equipment in a messy pile. These orcs don't seem particularly well organised.");
					addNoncombatText ("You go to sort through the pile, but hear whistling off in the distance, so decide to quickly grab the first random piece of equipment you get your hands on and run away.");
					let rewards = [19, 20, 21, 22, 25];
					getNoncombatItem (rewards[Math.floor(Math.random() * rewards.length)], 1);
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Enter the first aid room", 2, "get 3 health potions");},
				onChoosing: function () {
					addNoncombatText ("You enter the first aid room, expecting to find bandages, plasters, that sort of thing. Instead you recoil in horror as you open the door to a room filled with all manner of horrible-looking sharp instruments and shelves full of mystery liquids. Serves you right for giving orc science the benefit of the doubt for even a second.");
					addNoncombatText ("You don't really recognise or feel comfortable around most of the objects available to you, but do find a box filled with some generic health potions. Given its the only thing you recognise, you pocket some of them and quickly head out of the room.");
					getNoncombatItem (4, 1);
					getNoncombatItem (4, 1);
					getNoncombatItem (4, 1);
					return true;
				}
			}
		]
	},
	{
		id: 4,
		title: "It's Not That Easy",
		description: "You casually stroll up to the leaders tent. A group of guards immediately pounce on you and give you a beating! Maybe the direct approach isn't going to work. Perhaps you can find a high ranking official somewhere that will help you find a way in.</p><p>You take 3 damage!</p><button onClick=\"goToLocation('orcCamp')\">Return to the Orc Camp</button><p>",
		result: function () {
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
				onChoosing: function () {
					beginCombat (combats[16]);
					return true;
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
				onChoosing: function () {
					beginCombat (combats[16]);
					return true;
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
				buttonText: function () {return noncombatButton ("Cut off a large chunk of mud", 0, "fight a Mud Baby");},
				onChoosing: function () {
					beginCombat (combats[20]);
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Cut off a small glob of mud", 0, "gain a small glob of mud");},
				onChoosing: function () {
					addNoncombatText ("You cut a small amount of mud off of the wall. It hits the floor with a wet splat and sits there shaking slightly. You cautiously put it into your bag.");
					getNoncombatItem (51, 1);
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Find another fight", 1, "fight a random monster");},
				onChoosing: function () {
					pickRandomCombat (7);
					return true;
				}
			}
		]
	},
	{
		id: 9,
		title: "Going on a Magical Journey",
		description: "As you stroll through the sett, you come across a large group of cows, all huddled around a makeshift stage. As you push your way through the crowd, you find a man in a white onsie with a ginger beard on the stage performing magic tricks.</p><p>He beckons you onto the stage. \"For my next trick, I wish to teleport a volunteer to a nearby place. You look like you're eager to go on a journey. Tell me, what do you desire most?\"</p><p>You ponder to yourself.",
		choices: [
			{
				buttonText: function () {return noncombatButton ("I want to dance", 0, "fight a Badger Badger");},
				onChoosing: function () {
					beginCombat (combats[21], "With a flick of his leathery whip, the magical man teleports you to a nearby Badger Badger, who was dancing away, minding his own buiness, and has now been rudely interrupted.");
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("I want to be with nature", 1, "fight a Mushroom Mushroom");},
				onChoosing: function () {
					beginCombat (combats[22], "With a flick of his leathery whip, the magical man teleports you next to a Mushroom Mushroom, which immediately triggers a natural defensive response.");
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("I want to see the hidden world of animals", 2, "fight a snake");},
				onChoosing: function () {
					beginCombat (combats[23], "With a flick of his leathery whip, the magical man teleports you next to a warehouse filled with cardboard boxes. This doesn't seem like the place for animals, but your curiosity is abated when a snake slides out from a nearby box.");
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("I want to see something amazing", 3, "fight an amazing horse");},
				onChoosing: function () {
					beginCombat (combats[24], "With a flick of his leathery whip, the magical man teleports you next to a lake, where a young lady is looking around.</p><p>\"Are you also here to look at the amazing horse?\" she asks you.</p><p>What amazing horse? Oh, this one.");
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("I want to go to a parallel dimension", 4, "gain lots of beans");},
				onChoosing: function () {
					addNoncombatText("With a flick of his leathery whip, Magical Trevor sends you off to a parallel dimension. The strange world you find yourself in is horrifying. All matter of strange animals surround you. A pigeon sawn in half. A chinchilla on fire. The Kraken. A beaver being fired out of a cannon. All inside of an endless shopping aisle filled with cans of beans.");
					addNoncombatText("You grab a couple of cans of beans before Magical Trevor teleports you back to his stage.");
					getNoncombatItem(53, 1);
					addNoncombatText("You decide that's enough teleporting around for one day and walk off, shuddering.");
					return true;
				}
			}
		]
	},
	{
		id: 10,
		title: "Back from the Conference",
		description: "As you roam the sett, a cat with a tie pattern on his fur walks up to you, with a man in a business suit following behind him.</p><p>\"Meow meow meow\" the cat says, holding out his paw.</p><p>\"Ah\", the man says, \"This is Business Cat, and he has a wonderful business opportunity for you, investing in other kinds of business pet. He currently needs 100 gold.\"</p><p>Sounds like an opportunity for some investing.",
		choices: [
			{
				buttonText: function () {return noncombatButton ("Invest (100 gold)", 0, "every 3rd time get a reward, else lose 100 gold");},
				onChoosing: function () {
					if (!player.zoneCounters[zoneCounterEnum.BADGERBADGERSETT]) {
						player.zoneCounters[zoneCounterEnum.BADGERBADGERSETT] = 0;
					}
					if (player.zoneCounters[zoneCounterEnum.BADGERBADGERSETT] >= 2) {
						player.zoneCounters[zoneCounterEnum.BADGERBADGERSETT] = 0;
						addNoncombatText("\"Meow meow meow!\"");
						addNoncombatText("\"What he's trying to say is that he's just realised you're our frequent investor!\"");
						addNoncombatText("\"Meow meow meow meow!\"");
						addNoncombatText("\"Thank you for your help, we've seen great returns on your investment!\"");
						addNoncombatText("The cat hands you your returns.");
						if (getMinionOwned(2)) {
							addNoncombatText("<strong>You gain 500 gold!</strong>");
							player.gold += 500;
						}
						else {
							addNoncombatText("It's an egg with eyes, wobbling back and forth. It mumbles to you about pie.");
							gainMinion(2);
							addNoncombatText(`<strong>You add ${player.minionNames[2]} the wobbling egg to your pen!</strong>`);
						}
					}
					else {
						if (player.gold < 100) {
							addNoncombatText("You realise you don't have enough gold, and walk away feeling very embarassed.");
							return false;
						}
						addNoncombatText("You hand over 100 gold to the cat. He shakes your hand, then walks off, with his associate following closely behind.");
						addNoncombatText("You hope this will eventually be worth it.");
						player.gold -= 100;
						player.zoneCounters[zoneCounterEnum.BADGERBADGERSETT] ++;
					}
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Decline", 1, "leave (does not spend a turn)");},
				onChoosing: function () {
					addNoncombatText ("You decide to keep your money and walk away.");
					return false;
				}
			}
		]
	},
	{
		id: 11,
		title: "No Time Like the Present",
		description: "You manage to explore the factory without encountering anybody, and find a stash of presents. Score!",
		result: function () {
			let r = 3 + Math.floor(Math.random() * 2);
			getNoncombatItem (37, r);
			endAdventure();
		}
	},
	{
		id: 12,
		title: "Get Your Claus Out",
		description: "You find the door to Santa's office. You ready yourself / chicken out (delete as appropriate).",
		choices: [
			{
				buttonText: function () {return noncombatButton ("Enter the office", 0, "fight Santa");},
				onChoosing: function () {
					beginCombat (combats[35]);
					return true;
				}
			},
			{
				buttonText: function () {return noncombatButton ("Find another fight", 1, "fight a random monster");},
				onChoosing: function () {
					pickRandomCombat (11);
					return true;
				}
			}
		]
	},
	{
		id: 13,
		title: "Cromwell Would be Proud",
		description: "With Santa defeated, his workshop lays still and silent.</p><button onClick=\"goToLocation('happyville')\">Return to Happyville</button><p>",
		result: function () {
			busy = false;
		}
	},
];
