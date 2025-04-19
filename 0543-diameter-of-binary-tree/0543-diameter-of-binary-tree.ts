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

const diameterOfBinaryTree = (root: TreeNode | null): number => {
    let diameter = 0;

    const getDiameter = (node: TreeNode | null): number => {
        if (node === null)  return 0;

        let leftDiameter = getDiameter(node.left);
        let rightDiameter = getDiameter(node.right);

        diameter = Math.max(leftDiameter + rightDiameter, diameter);

        return Math.max(leftDiameter, rightDiameter) + 1;
    }

    getDiameter(root);

    return diameter;
};