const skillType = {
	COMBAT: 0,
	NONCOMBAT: 1,
	PASSIVE: 2,
	TOGGLEABLE: 3
}

const skillSource = {
	WRESTLER: 0,
	MYSTIC: 1,
	PIRATE: 2, // first three values match jobEnum, used for personal trainer
	STARTER: 3,
	DRELLAUBIG: 4,
	DRELLAUSMALL: 5
}

/*
id: Same number as position in the array
name: Displayed name of the skill
description: Flavour text when clcicked on
enchantment: Bold blue text when clicked on describing mechanics
icon: filename of image, relative to images folder
source: Where the skill is obtained, one of the skillSource enum values, used for filtering for various lists
category: type of skill, one of the skillType enum values
cost: (optional) MP Cost to use
price: (optional) If this is a purchasable class skill, how much Gold it costs to buy
level: (optional) If this is a purchasable class skill, what level you have to be to buy it
onUse: (optional) if a combat or non-combat skill, what happens when you use it. (Passives are applied in calculateStats() or where otherwise applicable)
*/
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
		source: skillSource.STARTER,
		category: skillType.NONCOMBAT,
		cost: 1,
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
		source: skillSource.STARTER,
		category: skillType.COMBAT,
		cost: 1,
		onUse: function () {
			if (monster.castPounce == 1) {
				hint ("You've already pounced this combat!", "r");
				return false;
			}
			regularAttack (player.effPow, "", "You leap forward at your opponent with sheer ferocity!");
			monster.castPounce = 1;
			return true;
		}
	},
	{
		id: 2,
		name: "Grease Up",
		description: "When you want to engage in Oil Wrestling but can only afford the nearest alternative...",
		enchantment: "10 turns of:<br>+20 INIT",
		icon: "grease.png",
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.WRESTLER,
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
		source: skillSource.STARTER,
		category: skillType.NONCOMBAT,
		cost: 1,
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
		source: skillSource.STARTER,
		category: skillType.COMBAT,
		cost: 1,
		onUse: function () {
			addCombatText ("Crackers flaps over to your opponent and digs his beak into their head.");
			let damage = 35 - monster.def;
			if (damage <= 0)
			{
				damage = 1;
			}
			addCombatText ("Your opponent takes " + damage + " damage!");
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
		source: skillSource.PIRATE,
		category: skillType.PASSIVE,
		price: 50,
		level: 2,
	},
	{
		id: 23,
		name: "Storm of the Sea",
		description: "You summon the cold strong wind of the high sea to follow you around.",
		enchantment: "10 turns of:<br>Deals 5 Ice Damage whenever an enemy hits you",
		icon: "stormy_seas.png",
		source: skillSource.PIRATE,
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
		name: "Special Delivery",
		description: "Crackers will deliver a special \"gift\" the next time you get close to your opponent.",
		enchantment: "A regular attack that also weakens your opponent's POW by 10%<br>(Once per combat)",
		icon: "no_image.png",
		source: skillSource.PIRATE,
		category: skillType.COMBAT,
		cost: 2,
		price: 250,
		level: 3,
		onUse: function () {
			if (monster.castSpecialDelivery == 1)
			{
				hint ("I think your enemy has been delivered enough gifts this fight!", "r");
				return false;
			}
			regularAttack(
				player.effPow,
				"You run up to your opponent and smack them, while Crackers flies above them and drops a special treat on top of them.",
				"You deliver a critical blow while your opponent is distracted by the gifts delivered by Crackers overhead!");
			var amount = Math.ceil(monster.pow * 0.1);
			addCombatText(`Your opponent is grossed out by Crackers' gifts. Their POW drops by ${amount}!`);
			monster.pow -= amount;
			if (monster.pow < 1) {
				monster.pow = 1;
			}
			monster.castSpecialDelivery = 1;
			return true;
		}
	},
	{
		id: 25,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.PIRATE,
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
		source: skillSource.STARTER,
		category: skillType.NONCOMBAT,
		cost: 1,
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
		enchantment: "Deals 15 Emotional Damage",
		icon: "no_image.png",
		source: skillSource.STARTER,
		category: skillType.COMBAT,
		cost: 1,
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
			addCombatText ("Your opponent takes <span class='emotional'>" + damage + "</span> emotional damage!");
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
		category: skillType.PASSIVE,
		price: 250,
		level: 3,
	},
	{
		id: 45,
		name: "Spooky Ghost Story",
		description: "You come up with an impromptu spooky story. Who knows how your opponent will feel about it.",
		enchantment: "Deals damage equal to your POW in a random element",
		icon: "no_image.png",
		source: skillSource.MYSTIC,
		category: skillType.COMBAT,
		cost: 5,
		price: 250,
		level: 3,
		onUse: function () {
			let element = Math.floor(Math.random() * 4) + 1;
			let stories = [];
			let chosenStory = 0;
			let damage = 0;
			switch (element) {
				case elementEnum.FIRE:
					stories = [
						"a ghost pepper that haunts a mexican restaurant",
						"a demon from the underworld",
						"a gingerbread man that gains sentience",
						"a poltergeist in a candle shop",
						"the ghost of an arsonist"
					];
					chosenStory = Math.floor(Math.random() * stories.length);
					addCombatText ("You tell your opponent about " + stories[chosenStory] + ". They sweat with horror.");
					damage = calcFireDamage(player.effPow + player.fireDamage);
					addCombatText ("Your opponent takes <span class='fire'>" + damage + "</span> fire damage!");
					break;
				case elementEnum.ICE:
					stories = [
						"the evil santa, Dyslexic Satan",
						"an abandoned refrigerator that destroys the ozone layer, causing the apocolypse",
						"somebody getting the cold shoulder from their dead spouse during a seance",
						"a yeti that terrorises a remote mountain village",
						"the abominable snowman"
					];
					chosenStory = Math.floor(Math.random() * stories.length);
					addCombatText ("You tell your opponent about " + stories[chosenStory] + ". They shiver with horror.");
					damage = calcIceDamage(player.effPow + player.iceDamage);
					addCombatText ("Your opponent takes <span class='ice'>" + damage + "</span> ice damage!");
					break;
				case elementEnum.PSYCHIC:
					stories = [
						"an eldritch horror",
						"a group of dumb teenagers acting carelessly while being hunted by a serial killer",
						"a lame story you read on the internet about Lavender Town",
						"deep FNAF lore",
						"a possessed pistol that fires mind bullets"
					];
					chosenStory = Math.floor(Math.random() * stories.length);
					addCombatText ("You tell your opponent about " + stories[chosenStory] + ". They cover their ears with horror.");
					damage = calcPsychicDamage(player.effPow + player.psychicDamage);
					addCombatText ("Your opponent takes <span class='psychic'>" + damage + "</span> psychic damage!");
					break;
				case elementEnum.EMOTIONAL:
					stories = [
						"a collapsing orphanage",
						"a lost puppy",
						"the plot of the film Ghost",
						"the bad opinions expressed on social media by their favourite horror author",
						"a love story between two ghosts who are unable to hold hands"
					];
					chosenStory = Math.floor(Math.random() * stories.length);
					addCombatText ("You tell your opponent about " + stories[chosenStory] + ". They weep with horror.");
					damage = calcEmotionalDamage(player.effPow + player.emotionalDamage);
					addCombatText ("Your opponent takes <span class='emotional'>" + damage + "</span> emotional damage!");
					break;
			}
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
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
		source: skillSource.MYSTIC,
		category: skillType.NONCOMBAT,
		cost: 3,
		price: 100,
		level: 10,
		onUse: function () {
			
		}
	},

	/******
	DRELLA U BIG
	******/

	{
		id: 60,
		name: "Once per day monster banish (free combat, no rewards, not bosses)",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 61,
		name: "Once per day yellow ray (wins fight, gets all drops, not bosses)",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 62,
		name: "50% Doctor Discount",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 63,
		name: "Another 2 turn stun skill",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 64,
		name: "Big healing skill?",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 65,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 66,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 67,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 68,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 69,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUBIG,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},

	/******
	DRELLA U SMALL
	******/

	{
		id: 70,
		name: "Passive +10% item drops",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 71,
		name: "Passive +20% Gold",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 72,
		name: "+5% non-com buff",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 73,
		name: "+5% com buff",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 74,
		name: "Passive +10 Fire Res",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 75,
		name: "Passive +10 Ice res",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 76,
		name: "Passive +10 Psychic res",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 77,
		name: "Passive +10 Emotional res",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 78,
		name: "Passive +25 max HP and +5 max MP",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 79,
		name: "Passive 1MP regen",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 80,
		name: "+10 Monster stats buff",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 81,
		name: "Passive +1 fullness",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 82,
		name: "Basic noncombat healing skill?",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 83,
		name: "Passive +20 init",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 84,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 85,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 86,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 87,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 88,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
		onUse: function () {
			
		}
	},
	{
		id: 89,
		name: "",
		description: "",
		enchantment: "",
		icon: "no_image.png",
		source: skillSource.DRELLAUSMALL,
		category: skillType.NONCOMBAT,
		cost: 3,
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
