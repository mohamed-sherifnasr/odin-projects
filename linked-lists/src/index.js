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

let linkedlist = new linkedList();
console.log("Linked List After Instantiating is empty? : ", linkedlist.toString()==="");

linkedlist.append(1);
linkedlist.append(2);
linkedlist.append(3);
linkedlist.prepend(0);
linkedlist.prepend(-1);
linkedlist.prepend(-2);

console.log("Linked List: ", linkedlist.toString(), " of Size: ", linkedlist.size());