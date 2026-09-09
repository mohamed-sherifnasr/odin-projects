export const capitalize = (inp) => {
    return inp[0].toUpperCase() + inp.slice(1);
};

export const reversed = (inp) => {
    return inp.split("").reverse().join("");
};

export const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
};


export const ceasarCipher = (inp, key) => {
    const map = "abcdefghijklmnopqrstuvwxyz".split("");
    const splittedInput = inp.split(""); // ['H', 'e', 'l', 'l', 'o', '!']
    let currentIndex = [];
    let newIndex = [];
    let final = [];
    //Record Current Location of Input relative to the Standard Alphabet
    splittedInput.forEach((elOuter) => {
        //In case of a symbol
        if (!map.includes(elOuter.toLowerCase())){
            currentIndex.push(elOuter);
        } // In case of a letter
        else{
            let ind = map.findIndex((elInner) => {
                return elOuter.toLowerCase() == elInner.toLowerCase();
            });
            let upperCase = elOuter === elOuter.toUpperCase()? true: false;
            currentIndex.push({index: ind, uppercase: upperCase});
        }
    })
    //Mutate currentIndex so that it reflects the Key shift
    currentIndex.forEach(el => {
        //If Symbol
        console.table(`This is representation of the value of EL during KEY SHIFTING ${el}`)
        if (typeof el == "string"){
            newIndex.push(el)
        } else{
            newIndex.push(
                {
                    ind: (el.index + key) % 26,
                    uppercase: el.uppercase
                }
            );
        }
    })
    //Construct Key shifted code 
    newIndex.forEach(el => {
        //Avoid Useless iterations undefined outcome
        if (true){
            // In case of a Symbol or number
            if (typeof el == "string"){
                final.push(el);
            }
            // In case of a letter
            else {
                let f = el.uppercase == true? map[el.ind].toUpperCase(): map[el.ind].toLowerCase();
                final.push(f);
            }
        }
    })
    return final.join("");
};


export const analyzeArray = (arr) => {
    return {
        average: (arr.reduce((acc, el) => acc + el , 0) / arr.length),
        max: arr.reduce((prev, el) => el > prev? el: prev),
        min: arr.reduce((prev, el) => el <= prev? el: prev),
        length: arr.length
    }
}

console.log(analyzeArray([120 , 19 , 40 , 52 , 16 , 91]))