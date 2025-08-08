# Bitwise Linked List | 11 Lines | O(n) | 0ms

# Intuition

Since the linked list represents a **binary number with the most significant bit at the head**, we can **traverse the list while continuously shifting the result left and adding the current bit** to build the decimal value efficiently.

---

# Approach

1. Initialize `ans = 0`.
2. Traverse the linked list:
   - For each node:
     - Multiply `ans` by 2 (equivalent to left-shift in base-2).
     - Add the current node’s `val`.
3. Return `ans` as the decimal value after traversing the list.

---

# Complexity

- Time complexity:  
  $$O(n)$$  
  where \( n \) is the number of nodes in the linked list (each node is visited once).

- Space complexity:  
  $$O(1)$$  
  only constant space is used for variables.

---

# Code

```typescript
const getDecimalValue = (head: ListNode | null): number => {
    let ans = 0;
    while (head !== null) {
        ans = ans * 2 + head.val;
        head = head.next;
    }
    return ans;
};
```