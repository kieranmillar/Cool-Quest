var elementEnum = {
	PHYSICAL: 0,
	FIRE: 1,
	ICE: 2,
	PSYCHIC: 3,
	EMOTIONAL: 4,
}

/*
id: Same number as its position in the array
name: Name of monster displayed during combat
description: Flavour text when you enter the combat
icon: Filepath of image, relative to images/big folder
hp: Monster HP
pow: Monster POW
def: Monster DEF
init: Monster INIT
element: (optional) one of elementEnum, will be PHYSICAL if not present. Elemental enemies deal damage exclusively in that element and have approriate elemental weakness and strength
fixedStats: (optional) should be true if present, defaults to false if not. Prevents random stat variation. Intended for unique entities such as bosses
boss: (optional) should be true if present, defaults to false if not. Marks the monster as a boss
exp: Base experience gain if you win combat
gold: Base Gold gain if you win combat
drops: Array of item drops, each iten is an object with two properties:
--- id: The id of the item
--- chance: The base drop chance of the item, as a whole percentage (between 1 and 100)
hitMessages: Array of 4 strings, first one is critical hit flavour text, other three are normal hit flavour texts
special: (optional) function to modify combat behaviour. Returns true or false if it wants to completely override standard behaviour or not
afterCombat: (optional) function to run custom code at the end of combat if you win
*/
var combats = [
	{
		id: 0,
		name: "a spider warrior",
		description: "This bulky spider is stronger than his silk and has defeated many flies in his time.",
		icon: "spider_warrior.png",
		hp: 12,
		pow: 8,
		def: 0,
		init: -10,
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
		pow: 2,
		def: 1,
		init: -20,
		element: elementEnum.PSYCHIC,
		exp: 11,
		gold: 5,
		drops: [
			{id: 8, chance: 30}
		],
		hitMessages: [
			"It casts the ultimate spell, Meteor! A pebble falls on your head, but with enough speed that it really hurts.",
			"It fires tiny magic missiles at your chest. It stings a little.",
			"It creates some psychic cobwebs in your mind. You can't think clearly.",
			"You accidentally walk into its web. The web crackles with magical energy!"
		]
	},
	{
		id: 2,
		name: "a spider rogue",
		description: "Hiding in the shadows, this shifty spider will sneakily descend from his silk thread and pick your pocket for your precious lint.",
		icon: "spider_rogue.png",
		hp: 7,
		pow: 7,
		def: 3,
		init: 0,
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
		icon: "tax_form.png",
		hp: 10,
		pow: 12,
		def: 3,
		init: -20,
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
		icon: "soggy_cardboard_box.png",
		hp: 16,
		pow: 10,
		def: 0,
		init: -50,
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
		description: "You find a blue furry monster by the baked goods, scoffing down all of the biscuits he can find. He growls at you in a posh English accent 'B IS FOR BISCUIT, THAT'S GOOD ENOUGH FOR ME!' before flipping you the Big Bird.",
		icon: "biscuit_monster.png",
		hp: 12,
		pow: 14,
		def: 5,
		init: 0,
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
		icon: "microwave_mimic.png",
		hp: 8,
		pow: 12,
		def: 8,
		init: 60,
		exp: 21,
		gold: 12,
		drops: [
			{id: 14, chance: 70}
		],
		hitMessages: [
			"It microwaves a cup of hot soup for 40 seconds, and when finished, throws it over you.",
			"It opens its mouth and fires the spinning plate at you like a frisbee.",
			"It jumps up and chomps on your head. It's like having your face slammed in a door. Literally.",
			"It blasts microwaves at you, despite not being a real microwave. Or plugged in. How does that even work?"
		]
	},
	{
		id: 7,
		name: "a crème brûlée pyromaniac",
		description: "A man wielding a crème brûlée torch and with a bunch of crème brûlées tied around his waist is standing in the middle of the room. He gives you a weird, spaced out grin, then charges at your flammable self.",
		icon: "creme_brulee_pyro.png",
		hp: 18,
		pow: 8,
		def: 2,
		init: 10,
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
		hp: 18,
		pow: 18,
		def: 4,
		init: 10,
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
			if (player.quests[questEnum.ORCCAMP] < 5)
			{
				switch (player.quests[questEnum.ORCCAMP])
				{
					case 2:
						addCombatText ("You stand over the Major who is lying dazed on the floor.");
						addCombatText ("\"Hey, I'm looking to speak to your leader, any chance you could let me have a word with them?\" you ask politely.");
						addCombatText ("\"GET LOST HUMAN! NOBODY IS ALLOWED TO SPEAK TO THE LEADER WITHOUT PERMISSION FROM ÓLAFUR!\"");
						addCombatText ("You don't know who Ólafur is, could he be one of the other Majors? You walk off to look for another Major. There should be another one around here somewhere...");
						break;
					case 3:
						addCombatText ("You try a new ruse on this next Major.");
						addCombatText ("\"I just spoke to Ólafur and he told me I need to speak to the leader, I need you to take me to them.\"");
						addCombatText ("\"HAH! HOW IS THAT POSSIBLE? ÓLAFUR IS BACK IN HEADQUARTERS, YOU COULD NOT HAVE SPOKEN TO HIM! YOU CAN'T FOOL ME!\"");
						addCombatText ("Rats, you'll get it right next time...");
						break;
					case 4:
						addCombatText ("You clear your throat and try to sound as professional as possible.");
						addCombatText ("\"Now that you will listen to me instead of fight me, I am a messenger. I have been sent by Ólafur to deliver important news. Please take me to the leader.\"");
						addCombatText ("\"OH I AM SORRY! MEET ME AT THE TENT AND I WILL LET YOU IN!\"");
						addCombatText ("Success! Time to talk to the leader.");
						break;
				}
				player.quests[questEnum.ORCCAMP] ++;
			}	
			return true;
		}
	},
	{
		id: 9,
		name: "an orc chef",
		description: "Spending all of your day toiling over producing enormous amounts of disgusting slop for a large orc army is enough to make anybody miserable. It's long, tiring, greuling work to produce enough gruel to feed an entire army, and nobody appreciates it. So when a human walks up to the food and looks at it with a mixture of horror and disgust, it would be the tipping point to make anyone snap. Which is exactly what just happened.",
		icon: "empty.png",
		hp: 16,
		pow: 10,
		def: 1,
		init: 0,
		element: elementEnum.FIRE,
		exp: 15,
		gold: 15,
		drops: [
			{id: 18, chance: 25},
			{id: 19, chance: 50}
		],
		hitMessages: [
			"He takes off his chef's hat, puts it onto your head, then pulls it down over your eyes. In the struggle to pull it off you trip and fall onto the grill.",
			"He scoops up a large spoonful of hot slop with his ladle and throws it at you! The slop, not the ladle.",
			"He picks you up and body slams you onto the hot plate.",
			"He smacks you with his ladle, which is still hot from being in the slop bowl."
		]
	},
	{
		id: 10,
		name: "an orc dork",
		description: "It's unusual to find an orc that tries to take the less violent path in life, and it's especially unusual to find one in the army. As such this poor orc gets endlessly bullied and therefore is looking for someone lower on the rung to lash out at and pass it on.",
		icon: "empty.png",
		hp: 20,
		pow: 6,
		def: 0,
		init: -10,
		element: elementEnum.PSYCHIC,
		exp: 12,
		gold: 12,
		drops: [
			{id: 20, chance: 25},
			{id: 21, chance: 25}
		],
		hitMessages: [
			"He calculates the optimal place to hit you, which is anywhere but with more force.",
			"He pulls out a ruler and slaps you with it. The force of the blow causes the ruler to snap. 'Hey! I thought this was meant to be shatterproof!'",
			"He pats you on the back. You reach around and find a KICK ME sign. Another orc runs over and kicks you in the butt.",
			"He lashes out at you with the worst fighting technique you've ever seen. You cringe while watching it."
		]
	},
	{
		id: 11,
		name: "a stalk orc",
		description: "A weird feeling comes over you, like you're being watched. You suddenly stop and quickly spin around. An orc in a trenchcoat and sunglasses quickly tries to duck behind a table. Looks like you were being followed by a spy! Not a very good one, fortunately.",
		icon: "empty.png",
		hp: 18,
		pow: 18,
		def: 0,
		init: 15,
		exp: 14,
		gold: 13,
		drops: [
			{id: 22, chance: 25},
		],
		hitMessages: [
			"She pulls out a walkie talkie. 'The buzzard is in the nest!' she whispers down it. A group of orcs in suits suddenly surround you and beat you up.",
			"She jots down a few notes into her notepad, then clicks the end of her pen. A green gas cloud shouts out, choking you in its dense fog.",
			"She twists the face of her watch. A small dart shoots out and hits you in the arm.",
			"She picks up a bottle and throws it to the side. You quickly look at it then turn back. She's gone! Suddenly she trips you up from behind."
		]
	},
	{
		id: 12,
		name: "a drunk infantryorc",
		description: "This orc has trained in the art of hand-to-hand combat and would be a deadly opponent one-to-one, if he hadn't just stumbled back to his barracks after a long day of drinking.",
		icon: "empty.png",
		hp: 23,
		pow: 24,
		def: 4,
		init: -15,
		exp: 23,
		gold: 14,
		drops: [],
		hitMessages: [
			"He staggers into a cupboard, knocking it over, right on top of you!",
			"He thrashes at you wildly in a drunken haze. Like a button masher in a fighting game, his moves are impossible to predict and counter.",
			"He still has a bottle of beer in his hand, and smashes you round the head with it.",
			"He tries to snap your neck. His lack of hand-to-eye coordination means he does a poor job of it, but it still hurts."
		]
	},
	{
		id: 13,
		name: "an orc parachuter",
		description: "The orcs aren't technologically advanced enough to have planes. Instead, this orc has been trained to get in a catapult and try to fling himself over walls, and hopefully get a soft landing with the blanket tied around his waist. Orc parachuters are not very common, typically because they don't last long.",
		icon: "empty.png",
		hp: 20,
		pow: 22,
		def: 6,
		init: 20,
		exp: 22,
		gold: 13,
		drops: [],
		hitMessages: [
			"He walks up to the window and whistles and waves off into the distance. 6 seconds later, another orc parachuter crashes through the ceiling right on top of you!",
			"He unties his blanket, twists it into a rope, and tries to strangle you with it.",
			"He climbs onto a table, then dives on top of you.",
			"He picks up a large and heavy catapult operator manual from a nearby shelf and drops it on your head."
		]
	},
	{
		id: 14,
		name: "an orc weaponsmaster",
		description: "You walk into the munitions store and find entire shelves full of weapons of all kinds, all neatly categorised by type and weight. As you reach out to grab one, you hear an orc clear their throat behind you. It's one of the orcs that looks after the munitions, and they don't take very kindly to anybody who tries to mess up their carefully organised inventory.",
		icon: "empty.png",
		hp: 35,
		pow: 38,
		def: 10,
		init: -5,
		exp: 26,
		gold: 20,
		drops: [
			{id: 23, chance: 30},
			{id: 24, chance: 30}
		],
		hitMessages: [
			"He fires a bazooka which hits you directly in the chest, exploding and turning you into a shower of gibs! Fortunately this is a video game so you respawn a few seconds later, but it seriously hurts.",
			"He fires a pistol at you. It misses, but knocks over a box of grenades behind you which all fall on your head.",
			"He picks up a flamethrower but it's out of gas, so instead he swings the gas canister at you with full force.",
			"He throws a grenade at you, which lands at your feet. You kick it away, but when it detonates, some shrapnel flies back and hits you in the leg."
		],
		afterCombat: function () {
			if (!player.zoneCounters[zoneCounterEnum.ORCMUNITIONS])
			{
				player.zoneCounters[zoneCounterEnum.ORCMUNITIONS] = 1;
			}
			return true;
		}
	},
	{
		id: 15,
		name: "an orc Major-General",
		description: "Could this be the orc camp leader? The large shiny medal on their lapel implies this is a very high ranking officer, the second-in-command perhaps. He spots you sneaking around the munitions store and runs towards you. As he gets closer, you realise he is the very model of a modern Major-General.",
		icon: "empty.png",
		hp: 40,
		pow: 45,
		def: 15,
		init: 10,
		exp: 35,
		gold: 50,
		drops: [
			{id: 25, chance: 100}
		],
		hitMessages: [
			"The General knows the kings of England, and quotes the fights Historical. He uses this vast array of military history knowledge to apply some serious damage.",
			"The General is very acquainted with matters Mathematical, and calculates the best angle to swing his fist at you.",
			"The General can tell at sight a Mauser rifle from a javelin, and throws the correct weapon at you.",
			"The General knows more of tactics than a novice in a nunnery, and applies a tactical punch to your face."
		],
		afterCombat: function () {
			addCombatText ("The General runs away. Guess you didn't get to ask any questions, but they did drop their medal. If you wear it, you could prove to the guards outside the leader's tent that you mean business.");
			player.zoneCounters[zoneCounterEnum.ORCMUNITIONS] = 2;
			return true;
		}
	},
	{
		id: 16,
		name: "Björc",
		description: "The orc camp leader. Residing in her Hidden Palace, having a human walk into it was an Alarm Call. Human Behaviour is so rude! She could Play Dead, Possibly Maybe, but this is a chance to be Violently Happy. Time to engage in some Big Time Sensuality!",
		icon: "empty.png",
		hp: 40,
		pow: 28,
		def: 10,
		init: 30,
		fixedStats: true,
		boss: true,
		exp: 125,
		gold: 100,
		drops: [
			{id: 26, chance: 100}
		],
		hitMessages: [
			"If you ever imagined what your body would sound like, slamming against rocks, Björc helps you solve that mystery.",
			"As much as she enjoys solitude, she wants to spend a little more time with you sometimes, sometimes. She decides to start now, and grapples you, throwing you to the floor.",
			"She's a fountain of blood in the shape of a girl. She spins around for a roundhouse kick, and you're hypnotised by the whirl.",
			"As the queen of provocation, fighting her makes you mad. You'd complain, but before you she's humble. Besides, she told you that if you complain once more, you'll meet an entire army of her."
		],
		afterCombat: function () {
			addCombatText ('Björc falls to the ground. "You have beaten me. What did you want from me?"');
			addCombatText ('"I only came here to ask you what you were doing setting up camp. We are worried you are planning an attack on the town."');
			addCombatText ('"What?! Hahaha of course not! We don\'t care about your puny town! We have much bigger enemies to fight! Why didn\'t you ask earlier?"');
			addCombatText ('You sigh. "Well, if you leave us alone, we\'re happy to leave you alone."');
			addCombatText ('"You have a deal!"');
			addCombatText ('With that issue resolved, it might be a good idea to retrn to the Mayor and relay the news.');
			player.quests[questEnum.ORCCAMP] = 6;
			return true;
		}
	},
	{
		id: 17,
		name: "a roach Queen",
		description: "The common dungeon Roach. Not really much of a threat normally, but the big issue is that they come in large groups. Very large groups. You spot a Roach Queen nearby, laying some eggs. Unfortunately, she also spots you, and starts to run away. You'd better chase her down, or soon this place will be overrun!",
		icon: "roach_queen.png",
		hp: 50,
		pow: 42,
		def: 6,
		init: 10,
		fixedStats: true,
		exp: 45,
		gold: 6,
		drops: [
			{id: 27, chance: 50}
		],
		hitMessages: [
			"A set of eggs behind you suddenly hatch into a group of Roaches, all of which waste no time feasting on a nearby snack. It's you. You're the snack.",
			"The Queen runs past some holes in the floor. As you chase after her, a set of giant spikes rise from the holes and stab you in the legs.",
			"The Queen runs over a pressure plate, and a giant door rises out of the floor right where you're standing, crushing you against the ceiling.",
			"As you give chase, the floor gives way beneath you. A trapdoor! You leap to safety, grazing yourself as you land on the floor."
		]
	},
	{
		id: 18,
		name: "an Evil Eye",
		description: "These deadly rooms are filled with these creepy eyes. They all sit still, staring in one direction, it seems as long as you don't step in their line of sight, they'll leave you alone.</p><p>Unfortunately, as you step forward, you hear a loud HMMMMM behind you, and one of the Evil Eyes is charging towards you. Oops.",
		icon: "evil_eye.png",
		hp: 60,
		pow: 32,
		def: 8,
		init: -25,
		fixedStats: true,
		exp: 38,
		gold: 5,
		drops: [
			{id: 28, chance: 50}
		],
		hitMessages: [
			"It rolls over you. Being crushed was bad enough, but the acid layer it's coated in really stings.",
			"It takes a bite out of you. Wait, how did it do that? It's just an eye?",
			"It won't stop staring at you. You feel so creeped out you strain a muscle while shivering.",
			"It headbutts you. Eyebutts. Whatever."
		]
	},
	{
		id: 19,
		name: "a wraithwing",
		description: "Wraithwings are more inquisitive than dangerous on their own, but get two together in a room and... well to be honest the threat level doesn't exactly go up much.",
		icon: "empty.png",
		hp: 35,
		pow: 38,
		def: 3,
		init: 25,
		fixedStats: true,
		exp: 32,
		gold: 3,
		drops: [{id: 33, chance: 50}],
		hitMessages: [
			"Another wraithwing appears directly behind you, the one place where something dangerous will actually happen.",
			"You jump up while trying to strike the wraithwing and land awkwardly, spraining your ankle.",
			"The wraithwing flaps its wings, causing some debris to strike you.",
			"You research how wraithwings behave in groups and end up with a thumping headache."
		]
	},
	{
		id: 20,
		name: "a Mud Baby",
		description: "You chop the corner of the red mud, and a large section falls off to the floor. It shakes and squirms, forming into a shapely blob, before sprouting eyes and a large mouth.</p><p>It would be cute if it wasn't so horrifying.",
		icon: "empty.png",
		hp: 130,
		pow: 60,
		def: 3,
		init: 0,
		fixedStats: true,
		exp: 80,
		gold: 8,
		drops: [
			{id: 29, chance: 100}
		],
		hitMessages: [
			"As you back up against the wall, the red mud grows and restricts your movement. The mud baby pounces on you.",
			"It spits a mud glob at you. It stings.",
			"The mud baby spins around, slapping you round the face with a large sloppy wad of mud.",
			"The mud baby clamps it mouth down on your hand. It has no teeth, but the weight of the mud still crushes your hand."
		]
	},
	{
		id: 21,
		name: "a Badger Badger",
		description: "A Badger Badger jumps at you from behind a bush and starts flapping his arms wildly. Does this mean it's angry? Better kill it quick before all its friends join in.",
		icon: "empty.png",
		hp: 33,
		pow: 27,
		def: 5,
		init: 30,
		exp: 28,
		gold: 18,
		drops: [
			{id: 31, chance: 50},
			{id: 31, chance: 20},
			{id: 31, chance: 10}
		],
		hitMessages: [
			"Other Badger Badgers suddenly appear from all directions, and they all dance on top of you.",
			"You get too close to the Badger Badger and get hit by his arms.",
			"You get distracted by other Badger Badgers appearing nearby, and the Badger Badger strikes!",
			"You are mesmerized by the catchy nature of the dancing, and join in. You sprain your muscles."
		]
	},
	{
		id: 22,
		name: "a Mushroom Mushroom",
		description: "You come across a large mushroom. There's not mushroom underneath its cap. Still, it seems like fungi to hang around.",
		icon: "empty.png",
		hp: 42,
		pow: 28,
		def: 2,
		init: -20,
		exp: 26,
		gold: 19,
		drops: [
			{id: 34, chance: 40},
			{id: 34, chance: 10}
		],
		hitMessages: [
			"A wild boar runs over thinking you are going to steal its food, and headbutts you.",
			"You lick the mushroom and get a serious headache.",
			"A nearby mushroom releases a toxic cloud. You choke.",
			"You touch the mushroom and a sharp pain courses through your arm."
		]
	},
	{
		id: 23,
		name: "a snake",
		description: "Something solid slithers out from beneath a nearby cardboard box. Snake? Snake?! SNAAAAAAAKE!!!!!! Ohhh it's a snake!",
		icon: "empty.png",
		hp: 30,
		pow: 25,
		def: 8,
		init: 75,
		exp: 29,
		gold: 16,
		drops: [
			{id: 47, chance: 20}
		],
		hitMessages: [
			"The snake sneaks up on you and knocks you off your feet.",
			"The snake coils itself around your neck and squeezes.",
			"The snake delivers a solid hit on you.",
			"The snake spits venom at you."
		]
	},
	{
		id: 24,
		name: "an amazing horse",
		description: "Look at this horse. It's amazing. If you tug on its mane, it turns into a plane. You don't want to know how to turn it back though.",
		icon: "empty.png",
		hp: 45,
		pow: 25,
		def: 0,
		init: 75,
		exp: 29,
		gold: 16,
		drops: [
			{id: 32, chance: 50},
			{id: 32, chance: 25}
		],
		hitMessages: [
			"It slaps you around the face. You don't see what it hit you with, but it leaves a purple stain on your face.",
			"It strikes you with its bullet-proof hooves.",
			"You try to sneak up behind the horse but it kicks you in the head.",
			"A short man with a big mustache and top hat walks over and punches you."
		]
	},
	{
		id: 25,
		name: "a present mimic",
		description: "You find a present sitting out in the open. You go to pick it up, but the present is a mimic! Time to turn this guy into a past mimic.",
		icon: "empty.png",
		hp: 40,
		pow: 34,
		def: 8,
		init: 75,
		exp: 32,
		gold: 28,
		drops: [
			{id: 36, chance: 100},
			{id: 36, chance: 80},
			{id: 36, chance: 60},
			{id: 36, chance: 40},
			{id: 36, chance: 20}
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		]
	},
	{
		id: 26,
		name: "the ghost of Christmas presents",
		description: "This factory is haunted by a ghost that tries to teach you moral lessons. Ugh, the worst kind of ghost. It's non-corporeal form makes it hard to deal damage with physical attacks.",
		icon: "empty.png",
		hp: 15,
		pow: 30,
		def: 999,
		init: 0,
		fixedStats: true,
		exp: 34,
		gold: 30,
		drops: [
			{id: 36, chance: 100},
			{id: 36, chance: 66},
			{id: 36, chance: 33}
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		]
	},
	{
		id: 27,
		name: "an underpaid factory worker",
		description: "A factory worker spots you prowling around the factory, and shrugs their shoulders. They're contractually obligated to fight you, but don't get paid enough to care.",
		icon: "empty.png",
		hp: 55,
		pow: 31,
		def: 2,
		init: 30,
		exp: 36,
		gold: 12,
		drops: [
			{id: 36, chance: 100},
			{id: 36, chance: 75},
			{id: 36, chance: 50},
			{id: 36, chance: 25}
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		]
	},
	{
		id: 28,
		name: "The Pinch",
		description: "There he is, the thief that's stealing all the presents! He must have them all in the giant swag bag!",
		icon: "empty.png",
		hp: 80,
		pow: 45,
		def: 6,
		init: 60,
		fixedStats: true,
		exp: 60,
		gold: 45,
		drops: [
			{id: 37, chance: 100},
			{id: 37, chance: 100},
			{id: 37, chance: 100},
			{id: 37, chance: 80},
			{id: 37, chance: 60},
			{id: 37, chance: 40},
			{id: 37, chance: 20}
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		],
		afterCombat: function () {
			addCombatText ('Hey, a bunch of presents spilled out from his swag bag!');
			return true;
		}
	},
	{
		id: 29,
		name: "Mr. Dolph",
		description: "You hear somebody shout behind you, \"Hey butthole!\" It turns out to be a reindeer with a really red and shiny nose. Wow, this guy is so rude!",
		icon: "empty.png",
		hp: 45,
		pow: 14,
		def: 12,
		init: 40,
		element: elementEnum.EMOTIONAL,
		fixedStats: true,
		exp: 40,
		gold: 35,
		drops: [
			
		],
		hitMessages: [
			"crit",
			"\"You'd have been able to dodge this hit if you weren't so fat!\" Ouch, right in the feels.",
			"hit2",
			"hit3"
		]
	},
	{
		id: 30,
		name: "a reindeer meteorologist",
		description: "As she charges towards you, you know what the weather forcast will be. It looks like rain, dear.",
		icon: "empty.png",
		hp: 65,
		pow: 41,
		def: 0,
		init: 20,
		exp: 41,
		gold: 32,
		drops: [
			
		],
		hitMessages: [
			"You ask her if there's a hurricane on the way. She says there isn't, then the wind suddenly picks up and a large fish hits you.",
			"You're bewitched by her movements and she hits you while dsitracted. You blame it on yourself, no, you blame it on the weatherman.",
			"She tells you today is going to be a bright and sunny day. Suddenly you're struck by lightning.",
			"Her movements are too unpredictable and she gets the upper hand, punching you right in the jaw."
		]
	},
	{
		id: 31,
		name: "a reindeer huntsman",
		description: "This deer sits in a fold-out chair drinking beer, aiming a rifle at any nearby humans. You contemplate the irony of how the tables have turned, while he turns his sights towards you.",
		icon: "empty.png",
		hp: 40,
		pow: 40,
		def: 15,
		init: 30,
		exp: 39,
		gold: 38,
		drops: [
			
		],
		hitMessages: [
			"You get sniped in the head. Boom! Headshot!",
			"He runs you over with a large 4x4 truck.",
			"He smashes a beer bottle on your head.",
			"He gives your ass such a whoopin'."
		]
	},
	{
		id: 32,
		name: "a stealth elf",
		description: "TODO",
		icon: "empty.png",
		hp: 45,
		pow: 12,
		def: 10,
		init: 80,
		element: elementEnum.ICE,
		exp: 45,
		gold: 45,
		drops: [
			{id: 47, chance: 35}
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		],
		special: function () {
			santasWorkshopAura();
			return false;
		}
	},
	{
		id: 33,
		name: "a wealth elf",
		description: "TODO",
		icon: "empty.png",
		hp: 55,
		pow: 11,
		def: 5,
		init: 10,
		element: elementEnum.ICE,
		exp: 42,
		gold: 100,
		drops: [],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		],
		special: function () {
			santasWorkshopAura();
			return false;
		}
	},
	{
		id: 34,
		name: "a health elf",
		description: "TODO",
		icon: "empty.png",
		hp: 80,
		pow: 13,
		def: 0,
		init: 20,
		element: elementEnum.ICE,
		exp: 44,
		gold: 43,
		drops: [
			{id: 4, chance: 60}
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		],
		special: function () {
			santasWorkshopAura();
			return false;
		}
	},
	{
		id: 35,
		name: "the demon king of the underworld, Santa",
		description: "TODO",
		icon: "empty.png",
		hp: 150,
		pow: 20,
		def: 15,
		init: 40,
		element: elementEnum.ICE,
		fixedStats: true,
		boss: true,
		exp: 250,
		gold: 180,
		drops: [
			{id: 44, chance: 100}
		],
		hitMessages: [
			"crit",
			"hit1",
			"hit2",
			"hit3"
		],
		special: function () {
			santasWorkshopAura();
			return false;
		},
		afterCombat: function () {
			addCombatText ('TODO: After combat text');
			addCombatText ("Looks like Happyville's problems are all solved now, best to return the Mayor for your reward.");
			player.quests[questEnum.HAPPYVILLE] = 5;
			return true;
		}
	},
];

function santasWorkshopAura() {
	if (player.iceRes >= 5) {
		addCombatText("Your ice resistance shields you completely from the chilling aura given off by this demon.");
	}
	else {
		addCombatText("This demon radiates a chilling aura. Brrrr!");
		let damage = 5 - player.iceRes;
		addCombatText("You take <span class='ice'>" + damage + "</span> ice damage!");
		player.hp -= damage;
	}
}
