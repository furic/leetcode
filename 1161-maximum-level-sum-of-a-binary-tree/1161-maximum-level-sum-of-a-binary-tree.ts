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

function maxLevelSum(root: TreeNode | null): number {
    let max: number = Number.MIN_SAFE_INTEGER;
    let maxLevel: number = 1;
    let queue: TreeNode[] = [root];
    let index: number = 0;
    let level: number = 0;
    while ( index < queue.length ) {
        const size: number = queue.length - index;
        let levelsum: number = 0;
        level++;
        for ( let i = 0; i < size; i++ ) {
            const curr = queue[index++];
            levelsum += curr.val;
            if ( curr.left ) {
                queue.push(curr.left);
            }
            if ( curr.right ) {
                queue.push(curr.right);
            }
        }
        if ( levelsum > max ) {
            max = levelsum;
            maxLevel = level;
        }
    }
    return maxLevel;
};