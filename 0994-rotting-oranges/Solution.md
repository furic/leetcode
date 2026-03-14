# Multi-Source BFS Time Propagation | 28 Lines | O(m×n) | 4ms

# Intuition
All rotten oranges spread simultaneously — this is a classic multi-source BFS problem. We seed the queue with every initially rotten orange at time `0`, then let BFS naturally propagate rot level by level, where each level represents one elapsed minute.

# Approach
- Scan the grid once to seed the BFS queue with all initially rotten oranges (time `0`) and count `freshCount`.
- Use three parallel arrays (`rowQueue`, `colQueue`, `timeQueue`) as a flat BFS queue with a `head` pointer — avoids `shift()` overhead on a standard array.
- Process each entry in the queue:
  - For each of the 4 cardinal neighbours, if the neighbour is a fresh orange (`1`), mark it rotten (`2`), enqueue it with `time + 1`, and decrement `freshCount`.
  - Marking as `2` immediately prevents re-enqueuing the same cell.
- Track `elapsedTime` as the time of the last dequeued entry — after BFS completes, this holds the time the last orange rotted.
- Return `elapsedTime` if `freshCount === 0` (all fresh oranges were reached), otherwise `-1` (some fresh orange was unreachable).
- **Edge case:** If there are no fresh oranges initially, `freshCount === 0` from the start and `elapsedTime` stays `0` — correctly returns `0`.

# Complexity
- Time complexity: $$O(m \times n)$$ — each cell is enqueued and processed at most once.

- Space complexity: $$O(m \times n)$$ — the queue holds at most all cells in the worst case.

# Code
```typescript []
const orangesRotting = (grid: number[][]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    const rowQueue: number[] = [];
    const colQueue: number[] = [];
    const timeQueue: number[] = [];

    let freshCount = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) freshCount++;
            else if (grid[r][c] === 2) {
                rowQueue.push(r);
                colQueue.push(c);
                timeQueue.push(0);
            }
        }
    }

    let head = 0;
    let elapsedTime = 0;

    while (head < timeQueue.length) {
        const r = rowQueue[head];
        const c = colQueue[head];
        elapsedTime = timeQueue[head];
        head++;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                grid[nr][nc] = 2;
                rowQueue.push(nr);
                colQueue.push(nc);
                timeQueue.push(elapsedTime + 1);
                freshCount--;
            }
        }
    }

    return freshCount === 0 ? elapsedTime : -1;
};
```