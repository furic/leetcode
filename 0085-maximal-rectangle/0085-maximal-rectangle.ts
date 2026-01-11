function largestRectangleArea(heights: number[]): number {
    let maxArea = 0;
    const stack: number[] = [];

    for (let i = 0; i <= heights.length; ++i) {
        while (stack.length && (i === heights.length || heights[i] < heights[stack[stack.length - 1]])) {
            const height = heights[stack.pop()!];
            const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}

function maximalRectangle(matrix: string[][]): number {
    if (!matrix || !matrix[0]) return 0;

    const rows = matrix.length, cols = matrix[0].length;
    let maxArea = 0;
    const heights = new Array(cols).fill(0);

    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            if (matrix[row][col] === '1') {
                heights[col] += 1;
            } else {
                heights[col] = 0;
            }
        }
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}