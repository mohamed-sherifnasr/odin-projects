// let P = 0;
// let R = 0;
// let S = 0;

// for (let i = 0; i<100;i++){
//     getComputerChoice();
// }

// function getComputerChoice(){
//     let ran = Math.random();
//     (0 < ran && ran <= 1/3) ? P++ : (1/3 < ran && ran <= 2/3) ? R++ : S++;
// }

// console.log(`Papers equals to: ${P} chance is ${P/(P+R+S)}\n`,` Rock equals to: ${R} chance is ${R/(P+R+S)}\n`,`  Scissors equals to: ${S} chance is ${S/(P+R+S)}`);
///////////////TBS///////////////////////

let getComputerChoice = ()=>{       //Arrow Function + Function Expression
    let ran = Math.random();        
    (0 < ran && ran <= 1/3) ? "Papers":  // Trenary Multi-Conditional Statement
    (1/3 < ran && ran <= 2/3) ?"Rock": 
    "Scissors";
}

let getHumanChoice = () => {let input = prompt("Rock, Paper or, Scissors?");
    input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    return input;
}

let humanScore = 0;
let computerScore = 0;

let humanChoice = getHumanChoice();
let computerChoice = getComputerChoice();

function playRound(humanChoice, computerChoice) {
    console.log(humanChoice, computerChoice);
}

console.log (humanChoice, computerChoice);