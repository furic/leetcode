# Running Increasing/Decreasing Streak Max | 6 Lines | O(n) | 1ms

# Intuition
A strictly monotonic subarray is a run where every adjacent pair keeps moving in the same direction. Track the length of the current increasing run and the current decreasing run ending at each index, and keep the best seen.

# Approach
- Maintain `increasing` and `decreasing`, the lengths of the strictly increasing and strictly decreasing runs ending at the current index. Both start at `1`.
- For each `i` from `1`:
  - If `nums[i - 1] < nums[i]`, extend `increasing`; otherwise reset it to `1`.
  - If `nums[i - 1] > nums[i]`, extend `decreasing`; otherwise reset it to `1`.
  - Equal neighbours reset both runs, since neither direction is strict.
- Update `maxLen` with the larger of the two after each step and return it.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(1)$$ — three scalar variables.

# Code
```typescript []
const longestMonotonicSubarray = (nums: number[]): number => {
    let maxLen = 1, increasing = 1, decreasing = 1;

    for (let i = 1; i < nums.length; i++) {
        increasing = nums[i - 1] < nums[i] ? increasing + 1 : 1;
        decreasing = nums[i - 1] > nums[i] ? decreasing + 1 : 1;
        maxLen = Math.max(maxLen, increasing, decreasing);
    }

    return maxLen;
};
```