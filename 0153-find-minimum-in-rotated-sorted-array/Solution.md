# Binary Search Rotation Pivot | 7 Lines | O(log n) | 0ms

# Intuition
The minimum element is the rotation pivot — the only point where the array "drops." Binary search finds it by comparing the midpoint to the right boundary: if `nums[mid] > nums[hi]`, the pivot is in the right half; otherwise it's in the left half (including `mid`).

# Approach
- Maintain `lo` and `hi` as the search boundaries.
- At each step, compute `mid = (lo + hi) >> 1`:
  - If `nums[mid] > nums[hi]`: the right half is not sorted — the minimum is somewhere in `(mid, hi]`, so `lo = mid + 1`.
  - Otherwise: the right half is sorted — the minimum is in `[lo, mid]`, so `hi = mid`.
- When `lo === hi`, we've found the minimum.

# Complexity
- Time complexity: $$O(\log n)$$ — halves the search space each iteration.

- Space complexity: $$O(1)$$ — two pointer variables.

# Code
```typescript []
const findMin = (nums: number[]): number => {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] > nums[hi]) lo = mid + 1;
        else                      hi = mid;
    }

    return nums[lo];
};
```