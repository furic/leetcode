# Two Pointers + Precompute Pow2 | 33 Lines | O(n log n) | 97ms

# Intuition
We need to count non-empty subsequences where **min + max <= target** efficiently. Sorting allows us to control min and max systematically, and using **two pointers** with **precomputed powers of 2** helps count valid subsequences directly.

# Approach
- Sort `nums` to allow controlled two-pointer expansion.
- Precompute `pow2[i]` as $$2^i \mod 10^9+7$$ since each middle element between `left` and `right` can either be included or not in subsequences.
- Use:
  - `left` to fix the **minimum**,
  - `right` to find the maximum such that `nums[left] + nums[right] <= target`.
- For each valid pair, add `pow2[right - left]` to the count, as this counts all combinations between them.
- If the pair is invalid, decrement `right` to reduce `max`.
- Return the total count modulo $$10^9+7$$.

# Complexity
- Time complexity: $$O(n \log n)$$ (due to sorting, with two-pointer traversal linear)
- Space complexity: $$O(n)$$ (for `pow2` array)

# Code
```typescript []
const numSubseq = (nums: number[], target: number): number => {
    const MOD = 1e9 + 7;
    const n = nums.length;
    const pow2: number[] = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        pow2[i] = (pow2[i - 1] * 2) % MOD;
    }

    nums.sort((a, b) => a - b);

    let left = 0, right = n - 1;
    let totalSubsequences = 0;

    while (left <= right) {
        if (nums[left] + nums[right] <= target) {
            totalSubsequences = (totalSubsequences + pow2[right - left]) % MOD;
            left++;
        } else {
            right--;
        }
    }

    return totalSubsequences;
};
```