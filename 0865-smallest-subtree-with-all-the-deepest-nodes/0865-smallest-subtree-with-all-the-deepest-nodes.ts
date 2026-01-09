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

function subtreeWithAllDeepest(root: TreeNode | null): TreeNode | null {
    function dfs(node: TreeNode | null): [number, TreeNode | null] {
        if (!node) return [0, null];
        const [ld, ln] = dfs(node.left);
        const [rd, rn] = dfs(node.right);
        if (ld > rd) return [ld + 1, ln];
        if (rd > ld) return [rd + 1, rn];
        return [ld + 1, node];
    }
    return dfs(root)[1];
}