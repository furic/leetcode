# Diagonal Prefix Sum Rhombus Query | 35 Lines | O(m×n×min(m,n)) | 20ms

# Intuition
A rhombus border consists of four diagonal line segments. Diagonal prefix sums let us query any segment sum in O(1), turning each rhombus computation from O(size) into O(1) — making it feasible to enumerate all rhombuses.

# Approach
- **Diagonal prefix sums:**
  - `diagDown[i][j]` — prefix sum along the top-left → bottom-right diagonal through cell `(i-1, j-1)`.
  - `diagUp[i][j]` — prefix sum along the top-right → bottom-left diagonal through cell `(i-1, j-1)`.
  - Both are 1-indexed with padding to simplify boundary arithmetic.
- **Rhombus enumeration:** For each cell `(i, j)` as the **top vertex**, enumerate bottom vertices at `(k, j)` stepping by 2 (to keep the rhombus grid-aligned). The half-size is `h = (k - i) / 2`, giving:
  - Left vertex: `(i + h, j - h)`
  - Right vertex: `(i + h, j + h)`
  - Bottom vertex: `(k, j)`
  - If left or right falls out of bounds, break early.
- **Rhombus sum via 4 diagonal segment queries:**
  - Top→Left: segment on the `diagUp` diagonal.
  - Top→Right: segment on the `diagDown` diagonal.
  - Left→Bottom: segment on the `diagDown` diagonal.
  - Right→Bottom: segment on the `diagUp` diagonal.
  - The four corner cells are each included in two segments, so subtract them once each.
- **Single cells** (size-0 rhombuses) are inserted directly as `grid[i][j]`.
- **Top-3 tracking:** `insertTop3` maintains a sorted 3-element array of distinct maximums, inserting and shifting in O(1).
- **Result:** Filter out unused `0` slots and return.

# Complexity
- Time complexity: $$O(m \times n \times \min(m, n))$$ — for each of the `m×n` top vertices, we enumerate up to `min(m,n)/2` rhombus sizes.

- Space complexity: $$O(m \times n)$$ — for the two diagonal prefix sum tables.

# Code
```typescript []
const getBiggestThree = (grid: number[][]): number[] => {
    const rows = grid.length;
    const cols = grid[0].length;

    const top3 = [0, 0, 0];
    const insertTop3 = (x: number): void => {
        if (x > top3[0]) {
            [top3[2], top3[1], top3[0]] = [top3[1], top3[0], x];
        } else if (x !== top3[0] && x > top3[1]) {
            [top3[2], top3[1]] = [top3[1], x];
        } else if (x !== top3[0] && x !== top3[1] && x > top3[2]) {
            top3[2] = x;
        }
    };

    const diagDown = Array.from({ length: rows + 1 }, () => new Array(cols + 2).fill(0));
    const diagUp   = Array.from({ length: rows + 1 }, () => new Array(cols + 2).fill(0));

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            diagDown[i][j] = diagDown[i - 1][j - 1] + grid[i - 1][j - 1];
            diagUp[i][j]   = diagUp[i - 1][j + 1]   + grid[i - 1][j - 1];
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            insertTop3(grid[i][j]);

            for (let k = i + 2; k < rows; k += 2) {
                const topR = i, topC = j;
                const botR = k, botC = j;
                const h = Math.floor((k - i) / 2);
                const leftC = j - h, rightC = j + h;
                const midR = i + h;

                if (leftC < 0 || rightC >= cols) break;

                const rhombusSum =
                    (diagUp[midR + 1][leftC + 1]   - diagUp[topR][topC + 2])     +
                    (diagDown[midR + 1][rightC + 1] - diagDown[topR][topC])       +
                    (diagDown[botR + 1][botC + 1]   - diagDown[midR][leftC])      +
                    (diagUp[botR + 1][botC + 1]     - diagUp[midR][rightC + 2])   -
                    (grid[topR][topC] + grid[botR][botC] + grid[midR][leftC] + grid[midR][rightC]);

                insertTop3(rhombusSum);
            }
        }
    }

    return top3.filter(x => x !== 0);
};
```