// Main function
const minimumSum = (grid: number[][]): number => {
    const rotatedGrid = rotateGrid(grid);
    return Math.min(
        findMinPartitionArea(grid),
        findMinPartitionArea(rotatedGrid)
    );
};

// Calculate bounding box area of 1's in a subgrid
const boundingBoxArea = (
    grid: number[][],
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number,
): number => {
    let minRow = grid.length, maxRow = -1;
    let minCol = grid[0].length, maxCol = -1;

    for (let r = rowStart; r <= rowEnd; r++) {
        for (let c = colStart; c <= colEnd; c++) {
            if (grid[r][c] === 1) {
                minRow = Math.min(minRow, r);
                maxRow = Math.max(maxRow, r);
                minCol = Math.min(minCol, c);
                maxCol = Math.max(maxCol, c);
            }
        }
    }

    return (minRow <= maxRow && minCol <= maxCol)
        ? (maxRow - minRow + 1) * (maxCol - minCol + 1)
        : Infinity; // No 1's found
};

// Rotate grid 90 degrees clockwise
const rotateGrid = (grid: number[][]): number[][] => {
    const numRows = grid.length, numCols = grid[0].length;
    const rotated: number[][] = Array.from({ length: numCols }, () => new Array(numRows));

    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            rotated[numCols - c - 1][r] = grid[r][c];
        }
    }
    return rotated;
};

// Try all partitioning strategies and return minimum area
const findMinPartitionArea = (grid: number[][]): number => {
    const numRows = grid.length, numCols = grid[0].length;
    let minAreaSum = numRows * numCols; // Upper bound

    // Case 1: Split into top and bottom, then split bottom into left & right
    for (let splitRow = 0; splitRow + 1 < numRows; splitRow++) {
        for (let splitCol = 0; splitCol + 1 < numCols; splitCol++) {
            minAreaSum = Math.min(
                minAreaSum,
                boundingBoxArea(grid, 0, splitRow, 0, numCols - 1) + // Top
                boundingBoxArea(grid, splitRow + 1, numRows - 1, 0, splitCol) + // Bottom-left
                boundingBoxArea(grid, splitRow + 1, numRows - 1, splitCol + 1, numCols - 1) // Bottom-right
            );

            minAreaSum = Math.min(
                minAreaSum,
                boundingBoxArea(grid, 0, splitRow, 0, splitCol) + // Top-left
                boundingBoxArea(grid, 0, splitRow, splitCol + 1, numCols - 1) + // Top-right
                boundingBoxArea(grid, splitRow + 1, numRows - 1, 0, numCols - 1) // Bottom
            );
        }
    }

    // Case 2: Split into three horizontal stripes
    for (let firstSplit = 0; firstSplit + 2 < numRows; firstSplit++) {
        for (let secondSplit = firstSplit + 1; secondSplit + 1 < numRows; secondSplit++) {
            minAreaSum = Math.min(
                minAreaSum,
                boundingBoxArea(grid, 0, firstSplit, 0, numCols - 1) + // Top
                boundingBoxArea(grid, firstSplit + 1, secondSplit, 0, numCols - 1) + // Middle
                boundingBoxArea(grid, secondSplit + 1, numRows - 1, 0, numCols - 1) // Bottom
            );
        }
    }

    return minAreaSum;
};