# Monotonic Stack Histogram | 32 Lines | O(mn) | 13ms

# Intuition
This problem can be solved by reducing it to the "largest rectangle in histogram" problem for each row. For each row, we can calculate the height of consecutive 1s ending at that row for each column, creating a histogram. Then, for each position in this histogram, we need to count all possible rectangles (submatrices) that can be formed. A monotonic stack helps us efficiently calculate how many rectangles end at each position.

# Approach
I'll use a histogram-based approach with a monotonic stack:

1. **Build Height Array**: For each row, maintain an array tracking the height of consecutive 1s ending at the current row for each column. Reset to 0 when encountering a 0.

2. **Monotonic Stack Processing**: For each row's histogram, use a monotonic stack to efficiently count rectangles:
   - Stack maintains increasing heights with their cumulative rectangle counts
   - When we encounter a shorter height, pop taller elements (they can't extend further)
   - For each position, calculate how many new rectangles end there

3. **Rectangle Counting Formula**: At each position with height h and width w from the last smaller element, we can form w×h new rectangles (w choices for left boundary, h choices for height).

4. **Cumulative Tracking**: The stack stores cumulative counts to avoid recalculating the same rectangles multiple times.

This approach efficiently handles the constraint that all elements in a submatrix must be 1 by using the histogram representation.

# Complexity
- Time complexity: $$O(mn)$$
  - Processing each row to build heights: O(mn)
  - For each row, monotonic stack operations: each column is pushed and popped at most once, so O(n) per row
  - Total: O(m × n) for m rows and n columns

- Space complexity: $$O(n)$$
  - Height array of size n for tracking consecutive 1s
  - Monotonic stack stores at most n elements
  - All other variables use constant space

# Code
```typescript []
const numSubmat = (mat: number[][]): number => {
    const totalColumns = mat[0].length;
    const consecutiveOnesHeight: number[] = new Array(totalColumns).fill(0);
    let totalSubmatrices = 0;
    
    for (const currentRow of mat) {
        for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
            consecutiveOnesHeight[columnIndex] = currentRow[columnIndex] === 0 
                ? 0 
                : consecutiveOnesHeight[columnIndex] + 1;
        }
        
        const monotonicStack: [number, number, number][] = [[-1, 0, -1]];
        
        for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
            const currentHeight = consecutiveOnesHeight[columnIndex];
            
            while (monotonicStack[monotonicStack.length - 1][2] >= currentHeight) {
                monotonicStack.pop();
            }
            
            const [previousColumnIndex, previousCumulativeCount] = monotonicStack[monotonicStack.length - 1];
            
            const currentCumulativeCount = previousCumulativeCount + (columnIndex - previousColumnIndex) * currentHeight;
            
            monotonicStack.push([columnIndex, currentCumulativeCount, currentHeight]);
            totalSubmatrices += currentCumulativeCount;
        }
    }
    
    return totalSubmatrices;
};
```