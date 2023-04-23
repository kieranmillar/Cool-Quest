/*
id: Same number as position in the array
name: Displayed name of the effect
description: Flavour text when clicked on
enchantment: Bold blue text when clicked on describing mechanics
icon: filename of image, relative to images folder
effect: (optional) Function with code for what it does. (Some effects are coded in areas where they are applicable)
*/
var effects = [
	{
		id: 0,
		name: "Wrestling With Your Thoughts",
		description: "You are at peace with wrestling.",
		enchantment: "+10 Max HP\n+3 POW",
		icon: "wrestle_thought.png",
		effect: function() {
			player.effHpMax += 10;
			player.effPow += 3;
		}
	},
	{
		id: 1,
		name: "Pirate Might",
		description: "Might makes right.",
		enchantment: "+2 Max MP\n+3 POW",
		icon: "pirate_face.png",
		effect: function() {
			player.effMpMax += 2;
			player.effPow += 2;
		}
	},
	{
		id: 2,
		name: "Ancestral Motivation",
		description: "You've received reassurances from your ancestors and are feeling motivated.",
		enchantment: "+3 POW\n+10 INIT",
		icon: "ghost_talk.png",
		effect: function() {
			player.effPow += 3;
			player.effInit += 10;
		}
	},
	{
		id: 3,
		name: "Writing",
		description: "Your latest terrible opinion column on how the latest generation can't afford a house because they eat too many avocados has directed a lot of justifiable anger in your direction.",
		enchantment: "+10 to all enemy stats\n+20 Experience from combats",
		icon: "writing.png",
		effect: function() {
			player.effMl += 10;
		}
	},
	{
		id: 4,
		name: "Crème Casing",
		description: "The safety of the enchanted sugar casing makes you happy, like a cat that's just gotten the crème.",
		enchantment: "+5 DEF",
		icon: "creme_brulee.png",
		effect: function() {
			player.effDef += 5;
		}
	},
	{
		id: 5,
		name: "Greased Up",
		description: "It's hard to be held in a chokehold when you're this slippery.",
		enchantment: "+20 INIT",
		icon: "grease.png",
		effect: function() {
			player.effInit += 20;
		}
	},
	{
		id: 6,
		name: "Orcine Porcine Power",
		description: "Orc pork comes from only the toughest pigs, fed an endless diet of growth hormones. They're having an effect on you.",
		enchantment: "+7 POW",
		icon: "pork.png",
		effect: function() {
			player.effPow += 7;
		}
	},
	{
		id: 7,
		name: "Storm of the Sea",
		description: "The strong winds of the high seas are following you around, battering anyone who gets close to you.",
		enchantment: "Deal 10 Ice Damage whenever an enemy hits you",
		icon: "stormy_seas.png"
	},
	{
		id: 8,
		name: "Your Invisible Now",
		description: "The spicy liquid you drank gave you flamin' lips. It's like riding to work in 2025.",
		enchantment: "+100 INIT",
		icon: "invisible.png",
		effect: function() {
			player.effInit += 100;
		}
	},
	{
		id: 9,
		name: "Lemony Fizz",
		description: "You're enchanted by the lemony fizz. You feel like your mind is free to wander the universe, and all the other places too.",
		enchantment: "Restore 1MP per turn",
		icon: "lemony_fizz.png",
		effect: function() {
			player.mpRegen += 1;
		}
	},
	{
		id: 10,
		name: "Dramatic Entrance",
		description: "Your grand entrance is all set up. You forgot to also summon a health and safety team, oh well, I'm sure it won't be a problem.",
		enchantment: "Deal 20 Fire Damage at the start of combat",
		icon: "dramatic_entrance.png"
	},
	{
		id: 11,
		name: "Wrestlemania",
		description: "In your crazed, manic state you went off-script and now everybody is watching you.",
		enchantment: "+5% chance for a combat",
		icon: "wrestlemania.png",
		effect: function() {
			player.combatRate += 5;
		}
	},
	{
		id: 12,
		name: "Bird Watching",
		description: "You're sitting in silence and watching the world go by.",
		enchantment: "-5% chance for a combat",
		icon: "bird_watching.png",
		effect: function() {
			player.combatRate -= 5;
		}
	},
	{
		id: 13,
		name: "Yodelling",
		description: "Everyone can hear you for miles around and are all heading to your location to do something about it.",
		enchantment: "+5% chance for a combat",
		icon: "no_image.png",
		effect: function() {
			player.combatRate += 5;
		}
	},
	{
		id: 14,
		name: "Hands-on Experience",
		description: "You set your minion to mop the mizzenmast, batten down the hatches, and many other tasks that sound pirate-y.",
		enchantment: "+4 minion experience from combats",
		icon: "mop.png",
		effect: function() {
			player.effMinionExpBonus += 4;
		}
	},
	{
		id: 15,
		name: "Crewmates",
		description: "You give your minions access to all the grog they could ever want. It makes them more productive.",
		enchantment: "+4 minion level",
		icon: "beer_mug.png",
		effect: function() {
			player.effMinionLevelBonus += 4;
		}
	},
	{
		id: 16,
		name: "Candy Casing",
		description: "The sugary shell of this stripy sweet shields you from snowy strikes.",
		enchantment: "+5 Ice Resistance",
		icon: "candy_cane.png",
		effect: function() {
			player.iceRes += 5;
		}
	},
	{
		id: 17,
		name: "Box Disguise",
		description: "This cunning disguise will fool your enemies into thinking you're just a cardboard box, at least for a little while.",
		enchantment: "-5% chance for a combat",
		icon: "upsidedown_cardboard_box.png",
		effect: function() {
			player.combatRate -= 5;
		}
	},
	{
		id: 18,
		name: "Bagpiping",
		description: "Your loud and off-tune toots are making everyone in the vicinity really mad.",
		enchantment: "+20 to all enemy stats\n+40 Experience from combats",
		icon: "bagpipes.png",
		effect: function() {
			player.effMl += 20;
		}
	},
	{
		id: 19,
		name: "Eternal Flame",
		description: "Do you understand? Do you feel the same? Am I only dreaming? Is this burning an eternal flame?",
		enchantment: "+5 Fire Damage",
		icon: "candle.png",
		effect: function() {
			player.fireDamage += 5;
		}
	},
	{
		id: 20,
		name: "Magnifying Globe",
		description: "You can peer through the empty snowglobe to get a better look at things, until your clumsy self drops and breaks it.",
		enchantment: "+10% item drop chance",
		icon: "empty_snowglobe.png",
		effect: function() {
			player.effItemBoost += 10;
		}
	},
	{
		id: 21,
		name: "Avoid Responsibility",
		description: "You're currently away on an important business trip, if anybody calls and asks.",
		enchantment: "-5% chance for a combat",
		icon: "avoid_responsibility.png",
		effect: function() {
			player.combatRate -= 5;
		}
	},
];
