/**
 * Finds the largest rectangle in a histogram using monotonic stack
 * Stack maintains indices of bars in increasing height order
 * When a shorter bar is found, calculate rectangles for taller bars
 */
const largestRectangleInHistogram = (heights: number[]): number => {
    let maxRectangleArea = 0;
    const indicesStack: number[] = []; // Stack of bar indices in increasing height order

    // Process each bar plus one virtual bar at end (height 0) to flush stack
    for (let currentIndex = 0; currentIndex <= heights.length; currentIndex++) {
        // Current height (0 at end to trigger all remaining calculations)
        const currentHeight = currentIndex === heights.length ? 0 : heights[currentIndex];
        
        // Pop bars that are taller than current (their rectangle ends here)
        while (indicesStack.length && currentHeight < heights[indicesStack[indicesStack.length - 1]]) {
            const poppedIndex = indicesStack.pop()!;
            const rectangleHeight = heights[poppedIndex];
            
            // Calculate width of rectangle with this height
            // If stack empty: rectangle extends from start (width = currentIndex)
            // If stack not empty: rectangle is between previous bar and current (width = currentIndex - prevIndex - 1)
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

/**
 * Finds the largest rectangle of 1's in a binary matrix
 * Strategy: Treat each row as the base of a histogram where heights represent consecutive 1's
 * For each row, compute histogram heights and find largest rectangle in that histogram
 */
const maximalRectangle = (matrix: string[][]): number => {
    if (!matrix || !matrix[0]) return 0;

    const numRows = matrix.length;
    const numCols = matrix[0].length;
    let maxRectangleArea = 0;
    
    // Heights array: heights[col] = number of consecutive 1's above (and including) current row
    const histogramHeights = new Array(numCols).fill(0);

    // Process each row, treating it as the base of a histogram
    for (let row = 0; row < numRows; row++) {
        // Update histogram heights based on current row
        for (let col = 0; col < numCols; col++) {
            if (matrix[row][col] === '1') {
                // Extend height (consecutive 1's continue)
                histogramHeights[col]++;
            } else {
                // Reset height (consecutive 1's broken by 0)
                histogramHeights[col] = 0;
            }
        }
        
        // Find largest rectangle in current histogram
        const currentRowMaxArea = largestRectangleInHistogram(histogramHeights);
        maxRectangleArea = Math.max(maxRectangleArea, currentRowMaxArea);
    }

    return maxRectangleArea;
};