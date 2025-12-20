/**
 * Counts columns that are not sorted lexicographically
 * A column is sorted if characters read top-to-bottom are in non-decreasing order
 */
const minDeletionSize = (strs: string[]): number => {
    let unsortedColumnCount = 0;

    // Check each column
    for (let col = 0; col < strs[0].length; col++) {
        // Check if this column is sorted by comparing adjacent rows
        for (let row = 1; row < strs.length; row++) {
            // If current row's character is less than previous row's, column is unsorted
            if (strs[row][col] < strs[row - 1][col]) {
                unsortedColumnCount++;
                break; // No need to check remaining rows in this column
            }
        }
    }

    return unsortedColumnCount;
};