# Prefix-Suffix Product Two-Pass | 11 Lines | O(n) | 2ms

# Intuition
The product of all elements except `nums[i]` equals the product of everything to its left multiplied by the product of everything to its right. We can compute both in two linear passes without division.

# Approach
- **First pass (left to right):** Fill `result[i]` with the running prefix product of all elements before index `i`. Start with `prefix = 1`; at each step store the current prefix into `result[i]`, then multiply `prefix` by `nums[i]`.
- **Second pass (right to left):** Multiply each `result[i]` by the running suffix product of all elements after index `i`. Start with `suffix = 1`; at each step multiply `result[i]` by the current suffix, then multiply `suffix` by `nums[i]`.
- After both passes, `result[i]` = (product of all elements left of i) × (product of all elements right of i) = product of everything except `nums[i]`.
- No division used, no extra array — `result` itself doubles as the prefix-product array in the first pass, then gets the suffix multiplied in-place.

# Complexity
- Time complexity: $$O(n)$$ — two linear passes.

- Space complexity: $$O(1)$$ extra space — the output array is not counted per convention; only two scalar variables (`prefix`, `suffix`) are used.

# Code
```typescript []
const productExceptSelf = (nums: number[]): number[] => {
    const result = new Array(nums.length).fill(1);

    let prefix = 1;
    for (let i = 0; i < nums.length; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
};
```