var farmHouseContainerDiv = document.getElementById("farmHouse_container");

// display the farmhouse location
function displayFarmHouse() {
    farmHouseContainerDiv.replaceChildren();
    if (getQuestState(questEnum.FARM) == 2) {
        addFarmHouseText("You knock on the door of the farm house.");
        addFarmHouseText("TODO: Opening farmhouse text.");
        setQuestState(questEnum.FARM, 3);
    }
}

// adds a paragraph of text to the farmhouse location
function addFarmHouseText(text) {
    let newParagraph = document.createElement("p");
    newParagraph.textContent = text;
    farmHouseContainerDiv.appendChild(newParagraph);
}
