#  BFS Level-Order Traversal | 31 Lines | O(n) | 4ms

# Intuition

To find the level with maximum sum, we need to compute the sum at each level and track the maximum. BFS (level-order traversal) naturally processes nodes level by level, making it ideal for this problem.

# Approach

**BFS Strategy:**
- Use queue to process tree level by level
- For each level, sum all node values
- Track the level with maximum sum
- Use > (not ≥) to return smallest level on ties

**Queue Optimization:**
- Use array with read index instead of shift()
- shift() is O(n), but incrementing index is O(1)
- Avoids expensive array reindexing on each dequeue

**Level Tracking:**
- Count nodes at start of each level: `queue.length - queueReadIndex`
- Process exactly that many nodes before moving to next level
- Increment level counter after processing each level

**Example: root=[1,7,0,7,-8,null,null]**

Level 1: sum=1
- Process node(1), add children

Level 2: sum=7+0=7 (max so far)
- Process node(7), node(0), add children

Level 3: sum=7+(-8)=-1
- Process node(7), node(-8)

Result: Level 2 with sum=7 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Visit each node exactly once
  - Constant work per node
  - Queue operations: O(1) amortized

- Space complexity: $$O(w)$$
  - w = maximum width of tree
  - Queue holds at most one level
  - Worst case: complete tree has w≈n/2

# Code
```typescript []
const maxLevelSum = (root: TreeNode | null): number => {
    let maxSum = Number.MIN_SAFE_INTEGER;
    let levelWithMaxSum = 1;
    
    const queue: TreeNode[] = [root!];
    let queueReadIndex = 0;
    let currentLevel = 0;
    
    while (queueReadIndex < queue.length) {
        const nodesInCurrentLevel = queue.length - queueReadIndex;
        let currentLevelSum = 0;
        currentLevel++;
        
        for (let i = 0; i < nodesInCurrentLevel; i++) {
            const currentNode = queue[queueReadIndex++];
            currentLevelSum += currentNode.val;
            
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
        
        if (currentLevelSum > maxSum) {
            maxSum = currentLevelSum;
            levelWithMaxSum = currentLevel;
        }
    }
    
    return levelWithMaxSum;
};
```