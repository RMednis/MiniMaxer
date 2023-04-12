// Game settings

var Settings = {
    "AImode": "minimaxab",
    "StartingCash": 140,
    "StartingPlayer": "Human"
}


function saveSettings() {
    
    EnteredCash = Number.parseInt( document.getElementById('settingsBudgetAmount').value);
    
    if (EnteredCash >= 13) {
        Settings.StartingCash = EnteredCash;
    } else {
        Settings.StartingCash = 140;
        document.getElementById('settingsBudgetAmount').value = 140;
    }

    console.log("Saved Settings!");
    resetGame();
}


function setAlgo(algorythm_selection) {
    
    if (algorythm_selection.innerText == "Random") {
        Settings.AImode = "random";
        console.log("AI mode set to " + Settings.AImode);
    } else if (algorythm_selection.innerText == "MiniMax") {
        Settings.AImode = "minimax";
        console.log("AI mode set to " + Settings.AImode);
    } else if (algorythm_selection.innerText == "MiniMax (AB)") {
        Settings.AImode = "minimaxab";
        console.log("AI mode set to " + Settings.AImode);
    }


    document.getElementById('algorithmButton').innerText = algorythm_selection.innerText;
}

function setStartingPlayer(player_selection) {
    if (player_selection.innerText == "You") {
        Settings.StartingPlayer = "Human";
        console.log("Starting player set to " + Settings.StartingPlayer);
    } else if (player_selection.innerText == "D(AI)ve") {
        Settings.StartingPlayer = "AI";
        console.log("Starting player set to " + Settings.StartingPlayer);
    }

    document.getElementById('playerButton').innerText = player_selection.innerText;
}


function showModal() {
    settingsModal = new bootstrap.Modal(document.getElementById('gameSettingsModal'), {
        keyboard: false
    });

    // Show game details modal
    settingsModal.show();   

}

window.onload = function () {
    console.log("Game settings loaded");
    showModal();
    
}