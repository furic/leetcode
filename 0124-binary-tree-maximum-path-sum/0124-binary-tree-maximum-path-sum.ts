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
 * Returns the maximum path sum of any non-empty path in a binary tree.
 * A path can start and end at any node and does not necessarily pass through the root.
 */
const maxPathSum = (root: TreeNode | null): number => {
    const [maxPathEndingAtNode, maxPathAny] = getMaxPathSum(root);
    return Math.max(maxPathEndingAtNode, maxPathAny);
}

/**
 * Helper function to compute two values for each subtree:
 * 1. The maximum path sum that *must* end at the current node.
 * 2. The maximum path sum that can be found anywhere in the subtree.
 *
 * @param node - The current root node of the subtree.
 * @returns A tuple [maxEndingAtNode, maxOverall] where:
 *   - maxEndingAtNode: The max path sum that includes `node` as the endpoint.
 *   - maxOverall: The max path sum found anywhere in the subtree.
 */
const getMaxPathSum = (node: TreeNode | null): [number, number] => {
    if (node === null) return [-Infinity, -Infinity];

    // Recursively compute max path sums for left and right subtrees
    const [leftMaxEnding, leftMaxOverall] = getMaxPathSum(node.left);
    const [rightMaxEnding, rightMaxOverall] = getMaxPathSum(node.right);

    // The maximum path sum ending at this node (either taking left/right path or just itself)
    const maxEndingAtNode = Math.max(leftMaxEnding + node.val, rightMaxEnding + node.val, node.val);

    // The maximum path sum in this subtree (could be left, right, or crossing through this node)
    const maxOverall = Math.max(
        leftMaxEnding,
        leftMaxOverall,
        rightMaxEnding,
        rightMaxOverall,
        leftMaxEnding + node.val + rightMaxEnding // Path passing through this node
    );

    return [maxEndingAtNode, maxOverall];
}