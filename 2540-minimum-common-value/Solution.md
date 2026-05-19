# Two-Pointer Sorted Common Element | 7 Lines | O(n+m) | 1ms

# Intuition
Both arrays are sorted. Two pointers advancing in tandem find the first common element in linear time — advance the pointer at the smaller value until they meet or one is exhausted.

# Approach
- Start `p1 = 0`, `p2 = 0`.
- If `nums1[p1] === nums2[p2]`, return the value immediately (smallest common element, since both arrays are sorted).
- Advance whichever pointer is smaller.
- Return `-1` if either pointer reaches the end without a match.

# Complexity
- Time complexity: $$O(n + m)$$ — each pointer advances at most `n` or `m` steps.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const getCommon = (nums1: number[], nums2: number[]): number => {
    let p1 = 0, p2 = 0;

    while (p1 < nums1.length && p2 < nums2.length) {
        if      (nums1[p1] === nums2[p2]) return nums1[p1];
        else if (nums1[p1] <   nums2[p2]) p1++;
        else                              p2++;
    }

    return -1;
};
```