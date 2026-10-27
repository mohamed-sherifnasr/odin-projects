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
        // Base Case
        if (array.length == 1) return new Node(array[0]);
        let uniqueSorted = Array.from(new Set(array)).sort();
        // Get Median
        let medianIndex = Math.floor(uniqueSorted.length / 2);
        // Cut out Left
        let left = uniqueSorted.slice(0, medianIndex);
        // Cut out Right
        let right = uniqueSorted.slice(medianIndex + 1);
        // Create Root
        let rootNode = new Node(uniqueSorted[medianIndex], this.#buildTree(left), this.#buildTree(right));
        return rootNode;
    }
    depthTraverse(){

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
    inOrderforEach(callBack){

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
}

let arr = new Tree([9, 8, 5, 3, 2, 1, 0, 0]);
arr.printTree();
console.log(arr.includes(0));