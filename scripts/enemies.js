var monster = {
	id: 0,
	name: "",
	description: "",
	hp: 0,
	str: 0,
	def: 0,
	spd: 0,
	exp: 0,
	gold: 0,
	drops: [],
	hitMessages: [""] //first message is for criticals
};

var combats = [
	{
		id: 0,
		name: "a piece of paper",
		description: "This isn't any old piece of paper, this horrifying bureaucratic nightmare is filled with checkboxes and places to detail sources of income. You'd better tear it up, before it causes you to fall asleep.",
		icon: "empty.png",
		hp: 9,
		str: 9,
		def: 3,
		spd: -20,
		exp: 14,
		gold: 5,
		drops: [
			{id: 6, chance: 40},
		],
		hitMessages: [
			"It audits your arse, asking probing questions about your internal affairs.",
			"It blows in the wind towards you and slashes you in the face. Agh! Papercut!",
			"You grab it and try to fold it in half as many times as possible, but get so frustrated at trying to fold it a 7th time that you headbutt the wall in anger.",
			"It folds itself into an oragami sword and slashes you!"
		]
	},
	{
		id: 1,
		name: "a soggy cardboard box",
		description: "You turn the corner and a soggy cardboard box is sitting there, looking as sorry for itself as a carboard box can. You know how to fight your way out of one, but can you fight your way into one?",
		icon: "empty.png",
		hp: 16,
		str: 7,
		def: 0,
		spd: -50,
		exp: 15,
		gold: 4,
		drops: [
			{id: 7, chance: 40}
		],
		hitMessages: [
			"A nearby box flings open, and out springs an angry bobcat, which snarls and slashes you repeatedly in the face!",
			"You get closer, and are really grossed out by the wet sliminess of soggy cardboard. You retch.",
			"You heavily stare at the cardboard, waiting for it to make a move. It just sits there, and you find the whole thing so boring you fall asleep, hitting your head on the concrete floor.",
			"You slip in the wet puddle the box is sitting in, and twist your ankle."
		]
	},
	{
		id: 2,
		name: "a spider warrior",
		description: "This bulky spider is stronger than his silk and has defeated many flies in his time.",
		icon: "empty.png",
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
		id: 3,
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
		id: 4,
		name: "a spider rogue",
		description: "Hiding in the shadows, this shifty spider will steal your precious belongings if you're not careful. Your really small precious belongings.",
		icon: "empty.png",
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
	}
];