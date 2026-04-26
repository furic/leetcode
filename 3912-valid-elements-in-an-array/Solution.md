# Prefix and Suffix Max Filter | 12 Lines | O(n) | 1ms

# Intuition
An element is valid if it's a prefix maximum (greater than all to its left) or a suffix maximum (greater than all to its right). Precomputing both in two passes lets us check each element in O(1).

# Approach
- `prefixMax[i]` = maximum of `nums[0..i-1]` (all elements strictly to the left of `i`). Set `prefixMax[0] = -Infinity` so the first element always passes the left check.
- `suffixMax[i]` = maximum of `nums[i+1..n-1]` (all elements strictly to the right of `i`). Set `suffixMax[n-1] = -Infinity` so the last element always passes the right check.
- Filter `nums` to elements where `nums[i] > prefixMax[i]` or `nums[i] > suffixMax[i]`.

# Complexity
- Time complexity: $$O(n)$$ — two passes to build prefix/suffix arrays, one filter pass.

- Space complexity: $$O(n)$$ — two auxiliary arrays.

# Code
```typescript []
const findValidElements = (nums: number[]): number[] => {
    const n = nums.length;

    const prefixMax = new Array<number>(n);
    prefixMax[0] = -Infinity;
    for (let i = 1; i < n; i++) prefixMax[i] = Math.max(prefixMax[i - 1], nums[i - 1]);

    const suffixMax = new Array<number>(n);
    suffixMax[n - 1] = -Infinity;
    for (let i = n - 2; i >= 0; i--) suffixMax[i] = Math.max(suffixMax[i + 1], nums[i + 1]);

    return nums.filter((v, i) => v > prefixMax[i] || v > suffixMax[i]);
};
```