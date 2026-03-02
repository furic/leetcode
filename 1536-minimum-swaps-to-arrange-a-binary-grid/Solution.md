# Greedy Trailing Zeros Row Swap | 18 Lines | O(n²) | 0ms

# Intuition
For a grid to be valid (all zeros above the main diagonal), row `i` must have at least `n - i - 1` trailing zeros. We can precompute trailing zero counts per row, then greedily assign the closest qualifying row to each position using adjacent swaps.

# Approach
- **Precompute trailing zeros:** For each row, count how many consecutive `0`s appear from the right end. Store in `trailingZeros[]`.
- **Greedy row placement:** For each target row `row` (0 to n-1), it needs at least `requiredZeros = n - row - 1` trailing zeros:
  - Scan forward from `row` to find the nearest `candidate` index where `trailingZeros[candidate] >= requiredZeros`.
  - If no such row exists (`candidate === n`), the grid cannot be made valid — return `-1`.
  - Bubble `candidate` up to position `row` via adjacent swaps (swap `trailingZeros[candidate]` with `trailingZeros[candidate - 1]` repeatedly), incrementing `swaps` each step.
- **Why greedy works:** We always pick the closest qualifying row to minimize swap count. Using a nearer row never blocks future rows — rows with more trailing zeros can always satisfy earlier (less demanding) positions.
- **Why only trailing zeros matter:** The upper-triangle validity condition depends only on where each row's last `1` is, which is fully captured by the trailing zero count.

# Complexity
- Time complexity: $$O(n^2)$$ — for each of the `n` rows, we scan up to `n` candidates and perform up to `n` swaps.

- Space complexity: $$O(n)$$ — for the `trailingZeros` array.

# Code
```typescript []
const minSwaps = (grid: number[][]): number => {
    const n = grid.length;
    const trailingZeros: number[] = [];

    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = n - 1; j >= 0 && grid[i][j] === 0; j--) count++;
        trailingZeros.push(count);
    }

    let swaps = 0;

    for (let row = 0; row < n; row++) {
        const requiredZeros = n - row - 1;

        let candidate = row;
        while (candidate < n && trailingZeros[candidate] < requiredZeros) candidate++;
        if (candidate === n) return -1;

        while (candidate > row) {
            const tmp = trailingZeros[candidate];
            trailingZeros[candidate] = trailingZeros[candidate - 1];
            trailingZeros[candidate - 1] = tmp;
            candidate--;
            swaps++;
        }
    }

    return swaps;
};
```