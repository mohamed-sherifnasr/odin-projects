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
            // Head now points to the first element in the inputted elements
            this.head = nodes[0];
            // Last Element in the inputted elements now points to Index Node
            nodes.at(-1).nextNode = indexAtNode;
        }
        // #2 When Index is -1 (Elements are meant to be appended to the linked list)
        else if (index == -1){
            // Last Node in the Linked List now points to the first element of the inputted values
            this.tail.nextNode = nodes[0];
            // Tail is now set at the final element of the inputted values
            this.tail = nodes.at(-1);
        }
        // #3 Anywhere else within the linked list 
        else {
            // Index Node that comes before the target Index Node is now pointing to the first node of the inputted values;
            indexBeforeNode.nextNode = nodes[0];
            // Target Node is being pointed at by the last Node of the inputted values
            nodes.at(-1).nextNode = indexAtNode;
        }
    }
    removeAt(index){
        // In Case empty
        if (this.head == null) return undefined;
        // Remove the First Element and Adjust
        else if (index == 0){
            // In Case of 1 Node
            if (this.size() == 1){
                this.head.nextNode = null;
                this.head = null;
                this.tail = null;
                return;
            }
            // Reference to the first node
            let firstNode = this.head;
            // Record the reference to the nex node on head first
            this.head = firstNode.nextNode;
            // Have that element no longer referencing another node
            firstNode.nextNode = null;
        }
        // Remove the Last Element and Adjust
        else if (index == -1){
            // In case of just one element
            if (this.size() == 1){
                this.head.nextNode = null;
                this.head = null;
                this.tail = null;
                return;
            }
            // Traverse to the node before it (Second to last)
            let current = this.head;
            while (current !== null){
                // When you reach the second to last node
                if (current.nextNode.nextNode == null){
                    // Have the tail refer to it
                    this.tail = current;
                    // Have it refer to null rather than the item removed
                    current.nextNode = null;
                    break;
                }
                // Continue the way up the list
                current = current.nextNode;
            }
        }
        // Out of Range
        else if (index > this.size() - 1 || index < -1){
            throw new Error("Range Error!");
        }
        // Otherwise
        else {
            // In case of just one element
            if (this.size() == 1){
                this.head.nextNode = null;
                this.head = null;
                this.tail = null;
                return;
            }
            // Reference Needed
            let targetNode = null;
            // Traverse to the node before the one to be removed
            let current = this.head;
            let counter = 0;
            while (current !== null){
                // When you reach the node prior to the one being removed
                if (counter == index - 1){
                    // Store a reference
                    targetNode = current.nextNode;
                    // Assign the prior to target node to the Node that comes after the target node
                    current.nextNode = targetNode.nextNode;
                    // Remove the Reference from the target node
                    targetNode.nextNode = null;
                    if (current.nextNode == null) this.tail = current;
                    break;
                }
                // Move up the list
                counter ++;
                current = current.nextNode;
            }
        }
    }
}
