# Prefix Imbalance + Connectivity-Aware Discard | 38 Lines | O(m×n) | 483ms

# Intuition
After a cut, the imbalance between the two sections is `prefixSum × 2 - total`. We can eliminate the imbalance by discounting one cell whose value equals the imbalance — but only if removing that cell keeps its section connected. By rotating the grid 4 times, we reduce vertical and horizontal cuts, and "which section to discount from", all to the same horizontal-prefix logic.

# Approach
- Compute `total` once. Rotate the grid 4 times, each time checking all possible horizontal cuts on the current orientation (covering horizontal and vertical cuts in both directions).
- For each cut after row `r` (prefix = rows `0..r`):
  - Compute `imbalance = prefixSum × 2 - total`. If `0`, sections are already equal — return `true`.
  - Otherwise, we need to discount a cell of value `imbalance` from either section, and the remaining section must stay connected. By checking whether the **prefix** contains a discountable cell of value `imbalance`, and relying on rotation to handle the suffix case, we only ever check the prefix side.
  - **Connectivity rules** (when can we remove a cell without disconnecting the section?):
    - **`cols === 1` (single column):** Only the top (`grid[0][0]`) or bottom (`grid[r][0]`) cell of the prefix can be removed without splitting it.
    - **`cols >= 2`, `r === 0` (single row prefix):** Only the two corner cells (`grid[0][0]` and `grid[0][cols-1]`) can be removed — any interior cell would split the single row into two disconnected parts.
    - **`cols >= 2`, `r >= 1` (multi-row, multi-column prefix):** Any cell can be removed — in a grid with ≥ 2 rows and ≥ 2 columns, no single cell is an articulation point (alternate paths always exist). So we track `seenValues` — all cell values encountered so far — and check if `imbalance` appears among them.
- If no cut qualifies after all 4 rotations, return `false`.

# Complexity
- Time complexity: $$O(m \times n)$$ — 4 rotations, each scanning all cells once; `rotate90` is $$O(m \times n)$$.

- Space complexity: $$O(m \times n)$$ — rotated grid copies and the `seenValues` set.

# Code
```typescript []
const canPartitionGrid = (grid: number[][]): boolean => {
    let total = 0;
    for (const row of grid)
        for (const cell of row)
            total += cell;

    for (let rotation = 0; rotation < 4; rotation++) {
        const rows = grid.length;
        const cols = grid[0].length;

        if (rows >= 2) {
            if (cols === 1) {
                let prefixSum = 0;
                for (let r = 0; r < rows - 1; r++) {
                    prefixSum += grid[r][0];
                    const imbalance = prefixSum * 2 - total;
                    if (imbalance === 0 || imbalance === grid[0][0] || imbalance === grid[r][0])
                        return true;
                }
            } else {
                const seenValues = new Set<number>([0]);
                let prefixSum = 0;

                for (let r = 0; r < rows - 1; r++) {
                    for (let c = 0; c < cols; c++) {
                        seenValues.add(grid[r][c]);
                        prefixSum += grid[r][c];
                    }

                    const imbalance = prefixSum * 2 - total;

                    if (r === 0) {
                        if (imbalance === 0 || imbalance === grid[0][0] || imbalance === grid[0][cols - 1])
                            return true;
                    } else if (seenValues.has(imbalance)) {
                        return true;
                    }
                }
            }
        }

        grid = rotate90(grid);
    }

    return false;
};

const rotate90 = (grid: number[][]): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;
    const rotated: number[][] = Array(cols).fill(0).map(() => Array(rows).fill(0));
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            rotated[c][rows - 1 - r] = grid[r][c];
    return rotated;
};
```