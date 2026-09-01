# Single-Pass Critical Point Distance | 18 Lines | O(n) | 3ms

# Intuition
The maximum distance is always between the first and last critical points. The minimum distance is between some adjacent pair of critical points — so we track adjacent gaps as we scan.

# Approach
- Walk the list with `prev`, `curr`, `next` pointers and a position counter.
- At each node, check if it's a local max or min.
- On the first critical point, record `firstCritical`.
- On subsequent critical points, update `minDist` with `pos - prevCritical`, and update `lastCritical`.
- After the loop, if fewer than two critical points exist (`firstCritical === lastCritical`), return `[-1, -1]`.
- Otherwise return `[minDist, lastCritical - firstCritical]`.

# Complexity
- Time complexity: $$O(n)$$ — single pass through the list.

- Space complexity: $$O(1)$$ — only scalar variables.

# Code
```typescript []
const nodesBetweenCriticalPoints = (head: ListNode | null): number[] => {
    if (!head?.next?.next) return [-1, -1];

    let firstCritical = -1, lastCritical = -1, prevCritical = -1;
    let minDist = Infinity;

    let prev = head, curr = head.next, pos = 1;

    while (curr.next) {
        const isCritical = (curr.val > prev.val && curr.val > curr.next.val) ||
                           (curr.val < prev.val && curr.val < curr.next.val);

        if (isCritical) {
            if (firstCritical === -1) firstCritical = pos;
            else minDist = Math.min(minDist, pos - prevCritical);
            lastCritical = prevCritical = pos;
        }

        prev = curr;
        curr = curr.next;
        pos++;
    }

    if (firstCritical === lastCritical) return [-1, -1];
    return [minDist, lastCritical - firstCritical];
};
```