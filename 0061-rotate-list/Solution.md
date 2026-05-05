# Cycle and Cut Rotation | 12 Lines | O(n) | 0ms

# Intuition
Rotating right by `k` moves the last `k % length` nodes to the front. We can find the new tail (the node just before the new head), close the list into a cycle, then cut it at the right point.

# Approach
- Traverse the list to find the tail and compute `length`.
- Reduce `k` to `effectiveK = k % length` — if `0`, return early.
- Walk `length - effectiveK - 1` steps from head to find `newTail`.
- `newHead = newTail.next`.
- Close the ring: `tail.next = head`. Cut: `newTail.next = null`.
- Return `newHead`.

# Complexity
- Time complexity: $$O(n)$$ — two passes (one to find length/tail, one to find new tail).

- Space complexity: $$O(1)$$ — pointer manipulation only.

# Code
```typescript []
const rotateRight = (head: ListNode | null, k: number): ListNode | null => {
    if (!head || !head.next) return head;

    let tail = head;
    let length = 1;
    while (tail.next) {
        tail = tail.next;
        length++;
    }

    const effectiveK = k % length;
    if (effectiveK === 0) return head;

    let newTail = head;
    for (let i = 0; i < length - effectiveK - 1; i++)
        newTail = newTail.next!;

    const newHead = newTail.next!;
    tail.next = head;
    newTail.next = null;

    return newHead;
};
```