/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * Finds the level with maximum sum in a binary tree (1-indexed)
 * Uses BFS level-order traversal to compute sum at each level
 * Returns the smallest level number if there are ties
 */
const maxLevelSum = (root: TreeNode | null): number => {
    let maxSum = Number.MIN_SAFE_INTEGER;
    let levelWithMaxSum = 1;
    
    // BFS queue - using array with index pointer to avoid expensive shift() operations
    const queue: TreeNode[] = [root!];
    let queueReadIndex = 0;
    let currentLevel = 0;
    
    // Process nodes level by level
    while (queueReadIndex < queue.length) {
        // Calculate how many nodes are at current level
        const nodesInCurrentLevel = queue.length - queueReadIndex;
        let currentLevelSum = 0;
        currentLevel++;
        
        // Process all nodes at current level
        for (let i = 0; i < nodesInCurrentLevel; i++) {
            const currentNode = queue[queueReadIndex++];
            currentLevelSum += currentNode.val;
            
            // Add children to queue for next level
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
        
        // Update max if current level has higher sum
        // Using > (not >=) ensures we return the smallest level on ties
        if (currentLevelSum > maxSum) {
            maxSum = currentLevelSum;
            levelWithMaxSum = currentLevel;
        }
    }
    
    return levelWithMaxSum;
};