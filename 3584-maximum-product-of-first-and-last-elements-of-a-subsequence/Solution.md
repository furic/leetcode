# Sliding Window Range Product | 34 Lines | O(n) | 24ms

# Intuition
We want to find the maximum product of the first and last elements in any subsequence of length `m`. Since subsequences retain order but can skip elements, we can limit our attention to all windows of length `m` and focus only on their first and last elements.

# Approach
- If `m === 1`, the product is the square of a single number. We return the max square.
- For `m > 1`, loop through all valid start indices `i` such that the subsequence has at least `m` elements.
- For each `i`, compute the product between `nums[i]` (first) and both the max and min elements from index `i + m - 1` onward (as either can give a larger product depending on the sign).
- To do this efficiently, precompute:
  - `maxFrom[i]`: max value from `nums[i]` to end.
  - `minFrom[i]`: min value from `nums[i]` to end.
- Track the maximum candidate product.

# Complexity
- Time complexity: $$O(n)$$ — One pass to compute `maxFrom` and `minFrom`, another to evaluate products.
- Space complexity: $$O(n)$$ — For the auxiliary arrays.

# Code
```typescript
const maximumProduct = (nums: number[], m: number): number => {
    if (m === 1) {
        let ans = nums[0] * nums[0];
        for (let i = 1; i < nums.length; i++) {
            let sq = nums[i] * nums[i];
            if (sq > ans) ans = sq;
        }
        return ans;
    }

    const n = nums.length;
    let maxFrom = new Array(n);
    let minFrom = new Array(n);
    maxFrom[n - 1] = nums[n - 1];
    minFrom[n - 1] = nums[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        maxFrom[i] = Math.max(nums[i], maxFrom[i + 1]);
        minFrom[i] = Math.min(nums[i], minFrom[i + 1]);
    }

    let ans = -Infinity;
    for (let i = 0; i <= n - m; i++) {
        let j = i + m - 1;
        let product1 = nums[i] * maxFrom[j];
        let product2 = nums[i] * minFrom[j];
        ans = Math.max(ans, product1, product2);
    }

    return ans;
};
```