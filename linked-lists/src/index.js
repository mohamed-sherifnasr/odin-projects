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
    head(){
        if (this.head == null)
            return undefined;
        else
            return this.head;
    }
    tail(){
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
}

let lL = new linkedList();

// Test If List is Empty
console.log("Linked List After Instantiating is empty? : ", lL.toString()==="");

lL.append(1);
lL.append(2);
lL.append(3);
lL.prepend(0);
lL.prepend(-1);
lL.prepend(-2);

// Test Append, Prepend, Size, and toString
console.log("Linked List: ", lL.toString(), " of Size: ", lL.size());

// Test at() method when over range
console.log("Element at provided index is: ", lL.at(8));

lL.append(4);

// Testing size() when changes occur to the linked list
console.log("Linked List: ", lL.toString(), " of Size: ", lL.size());

// Testing pop() method
console.log("Values being removed are: ", lL.pop(), " ", lL.pop(), " Linked List is now: ", lL.toString(), " of Size: ", lL.size());

// Testing contains(val) method
console.log("Linked List is now: ", lL.toString(), " of Size: ", lL.size(), "Does the Linked List contain 1: ", lL.contains(1), "Does it contain 6 (non-existent): ", lL.contains(6));

// Testing indexAt(val) method
console.log("Linked List is now: ", lL.toString(), " of Size: ", lL.size(), "Looking for value of 2: ", lL.findIndex(2), " Looking for value of 6 (non-existent): ", lL.findIndex(6));