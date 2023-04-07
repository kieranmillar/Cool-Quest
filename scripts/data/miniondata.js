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
                `${player.minionNames[0]} leaps onto your arm and sucks out the bad blood. This is how medicine works.`,
                `${player.minionNames[0]} gets a tiny bandage out of their medicine bag and sticks it onto your wounds. Thanks!`,
                `${player.minionNames[0]} spits some fluid into your mouth. Yuck. I hope it's medicine.`,
                `${player.minionNames[0]} leaps onto your wound and rolls around all over it. This is supposed to help somehow.`,
                `${player.minionNames[0]} mops up your bleeding wound with their nurse hat.`
            ];
			addCombatText(texts[r]);
			addCombatText(giveHp(getMinionLevel(0)));
			return true;
		}
	},
	{
		id: 1,
		name: "rapping wrapping robot",
		description: "This little robot prints wrapping paper while dropping sick beats.",
		enchantment: "If you win combat, drops wrapping paper equal to its level / 2 (rounded up)",
		icon: "no_image.png",
		onCombatWin: function () {
			let r = Math.floor(Math.random() * 5);
            let texts = [
                `${player.minionNames[1]} raps "Hey boy take the hint while I make this sweet print."`,
                `${player.minionNames[1]} raps "My rhymes totally slap while I print this wrap."`,
                `${player.minionNames[1]} raps "At the end of this caper imma print out some paper."`,
                `${player.minionNames[1]} raps "This paper be chill that comes from Happyville."`,
                `${player.minionNames[1]} raps "If you're feeling crappy this paper makes you happy."`
            ];
			addCombatText(texts[r]);
			gainItemDrop(items[36], Math.ceil(getMinionLevel(1) / 2));
			return true;
		}
	}
];
