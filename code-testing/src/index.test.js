import { capitalize, reversed, calculator, ceasarCipher, analyzeArray } from './index.js'

test('First Character Capitalized', ()=>{
    let value = capitalize("hello World!");
    expect(value).toBe("Hello World!");    
});

test('Reversed String', () =>{
    let value = reversed("hello world!");
    expect(value).toBe("!dlrow olleh");
})

describe('Calculator Object', () => {
    test('Adding', () => {
        let value = calculator.add(2, 3);
        expect(value).toBe(5);
    })
    test('Subtracting', () => {
        let value = calculator.subtract(5, 3);
        expect(value).toBe(2);
    })
    test('Multiplying', () => {
        let value = calculator.multiply(2, 3);
        expect(value).toBe(6);
    })
    test('Dividing', () => {
        let value = calculator.divide(6, 3);
        expect(value).toBe(2);
    })
})

describe('CeasarCipher', () => {
    test('Test Wrapping from Z to A', () =>{
        let value = ceasarCipher("abcdefghijklmnopqrstuvwxyz", 3);
        expect(value).toBe("defghijklmnopqrstuvwxyzabc");
    })
    test('Test Case Preservation', () => {
        let value = ceasarCipher("HeLLo", 3);
        expect(value).toBe("KhOOr");
    })
    test('Test Punctuation', () => {
        let value = ceasarCipher("Hello, World!", 3);
        expect(value).toBe("Khoor, Zruog!");
    })
})

describe('Array Analyzer', () => {
    let value = analyzeArray([1,8,3,4,2,6])
    test('Average', () => {
        expect(value.average).toBe(4);
    })
    test('Minimum', () => {
        expect(value.min).toBe(1);
    })
    test('Maximum', () => {
        expect(value.max).toBe(8);
    })
    test('Length', () => {
        expect(value.length).toBe(6);
    })
})