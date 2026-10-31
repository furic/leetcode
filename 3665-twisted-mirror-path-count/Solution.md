# Rolling Arrival-Direction Count DP | 21 Lines | O(m×n) | 72ms

# Intuition
A mirror only changes a robot's direction, so what matters at each cell is how the robot arrived: moving down or moving right. A robot that enters a mirror moving right continues down, and one that enters moving down continues right. Counting arrivals per direction lets the mirror rule become a simple transition, with no need to simulate the chain of reflections.

# Approach
- Track two counts for every cell `(r, c)`:
  - `arriveDown[c]`: the number of paths that moved down into this cell.
  - `arriveRight[c]`: the number of paths that moved right into this cell.
  - For a mirror cell these are the attempted entries, before reflection.
- Seed `arriveDown[0] = 1` for the start cell. It is an empty cell, so it can leave in either direction.
- **Moving down into `(r, c)`**, from the cell above `(r-1, c)`:
  - If the cell above is empty, the robot may continue down regardless of how it got there: `arriveDown + arriveRight`.
  - If the cell above is a mirror, only robots that entered it moving right get turned down: `arriveRight`.
  - The arrays still hold the previous row's values at this point, so they are updated in place.
- **Moving right into `(r, c)`**, from the cell on the left `(r, c-1)`:
  - If the left cell is empty, the robot may continue right however it arrived: `arriveDown[c-1] + arriveRight[c-1]`.
  - If the left cell is a mirror, only robots that entered it moving down get turned right: `arriveDown[c-1]`.
  - The left column has already been updated for the current row, so these are the current row's values.
- Reflections that would leave the grid are dropped automatically: a mirror in the last row or column has no cell to push the robot into, so those counts never propagate.
- The answer is `arriveDown[cols-1] + arriveRight[cols-1]` modulo `10^9 + 7`. The destination is guaranteed to be empty, so both arrival directions count.
- Only one row of state is kept, giving `O(n)` space.

# Complexity
- Time complexity: $$O(m \times n)$$, since each cell is processed once with `O(1)` work.

- Space complexity: $$O(n)$$, for the two rolling arrays of length `cols`.

# Code
```typescript []
const uniquePaths = (grid: number[][]): number => {
    const MOD = 1_000_000_007;
    const rows = grid.length;
    const cols = grid[0].length;

    const arriveDown: number[] = new Array(cols).fill(0);
    const arriveRight: number[] = new Array(cols).fill(0);
    arriveDown[0] = 1;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r > 0) {
                if (grid[r - 1][c] === 0) arriveDown[c] = (arriveDown[c] + arriveRight[c]) % MOD;
                else                      arriveDown[c] = arriveRight[c];
            }

            if (c > 0) {
                if (grid[r][c - 1] === 0) arriveRight[c] = (arriveDown[c - 1] + arriveRight[c - 1]) % MOD;
                else                      arriveRight[c] = arriveDown[c - 1];
            }
        }
    }

    return (arriveDown[cols - 1] + arriveRight[cols - 1]) % MOD;
};
```