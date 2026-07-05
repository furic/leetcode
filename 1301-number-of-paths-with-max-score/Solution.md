# Rolling Row DP Three-Predecessor Merge | 28 Lines | O(n²) | 39ms

# Intuition
Process the board from bottom-right to top-left. At each cell, the best reachable score comes from three predecessors (down, right, diagonal). We roll two row arrays instead of a full 2D table.

# Approach
- Maintain `score[c]` and `ways[c]` for the row below (`score`) and the current row being filled (`nextScore`), both of size `n + 1` (extra column as a sentinel).
- Initialise everything to `-1` (unreachable) / `0` ways.
- For each cell `(r, c)` processed right-to-left, bottom-to-top:
  - Skip `'X'` (obstacle).
  - `'S'` (start): set `score = 0, ways = 1`.
  - Otherwise: the three predecessors are:
    - **Down:** `score[c]` (same column, previous row).
    - **Right:** `nextScore[c+1]` (same row, column to the right — already computed since we go right-to-left).
    - **Diagonal:** `score[c+1]` (previous row, column+1).
  - Take the max of the three. If all are `-1`, the cell is unreachable.
  - Sum `ways` from all predecessors matching the max score.
  - `nextScore[c] = best + cellValue`, `nextWays[c] = sum % MOD`.
- After processing all rows, return `[score[0], ways[0]]` or `[0, 0]` if unreachable.

# Complexity
- Time complexity: $$O(n^2)$$ — each cell processed once.

- Space complexity: $$O(n)$$ — two rolling row arrays.

# Code
```typescript []
const pathsWithMaxScore = (board: string[]): number[] => {
    const MOD = 1_000_000_007;
    const n = board.length;

    let score = new Array(n + 1).fill(-1);
    let ways  = new Array(n + 1).fill(0);

    for (let r = n - 1; r >= 0; r--) {
        const nextScore = new Array(n + 1).fill(-1);
        const nextWays  = new Array(n + 1).fill(0);

        for (let c = n - 1; c >= 0; c--) {
            const ch = board[r][c];
            if (ch === 'X') continue;

            if (ch === 'S') {
                nextScore[c] = 0;
                nextWays[c]  = 1;
                continue;
            }

            const best = Math.max(score[c], nextScore[c + 1], score[c + 1]);
            if (best === -1) continue;

            let pathCount = 0;
            if (score[c]         === best) pathCount += ways[c];
            if (nextScore[c + 1] === best) pathCount += nextWays[c + 1];
            if (score[c + 1]     === best) pathCount += ways[c + 1];

            const cellVal = ch === 'E' ? 0 : Number(ch);
            nextScore[c] = best + cellVal;
            nextWays[c]  = pathCount % MOD;
        }

        score = nextScore;
        ways  = nextWays;
    }

    return score[0] === -1 ? [0, 0] : [score[0], ways[0]];
};
```