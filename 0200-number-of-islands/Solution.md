# Flood Fill DFS Island Sink | 14 Lines | O(m×n) | 52ms

# Intuition
Each unvisited land cell is the start of a new island. From there, we flood-fill all connected land, sinking it to `'0'` to mark it visited in-place. Every time we trigger a flood fill from the outer loop, we've found a new distinct island.

# Approach
- Iterate every cell `(r, c)` in the grid.
- When a `'1'` is found, increment `islandCount` and call `floodFill(r, c)`.
- `floodFill` recursively sinks the current cell (`grid[r][c] = '0'`) and expands in all four cardinal directions — up, down, left, right.
- Base cases terminate recursion: out-of-bounds coordinates, or a cell already `'0'` (water or previously visited land).
- Mutating the input grid directly avoids the need for a separate `visited` array — the grid itself serves as the visit marker.
- After `floodFill` returns, the entire connected land mass is gone, so the outer loop will never revisit any cell belonging to that island.

# Complexity
- Time complexity: $$O(m \times n)$$ — every cell is visited at most once (sunk after first visit).

- Space complexity: $$O(m \times n)$$ — worst case recursion depth if the entire grid is one large island (all land).

# Code
```typescript []
const numIslands = (grid: string[][]): number => {
    const rows = grid.length;
    const cols = grid[0].length;

    const floodFill = (r: number, c: number): void => {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (grid[r][c] === '0') return;

        grid[r][c] = '0';
        floodFill(r - 1, c);
        floodFill(r + 1, c);
        floodFill(r, c - 1);
        floodFill(r, c + 1);
    };

    let islandCount = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islandCount++;
                floodFill(r, c);
            }
        }
    }

    return islandCount;
};
```