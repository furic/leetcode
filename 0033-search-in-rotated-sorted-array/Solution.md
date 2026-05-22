# Binary Search Sorted Half Detection | 12 Lines | O(log n) | 0ms

# Intuition
In a rotated sorted array, at least one half around the midpoint is always fully sorted. We can determine which half is sorted by comparing `nums[lo]` to `nums[mid]`, then check if the target falls within that sorted half to decide which side to search.

# Approach
- Standard binary search with an additional step at each iteration:
  - If `nums[lo] <= nums[mid]`: left half is sorted. Check if `target` is in `[nums[lo], nums[mid])`. If yes, search left; otherwise search right.
  - Else: right half is sorted. Check if `target` is in `(nums[mid], nums[hi]]`. If yes, search right; otherwise search left.
- Return `mid` immediately on a match, `-1` if the loop exits without finding the target.

# Complexity
- Time complexity: $$O(\log n)$$ — standard binary search.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const search = (nums: number[], target: number): number => {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] === target) return mid;

        if (nums[lo] <= nums[mid]) {
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else                                          lo = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else                                          hi = mid - 1;
        }
    }

    return -1;
};
```