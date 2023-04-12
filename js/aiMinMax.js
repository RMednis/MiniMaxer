function MinimaxAI() {
  // Regular Minimax

  // Get the current budget
  var budget = getCurrentBudget();

  var best_move = miniMaxBestMove(budget);

  switch (best_move) {
    case 13:
      hireSenior("AI");
      break;
    case 6:
      hireJunior("AI");
      break;
    case 3:
      hireIntern("AI");
      break;
  }
}

function MinimaxAIwithAB() {
  // Minimax with Alpha Beta Pruning

  // Get the current budget
  var budget = getCurrentBudget();

  var best_move = ABMiniMaxBestMove(budget);

  console.log(best_move);

  switch (best_move) {
    case 13:
      hireSenior("AI");
      break;
    case 6:
      hireJunior("AI");
      break;
    case 3:
      hireIntern("AI");
      break;
  }
}

// Game State Node
// Represents a state of the game (Budget, Score, Children)

class GameStateNode {
  constructor(budget) {
    this.budget = budget; // Current budget
    this.score = null; // Score starts as null
    this.children = []; // All the children of this node, starts as empty
  }

  addChildNode(currentGameStateNode) {
    this.children.push(currentGameStateNode); // Add a child node to this current one
  }
}

// Get the score of a child node
function getChildNodeScore(currentGameStateNode) {
  return currentGameStateNode.score; // Return the score of the child node
}

// Create the actual game tree
function createMiniMaxGameTree(CurrentGameStateNode, depth, Maximizer) {
  //
  // Game end scenario
  //

  // If we are at the bottom of the tree, or we have run our of money
  if (depth == 0 || CurrentGameStateNode.budget <= 0) {
    if (CurrentGameStateNode.budget == 0) {
      // Game tie
      CurrentGameStateNode.score = 0;
    } else if (Maximizer) {
    
      CurrentGameStateNode.score = 1;
    } else {
      // Minimizer has run out of money, so they lose
      CurrentGameStateNode.score = -1;
    }
    return; // Final state, we can't go any deeper
  }

  //
  // Game tree creation
  //

  // Game options
  var options = [13, 6, 3]; // Senior, Junior, Intern

  // Loop through all the options
  for (option of options) {
    var childbudget = CurrentGameStateNode.budget - option; // Calculate the child budget
    var childnode = new GameStateNode(childbudget); // Create a new child node
    CurrentGameStateNode.addChildNode(childnode); // Add the child node to the current node
    createMiniMaxGameTree(childnode, depth - 1, !Maximizer); // Continue creating the tree with the child node as the initial node
  }

  //
  // Minimax levels
  //

  // Map of the child nodes scores
  var childScores = CurrentGameStateNode.children.map(getChildNodeScore);

  // Assign max or min score to the current node
  if (Maximizer) {
    // Maximizer
    // Uses the ... option to get the max value of an array
    CurrentGameStateNode.score = Math.max(...childScores); // ECMA6 spread option <3
  } else {
    // Minimizer
    // Does the same but for the min value
    CurrentGameStateNode.score = Math.min(...childScores);
  }
}

function miniMaxBestMove(budget) {
  // MaxDepth
  // Stops us hanging the browser with too many nodes
  // MiniMaxer with AB pruning can handle a lot more levels
  var maxDepth = 10;

  // Create first node
  var initialNode = new GameStateNode(budget);

  // Create the game tree
  createMiniMaxGameTree(initialNode, maxDepth, true);
  printGameTree(initialNode);

  var bestOpion = null; // Who should we hire?
  var bestScore = -Infinity; // What is the the tree score?

  // Loop through all the children of the initial node
  for (child of initialNode.children) {
    // If the child score is better than the current best score
    if (child.score > bestScore) {
      // Check if the child score is better then the currently known best score
      // Set the new best score
      bestScore = child.score;
      // Set the new best option
      bestOpion = initialNode.budget - child.budget;
    }
  }

  // Log the best option
  console.log("Based off Minimax, the best game move is: " + bestOpion);

  // Return the best option
  return bestOpion;
}

function ABMiniMaxBestMove(budget) {
  // MaxDepth
  // Stops us hanging the browser with too many nodes
  var maxDepth = budget * 3;

  // Create first node
  var initialNode = new GameStateNode(budget);

  // Create the game tree
  createABGameTree(initialNode, maxDepth, -Infinity, Infinity, true);
  printGameTree(initialNode);

  var bestOpion = null; // Who should we hire?
  var bestScore = -Infinity; // What is the the tree score?

  // Loop through all the children of the initial node
  for (child of initialNode.children) {
    // If the child score is better than the current best score
    if (child.score > bestScore) {
      // Check if the child score is better then the currently known best score
      // Set the new best score
      bestScore = child.score;
      // Set the new best option
      bestOpion = initialNode.budget - child.budget;
    }
  }
  return bestOpion;
}

// Create the actual game tree
function createABGameTree(CurrentGameStateNode, depth, alpha, beta, Maximizer) {
  //
  // Game end scenario
  //

  // If we are at the bottom of the tree, or we have run our of money
  if (depth == 0 || CurrentGameStateNode.budget <= 0) {
    if (CurrentGameStateNode.budget == 0) {
      // Game tie
      CurrentGameStateNode.score = 0;
    } else if (Maximizer) {
      // Maximizer has run out of money, so they lose
      CurrentGameStateNode.score = 1;
    } else {
      // Minimizer has run out of money, so they lose
      CurrentGameStateNode.score = -1;
    }
    return; // Final state, we can't go any deeper
  }

  //
  // Game tree creation
  //

  // Game options
  var options = [13, 6, 3]; // Senior, Junior, Intern

  // Loop through all the options
  for (option of options) {
    var childbudget = CurrentGameStateNode.budget - option; // Calculate the child budget
    var childnode = new GameStateNode(childbudget); // Create a new child node
    CurrentGameStateNode.addChildNode(childnode); // Add the child node to the current node
    createABGameTree(childnode, depth - 1, alpha, beta, !Maximizer); // Continue creating the tree with the child node as the initial node

    // Map of the child nodes scores
    var childScores = CurrentGameStateNode.children.map(getChildNodeScore);

    // Assign max or min score to the current node
    if (Maximizer) {
      // Maximizer
      // Uses the ... option to get the max value of an array
      alpha = Math.max(alpha, ...childScores);

      if (beta <= alpha) {
        return;
      }

    } else {
      // Minimizer
      // Does the same but for the min value
      beta = CurrentGameStateNode.score = Math.min(beta,...childScores);

      if (beta <= alpha) {
        return;
      }

    }
  }

  if (Maximizer) {
    CurrentGameStateNode.score = alpha;
  } else {
    CurrentGameStateNode.score = beta;
  }
}

// DEBUG: Print the game tree
function printGameTree(currentGameStateNode) {
  var nodes_in_this_level = [currentGameStateNode];

  while (nodes_in_this_level.length > 0) {
    // While there are still nodes to print

    const level_length = nodes_in_this_level.length; // Get the length of the current level
    var current_level = ""; // Create a string for the current level

    for (var i = 0; i < level_length; i++) {
      // Loop through all the nodes in the current level
      var current_node = nodes_in_this_level.shift(); // Get the first node in the list

      current_level += `${current_node.budget}(${current_node.score}) `; // Add the node to the current level string

      for (child_node of current_node.children) {
        nodes_in_this_level.push(child_node); // Add the child node to the list of nodes to print
      }
    }
    console.log(current_level); // Print the current level
  }
}
