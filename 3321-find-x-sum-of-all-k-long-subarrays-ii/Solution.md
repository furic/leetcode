# Dual Set with Red-Black Tree | 450 Lines | O(n log k) | 588ms

# Intuition
The naive approach of processing each window independently requires O(n × k log k) time due to repeated sorting. We can optimize by maintaining a sliding window with two ordered sets: one tracking the top x most frequent elements (for quick x-sum calculation) and another tracking remaining elements. As the window slides, we incrementally update these sets rather than recomputing from scratch.

# Approach
**Sliding Window with Dual Ordered Sets:**
- Maintain two red-black tree-based ordered sets sorted by (frequency, value)
- `topXElements`: stores exactly x most frequent elements
- `remainingElements`: stores all other elements
- Track `topXSum` incrementally for O(1) answer queries
- As window slides, add/remove elements and rebalance sets

**Step-by-Step Process:**

1. **Data Structures:**
   - `frequencyMap`: tracks current frequency of each value
   - `topXElements`: ordered set of top x elements by (freq, value)
   - `remainingElements`: ordered set of non-top elements
   - `topXSum`: running sum of value × frequency for top x elements

2. **Red-Black Tree Implementation:**
   - Self-balancing BST for O(log n) insert/delete/min/max
   - Custom comparator: sort by frequency desc, then value desc
   - Maintains order for efficient min/max queries

3. **Add Element to Window:**
   - Get current frequency from map
   - If element exists, remove old (value, freq) pair from whichever set contains it
   - Increment frequency, insert new (value, freq+1) pair into `remainingElements`
   - Call `rebalance()` to maintain top x invariant

4. **Remove Element from Window:**
   - Get current frequency from map
   - Remove (value, freq) pair from whichever set contains it
   - If frequency > 1, insert (value, freq-1) into `remainingElements`
   - Otherwise, remove from frequency map entirely
   - Call `rebalance()` to maintain top x invariant

5. **Rebalance Operation:**
   **Phase 1 - Remove excess from top:**
   - While `topXElements.size > x`: move minimum element to remaining

   **Phase 2 - Fill top if undersized:**
   - While `topXElements.size < x` and `remainingElements` not empty:
     - Move maximum element from remaining to top

   **Phase 3 - Swap if better candidates exist:**
   - While minimum in top < maximum in remaining (by comparator):
     - Swap them
     - Update `topXSum` accordingly
   - This ensures top x contains the x best elements

6. **Sliding Window Processing:**
   - Add `nums[i]` to window
   - If `i >= k`, remove `nums[i-k]` from window (slide left boundary)
   - If `i >= k-1`, record `topXSum` as result

7. **Return Results:**
   - Array of x-sums for all windows

**Why This Works:**

**Incremental Updates:**
- Frequency changes are localized to one element at a time
- O(log k) to remove/insert in ordered sets
- Rebalance maintains O(x) comparisons and O(x log k) swaps worst case

**Top X Invariant:**
- After rebalance, `topXElements` contains exactly the x elements that rank highest by (frequency, value)
- `topXSum` accurately reflects sum of these elements' contributions

**Red-Black Tree Properties:**
- Guaranteed O(log n) height
- Min/max queries in O(log n)
- Self-balancing maintains efficiency

**Example Walkthrough (nums = [1,1,2,2,3,4,2,3], k = 6, x = 2):**

**Initial window [1,1,2,2,3,4]:**
- Add elements one by one, maintaining sets
- After all additions: frequencies {1:2, 2:2, 3:1, 4:1}
- Rebalance determines top 2: (2,2) and (1,2)
- topXSum = 2×2 + 1×2 = 6 ✓

**Slide to [1,2,2,3,4,2]:**
- Remove 1: frequency 2→1
- Add 2: frequency 2→3
- Rebalance: top 2 becomes (2,3) and (4,1)
- topXSum = 2×3 + 4×1 = 10 ✓

**Key Insights:**

**Why Two Sets:**
- Separate top x from others for efficient min/max queries
- Rebalance swaps elements between sets as needed
- Maintains invariant without full re-sorting

**Comparator Design:**
- Primary: frequency descending (most frequent first)
- Secondary: value descending (tie-breaker)
- Matches problem's "more frequent" definition exactly

**Rebalance Phases:**
- Phase 1 & 2: ensure size = x
- Phase 3: ensure quality (best x elements)
- Together maintain correctness

**Complexity Analysis:**

**Per Window Transition:**
- Add/remove element: O(log k) for set operations
- Rebalance: O(x log k) worst case (x swaps, each O(log k))
- Since x ≤ k, amortized O(log k) per element

**Total:**
- n windows × O(log k) per transition = O(n log k)
- Massive improvement over O(n k log k) naive approach

**Edge Cases:**

**Distinct elements < x:**
- `topXElements` never fills to x
- `topXSum` = sum of all elements in window

**All same frequency:**
- Tiebreaker (value desc) determines top x
- Larger values preferred

**x = k:**
- All elements in top x
- topXSum = window sum

**Single element repeated:**
- Only one distinct element
- Always in top x

**Large k, small x:**
- Most elements in `remainingElements`
- Frequent rebalancing needed

# Complexity
- Time complexity: $$O(n \log k)$$ where n is array length and k is window size - each element added/removed once with O(log k) set operations
- Space complexity: $$O(k)$$ for the two ordered sets storing window elements

# Code
```typescript
const findXSum = (nums: number[], k: number, x: number): number[] => {
    const frequencyMap = new Map<number, number>();
    const topXElements = new OrderedSet();
    const remainingElements = new OrderedSet();
    let topXSum = 0;
    const result: number[] = [];

    const rebalance = (): void => {
        while (topXElements.size > x) {
            const minElement = topXElements.getMin();
            if (!minElement) break;
            const [value, frequency] = minElement;
            topXElements.delete(value, frequency);
            topXSum -= value * frequency;
            remainingElements.insert(value, frequency);
        }

        while (topXElements.size < x && remainingElements.size > 0) {
            const maxElement = remainingElements.getMax();
            if (!maxElement) break;
            const [value, frequency] = maxElement;
            remainingElements.delete(value, frequency);
            topXElements.insert(value, frequency);
            topXSum += value * frequency;
        }

        while (topXElements.size > 0 && remainingElements.size > 0) {
            const minInTop = topXElements.getMin()!;
            const maxInRemaining = remainingElements.getMax()!;
            
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

    const addElement = (value: number): void => {
        const currentFrequency = frequencyMap.get(value) ?? 0;
        
        if (currentFrequency > 0) {
            if (!remainingElements.delete(value, currentFrequency)) {
                if (topXElements.delete(value, currentFrequency)) {
                    topXSum -= value * currentFrequency;
                }
            }
        }
        
        const newFrequency = currentFrequency + 1;
        frequencyMap.set(value, newFrequency);
        remainingElements.insert(value, newFrequency);
        rebalance();
    };

    const removeElement = (value: number): void => {
        const currentFrequency = frequencyMap.get(value)!;
        
        if (!remainingElements.delete(value, currentFrequency)) {
            if (topXElements.delete(value, currentFrequency)) {
                topXSum -= value * currentFrequency;
            }
        }
        
        if (currentFrequency - 1 > 0) {
            frequencyMap.set(value, currentFrequency - 1);
            remainingElements.insert(value, currentFrequency - 1);
        } else {
            frequencyMap.delete(value);
        }
        
        rebalance();
    };

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
```

```typescript
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
```