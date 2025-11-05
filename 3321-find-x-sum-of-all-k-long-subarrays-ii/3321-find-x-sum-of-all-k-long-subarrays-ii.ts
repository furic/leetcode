const findXSum = (nums: number[], k: number, x: number): number[] => {
    const frequencyMap = new Map<number, number>();
    const topXElements = new OrderedSet();
    const remainingElements = new OrderedSet();
    let topXSum = 0;
    const result: number[] = [];

    // Rebalance top X and remaining sets to maintain invariants
    const rebalance = (): void => {
        // Move excess elements from top to remaining
        while (topXElements.size > x) {
            const minElement = topXElements.getMin();
            if (!minElement) break;
            const [value, frequency] = minElement;
            topXElements.delete(value, frequency);
            topXSum -= value * frequency;
            remainingElements.insert(value, frequency);
        }

        // Fill top X from remaining if needed
        while (topXElements.size < x && remainingElements.size > 0) {
            const maxElement = remainingElements.getMax();
            if (!maxElement) break;
            const [value, frequency] = maxElement;
            remainingElements.delete(value, frequency);
            topXElements.insert(value, frequency);
            topXSum += value * frequency;
        }

        // Swap elements if remaining has better candidates than top X
        while (topXElements.size > 0 && remainingElements.size > 0) {
            const minInTop = topXElements.getMin()!;
            const maxInRemaining = remainingElements.getMax()!;
            
            // If max in remaining is better than min in top, swap them
            if (OrderedSet.compare(maxInRemaining, minInTop) > 0) {
                topXElements.delete(minInTop[0], minInTop[1]);
                remainingElements.delete(maxInRemaining[0], maxInRemaining[1]);
                
                topXSum -= minInTop[0] * minInTop[1];
                topXSum += maxInRemaining[0] * maxInRemaining[1];
                
                topXElements.insert(maxInRemaining[0], maxInRemaining[1]);
                remainingElements.insert(minInTop[0], minInTop[1]);
            } else {
                break;
            }
        }
    };

    // Add element to the sliding window
    const addElement = (value: number): void => {
        const currentFrequency = frequencyMap.get(value) ?? 0;
        
        // Remove old frequency entry if it exists
        if (currentFrequency > 0) {
            if (!remainingElements.delete(value, currentFrequency)) {
                if (topXElements.delete(value, currentFrequency)) {
                    topXSum -= value * currentFrequency;
                }
            }
        }
        
        // Insert new frequency entry
        const newFrequency = currentFrequency + 1;
        frequencyMap.set(value, newFrequency);
        remainingElements.insert(value, newFrequency);
        rebalance();
    };

    // Remove element from the sliding window
    const removeElement = (value: number): void => {
        const currentFrequency = frequencyMap.get(value)!;
        
        // Remove current frequency entry
        if (!remainingElements.delete(value, currentFrequency)) {
            if (topXElements.delete(value, currentFrequency)) {
                topXSum -= value * currentFrequency;
            }
        }
        
        // Update or remove from frequency map
        if (currentFrequency - 1 > 0) {
            frequencyMap.set(value, currentFrequency - 1);
            remainingElements.insert(value, currentFrequency - 1);
        } else {
            frequencyMap.delete(value);
        }
        
        rebalance();
    };

    // Process sliding window
    for (let index = 0; index < nums.length; index++) {
        addElement(nums[index]);
        
        if (index >= k) {
            removeElement(nums[index - k]);
        }
        
        if (index >= k - 1) {
            result.push(topXSum);
        }
    }

    return result;
};

// Red-Black Tree Node
class RBNode {
    key: number;
    value: number;
    color: 'red' | 'black';
    left: RBNode;
    right: RBNode;
    parent: RBNode;

    constructor(key: number, value: number, nil: RBNode) {
        this.key = key;
        this.value = value;
        this.color = 'red';
        this.left = this.right = this.parent = nil;
    }
}

// Red-Black Tree implementation
class RBTree {
    nil: RBNode;
    root: RBNode;

    constructor() {
        this.nil = new RBNode(0, 0, null as any);
        this.nil.color = 'black';
        this.nil.left = this.nil.right = this.nil.parent = this.nil;
        this.root = this.nil;
    }

    // Compare [key, value] pairs: sort by value first, then by key
    static compareKeyValue(a: [number, number], b: [number, number]): number {
        return a[1] === b[1] ? a[0] - b[0] : a[1] - b[1];
    }

    insert(key: number, value: number): boolean {
        const newNode = new RBNode(key, value, this.nil);
        let parent = this.nil;
        let current = this.root;

        // Find insertion position
        while (current !== this.nil) {
            parent = current;
            const comparison = RBTree.compareKeyValue([newNode.key, newNode.value], [current.key, current.value]);
            if (comparison === 0) return false; // Duplicate
            current = comparison < 0 ? current.left : current.right;
        }

        newNode.parent = parent;
        if (parent === this.nil) {
            this.root = newNode;
        } else if (RBTree.compareKeyValue([newNode.key, newNode.value], [parent.key, parent.value]) < 0) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        newNode.left = newNode.right = this.nil;
        newNode.color = 'red';
        this.fixInsert(newNode);
        return true;
    }

    delete(key: number, value: number): boolean {
        let targetNode = this.root;
        
        // Find node to delete
        while (targetNode !== this.nil) {
            const comparison = RBTree.compareKeyValue([key, value], [targetNode.key, targetNode.value]);
            if (comparison === 0) break;
            targetNode = comparison < 0 ? targetNode.left : targetNode.right;
        }
        
        if (targetNode === this.nil) return false;

        let nodeToFix = targetNode;
        let originalColor = nodeToFix.color;
        let replacement: RBNode;

        if (targetNode.left === this.nil) {
            replacement = targetNode.right;
            this.transplant(targetNode, targetNode.right);
        } else if (targetNode.right === this.nil) {
            replacement = targetNode.left;
            this.transplant(targetNode, targetNode.left);
        } else {
            nodeToFix = this.minimum(targetNode.right);
            originalColor = nodeToFix.color;
            replacement = nodeToFix.right;
            
            if (nodeToFix.parent === targetNode) {
                replacement.parent = nodeToFix;
            } else {
                this.transplant(nodeToFix, nodeToFix.right);
                nodeToFix.right = targetNode.right;
                nodeToFix.right.parent = nodeToFix;
            }
            
            this.transplant(targetNode, nodeToFix);
            nodeToFix.left = targetNode.left;
            nodeToFix.left.parent = nodeToFix;
            nodeToFix.color = targetNode.color;
        }

        if (originalColor === 'black') {
            this.fixDelete(replacement);
        }
        
        return true;
    }

    minimum(node: RBNode): RBNode {
        while (node.left !== this.nil) node = node.left;
        return node;
    }

    maximum(node: RBNode): RBNode {
        while (node.right !== this.nil) node = node.right;
        return node;
    }

    transplant(oldNode: RBNode, newNode: RBNode): void {
        if (oldNode.parent === this.nil) {
            this.root = newNode;
        } else if (oldNode === oldNode.parent.left) {
            oldNode.parent.left = newNode;
        } else {
            oldNode.parent.right = newNode;
        }
        newNode.parent = oldNode.parent;
    }

    fixInsert(node: RBNode): void {
        while (node.parent.color === 'red') {
            const grandparent = node.parent.parent;
            
            if (node.parent === grandparent.left) {
                const uncle = grandparent.right;
                if (uncle.color === 'red') {
                    node.parent.color = uncle.color = 'black';
                    grandparent.color = 'red';
                    node = grandparent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    node.parent.color = 'black';
                    grandparent.color = 'red';
                    this.rotateRight(grandparent);
                }
            } else {
                const uncle = grandparent.left;
                if (uncle.color === 'red') {
                    node.parent.color = uncle.color = 'black';
                    grandparent.color = 'red';
                    node = grandparent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    node.parent.color = 'black';
                    grandparent.color = 'red';
                    this.rotateLeft(grandparent);
                }
            }
        }
        this.root.color = 'black';
    }

    fixDelete(node: RBNode): void {
        while (node !== this.root && node.color === 'black') {
            if (node === node.parent.left) {
                let sibling = node.parent.right;
                
                if (sibling.color === 'red') {
                    sibling.color = 'black';
                    node.parent.color = 'red';
                    this.rotateLeft(node.parent);
                    sibling = node.parent.right;
                }
                
                if (sibling.left.color === 'black' && sibling.right.color === 'black') {
                    sibling.color = 'red';
                    node = node.parent;
                } else {
                    if (sibling.right.color === 'black') {
                        sibling.left.color = 'black';
                        sibling.color = 'red';
                        this.rotateRight(sibling);
                        sibling = node.parent.right;
                    }
                    sibling.color = node.parent.color;
                    node.parent.color = 'black';
                    sibling.right.color = 'black';
                    this.rotateLeft(node.parent);
                    node = this.root;
                }
            } else {
                let sibling = node.parent.left;
                
                if (sibling.color === 'red') {
                    sibling.color = 'black';
                    node.parent.color = 'red';
                    this.rotateRight(node.parent);
                    sibling = node.parent.left;
                }
                
                if (sibling.right.color === 'black' && sibling.left.color === 'black') {
                    sibling.color = 'red';
                    node = node.parent;
                } else {
                    if (sibling.left.color === 'black') {
                        sibling.right.color = 'black';
                        sibling.color = 'red';
                        this.rotateLeft(sibling);
                        sibling = node.parent.left;
                    }
                    sibling.color = node.parent.color;
                    node.parent.color = 'black';
                    sibling.left.color = 'black';
                    this.rotateRight(node.parent);
                    node = this.root;
                }
            }
        }
        node.color = 'black';
    }

    rotateLeft(node: RBNode): void {
        const rightChild = node.right;
        node.right = rightChild.left;
        
        if (rightChild.left !== this.nil) {
            rightChild.left.parent = node;
        }
        
        rightChild.parent = node.parent;
        
        if (node.parent === this.nil) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }
        
        rightChild.left = node;
        node.parent = rightChild;
    }

    rotateRight(node: RBNode): void {
        const leftChild = node.left;
        node.left = leftChild.right;
        
        if (leftChild.right !== this.nil) {
            leftChild.right.parent = node;
        }
        
        leftChild.parent = node.parent;
        
        if (node.parent === this.nil) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }
        
        leftChild.right = node;
        node.parent = leftChild;
    }
}

// Ordered Set wrapper around Red-Black Tree
class OrderedSet {
    private tree = new RBTree();
    size = 0;

    static compare(a: [number, number], b: [number, number]): number {
        return RBTree.compareKeyValue(a, b);
    }

    insert(key: number, value: number): boolean {
        const success = this.tree.insert(key, value);
        if (success) this.size++;
        return success;
    }

    delete(key: number, value: number): boolean {
        const success = this.tree.delete(key, value);
        if (success) this.size--;
        return success;
    }

    getMin(): [number, number] | null {
        if (this.size === 0) return null;
        const node = this.tree.minimum(this.tree.root);
        return [node.key, node.value];
    }

    getMax(): [number, number] | null {
        if (this.size === 0) return null;
        const node = this.tree.maximum(this.tree.root);
        return [node.key, node.value];
    }
}