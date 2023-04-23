/*
id: Same number as its position in the array
name: Display name of minion
description: Flavour text when clicked on, can be a string or a function
enchantment: Bold blue text when clicked on describing mechanics
icon: Filepath of image, relative to images folder
onPassive: (optional) a function that, if present, is the code for what having the minion equipped provides passively
onCombatRound: (optional) a function that, if present, is the code for what the minion does each combat round
onCombatWin: (optional) a function that, if present, is the code for what the minion does when you win combat
*/
var minions = [
	{
		id: 0,
		name: "nurse leech",
		description: "This little leech has been helping to cure your ailments since the Middle Ages.",
		enchantment: "If you win combat, restores HP equal to its level",
		icon: "nurse_leech.png",
		onCombatWin: function () {
			let r = Math.floor(Math.random() * 5);
            let texts = [
                `leaps onto your arm and sucks out the bad blood. This is how medicine works.`,
                `gets a tiny bandage out of their medicine bag and sticks it onto your wounds. Thanks!`,
                `spits some fluid into your mouth. Yuck. I hope it's medicine.`,
                `leaps onto your wound and rolls around all over it. This is supposed to help somehow.`,
                `mops up your bleeding wound with their nurse hat.`
            ];
			addMinionCombatText(`${player.minionNames[0]} ${texts[r]}`, 0);
			addCombatText(gainHp(getMinionLevel(0)), 0);
		}
	},
	{
		id: 1,
		name: "rapping wrapping robot",
		description: "This little robot drops both wrapping paper and sick beats.",
		enchantment: "If you win combat, drops wrapping paper equal to its level / 2 (rounded up)",
		icon: "rapping_robot.png",
		onCombatWin: function () {
			let r = Math.floor(Math.random() * 5);
            let texts = [
                `raps "Hey boy take the hint while I make this sweet print."`,
                `raps "My rhymes totally slap while I print this wrap."`,
                `raps "At the end of this caper imma print out some paper."`,
                `raps "This paper be chill that comes from Happyville."`,
                `raps "If you're feeling crappy this paper makes you happy."`
            ];
			addMinionCombatText(`${player.minionNames[1]} ${texts[r]}`, 1);
			gainItemDrop(36, Math.ceil(getMinionLevel(1) / 2));
		}
	},
	{
		id: 2,
		name: "wobbling egg",
		description: "This small egg with eyes wobbles around mumbling about pie.",
		enchantment: "+5% food item drop chance per level",
		icon: "wobbling_egg.png",
		onPassive: function () {
			player.effItemBoostFood += getMinionLevel(2) * 5;
		},
		onCombatWin: function () {
			if (!monster.drops.some(x => items[x.id].category == itemType.FOOD)) {
				return;
			}
			let r = Math.floor(Math.random() * 5);
            let texts = [
                `eyes widen and he mumbles excitedly.`,
                `wobbles faster than usual.`,
                `starts mumbling. You think you make out "I like pie".`,
                `starts rummaging through the opponent's pockets.`,
                `sniffs around the battlefield.`
            ];
			addMinionCombatText(`${player.minionNames[2]} ${texts[r]}`, 2);
		}
	},
	{
		id: 3,
		name: "fluffy kitten",
		description: "This adorable kitten is a tiny loveable ball of fluff. It's dangerously cute.",
		enchantment: "Each combat round deals 3 + (2 * level) emotional damage",
		icon: "kitten.png",
		onCombatRound: function () {
			let r = Math.floor(Math.random() * 5);
            let texts = [
                `runs up to your opponent and rubs against it while purring. It's way too cute!`,
                `looks at your opponent with big sad eyes. Your opponent cries.`,
                `rubs up against your opponent and the static charge makes all their fluffy hair stand up. It's so adorable!`,
                `licks their paws and cleans their whiskers. Your opponent's heart strings are tugged.`,
                `lets out a tiny high-pitched mew. Your opponent's heart melts.`
            ];
			addMinionCombatText(`${player.minionNames[3]} ${texts[r]}`, 3);
			let damage = calcEmotionalDamage(3 + (getMinionLevel(3) * 2));
			addCombatText ("Your opponent takes <span class='emotional'>" + damage + "</span> emotional damage!");
			monster.hp -= damage;
		}
	},
];
