# Group Prefix Sum Absolute Distance | 18 Lines | O(n) | 88ms

# Intuition
For each group of equal-valued indices, computing sum of absolute distances naively is O(k²). With prefix sums, we can compute each element's contribution in O(1): split the group into elements to the left and right of the current index, and use the prefix sum to avoid re-summing.

# Approach
- Group all indices by their value in a `Map<number, number[]>`. Each group's indices are naturally sorted in ascending order.
- For each group of size `k`, maintain a running `prefixSum` of indices processed so far and the `totalIdx` (sum of all indices in the group):
  - At position `i` within the group (0-indexed), there are `i` indices to the left and `k - 1 - i` to the right.
  - Left contribution: `idx * i - prefixSum` (current index times count of left elements, minus their actual sum).
  - Right contribution: `(totalIdx - prefixSum - idx) - idx * (k - 1 - i)` (sum of right elements minus current index times count of right elements).
  - Combined: `totalIdx - prefixSum * 2 + idx * (2 * i - k)`.
  - Update `prefixSum += idx` after computing.

# Complexity
- Time complexity: $$O(n)$$ — one pass to group, one pass per group element (total across all groups = `n`).

- Space complexity: $$O(n)$$ — for the groups map and result array.

# Code
```typescript []
const distance = (nums: number[]): number[] => {
    const n = nums.length;
    const groups = new Map<number, number[]>();

    for (let i = 0; i < n; i++) {
        if (!groups.has(nums[i])) groups.set(nums[i], []);
        groups.get(nums[i])!.push(i);
    }

    const result = new Array(n).fill(0);

    for (const group of groups.values()) {
        const groupSize = group.length;
        let totalIdx = group.reduce((sum, idx) => sum + idx, 0);
        let prefixSum = 0;

        for (let i = 0; i < groupSize; i++) {
            const idx = group[i];
            result[idx] = totalIdx - prefixSum * 2 + idx * (2 * i - groupSize);
            prefixSum += idx;
        }
    }

    return result;
};
```