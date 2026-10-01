class node {
    constructor(value = null, next = null){
        this.value = value;
        this.nextNode = next;
    }
}
class linkedList {
    constructor(){
        this.head = null
        this.tail = null
    }
    append(val){
        let newNode = new node(val);
        // If Empty
        if (this.tail == null){
            this.tail = newNode;
            this.head = newNode;
        }
        else {
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
    }
    prepend(val){
        let newNode = new node(val);
        // If Empty
        if (this.head == null){
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.nextNode = this.head;
            this.head = newNode;
        }
    }
    size(){
        let current = this.head;
        let size = 0;

        // If Empty
        if (current == null) return size;

        while (current !== null) {
            size ++;
            current = current.nextNode;
        }
        return size;
    }
    Head(){
        if (this.head == null)
            return undefined;
        else
            return this.head;
    }
    Tail(){
        if (this.tail == null)
            return undefined;
        else
            return this.tail;
    }
    at(index){
        // If Empty
        if (this.head == null) return undefined;
        
        let current = this.head;
        let counter = 0;

        while (counter <= index){
            // Return Value of Node if it matches the provided index
            if (counter == index) return current.value;
            // If You were to look for an inexistent index
            if (current == null) return undefined;
            counter ++;
            current = current.nextNode;
        }
    }
    pop(){
        if (this.head == null) 
            return undefined;
        else {
            // Capture the to-be-removed node
            let removedNode = this.head;
            // Have the head point to the node next to the node being removed
            this.head = removedNode.nextNode;
            // Have the node removed point at nothing (Garbage Collection)
            removedNode.newNode = null;

            return removedNode.value;
        }
    }
    contains(val){
        // Counter
        let current = this.head;
        while (current !== null){
            if (current.value == val) return true;
            current = current.nextNode;
        }
        return false
    }
    findIndex(val){
        let current = this.head;
        let index = 0;

        while(current !== null){
            if (current.value == val) return index;
            index++;
            current = current.nextNode;
        }
        return -1;
    }
    toString(){
        let current = this.head;
        let list = "";
        while (current !== null){
            list += `(${current.value}) => `
            current = current.nextNode;
        }
        //If the linked list is not empty 
        if (this.head !== null){
            list += `null`;
            list = `[ ${list} ]`;
        }
        return list;
    }
    // Extra Credit
    insertAt(index, ...values){
        // If Empty
        if (this.head == null) throw new Error("Empty Linked List!")
        // If Index is out of Range
        if (index > this.size() - 1 || index < -1) throw new Error("Range Error!");
        // Instantiating counters
        let currentNode = this.head;
        let currentIndex = 0;

        // Instantiate Reference Nodes
        let indexBeforeNode = null;
        let indexAtNode = null;

        // Create New Nodes and Assign values
        let nodes = values.map((value)=> new node(value));
        // New Nodes point to each other consecutively
        nodes.forEach((nd, ind, arr)=>{
            // Reach The final node of the inputted values and then 'continue' out of the loop 
            if(nd == arr.at(-1)) return;
            // Nodes Point to one after another
            nd.nextNode = arr[ind + 1]
        })
        // Traversing the Linked List to find the two different nodes to be adjusted and store their references.
        while(currentNode !== null){
            // Upon finding the The Node that comes before the node of index on which we place our values, store reference.
            if (index == currentIndex + 1) indexBeforeNode = currentNode;
            // Upon finding the The Node on which we place our values, store reference.
            if (index == currentIndex) indexAtNode = currentNode;
            // Move up the list
            currentNode = currentNode.nextNode;
            currentIndex++;
        }
        // Handle Special Cases: 
        // #1 When Index is 0 Head is meant to be adjust + There is no prior node
        if (index == 0){
            console.log("Case #1");
            // Head now points to the first element in the inputted elements
            this.head = nodes[0];
            // Last Element in the inputted elements now points to Index Node
            nodes.at(-1).nextNode = indexAtNode;
        }
        // #2 When Index is -1 (Elements are meant to be appended to the linked list)
        else if (index == -1){
            console.log("Case #2");
            // Last Node in the Linked List now points to the first element of the inputted values
            this.tail.nextNode = nodes[0];
            // Tail is now set at the final element of the inputted values
            this.tail = nodes.at(-1);
        }
        // #3 Anywhere else within the linked list 
        else {
            console.log("Case #3");
            // Index Node that comes before the target Index Node is now pointing to the first node of the inputted values;
            indexBeforeNode.nextNode = nodes[0];
            // Target Node is being pointed at by the last Node of the inputted values
            nodes.at(-1).nextNode = indexAtNode;
        }
    }
}

let lL = new linkedList();


lL.append(1);
lL.append(2);
lL.append(3);

// Test Insertion within the array
console.log("Linked List: ", lL.toString(), " of Size: ", lL.size());
lL.insertAt(1, 4, 5, 6);
console.log(" And Now After Adding [4, 5, 6] in at index 1: ", lL.toString(), "Head is: ", lL.Head().value, " Tail is: ", lL.Tail().value);
// Test Insertion in the beginning of the array
lL.insertAt(0, 8, 9, 0);
console.log(" And Now After Adding [8, 9, 0] in at index 0: ", lL.toString(), "Head is: ", lL.Head().value, " Tail is: ", lL.Tail().value);
// Test Insertion in the end of the array
lL.insertAt(-1, 4, 5, 6);
console.log(" And Now After Adding [4, 5, 6] in at index -1: ", lL.toString(), "Head is: ", lL.Head().value, " Tail is: ", lL.Tail().value);
// Test Out of Range Insertion
lL.insertAt(99, 1, 1, 1)
console.log(lL.toString());


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