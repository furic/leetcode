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

const modifiedList = (nums: number[], head: ListNode | null): ListNode | null => {
    // Use Set for O(1) lookup of values to remove
    const valuesToRemove = new Set(nums);

    // Dummy node simplifies handling edge cases (e.g., removing head)
    const dummyHead = new ListNode(0, head);
    let currentNode: ListNode | null = dummyHead;

    // Traverse the list and remove nodes with values in the set
    while (currentNode.next !== null) {
        if (valuesToRemove.has(currentNode.next.val)) {
            // Skip the next node (remove it from the list)
            currentNode.next = currentNode.next.next;
        } else {
            // Move to the next node
            currentNode = currentNode.next;
        }
    }

    // Return the new head (skipping the dummy node)
    return dummyHead.next;
};