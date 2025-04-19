/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function spiralMatrix(m: number, n: number, head: ListNode | null): number[][] {
    let result = Array.from({ length: m }, () => Array(n).fill(-1));

    let x = -1, y = 0;
    let dirX = 1, dirY = 0;
    let stepsX = n, stepsY = m - 1;
    let stepsLeft = n;

    while (head) {
        x += dirX;
        y += dirY;
        result[y][x] = head.val;
        head = head.next;

        stepsLeft--;
        if (stepsLeft === 0) {
            if (dirX !== 0) {
                stepsX--;
                stepsLeft = stepsY;
            } else {
                stepsY--;
                stepsLeft = stepsX;
            }
            [dirX, dirY] = [-dirY, dirX];
        }
    }
    return result;
};