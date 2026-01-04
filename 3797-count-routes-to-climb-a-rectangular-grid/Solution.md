# DP with Horizontal/Vertical Moves | 51 Lines | O(n*m²) | 871ms

# Intuition

We need to count routes from bottom to top with distance constraints. The key constraint is alternating move types: horizontal moves (same row) must alternate with vertical moves (row changes). Use DP tracking two states per cell: routes ending with horizontal moves vs vertical moves.

# Approach

**DP State Definition:**
- `dp[c][0]`: Routes to cell (r,c) ending with vertical move (from row r+1)
- `dp[c][1]`: Routes to cell (r,c) ending with horizontal move (within row r)

**Key Constraints:**
- Horizontal move distance ≤ d (manhattan on same row)
- Vertical move: distance ≤ d means √((r₁-r₂)² + (c₁-c₂)²) ≤ d
  - For adjacent rows: √(1 + (c₁-c₂)²) ≤ d → |c₁-c₂| ≤ √(d²-1)
  - maxH = floor(√(d²-1))

**Processing (Bottom to Top):**
1. Initialize bottom row: dp[c][0] = 1 for available cells
2. For each row r:
   - Compute horizontal moves: from dp[c'][0] to dp[c][1] where |c-c'| ≤ d
   - Use prefix sums for efficiency
3. Compute vertical moves to row r-1:
   - From dp[c][0] + dp[c][1] to newDp[c'][0] where |c-c'| ≤ maxH

**Example: grid=["..","#."], d=1**

Bottom row (r=1): dp = [[1,0], [0,0]] (only (1,1) available)

Process r=1 horizontal moves:
- From (1,1) can reach (1,0) within distance 1
- dp = [[1,0], [0,1]]

Move to r=0: maxH=0 (only same column)
- From (1,1) can reach (0,1)
- newDp = [[0,0], [1,0]]

Process r=0 horizontal moves:
- From (0,1) can reach (0,0)
- dp = [[0,0], [1,1]]

Total at row 0: (0+0) + (1+1) = 2 ✓

# Complexity

- Time complexity: $$O(n \times m^2)$$
  - n rows processed
  - Per row: m columns, each checks O(m) neighbors for moves
  - Prefix sums optimize to O(n×m) per row
  - Overall: O(n×m²) worst case

- Space complexity: $$O(m)$$
  - DP arrays: O(m) per row
  - Prefix arrays: O(m)
  - No recursion

# Code
```typescript []
const numberOfRoutes = (grid: string[], d: number): number => {
    const MOD = 1e9 + 7;
    const n = grid.length;
    const m = grid[0].length;

    const maxH = Math.floor(Math.sqrt(d * d - 1));

    let dp: number[][] = Array.from({length: m}, () => [0, 0]);
    
    for (let c = 0; c < m; c++) {
        if (grid[n - 1][c] === '.') dp[c][0] = 1;
    }
    
    for (let r = n - 1; r >= 0; r--) {
        const prefix0 = new Array(m + 1).fill(0);
        for (let c = 0; c < m; c++) {
            prefix0[c + 1] = (prefix0[c] + dp[c][0]) % MOD;
        }
        
        for (let c = 0; c < m; c++) {
            if (grid[r][c] === '#') continue;
            const left = Math.max(0, c - d);
            const right = Math.min(m - 1, c + d);
            let sum = (prefix0[right + 1] - prefix0[left] + MOD) % MOD;
            sum = (sum - dp[c][0] + MOD) % MOD;
            dp[c][1] = (dp[c][1] + sum) % MOD;
        }
        
        if (r > 0) {
            const newDp: number[][] = Array.from({length: m}, () => [0, 0]);
            const prefixTotal = new Array(m + 1).fill(0);
            for (let c = 0; c < m; c++) {
                prefixTotal[c + 1] = (prefixTotal[c] + dp[c][0] + dp[c][1]) % MOD;
            }
            
            for (let c = 0; c < m; c++) {
                if (grid[r - 1][c] === '#') continue;
                const left = Math.max(0, c - maxH);
                const right = Math.min(m - 1, c + maxH);
                newDp[c][0] = (prefixTotal[right + 1] - prefixTotal[left] + MOD) % MOD;
            }
            
            dp = newDp;
        }
    }
    
    let ans = 0;
    for (let c = 0; c < m; c++) {
        if (grid[0][c] === '.') ans = (ans + dp[c][0] + dp[c][1]) % MOD;
    }
    
    return ans;
};
```