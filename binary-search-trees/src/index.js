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
        console.log(uniqueSorted);
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
        console.log(rootNode);
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
        if (node.left == null) return callback(node.data);
        let left = this.#inOrderTraversal(node.left, callback);
        callback(node.data);
        let right = this.#inOrderTraversal(node.right, callback);
        
    }
    #preOrderTraversal(node, callback){
        if (node.left == null) return callback(node.data);
        callback(node.data);
        let left = this.#preOrderTraversal(node.left, callback);
        let right = this.#preOrderTraversal(node.right, callback);
        
    }
    #postOrderTraversal(node, callback){
        if (node.left == null) return callback(node.data);
        let left = this.#postOrderTraversal(node.left, callback);
        let right = this.#postOrderTraversal(node.right, callback);
        callback(node.data);
        
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

arr.prettyPrint(arr.root);


