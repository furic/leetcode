# Space-Optimized Remainder DP | 35 Lines | O(mnk) | 190ms

# Intuition
We need to count paths where the sum is divisible by k. Instead of tracking actual path sums (which can be huge), we track remainders mod k. Using DP, we count how many paths reach each cell with each possible remainder.

# Approach
- **Problem Transformation**:
  - Path sum divisible by k means path sum % k == 0
  - Track path counts by their sum's remainder mod k
  - Only need to store k possible remainder states (0 to k-1)
  - This prevents integer overflow and reduces state space

- **DP State Definition**:
  - `dp[col][remainder]` = number of paths reaching column `col` with sum having that `remainder` mod k
  - For space optimization, only keep track of previous row and current row
  - This reduces space from O(m×n×k) to O(n×k)

- **State Transitions**:
  - For each cell (row, col), paths can come from:
    - Above: `previousRowPaths[col][r]` for all remainders r
    - Left: `currentRowPaths[col-1][r]` for all remainders r
  - When adding cell value to path:
    - `newRemainder = (oldRemainder + grid[row][col] % k) % k`
    - Add path count to new remainder bucket

- **Processing Order**:
  - Process row by row, left to right
  - For paths from above: use previous row's data (already computed)
  - For paths from left: use current row's data (just computed this row)
  - This ensures correct dependency ordering

- **Base Case**:
  - Starting cell (0,0): one path exists with remainder = grid[0][0] % k
  - Initialize `currentRowPaths[0][grid[0][0] % k] = 1`

- **Modular Arithmetic**:
  - Result can be huge, so take mod 10^9+7 at each step
  - Remainder tracking naturally stays in range [0, k-1]
  - Path counts accumulate with modular addition

- **Space Optimization**:
  - Full DP would need O(m×n×k) space
  - Since we only access previous row and current row, keep just two rows
  - After processing each row, current becomes previous
  - Final space: O(n×k)

- **Example Walkthrough** (grid=[[5,2,4],[3,0,5],[0,7,2]], k=3):
  - Cell (0,0): remainder 5%3=2, paths: {2:1}
  - Cell (0,1): from left, (2+2)%3=1, paths: {1:1}
  - Cell (0,2): from left, (1+4)%3=2, paths: {2:1}
  - Continue for all cells...
  - Final cell (2,2): remainder 0 has count 2

- **Why Track All Remainders**:
  - Different paths to same cell can have different remainders
  - A path with remainder 1 + cell with value 2 → remainder 0
  - Must track all k possibilities to find divisible paths

# Complexity
- Time complexity: $$O(m \times n \times k)$$
  - Iterate through all m×n cells
  - For each cell, process k possible remainders from above and left
  - Each remainder update: O(1)
  - Total: O(m × n × k)

- Space complexity: $$O(n \times k)$$
  - Previous row paths: O(n × k)
  - Current row paths: O(n × k)
  - Total: O(n × k), optimized from O(m × n × k)

# Code
```typescript
const numberOfPaths = (grid: number[][], k: number): number => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const MOD = 1e9 + 7;

    let previousRowPaths = Array.from({ length: numCols }, () => new Array(k).fill(0));

    for (let row = 0; row < numRows; row++) {
        const currentRowPaths = Array.from({ length: numCols }, () => new Array(k).fill(0));

        for (let col = 0; col < numCols; col++) {
            if (row === 0 && col === 0) {
                const startingRemainder = grid[0][0] % k;
                currentRowPaths[col][startingRemainder] = 1;
                continue;
            }

            const cellRemainder = grid[row][col] % k;

            if (row > 0) {
                for (let remainder = 0; remainder < k; remainder++) {
                    const pathCount = previousRowPaths[col][remainder];
                    if (pathCount === 0) continue;
                    const newRemainder = (remainder + cellRemainder) % k;
                    currentRowPaths[col][newRemainder] = (currentRowPaths[col][newRemainder] + pathCount) % MOD;
                }
            }

            if (col > 0) {
                for (let remainder = 0; remainder < k; remainder++) {
                    const pathCount = currentRowPaths[col - 1][remainder];
                    if (pathCount === 0) continue;
                    const newRemainder = (remainder + cellRemainder) % k;
                    currentRowPaths[col][newRemainder] = (currentRowPaths[col][newRemainder] + pathCount) % MOD;
                }
            }
        }

        previousRowPaths = currentRowPaths;
    }

    return previousRowPaths[numCols - 1][0];
};
```