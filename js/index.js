///
/// MAIN GAME LOGIC
/// DOES NOT CONTAIN ANY AI LOGIC
///

var GameTime = 0; // Hours survived
var turnCount = 0; // Turn counter
var IsGameOver = false; // Game over state

///
/// BUDGET FUNCTIONS
///

function getCurrentBudget() {
  // Gets the current budget value from the DOM
  return parseInt(document.getElementById("budget").textContent);
}

function setBudget(budget) {
  // Sets the current budget value in the DOM
  if (budget < 50) {
    // Color the text yellow
    document
      .getElementById("budget")
      .setAttribute("class", "text-center fw-bold text-warning");
  } else if (budget < 20) {
    // Color the text red
    document
      .getElementById("budget")
      .setAttribute("class", "text-center fw-bold text-danger");
  } else {
    // Color the text black
    document
      .getElementById("budget")
      .setAttribute("class", "text-center fw-bold");
  }


  // Set the budget value and add the euro sign
  document.getElementById("budget").innerHTML =
    budget + '<i class="bi bi-currency-euro"></i>';
}

function displayCurrentTurn(player_turn) {
  document.getElementById("currentPlayer").innerHTML = player_turn;
}

///
/// TIME FUNCTIONS
///

function printTime() {
  days = Math.floor(GameTime / 8);
  hours = GameTime % 8;

  if (days > 0) {
    return days + " day(s) and " + hours + " hour(s)"; // Print the time in days and hours
  } else {
    return hours + " hour(s)"; // No point in printing days if there are none
  }
}

function nextHour() {
  // Increments the game time by one hour
  GameTime++;
  document.getElementById("time").innerHTML = printTime();
}

///
/// HIRE FUNCTIONS
///
function hireDveloper(cost, player, hiretype) {
  // Main function for hiring developers
  if (!IsGameOver) {
    console.log("Hiring a developer for " + cost + " for " + player); // Log the hire
    setBudget(getCurrentBudget() - cost); // Remove the cost from the budget
    addToActivityLog(player, hiretype, cost); // Print the hire to the activity log
    nextHour(); // Increment the game time
  }
}

function hireSenior(player) {
  console.log("Hiring a senior for " + player); // Log the hire
  hireDveloper(13, player, "Senior"); // Hire the developer
  checkGameOver(player); // Check if the game is over (We ran out of money)
  DoAiTurn(player); // Do the AI's turn
}

function hireJunior(player) {
  console.log("Hiring a junior for " + player);
  hireDveloper(6, player, "Junior");
  checkGameOver(player);
  DoAiTurn(player);
}

function hireIntern(player) {
  console.log("Hiring an intern for " + player);
  hireDveloper(3, player, "Intern");
  checkGameOver(player);
  DoAiTurn(player);
}

///
/// GAME FUNCTIONS
///

// Check game over state
function checkGameOver(player) {
  if (getCurrentBudget() < 0) {

    // The current player ran out of money
    gameOver(player);
    
  } else if (getCurrentBudget() == 0) {

    // We're right on budget
    gameTied();

  }
}

// Game over function
function gameOver(player) {
  if (!IsGameOver) {

    // DOM elements
    var modaltitle = document.getElementById('gameOverModalLabel');
    var gameresult = document.getElementById('gameOverModalGameResult');
    var gamedetails = document.getElementById('gameOverModalGameDetails');

    if (player == "Human") {
      // Human lost
      modaltitle.setAttribute("class", "text-center fw-bold text-danger"); // Set the modal title to red
      
      modaltitle.innerHTML = "Game Over";
      gameresult.innerHTML =
        "You ran out of money! <br><i>Time to polish up that CV...</i>";
    
      } else if (player == "AI") {
      // AI lost

      modaltitle.setAttribute("class", "text-center fw-bold text-success");// Set the modal title to green

      modaltitle.innerHTML = "You Win!";
      gameresult.innerHTML =
        "You managed to beat <b>D(AI)ve</b>! <br> <i>You're still screwed though...</i>";
    }

    gamedetails.innerHTML = "You lasted <b>" + printTime() + "</b> hours before going bankrupt.";
    
    // Show the modal
    var gameoverModal = new bootstrap.Modal(document.getElementById('gameOverModal'), {
      keyboard: false
    });
    gameoverModal.show();

    IsGameOver = true; // Set the game over state to true, so we don't trigger this again until the game is reset
  }
}

function gameTied(player) {
  if (!IsGameOver) {

    // DOM elements
    var modaltitle = document.getElementById('gameOverModalLabel');
    var gameresult = document.getElementById('gameOverModalGameResult');
    var gamedetails = document.getElementById('gameOverModalGameDetails');


    // Setting the text on the modal
    modaltitle.setAttribute('class', 'text-center fw-bold text-warning');
    modaltitle.innerHTML = "Game Over";        
    gameresult.innerHTML = "You're right on budget! <br><i>Who cares if the project is incomplete!</i>";
    gamedetails.innerHTML = "You lasted <b>" + printTime() + "</b> hours before going bankrupt.";
    
    // Show the modal
    var gameoverModal = new bootstrap.Modal(document.getElementById('gameOverModal'), {
      keyboard: false
    });
    gameoverModal.show();


    IsGameOver = true; // Set the game over state to true, so we don't trigger this again until the game is reset
  }
}


// AI Turn
function DoAiTurn(player) {
  if (player != "AI") {
    console.log("Human turn done, starting AI turn");
    displayCurrentTurn("AI");
    
    
    // AI turn
    // Check which AI mode is selected
    if (Settings.AImode == "random") {
      // Random AI (Debugging Only)
      RandomAI();
    } else if (Settings.AImode == "minimax") {
      // Minimax AI (It makes the cpu fans go wild!)
      MinimaxAI();
    } else if (Settings.AImode == "minimaxab") {
      // Minimax with Alpha-Beta Pruning (It's a bit better!)
      MinimaxAIwithAB();
    }

    // Check if the AI has run out of money
    checkGameOver("AI");

    // Display the human's turn and log the AI's turn as done
    displayCurrentTurn("Human");
    console.log("AI turn done");
  }
}

///
/// MISC FUNCTIONS
///

function resetGame() {
  // Reset game time
  GameTime = 0;
  IsGameOver = false;
  document.getElementById("time").innerHTML = printTime();

  // Reset budget
  setBudget(Settings.StartingCash);

  // Reset activity log
  document.getElementById("activityLog").innerHTML = "";

  // Reset turn counter
  turnCount = 0;

  // If the AI is playing first, do its turn
  if (Settings.StartingPlayer == "AI") {
    DoAiTurn("System");
  } else {
    displayCurrentTurn("Human");
  }
}

// Adds a new row to the activity log
function addToActivityLog(player, hiretype, cost) {
  var activityLog = document.getElementById("activityLog");

  // Create new row
  var newActivity = document.createElement("tr");
  
  // Give the new row the data from the current game state
  newActivity.innerHTML =
    "<td>" +
    player +
    "</td><td>" +
    hiretype +
    "</td><td>" +
    cost +
    "</td>" +
    "<td>" +
    getCurrentBudget() +
    "</td>";

  // Append the new row to the activity log, at the top
  activityLog.insertBefore(newActivity, activityLog.firstChild);
}

// Initialize game
window.onload = function () {
  resetGame();
};


// Debbuging timeout for random AI, so we can see the game UI during the AI's turn
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
