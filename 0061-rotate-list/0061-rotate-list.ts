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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next) 
        return head;
    let n = 1;
    let last = head;
    while (last.next) {
        n++;
        last = last.next;
    }
    k %= n;

    if (k === 0) 
        return head;
    let curr = head;
    let count = 1;
    while (count < n - k) {
        curr = curr.next!;
        count++;
    }

    let newHead = curr.next;
    curr.next = null;
    last.next = head;
    return newHead;
};