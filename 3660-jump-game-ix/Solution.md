# Prefix Max + Suffix Min Backward Propagation | 12 Lines | O(n) | 45ms

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code
```typescript []
const maxValue = (nums: number[]): number[] => {
    const n = nums.length;

    // Forward pass: prefixMax[i] = max of nums[0..i]
    const prefixMax: number[] = [nums[0]];
    for (let i = 1; i < n; i++)
        prefixMax.push(Math.max(prefixMax[i - 1], nums[i]));

    // Backward pass: propagate reachable max from right, tracking suffix minimum index
    let suffixMinIdx = n - 1;
    for (let i = n - 2; i >= 0; i--) {
        if (prefixMax[i] > nums[suffixMinIdx])
            prefixMax[i] = prefixMax[suffixMinIdx];
        if (nums[i] < nums[suffixMinIdx])
            suffixMinIdx = i;
    }

    return prefixMax;
};
```