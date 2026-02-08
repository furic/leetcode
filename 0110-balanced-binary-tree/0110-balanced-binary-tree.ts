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
 * Checks if binary tree is height-balanced
 * A tree is balanced if left and right subtree heights differ by at most 1 (for all nodes)
 * Strategy: DFS to compute heights while checking balance condition
 */
const isBalanced = (root: TreeNode | null): boolean => {
    let isTreeBalanced = true;

    const computeHeight = (node: TreeNode | null): number => {
        if (node === null) return 0;

        const leftHeight = computeHeight(node.left);
        const rightHeight = computeHeight(node.right);

        // Check balance condition: height difference ≤ 1
        if (Math.abs(leftHeight - rightHeight) > 1) isTreeBalanced = false;

        return Math.max(leftHeight, rightHeight) + 1;
    };

    computeHeight(root);
    return isTreeBalanced;
};