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

function rightSideView(root: TreeNode | null): number[] {
    if (!root) return [];
    
    const levelMap = new Map<number, number>();
    const stack: [TreeNode, number][] = [[root, 0]];

    while (stack.length !== 0) {
        const [node, level] = stack.shift()!;

        levelMap.set(level, node.val);

        if (node.left) stack.push([node.left, level + 1]);
        if (node.right) stack.push([node.right, level + 1]);
    }

    return Array.from(levelMap.values());
};