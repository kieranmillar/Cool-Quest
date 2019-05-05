var effects = [
	{
		id: 0,
		name: "Wrestling With Your Thoughts",
		description: "You are at peace with wrestling.",
		enchantment: "+3 Max MP<br />+5 STR",
		icon: "wrestle_thought.png",
		effect: function()
		{
			player.effMpMax += 3;
			player.effStr += 5;
		}
	},
	{
		id: 1,
		name: "Pirate Might",
		description: "Might makes right.",
		enchantment: "+2 Max HP<br />+2 Max MP<br />+2 STR<br />+2 DEF",
		icon: "cookie.png",
		effect: function()
		{
			player.effHpMax += 2;
			player.effMpMax += 2;
			player.effStr += 2;
			player.effDef += 2;
		}
	},
	{
		id: 2,
		name: "Ancestral Motivation",
		description: "You've received reassurances from your ancestors and are feeling motivated.",
		enchantment: "+1 DEF<br />+3 MAG<br />+4 SPD",
		icon: "ghost_talk.png",
		effect: function()
		{
			player.effDef += 1;
			player.effMag += 3;
			player.effSpd += 4;
		}
	},
	{
		id: 3,
		name: "Well Balanced",
		description: "Juggling should be enjoyed as part of a well balanced lifestyle.",
		enchantment: "+2 STR<br />+2 DEF<br />+2 MAG<br />+2 SPD",
		icon: "cookie.png",
		effect: function()
		{
			player.effStr += 2;
			player.effDef += 2;
			player.effMag += 2;
			player.effSpd += 2;
		}
	},
	{
		id: 4,
		name: "Crème Casing",
		description: "The safety of the enchanted sugar casing makes you happy, like a cat that's just gotten the crème.",
		enchantment: "+5 DEF",
		icon: "cookie.png",
		effect: function()
		{
			player.effDef += 5;
		}
	},
	{
		id: 5,
		name: "Greased Up",
		description: "It's hard to be held in a chokehold when you're this slippery.",
		enchantment: "+20 SPD",
		icon: "cookie.png",
		effect: function()
		{
			player.effSpd += 20;
		}
	},
	{
		id: 6,
		name: "Orcine Porcine Power",
		description: "Orc pork comes from only the toughest pigs, fed an endless diet of growth hormones. They're having an effect on you.",
		enchantment: "+7 STR",
		icon: "cookie.png",
		effect: function()
		{
			player.effStr += 7;
		}
	},
	{
		id: 7,
		name: "Stormy Seas",
		description: "The strong winds of the high seas are following you around, battering anyone who gets close to you.",
		enchantment: "Deals +5 Ice Damage whenever an enemy hits you.",
		icon: "cookie.png",
		effect: function()
		{
			player.stormySeas = 1;
		}
	},
];

var jugglingBalls = [
	{
		id: 0,
		name: "Fireball",
		description: "An old classic, loved by fantasy novellists everywhere.",
		enchantment: "+5 Fire Damage<br />(When thrown:<br />Deals 40 Fire Damage)",
		icon: "cookie.png",
		effect: function()
		{
			player.fireDamage += 5;
		}
	},
	{
		id: 1,
		name: "Medicine Ball",
		description: "A much more reliable way of staying healthy than swallowing pills. Imagine trying to swallow one of these...",
		enchantment: "+20 Max HP<br />Restore 5 HP each turn<br />(When thrown:<br />Restores 60 HP)",
		icon: "cookie.png",
		effect: function()
		{
			player.effHpMax += 20;
			player.hpRegen += 5;
		}
	},
	{
		id: 2,
		name: "Disco Ball",
		description: "This disco ball puts everyone into a trance, imagining trance music to go with the lights.",
		enchantment: "+40% Gold from combats<br />(When thrown:<br />TODO)",
		icon: "cookie.png",
		effect: function()
		{
			player.effGoldBoost += 40;
		}
	},
]