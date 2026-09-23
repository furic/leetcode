# Complement Sliding Window | 10 Lines | O(n) | 3ms

# Intuition
Removing elements from both ends to total `x` is equivalent to keeping the longest contiguous middle subarray summing to `total - x`. Minimize removals by maximizing this middle window.

# Approach
- `target = total - x`. If negative, impossible; if zero, remove all.
- Slide a window, shrinking from the left when `windowSum > target`.
- Track `maxMidLen`; answer is `nums.length - maxMidLen`.

# Complexity
- Time complexity: $$O(n)$$ — each element enters and exits the window once.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const minOperations = (nums: number[], x: number): number => {
    const total = nums.reduce((a, b) => a + b, 0);
    const target = total - x;

    if (target < 0) return -1;
    if (target === 0) return nums.length;

    let left = 0, maxMidLen = -1, windowSum = 0;

    for (let right = 0; right < nums.length; right++) {
        windowSum += nums[right];
        while (windowSum > target) windowSum -= nums[left++];
        if (windowSum === target) maxMidLen = Math.max(maxMidLen, right - left + 1);
    }

    return maxMidLen >= 0 ? nums.length - maxMidLen : -1;
};
```