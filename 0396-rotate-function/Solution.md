# Rotation Recurrence Max Scan | 8 Lines | O(n) | 3ms

# Intuition
Each rotation shifts all elements one position right, adding 1 to every index — except the element that wraps from the end to position 0. This gives the recurrence `F(k) = F(k-1) + totalSum - n * nums[n-k]`, enabling O(1) computation of each F(k) from the previous.

# Approach
- Compute `F(0)` and `totalSum` in one pass.
- Apply the recurrence `F(k) = F(k-1) + totalSum - n * nums[n-k]` for `k = 1..n-1`.
- Track the running maximum and return it.

# Complexity
- Time complexity: $$O(n)$$ — two linear passes.

- Space complexity: $$O(1)$$ — only scalar variables.

# Code
```typescript []
const maxRotateFunction = (nums: number[]): number => {
    const n = nums.length;
    let totalSum = 0;
    let rotatedF = 0;

    for (let i = 0; i < n; i++) {
        totalSum += nums[i];
        rotatedF += i * nums[i];
    }

    let maxF = rotatedF;

    for (let k = 1; k < n; k++) {
        rotatedF += totalSum - n * nums[n - k];
        maxF = Math.max(maxF, rotatedF);
    }

    return maxF;
};
```