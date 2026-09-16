import { fibs, fibsRec } from "./recursion.js";
import { mergeSort } from "./recursion.js";


describe.skip("Fibonnacci: ", ()=>{
    describe("Fibbonacci of 3 elements", () =>{
        it("Fibonacci()", ()=>{
            let fibonacci = fibs(3);
            expect(fibonacci).toEqual([0, 1, 1]);
        })
        it("FibonnaciRecursed()", ()=> {
            let fibonacciRecursed = fibsRec(3);
            expect(fibonacciRecursed).toEqual([0, 1, 1]);
        })
    })
    describe("Fibbonacci of 4 elements", () =>{
        it("Fibonacci()", ()=>{
            let fibonacci = fibs(4);
            expect(fibonacci).toEqual([0, 1, 1, 2]);
        })
        it("FibonnaciRecursed()", ()=> {
            let fibonacciRecursed = fibsRec(4);
            expect(fibonacciRecursed).toEqual([0, 1, 1, 2]);
        })
    })
    describe("Fibbonacci of 5 elements", () =>{
        it("Fibonacci()", ()=>{
            let fibonacci = fibs(5);
            expect(fibonacci).toEqual([0, 1, 1, 2, 3]);
        })
        it("FibonnaciRecursed()", ()=> {
            let fibonacciRecursed = fibsRec(5);
            expect(fibonacciRecursed).toEqual([0, 1, 1, 2, 3]);
        })
    })
    describe("Fibbonacci of 6 elements", () =>{
        it("Fibonacci()", ()=>{
            let fibonacci = fibs(6);
            expect(fibonacci).toEqual([0, 1, 1, 2, 3, 5]);
        })
        it("FibonnaciRecursed()", ()=> {
            let fibonacciRecursed = fibsRec(6);
            expect(fibonacciRecursed).toEqual([0, 1, 1, 2, 3, 5]);
        })
    })
    describe("Fibbonacci of 7 elements", () =>{
        it("Fibonacci()", ()=>{
            let fibonacci = fibs(7);
            expect(fibonacci).toEqual([0, 1, 1, 2, 3, 5, 8]);
        })
        it("FibonnaciRecursed()", ()=> {
            let fibonacciRecursed = fibsRec(7);
            expect(fibonacciRecursed).toEqual([0, 1, 1, 2, 3, 5, 8]);
        })
    })
    describe("Fibbonacci of 8 elements", () =>{
        it("Fibonacci()", ()=>{
            let fibonacci = fibs(8);
            expect(fibonacci).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
        })
        it("FibonnaciRecursed()", ()=> {
            let fibonacciRecursed = fibsRec(8);
            expect(fibonacciRecursed).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
        })
    })
})


describe("Merge Sort: ", ()=>{
    it("Works with empty Array: ", ()=>{
        expect(mergeSort([])).toEqual([]);
    })
    it("Works with One Element Array: ", ()=>{
        expect(mergeSort([72])).toEqual([72]);
    })
    it("Works with an already sorted Array: ", ()=>{
        expect(mergeSort([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    })
    it("Works with an unsorted Array: ", ()=>{
        expect(mergeSort([2, 5, 1, 3, 6, 0, 9, 7, 8, 10])).toEqual([0, 1, 2, 3, 5, 6, 7, 8, 9, 10]);
    })
    it("Works with an odd numbered Array: ", ()=>{
        expect(mergeSort([2, 5, 1, 3, 6, 0, 9, 7, 8])).toEqual([0, 1, 2, 3, 5, 6, 7, 8, 9]);
    })
    it("Works with Higher Numbered Array: ", ()=>{
        expect(mergeSort([100, 150, 67, 50, 142])).toEqual([50, 67, 100, 142, 150]);
    })
})