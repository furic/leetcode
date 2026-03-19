# Binary Search Partition Shorter Array | 18 Lines | O(log min(m,n)) | 1ms

# Intuition
The median splits the merged array into two equal halves. Instead of merging, we binary search for the correct partition of the shorter array such that every element on the left side is ≤ every element on the right side — across both arrays simultaneously.

# Approach
- Ensure `nums1` is the shorter array (swap if needed) to binary search on the smaller range.
- `halfLen = (m + n + 1) / 2` — the number of elements in the left half of the merged array.
- Binary search `cut1` (partition index in `nums1`) from `0` to `m`:
  - `cut2 = halfLen - cut1` — the corresponding partition index in `nums2`.
  - Define boundary values with sentinels: `left1, right1` from `nums1`; `left2, right2` from `nums2`. Use `-Infinity`/`+Infinity` for out-of-bounds indices.
  - **Valid partition** when `left1 ≤ right2` and `left2 ≤ right1` — the left halves of both arrays contain only values ≤ the right halves.
    - Odd total length: median = `max(left1, left2)` (the maximum of the left half).
    - Even total length: median = `(max(left1, left2) + min(right1, right2)) / 2`.
  - If `left1 > right2`: `cut1` is too large — move `hi = cut1 - 1`.
  - If `left2 > right1`: `cut1` is too small — move `lo = cut1 + 1`.
- The `(m + n) & 1` parity check cleanly distinguishes odd/even total length.

# Complexity
- Time complexity: $$O(\log \min(m, n))$$ — binary search on the shorter array only.

- Space complexity: $$O(1)$$ — no extra storage beyond scalar variables.

# Code
```typescript []
const findMedianSortedArrays = (nums1: number[], nums2: number[]): number => {
    if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];

    const m = nums1.length;
    const n = nums2.length;
    const halfLen = (m + n + 1) >> 1;

    let lo = 0;
    let hi = m;

    while (lo <= hi) {
        const cut1 = (lo + hi) >> 1;
        const cut2 = halfLen - cut1;

        const left1  = cut1 > 0 ? nums1[cut1 - 1] : -Infinity;
        const right1 = cut1 < m ? nums1[cut1]      :  Infinity;
        const left2  = cut2 > 0 ? nums2[cut2 - 1]  : -Infinity;
        const right2 = cut2 < n ? nums2[cut2]       :  Infinity;

        if (left1 <= right2 && left2 <= right1) {
            const maxLeft  = Math.max(left1, left2);
            const minRight = Math.min(right1, right2);
            return (m + n) & 1 ? maxLeft : (maxLeft + minRight) / 2;
        }

        if (left1 > right2) hi = cut1 - 1;
        else                lo = cut1 + 1;
    }

    return 0;
};
```