// Basic Arithmatic Operations
let add = (a, b) => parseFloat(a + b);
let subtract = (a, b) => parseFloat(a - b);
let multiply = (a, b) => parseFloat(a * b);
let divide = (a, b) => {
    if(b === 0) {
        alert("Not Divisible By 0")
        return 1;
    } else return parseFloat(a / b);
};

//Helping Functions
let operate = function(a, b, operation){
    result = Number(operation(a, b));
    if (String(result).length > screenLimit) {
        result = parseFloat(result.toPrecision(screenLimit));
        console.log("toPrecision!")
    }
    //updates Array
    oprArr = [result];
    screen.textContent = oprArr[0];
    operand = "";
    operator = "";
    computed = true;
    return oprArr[0];
}

let validateDecimals = function (x){

}

//Variables
let screenLimit = 20;
let operator;
let operand;
let oprArr = [];
let computed = false;

//Document Variables
let digits = document.querySelector(".digits");
let screen = document.querySelector(".screen");
let operations = document.querySelector(".operations");
let clear = document.querySelector("#clear");
let equals = document.querySelector("#equals");
let backSpace = document.querySelector("#bspc");
let digitKeys = ["1","2","3","4","5","6","7","8","9","0","."];
let ops = ["+", "-", "*", "/", "Backspace", "Escape", "="];
let oprr;

//Event Listeners
digits.addEventListener("click", (e)=>{ //CLICK EVENTS
    computed = false;
    if (e.target === digits) return; // Prevents outputting the container's content
    if (screen.textContent.length === 20) return; // Prevents inputting digits into the screen that will break the layout
    if (operand === "") screen.textContent = "";
    if (oprArr.length >= 1 && operator != "x" && operator != "+" && operator != "-" && operator != "÷"){ //After Computation of result. Resets on input
        oprArr.length = 0;
        screen.textContent += e.target.textContent;
        operand = parseFloat(screen.textContent);
  } else {
        screen.textContent += e.target.textContent;
        operand = parseFloat(screen.textContent);
  }
})


// Keyboard Support
//Commented out as it is not fully functional since it requires further knowledge on machine state
//Will be revisited in the future.
// document.addEventListener("keydown", (e)=>{
//     // handles Digits
//     if (digitKeys.includes(e.key)){
//         computed = false;
//         if (screen.textContent.length === 20) return; // Prevents inputting digits into the screen that will break the layout
//         if (operand === "") screen.textContent = "";
//         if (oprArr.length >= 1 && operator != "x" && operator != "+" && operator != "-" && operator != "÷"){ //After Computation of result. Resets on input
//             oprArr.length = 0;
//             screen.textContent += e.key;
//             operand = parseFloat(screen.textContent);
//   }     else {
//             screen.textContent += e.key;
//             operand = parseFloat(screen.textContent);
//   }
//     // Handles Operations
//     }else if(ops.includes(e.key)){
//         if (e.key == "+" || e.key == "-" || e.key == "/" || e.key == "*") oprr = e.key;
//         if (!operand){ // Pressing an Operator while there are no operands
//             console.log("Operand is undefined");
//             operator = oprr;
//             return
//     }   else operator = oprr;
//         if (oprArr.length === 1){ //Compute When There are Two Operands
//             operand = parseFloat(screen.textContent);
//             oprArr.push(operand);
//             if (operator === "+"){
//                 console.log(`Operate() has just been called to add ${oprArr[0]} and ${oprArr.at(-1)}`)
//                 operate(oprArr[0], oprArr.at(-1), add);
//             }
//             else if (operator === "-"){
//                 console.log(`Operate() has just been called to Subtract ${oprArr[0]} and ${oprArr.at(-1)}`)
//                 operate(oprArr[0], oprArr.at(-1), subtract);
//             }
//             else if (operator === "x"){
//                 console.log(`Operate() has just been called to Multiply ${oprArr[0]} and ${oprArr.at(-1)}`)
//                 operate(oprArr[0], oprArr.at(-1), multiply);
//             }
//             else if (operator === "÷"){
//                 console.log(`Operate() has just been called to divide ${oprArr[0]} and ${oprArr.at(-1)}`)
//                 operate(oprArr[0], oprArr.at(-1), divide);
//             }
//             operator = e.key;
//     }   else if(oprArr.length === 0){
//             oprArr.push(operand);
//             console.log(`${operand} has just been pushed to Array ${oprArr} in the ELSE block of the event handler`)
//             operand = "";
//             screen.textContent = "";
//             operator = oprr;
//     }
//         // Handles Equals
//         if (e.key === "="){
//             if(operator === "+") {
//                 console.log(`BEFORE Operand: ${operand} Operator ${operator} Array ${oprArr}`);
//                 operate(oprArr[0], operand, add)
//                 console.log(`Operate() has just been called to Add ${oprArr[0]} and ${operand}`)
//                 console.log(`AFTER Operand: ${operand} Operator ${operator} Array ${oprArr}`);
//             }
//             else if(operator === "-"){
//                 console.log(`BEFORE Operand: ${operand} Operator ${operator} Array ${oprArr}`);
//                 operate(oprArr[0], operand, subtract);
//                 console.log(`Operate() has just been called to Subtract ${oprArr[0]} and ${operand}`)
//                 console.log(`AFTER Operand: ${operand} Operator ${operator} Array ${oprArr}`);
//             }    
//             else if(operator === "*"){
//                 console.log(`BEFORE Operand: ${operand} Operator ${operator} Array ${oprArr}`);
//                 operate(oprArr[0], operand, multiply);
//                 console.log(`Operate() has just been called to Multiply ${oprArr[0]} and ${operand}`)
//                 console.log(`AFTER Operand: ${operand} Operator ${operator} Array ${oprArr}`);
//             }
//             else if(operator === "/"){
//                 console.log(`BEFORE Operand: ${operand} Operator ${operator} Array ${oprArr}`);
//                 operate(oprArr[0], operand, divide);
//                 console.log(`Operate() has just been called to Divid ${oprArr[0]} and ${operand}`)
//                 console.log(`AFTER Operand: ${operand} Operator ${operator} Array ${oprArr}`);
//             }
//         }
//         // Handles Clear
//         if (e.key === "Escape"){
//             console.log("Deleting Everything.")
//             operand = "";
//             oprArr.length = 0;
//             screen.textContent = "";
//         }
//         //Handles Backspace
//         if (e.key === "Backspace"){
//             if (computed === false){
//                 screen.textContent = screen.textContent.slice(0,-1);
//                 operand = parseFloat(screen.textContent);
//         }   else return;
//         }
//     }
//     else return
// })

operations.addEventListener("click", (e)=>{ //Click EVENTS
    if (!operand){ // Pressing an Operator while there are no operands
        console.log("Operand is undefined");
        operator = e.target.textContent;
        return
    } else operator = e.target.textContent;
    if (operator != "x" && operator != "+" && operator != "-" && operator != "÷"){ //Prevents operating under Clear and '=' as well as the container's content if misclicked
        console.log(`Operator doesn't equate to the predefined operators: ${operator}`)
        if (operator !== "Back") operator = "";
    }
    if (oprArr.length === 1){ //Compute When There are Two Operands
        operand = parseFloat(screen.textContent);
        oprArr.push(operand);
        if (operator === "+"){
            console.log(`Operate() has just been called to add ${oprArr[0]} and ${oprArr.at(-1)}`)
            operate(oprArr[0], oprArr.at(-1), add);
        }
        else if (operator === "-"){
            console.log(`Operate() has just been called to Subtract ${oprArr[0]} and ${oprArr.at(-1)}`)
            operate(oprArr[0], oprArr.at(-1), subtract);
        }
        else if (operator === "x"){
            console.log(`Operate() has just been called to Multiply ${oprArr[0]} and ${oprArr.at(-1)}`)
            operate(oprArr[0], oprArr.at(-1), multiply);
        }
        else if (operator === "÷"){
            console.log(`Operate() has just been called to divide ${oprArr[0]} and ${oprArr.at(-1)}`)
            operate(oprArr[0], oprArr.at(-1), divide);
        }
        operator = e.target.textContent;
    } else if(operator !== "=" && operator !== "Back" &&oprArr.length === 0){
        oprArr.push(operand);
        console.log(`${operand} has just been pushed to Array ${oprArr} in the ELSE block of the event handler`)
        operand = "";
        screen.textContent = "";
        operator = e.target.textContent;
    }
})

clear.addEventListener("click", (e)=> {
    console.log("Deleting Everything.")
    operand = "";
    oprArr.length = 0;
    screen.textContent = "";
})

backSpace.addEventListener("click", (e)=>{
    if (computed === false){
    screen.textContent = screen.textContent.slice(0,-1);
    operand = parseFloat(screen.textContent);
    } else return;
})

equals.addEventListener("click", (e)=>{
    if(operator === "+") {
        console.log(`BEFORE Operand: ${operand} Operator ${operator} Array ${oprArr}`);
        operate(oprArr[0], operand, add)
        console.log(`Operate() has just been called to Add ${oprArr[0]} and ${operand}`)
        console.log(`AFTER Operand: ${operand} Operator ${operator} Array ${oprArr}`);
    }
    else if(operator === "-"){
        console.log(`BEFORE Operand: ${operand} Operator ${operator} Array ${oprArr}`);
        operate(oprArr[0], operand, subtract);
        console.log(`Operate() has just been called to Subtract ${oprArr[0]} and ${operand}`)
        console.log(`AFTER Operand: ${operand} Operator ${operator} Array ${oprArr}`);
    }    
    else if(operator === "x"){
        console.log(`BEFORE Operand: ${operand} Operator ${operator} Array ${oprArr}`);
        operate(oprArr[0], operand, multiply);
        console.log(`Operate() has just been called to Multiply ${oprArr[0]} and ${operand}`)
        console.log(`AFTER Operand: ${operand} Operator ${operator} Array ${oprArr}`);
    }
    else if(operator === "÷"){
        console.log(`BEFORE Operand: ${operand} Operator ${operator} Array ${oprArr}`);
        operate(oprArr[0], operand, divide);
        console.log(`Operate() has just been called to Divid ${oprArr[0]} and ${operand}`)
        console.log(`AFTER Operand: ${operand} Operator ${operator} Array ${oprArr}`);
    }
})