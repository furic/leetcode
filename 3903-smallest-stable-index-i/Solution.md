# Prefix Max + Suffix Min Precompute | 10 Lines | O(n) | 0ms

# Intuition
Precomputing prefix maximums and suffix minimums in two passes gives us O(1) instability score lookup at every index, enabling a clean linear scan for the first stable index.

# Approach
- **Pass 1 (left to right):** Build `prefixMax[i] = max(nums[0..i])` incrementally.
- **Pass 2 (right to left):** Build `suffixMin[i] = min(nums[i..n-1])` incrementally.
- **Pass 3:** Scan left to right; return the first `i` where `prefixMax[i] - suffixMin[i] <= k`.
- Return `-1` if no such index exists.

# Complexity
- Time complexity: $$O(n)$$ — three linear passes.

- Space complexity: $$O(n)$$ — two auxiliary arrays of length `n`.

# Code
```typescript []
const firstStableIndex = (nums: number[], k: number): number => {
    const n = nums.length;

    const prefixMax = new Array<number>(n);
    prefixMax[0] = nums[0];
    for (let i = 1; i < n; i++) prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);

    const suffixMin = new Array<number>(n);
    suffixMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);

    for (let i = 0; i < n; i++) {
        if (prefixMax[i] - suffixMin[i] <= k) return i;
    }

    return -1;
};
```