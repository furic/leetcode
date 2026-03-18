# BFS Snake State Space | 26 Lines | O(n²) | 100ms

# Intuition
The snake's state is fully described by its tail position `(r, c)` and orientation. There are at most `2n²` states, and all moves cost 1 — making BFS optimal for finding the minimum number of moves.

# Approach
- **State:** `(r, c, orientation)` where `(r, c)` is the tail (top-left) cell of the snake, and orientation is `HORIZONTAL` or `VERTICAL`. The head occupies `(r, c+1)` or `(r+1, c)` respectively.
- **BFS from `(0, 0, HORIZONTAL)`:** Use a queue of `[r, c, orientation, moves]` and a visited set keyed on the state string.
- **Goal:** `r === n-1 && c === n-2 && orientation === HORIZONTAL`.
- **Transitions per state:**
  - **Horizontal:**
    - Move right: tail moves to `(r, c+1)` — requires `(r, c+2)` empty.
    - Move down: tail moves to `(r+1, c)` — requires `(r+1, c)` and `(r+1, c+1)` both empty.
    - Rotate clockwise to vertical `(r, c)`: same precondition as move down — requires `(r+1, c)` and `(r+1, c+1)` empty.
  - **Vertical:**
    - Move down: tail moves to `(r+1, c)` — requires `(r+2, c)` empty.
    - Move right: tail moves to `(r, c+1)` — requires `(r, c+1)` and `(r+1, c+1)` both empty.
    - Rotate counterclockwise to horizontal `(r, c)`: same precondition as move right.
- Move down and rotate share the same precondition check — both branches are emitted together when the condition holds.
- Return `-1` if the queue empties without reaching the goal.

# Complexity
- Time complexity: $$O(n^2)$$ — at most `2n²` states, each processed once with O(1) transitions.

- Space complexity: $$O(n^2)$$ — visited set and queue.

# Code
```typescript []
const minimumMoves = (grid: number[][]): number => {
    const n = grid.length;
    const HORIZONTAL = 0, VERTICAL = 1;
    const visited = new Set<string>();
    const queue: [number, number, number, number][] = [[0, 0, HORIZONTAL, 0]];

    const isEmpty = (r: number, c: number) =>
        r >= 0 && c >= 0 && r < n && c < n && grid[r][c] === 0;

    while (queue.length) {
        const [r, c, orientation, moves] = queue.shift()!;
        const key = `${r},${c},${orientation}`;
        if (visited.has(key)) continue;
        visited.add(key);

        if (r === n - 1 && c === n - 2 && orientation === HORIZONTAL) return moves;

        if (orientation === HORIZONTAL) {
            if (isEmpty(r, c + 2)) queue.push([r, c + 1, HORIZONTAL, moves + 1]);
            if (isEmpty(r + 1, c) && isEmpty(r + 1, c + 1)) {
                queue.push([r + 1, c, HORIZONTAL, moves + 1]);
                queue.push([r, c, VERTICAL, moves + 1]);
            }
        } else {
            if (isEmpty(r + 2, c)) queue.push([r + 1, c, VERTICAL, moves + 1]);
            if (isEmpty(r, c + 1) && isEmpty(r + 1, c + 1)) {
                queue.push([r, c + 1, VERTICAL, moves + 1]);
                queue.push([r, c, HORIZONTAL, moves + 1]);
            }
        }
    }

    return -1;
};
```