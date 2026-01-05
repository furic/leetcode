# Greedy Parity-Based | 21 Lines | O(n²) | 5ms

# Intuition

Adjacent flips can propagate negative signs through the matrix. Key insight: flipping two adjacent negatives makes both positive. By repeatedly pairing negatives, we can eliminate them. If an odd number of negatives exists, one must remain negative - choose the smallest absolute value to minimize loss.

# Approach

**Key Observations:**
- Each flip changes signs of two adjacent elements
- Can always pair up negatives to eliminate them (flip negative pairs)
- If odd negatives: exactly one must stay negative
- To maximize sum: make that one the smallest absolute value

**Algorithm:**
1. Calculate sum of all absolute values (optimal if all can be positive)
2. Count negative numbers
3. Track smallest absolute value in matrix
4. If odd negatives: subtract 2× smallest absolute value (it must be negative instead of positive)

**Why This Works:**
- Even negatives: Can pair all and eliminate → sum = Σ|values|
- Odd negatives: One stays negative, others become positive
  - Best choice: smallest |value| stays negative
  - Loss: -|min| instead of +|min| = difference of 2×|min|

**Example: matrix=[[1,-1],[-1,1]]**
- Sum of absolutes: 1+1+1+1 = 4
- Negatives: 2 (even)
- All can be positive: 4 ✓

**Example: matrix=[[1,2,3],[-1,-2,-3],[1,2,3]]**
- Sum of absolutes: 1+2+3+1+2+3+1+2+3 = 18
- Negatives: 3 (odd)
- Smallest absolute: 1
- Result: 18 - 2×1 = 16 ✓

# Complexity

- Time complexity: $$O(n^2)$$
  - Single pass through n×n matrix
  - Constant work per element

- Space complexity: $$O(1)$$
  - Only scalar variables
  - No additional data structures

# Code
```typescript []
const maxMatrixSum = (matrix: number[][]): number => {
    let totalAbsoluteSum = 0;
    const matrixSize = matrix.length;
    let smallestAbsoluteValue = Infinity;
    let negativeCount = 0;

    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            const currentValue = matrix[row][col];
            const absoluteValue = Math.abs(currentValue);
            
            totalAbsoluteSum += absoluteValue;
            
            if (currentValue < 0) {
                negativeCount++;
            }
            
            smallestAbsoluteValue = Math.min(smallestAbsoluteValue, absoluteValue);
        }
    }

    if (negativeCount % 2 !== 0) {
        totalAbsoluteSum -= 2 * smallestAbsoluteValue;
    }

    return totalAbsoluteSum;
};
```