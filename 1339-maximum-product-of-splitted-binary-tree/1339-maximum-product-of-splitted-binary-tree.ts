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
 * Finds maximum product of two subtrees after removing one edge
 * Strategy: 
 * 1. Calculate total tree sum
 * 2. For each edge, calculate: subtreeSum × (totalSum - subtreeSum)
 * 3. Track maximum product across all possible cuts
 */
const maxProduct = (root: TreeNode | null): number => {
    if (!root) return 0;
    
    const MOD = 1e9 + 7;
    
    // First pass: calculate total sum of all nodes
    const totalTreeSum = calculateTreeSum(root);
    
    let maxProduct = 0;
    
    /**
     * DFS to try cutting each edge and calculate resulting product
     * Returns the sum of the subtree rooted at current node
     */
    const calculateSubtreeSumsAndTrackMax = (node: TreeNode | null): number => {
        if (!node) return 0;
        
        // Calculate sum of left and right subtrees
        const leftSubtreeSum = calculateSubtreeSumsAndTrackMax(node.left);
        const rightSubtreeSum = calculateSubtreeSumsAndTrackMax(node.right);
        
        // Sum of current subtree = current node + left subtree + right subtree
        const currentSubtreeSum = node.val + leftSubtreeSum + rightSubtreeSum;
        
        // If we cut the edge above this subtree:
        // - One part has sum = currentSubtreeSum
        // - Other part has sum = totalTreeSum - currentSubtreeSum
        const product = (totalTreeSum - currentSubtreeSum) * currentSubtreeSum;
        maxProduct = Math.max(product, maxProduct);
        
        return currentSubtreeSum;
    };
    
    calculateSubtreeSumsAndTrackMax(root);
    
    // Return result modulo 10^9 + 7
    return maxProduct % MOD;
};

/**
 * Helper function to calculate sum of all nodes in tree
 */
const calculateTreeSum = (node: TreeNode | null): number => {
    if (!node) return 0;
    return node.val + calculateTreeSum(node.left) + calculateTreeSum(node.right);
};