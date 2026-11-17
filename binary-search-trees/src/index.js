class Node {
    constructor(data, left=null, right=null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
class Tree {
    constructor(array){
        this.root = this.#buildTree(array);
    }
    #buildTree(array){
        // [9, 8, 5, 3, 2, 1, 0, 4]
        // [0, 1, 2, 3]
        // [0, 1]
        // Base Case
        if (array.length == 0) return null;
        if (array.length == 1) return new Node(array[0]);
        let uniqueSorted = Array.from(new Set(array)).sort((a, b)=> a - b);
        // [0, 1, 2, 3, 4, 5, 8, 9]
        // Get Median
        let medianIndex = Math.floor(uniqueSorted.length / 2);
        // 4
        // 2
        // 1
        // Cut out Left
        let left = uniqueSorted.slice(0, medianIndex);
        // [0, 1, 2, 3] L1
        // [0, 1] L2
        // [0] l3
        // Cut out Right
        let right = uniqueSorted.slice(medianIndex + 1);
        // [5, 8, 9] R1
        // [3] R2
        // [] =>>>>>> Stack Overflow
        // Create Root
        let rootNode = new Node(uniqueSorted[medianIndex], this.#buildTree(left), this.#buildTree(right));
        // [4 => Left([0, 1, 2, 3]) => Right([5, 8, 9])] #1
        // [2 => Left([0, 1]) => Right([3])] #2
        return rootNode;
    }
    #traverseTree(rootNode, value){
        // Base Case
        if (rootNode.data < value){
            if (rootNode.right == null)
                return rootNode;
        } else if (rootNode.data > value){
            if (rootNode.left == null)
                return rootNode;
        }
        if (rootNode.data < value){
            return this.#traverseTree(rootNode.right, value)
        }
        else if (rootNode.data > value){
            return this.#traverseTree(rootNode.left, value)
        }
    }
    #inOrderTraversal(node, callback){
        // Handles Null Cases
        if (node === null) return;
        if (node.left === null) return callback(node);
        let left = this.#inOrderTraversal(node.left, callback);
        callback(node);
        let right = this.#inOrderTraversal(node.right, callback);
        
    }
    #preOrderTraversal(node, callback){
        // Handles Null Cases
        if (node === null) return;
        if (node.left == null) return callback(node.data);
        callback(node.data);
        let left = this.#preOrderTraversal(node.left, callback);
        let right = this.#preOrderTraversal(node.right, callback);
        
    }
    #postOrderTraversal(node, callback){
        // Handles Null Cases
        if (node === null) return;
        if (node.left == null) return callback(node.data);
        let left = this.#postOrderTraversal(node.left, callback);
        let right = this.#postOrderTraversal(node.right, callback);
        callback(node.data);
        
    }
    #get(value, start = this.root){
        // If not found
        if (!this.includes(value)) return undefined;
        // Base case
        if (start.data === value) return start
        // Traverse
        if (start.data > value)
            return this.#get(value, start.left)
        else if (start.data < value)
            return this.#get(value, start.right)
    }
    #heightHelper(node){
        // Base Case
        if (node == null) return -1;
        let left = this.#heightHelper(node.left);
        let right = this.#heightHelper(node.right);
        return Math.max(left, right) + 1;
    }
    #getParent(value, start = this.root){
        if (start.left)
            if (start.left.data === value) return start
        if (start.right)
            if (start.right.data === value) return start
        if (start.data > value) return this.#getParent(value, start.left);
        if (start.data < value) return this.#getParent(value, start.right);
    }
    #getSuccessor(node){
        // Base Case
        if (node.left === null) return node;
        return this.#getSuccessor(node.left);
    }
    #getSuccessorRight(node){
        // Base Case
        console.log("Node: ", node);
        if (node.right === null) return node;
        return this.#getSuccessor(node.right);
    }
    includes(value, start=this.root, found=false){
        // Base Case
        if (!start) return found;
        // Checker
        if(start.data == value){
            found = true;
            return found;
        }
        else if(start.data > value)
            found = this.includes(value, start.left, found);
        else
            found = this.includes(value, start.right, found);
        return found
    }
    insert(value){
        // Do nothing in case value exists already 
        if (this.includes(value)) return
        // Traversal
        let node = this.#traverseTree(this.root, value)
        // Create Node
        let newNode = new Node(value);
        // Place the node
        if (newNode.data > node.data)
            node.right = newNode;
        else
            node.left = newNode;
    }
    levelOrderForEach(root=this.root, callBack){
        // In case of empty
        if (root === null || root === undefined) return;
        // Define Depth Counter
        // Define Queue
        let q = [root];
        // Outer Loop [Keeps track of levels]
        while (q.length !== 0){
            // Capture the length of the queue before dequeue-ing
            let levelWidth = q.length;
            // Inner Loop [Loops over left and right]
            for (let i = 0; i < levelWidth; i++){
                // Dequeue the node in turn for processing
                let node = q.shift();
                // Process current node
                callBack(node.data);
                // Make sure children nodes are not null or undefined (Left => Right)
                if (node.left !== undefined && node.left !== null)
                    // Enqueue next level left
                q.push(node.left);
                if (node.right !== undefined && node.right !== null)
                    // Enqueue next level right
                    q.push(node.right);
            }
        }
    }
    inOrderforEach(callBack){
        // Throw Error in case no Callback
        if (typeof callBack !== "function"){
            throw new Error("A Callback is required")
        }
        return this.#inOrderTraversal(this.root, callBack);
    }
    preOrderforEach(callBack){
        // Throw Error in case no Callback
        if (typeof callBack !== "function"){
            throw new Error("A Callback is required")
        }
        return this.#preOrderTraversal(this.root, callBack);
    }
    postOrderforEach(callBack){
        // Throw Error in case no Callback
        if (typeof callBack !== "function"){
            throw new Error("A Callback is required")
        }
        return this.#postOrderTraversal(this.root, callBack);
    }
    depth(value, counter = 0, start = this.root){
        // If Value is not present in tree
        if (!this.includes(value)) return undefined;
        // Base case if value is found
        if (start.data == value) return counter;
        counter ++;
        if (start.data > value)
            return this.depth(value, counter, start.left);
        else if (start.data < value)
            return this.depth(value, counter, start.right);
        return counter
    }
    height(value){
        let node = this.#get(value);
        return this.#heightHelper(node);
    }
    deleteItem(value){
        let node = this.#get(value);
        // Node not Found
        if (node === undefined) return;
        // Handles Root Node cases
        if (node.data === this.root.data){
            let count = 0;
            // Record count
            this.inOrderforEach(() => count++);
            // Has 2 children only
            if (count === 3){
                if (!node.right){
                    this.root = node.left;
                    return;
                }
                node.data = node.right.data;
                node.right = null;
            }
            // Has 1 child
            else if (count === 2){
                if (node.right){
                    node.data = node.right.data;
                    node.right = null;
                } else if (node.left) {
                    node.data = node.left.data;
                    node.left = null;
                }
            }
            // Has 0 child
            else if (count === 1){
                this.root = null;
            }
            else {
                // Get Successor
                let successor;
                if (node.right === null)
                    successor = this.#getSuccessorRight(node.left);
                else 
                    successor = this.#getSuccessor(node.right);
                console.log("Successor: ",successor.data);
                // Get Successor Parent
                let parent = this.#getParent(successor.data);
                // Change Values
                node.data = successor.data;
                console.log("Parent: ", parent.data);
                // Delete Original Successor;
                if (!node.right){
                    if (successor.data === node.left.data)
                        this.root = successor;
                    else
                    parent.right = successor.left;
                }
                else if(node.right.data === successor.data){
                    if (!successor.right)
                        parent.right = null;
                    else {
                        parent.right = successor.right;
                    }
                }
                else
                    parent.left = null;
            }
        }
        // In case of 0 Children
        else if (node.left === null && node.right === null){
            let parent = this.#getParent(node.data);
            if (parent.data > node.data)
                parent.left = null;
            else
                parent.right = null;
        }
        // In case of 1 Children
        else if (node.left && !node.right){
            let parent = this.#getParent(node.data);
            if (parent.left.data === node.data)
                parent.left = node.left;
            else
                parent.right = node.left;
            node = null;
        } else if (node.right && !node.left){
            let parent = this.#getParent(node.data);
            if (parent.left.data === node.data)
                parent.left = node.right;
            else
                parent.right = node.right;
            node = null;
        }
        // In case of 2 Children
        else if (node.left && node.right){
            // find Successor;
            let successor = this.#getSuccessor(node.right);
            let n = this.#get(successor.data, node.right);
            // Copy value from successor node to deleted node
            node.data = successor.data;
            // Delete Successor from original position By Getting Parent
            let p = this.#getParent(n.data, node);
            if (node.right.data === successor.data)
                p.right = null;
            else
                p.left = null;
        }
    }
    isBalanced(){
        // Keep track of height being over 1 or not (Bi-Value)
        let heights = [];
        this.inOrderforEach((e)=> {
            let left;
            let right;
            // Handle Null nodes
            if (!e.left)
                left = -1;
            else
                // Left Height
                left = this.height(e.left.data);
            if (!e.right)
                right = -1;
            else
                // right Height
                right = this.height(e.left.data);
            // Check difference between height of left vs height of right
            let result = Math.abs(left - right);
            // If height is more than less than or equal 1 log true
            if (result <= 1)
                heights.push(true);
            // Else false
            else
                heights.push(false);
        });
        // Check if There is any individual false value
        let notBalanced = heights.some((val) => val === false);
        return !notBalanced;
    }
    rebalance(){
        let values = [];
        // Record each individual node data
        this.inOrderforEach((e)=> values.push(e.data));
        console.log(values);
        // Re-Build the tree using the values array
        this.root = this.#buildTree(values);
    }
    printTree(rootNode=this.root){
        // In case of empty
        if (rootNode === null || rootNode === undefined) return
        // Define the Queue
        let q =[rootNode];
        // Outer Loop (tracks the width of the level)
        while (q.length !== 0){
            let levelWdith = q.length;
            let levelStr = " ";
            // Inner Loop
            for (let i = 0; i < levelWdith; i++){
                let node = q.shift();
            if (node === null || node === undefined) return
                levelStr += node.data + " ";
                if (node.left !== undefined && node.left !== null)
                q.push(node.left);
                if (node.right !== undefined && node.right !== null)
                q.push(node.right);
            }
            console.log(levelStr);
        }
    }
    prettyPrint(node, prefix = '', isLeft = true){
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

let arr = new Tree([9, 8, 5, 3, 2, 1, 0, 4, 0, 10]);

// arr.prettyPrint(arr.root);
console.log(arr.isBalanced());
arr.deleteItem(9);
arr.deleteItem(10);
arr.deleteItem(8);
arr.deleteItem(5);
arr.prettyPrint(arr.root);
console.log(arr.isBalanced());
arr.rebalance();
arr.prettyPrint(arr.root);
// console.log(arr.height(null));
