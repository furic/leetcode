# DFS Same-Value Cycle Detection | 18 Lines | O(m×n) | 33ms

# Intuition
A cycle exists when DFS on same-value connected cells reaches an already-visited cell via a path that isn't just immediately backtracking. We prevent trivial back-edges by passing the previous cell coordinates and skipping that neighbour.

# Approach
- Use a global `visited` matrix to ensure each cell is processed at most once across all DFS calls.
- For each unvisited cell, launch DFS with `(prevR, prevC) = (-1, -1)` (no parent).
- In DFS from `(r, c)`:
  - Mark `(r, c)` as visited.
  - For each of the 4 neighbours `(nr, nc)` with the same character:
    - Skip `(nr, nc)` if it equals `(prevR, prevC)` — this is the cell we just came from.
    - If `(nr, nc)` is already visited → cycle found, return `true`.
    - Otherwise recurse. If recursion returns `true`, propagate it up.
- **Why this detects cycles of length ≥ 4:** The `!(nr === prevR && nc === prevC)` check only blocks the immediate parent. Reaching any other visited cell implies a longer path exists, forming a valid cycle.

# Complexity
- Time complexity: $$O(m \times n)$$ — each cell is visited at most once.

- Space complexity: $$O(m \times n)$$ — visited matrix and recursion stack depth up to `m × n`.

# Code
```typescript []
const containsCycle = (grid: string[][]): boolean => {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    const dfs = (r: number, c: number, prevR: number, prevC: number): boolean => {
        visited[r][c] = true;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 && nr < rows &&
                nc >= 0 && nc < cols &&
                grid[nr][nc] === grid[r][c] &&
                !(nr === prevR && nc === prevC)
            ) {
                if (visited[nr][nc] || dfs(nr, nc, r, c)) return true;
            }
        }

        return false;
    };

    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            if (!visited[r][c] && dfs(r, c, -1, -1)) return true;

    return false;
};
```