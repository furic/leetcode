# 2D Prefix Sum with Monotonicity | 48 Lines | O(m·n·min(m,n)) | 11ms

# 2D Prefix Sum with Monotonicity | 48 Lines | O(m·n·min(m,n)) |

## Intuition

The key insight is that checking every possible square naively would be expensive. Instead, we use **2D prefix sums** to answer "what is the sum of any rectangle?" in **O(1) time**. This transforms the problem from checking O(m·n·min(m,n)) cells individually into computing O(m·n·min(m,n)) rectangle sums instantly.

Additionally, there's an important **monotonicity property**: once a square of side length `k` has sum exceeding the threshold, any larger square at that position will also exceed it (since we're only adding more positive values). This lets us prune our search space dramatically, avoiding redundant checks for sizes we know will fail.

## Approach

**1. Build the 2D Prefix Sum Array (O(m·n))**
   - Create a (m+1) × (n+1) array with 1-indexing for clean boundary handling
   - For each cell (i, j): `prefixSum[i][j] = prefixSum[i-1][j] + prefixSum[i][j-1] - prefixSum[i-1][j-1] + mat[i-1][j-1]`
   - The subtraction removes the double-counted diagonal overlap
   - This builds up cumulative sums from top-left (0,0) to each position

**2. Design Rectangle Sum Query Function (O(1) per query)**
   - For any rectangle from (top, left) to (bottom, right):
   - `rectangleSum = prefixSum[bottom][right] - prefixSum[top-1][right] - prefixSum[bottom][left-1] + prefixSum[top-1][left-1]`
   - Intuition: total sum minus the regions we don't need, plus the overlap we subtracted twice

**3. Iterate All Possible Squares**
   - Outer two loops: enumerate all O(m·n) potential top-left corners
   - For each top-left position (topRow, leftCol):
     - Start the side length from (maxValidSize + 1), not from 1
     - Reason: if we already found a valid square of size k, checking sizes 1 to k is wasteful
     - This optimization cuts redundant iterations significantly

**4. Check Each Side Length with Early Termination**
   - For each candidate side length:
     - Calculate bottom-right corner: (topRow + sideLength - 1, leftCol + sideLength - 1)
     - Verify the square fits within matrix bounds
     - Query the prefix sum for this square region in O(1)
     - If sum ≤ threshold: update maxValidSize and continue to check larger sizes
     - If sum > threshold: break immediately (monotonicity—larger squares from same position will also exceed)
   - This break statement is crucial; it prevents checking impossibly large squares

**5. Return Maximum Valid Side Length**
   - After exhausting all positions and sizes, return the largest valid square size found
   - If no valid square exists, maxValidSize remains 0

## Complexity

- **Time Complexity: O(m·n·min(m,n))**
  - Building prefix sum: O(m·n)
  - Outer position loops: O(m·n) positions
  - Inner side length loop: worst case O(min(m,n)) per position
  - Each prefix sum query: O(1)
  - The monotonicity pruning prevents full iteration in most practical cases

- **Space Complexity: O(m·n)**
  - 2D prefix sum array: O(m·n)
  - Helper function and variables: O(1)

## Code
```typescript
const maxSideLength = (mat: number[][], threshold: number): number => {
    const numRows = mat.length;
    const numCols = mat[0].length;
    
    const prefixSum: number[][] = Array.from({ length: numRows + 1 }, 
        () => new Array(numCols + 1).fill(0)
    );

    for (let row = 1; row <= numRows; row++) {
        for (let col = 1; col <= numCols; col++) {
            prefixSum[row][col] = 
                prefixSum[row - 1][col] +
                prefixSum[row][col - 1] -
                prefixSum[row - 1][col - 1] +
                mat[row - 1][col - 1];
        }
    }

    const getRectangleSum = (
        topRow: number,
        leftCol: number,
        bottomRow: number,
        rightCol: number
    ): number => {
        return prefixSum[bottomRow][rightCol] -
               prefixSum[topRow - 1][rightCol] -
               prefixSum[bottomRow][leftCol - 1] +
               prefixSum[topRow - 1][leftCol - 1];
    };

    const maxPossibleSize = Math.min(numRows, numCols);
    let maxValidSize = 0;
    
    for (let topRow = 1; topRow <= numRows; topRow++) {
        for (let leftCol = 1; leftCol <= numCols; leftCol++) {
            for (let sideLength = maxValidSize + 1; sideLength <= maxPossibleSize; sideLength++) {
                const bottomRow = topRow + sideLength - 1;
                const rightCol = leftCol + sideLength - 1;
                
                if (bottomRow <= numRows && rightCol <= numCols) {
                    const squareSum = getRectangleSum(topRow, leftCol, bottomRow, rightCol);
                    
                    if (squareSum <= threshold) {
                        maxValidSize = sideLength;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    }
    
    return maxValidSize;
};
```