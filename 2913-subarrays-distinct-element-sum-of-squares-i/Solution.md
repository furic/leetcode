# Brute Force Distinct Set Expansion | 11 Lines | O(n²) | 7ms

# Intuition
With `n ≤ 100`, there are at most ~5,000 subarrays, so we can enumerate them all. For each start index, extend the end one element at a time while maintaining a set of distinct values, and add the square of the set size at each step.

# Approach
- For each `start`, create an empty `Set`.
- Extend `end` from `start` to `n - 1`: add `nums[end]` to the set, which gives the distinct count of `nums[start..end]` as `seen.size`.
- Add `seen.size * seen.size` to `total`.
- Return `total`.

# Complexity
- Time complexity: $$O(n^2)$$ — each of the $$O(n^2)$$ subarrays is processed in O(1) amortised time via the incrementally built set.

- Space complexity: $$O(n)$$ — the set holds at most `n` distinct values.

# Code
```typescript []
const sumCounts = (nums: number[]): number => {
    const n = nums.length;
    let total = 0;

    for (let start = 0; start < n; start++) {
        const seen = new Set<number>();
        for (let end = start; end < n; end++) {
            seen.add(nums[end]);
            total += seen.size * seen.size;
        }
    }

    return total;
};
```