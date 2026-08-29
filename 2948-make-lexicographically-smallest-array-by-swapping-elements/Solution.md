# Sort Group Assign Lex-Smallest | 14 Lines | O(n log n) | 0ms

# Intuition
Elements that can reach each other through a chain of swaps (where each adjacent pair in sorted order differs by ≤ limit) form a "swappable group." Within each group, any permutation of values across those original indices is achievable. To minimize lexicographically, assign the sorted values to the original positions in ascending index order.

# Approach
- Sort `nums` by value while retaining original indices.
- Scan the sorted array to identify groups: consecutive sorted elements where adjacent differences are ≤ `limit`. When a gap > `limit` is found, the current group ends.
- For each group:
  - Collect the original indices of its elements and sort them ascending.
  - Assign the group's sorted values to those indices in order (smallest value → smallest index).
- Return the result array.

# Complexity
- Time complexity: $$O(n \log n)$$ — sorting the full array, plus sorting each group's indices (total across all groups is also $$O(n \log n)$$).

- Space complexity: $$O(n)$$ — sorted pairs array and result array.

# Code
```typescript []
const lexicographicallySmallestArray = (nums: number[], limit: number): number[] => {
    const n = nums.length;

    const sorted = nums.map((val, idx) => ({ val, idx }))
                       .sort((a, b) => a.val - b.val);

    const result = new Array(n);
    let i = 0;

    while (i < n) {
        let j = i + 1;
        while (j < n && sorted[j].val - sorted[j - 1].val <= limit) j++;

        const groupIndices = sorted.slice(i, j).map(p => p.idx).sort((a, b) => a - b);
        for (let k = 0; k < groupIndices.length; k++)
            result[groupIndices[k]] = sorted[i + k].val;

        i = j;
    }

    return result;
};
```