var drellaUVoucherCountSpan = document.getElementById("drellaU_voucherCount");
var drellaUBigSkillContainerDiv = document.getElementById("drellaU_bigList");
var drellaUSmallSkillContainerDiv = document.getElementById("drellaU_smallList");

function randomiseDrellaUSkills() {
    let unownedBigSkills = skills.filter(x => x.source == skillSource.DRELLAUBIG && !player.skills[x.id]);
    let unownedSmallSkills = skills.filter(x => x.source == skillSource.DRELLAUSMALL && !player.skills[x.id]);
    if (unownedBigSkills.length == 0) {
        player.drellaUDailyBigSkill = -1;
    }
    else {
        player.drellaUDailyBigSkill = unownedBigSkills[Math.floor(Math.random() * unownedBigSkills.length)].id;
    }
    player.drellaUDailySmallSkills = [];
    for (let i = 0; i < 2; i ++) {
        if (unownedSmallSkills.length > 0) {
            let randomSkillPosition = Math.floor(Math.random() * unownedSmallSkills.length);
            player.drellaUDailySmallSkills.push(unownedSmallSkills[randomSkillPosition].id);
            unownedSmallSkills.splice(randomSkillPosition, 1);
        }
    }
}

function displayDrellaU() {
    let voucherCount = getItemAmount(35);
    if (voucherCount) {
        if (voucherCount == 1) {
            drellaUVoucherCountSpan.textContent = "1 voucher";
        }
        else {
            drellaUVoucherCountSpan.textContent = voucherCount + " vouchers";
        }
    }
    else {
        drellaUVoucherCountSpan.textContent = "no vouchers";
    }

	drellaUBigSkillContainerDiv.replaceChildren();
    if (player.drellaUDailyBigSkill == -1) {
        let newElement = document.createElement("p");
        newElement.textContent = "You've learned everything the large courses have to offer.";
	    drellaUBigSkillContainerDiv.appendChild(newElement);
    }
    else if (player.skills[player.drellaUDailyBigSkill]) {
        let newElement = document.createElement("p");
        newElement.textContent = "You've already taken this course.";
	    drellaUBigSkillContainerDiv.appendChild(newElement);
    }
    else {
        let newElement = document.createElement("div");
        newElement.className = "item";
		let textImageDiv = document.createElement("span");
		textImageDiv.className = "item_Image";
		textImageDiv.innerHTML = "<image src='./images/" + skills[player.drellaUDailyBigSkill].icon + "'><span>" + skills[player.drellaUDailyBigSkill].name + "</span>";
        textImageDiv.addEventListener("click", function() {
            openDialog(dialogType.SKILL, player.drellaUDailyBigSkill);
        });
		newElement.appendChild(textImageDiv);
        var learnLink = document.createElement("span");
        learnLink.innerHTML = "<input type = 'button' value = 'Buy\n(2 vouchers)' onClick = 'learnDrellaUSkill(" + player.drellaUDailyBigSkill + ")'>";
        newElement.appendChild(learnLink);
        drellaUBigSkillContainerDiv.appendChild(newElement);
    }

    drellaUSmallSkillContainerDiv.replaceChildren();
    if (player.drellaUDailySmallSkills.length == 0) {
        let newElement = document.createElement("p");
        newElement.textContent = "You've learned everything the small courses have to offer.";
	    drellaUSmallSkillContainerDiv.appendChild(newElement);
    }
    else {
        for (let i = 0; i < player.drellaUDailySmallSkills.length; i ++) {
            if (player.skills[player.drellaUDailySmallSkills[i]]) {
                let newElement = document.createElement("div");
                newElement.className = "item";
                newElement.textContent = "You've already taken this course.";
	            drellaUSmallSkillContainerDiv.appendChild(newElement);
            }
            else {
                let newElement = document.createElement("div");
                newElement.className = "item";
                let textImageDiv = document.createElement("span");
                textImageDiv.className = "item_Image";
                textImageDiv.innerHTML = "<image src='./images/" + skills[player.drellaUDailySmallSkills[i]].icon + "'><span>" + skills[player.drellaUDailySmallSkills[i]].name + "</span>";
                textImageDiv.addEventListener("click", function() {
                    openDialog(dialogType.SKILL, player.drellaUDailySmallSkills[i]);
                });
                newElement.appendChild(textImageDiv);
                var learnLink = document.createElement("span");
                learnLink.innerHTML = "<input type = 'button' value = 'Buy\n(1 voucher)' onClick = 'learnDrellaUSkill(" + player.drellaUDailySmallSkills[i] + ")'>";
                newElement.appendChild(learnLink);
                drellaUSmallSkillContainerDiv.appendChild(newElement);
            }
        }
    }
}

// learn a Drella U skill
// returns if successful
function learnDrellaUSkill(id) {
    if (id < 60 || id > 89) {
        hint ("That's not a DrellaU skill!", "r");
		return false;
    }
    let largeSkill = id >= 60 && id <= 69;
    let success = false;
    if (largeSkill) {
        success = loseItem(35, 2);
    }
    else {
        success = loseItem(35, 1);
    }
    if (!success) {
        hint("You can't afford that!", "r");
        return false;
    }
    player.skills[id] = 1;
    calculateStats();
    goToLocation("drellaU");
    if (largeSkill) {
        hint("You spent 2 vouchers to go on a course and learned a new skill!", "g");
    }
    else {
        hint("You spent a voucher to go on a course and learned a new skill!", "g");
    }
    save();
}
