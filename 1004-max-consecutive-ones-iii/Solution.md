# Non-Shrinking Sliding Window | 8 Lines | O(n) | 0ms

# Intuition
We want the longest window containing at most `k` zeros. A key insight: instead of shrinking the window when the constraint is violated, we just slide it forward at a fixed size — the window never shrinks, so it only grows when a better (longer) window is found.

# Approach
- Maintain `left` and `right` pointers with a running `zeroCount`.
- Expand `right` each iteration, counting zeros.
- When `zeroCount > k`, the window is invalid — advance `left` by one (decrementing `zeroCount` if the departing element was `0`). The window size stays the same rather than shrinking.
- **Why no explicit max tracking:** Because the window never shrinks, its size at the end (`nums.length - left`) is the maximum valid window size ever reached. Any time the window grew, it was because a valid extension was found.
- The window can only grow when a step satisfies `zeroCount <= k`, and stays constant otherwise — so the final size equals the longest valid subarray.

# Complexity
- Time complexity: $$O(n)$$ — each pointer advances at most `n` steps total.

- Space complexity: $$O(1)$$ — only two pointers and a counter.

# Code
```typescript []
const longestOnes = (nums: number[], k: number): number => {
    let zeroCount = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeroCount++;

        if (zeroCount > k) {
            if (nums[left] === 0) zeroCount--;
            left++;
        }
    }

    return nums.length - left;
};
```