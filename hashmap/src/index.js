class Node {
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.next = null;
    }
}
class LinkedList{
    constructor(key, value){
        this.head = new Node(key, value);
        this.tail = null
    }
    size(){
        let current = this.head;
        let counter = 0;
        while(current.next != null){
            current = current.next;
            counter ++;
        }
        if (current.next == null) counter++;
        return counter;
    }
    append(key, value){
        let newNode = new Node(key, value);
        // Edge Cases
        if (this.size() == 0){
            this.head = newNode;
            return
        } else if (this.size() == 1){
            this.head.next = newNode;
            this.tail = newNode;
            return
        }
        // Traverse
        let current = this.head;
        while (current.next != null){
            current = current.next;
        }
        current.next = newNode;
        this.tail = newNode;
    }
    hasKey(key){
        // Edge Case
        if (this.size() == 0) 
            return false
        else if (this.size() == 1){
            if (this.head.key == key)
                return true
            return false
        }
        let current = this.head;
        while(current != null){
            if (current.key == key){
                return true
            }
            current = current.next;
        }
        return false
    }
    getNode(key){
        // Edge Case
        if (this.size() == 0) return undefined;
        if (this.size() == 1){
            if (this.head.key == key) 
                return this.head;
            return undefined;
        }
        // Otherwise
        let current = this.head;
        while(current != null){
            if (current.key == key)
                return current;
            current = current.next;
        }
        return undefined;
    }
    toString(){
        if (this.size() == 0 ) console.log("Empty Linked List!")
        let current = this.head;
        let counter = 1;
        let string = `[Head] =>`;
        while(current != null){
            string += ` Node #${counter} [Key: ${current.key}, Value: ${current.value}] =>`;
            current = current.next;
            counter ++;
        }
        string += ` Null`;
        console.log(string);
    }
}

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++){
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity;
        }
        return hashCode;
    }
    set(key, value){

        // Hash
        const hash = this.hash(key);
        
        // If the hash exists
        if (this.has(key)){
            // Check if it is the same key
            if (this.buckets[hash].hasKey(key)){
                // Modify the Value
                let node = this.buckets[hash].getNode(key);
                node.value = value;
            }
            // Otherwise if the key is different, append a new node
            else {
                this.buckets[hash].append(key, value);
            }
        } 
        // If it doesn't exist
        else {
            let linkedList = new LinkedList(key, value);
            this.buckets[hash] = linkedList;
        }
        // Hash the key

        // Check if Key Already Exists
        this.has()
    }
    has(key){
        const hash = this.hash(key);
        this.buckets[hash] ? true : false;
    }
    resize(){
        // Doubles the number of Capacity and Buckets
        this.capacity = this.capacity * 2;
        this.buckets = new Array(this.capacity);
    }
}

let l = new LinkedList(1, "rabbit");

l.append(2, "lion");
l.append(3, "pigeon");
l.append(4, "snake");
l.toString();
console.log(l.getNode(2));
let x = new HashMap();

console.log(x.hash("asasdsadd"));