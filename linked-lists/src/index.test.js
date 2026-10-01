import { test } from "./index.js"

it("Works!", ()=>{
    let val = test();
    expect(val).toBe(1);
})

// Console Tests

// let lL = new linkedList();


// lL.append(1);
// lL.append(2);
// lL.append(3);

// // Test removeAt Method at the beginning of the linked list
// console.log("List is: ", lL.toString(), "with head of: ", lL.Head().value, " and tail of: ", lL.Tail().value);
// lL.removeAt(0);
// console.log("List is: ", lL.toString(), "with head of: ", lL.Head().value, " and tail of: ", lL.Tail().value);

// Test removeAt at the end of the Linked list
// console.log("List is: ", lL.toString(), "with head of: ", lL.Head(), " and tail of: ", lL.Tail());
// lL.removeAt(-1);
// console.log("List is: ", lL.toString(), "with head of: ", lL.Head(), " and tail of: ", lL.Tail());


// // Test Insertion within the array
// console.log("Linked List: ", lL.toString(), " of Size: ", lL.size());
// lL.insertAt(1, 4, 5, 6);
// console.log(" And Now After Adding [4, 5, 6] in at index 1: ", lL.toString(), "Head is: ", lL.Head().value, " Tail is: ", lL.Tail().value);
// // Test Insertion in the beginning of the array
// lL.insertAt(0, 8, 9, 0);
// console.log(" And Now After Adding [8, 9, 0] in at index 0: ", lL.toString(), "Head is: ", lL.Head().value, " Tail is: ", lL.Tail().value);
// // Test Insertion in the end of the array
// lL.insertAt(-1, 4, 5, 6);
// console.log(" And Now After Adding [4, 5, 6] in at index -1: ", lL.toString(), "Head is: ", lL.Head().value, " Tail is: ", lL.Tail().value);
// // Test Out of Range Insertion
// lL.insertAt(99, 1, 1, 1)
// console.log(lL.toString());

// // Test If List is Empty
// console.log("Linked List After Instantiating is empty? : ", lL.toString()==="");

// lL.prepend(0);
// lL.prepend(-1);
// lL.prepend(-2);

// // Test Append, Prepend, Size, and toString
// console.log("Linked List: ", lL.toString(), " of Size: ", lL.size());

// // Test at() method when over range
// console.log("Element at provided index is: ", lL.at(8));

// lL.append(4);

// // Testing size() when changes occur to the linked list
// console.log("Linked List: ", lL.toString(), " of Size: ", lL.size());

// // Testing pop() method
// console.log("Values being removed are: ", lL.pop(), " ", lL.pop(), " Linked List is now: ", lL.toString(), " of Size: ", lL.size());

// // Testing contains(val) method
// console.log("Linked List is now: ", lL.toString(), " of Size: ", lL.size(), "Does the Linked List contain 1: ", lL.contains(1), "Does it contain 6 (non-existent): ", lL.contains(6));

// // Testing findIndex(val) method
// console.log("Linked List is now: ", lL.toString(), " of Size: ", lL.size(), "Looking for value of 2: ", lL.findIndex(2), " Looking for value of 6 (non-existent): ", lL.findIndex(6));

// lL.append(4);
// lL.append(4);
// lL.append(4);

// // Testing findIndex(val) method
// console.log("Linked list is: ", lL.toString(), " of Size: ", lL.size(), " and the index of value 4 is: ", lL.findIndex(4));