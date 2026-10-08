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
        // Edge Case
        if (this.size() == 0){
            this.head = newNode;
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
        if (this.size() == 0) return false

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
    entries(){
        // Edge Case
        if (this.size() == 0) return undefined;
        let current = this.head;
        let entries = [];
        while (current != null){
            entries.push([current.key, current.value]);
            current = current.next
        }
        return entries;
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
        return string;
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
            this.buckets[hash] = new LinkedList(key, value);
        }
        // Check if It requires a resize
        if ((this.length() / this.buckets.length) > this.loadFactor)
            this.resize();
    }
    get(key){
        let value;
        for (const bucket of this.buckets){
            if (bucket instanceof LinkedList){
                if (bucket.getNode(key)){
                    value = bucket.getNode(key).value;
                    return value;
                }
            }
        }
        return undefined;
    }
    has(key){
        const hash = this.hash(key);
        // Check if it respects the bounds of the buckets
        if (hash < 0 || hash >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (this.buckets[hash]) 
            return true 
        return false;
    }
    length(){
        let counter = 0;
        this.buckets.forEach(bucket => {
            if (bucket instanceof LinkedList) counter += bucket.size();
        })
        return counter;
    }
    resize(){
        // Temporarily Stores Old Values in an array
        let temp = this.buckets;
        // Doubles the number of Capacity and Buckets
        this.capacity = this.capacity * 2;
        this.buckets = new Array(this.capacity);
        //Goes through each bucket in the Hash Map
        temp.forEach(bucket => {
            if (bucket instanceof LinkedList){
                bucket.entries().forEach(node => {
                    this.set(node[0], node[1]);
                })
            }
        })
    }
    toString(){
        let str = `Hash Map is of size ${this.length()} and is as follows: \n`;
        for(let i = 0; i < this.buckets.length; i++){
            if (this.buckets[i] instanceof LinkedList){
                str += `[Index of ${i}:  ${this.buckets[i].toString()} ]\n`;
            } else {
                str += `[Index of ${i}: Empty]\n`;
            }
        }
        return str;
    }
}

let x = new HashMap();

x.set("Animal1", "Lion");
x.set("Animal2", "Snake");
x.set("Bird3", "Hawk");
x.set("Insect4", "Spider");
x.set("23", "Collision#1");
x.set("1", "Collision#2");
console.log(x.toString());
x.resize();
console.log(x.toString());
console.log(x.get("23"));