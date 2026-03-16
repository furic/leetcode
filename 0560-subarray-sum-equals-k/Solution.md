# Prefix Sum Hash Map | 8 Lines | O(n) | 12ms

# Intuition
If the prefix sum at index `j` minus the prefix sum at some earlier index `i` equals `k`, then the subarray `[i+1..j]` sums to `k`. Counting how many previous prefix sums equal `prefixSum - k` gives the number of valid subarrays ending at `j`.

# Approach
- Maintain a `Map<prefixSum, count>` initialised with `{0: 1}` — the empty prefix (before any element) has sum `0`, and this seeds subarrays starting from index `0`.
- Iterate through `nums`, accumulating `prefixSum`:
  - Look up `prefixSum - k` in the map — each occurrence represents a prior position where a subarray ending here sums to exactly `k`. Add the count to the result.
  - Increment the count for the current `prefixSum` in the map.
- The order matters: look up before inserting, so we don't count the current prefix as a prior one.

# Complexity
- Time complexity: $$O(n)$$ — single pass with O(1) map operations.

- Space complexity: $$O(n)$$ — the map stores at most `n + 1` distinct prefix sums.

# Code
```typescript []
const subarraySum = (nums: number[], k: number): number => {
    const prefixCounts = new Map<number, number>([[0, 1]]);
    let prefixSum = 0;
    let count = 0;

    for (const num of nums) {
        prefixSum += num;
        count += prefixCounts.get(prefixSum - k) ?? 0;
        prefixCounts.set(prefixSum, (prefixCounts.get(prefixSum) ?? 0) + 1);
    }

    return count;
};
```