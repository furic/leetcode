# Spiral Step-Count Direction Tracker | 22 Lines | O(m×n) | 36ms

# Intuition
Spiral traversal follows a predictable pattern: move right, down, left, up, repeating with shrinking step counts. Instead of tracking boundaries, we track how many steps remain in the current direction segment — when it hits zero, rotate 90° clockwise and compute the next segment length.

# Approach
- Initialise the result matrix with `-1` (default for unfilled cells).
- Track position `(x, y)` and direction `(dirX, dirY)` starting just before `(0, 0)` pointing right.
- Maintain two alternating segment lengths:
  - `stepsX` — horizontal segment length (starts at `n`, decrements after each horizontal run).
  - `stepsY` — vertical segment length (starts at `m - 1`, decrements after each vertical run).
  - `stepsLeft` — countdown for the current segment.
- Each iteration: advance `(x, y)` by `(dirX, dirY)`, write `head.val`, advance the list.
- When `stepsLeft` hits `0`: rotate direction 90° clockwise via `[dirX, dirY] = [-dirY, dirX]`, decrement the appropriate segment length (`stepsX` or `stepsY` depending on whether we just finished a horizontal or vertical run), and reset `stepsLeft` to the other dimension's current length.
- Continue until the list is exhausted.

# Complexity
- Time complexity: $$O(m \times n)$$ — each cell is visited at most once.

- Space complexity: $$O(m \times n)$$ — for the result matrix.

# Code
```typescript []
const spiralMatrix = (m: number, n: number, head: ListNode | null): number[][] => {
    const result = Array.from({ length: m }, () => Array(n).fill(-1));

    let x = -1, y = 0;
    let dirX = 1, dirY = 0;
    let stepsX = n, stepsY = m - 1;
    let stepsLeft = n;

    while (head) {
        x += dirX;
        y += dirY;
        result[y][x] = head.val;
        head = head.next;

        stepsLeft--;
        if (stepsLeft === 0) {
            if (dirX !== 0) {
                stepsX--;
                stepsLeft = stepsY;
            } else {
                stepsY--;
                stepsLeft = stepsX;
            }
            [dirX, dirY] = [-dirY, dirX];
        }
    }

    return result;
};
```