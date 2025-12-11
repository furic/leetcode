/**
 * Counts buildings that are "covered" (have at least one building in all 4 directions)
 * Strategy: Track extremes in each row/column, then check if building has neighbors in all directions
 */
const countCoveredBuildings = (n: number, buildings: number[][]): number => {
    // For each column y: track the topmost and bottommost buildings
    const topMostInColumn = new Array(n + 1).fill(n + 1);
    const bottomMostInColumn = new Array(n + 1).fill(0);
    
    // For each row x: track the leftmost and rightmost buildings
    const leftMostInRow = new Array(n + 1).fill(n + 1);
    const rightMostInRow = new Array(n + 1).fill(0);

    // First pass: record extremes for each row and column
    for (const [row, col] of buildings) {
        bottomMostInColumn[col] = Math.max(bottomMostInColumn[col], row);
        topMostInColumn[col] = Math.min(topMostInColumn[col], row);
        rightMostInRow[row] = Math.max(rightMostInRow[row], col);
        leftMostInRow[row] = Math.min(leftMostInRow[row], col);
    }

    // Second pass: count buildings that have neighbors in all 4 directions
    let coveredCount = 0;
    for (const [row, col] of buildings) {
        const hasAbove = row > topMostInColumn[col];
        const hasBelow = row < bottomMostInColumn[col];
        const hasLeft = col > leftMostInRow[row];
        const hasRight = col < rightMostInRow[row];
        
        if (hasAbove && hasBelow && hasLeft && hasRight) {
            coveredCount++;
        }
    }

    return coveredCount;
};