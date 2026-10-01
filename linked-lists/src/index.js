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
        if (this.tail == null){
            this.tail = newNode;
            if (this.head == null)
                this.head = newNode;
        }
        else {
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
    }
    toString(){
        let current = this.head;
        let list = "";
        while(current !== null){
            list += `(${current.value}) => `
            current = current.nextNode;
            console.log("Here! ", list, " Current is: ", current);
        }
        //If the linked list is not empty
        if (this.head !== null) list += `null`;
        return list;
    }
}

let linkedlist = new linkedList();
console.log("Linked List After Instantiating: ", linkedlist.toString()==="");

linkedlist.append(1);
linkedlist.append(2);
linkedlist.append(3);
console.log("Linked List After Appending 3 Values: ", linkedlist.toString());
