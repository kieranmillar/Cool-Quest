const skillType = {
	COMBAT: 0,
	NONCOMBAT: 1,
	PASSIVE: 2,
	JUGGLE: 3,
}

var skills = [

	/******
	WRESTLER
	******/

	{
		id: 0,
		name: "Wrestle with your Thoughts",
		description: "You meditate over the deep energies of wrestling, putting you into a trance.",
		enchantment: "10 turns of:<br />+3 Max MP<br />+5 STR",
		icon: "wrestle_thought.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			if (player.questTutorial == 4)
			{
				player.questTutorial = 5;
				$(".buff_tutorial").show();
				$(".house_tutorial_2").hide();
				$(".house_tutorial_3").show();
			}
			hint ("You think deeply about wrestling, gaining 10 turns of Wrestling Your Thoughts!", "g");
			return addBuff (0, 10);
		}
	},
	{
		id: 1,
		name: "Pounce",
		description: "Leap at your foe for an extra hard hit.",
		enchantment: "A regular attack that's guaranteed to be critical",
		icon: "pounce.png",
		job: jobEnum.WRESTLER,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			regularAttack (player.effStr - monster.def, "", "You leap forward at your opponent with sheer ferocity!");
		}
	},
	{
		id: 2,
		name: "Grease Up",
		description: "When you want to engage in Oil Wrestling but can only afford the nearest alternative...",
		enchantment: "10 turns of:<br />+20 SPD",
		icon: "cookie.png",
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
		name: "Pro Wrestling Magic",
		description: "You channel your magic into making your wrestling moves look even more stupid.",
		enchantment: "Every 2 points of MAG increase the Critical Hit damage multiplier by 1%",
		icon: "cookie.png",
		job: jobEnum.WRESTLER,
		type: "Passive",
		category: skillType.PASSIVE,
		price: 50,
		level: 2,
	},
	{
		id: 4,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 200,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 5,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.WRESTLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 200,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 6,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		id: 8,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		enchantment: "10 turns of:<br />+2 Max HP<br />+2 Max MP<br />+2 STR<br />+2 DEF",
		icon: "cookie.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			if (player.questTutorial == 4)
			{
				player.questTutorial = 5;
				$(".buff_tutorial").show();
				$(".house_tutorial_2").hide();
				$(".house_tutorial_3").show();
			}
			hint ("You take sight of your might, gaining 10 turns of Pirate Might!", "g");
			return addBuff (1, 10);
		}
	},
	{
		id: 21,
		name: "Peck",
		description: "Your pet parrot Crackers pecks the enemy.",
		enchantment: "Deals 25 physical damage",
		icon: "cookie.png",
		job: jobEnum.PIRATE,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			addCombatText ("Crackers flaps over to your opponent and digs his beak into their head.");
			let damage = 25 - monster.def;
			if (damage <= 0)
			{
				damage = 1;
			}
			addCombatText ("It takes " + damage + " damage!");
			monster.hp -= damage;
		}
	},
	{
		id: 22,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 50,
		level: 2,
		onUse: function () {
			
		}
	},
	{
		id: 23,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 50,
		level: 2,
		onUse: function () {
			
		}
	},
	{
		id: 24,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 200,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 25,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.PIRATE,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 200,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 26,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		enchantment: "10 turns of:<br />+1 DEF<br />+3 MAG<br />+4 SPD",
		icon: "ghost_talk.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			if (player.questTutorial == 4)
			{
				player.questTutorial = 5;
				$(".buff_tutorial").show();
				$(".house_tutorial_2").hide();
				$(".house_tutorial_3").show();
			}
			hint ("You talk to your ancestors, gaining 10 turns of Ancestral Motivation!", "g");
			return addBuff (2, 10);
		}
	},
	{
		id: 41,
		name: "Channel Mystical Energies",
		description: "Channels your magical powers into your weapon.",
		enchantment: "A regular attack using MAG instead of STR",
		icon: "magic_sword.png",
		job: jobEnum.MYSTIC,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			regularAttack (player.effMag - monster.def, "You channel your magic force and hit your opponent.", "You overload your magic force and clobber your opponent!");
		}
	},
	{
		id: 42,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 50,
		level: 2,
		onUse: function () {
			
		}
	},
	{
		id: 43,
		name: "Expose Secrets",
		description: "You expose your enemy's deepest darkest secrets, shocking them to their core. In reality it's just a generic guess, but it works pretty much all the time.",
		enchantment: "Stuns the enemy for 2 rounds<br />(Once per combat)<br />(TODO: Implement this skill)",
		icon: "cookie.png",
		job: jobEnum.MYSTIC,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 3,
		price: 50,
		level: 2,
		onUse: function () {
			addCombatText ("TODO: Implement");
		}
	},
	{
		id: 44,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 200,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 43,
		name: "Spooky Ghost Story",
		description: "You tell a story so spooky, it chills your opponents to the bone.",
		enchantment: "Deals 80% of your MAG as Ice Damage",
		icon: "cookie.png",
		job: jobEnum.MYSTIC,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 5,
		price: 200,
		level: 3,
		onUse: function () {
			addCombatText ("You tell your opponent about a little girl walking alone in a dark wood that encounters a terrible fate. Your opponent shivers.");
			let damage = calcIceDamage(Math.floor(player.effMag * 0.80) + player.iceDamage);
			addCombatText ("It takes <span class='ice'>" + damage + "</span> damage!");
			monster.hp -= damage;
		}
	},
	{
		id: 46,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
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
		icon: "cookie.png",
		job: jobEnum.MYSTIC,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	},

	
	/******
	JUGGLER
	******/
	
	{
		id: 60,
		name: "Steady Yourself",
		description: "Every juggler knows that balance is key to avoiding catastrophe.",
		enchantment: "10 turns of:<br />+2 STR<br />+2 DEF<br />+2 MAG<br />+2 SPD",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 1,
		price: 0,
		level: 1,
		onUse: function () {
			if (player.questTutorial == 4)
			{
				player.questTutorial = 5;
				$(".buff_tutorial").show();
				$(".house_tutorial_2").hide();
				$(".house_tutorial_3").show();
			}
			hint ("Your inner ear energises, gaining 10 turns of Well Balanced!", "g");
			return addBuff (3, 10);
		}
	},
	{
		id: 61,
		name: "Summon Fireball",
		description: "Everyone knows juggling is pretty hot, but this is ridiculous.",
		enchantment: "+5 Fire Damage<br />(When thrown:<br />Deals 40 Fire Damage)",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Juggling Ball",
		category: skillType.JUGGLE,
		cost: 3,
		price: 0,
		level: 1,
		onUse: function () {
			return juggle (0);
		}
	},
	{
		id: 62,
		name: "Throw",
		description: "Waste not, want not. A good juggler knows how to recycle their unneeded balls.",
		enchantment: "Throws your oldest currently juggled ball for some effect depending on the ball",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Combat",
		category: skillType.COMBAT,
		cost: 1,
		price: 50,
		level: 2,
		onUse: function () {
			if (player.juggles.length == 0)
			{
				addCombatText ("You aren't juggling anything, so pick up a nearby rock and throw that instead.");
				let damage = 15 - monster.def;
				if (damage <= 0)
				{
					damage = 1;
				}
				addCombatText ("It takes " + damage + " damage!");
				monster.hp -= damage;
			}
			else
			{
				let x = player.juggles.shift();
				switch (x)
				{
					case 0:
						addCombatText ("You throw the fireball and it explodes! Goodness gracious great balls of fire!");
						let damage = calcFireDamage(40);
						addCombatText ("It takes <span class='fire'>" + damage + "</span> damage!");
						monster.hp -= damage;
						break;
					case 1:
						addCombatText ("You throw the medicine ball at the ground. It ruptures, splashing a large amount of healing medicine over you.");
						addCombatText (giveHp (60));
						break;
					case 2:
						//addCombatText ("You throw the medicine ball at the ground. It ruptures, splashing a large amount of healing medicine over you.");
						addCombatText ("TODO");
						break;
				}
				calculateStats();
				redrawInfoPanel();
			}
		}
	},
	{
		id: 63,
		name: "Summon Medicine Ball",
		description: "The second best medicine after laughter.",
		enchantment: "+20 Max HP<br />Restore 5 HP per turn<br />(When thrown:<br />Restores 60 HP)",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Juggling Ball",
		category: skillType.JUGGLE,
		cost: 5,
		price: 50,
		level: 2,
		onUse: function () {
			return juggle (1);
		}
	},
	{
		id: 64,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 200,
		level: 3,
		onUse: function () {
			
		}
	},
	{
		id: 65,
		name: "Summon Disco Ball",
		description: "It's impossible not to dance in the presence of the spinning lights of a disco ball. This should help to shake loose some spare change.",
		enchantment: "+40% Gold from combats<br />(When thrown:<br />TODO)",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Juggling Ball",
		category: skillType.JUGGLE,
		cost: 10,
		price: 200,
		level: 3,
		onUse: function () {
			return juggle (2);
		}
	},
	{
		id: 66,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 4,
		onUse: function () {
			
		}
	},
	{
		id: 67,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 4,
		onUse: function () {
			
		}
	},
	{
		id: 68,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 5,
		onUse: function () {
			
		}
	},
	{
		id: 69,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 5,
		onUse: function () {
			
		}
	},
	{
		id: 70,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 6,
		onUse: function () {
			
		}
	},
	{
		id: 71,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 6,
		onUse: function () {
			
		}
	},
	{
		id: 72,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 7,
		onUse: function () {
			
		}
	},
	{
		id: 73,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 7,
		onUse: function () {
			
		}
	},
	{
		id: 74,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 8,
		onUse: function () {
			
		}
	},
	{
		id: 75,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 8,
		onUse: function () {
			
		}
	},
	{
		id: 76,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 9,
		onUse: function () {
			
		}
	},
	{
		id: 77,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 9,
		onUse: function () {
			
		}
	},
	{
		id: 78,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	},
	{
		id: 79,
		name: "",
		description: "",
		enchantment: "",
		icon: "cookie.png",
		job: jobEnum.JUGGLER,
		type: "Non-combat",
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	}
];

function displaySkills()
{
	let noncomDiv = $("#skill_noncom");
	noncomDiv.empty();
	let comDiv = $("#skill_com");
	comDiv.empty();
	let juggleDiv = $("#skill_juggle");
	juggleDiv.empty();
	let passiveDiv = $("#skill_passive");
	passiveDiv.empty();
	let noncomCount = 0;
	let comCount = 0;
	let passiveCount = 0;
	let juggleCount = 0;
	for (var i in skills)
	{
		if (!player.skills[i])
		{
			continue;
		}
		var newElement = $('<div></div>');
		newElement.addClass("item");
		var textImageDiv = $('<span></span>');
		textImageDiv.addClass("item_Image");
		textImageDiv.html("<image src='./images/" + skills[i].icon + "'/><span>" + skills[i].name + "</span>");
		textImageDiv.attr({"onClick" : "openDialog (dialogType.SKILL, " + i + ");"});
		newElement.append(textImageDiv);
		switch (skills[i].category)
		{
			case skillType.NONCOMBAT:
				var castLink = $('<span></span>');
				castLink.html("<input type = 'button' value = 'Cast\n(" + skills[i].cost + " MP)' onClick = 'useNoncombatSkill(" + i + ")'>");
				newElement.append(castLink);
				noncomDiv.append(newElement);
				noncomCount ++;
				break;
			case skillType.COMBAT:
				comDiv.append(newElement);
				comCount ++;
				break;
			case skillType.PASSIVE:
				passiveDiv.append(newElement);
				passiveCount ++;
				break;
			case skillType.JUGGLE:
				var castLink = $('<span></span>');
				castLink.html("<input type = 'button' value = 'Summon\n(" + skills[i].cost + " MP)' onClick = 'useNoncombatSkill(" + i + ")'>");
				newElement.append(castLink);
				juggleDiv.append(newElement);
				juggleCount ++;
		}
		let noncomTitle = $("#skill_noncom_title");
		if (noncomCount == 0)
		{
			noncomTitle.hide();
			noncomDiv.hide();
		}
		else
		{
			noncomTitle.show();
			noncomDiv.show();
		}
		let comTitle = $("#skill_com_title");
		if (comCount == 0)
		{
			comTitle.hide();
			comDiv.hide();
		}
		else
		{
			comTitle.show();
			comDiv.show();
		}
		let juggleTitle = $("#skill_juggle_title");
		if (juggleCount == 0)
		{
			juggleTitle.hide();
			juggleDiv.hide();
		}
		else
		{
			juggleTitle.show();
			juggleDiv.show();
		}
		let passiveTitle = $("#skill_passive_title");
		if (passiveCount == 0)
		{
			passiveTitle.hide();
			passiveDiv.hide();
		}
		else
		{
			passiveTitle.show();
			passiveDiv.show();
		}
	}
}

function displayTrainer()
{
	let trainerDiv = $("#trainerList");
	trainerDiv.empty();
	let lastLevel = 0;
	for (var i in skills)
	{
		if (!player.skills[i])
		{
			if (skills[i].job == player.job)
			{
				if (skills[i].level != lastLevel)
				{
					lastLevel = skills[i].level;
					var newElement = $('<h2></h2>');
					newElement.text("Level " + lastLevel);
					trainerDiv.append(newElement);
				}
				var newElement = $('<div></div>');
				newElement.addClass("item");
				var textImageDiv = $('<span></span>');
				textImageDiv.addClass("item_Image");
				textImageDiv.html("<image src='./images/" + skills[i].icon + "'/><span>" + skills[i].name + "</span>");
				textImageDiv.attr({"onClick" : "openDialog (dialogType.SKILL, " + i + ");"});
				newElement.append(textImageDiv);
				var buyLink = $('<span></span>');
				buyLink.html("<input type = 'button' value = 'Train\n(" + skills[i].price + " Gold)' onClick = 'buySkill(" + i + ")'>");
				newElement.append(buyLink);
				trainerDiv.append(newElement);
			}
		}
	}
}

function buySkill (id)
{
	if (player.skills[id] > 0)
	{
		hint ("You already own that skill!", "r");
		return;
	}
	if (player.job != skills[id].job)
	{
		hint ("You haare the wrong job to learn that!", "r");
		return;
	}
	if (player.level < skills[id].level)
	{
		hint ("You aren't a high enough level to learn that!", "r");
		return;
	}
	if (player.gold >= skills[id].price)
	{
		player.gold -= skills[id].price;
		player.skills[id] = 1;
		displayTrainer();
		hint ("You learned the skill " + skills[id].name + "!", "g");
		save ();
	}
	else
	{
		hint ("You can't afford that!", "r");
	}
	redrawCharPane();
}

function useNoncombatSkill (x)
{
	x = parseInt(x);
	if (x == -1)
	{
		hint ("That's not a valid skill!", "r");
		return false;
	}
	if(skills[x].hasOwnProperty("onUse") == false)
	{
		hint ("That's not a useable skill!", "r");
		return false;
	}
	let cost = skills[x].cost;
	if (cost > player.mp)
	{
		hint ("You haven't got enough MP to cast that skill!", "r");
		return false;
	}
	if (skills[x].onUse())
	{
		player.mp -= cost;
	}
	redrawCharPane();
	save ();
	return true;
}