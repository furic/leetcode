# Two-Pointer Non-Decreasing Valid Pair | 8 Lines | O(n) | 1ms

# Intuition
Both arrays are non-increasing. As `right` (the `j` pointer into `nums2`) advances, the valid `left` (the `i` pointer into `nums1`) can only move forward — never back. This two-pointer sweep finds the maximum `j - i` in one pass.

# Approach
- Start `left = 0`, scan `right` from `0` to `nums2.length - 1`.
- For each `right`, advance `left` while `nums1[left] > nums2[right]` — the pair `(left, right)` is invalid because `nums1[left]` is too large.
- If `left` reaches `nums1.length`, no more valid pairs exist — break early.
- Otherwise, `(left, right)` is a valid pair (since `nums1[left] <= nums2[right]` and `left <= right` by construction). Update `maxDist = max(maxDist, right - left)`.
- **Why `left` never needs to go back:** Both arrays are non-increasing. If `nums1[left] <= nums2[right]`, then for any `right' > right`, `nums2[right'] <= nums2[right]`, so `left` must stay or advance — it never becomes valid at an earlier position again.

# Complexity
- Time complexity: $$O(n)$$ — `left` and `right` each advance at most `n` times total.

- Space complexity: $$O(1)$$ — two pointer variables.

# Code
```typescript []
const maxDistance = (nums1: number[], nums2: number[]): number => {
    let left = 0;
    let maxDist = 0;

    for (let right = 0; right < nums2.length; right++) {
        while (left < nums1.length && nums1[left] > nums2[right]) left++;
        if (left === nums1.length) break;
        maxDist = Math.max(maxDist, right - left);
    }

    return maxDist;
};
```