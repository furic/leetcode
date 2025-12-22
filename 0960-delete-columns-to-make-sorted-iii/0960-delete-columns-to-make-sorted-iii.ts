/**
 * Finds minimum columns to delete so each row is in lexicographic order
 * Strategy: Find longest subsequence of columns where each row is non-decreasing
 * Uses dynamic programming (similar to Longest Increasing Subsequence)
 */
const minDeletionSize = (strs: string[]): number => {
    const numColumns = strs[0].length;
    const numRows = strs.length;
    
    // dp[col] = length of longest valid column subsequence ending at column col
    // A valid subsequence means: for any two columns i < j in the subsequence,
    // every row satisfies strs[row][i] <= strs[row][j]
    const longestValidSequence: number[] = Array(numColumns).fill(1);

    // Try each column as a potential end of a sequence
    for (let currentCol = 1; currentCol < numColumns; currentCol++) {
        // Check all previous columns to see if we can extend from them
        for (let previousCol = 0; previousCol < currentCol; previousCol++) {
            // Can we include both previousCol and currentCol in the same sequence?
            // Check if ALL rows satisfy: char at previousCol <= char at currentCol
            let canExtendSequence = true;
            
            for (let row = 0; row < numRows; row++) {
                if (strs[row][previousCol] > strs[row][currentCol]) {
                    canExtendSequence = false;
                    break;
                }
            }
            
            if (canExtendSequence) {
                // We can extend the sequence from previousCol to currentCol
                longestValidSequence[currentCol] = Math.max(
                    longestValidSequence[currentCol],
                    longestValidSequence[previousCol] + 1
                );
            }
        }
    }

    // Maximum columns we can keep = max length of valid sequence
    // Minimum columns to delete = total columns - max columns we can keep
    return numColumns - Math.max(...longestValidSequence);
};