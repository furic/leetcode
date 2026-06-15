# Count Then Skip to Pre-Middle | 10 Lines | O(n) | 4ms

# Intuition
Find the length first, then walk to the node just before the middle index and unlink the middle node.

# Approach
- Handle the single-node edge case immediately (return `null`).
- Count the list length in one pass.
- The middle index is `length >> 1` (floor division by 2). Walk `(length >> 1) - 1` steps from `head` to reach the predecessor of the middle node.
- Skip the middle: `prev.next = prev.next.next`.
- Return `head`.

# Complexity
- Time complexity: $$O(n)$$ — two passes (count + walk).

- Space complexity: $$O(1)$$ — pointer variables only.

# Code
```typescript []
const deleteMiddle = (head: ListNode | null): ListNode | null => {
    if (!head?.next) return null;

    let length = 0;
    for (let p: ListNode | null = head; p; p = p.next) length++;

    let prev: ListNode | null = head;
    for (let i = (length >> 1) - 1; i > 0; i--) prev = prev!.next;

    prev!.next = prev!.next!.next;
    return head;
};
```