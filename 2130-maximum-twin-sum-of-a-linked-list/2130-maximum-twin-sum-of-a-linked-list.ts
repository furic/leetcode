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

function pairSum(head: ListNode | null): number {
    const temp = [];
    let node = head;
    while (node) {
        temp.push(node.val);
        node = node.next;
    }
    const n = temp.length;
    node = head;
    let res = -Infinity;
    for (let i = 0; i < Math.floor(n / 2); i++) {
        res = Math.max(res, node.val + temp.pop());
        node = node.next;
    }
    return res;
};