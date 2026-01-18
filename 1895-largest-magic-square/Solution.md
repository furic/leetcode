# Prefix Sums with Size Descent | 82 Lines | O(min(m,n) × m × n) | 13ms

# Intuition

A magic square requires all rows, columns, and diagonals to have equal sums. Use prefix sums for O(1) range queries, then check squares from largest to smallest size, returning immediately when a magic square is found.

# Approach

**Prefix Sum Arrays (1-indexed):**
- Row prefix: sum of elements [0..j] in row i
- Column prefix: sum of elements [0..i] in column j
- Diagonal prefix: sum along main diagonal to (i,j)
- Anti-diagonal prefix: sum along anti-diagonal to (i,j)

**Magic Square Check:**
1. Calculate both diagonal sums using prefix arrays
2. If diagonals don't match, skip
3. Check all rows and columns match diagonal sum
4. Use prefix sums for O(1) range queries

**Size Descent Strategy:**
- Try sizes from min(m,n) down to 2
- Return immediately on first magic square found
- This finds the largest magic square efficiently

**Example: grid=[[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]**

Check size 3 at position (1,1):
- Main diag: 5+4+3 = 12
- Anti-diag: 6+4+2 = 12
- Row 1: 5+1+6 = 12 ✓
- Row 2: 5+4+3 = 12 ✓
- Row 3: 2+7+3 = 12 ✓
- Col 1: 5+5+2 = 12 ✓
- Col 2: 1+4+7 = 12 ✓
- Col 3: 6+3+3 = 12 ✓

Result: 3 ✓

# Complexity

- Time complexity: $$O(\min(m,n) \times m \times n)$$
  - Build prefix sums: O(m×n)
  - Check each size k: O((m-k)×(n-k)×k)
  - Sum over all sizes: O(min(m,n)×m×n)
  - Early termination improves average case

- Space complexity: $$O(m \times n)$$
  - Four prefix sum arrays: O(m×n) each
  - Overall: O(m×n)

# Code
```typescript []
const largestMagicSquare = (grid: number[][]): number => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    
    const rowPrefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => Array(numCols + 1).fill(0));
    
    const colPrefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => Array(numCols + 1).fill(0));
    
    const diagPrefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => Array(numCols + 1).fill(0));
    
    const antiDiagPrefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => Array(numCols + 1).fill(0));

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cellValue = grid[row][col];
            
            rowPrefixSum[row + 1][col + 1] = rowPrefixSum[row + 1][col] + cellValue;
            colPrefixSum[row + 1][col + 1] = colPrefixSum[row][col + 1] + cellValue;
            diagPrefixSum[row + 1][col + 1] = diagPrefixSum[row][col] + cellValue;
            antiDiagPrefixSum[row + 1][col] = antiDiagPrefixSum[row][col + 1] + cellValue;
        }
    }

    const hasMagicSquare = (squareSize: number): boolean => {
        for (let topRow = 0; topRow <= numRows - squareSize; topRow++) {
            for (let leftCol = 0; leftCol <= numCols - squareSize; leftCol++) {
                const mainDiagSum = diagPrefixSum[topRow + squareSize][leftCol + squareSize] 
                                   - diagPrefixSum[topRow][leftCol];
                
                const antiDiagSum = antiDiagPrefixSum[topRow + squareSize][leftCol] 
                                   - antiDiagPrefixSum[topRow][leftCol + squareSize];
                
                if (mainDiagSum !== antiDiagSum) {
                    continue;
                }
                
                const targetSum = mainDiagSum;
                let isValid = true;
                
                for (let offset = 0; offset < squareSize; offset++) {
                    const rowSum = rowPrefixSum[topRow + offset + 1][leftCol + squareSize] 
                                  - rowPrefixSum[topRow + offset + 1][leftCol];
                    
                    const colSum = colPrefixSum[topRow + squareSize][leftCol + offset + 1] 
                                  - colPrefixSum[topRow][leftCol + offset + 1];
                    
                    if (rowSum !== targetSum || colSum !== targetSum) {
                        isValid = false;
                        break;
                    }
                }
                
                if (isValid) {
                    return true;
                }
            }
        }
        
        return false;
    };

    for (let squareSize = Math.min(numRows, numCols); squareSize >= 2; squareSize--) {
        if (hasMagicSquare(squareSize)) {
            return squareSize;
        }
    }
    
    return 1;
};
```