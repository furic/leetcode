# Prefix Sum Equal Split Check | 16 Lines | O(m×n) | 10ms

# Intuition
A valid cut splits the grid into two halves with equal sum. Since all elements are positive, the total must be even, and we just need to find a horizontal or vertical cut position where the running sum equals exactly half the total.

# Approach
- Compute `total` sum of all elements. If odd, return `false` immediately — equal split is impossible.
- Set `halfTotal = total / 2`.
- **Horizontal cuts:** Accumulate `rowSum` one row at a time from the top. After adding each row `r` (for `r` from `0` to `rows-2`), check if `rowSum === halfTotal`. A match means the cut between row `r` and `r+1` is valid.
- **Vertical cuts:** Same logic column by column. Accumulate `colSum` left to right and check after each column `c` (for `c` from `0` to `cols-2`).
- Both sections are guaranteed non-empty because we stop before the last row/column.

# Complexity
- Time complexity: $$O(m \times n)$$ — total sum scan plus at most two more passes over all cells.

- Space complexity: $$O(1)$$ — only scalar accumulators.

# Code
```typescript []
const canPartitionGrid = (grid: number[][]): boolean => {
    const rows = grid.length;
    const cols = grid[0].length;

    let total = 0;
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            total += grid[r][c];

    if (total % 2 !== 0) return false;
    const halfTotal = total / 2;

    let rowSum = 0;
    for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols; c++) rowSum += grid[r][c];
        if (rowSum === halfTotal) return true;
    }

    let colSum = 0;
    for (let c = 0; c < cols - 1; c++) {
        for (let r = 0; r < rows; r++) colSum += grid[r][c];
        if (colSum === halfTotal) return true;
    }

    return false;
};
```