# Sequential Prefix Sum + Set Probe | 8 Lines | O(n) | 0ms

# Intuition
Find the longest sequential prefix, sum it, then linearly probe upward until we find a value not in `nums`.

# Approach
- Build a `Set` of all values for O(1) lookup.
- Accumulate `sum` starting at `nums[0]`, extending the prefix as long as each next element is exactly one more than the previous.
- Starting from `sum`, increment while `seen.has(sum)` — the first missing value is the answer.

# Complexity
- Time complexity: $$O(n)$$ — one pass to build the set and prefix sum; the probe loop is bounded by the values in `nums` (at most 50 steps).

- Space complexity: $$O(n)$$ — the set.

# Code
```typescript []
const missingInteger = (nums: number[]): number => {
    const seen = new Set(nums);
    let sum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1] + 1) break;
        sum += nums[i];
    }

    while (seen.has(sum)) sum++;
    return sum;
};
```