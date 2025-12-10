let humanScore = 0;
let computerScore = 0;
let humanChoice = "";
//Computer Display
const comp = document.querySelector(".computer")
//Anouncer Display
const anounce = document.querySelector(".anounce")
//Human Display 
const human = document.querySelector(".human")
//Anouncer2 Display
const anounce2 = document.querySelector(".anounce2")
//Human Rock, Paper, Scissors
const rock = document.querySelector(".rock")
const paper = document.querySelector(".paper")
const scissors = document.querySelector(".scissors")

rock.addEventListener("click", ()=>{
    human.textContent = "You Chose Rock!"
    humanChoice = "Rock";
    playRound();
    return "Rock";
})

paper.addEventListener("click", ()=>{
    human.textContent = "You Chose Paper!"
    humanChoice = "Paper";
    playRound();
    return "Paper";
})

scissors.addEventListener("click", ()=>{
    human.textContent = "You Chose Scissors!"
    humanChoice = "Scissors";
    playRound();
    return "Scissors";
})


function getComputerChoice(){
    let input = Math.random();
    if (0 <= input && input < 1/3){
        comp.textContent = "Oponent Chose Paper!";
        return "Paper";
    } else if (1/3 <= input && input < 2/3){
        comp.textContent = "Oponent chose Scissors!";
        return "Scissors";
    } else {
        comp.textContent = "Oponent chose Rock!";
        return "Rock";
    }
};


function playRound() {
    let computerChoice = getComputerChoice();
    if (humanChoice === computerChoice){
        anounce.textContent = "Draw!"
    } else if (humanChoice === "Rock" && computerChoice === "Scissors"){
        humanScore++;
        checkScore();
       anounce.textContent = `You Win! ${humanChoice} beats ${computerChoice}!\nYour Score is ${humanScore}. Computer Score is ${computerScore}`;
    } else if (humanChoice === "Rock" && computerChoice === "Paper"){
        computerScore++;
        checkScore();
        anounce.textContent = `You Lose! ${computerChoice} beats ${humanChoice}!\nYour Score is ${humanScore}. Computer Score is ${computerScore}`;
    } else if (humanChoice === "Scissors" && computerChoice === "Paper"){
        humanScore++;
        checkScore();
        anounce.textContent = `You Win! ${humanChoice} beats ${computerChoice}!\nYour Score is ${humanScore}. Computer Score is ${computerScore}`;
    } else if (humanChoice === "Scissors" && computerChoice === "Rock"){
        computerScore++;
        checkScore();
        anounce.textContent = `You Lose! ${computerChoice} beats ${humanChoice}!\nYour Score is ${humanScore}. Computer Score is ${computerScore}`;
    } else if (humanChoice === "Paper" && computerChoice === "Rock"){
        humanScore++;
        checkScore();
        anounce.textContent = `You Win! ${humanChoice} beats ${computerChoice}!\nYour Score is ${humanScore}. Computer Score is ${computerScore}`;
    } else if (humanChoice === "Paper" && computerChoice === "Scissors"){
        computerScore++;
        checkScore();
        anounce.textContent = `You Lose! ${computerChoice} beats ${humanChoice}!\nYour Score is ${humanScore}. Computer Score is ${computerScore}`;
    } else {
        anounce.textContent = "Invalid input!";
        }
}

function checkScore(){
    if (computerScore === 5){
        anounce2.textContent = `${humanScore} against ${computerScore} for computer. Computer Wins!`;
        humanScore = 0;
        computerScore = 0;
    } else if (humanScore === 5){
        anounce2.textContent = `${humanScore} against ${computerScore} for Player. Human Wins!`; 
        humanScore = 0; 
        computerScore = 0;
    } else return;

}