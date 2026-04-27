# BFS Street Connection Validation | 24 Lines | O(m×n) | 73ms

# Intuition
This is a graph connectivity problem — treat each cell as a node and connect adjacent cells if their street types are compatible at the shared edge. BFS from `(0,0)` to `(m-1, n-1)`.

# Approach
- **Street connections:** For each street type (1–6), precompute which direction indices it opens: `0=left, 1=right, 2=up, 3=down`.
- **Move table:** For each direction, store the delta `(dr, dc)`, the required exit direction on the current cell (`outDir`), and the required entry direction on the neighbour (`inDir`). A move is valid only if both the current cell and the neighbour have the respective direction in their connection sets.
- **BFS:** Start from `(0, 0)` with a visited matrix. For each dequeued cell, check all 4 moves. If the neighbour is in bounds, unvisited, and the street types are compatible on both sides, mark it visited and enqueue it.
- Return `true` immediately when `(rows-1, cols-1)` is dequeued; return `false` if the queue empties.

# Complexity
- Time complexity: $$O(m \times n)$$ — each cell is enqueued and processed at most once.

- Space complexity: $$O(m \times n)$$ — visited matrix and BFS queue.

# Code
```typescript []
const hasValidPath = (grid: number[][]): boolean => {
    const rows = grid.length, cols = grid[0].length;

    const streetConnections: Record<number, Set<number>> = {
        1: new Set([0, 1]),
        2: new Set([2, 3]),
        3: new Set([0, 3]),
        4: new Set([1, 3]),
        5: new Set([0, 2]),
        6: new Set([1, 2]),
    };

    const moves = [
        [0, -1, 0, 1],
        [0,  1, 1, 0],
        [-1, 0, 2, 3],
        [1,  0, 3, 2],
    ];

    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue: number[][] = [[0, 0]];
    visited[0][0] = true;

    while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        if (r === rows - 1 && c === cols - 1) return true;

        for (const [dr, dc, outDir, inDir] of moves) {
            const nr = r + dr, nc = c + dc;
            if (
                nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] &&
                streetConnections[grid[r][c]].has(outDir) &&
                streetConnections[grid[nr][nc]].has(inDir)
            ) {
                visited[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    }

    return false;
};
```