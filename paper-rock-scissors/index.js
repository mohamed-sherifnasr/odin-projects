function getComputerChoice(){
    let input = Math.random();
    if (0 <= input && input < 1/3){
        console.log("Oponent chose Paper!");
        return "Paper";
    } else if (1/3 <= input && input < 2/3){
        console.log("Oponent chose Scissors!")
        return "Scissors";
    } else {
        console.log("Oponent chose Rock!")
        return "Rock";
    }
};

function getHumanChoice() {
    let input = prompt("Rock, Paper, Scissors?");
    input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    console.log (`You chose ${input}!`)
    return input;
}


function playGame (){
    let humanScore = 0;
    let computerScore = 0;
    function playRound() {
        let humanChoice = getHumanChoice();
        let computerChoice = getComputerChoice();
        if (humanChoice === computerChoice) {
            console.log("Draw!")
        } else if (humanChoice === "Rock" && computerChoice === "Scissors"){
            humanScore++;
            console.log(`You Win! ${humanChoice} beats ${computerChoice}!`, `Your Score is ${humanScore}. Computer Score is ${computerScore}`);
        } else if (humanChoice === "Rock" && computerChoice === "Paper"){
            computerScore++;
            console.log(`You Lose! ${computerChoice} beats ${humanChoice}!`, `Your Score is ${humanScore}. Computer Score is ${computerScore}`);
        } else if (humanChoice === "Scissors" && computerChoice === "Paper"){
            humanScore++;
            console.log(`You Win! ${humanChoice} beats ${computerChoice}!`, `Your Score is ${humanScore}. Computer Score is ${computerScore}`);
        } else if (humanChoice === "Scissors" && computerChoice === "Rock"){
            computerScore++;
            console.log(`You Lose! ${computerChoice} beats ${humanChoice}!`, `Your Score is ${humanScore}. Computer Score is ${computerScore}`);
        } else if (humanChoice === "Paper" && computerChoice === "Rock"){
            humanScore++;
            console.log(`You Win! ${humanChoice} beats ${computerChoice}!`, `Your Score is ${humanScore}. Computer Score is ${computerScore}`);
        } else if (humanChoice === "Paper" && computerChoice === "Scissors"){
            computerScore++;
            console.log(`You Lose! ${computerChoice} beats ${humanChoice}!`, `Your Score is ${humanScore}. Computer Score is ${computerScore}`);
        } else {
            console.log("Invalid input!");
        }
    }
    while(true){
        if (humanScore == 5) {
            console.log("Congratulations you made it!")
            break;
        } else if (computerScore == 5){
            console.log("You Lost! Better luck next time!")
            break;
        } else {
            playRound();
        }
    }
return humanScore, computerScore;
}

console.log(playGame());