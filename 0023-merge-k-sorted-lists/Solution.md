# Divide and Conquer Merge | 26 Lines | O(n log k) | 2ms

# Intuition
Merging k lists one-by-one is O(nk). Instead, we use divide and conquer — recursively split the list array in half, merge each half, then merge the two results. This mirrors merge sort and brings the complexity down to O(n log k).

# Approach
- **Base cases:** empty array returns `null`; single list returns itself.
- **Divide:** Split `lists` at the midpoint. Recursively call `mergeKLists` on each half. Each recursive call returns a single merged sorted list.
- **Merge two sorted lists:**
  - Pick the smaller head between `left` and `right` to avoid a dummy node — this becomes `head` and we advance the corresponding pointer.
  - Walk both lists with a `current` pointer, always appending the smaller of the two current heads.
  - When one list is exhausted, attach the remainder of the other directly — no need to walk, the tail is already linked.
- **Why no dummy node:** By selecting the smaller head explicitly upfront, we avoid null-checks inside the loop and the dummy node pattern, keeping the merge lean.
- Total nodes across all lists is `n`; the recursion has `log k` levels; each level processes all `n` nodes total → O(n log k).

# Complexity
- Time complexity: $$O(n \log k)$$ — `log k` merge levels, each touching all `n` nodes across all lists.

- Space complexity: $$O(\log k)$$ — recursion stack depth; no extra node allocation.

# Code
```typescript []
const mergeKLists = (lists: Array<ListNode | null>): ListNode | null => {
    if (lists.length === 0) return null;
    if (lists.length === 1) return lists[0];

    const mid = Math.ceil(lists.length / 2);
    let left = mergeKLists(lists.slice(0, mid));
    let right = mergeKLists(lists.slice(mid));

    if (!left) return right;
    if (!right) return left;

    let head: ListNode;
    if (left.val > right.val) {
        head = right;
        right = right.next;
    } else {
        head = left;
        left = left.next;
    }

    let current = head;
    while (left && right) {
        if (left.val > right.val) {
            current.next = right;
            right = right.next;
        } else {
            current.next = left;
            left = left.next;
        }
        current = current.next!;
    }

    current.next = left ?? right;

    return head;
};
```