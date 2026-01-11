# Histogram-Based with Monotonic Stack | 55 Lines | O(n×m) | 8ms

# Intuition

Transform the 2D problem into a series of 1D histogram problems. For each row, build a histogram where heights represent consecutive 1's above (including current row). Find the largest rectangle in each histogram using a monotonic stack.

# Approach

**Histogram Construction:**
- Process matrix row by row
- For each column, track consecutive 1's from top to current row
- If current cell is '1': increment height
- If current cell is '0': reset height to 0

**Largest Rectangle in Histogram:**
- Use monotonic stack to track bar indices in increasing height order
- When encountering shorter bar, calculate rectangles for all taller bars
- Width calculation: distance between bars on left and right of popped bar
- Add virtual bar (height 0) at end to flush remaining bars

**Example: matrix=[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]**

Row 0: heights=[1,0,1,0,0] → max area = 1
Row 1: heights=[2,0,2,1,1] → max area = 3 (width 3, height 1)
Row 2: heights=[3,1,3,2,2] → max area = 6 (width 3, height 2)
Row 3: heights=[4,0,0,3,0] → max area = 6

Result: 6 ✓

# Complexity

- Time complexity: $$O(n \times m)$$
  - n = rows, m = columns
  - Process each cell once: O(n×m)
  - Per row: histogram calculation O(m)
  - Overall: O(n×m)

- Space complexity: $$O(m)$$
  - Heights array: O(m)
  - Stack: O(m) worst case
  - Overall: O(m)

# Code
```typescript []
const largestRectangleInHistogram = (heights: number[]): number => {
    let maxRectangleArea = 0;
    const indicesStack: number[] = [];

    for (let currentIndex = 0; currentIndex <= heights.length; currentIndex++) {
        const currentHeight = currentIndex === heights.length ? 0 : heights[currentIndex];
        
        while (indicesStack.length && currentHeight < heights[indicesStack[indicesStack.length - 1]]) {
            const poppedIndex = indicesStack.pop()!;
            const rectangleHeight = heights[poppedIndex];
            
            const rectangleWidth = indicesStack.length 
                ? currentIndex - indicesStack[indicesStack.length - 1] - 1 
                : currentIndex;
            
            const rectangleArea = rectangleHeight * rectangleWidth;
            maxRectangleArea = Math.max(maxRectangleArea, rectangleArea);
        }
        
        indicesStack.push(currentIndex);
    }
    
    return maxRectangleArea;
};

const maximalRectangle = (matrix: string[][]): number => {
    if (!matrix || !matrix[0]) return 0;

    const numRows = matrix.length;
    const numCols = matrix[0].length;
    let maxRectangleArea = 0;
    
    const histogramHeights = new Array(numCols).fill(0);

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (matrix[row][col] === '1') {
                histogramHeights[col]++;
            } else {
                histogramHeights[col] = 0;
            }
        }
        
        const currentRowMaxArea = largestRectangleInHistogram(histogramHeights);
        maxRectangleArea = Math.max(maxRectangleArea, currentRowMaxArea);
    }

    return maxRectangleArea;
};
```