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

    let result: ListNode | null = null
    let current: ListNode | null = null

    let p1: ListNode | null = l1
    let p2: ListNode | null = l2

    let buffer: number = 0

    while(p1 !== null || p2 !== null || buffer !== 0) {
        const val1: number = p1 === null ? 0 : p1.val
        const val2: number = p2 === null ? 0 : p2.val

        let sum: number = val1 + val2 + buffer
        if(sum > 9) {
            buffer = 1
            sum = sum - 10
        } else {
            buffer = 0
        }
        let newNode: ListNode = new ListNode(sum, null)

        if(result === null) {
            result = newNode
        }

        if(current === null) {
            current = newNode
        } else {
            current.next = newNode
            current = newNode
        }


        p1 = p1?.next ?? null
        p2 = p2?.next ?? null
    }


    return result
}