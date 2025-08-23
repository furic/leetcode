# Recursive DP with Memoization | 54 Lines | O(R³C² + R²C³) | 100ms

# Intuition
We need to cover all `1`s in a binary grid with exactly three non-overlapping axis-aligned rectangles, minimizing the total area. Each rectangle’s area is determined by the bounding box of the `1`s it contains. The problem becomes how to split the grid into 3 regions optimally.

The main intuition is to use recursion with memoization: at each step, split the current subgrid horizontally or vertically, distribute rectangles across subgrids, and compute the minimum possible sum.

# Approach
1. **Bounding area calculation**  
   For a given subgrid `(iStart, jStart, iEnd, jEnd)`, find the smallest rectangle enclosing all `1`s. This defines the cost if we assign one rectangle to that subgrid.

2. **Recursive DP**  
   Define `findMinSum(iStart, jStart, iEnd, jEnd, parts)` as the minimum area sum required to cover all `1`s in this subgrid with `parts` rectangles.  
   - Base case: if `parts == 1`, return the bounding area.  
   - Recursive case: try splitting into two subproblems (`1 + (parts-1)` or `(parts-1) + 1`) along every possible row and column. Take the minimum result.

3. **Memoization**  
   Store results in a hash map keyed by the subgrid boundaries and number of parts to avoid recomputation.

4. **Final result**  
   Run the DP on the whole grid with 3 parts.

# Complexity
- **Time complexity:**  
  `O(R^3 * C^2 + R^2 * C^3)` in the worst case, since we consider all subgrid states and possible cuts.  
- **Space complexity:**  
  `O(R^2 * C^2)` for memoization.

# Code
```typescript
function minimumSum(grid: number[][]): number {
    const memo = new Map<string, number>();
    const rows = grid.length;
    const cols = grid[0].length;

    function calcArea(iStart: number, jStart: number, iEnd: number, jEnd: number): number {
        let minRow = Infinity;
        let maxRow = -Infinity;
        let minCol = Infinity;
        let maxCol = -Infinity;
        for (let i = iStart; i <= iEnd; i++) {
            for (let j = jStart; j <= jEnd; j++) {
                if (grid[i][j] === 1) {
                    minRow = Math.min(minRow, i);
                    maxRow = Math.max(maxRow, i);
                    minCol = Math.min(minCol, j);
                    maxCol = Math.max(maxCol, j);
                }
            }
        }
        if (minRow === Infinity) return 0;
        return (maxRow - minRow + 1) * (maxCol - minCol + 1);
    }

    function findMinSum(iStart: number, jStart: number, iEnd: number, jEnd: number, parts: number): number {
        const key = `${iStart},${jStart},${iEnd},${jEnd},${parts}`;
        if (memo.has(key)) return memo.get(key)!;
        if (parts === 1) {
            const area = calcArea(iStart, jStart, iEnd, jEnd);
            memo.set(key, area);
            return area;
        }

        let minSum = Infinity;

        for (let i = iStart; i < iEnd; i++) {
            minSum = Math.min(minSum,
                findMinSum(iStart, jStart, i, jEnd, 1) + findMinSum(i + 1, jStart, iEnd, jEnd, parts - 1),
                findMinSum(iStart, jStart, i, jEnd, parts - 1) + findMinSum(i + 1, jStart, iEnd, jEnd, 1));
        }

        for (let j = jStart; j < jEnd; j++) {
            minSum = Math.min(minSum,
                findMinSum(iStart, jStart, iEnd, j, 1) + findMinSum(iStart, j + 1, iEnd, jEnd, parts - 1),
                findMinSum(iStart, jStart, iEnd, j, parts - 1) + findMinSum(iStart, j + 1, iEnd, jEnd, 1));
        }

        memo.set(key, minSum);
        return minSum;
    }

    return findMinSum(0, 0, rows - 1, cols - 1, 3);
}
```