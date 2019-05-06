const itemType = {
	HAT: 0,
	ARMOUR: 1,
	WEAPON: 2,
	SHIELD: 3,
	SHOES: 4,
	ACC: 5,
	FOOD: 6,
	POTION: 7,
	MISC: 8
}

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
			hint ("You commit your house's address to memory, then throw away the letter.", "g");
			$("#inventory_tutorial_1").hide();
			$("#inventory_tutorial_2").show();
			$("#link_house").show();
			player.questTutorial = 1;
			return true;
		}
	},
	{
		id: 1,
		name: "mystical postcard",
		description: "An enchanted postcard. It says 'VISIT DRELLA', and then in small letters it says 'Please, our tourism industry is dying!'",
		enchantment: "+1 Max HP<br />+1 STR<br />+1 MAG",
		icon: "mystical_postcard.png",
		type: "Accessory",
		category: itemType.ACC,
		equipStat: "MAG",
		equipValue: 1,
		sell: 0,
		onWear: function () {
			if (player.questTutorial == 2)
			{
				player.questTutorial = 3;
				$(".equip_tutorial").show();
				$(".house_tutorial_1").hide();
				$(".house_tutorial_2").show();
			}
			player.effHpMax += 1;
			player.effStr += 1;
			player.effMag += 1;
		}
	},
	{
		id: 2,
		name: "cookie",
		description: "You clicked the cookie. Gameplay at its finest!",
		enchantment: "+1 Fullness<br />+1 Turn to midnight<br />Restores 5 MP",
		icon: "cookie.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 1,
		turns: 1,
		cost: 5,
		sell: 1,
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
		enchantment: "+1 STR<br />+1 MAG",
		icon: "stick.png",
		type: "Weapon",
		category: itemType.WEAPON,
		equipStat: "STR",
		equipValue: 1,
		cost: 20,
		sell: 10,
		onWear: function () {
			player.effStr += 1;
			player.effMag += 1;
		}
	},
	{
		id: 4,
		name: "health potion",
		description: "This red potion is labelled as being filled with healing medicine. In reality it's just blood to replace all the blood you lost.",
		enchantment: "Restores 20-25 HP<br />Can be used in combat",
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
		name: "running shoes",
		description: "Run. Jump. Swim. Cycle. Die.",
		enchantment: "+30 SPD<br />-10 Max HP",
		icon: "running_shoes.png",
		type: "Shoes",
		category: itemType.SHOES,
		equipStat: "SPD",
		equipValue: 5,
		cost: 100,
		sell: 50,
		onWear: function () {
			player.effSpd += 30;
			player.effHpMax -= 10;
		}
	},
	{
		id: 6,
		name: "straightened paperclip",
		description: "A paperclip that has been pulled into a straight piece of metal by a bored worker. Perfect for stabbing.",
		enchantment: "+2 STR<br />Can be used in combat to deal 40 physical damage",
		icon: "straight_paperclip.png",
		type: "Weapon, Combat Item",
		category: itemType.WEAPON,
		equipStat: "STR",
		equipValue: 1,
		sell: 5,
		onWear: function () {
			player.effStr += 2;
		},
		onCombat: function () {
			addCombatText ("You hurl the paperclip at your enemy like a spear.");
			let damage = 40 - monster.def;
			if (damage <= 0)
			{
				damage = 1;
			}
			addCombatText ("It takes " + damage + " damage!");
			monster.hp -= damage;
		}
	},
	{
		id: 7,
		name: "cardboard panel",
		description: "A dry piece of cardboard box. Provides barely any defense, but also max HP for some reason.",
		enchantment: "+3 Max HP<br />+1 DEF<br />Can be used in combat to reduce incoming damage by 80%",
		icon: "cardboard_panel.png",
		type: "Shield, Combat Item",
		category: itemType.SHIELD,
		equipStat: "DEF",
		equipValue: 1,
		sell: 10,
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
		enchantment: "+1 Max MP<br />+3 MAG",
		icon: "tiny_staff.png",
		type: "Weapon",
		category: itemType.WEAPON,
		equipStat: "MAG",
		equipValue: 3,
		sell: 5,
		onWear: function () {
			player.effMpMax += 1;
			player.effMag += 3;
		}
	},
	{
		id: 9,
		name: "town hall key",
		description: "This key unlocks the front door of the town hall.",
		enchantment: "Unlocks the Town Hall",
		icon: "key.png",
		type: "Useable",
		category: itemType.MISC,
		sell: 0,
		onUse: function () {
			hint ("You unlock the town hall's front door and the key vanishes, like all good video game keys.", "g");
			player.questTownHall = 3;
			return true;
		}
	},
	{
		id: 10,
		name: "dusty ring",
		description: "The dust has fused to this enchanted ring, dampening its effectiveness.",
		enchantment: "+3 STR<br />+3 MAG<br />+5 SPD",
		icon: "dusty_ring.png",
		type: "Accessory",
		category: itemType.ACC,
		equipStat: "MAG",
		equipValue: 4,
		sell: 20,
		onWear: function () {
			player.effStr += 3;
			player.effMag += 3;
			player.effSpd += 5;
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
		equipStat: "DEF",
		equipValue: 3,
		sell: 5,
		onWear: function () {
			player.effDef += 2;
		}
	},
	{
		id: 12,
		name: "tiny shoes",
		description: "Merely a few dozen sizes too small, it will fit comfortably on your big toe.",
		enchantment: "+5 SPD",
		icon: "tiny_shoes.png",
		type: "Shoes",
		category: itemType.SHOES,
		equipStat: "SPD",
		equipValue: 3,
		sell: 5,
		onWear: function () {
			player.effSpd += 5;
		}
	},
	{
		id: 13,
		name: "perfect pasty",
		description: "This pasty is so well made and cooked, you feel certain you'll never see another one like it in your lifetime.",
		enchantment: "+2 Fullness<br />+12 Turns to midnight",
		icon: "cookie.png",
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
		enchantment: "+4 Fullness<br />+10 Turns to midnight",
		icon: "microwave_meal.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 4,
		turns: 10,
		sell: 20,
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
		enchantment: "+1 Fullness<br />+2 Turns to midnight<br />10 turns of +5 DEF",
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
		name: "oven gloves",
		description: "These gloves will protect your hands from heat, but they're a bit damp so they aren't very good at it.",
		enchantment: "+5 Fire Resistance",
		icon: "cookie.png",
		type: "Accessory",
		category: itemType.ACC,
		equipStat: "MAG",
		equipValue: 8,
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
		icon: "cookie.png",
		type: "Weapon",
		category: itemType.WEAPON,
		equipStat: "STR",
		equipValue: 8,
		sell: 15,
		onWear: function () {
			player.fireDamage += 5;
		}
	},
	{
		id: 18,
		name: "orc fork",
		description: "Stick a fork in it, your enemy is done.",
		enchantment: "+7 STR<br />+7 MAG",
		icon: "cookie.png",
		type: "Weapon",
		category: itemType.WEAPON,
		equipStat: "STR",
		equipValue: 6,
		sell: 15,
		onWear: function () {
			player.effStr += 7;
			player.effMag += 7;
		}
	},
	{
		id: 19,
		name: "orc pork",
		description: "Orcs love to consume a meat-only diet, believing it is the source of their strength. It's also the source of their heart attcks.",
		enchantment: "+3 Fullness<br />+6 Turns to midnight<br />20 turns of +7 STR",
		icon: "cookie.png",
		type: "Food",
		category: itemType.FOOD,
		fullness: 3,
		turns: 6,
		sell: 20,
		onUse: function () {
			let success = eat (19);
			if (success == true)
			{
				hint (eatMessage (19) + " You gain 20 turns of Orcine Porcine Power.", "g");
				addBuff (6, 20);
			}
			return success;
		}
	},
];