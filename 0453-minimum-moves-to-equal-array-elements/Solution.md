# Relative Decrement to Minimum | 6 Lines | O(n) | 1ms

# Intuition
Incrementing `n - 1` elements by 1 changes the gaps between elements exactly as decrementing the one left out would. Only the differences between elements matter for making them equal, so the problem becomes: how many single decrements bring every element down to the minimum?

# Approach
- Reframe each move as "decrement one element by 1" (relative to the others).
- The cheapest target is the minimum value, since all elements must come down to meet the smallest one and can never go below it without extra work.
- Sum `num - minVal` over all elements to get the total number of decrements.

# Complexity
- Time complexity: $$O(n)$$ — one pass to find the minimum, one pass to sum the differences.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const minMoves = (nums: number[]): number => {
    const minVal = Math.min(...nums);

    let moves = 0;
    for (const num of nums) moves += num - minVal;

    return moves;
};
```