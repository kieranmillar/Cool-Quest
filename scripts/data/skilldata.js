const skillType = {
	COMBAT: 0,
	NONCOMBAT: 1,
	PASSIVE: 2,
	TOGGLEABLE: 3
}

var skills = [

	/******
	WRESTLER
	******/

	{
		id: 0,
		name: "Wrestle with your Thoughts",
		description: "You meditate over the deep energies of wrestling, putting you into a trance.",
		enchantment: "10 turns of:<br>+10 Max HP<br>+3 POW",
		icon: "wrestle_thought.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			castTutorialSkill();
			hint ("You think deeply about wrestling, gaining 10 turns of Wrestling Your Thoughts!", "g");
			return addBuff (0, 10);
		}
	},
	{
		id: 1,
		name: "Pounce",
		description: "Leap at your foe for an extra hard hit.",
		enchantment: "A regular attack that's guaranteed to be critical<br>(Once per combat)",
		icon: "pounce.png",
		job: jobEnum.WRESTLER,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			regularAttack (player.effPow, "", "You leap forward at your opponent with sheer ferocity!");
			return true;
		}
	},
	{
		id: 2,
		name: "Grease Up",
		description: "When you want to engage in Oil Wrestling but can only afford the nearest alternative...",
		enchantment: "10 turns of:<br>+20 INIT",
		icon: "grease.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 50,
		level: 2,
		onUse: function () {
			hint ("You summon a big jar of grease from the ether and pour it over yourself, gaining 10 turns of Greased Up!", "g");
			return addBuff (5, 10);
		}
	},
	{
		id: 3,
		name: "Showboating",
		description: "Giving your wrestling moves more flair makes them deal more damage. It's true!",
		enchantment: "10 turns of:<br>Critical hit damage multiplier +30%",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Toggleable",
		category: skillType.NONCOMBAT,
		cost: 4,
		price: 50,
		level: 2,
		onUse: function () {
			hint ("You strut your stuff, gaining 10 turns of Showing Off!", "g");
			return addBuff (3, 10);
		}
	},
	{
		id: 4,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 250,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 5,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 250,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 6,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 4,
		onUse: function () {
			
		}
	},
	{
		id: 7,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		price: 100,
		level: 4,
		onUse: function () {
			
		}
	},
	{
		id: 8,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 5,
		onUse: function () {
			
		}
	},
	{
		id: 9,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 5,
		onUse: function () {
			
		}
	},
	{
		id: 10,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 6,
		onUse: function () {
			
		}
	},
	{
		id: 11,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 6,
		onUse: function () {
			
		}
	},
	{
		id: 12,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 7,
		onUse: function () {
			
		}
	},
	{
		id: 13,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 7,
		onUse: function () {
			
		}
	},
	{
		id: 14,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 8,
		onUse: function () {
			
		}
	},
	{
		id: 15,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 8,
		onUse: function () {
			
		}
	},
	{
		id: 16,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 9,
		onUse: function () {
			
		}
	},
	{
		id: 17,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 9,
		onUse: function () {
			
		}
	},
	{
		id: 18,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	},
	{
		id: 19,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	},

	/******
	PIRATE
	******/

	{
		id: 20,
		name: "Mighty Pirate",
		description: function () {return "You're " + player.name + " and you're a mighty pirate!";},
		enchantment: "10 turns of:<br>+2 Max MP<br>+3 POW",
		icon: "pirate_face.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			castTutorialSkill();
			hint ("You take sight of your might, gaining 10 turns of Pirate Might!", "g");
			return addBuff (1, 10);
		}
	},
	{
		id: 21,
		name: "Peck",
		description: "Your pet parrot Crackers pecks the enemy.",
		enchantment: "Deals 35 physical damage",
		icon: "parrot.png",
		job: jobEnum.PIRATE,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			addCombatText ("Crackers flaps over to your opponent and digs his beak into their head.");
			let damage = 35 - monster.def;
			if (damage <= 0)
			{
				damage = 1;
			}
			addCombatText ("It takes " + damage + " damage!");
			monster.hp -= damage;
			return true;
		}
	},
	{
		id: 22,
		name: "Hearrrrty Meal",
		description: "Years of pirate experience have left you with the knowledge of how to avoid scurvy.",
		enchantment: "Eating food fully restores your HP",
		icon: "healthy_eating.png",
		job: jobEnum.PIRATE,
		type: "Passive",
		category: skillType.PASSIVE,
		price: 50,
		level: 2,
	},
	{
		id: 23,
		name: "Storm of the Sea",
		description: "You summon the cold strong wind of the high sea to follow you around.",
		enchantment: "10 turns of:<br>Deals +5 Ice Damage whenever an enemy hits you.",
		icon: "stormy_seas.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 5,
		price: 50,
		level: 2,
		onUse: function () {
			hint ("You bellow at the gods of the sea for their help, gaining 10 turns of Stormy Seas!", "g");
			return addBuff (7, 10);
		}
	},
	{
		id: 24,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 250,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 25,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 250,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 26,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 4,
		onUse: function () {
			
		}
	},
	{
		id: 27,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 4,
		onUse: function () {
			
		}
	},
	{
		id: 28,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 5,
		onUse: function () {
			
		}
	},
	{
		id: 29,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 5,
		onUse: function () {
			
		}
	},
	{
		id: 30,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 6,
		onUse: function () {
			
		}
	},
	{
		id: 31,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 6,
		onUse: function () {
			
		}
	},
	{
		id: 32,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 7,
		onUse: function () {
			
		}
	},
	{
		id: 33,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 7,
		onUse: function () {
			
		}
	},
	{
		id: 34,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 8,
		onUse: function () {
			
		}
	},
	{
		id: 35,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 8,
		onUse: function () {
			
		}
	},
	{
		id: 36,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 9,
		onUse: function () {
			
		}
	},
	{
		id: 37,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 9,
		onUse: function () {
			
		}
	},
	{
		id: 38,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	},
	{
		id: 39,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	},
	
	/******
	MYSTIC
	******/
	
	{
		id: 40,
		name: "Ancestral Pep Talk",
		description: "Who you gonna call? Ask your dead ancestral relatives for help and advice.",
		enchantment: "10 turns of:<br>+3 POW<br>+10 INIT",
		icon: "ghost_talk.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			castTutorialSkill();
			hint ("You talk to your ancestors, gaining 10 turns of Ancestral Motivation!", "g");
			return addBuff (2, 10);
		}
	},
	{
		id: 41,
		name: "Deliver Prophecy",
		description: "Tell your opponent about an unfortunate event in their near future.",
		enchantment: "Deals 15 Emotional Damage. Can be increased by Emotional Damage bonuses.",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			let prophecies = [
				"the next food they eat will give them indegestion",
				"they will stub their toe tomorrow morning",
				"they will pass gas at an important social gathering",
				"they will get stuck in a queue the next time they go shopping",
				"the next joke they tell will cause offense"
			];
			let chosenProphecy = Math.floor(Math.random() * prophecies.length);
			addCombatText ("You warn your opponent that " + prophecies[chosenProphecy] + ". They are stressed out by this information.");
			let damage = calcEmotionalDamage(15 + player.emotionalDamage);
			addCombatText ("It takes <span class='emotional'>" + damage + "</span> emotional damage!");
			monster.hp -= damage;
			return true;
		}
	},
	{
		id: 42,
		name: "Profiteering",
		description: "You charge your opponents for your time, and are happy to ramp up the costs. They'll never know.",
		enchantment: "+20% Gold from combats",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Passive",
		category: skillType.PASSIVE,
		price: 50,
		level: 2,
	},
	{
		id: 43,
		name: "Expose Secrets",
		description: "You expose your enemy's deepest darkest secrets, shocking them to their core. In reality it's just a generic guess, but it works pretty much all the time.",
		enchantment: "Stuns the enemy for 2 rounds<br>(Once per combat)",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 3,
		price: 50,
		level: 2,
		onUse: function () {
			if (monster.castExposeSecrets == 1)
			{
				hint ("You've already exposed this monster's secrets!", "r");
				return false;
			}
			addCombatText ("You walk up to your opponent and whisper their darkest secrets into their ear.");
			monster.castExposeSecrets = 1;
			monster.exposeSecretsRounds = 2;
			return true;
		}
	},
	{
		id: 44,
		name: "Master of Feng Shui",
		description: "Everywhere you go you rearrange the furniture to maximise the effectiveness your chakras. Or something like that.<br>Look I'll be honest, I don't really understand any of this stuff.",
		enchantment: "Restore 1 MP each turn",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Passive",
		category: skillType.PASSIVE,
		price: 250,
		level: 3,
	},
	{
		id: 45,
		name: "Spooky Ghost Story",
		description: "You tell a story so spooky, it chills your opponents to the bone.",
		enchantment: "Deals 80% of your POW as Ice Damage",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 5,
		price: 250,
		level: 3,
		onUse: function () {
			addCombatText ("You tell your opponent about a little girl walking alone in a dark wood that encounters a terrible fate. Your opponent shivers.");
			let damage = calcIceDamage(Math.floor(player.effPow * 0.80) + player.iceDamage);
			addCombatText ("It takes <span class='ice'>" + damage + "</span> damage!");
			monster.hp -= damage;
			return true;
		}
	},
	{
		id: 46,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 4,
		onUse: function () {
			
		}
	},
	{
		id: 47,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 4,
		onUse: function () {
			
		}
	},
	{
		id: 48,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 5,
		onUse: function () {
			
		}
	},
	{
		id: 49,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 5,
		onUse: function () {
			
		}
	},
	{
		id: 50,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 6,
		onUse: function () {
			
		}
	},
	{
		id: 51,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 6,
		onUse: function () {
			
		}
	},
	{
		id: 52,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 7,
		onUse: function () {
			
		}
	},
	{
		id: 53,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 7,
		onUse: function () {
			
		}
	},
	{
		id: 54,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 8,
		onUse: function () {
			
		}
	},
	{
		id: 55,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 8,
		onUse: function () {
			
		}
	},
	{
		id: 56,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 9,
		onUse: function () {
			
		}
	},
	{
		id: 57,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 9,
		onUse: function () {
			
		}
	},
	{
		id: 58,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	},
	{
		id: 59,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	}
];

// Casting your class basic buff skill is part of the tutorial
function castTutorialSkill() {
	if (player.quests[questEnum.TUTORIAL] != 4)	{
		return;
	}
	player.quests[questEnum.TUTORIAL] = 5;
	buff_tutorial.classList.remove("hide");
	house_tutorial2.classList.add("hide");
	house_tutorial3.classList.remove("hide");
}
