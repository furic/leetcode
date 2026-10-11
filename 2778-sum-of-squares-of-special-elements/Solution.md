# Divisor Index Square Sum | 6 Lines | O(n) | 0ms

# Intuition
An element is special when its 1-indexed position `i` divides `n`. Check each index for divisibility and add the square of the matching element.

# Approach
- Loop `i` from `1` to `n` (1-indexed positions).
- If `n % i === 0`, add `nums[i - 1] ** 2` to the running sum (the `- 1` converts to 0-indexed access).
- Return the sum.

# Complexity
- Time complexity: $$O(n)$$ — one pass over all indices.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const sumOfSquares = (nums: number[]): number => {
    const n = nums.length;
    let sum = 0;
    for (let i = 1; i <= n; i++)
        if (n % i === 0) sum += nums[i - 1] ** 2;
    return sum;
};
```