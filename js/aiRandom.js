// Random "AI"
// Used for debugging the game code
// Has no strategy, just randomly chooses a hire option


function RandomAI() {
    // Completely randomly choose a hire option
    // Uses a random number between 0 and 2
    
    option = Math.floor(Math.random() * 3)

    // Convert the option to a hire option
    switch (option){
        case 0:
            hireSenior('AI');
            break;
        case 1:
            hireJunior('AI');
            break;
        case 2:
            hireIntern('AI');
            break;
    }
}