var effects = [
	{
		id: 0,
		name: "Wrestling With Your Thoughts",
		description: "You are at peace with wrestling.",
		enchantment: "+10 Max HP<br>+3 POW",
		icon: "wrestle_thought.png",
		effect: function()
		{
			player.effHpMax += 10;
			player.effPow += 3;
		}
	},
	{
		id: 1,
		name: "Pirate Might",
		description: "Might makes right.",
		enchantment: "+2 Max MP<br>+3 POW",
		icon: "pirate_face.png",
		effect: function()
		{
			player.effMpMax += 2;
			player.effPow += 2;
		}
	},
	{
		id: 2,
		name: "Ancestral Motivation",
		description: "You've received reassurances from your ancestors and are feeling motivated.",
		enchantment: "+3 POW<br>+10 INIT",
		icon: "ghost_talk.png",
		effect: function()
		{
			player.effPow += 3;
			player.effInit += 10;
		}
	},
	{
		id: 3,
		name: "Showing off",
		description: "Wrestling isn't about fighting skill, it's all about how it looks to the audience.",
		enchantment: "Critical hit damage multiplier +30%",
		icon: "no_image.png",
		effect: function()
		{
			player.effCritMultiplier += 0.3;
		}
	},
	{
		id: 4,
		name: "Crème Casing",
		description: "The safety of the enchanted sugar casing makes you happy, like a cat that's just gotten the crème.",
		enchantment: "+5 DEF",
		icon: "creme_brulee.png",
		effect: function()
		{
			player.effDef += 5;
		}
	},
	{
		id: 5,
		name: "Greased Up",
		description: "It's hard to be held in a chokehold when you're this slippery.",
		enchantment: "+20 INIT",
		icon: "grease.png",
		effect: function()
		{
			player.effInit += 20;
		}
	},
	{
		id: 6,
		name: "Orcine Porcine Power",
		description: "Orc pork comes from only the toughest pigs, fed an endless diet of growth hormones. They're having an effect on you.",
		enchantment: "+7 POW",
		icon: "pork.png",
		effect: function()
		{
			player.effPow += 7;
		}
	},
	{
		id: 7,
		name: "Stormy Seas",
		description: "The strong winds of the high seas are following you around, battering anyone who gets close to you.",
		enchantment: "Deals +5 Ice Damage whenever an enemy hits you.",
		icon: "stormy_seas.png",
		effect: function()
		{}
	},
	{
		id: 8,
		name: "Double Speed",
		description: "You're moving so fast, if this game had voice acting, everyone would be talking in a slow deep voice.",
		enchantment: "+100% INIT",
		icon: "no_image.png",
		effect: function()
		{
			player.effInit += player.baseInit;
		}
	},
	{
		id: 9,
		name: "Lemony Fizz",
		description: "You're enchanted by the lemony fizz. You feel like your mind is free to wander the universe, and all the other places too.",
		enchantment: "Restore 1MP per turn",
		icon: "no_image.png",
		effect: function()
		{
			player.mpRegen += 1;
		}
	},
];
