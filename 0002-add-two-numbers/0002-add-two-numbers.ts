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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let dummyHead = new ListNode();
    let current = dummyHead;
    let carry = 0;
    while (l1 || l2) {
        const sum = carry + (l1?.val ?? 0) + (l2?.val ?? 0);
        current.next = new ListNode(sum % 10);
        carry = Math.floor(sum / 10);
        current = current.next;
        l1 = l1?.next;
        l2 = l2?.next;
    }
    if (carry) {
        current.next = new ListNode(carry);
    }
    return dummyHead.next;
};