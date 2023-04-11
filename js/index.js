///
/// MAIN GAME LOGIC
/// DOES NOT CONTAIN ANY AI LOGIC
///


var GameTime = 0; // Hours survived
var turnCount = 0; // Turn counter

///
/// BUDGET FUNCTIONS
///

function getCurrentBudget() {
    // Gets the current budget value from the DOM
    return parseInt(document.getElementById('budget').textContent);
}

function setBudget(budget) {
    // Sets the current budget value in the DOM
    if (budget < 50) {
        // Color the text yellow
        document.getElementById('budget').setAttribute('class', 'text-center fw-bold text-warning');

    }
    
    if (budget < 20) {
        // Color the text red
        document.getElementById('budget').setAttribute('class', 'text-center fw-bold text-danger');

    }
    
    document.getElementById('budget').innerHTML = budget + "<i class=\"bi bi-currency-euro\"></i>";

}

///
/// TIME FUNCTIONS
///

function printTime() {
    days = Math.floor(GameTime / 8);
    hours = GameTime % 8;
    
    if (days > 0) {
        return days + " day(s) and " + hours + " hour(s)";
    } else {
        return hours + " hour(s)";
    }

}

function elapseTime() {
    // Elapses GameTime by 1 hour
    GameTime += 1;
    document.getElementById('time').innerHTML = printTime();
}

/// 
/// HIRE FUNCTIONS
///


function hire(cost, player, type) {
    console.log('Hiring Developer');
    console.log("Current budget: " + getCurrentBudget());
    setBudget(getCurrentBudget() - cost);
    addToActivityLog(player, type, cost)
    console.log("New budget: " + getCurrentBudget());
    elapseTime();
}

function hireSeniorButton() {
    hireSenior("Human");
    checkIfPlayerLoss();
    checkIfAILoss();
}

function hireJuniorButton() {
    hireJunior("Human");
    checkIfPlayerLoss();
    checkIfAILoss();
}

function hireInternButton() {
    hireIntern("Human");
    checkIfPlayerLoss();
    checkIfAILoss();
}

// Hire functions
function hireSenior(player) {
    console.log(player + ' is hiring Senior Developer');
    hire(13, player, "Senior");
    
}

function hireJunior(player) {
    console.log(player + ' is hiring Junior Developer'); 
    hire(6, player, "Junior");
    
}

function hireIntern(player) {
    console.log(player + ' is hiring Intern Developer');
    hire(3), player, "Intern";
    
}

///
/// GAME FUNCTIONS
///

function checkIfPlayerLoss() {  
    // Check if player has lost
    if (checkLoss()) {
        console.log("Player lost");
        gameOver("AI");
    }
}

function checkIfAILoss() { 
    AIturn();
    // Check if AI has lost
    if (checkLoss()) {
        console.log("AI lost");
        gameOver("Human");
    }
}

function checkLoss() {
    // Check win/lose state
    console.log("Current budget: " + getCurrentBudget());
    if (getCurrentBudget() <= 0) {
        return true;
    }
    else return false;
}

// Call upon the AI to make a decision
function AIturn() {

    disableButtons();
   
    if (Settings.AImode == "random") {
        RandomAI();
    } else if (Settings.AImode == "minmax") {
        MinMaxAI();
    };


    enableButtons();
    checkWin();
}


// Game over function
function gameOver(player) {
    
    var modaltitle = document.getElementById('gameOverModalLabel');
    var gameresult = document.getElementById('gameOverModalGameResult');
    var gamedetails = document.getElementById('gameOverModalGameDetails');

    
    if (getCurrentBudget() < 0) {
        if (player == "Human") {
            // Human lost
            modaltitle.setAttribute('class', 'text-center fw-bold text-danger');
            modaltitle.innerHTML = "Game Over";
            
            gameresult.innerHTML = "You ran out of money! <br><i>Time to polish up that CV...</i>";
        } else if (player == "AI") {
            // AI lost
            modaltitle.setAttribute('class', 'text-center fw-bold text-success');
            modaltitle.innerHTML = "You Win!";
            
            gameresult.innerHTML = "You managed to beat <b>D(AI)ve</b>! <br> <i>You're still screwed though...</i>";
        }
    } else if (getCurrentBudget() == 0) {
        // Draw
        modaltitle.setAttribute('class', 'text-center fw-bold text-danger');
        modaltitle.innerHTML = "Game Over";
            
        gameresult.innerHTML = "You're right on budget! <br><i>Who cares if the project is incomplete!</i>";
    }

    // Game details
    gamedetails.innerHTML = "You lasted <b>" + printTime() + "</b> hours before going bankrupt.";

    // Show game details modal
    var gameoverModal = new bootstrap.Modal(document.getElementById('gameOverModal'), {
        keyboard: false
    });
    gameoverModal.show();
    disableButtons();

    // Set new game flag
    NewGame = true;
}

// Reset game function
function resetGame() {
    console.log('Resetting Game');
    console.log("Set budget: " + getCurrentBudget());
    
    // Reset GameTime
    GameTime = 0;
    document.getElementById('time').innerHTML = printTime();

    //Reset budget and color
    document.getElementById('budget').setAttribute('class', 'text-center fw-bold');
    setBudget(Settings.StartingCash);

    // Clear activity log
    document.getElementById('activityLog').innerHTML = "";

    // Set the current player from the settings
    CurrentPlayer = Settings.StartingPlayer;
    console.log("Starting player is: " + CurrentPlayer);

    // Run first move if D(AI)ve starts
    //if (CurrentPlayer == "AI") {
    //    console.log("AI's doing the first turn");
    //    AIturn();
    // }

    enableButtons();
    NewGame = false;
}

///
/// MISC FUNCTIONS
///

// Disable buttons
function disableButtons() {
    document.getElementById('hireSenior').setAttribute('disabled', 'disabled');
    document.getElementById('hireJunior').setAttribute('disabled', 'disabled');
    document.getElementById('hireIntern').setAttribute('disabled', 'disabled');
}

// Enable buttons
function enableButtons() {
    document.getElementById('hireSenior').removeAttribute('disabled');
    document.getElementById('hireJunior').removeAttribute('disabled');
    document.getElementById('hireIntern').removeAttribute('disabled');
}


// Adds a new row to the activity log
function addToActivityLog(player, hiretype, cost) {
    var activityLog = document.getElementById('activityLog');
    
    var newActivity = document.createElement('tr');
    newActivity.innerHTML = "<td>" + player + "</td><td>" + hiretype + "</td><td>" + cost + "</td>" + "<td>" + getCurrentBudget() + "</td>";
    
    // Append as first child
    activityLog.insertBefore(newActivity, activityLog.firstChild);
}

// Initialize game
window.onload = function () {
    resetGame();
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }