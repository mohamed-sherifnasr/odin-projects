// for loop of N steps => if (n = 0) return 0; if (n = 1) return [1]; num = 

// 0, 1, 1, 2, 3, 5, 8

// [0] => First ELement
// [1] => Second ELement
// [1] => Third ELement
// [2] => Fourth ELement
// [3] => Fifth ELement

// fibs(0) => [0];
// fibs(1) => [1];
// fibs(2) => [0, 1];
// fibs(3) => [0, 1, 1];
// fibs(4) => [0, 1, 1, 2];
// fibs(5) => [0, 1, 1, 2, 3];

// fibs(3) => fibs(1) + fibs(2) => fibs(1) + fibs(0) => fibs(0) Runs First arr.push(0), return 0 => fibs(1) runs arr.push(1) return 1
//             ||
//             ===>  arr.push(1) ==> 1


export const fibs = function(n){
    let arr = [];
    for (let i = 0; i < n; i++){
        if (i == 0){
            arr.push(0);
            continue;
        } else if (i == 1){
            arr.push(1);
            continue;
        } else {
            arr.push((arr.at(i-1) + arr.at(i-2)));
        }
    }
    return arr
}

export const fibsRec = function(n){
    if (n == 1){
        return [0];
    }
    if (n == 2){
        return [0, 1];
    }
    arr = fibsRec(n-1);
    return [...arr, arr.at(-1) + arr.at(-2)];
}

// [6, 4, 3, 2, 1, 0]

export const mergeSort = function(arr){
    
    let output = [];
    // Exceptions and Base Case
    if (arr.length == 0) return [];
    if (arr.length == 1) return [arr[0]];

    let i = 0;
    let j = 0;
    let middleIndex = Math.floor((arr.length / 2));
    let left = mergeSort(arr.slice(0, middleIndex));
    let right = mergeSort(arr.slice(middleIndex));

    console.log(left, " ", right)

    while(i < left.length && j < right.length){
        if (left[i] <= right[j]){
            output.push(left[i]);
            i++;
        } else {
            output.push(right[j]);
            j++
        }
    }
    console.log(j, " ", i)

    while (i < left.length) {
        output.push(left[i]);
        i++;
    }

    while (j < right.length) {
        output.push(right[j]);
        j++;
    }
    
    return output;
}

console.log(mergeSort([1, 2, 3, 6, 7, 8, 4]));



// let f = function(arr){
//     let x;
//     x = arr.reduce((acc, el) => {
//     return ;
//     })
//     return x;
// }

// console.log(f([1, 2, 3]));




// FAIL #1
// export const fibsRec = function(n){
//     if (n == 0){
//         console.log("Array Before N = 0 Being Pushed");
//         console.log("Array After N = 0 Being Pushed");
//         return 0;
//     }
//     else if (n == 1){
//         console.log("Array Before N = 1 Being Pushed");
//         console.log("Array After N = 1 Being Pushed");
//         return 1;
//     }
//     else {
//         console.log("Before Recursion: ");
//         return (fibsRec(n-1) + fibsRec(n-2));
//     } 
// }

//Loop through pointers attempt

    // for (let i = 0; i < left.length; i++){
    //     for (let j = 0; j < right.length; j++){
    //         if (left[i] <= right[j]){
    //             output.push(left[i]);
    //             console.log("output");
    //             i++;
    //         } else {
    //             output.push(right[j]);
    //             console.log("output");
    //             j++;
    //         }
    //     }
    // }

// FAIL #1
// export const mergeSort = function(arr, output=[]){
    
//     // Exceptions and Base Case
//     if (arr.length == 0) return [];
//     if (arr.length == 1) return arr[0];

//     let middleIndex = Math.floor((arr.length / 2));
//     let leftSide = arr.slice(0, middleIndex);
//     let rightSide = arr.slice(middleIndex);
//     console.log("Array is: ", arr, "Middle Index is: ", middleIndex, "At Element #", arr[middleIndex], "Left Side: ", leftSide, "Right Side: ", rightSide);
//     // let leftOutElements = [];

//     // output = leftSide.reduce((acc, leftEl) => {
//     //     console.log("Acc is: ", acc, "Left Element is: ", leftEl, "Left Side is: ", leftSide);
//     //     for (const rightEl of rightSide){
//     //         console.log("Inside of Loop of: ", rightEl, "that goes over: ", rightSide);
//     //         if (leftEl <= rightEl){ 
//     //             acc.push(leftEl);
//     //             leftOutElements.push(leftSide.filter(el => el !== leftEl));
//     //             console.log(leftEl, "Is Smaller than or equal to: ", rightEl, " Acc is now: ", acc);
//     //             return acc;
//     //         }
//     //         else {
//     //             acc.push(rightEl);
//     //             leftOutElements.push(rightSide.filter(el => el !== rightEl));
//     //             console.log(rightEl, "Is Smaller than or equal to: ", leftEl, " Acc is now: ", acc);
//     //             return acc;}
//     //     }
//     // }, [])
//     console.log("Right Side: ", rightSide, " Left Side is: ", leftSide);
//     // output.push(leftOutElements);
//     console.log("Output is: ", output);
//     mergeSort(output);

//     // let sortedRightSide = mergeSort(rightSide);
//     // let sortedLeftSide = mergeSort(leftSide);
    
// }
