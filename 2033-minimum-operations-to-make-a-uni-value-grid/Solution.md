# Flatten Sort Median Minimize Ops | 7 Lines | O(mn log mn) | 141ms

# Intuition
All values must be reachable from each other via multiples of `x`, so they must all share the same remainder mod `x`. The optimal target minimizes total `|v - target| / x` — this is the classic "minimize sum of absolute differences" problem, solved by choosing the median.

# Approach
- Flatten the grid and check that all values have the same remainder mod `x`. If not, return `-1`.
- Sort the flattened values and pick the median as the target.
- Sum `|v - median| / x` for all values — since all differences are divisible by `x`, this gives an integer operation count.

# Complexity
- Time complexity: $$O(mn \log mn)$$ — dominated by sorting.

- Space complexity: $$O(mn)$$ — for the flattened array.

# Code
```typescript []
const minOperations = (grid: number[][], x: number): number => {
    const values = grid.flat();
    const targetMod = values[0] % x;

    for (const v of values)
        if (v % x !== targetMod) return -1;

    values.sort((a, b) => a - b);
    const median = values[Math.floor(values.length / 2)];

    let ops = 0;
    for (const v of values) ops += Math.abs(v - median) / x;
    return ops;
};
```