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
 * Balances an unbalanced BST by reconstructing it
 * Strategy: In-order traversal to get sorted values, then build balanced BST from sorted array
 */
const balanceBST = (root: TreeNode | null): TreeNode | null => {
    const sortedValues: number[] = [];

    // Collect all values in sorted order via in-order traversal
    const inOrderTraversal = (node: TreeNode | null): void => {
        if (!node) return;
        
        inOrderTraversal(node.left);
        sortedValues.push(node.val);
        inOrderTraversal(node.right);
    };

    // Build balanced BST from sorted array using binary search approach
    // Always pick middle element as root to ensure balance
    const buildBalancedTree = (leftIndex: number, rightIndex: number): TreeNode | null => {
        if (leftIndex > rightIndex) return null;
        
        // Pick middle element to maintain balance
        const middleIndex = Math.floor(leftIndex + (rightIndex - leftIndex) / 2);
        const node = new TreeNode(sortedValues[middleIndex]);
        
        // Recursively build left and right subtrees
        node.left = buildBalancedTree(leftIndex, middleIndex - 1);
        node.right = buildBalancedTree(middleIndex + 1, rightIndex);
        
        return node;
    };

    inOrderTraversal(root);
    return buildBalancedTree(0, sortedValues.length - 1);
};
