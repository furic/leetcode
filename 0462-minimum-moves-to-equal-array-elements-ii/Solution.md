# Sort Then Median Distance Sum | 7 Lines | O(n log n) | 6ms

# Intuition
Making every element equal to some value `t` costs the sum of `|num - t|` over all elements. That sum is minimized when `t` is the median, because moving `t` away from the median increases the distance to more elements than it decreases.

# Approach
- Sort `nums` ascending.
- Take the median `nums[n >> 1]`. For even `n`, either middle element works, since any value between the two middle elements gives the same total.
- Sum `|num - median|` over all elements to get the minimum number of moves.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by the sort.

- Space complexity: $$O(\log n)$$ — sort stack.

# Code
```typescript []
const minMoves2 = (nums: number[]): number => {
    nums.sort((a, b) => a - b);

    const median = nums[nums.length >> 1];

    let moves = 0;
    for (const num of nums) moves += Math.abs(num - median);

    return moves;
};
```