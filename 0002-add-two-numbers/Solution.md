# Linked List Addition with Carry | 12 Lines | O(max(m,n)) | 2ms

# Intuition
Since digits are stored in reverse order, the heads are the least significant digits — we can add node by node left to right, exactly like manual addition, propagating a carry as we go.

# Approach
- Use a dummy head node to simplify result list construction — `dummyHead.next` will be the actual result head.
- While either list has nodes remaining:
  - Sum the current digits (using `0` for exhausted lists via `?.val ?? 0`) plus `carry`.
  - Append a new node with `sum % 10` and update `carry = floor(sum / 10)`.
  - Advance both pointers.
- After the loop, if `carry` is still `1` (from a final overflow, e.g. `9 + 9 = 18`), append one more node.
- Return `dummyHead.next`.

# Complexity
- Time complexity: $$O(\max(m, n))$$ — one pass through both lists.

- Space complexity: $$O(\max(m, n))$$ — the result list length is at most `max(m, n) + 1`.

# Code
```typescript []
const addTwoNumbers = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
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
```