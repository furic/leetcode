# Space-Optimised Linear DP | 7 Lines | O(n) | 0ms

# Intuition
At each house, we either rob it (and add the best total from two houses back) or skip it (and carry forward the best total from the previous house). Only the last two states ever matter, so we can drop the full DP array.

# Approach
- Maintain two variables instead of a full DP array:
  - `robPrev` — best total achievable up to and including the previous house.
  - `skipPrev` — best total achievable up to the house before that (i.e., what `robPrev` was one step ago).
- For each house with value `num`:
  - `best = max(robPrev, num + skipPrev)` — either skip this house (take `robPrev`) or rob it (add `num` to the best total from two steps back).
  - Slide the window: `skipPrev = robPrev`, `robPrev = best`.
- Return `robPrev` after processing all houses.
- **Why this works:** The recurrence `dp[i] = max(dp[i-1], nums[i] + dp[i-2])` only ever references the two most recent states, so rolling variables are sufficient.

# Complexity
- Time complexity: $$O(n)$$ — single pass through `nums`.

- Space complexity: $$O(1)$$ — two scalar variables, no array.

# Code
```typescript []
const rob = (nums: number[]): number => {
    let skipPrev = 0, robPrev = 0;

    for (const num of nums) {
        const best = Math.max(robPrev, num + skipPrev);
        skipPrev = robPrev;
        robPrev = best;
    }

    return robPrev;
};
```