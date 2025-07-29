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

const getDecimalValue = (head: ListNode | null): number => {
    let ans = 0;
    while (head !== null) {
        ans = ans * 2 + head.val;
        head = head.next;
    }
    return ans;
};