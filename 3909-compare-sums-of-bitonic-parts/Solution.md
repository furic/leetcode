# Peak Split Sum Comparison | 7 Lines | O(n) | 9ms

# Intuition
Find the peak, sum both halves (peak included in both), and compare.

# Approach
- Find `peakIndex` via `indexOf(max)`.
- Ascending sum: `nums[0..peakIndex]` inclusive.
- Descending sum: `nums[peakIndex..n-1]` inclusive.
- Return `0`, `1`, or `-1` based on comparison.

# Complexity
- Time complexity: $$O(n)$$ — one pass to find max, two slice-and-sum passes.

- Space complexity: $$O(n)$$ — for the two slices; reducible to $$O(1)$$ with explicit loops.

# Code
```typescript []
const compareBitonicSums = (nums: number[]): number => {
    const peakIndex = nums.indexOf(Math.max(...nums));

    const ascendingSum  = nums.slice(0, peakIndex + 1).reduce((s, v) => s + v, 0);
    const descendingSum = nums.slice(peakIndex).reduce((s, v) => s + v, 0);

    if (ascendingSum > descendingSum) return 0;
    if (descendingSum > ascendingSum) return 1;
    return -1;
};
```