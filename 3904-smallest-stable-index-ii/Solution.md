# Prefix Max + Lazy Suffix Min Scan | 16 Lines | O(n²) worst case | 4ms

# Intuition
The instability score at index `i` is `prefixMax[i] - suffixMin[i]`. As `i` increases, `prefixMax` is non-decreasing and `suffixMin` is non-decreasing — so the score is not monotone, but we can scan for the first `i` where it falls within `k`.

# Approach
- **`findSuffixMinIdx(nums, from)`:** Scans from `from` rightward to find the index of the minimum value in `nums[from..n-1]`.
- **Main loop:** Maintain `prefixMax` incrementally. Track `suffixMinIdx` — the index of the current suffix minimum.
  - When `i > suffixMinIdx`, the current suffix minimum is no longer in `nums[i..n-1]` — recompute by calling `findSuffixMinIdx(nums, i)`.
  - Check if `prefixMax - nums[suffixMinIdx] <= k`. Return `i` on the first match.
- Return `-1` if no stable index is found.
- **Note on complexity:** In the worst case (e.g. a decreasing array), `suffixMinIdx` resets on every step, triggering O(n) scans each time — giving O(n²) total. A O(n) solution would precompute the full suffix minimum array in one pass before the main loop.

# Complexity
- Time complexity: $$O(n^2)$$ worst case — each suffix min recomputation scans up to `n` elements.

- Space complexity: $$O(1)$$ — only scalar variables.

# Code
```typescript []
const findSuffixMinIdx = (nums: number[], from: number): number => {
    let min = nums[from];
    let minIdx = from;
    for (let i = from; i < nums.length; i++) {
        min = Math.min(min, nums[i]);
        if (min === nums[i]) minIdx = i;
    }
    return minIdx;
};

const firstStableIndex = (nums: number[], k: number): number => {
    let prefixMax = -1;
    let suffixMinIdx = findSuffixMinIdx(nums, 0);

    for (let i = 0; i < nums.length; i++) {
        if (i > suffixMinIdx) suffixMinIdx = findSuffixMinIdx(nums, i);
        prefixMax = Math.max(prefixMax, nums[i]);
        if (prefixMax - nums[suffixMinIdx] <= k) return i;
    }

    return -1;
};
```