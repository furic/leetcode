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

function balanceBST(root: TreeNode | null): TreeNode | null {
    const arr: number[] = [];

    function inOrder(node: TreeNode | null): void {
        if (!node) return;
        
        inOrder(node.left);
        arr.push(node.val);
        inOrder(node.right);
    }

    function construct(l: number, r: number): TreeNode | null {
        if (l > r) return null;
        
        const mid = Math.floor(l + (r - l) / 2);
        const node = new TreeNode(arr[mid]);
        
        node.left = construct(l, mid - 1);
        node.right = construct(mid + 1, r);
        
        return node;
    }

    inOrder(root);
    return construct(0, arr.length - 1);
}