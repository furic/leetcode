/**
 * Finds minimum columns to delete so remaining strings are in lexicographic order
 * Strategy: Process columns left-to-right, track which adjacent pairs are already ordered
 * Once a pair is ordered by an earlier column, later columns don't affect that pair
 */
const minDeletionSize = (strs: string[]): number => {
    const numColumns = strs[0].length;
    const numRows = strs.length;
    let deletedColumnCount = 0;

    // Track which adjacent row pairs are already determined to be in order
    // pairAlreadySorted[i] = true means strs[i] < strs[i+1] by an earlier column
    const pairAlreadySorted: boolean[] = Array(numRows - 1).fill(false);

    // Process each column from left to right
    for (let col = 0; col < numColumns; col++) {
        let canKeepColumn = true;

        // Check if keeping this column would violate lexicographic order
        for (let row = 0; row < numRows - 1; row++) {
            // Skip pairs already sorted by previous columns
            if (pairAlreadySorted[row]) continue;

            // If current row's character > next row's character, this violates order
            if (strs[row][col] > strs[row + 1][col]) {
                canKeepColumn = false;
                break;
            }
        }

        // If this column creates a violation, delete it and move to next column
        if (!canKeepColumn) {
            deletedColumnCount++;
            continue;
        }

        // Column is kept: update which pairs are now definitely sorted
        for (let row = 0; row < numRows - 1; row++) {
            // If this pair isn't sorted yet and current column shows strict ordering
            if (!pairAlreadySorted[row] && strs[row][col] < strs[row + 1][col]) {
                pairAlreadySorted[row] = true; // This pair is now ordered, won't check in future
            }
        }
    }

    return deletedColumnCount;
};