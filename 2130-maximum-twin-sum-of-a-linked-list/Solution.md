#  01:31 Slow-Fast Split + Reverse Half + Twin Scan | 16 Lines | O(n) | 4ms

# Intuition
Twin pairs are symmetric around the midpoint. Find the midpoint with slow/fast pointers, reverse the second half in-place, then walk both halves simultaneously to compute twin sums.

# Approach
- **Find midpoint:** Slow pointer moves one step, fast moves two. When fast reaches the end, slow is at the start of the second half.
- **Reverse second half:** Standard in-place linked list reversal from `slow` to the end.
- **Scan twin pairs:** Walk `left` from `head` and `right` from the reversed head simultaneously, computing `left.val + right.val` at each step and tracking the maximum.

# Complexity
- Time complexity: $$O(n)$$ — three linear passes (find mid, reverse, scan).

- Space complexity: $$O(1)$$ — in-place reversal, no extra storage.

# Code
```typescript []
const pairSum = (head: ListNode | null): number => {
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    let prev: ListNode | null = null;
    let curr: ListNode | null = slow;
    while (curr !== null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    let maxSum = 0;
    let left: ListNode | null = head;
    let right: ListNode | null = prev;
    while (right !== null) {
        maxSum = Math.max(maxSum, left!.val + right.val);
        left = left!.next;
        right = right.next;
    }

    return maxSum;
};
```