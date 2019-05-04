var elementEnum = {
	PHYS: 0,
	FIRE: 1,
	ICE: 2,
}

var monster = {
	id: 0,
	name: "",
	description: "",
	hp: 0,
	str: 0,
	def: 0,
	spd: 0,
	element: elementEnum.PHYS,
	exp: 0,
	gold: 0,
	drops: [],
	hitMessages: [""] //first message is for criticals
};

var combats = [
	{
		id: 0,
		name: "a spider warrior",
		description: "This bulky spider is stronger than his silk and has defeated many flies in his time.",
		icon: "spider_warrior.png",
		hp: 12,
		str: 6,
		def: 0,
		spd: -10,
		exp: 9,
		gold: 6,
		drops: [
			{id: 11, chance: 30}
		],
		hitMessages: [
			"It goes berzerk and tries to rip your head off! It fails, but still pulled out some hair.",
			"It slaps you in the face. This isn't so bad, but it happens 8 times in a row.",
			"It slams its whole body into you. It probably hurt itself more than it hurt you.",
			"It wields a pin and stabs you in the arm."
		]
	},
	{
		id: 1,
		name: "a spider mage",
		description: "This spider is a level 10 wizard and knows all manner of dangerous spells. However it's too small to do too much damage.",
		icon: "spider_mage.png",
		hp: 8,
		str: 7,
		def: 1,
		spd: -20,
		exp: 11,
		gold: 5,
		drops: [
			{id: 8, chance: 30}
		],
		hitMessages: [
			"It casts the ultimate spell, Meteor! A pebble falls on your head, but with enough speed that it really hurts.",
			"It fires tiny magic missiles at your chest. It stings a little.",
			"It casts a spell on itself, temporarily growing to twice the size! It then punches you in the face.",
			"You accidentally walk into its web. The web crackles with magical energy!"
		]
	},
	{
		id: 2,
		name: "a spider rogue",
		description: "Hiding in the shadows, this shifty spider will steal your precious belongings if you're not careful. Your really small precious belongings.",
		icon: "spider_rogue.png",
		hp: 5,
		str: 5,
		def: 3,
		spd: 0,
		exp: 8,
		gold: 8,
		drops: [
			{id: 12, chance: 30}
		],
		hitMessages: [
			"It performs a spinning leap, slashing you across the face like a shuriken!",
			"It leaps down your throat, looking for the other spiders you swallowed in your sleep. You knew about those, right?",
			"It suddenly disappears, before surprising you from behind with a sneaky slap.",
			"It tries to pick your pocket, but scratches your leg instead."
		]
	},
	{
		id: 3,
		name: "a tax form",
		description: "This isn't any old piece of paper, this horrifying bureaucratic nightmare is filled with checkboxes and places to detail sources of income. You'd better tear it up, before it causes you to fall asleep.",
		icon: "empty.png",
		hp: 9,
		str: 10,
		def: 3,
		spd: -20,
		exp: 14,
		gold: 23,
		drops: [
			{id: 6, chance: 70},
		],
		hitMessages: [
			"It audits your arse, asking probing questions about your internal affairs.",
			"It blows in the wind towards you and slashes you in the face. Agh! Papercut!",
			"You grab it and try to fold it in half as many times as possible, but get so frustrated at trying to fold it a 7th time that you headbutt the wall in anger.",
			"It folds itself into an oragami sword and slashes you!"
		]
	},
	{
		id: 4,
		name: "a soggy cardboard box",
		description: "You turn the corner and a soggy cardboard box is sitting there, looking as sorry for itself as a carboard box can. You know how to fight your way out of one, but can you fight your way into one?",
		icon: "empty.png",
		hp: 16,
		str: 8,
		def: 0,
		spd: -50,
		exp: 15,
		gold: 22,
		drops: [
			{id: 7, chance: 30}
		],
		hitMessages: [
			"A nearby box flings open, and out springs an angry bobcat, which snarls and slashes you repeatedly in the face!",
			"You get closer, and are really grossed out by the wet sliminess of soggy cardboard. You retch.",
			"You heavily stare at the cardboard, waiting for it to make a move. It just sits there, and you find the whole thing so boring you fall asleep, hitting your head on the concrete floor.",
			"You slip in the wet puddle the box is sitting in, and twist your ankle."
		]
	},
	{
		id: 5,
		name: "The Biscuit Monster",
		description: "You find a blue furry monster by the baked goods, scoffing down all of the biscuits he can find. He growls at you in a posh English accent 'B IS FOR BISCUIT, THAT'S GOOD ENOUGH FOR ME!'",
		icon: "empty.png",
		hp: 12,
		str: 14,
		def: 5,
		spd: 0,
		exp: 18,
		gold: 15,
		drops: [
			{id: 2, chance: 80},
			{id: 2, chance: 40},
			{id: 2, chance: 10}
		],
		hitMessages: [
			"He throws a soggy, limp biscuit at you. It keeps Rollin' Rollin' Rollin' until it smacks into you.",
			"He growls 'B IS ALSO FOR BEATING!'",
			"You consider swapping his biscuit for a brisket, decide to risk it, but he hits you with a frisket.",
			"He angrily throws a trash can at you. What a Grouch."
		]
	},
	{
		id: 6,
		name: "a microwave mimic",
		description: "You walk over to the microwaves to see if anyone left anything inside of them. As you press the button to open one of them, it dives at you and sprouts teeth. This one was a mimic!",
		icon: "empty.png",
		hp: 8,
		str: 12,
		def: 8,
		spd: 60,
		exp: 21,
		gold: 12,
		drops: [
			{id: 14, chance: 70}
		],
		hitMessages: [
			"It quickly microwaves a cup of hot soup for 40 seconds, and when finished, throws it over you.",
			"It opens its mouth and fires the spinning plate at you like a frisbee.",
			"It jumps up and chomps on your head. It's like having your face slammed in a door. Literally.",
			"It blasts microwaves at you, despite not being a real microwave. Or plugged in. How does that even work?"
		]
	},
	{
		id: 7,
		name: "a crème brûlée pyromaniac",
		description: "A man wiedling a crème brûlée torch and with a bunch of crème brûlées tied around his waist is standing in the middle of the room. He gives you a weird, spaced out grin, then charges at your flammable self.",
		icon: "empty.png",
		hp: 18,
		str: 18,
		def: 2,
		spd: 10,
		element: elementEnum.FIRE,
		exp: 20,
		gold: 18,
		drops: [
			{id: 15, chance: 60},
			{id: 16, chance: 30},
			{id: 17, chance: 30}
		],
		hitMessages: [
			"He tackles you to the ground and sets fire to your clothes. You roll around to put it out.",
			"He heats up a crème brûlée with his torch and throws it at you. It burns.",
			"He pulls out an aerosol can and uses his torch to turn it into a flamethrower.",
			"He uses his torch to light a cigarette, then after a quick smoke, stubs it out on your face."
		]
	},
	{
		id: 8,
		name: "an orc Major",
		description: "This highly decorated orc looks like a high ranking official around here. If anybody can help you get a talk with the leader, then this orc can.",
		icon: "empty.png",
		hp: 12,
		str: 14,
		def: 4,
		spd: 10,
		exp: 17,
		gold: 12,
		drops: [],
		hitMessages: [
			"He shouts and points at you, and a gang of other orcs run over and beat you up.",
			"He pulls one of his medals off his lapel, then pokes you with the pin.",
			"He majorly hits you. Major bummer!",
			"He angles his medals towards the sun and the reflection dazzles you. While stunned, he punches you."
		],
		afterCombat: function () {
			if (player.questOrcCamp < 5)
			{
				switch (player.questOrcCamp)
				{
					case 2:
						addCombatText ("You stand over the Major who is lying dazed on the floor.");
						addCombatText ("\"Hey, I'm looking to speak to your leader, any chance you could let me have a word with him?\" you ask politely.");
						addCombatText ("\"GET LOST HUMAN! NOBODY IS ALLOWED TO SPEAK TO THE LEADER WITHOUT PERMISSION FROM ÓLAFUR!\"");
						addCombatText ("You don't know who Ólafur is, could he be one of the other Majors? You walk off to look for another Major. There should be another one around here somewhere...");
						break;
					case 3:
						addCombatText ("You try a new ruse on this next Major.");
						addCombatText ("\"I just spoke to Ólafur and he told me I need to speak to the leader, I need you to take me to him.\"");
						addCombatText ("\"HAH! HOW IS THAT POSSIBLE? ÓLAFUR IS BACK IN HEADQUARTERS, YOU COULD NOT HAVE SPOKEN TO HIM! YOU CAN'T FOOL ME!\"");
						addCombatText ("Rats, you'll get it right next time...");
						break;
					case 4:
						addCombatText ("You clear your throat and try to sound as annoyed as possible.");
						addCombatText ("\"Now that you will listen to me instead of fight me, I am a messenger. I have been sent by Ólafur to deliver important news. Please take me to the leader.\"");
						addCombatText ("\"OH I AM SORRY! MEET ME AT THE TENT AND I WILL LET YOU IN!\"");
						addCombatText ("Success! Time to talk to the leader.");
						break;
				}
				player.questOrcCamp ++;
			}	
			return true;
		}
	},
	{
		id: 9,
		name: "an orc chef",
		description: "",
		icon: "empty.png",
		hp: 12,
		str: 12,
		def: 1,
		spd: 0,
		element: elementEnum.FIRE,
		exp: 16,
		gold: 10,
		drops: [
			{id: 18, chance: 25},
			{id: 19, chance: 50}
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		]
	},
	{
		id: 10,
		name: "orc mess hall enemy 2",
		description: "",
		icon: "empty.png",
		hp: 12,
		str: 12,
		def: 1,
		spd: 0,
		exp: 16,
		gold: 10,
		drops: [

		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		]
	},
	{
		id: 11,
		name: "orc mess hall enemy 3",
		description: "",
		icon: "empty.png",
		hp: 12,
		str: 12,
		def: 1,
		spd: 0,
		exp: 16,
		gold: 10,
		drops: [

		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		]
	},
	{
		id: 12,
		name: "orc barracks enemy 1",
		description: "",
		icon: "empty.png",
		hp: 12,
		str: 12,
		def: 1,
		spd: 0,
		exp: 16,
		gold: 10,
		drops: [
			
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		]
	},
	{
		id: 13,
		name: "orc barracks enemy 2",
		description: "",
		icon: "empty.png",
		hp: 12,
		str: 12,
		def: 1,
		spd: 0,
		exp: 16,
		gold: 10,
		drops: [
			
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		]
	},
	{
		id: 14,
		name: "an orc weaponsmaster",
		description: "",
		icon: "empty.png",
		hp: 12,
		str: 12,
		def: 1,
		spd: 0,
		exp: 16,
		gold: 10,
		drops: [
			
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		],
		afterCombat: function () {
			return true;
		}
	},
	{
		id: 15,
		name: "an orc Major General",
		description: "",
		icon: "empty.png",
		hp: 12,
		str: 12,
		def: 1,
		spd: 0,
		exp: 16,
		gold: 10,
		drops: [
			
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		],
		afterCombat: function () {
			return true;
		}
	},
	{
		id: 16,
		name: "Björc",
		description: "",
		icon: "empty.png",
		hp: 12,
		str: 12,
		def: 1,
		spd: 0,
		exp: 16,
		gold: 10,
		drops: [
			
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		],
		afterCombat: function () {
			return true;
		}
	},
];