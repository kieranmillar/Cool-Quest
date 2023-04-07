const itemType = {
	HAT: 0,
	ARMOUR: 1,
	WEAPON: 2,
	SHIELD: 3,
	ACC: 4,
	FOOD: 5,
	POTION: 6,
	MISC: 7
}

/*
id: Same number as its position in the array
name: Display name of item
description: Flavour text when clicked on
enchantment: Bold blue text when clicked on describing mechanics
icon: Filepath of image, relative to images folder
type: string that displays when clicked on describing what categories it belongs to
category: value from itemType enum that determines how it is filtered in inventory etc.
fullness: (optional) only for food, how much fullness it uses when eaten
turns: (optional) only for food, how many turns it gives
cost: (optional) if purchaseable in a store, how much it costs of its respective currency
sell: how much Gold you can sell it for in the pawn shop, value of zero makes it unsellable
onUse: (optional) a function that, if present, is the code for what happens when used (or eaten) from inventory
onWear: (optional) a function that, if present, is the code for what happens when you equip it
onCombat: (optional) a function that, if present, is the code for what happens when used in combat
*/
var items = [
	{
		id: 0,
		name: "confirmation letter",
		description: "A letter containing confirmation details of your house rental in Drella.",
		enchantment: "Will show you the way to your house",
		icon: "envelope.png",
		type: "Useable",
		category: itemType.MISC,
		sell: 0,
		onUse: function () {
			if (player.quests[questEnum.TUTORIAL]) {
				hint("You remind yourself of the location of your house, then throw away the letter.", "g");
				return true;
			}
			hint ("You commit your house's address to memory, then throw away the letter.", "g");
			inventory_tutorial1.classList.add("hide");
			inventory_tutorial2.classList.remove("hide");
			link_map.classList.remove("hide");
			link_house.classList.remove("hide");
			player.quests[questEnum.TUTORIAL] = 1;
			return true;
		}
	},
	{
		id: 1,
		name: "mystical postcard",
		description: "An enchanted postcard. It says 'VISIT DRELLA', and then in small letters it says 'Please, our tourism industry is dying!'",
		enchantment: "+3 Max HP<br>+1 POW",
		icon: "mystical_postcard.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 5,
		onWear: function () {
			if (player.quests[questEnum.TUTORIAL] == 2)
			{
				player.quests[questEnum.TUTORIAL] = 3;
				equip_tutorial.classList.remove("hide");
				house_tutorial1.classList.add("hide");
				house_tutorial2.classList.remove("hide");
			}
			player.effHpMax += 3;
			player.effPow += 1;
		}
	},
	{
		id: 2,
		name: "cookie",
		description: "You clicked the cookie. Gameplay at its finest!",
		enchantment: "+1 Fullness<br>+1 Turn to midnight<br>Restores 5 MP",
		icon: "cookie.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 1,
		turns: 1,
		cost: 5,
		sell: 2,
		onUse: function () {
			let success = eat (2);
			if (success == true)
			{
				hint (eatMessage (2) + " " + giveMp(5), "g");
			}
			return success;
		}
	},
	{
		id: 3,
		name: "stick",
		description: "What's brown and sticky? This.",
		enchantment: "+3 POW",
		icon: "stick.png",
		type: "Weapon",
		category: itemType.WEAPON,
		cost: 20,
		sell: 10,
		onWear: function () {
			player.effPow += 3;
		}
	},
	{
		id: 4,
		name: "health potion",
		description: "This red potion is labelled as being filled with healing medicine. In reality it's just blood to replace all the blood you lost.",
		enchantment: "Restores 20-25 HP<br>Can be used in combat",
		icon: "red_potion.png",
		type: "Potion, Combat Item",
		category: itemType.POTION,
		cost: 60,
		sell: 20,
		onUse: function () {
			let x = Math.floor(Math.random() * 5) + 20;
			hint ("You drink the health potion. " + giveHp (x), "g");
			return true;
		},
		onCombat: function () {
			let x = Math.floor(Math.random() * 5) + 20;
			addCombatText ("You drink the health potion.");
			addCombatText (giveHp (x));
		}
	},
	{
		id: 5,
		name: "nihilistic running shoes",
		description: "Run. Jump. Swim. Cycle. Die.",
		enchantment: "+30 INIT<br>-10 Max HP",
		icon: "running_shoes.png",
		type: "Shoes",
		category: itemType.ACC,
		cost: 100,
		sell: 50,
		onWear: function () {
			player.effInit += 30;
			player.effHpMax -= 10;
		}
	},
	{
		id: 6,
		name: "straightened paperclip",
		description: "A paperclip that has been pulled into a straight piece of metal by a bored worker. Perfect for stabbing.",
		enchantment: "+2 POW<br>Can be used in combat to deal 40 physical damage",
		icon: "straight_paperclip.png",
		type: "Weapon, Combat Item",
		category: itemType.WEAPON,
		sell: 5,
		onWear: function () {
			player.effPow += 2;
		},
		onCombat: function () {
			addCombatText ("You hurl the paperclip at your enemy like a spear.");
			let damage = 40 - monster.def;
			if (damage <= 0)
			{
				damage = 1;
			}
			addCombatText ("Your opponent takes " + damage + " damage!");
			monster.hp -= damage;
		}
	},
	{
		id: 7,
		name: "cardboard panel",
		description: "A dry piece of cardboard box. Provides barely any defense, but also max HP for some reason.",
		enchantment: "+3 Max HP<br>+1 DEF<br>Can be used in combat to reduce incoming damage by 80%",
		icon: "cardboard_panel.png",
		type: "Shield, Combat Item",
		category: itemType.SHIELD,
		sell: 5,
		onWear: function () {
			player.effHpMax += 3;
			player.effDef += 1;
		},
		onCombat: function () {
			addCombatText ("You hold the cardboard panel out in front of yourself and brace for impact.");
		}
	},
	{
		id: 8,
		name: "tiny staff",
		description: "This tiny staff is wrapped in small threads of spider silk.",
		enchantment: "+2 Psychic Damage",
		icon: "tiny_staff.png",
		type: "Weapon",
		category: itemType.WEAPON,
		sell: 5,
		onWear: function () {
			player.psychicDamage += 2;
		}
	},
	{
		id: 9,
		name: "town hall key",
		description: "This key unlocks various rooms in the town hall.",
		enchantment: "Unlocks the rest of the Town Hall",
		icon: "key.png",
		type: "Useable",
		category: itemType.MISC,
		sell: 0,
		onUse: function () {
			hint ("You unlock various town hall doors and the key vanishes, like all good video game keys.", "g");
			player.quests[questEnum.TOWNHALL] = 3;
			return true;
		}
	},
	{
		id: 10,
		name: "dusty ring",
		description: "The dust has fused to this enchanted ring, dampening its effectiveness.",
		enchantment: "+3 POW<br>+5 INIT",
		icon: "dusty_ring.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 20,
		onWear: function () {
			player.effPow += 3;
			player.effInit += 5;
		}
	},
	{
		id: 11,
		name: "tiny helmet",
		description: "This helmet is incredibly strong but fails to cover much area. Still, its better than nothing.",
		enchantment: "+2 DEF",
		icon: "tiny_helmet.png",
		type: "Hat",
		category: itemType.HAT,
		sell: 5,
		onWear: function () {
			player.effDef += 2;
		}
	},
	{
		id: 12,
		name: "tiny shoes",
		description: "Merely a few dozen sizes too small, it will fit comfortably on your big toe.",
		enchantment: "+5 INIT",
		icon: "tiny_shoes.png",
		type: "Shoes",
		category: itemType.ACC,
		sell: 5,
		onWear: function () {
			player.effInit += 5;
		}
	},
	{
		id: 13,
		name: "perfect pasty",
		description: "This pasty is so well made and cooked, you feel certain you'll never see another one like it in your lifetime.",
		enchantment: "+2 Fullness<br>+12 Turns to midnight",
		icon: "perfect_pasty.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 2,
		turns: 12,
		sell: 200,
		onUse: function () {
			let success = eat (13);
			if (success == true)
			{
				hint (eatMessage (13), "g");
			}
			return success;
		}
	},
	{
		id: 14,
		name: "microwave meal",
		description: "This is a chicken korma and rice, separated into two plastic compartments. You can't tell the quality of the meat because it's conveniently covered in sauce.",
		enchantment: "+4 Fullness<br>+10 Turns to midnight",
		icon: "microwave_meal.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 4,
		turns: 10,
		sell: 10,
		onUse: function () {
			let success = eat (14);
			if (success == true)
			{
				hint (eatMessage (14), "g");
			}
			return success;
		}
	},
	{
		id: 15,
		name: "crème brûlée",
		description: "This crème brûlée has just been heated and hasn't yet had time to cool. Its caramalised sugar topping is glowing with enchanted magic.",
		enchantment: "+1 Fullness<br>+2 Turns to midnight<br>10 turns of +5 DEF",
		icon: "creme_brulee.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 1,
		turns: 2,
		sell: 10,
		onUse: function () {
			let success = eat (15);
			if (success == true)
			{
				hint (eatMessage (15) + " You gain 10 turns of Crème Casing.", "g");
				addBuff (4, 10);
			}
			return success;
		}
	},
	{
		id: 16,
		name: "oven mitt",
		description: "This mitt will protect your hands from heat. Well, it'll protect one of them.",
		enchantment: "+5 Fire Resistance",
		icon: "oven_mitt.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 15,
		onWear: function () {
			player.fireRes += 5;
		}
	},
	{
		id: 17,
		name: "crème brûlée torch",
		description: "This is a tiny blowtorch designed to caramelize the sugar on top of a crème brûlée, but you can use it for all sorts of things, such as a fancy cigarette lighter.",
		enchantment: "+5 Fire Damage",
		icon: "creme_brulee_torch.png",
		type: "Weapon",
		category: itemType.WEAPON,
		sell: 15,
		onWear: function () {
			player.fireDamage += 5;
		}
	},
	{
		id: 18,
		name: "orc pork",
		description: "Orcs love to consume a meat-only diet, believing it is the source of their strength. It's also the source of their heart attcks.",
		enchantment: "+3 Fullness<br>+6 Turns to midnight<br>20 turns of +7 POW",
		icon: "pork.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 3,
		turns: 6,
		sell: 10,
		onUse: function () {
			let success = eat (18);
			if (success == true)
			{
				hint (eatMessage (18) + " You gain 20 turns of Orcine Porcine Power.", "g");
				addBuff (6, 20);
			}
			return success;
		}
	},
	{
		id: 19,
		name: "orc fork",
		description: "Stick a fork in it, your enemy is done.",
		enchantment: "+5 POW",
		icon: "fork.png",
		type: "Weapon",
		category: itemType.WEAPON,
		sell: 20,
		onWear: function () {
			player.effPow += 5;
		}
	},
	{
		id: 20,
		name: "orc pocket protector",
		description: "This small leather wallet that fits onto your breast pocket provides incredible defense to a really small area.",
		enchantment: "+2 DEF<br>+2 Fire Resistance<br>+2 Ice Resistance<br>+2 Psychic Resistance<br>+2 Emotional Resistance",
		icon: "pocket_protector.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 20,
		onWear: function () {
			player.effDef += 2;
			player.fireRes += 2;
			player.iceRes += 2;
			player.psychicRes += 2;
			player.emotionalRes += 2;
		}
	},
	{
		id: 21,
		name: "orc calculator",
		description: "An orc discovered that if you put 5318008 into this calculator and turn it upside down, it's hilarious. You can feel the smarts rubbing off on you by association from holding that same calculator.",
		enchantment: "+3 Max MP<br>+5 Psychic Damage",
		icon: "calculator.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 20,
		onWear: function () {
			player.effMpMax += 3;
			player.psychicDamage += 5;
		}
	},
	{
		id: 22,
		name: "orc trenchcoat",
		description: "This overly large trenchcoat is great for covering yourself with, but its size is very unwieldy.",
		enchantment: "+10% physical damage reduction<br>-20 INIT",
		icon: "no_image.png",
		type: "Armour",
		category: itemType.ARMOUR,
		sell: 20,
		onWear: function () {
			player.effDamageReduction += 0.1;
			player.effInit -= 20;
		}
	},
	{
		id: 23,
		name: "orc flamethrower",
		description: "A wildly popular weapon for orc armies on the move, as it also doubles up as a tool to help cook breakfast. It's heavy though.",
		enchantment: "+10 Fire Damage<br>-10 INIT",
		icon: "no_image.png",
		type: "Weapon",
		category: itemType.WEAPON,
		sell: 30,
		onWear: function () {
			player.fireDamage += 10;
			player.effInit -= 10;
		}
	},
	{
		id: 24,
		name: "orc riot shield",
		description: "This shield made from transparent but sturdy plastic offers some protection while still letting you see what your opponent is doing.",
		enchantment: "+3 DEF<br>+10 INIT",
		icon: "no_image.png",
		type: "Shield",
		category: itemType.SHIELD,
		sell: 30,
		onWear: function () {
			player.effDef += 3;
			player.effInit += 10;
		}
	},
	{
		id: 25,
		name: "shiny orc medal",
		description: "This medal makes you look important. So important, that monsters will work extra hard to take you out. But it might also help you get into the orc leader's tent.",
		enchantment: "+7 Monster Level<br>Makes you look like a high-ranking orc official",
		icon: "no_image.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 50,
		onWear: function () {
			player.effMl += 7;
		}
	},
	{
		id: 26,
		name: "orc field cap",
		description: "This hat worn by high-ranking orcs isn't magically enchanted, but you think it is, and therefore it gives you MP regen. It's the placebo effect in action.",
		enchantment: "Restore 1 MP each turn",
		icon: "no_image.png",
		type: "Hat",
		category: itemType.HAT,
		sell: 50,
		onWear: function () {
			player.mpRegen += 1;
		}
	},
	{
		id: 27,
		name: "roachburger",
		description: "The classic roachburger, filled with a prime cut of the toughest meat around. Eating this will build up muscle strength just trying to bite through it.",
		enchantment: "+2 Fullness<br>+3 Turns to midnight<br>+2 Base POW",
		icon: "no_image.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 2,
		turns: 3,
		sell: 30,
		onUse: function () {
			let success = eat(27);
			if (success == true)
			{
				player.basePow += 2;
				hint (eatMessage(27) + " Your POW increased by 2!", "g");
			}
			return success;
		}
	},
	{
		id: 28,
		name: "Evil Eye stew",
		description: "Renowned as one of the foulest tasting foods known to mankind, if you can eat this, you'll build up a stomach of steel that can cope with anything.",
		enchantment: "+2 Fullness<br>+3 Turns to midnight<br>+2 Base DEF",
		icon: "no_image.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 2,
		turns: 3,
		sell: 30,
		onUse: function () {
			let success = eat(28);
			if (success == true)
			{
				player.baseDef += 2;
				hint (eatMessage(28) + " Your DEF increased by 2!", "g");
			}
			return success;
		}
	},
	{
		id: 29,
		name: "invisibility potion",
		description: "A pink potion that allows you to easily sneak up on your opponents.",
		enchantment: "10 turns of +100 INIT",
		icon: "no_image.png",
		type: "Potion",
		category: itemType.POTION,
		sell: 100,
		onUse: function () {
			hint ("You gain 10 turns of Your Invisible Now.", "g");
			addBuff (8, 10);
			return true;
		}
	},
	{
		id: 30,
		name: "yellow key",
		description: "This key unlocks the yellow door in the dungeons.",
		enchantment: "Unlocks the Yellow Door in the Dungeons",
		icon: "no_image.png",
		type: "Useable",
		category: itemType.MISC,
		cost: 200,
		sell: 100,
		onUse: function () {
			if (!player.quests[questEnum.HAPPYVILLE]) {
				hint ("You don't have access to the dungeons currently.", "r");
				return false;
			}
			if (!player.quests[questEnum.YELLOWKEY]) {
				hint ("You unlock the yellow door in the dungeons and the key vanishes, like all good video game keys.", "g");
				player.quests[questEnum.YELLOWKEY] = 1;
				return true;
			}
			else {
				hint ("You've already unlocked this dungeon, you should sell this useless key.", "r");
				return false;
			}
		}
	},
	{
		id: 31,
		name: "Badger Badger badge",
		description: "This badge makes you feel like doing the Badger Badger dance. It annoys everyone around you. Stop living in the Noughties!",
		enchantment: "+7 INIT<br>+2 Monster Level",
		icon: "no_image.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 35,
		onWear: function () {
			player.effInit += 7;
			player.effMl += 2;
		}
	},
	{
		id: 32,
		name: "sweet lemonade",
		description: "Like all food products, finding out how this is made would ruin the magic. Enjoy it in ignorance.",
		enchantment: "Restores 4-7 MP<br>10 turns of Restore 1MP per turn",
		icon: "no_image.png",
		type: "Potion",
		category: itemType.POTION,
		sell: 10,
		onUse: function () {
			let x = Math.floor(Math.random() * 3) + 4;
			hint ("You drink the lemonade. " + giveMp(x) + " You gain 10 turns of Lemony Fizz.", "g");
			addBuff (9, 10);
			return true;
		}
	},
	{
		id: 33,
		name: "Wraithwing hot wing",
		description: "The taste of this hot wing is so bad, you'll learn to move very quickly, so you can avoid a situation where you'd be offered another one.",
		enchantment: "+2 Fullness<br>+3 Turns to midnight<br>+2 Base INIT",
		icon: "no_image.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 2,
		turns: 3,
		sell: 30,
		onUse: function () {
			let success = eat(33);
			if (success == true)
			{
				player.baseInit += 2;
				hint (eatMessage(33) + " Your INIT increased by 2!", "g");
			}
			return success;
		}
	},
	{
		id: 34,
		name: "mushroom spores",
		description: "You're not sure if these are the fun kind of mushroom or the dangerous kind, but you do know that throwing them hard enough at your enemy will produce a cloud that, at the very least, should distract them.",
		enchantment: "Reduces enemy DEF to 0<br>Stuns the enemy this round",
		icon: "no_image.png",
		type: "Combat Item",
		category: itemType.MISC,
		sell: 20,
		onCombat: function () {
			addCombatText ("You throw the spores at the enemy. They get distracted trying to figure out if these are poisonous or not.");
			monster.def = 0;
			addCombatText ("Their DEF drops to 0.");
			monster.stunThisRound = true;
		}
	},
	{
		id: 35,
		name: "Drella U course voucher",
		description: "Like all university towns, Drella is entitled to subsidies for university courses from the government. Drella decided to distribute these subsidies via a voucher system. This is a chance to learn a new skill, or you could sell it off to someone else for a tidy sum, which is kind of like taking the Economics course.",
		enchantment: "Entitles you to a free course at Drella U",
		icon: "drella_u_voucher.png",
		type: "Miscellaneous",
		category: itemType.MISC,
		sell: 1000
	},
	{
		id: 36,
		name: "wrapping paper",
		description: "This Happyville branded wrapping paper is adorned with images of a lot of happy smiling faces. It gives you the creeps.",
		enchantment: "Can be traded in at the Happyville gift store",
		icon: "no_image.png",
		type: "Miscellaneous",
		category: itemType.MISC,
		sell: 1
	},
	{
		id: 37,
		name: "present",
		description: "This Happyville branded wrapping paper is adorned with images of a lot of happy smiling faces. It gives you the creeps.",
		enchantment: "Contains a random gift<br>The citizens of Happyville really like collecting these",
		icon: "no_image.png",
		type: "Miscellaneous",
		category: itemType.MISC,
		cost: 10,
		sell: 10,
		onUse: function () {
			let gifts = [
				38, //lump of coal
				4 // health potion
				// TODO more gifts
			];
			let choice = Math.floor(Math.random() * gifts.length);
			let gift = gifts[choice];
			gainItem(gift, 1);
			hint (`The present contained a ${items[gift].name}!`, "g");
			return true;
		}
	},
	{
		id: 38,
		name: "lump of coal",
		description: "Completely deserved.",
		enchantment: "Deals 50 fire damage",
		icon: "no_image.png",
		type: "Combat Item",
		category: itemType.MISC,
		sell: 1,
		onCombat: function () {
			let damage = calcFireDamage(50);
			addCombatText ("You set fire to the lump of coal and throw it at your opponent. It burns really well.");
			addCombatText ("Your opponent takes <span class='fire'>" + damage + "</span> fire damage!");
			monster.hp -= damage;
		}
	},
];
