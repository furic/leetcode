# Bidirectional Prefix Product Scan | 14 Lines | O(n) | 2ms

# Intuition
The maximum subarray product either starts from the left or ends at the right. A single left-to-right prefix product pass finds all subarrays starting at index 0 up to any point; reversing and doing the same finds all subarrays ending at the last index. Together they cover every possible maximum subarray.

# Approach
- **Forward pass:** Accumulate a running `product` left to right. After each multiply, update `best`. If `product` hits `0` (a zero element terminates any subarray), reset `product = 1` to start fresh from the next element.
- **Backward pass:** Do the same right to left. This handles cases where a leading negative number needs to be "cut off" — which looks like a trailing element from the reversed direction.
- **Why two passes suffice:** For any subarray `[i..j]`, its product is the forward prefix product up to `j` divided by the prefix product up to `i-1`. Equivalently, the backward pass from `j` accumulates the same range without division. The maximum will be captured by one of the two sweeps.
- **Zero handling:** Zeros split the array into independent segments. Resetting `product = 1` after a zero is equivalent to starting a new segment — correct for both passes.
- **Negative number handling:** An odd number of negatives makes a prefix product negative. The reverse pass sees the same negatives in opposite order, so one of the two passes will have an even count of negatives for the optimal subarray.

# Complexity
- Time complexity: $$O(n)$$ — two linear passes.

- Space complexity: $$O(1)$$ — only scalar variables.

# Code
```typescript []
const maxProduct = (nums: number[]): number => {
    let best = Number.MIN_SAFE_INTEGER;
    let product = 1;

    for (const num of nums) {
        product *= num;
        best = Math.max(best, product);
        if (product === 0) product = 1;
    }

    product = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        product *= nums[i];
        best = Math.max(best, product);
        if (product === 0) product = 1;
    }

    return best;
};
```