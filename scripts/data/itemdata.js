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
			if (getQuestState(questEnum.TUTORIAL)) {
				hint("You remind yourself of the location of your house, then throw away the letter.", "g");
				return true;
			}
			hint("You commit your house's address to memory, then throw away the letter.", "g");
			hide(inventory_tutorial1);
			show(inventory_tutorial2);
			show(link_map);
			show(link_house);
			setQuestState(questEnum.TUTORIAL, 1);
			return true;
		}
	},
	{
		id: 1,
		name: "mystical postcard",
		description: "An enchanted postcard. It says 'VISIT DRELLA', and then in small letters it says 'Please, our tourism industry is dying!'",
		enchantment: "+3 Max HP\n+1 POW",
		icon: "mystical_postcard.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 5,
		onWear: function () {
			if (getQuestState(questEnum.TUTORIAL) == 2) {
				setQuestState(questEnum.TUTORIAL, 3);
				show(equip_tutorial);
				hide(house_tutorial1);
				show(house_tutorial2);
			}
			player.effHpMax += 3;
			player.effPow += 1;
		}
	},
	{
		id: 2,
		name: "cookie",
		description: "You clicked the cookie. Gameplay at its finest!",
		enchantment: "+1 Fullness\n+1 Turn to midnight\nRestores 5 MP",
		icon: "cookie.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 1,
		turns: 1,
		cost: 5,
		sell: 2,
		onUse: function () {
			let success = eat(2);
			if (success) {
				hint(`${eatMessage(2)} ${gainMp(5)}`, "g");
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
		enchantment: "Restores 20-25 HP\nCan be used in combat",
		icon: "red_potion.png",
		type: "Potion, Combat Item",
		category: itemType.POTION,
		cost: 60,
		sell: 20,
		onUse: function () {
			let x = Math.floor(Math.random() * 5) + 20;
			hint(`You drink the health potion. ${gainHp(x)}`, "g");
			return true;
		},
		onCombat: function () {
			let x = Math.floor(Math.random() * 5) + 20;
			addCombatText("You drink the health potion.");
			addCombatText(gainHp(x));
		}
	},
	{
		id: 5,
		name: "nihilistic running shoes",
		description: "Run. Jump. Swim. Cycle. Die.",
		enchantment: "+30 INIT\n-10 Max HP",
		icon: "running_shoes.png",
		type: "Accessory",
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
		enchantment: "+2 POW\nCan be used in combat to deal 40 physical damage",
		icon: "straight_paperclip.png",
		type: "Weapon, Combat Item",
		category: itemType.WEAPON,
		sell: 5,
		onWear: function () {
			player.effPow += 2;
		},
		onCombat: function () {
			addCombatText("You hurl the paperclip at your enemy like a spear.");
			let damage = 40 - monster.def;
			damage = Math.max(damage, 1);
			addCombatText(`Your opponent takes ${damage} damage!`);
			monster.hp -= damage;
		}
	},
	{
		id: 7,
		name: "cardboard panel",
		description: "A dry piece of cardboard box. Provides barely any defense, but also max HP for some reason.",
		enchantment: "+3 Max HP\n+1 DEF\nCan be used in combat to reduce incoming damage by 80%",
		icon: "cardboard_panel.png",
		type: "Shield, Combat Item",
		category: itemType.SHIELD,
		sell: 5,
		onWear: function () {
			player.effHpMax += 3;
			player.effDef += 1;
		},
		onCombat: function () {
			addCombatText("You hold the cardboard panel out in front of yourself and brace for impact.");
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
			if (getQuestState(questEnum.TOWNHALL) < 3) {
				hint("You unlock various town hall doors and the key vanishes, like all good video game keys.", "g");
				setQuestState(questEnum.TOWNHALL, 3);
			}
			else {
				hint("You've already unlocked the town hall, so you throw away the key.", "g");
			}
			return true;
		}
	},
	{
		id: 10,
		name: "dusty ring",
		description: "The dust has fused to this enchanted ring, dampening its effectiveness.",
		enchantment: "+3 POW\n+5 INIT",
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
		type: "Accessory",
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
		enchantment: "+2 Fullness\n+12 Turns to midnight",
		icon: "perfect_pasty.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 2,
		turns: 12,
		sell: 200,
		onUse: function () {
			let success = eat(13);
			if (success) {
				hint(eatMessage(13), "g");
			}
			return success;
		}
	},
	{
		id: 14,
		name: "microwave meal",
		description: "This is a chicken korma and rice, separated into two plastic compartments. You can't tell the quality of the meat because it's conveniently covered in sauce.",
		enchantment: "+4 Fullness\n+10 Turns to midnight",
		icon: "microwave_meal.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 4,
		turns: 10,
		sell: 10,
		onUse: function () {
			let success = eat(14);
			if (success) {
				hint(eatMessage(14), "g");
			}
			return success;
		}
	},
	{
		id: 15,
		name: "crème brûlée",
		description: "This crème brûlée has just been heated and hasn't yet had time to cool. Its caramalised sugar topping is glowing with enchanted magic.",
		enchantment: "+1 Fullness\n+2 Turns to midnight\n10 turns of +5 DEF",
		icon: "creme_brulee.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 1,
		turns: 2,
		sell: 10,
		onUse: function () {
			let success = eat(15);
			if (success) {
				hint(`${eatMessage(15)} You gain 10 turns of Crème Casing.`, "g");
				addBuff(4, 10);
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
		enchantment: "+3 Fullness\n+6 Turns to midnight\n20 turns of +7 POW",
		icon: "pork.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 3,
		turns: 6,
		sell: 10,
		onUse: function () {
			let success = eat(18);
			if (success) {
				hint(`${eatMessage(18)} You gain 20 turns of Orcine Porcine Power.`, "g");
				addBuff(6, 20);
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
		enchantment: "+2 DEF\n+2 Fire Resistance\n+2 Ice Resistance\n+2 Psychic Resistance\n+2 Emotional Resistance",
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
		enchantment: "+3 Max MP\n+4 Psychic Damage",
		icon: "calculator.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 20,
		onWear: function () {
			player.effMpMax += 3;
			player.psychicDamage += 4;
		}
	},
	{
		id: 22,
		name: "orc trenchcoat",
		description: "This overly large trenchcoat is great for covering yourself with, but its size is very unwieldy.",
		enchantment: "+10% physical damage reduction\n-20 INIT",
		icon: "trenchcoat.png",
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
		enchantment: "+10 Fire Damage\n-10 INIT",
		icon: "flamethrower.png",
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
		enchantment: "+3 DEF\n+10 INIT",
		icon: "riot_shield.png",
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
		enchantment: "+7 to all enemy stats\n+14 Experience from combats\nMakes you look like a high-ranking orc official",
		icon: "orc_medal.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 50,
		onWear: function () {
			player.effMl += 7;
		}
	},
	{
		id: 26,
		name: "orc military hat",
		description: "This hat worn by high-ranking orcs isn't magically enchanted, but you think it is, and therefore it gives you MP regen. It's the placebo effect in action.",
		enchantment: "Restore 1 MP each turn",
		icon: "military_hat.png",
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
		enchantment: "+2 Fullness\n+3 Turns to midnight\n+2 Base POW",
		icon: "roachburger.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 2,
		turns: 3,
		sell: 30,
		onUse: function () {
			let success = eat(27);
			if (success) {
				player.basePow += 2;
				hint(`${eatMessage(27)} Your POW increased by 2!`, "g");
			}
			return success;
		}
	},
	{
		id: 28,
		name: "Evil Eye stew",
		description: "Renowned as one of the foulest tasting foods known to mankind, if you can eat this, you'll build up a stomach of steel that can cope with anything.",
		enchantment: "+2 Fullness\n+3 Turns to midnight\n+2 Base DEF",
		icon: "eye_stew.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 2,
		turns: 3,
		sell: 30,
		onUse: function () {
			let success = eat(28);
			if (success) {
				player.baseDef += 2;
				hint(`${eatMessage(28)} Your DEF increased by 2!`, "g");
			}
			return success;
		}
	},
	{
		id: 29,
		name: "invisibility potion",
		description: "A pink potion that allows you to easily sneak up on your opponents.",
		enchantment: "10 turns of +100 INIT",
		icon: "invisibility_potion.png",
		type: "Potion",
		category: itemType.POTION,
		sell: 100,
		onUse: function () {
			hint("You gain 10 turns of Your Invisible Now.", "g");
			addBuff(8, 10);
			return true;
		}
	},
	{
		id: 30,
		name: "yellow key",
		description: "This key unlocks the yellow door in the dungeons in the mountains.",
		enchantment: "Unlocks the Yellow Door in the Deadly Dungeons of Death",
		icon: "yellow_key.png",
		type: "Useable",
		category: itemType.MISC,
		cost: 200,
		sell: 100,
		onUse: function () {
			if (getQuestState(questEnum.HAPPYVILLE) == 0) {
				hint("You don't have access to the dungeons currently.", "r");
				return false;
			}
			if (getQuestState(questEnum.YELLOWKEY) == 0) {
				hint("You unlock the yellow door in the dungeons and the key vanishes, like all good video game keys.", "g");
				setQuestState(questEnum.YELLOWKEY, 1);
				return true;
			}
			else {
				hint("You've already unlocked this dungeon, you should sell this useless key.", "r");
				return false;
			}
		}
	},
	{
		id: 31,
		name: "Badger Badger badge",
		description: "This badge makes you feel like doing the Badger Badger dance. It annoys everyone around you. Stop living in the Noughties!",
		enchantment: "+7 INIT\n+2 to all enemy stats\n+4 Experience from combats",
		icon: "badger_badge.png",
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
		enchantment: "Restores 4-7 MP\n10 turns of Restore 1MP per turn",
		icon: "lemonade.png",
		type: "Potion",
		category: itemType.POTION,
		sell: 10,
		onUse: function () {
			let x = Math.floor(Math.random() * 3) + 4;
			hint(`You drink the lemonade. ${gainMp(x)} You gain 10 turns of Lemony Fizz.`, "g");
			addBuff(9, 10);
			return true;
		}
	},
	{
		id: 33,
		name: "Wraithwing hot wing",
		description: "The taste of this hot wing is so bad, you'll learn to move very quickly, so you can avoid a situation where you'd be offered another one.",
		enchantment: "+2 Fullness\n+3 Turns to midnight\n+2 Base INIT",
		icon: "hot_wing.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 2,
		turns: 3,
		sell: 30,
		onUse: function () {
			let success = eat(33);
			if (success) {
				player.baseInit += 2;
				hint(`${eatMessage(33)} Your INIT increased by 2!`, "g");
			}
			return success;
		}
	},
	{
		id: 34,
		name: "mushroom spores",
		description: "You're not sure if these are the fun kind of mushroom or the dangerous kind, but you do know that throwing them hard enough at your enemy will produce a cloud that, at the very least, should distract them.",
		enchantment: "Reduces enemy DEF to 0\nStuns the enemy this round",
		icon: "mushroom_spores.png",
		type: "Combat Item",
		category: itemType.MISC,
		sell: 20,
		onCombat: function () {
			addCombatText("You throw the spores at the enemy. They get distracted trying to figure out if these are poisonous or not.");
			monster.def = 0;
			addCombatText("Their DEF drops to 0.");
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
		icon: "wrapping_paper.png",
		type: "Miscellaneous",
		category: itemType.MISC,
		sell: 1
	},
	{
		id: 37,
		name: "present",
		description: "A friendly gift, but for who? It's missing a nametag, so finders-keepers.",
		enchantment: "Contains a random gift\nThe citizens of Happyville really like collecting these",
		icon: "present.png",
		type: "Useable",
		category: itemType.MISC,
		cost: 10,
		sell: 10,
		onUse: function () {
			let gifts = [
				38, //lump of coal
				45, //candy cane
				48, //ritual candle
				49, //festive pudding
				50 //Happyville snowglobe
			];
			let choice = Math.floor(Math.random() * gifts.length);
			let gift = gifts[choice];
			gainItem(gift, 1);
			hint(`The present contained a ${items[gift].name}!`, "g");
			return true;
		}
	},
	{
		id: 38,
		name: "lump of coal",
		description: "Completely deserved.",
		enchantment: "Deals 50 fire damage",
		icon: "lump_of_coal.png",
		type: "Combat Item",
		category: itemType.MISC,
		sell: 1,
		onCombat: function () {
			let damage = calcFireDamage(50);
			addCombatText("You set fire to the lump of coal and throw it at your opponent. It burns really well.");
			addCombatText(`Your opponent takes <span class='fire'>${damage}</span> fire damage!`);
			monster.hp -= damage;
		}
	},
	{
		id: 39,
		name: "\"lousy t-shirt\" t-shirt",
		description: "A shirt that says \"I visited Drella and all I got was this lousy t-shirt\".",
		enchantment: "+10% physical damage reduction",
		icon: "lousy_tshirt.png",
		type: "Armour",
		category: itemType.ARMOUR,
		cost: 200,
		sell: 50,
		onWear: function () {
			player.effDamageReduction += 0.1;
		}
	},
	{
		id: 40,
		name: "gaudy tropical shirt",
		description: "This brightly coloured shirt with a palm tree pattern is magically enchanted so you can't feel the heat, both from the environment and radiating from your embarassment.",
		enchantment: "+10% physical damage reduction\n+10 Fire Resistance",
		icon: "tropical_shirt.png",
		type: "Armour",
		category: itemType.ARMOUR,
		cost: 500,
		sell: 200,
		onWear: function () {
			player.effDamageReduction += 0.1
			player.fireRes += 10;
		}
	},
	{
		id: 41,
		name: "fleecing fleece",
		description: "This shoddily crafted jumper may be warm, but you can't help but feel like you're being ripped off.",
		enchantment: "+10% physical damage reduction\n+10 Ice Resistance",
		icon: "fleecing_fleece.png",
		type: "Armour",
		category: itemType.ARMOUR,
		cost: 500,
		sell: 200,
		onWear: function () {
			player.effDamageReduction += 0.1;
			player.iceRes += 10;
		}
	},
	{
		id: 42,
		name: "tinfoil-lined jacket",
		description: "Lining this jacket with tinfoil helps protect you from those secret government mind control rays. If you want to know more, I know this guy who does these internet videos ... wait, come back!",
		enchantment: "+10% physical damage reduction\n+10 Psychic Resistance",
		icon: "tinfoil_jacket.png",
		type: "Armour",
		category: itemType.ARMOUR,
		cost: 500,
		sell: 200,
		onWear: function () {
			player.effDamageReduction += 0.1;
			player.psychicRes += 10;
		}
	},
	{
		id: 43,
		name: "business suit",
		description: "Wearing this suit makes you feel like you're a real manager and more able to fire people with no remorse.",
		enchantment: "+10% physical damage reduction\n+10 Emotional Resistance",
		icon: "suit.png",
		type: "Armour",
		category: itemType.ARMOUR,
		cost: 500,
		sell: 200,
		onWear: function () {
			player.effDamageReduction += 0.1;
			player.emotionalRes += 10;
		}
	},
	{
		id: 44,
		name: "Santa's beard",
		description: "This beard is proof of you defeating the demon king of the underworld. Defeating such a powerful demon so early in your adventuring career makes you feel one step ahead.",
		enchantment: "+5 Max HP\n+1 Max MP\n+4 POW\n+4 DEF\n+2 INIT",
		icon: "santa_beard.png",
		type: "Accessory",
		category: itemType.ACC,
		sell: 100,
		onWear: function () {
			player.effHpMax += 5;
			player.effMpMax += 1;
			player.effPow += 4;
			player.effDef += 4;
			player.effInit += 2;
		}
	},
	{
		id: 45,
		name: "candy cane",
		description: "This tasty treat is shaped like an ancient symbol used to ward off icy demons. Scholars are unable to tell if this is a coincidence, but you can't argue with results.",
		enchantment: "+1 Fullness\n+2 Turns to midnight\n10 turns of +5 Ice Resistance",
		icon: "candy_cane.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 1,
		turns: 2,
		cost: 5,
		sell: 5,
		onUse: function () {
			let success = eat(45);
			if (success) {
				hint(`${eatMessage(45)} You gain 10 turns of Candy Casing.`, "g");
				addBuff(16, 10);
			}
			return success;
		}
	},
	{
		id: 46,
		name: "icicle",
		description: "This large sharp chunk of ice that clearly broke off of a roof is labelled as being made from \"all natural organic Happyville rain water\" and sold to gullible tourists such as yourself.",
		enchantment: "+10 Ice Damage",
		icon: "icicle.png",
		type: "Weapon",
		category: itemType.WEAPON,
		cost: 12,
		sell: 12,
		onWear: function () {
			player.iceDamage += 10;
		}
	},
	{
		id: 47,
		name: "stealthy cardboard box",
		description: "This might look like a standard cardboard box, but it's actually a high-tech box disguise kit. You enter it from underneath, so it's totally different.",
		enchantment: "10 turns of -5% chance for a combat",
		icon: "upsidedown_cardboard_box.png",
		type: "Potion",
		category: itemType.POTION,
		sell: 50,
		onUse: function () {
			hint("You crawl under the box and gain 10 turns of Box Disguise.", "g");
			addBuff(17, 10);
			return true;
		}
	},
	{
		id: 48,
		name: "ritual candle",
		description: "This candle is used during the festive cermonies in Happyville. Ancient traditions say it is used to ward off cold evil spirits. Pffft, yeah right.",
		enchantment: "10 turns of +5 Fire Damage",
		icon: "candle.png",
		type: "Potion",
		category: itemType.POTION,
		cost: 8,
		sell: 8,
		onUse: function () {
			hint("You close your eyes, give your hand and gain 10 turns of Eternal Flame.", "g");
			addBuff(19, 10);
			return true;
		}
	},
	{
		id: 49,
		name: "festive pudding",
		description: "This stodgy cake is a traditional festive Happyville desert, but it's so dense and filling, you wonder if it really makes sense to be a desert.",
		enchantment: "+3 Fullness\n+8 Turns to midnight",
		icon: "festive_pudding.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 3,
		turns: 8,
		cost: 25,
		sell: 25,
		onUse: function () {
			let success = eat(49);
			if (success) {
				hint(eatMessage(49), "g");
			}
			return success;
		}
	},
	{
		id: 50,
		name: "Happyville snowglobe",
		description: "This snowglobe contains a tiny model of Happyville inside. The surrounding glass is magnifying so it looks bigger than it is.",
		enchantment: "10 turns of +10% item drop chance",
		icon: "snowglobe.png",
		type: "Potion",
		category: itemType.POTION,
		cost: 20,
		sell: 20,
		onUse: function () {
			hint("You pour the snow out of the snowglobe and gain 10 turns of Magnifying Globe.", "g");
			addBuff(20, 10);
			return true;
		}
	},
	{
		id: 51,
		name: "small glob of mud",
		description: "This small glob of mud is pulsating slightly. I'm sure it'll be fine, what's it going to do? Grow by itself?",
		enchantment: "Somebody else might want this",
		icon: "glob_of_mud.png",
		type: "Miscellaneous",
		category: itemType.MISC,
		sell: 120
	},
	{
		id: 52,
		name: "Really Big Sword",
		description: "Wow, this sword is enormous! It's about as big as you are. It's so heavy it takes a huge amount of time to swing it though.",
		enchantment: "+15 POW\n-25 INIT",
		icon: "really_big_sword.png",
		type: "Weapon",
		category: itemType.WEAPON,
		sell: 125,
		onWear: function () {
			player.effPow += 15;
			player.effInit -= 25;
		}
	},
	{
		id: 53,
		name: "lots of beans",
		description: "Beans, beans, the musical fruit. This is an entire orchestra of canned baked beans.",
		enchantment: "+4 Fullness\n+12 Turns to midnight",
		icon: "cans_of_beans.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 4,
		turns: 12,
		sell: 50,
		onUse: function () {
			let success = eat(53);
			if (success) {
				hint(eatMessage(53), "g");
			}
			return success;
		}
	},
];
