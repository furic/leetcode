/**
 * Finds minimum ASCII sum of deleted characters to make two strings equal
 * Uses space-optimized DP: dp[i][j] = min cost to make s1[0..i] equal to s2[0..j]
 * 
 * Recurrence:
 * - If s1[i] == s2[j]: dp[i][j] = dp[i-1][j-1] (no deletion needed)
 * - Otherwise: min(
 *     dp[i-1][j] + ASCII(s1[i]),  // delete from s1
 *     dp[i][j-1] + ASCII(s2[j])   // delete from s2
 *   )
 */
const minimumDeleteSum = (s1: string, s2: string): number => {
    const length1 = s1.length;
    const length2 = s2.length;
    
    // Use two arrays for space optimization (current and previous row)
    let previousRow = new Array(length2 + 1).fill(0);
    let currentRow = new Array(length2 + 1).fill(0);
    
    // Base case: cost to delete all characters from s2 to match empty s1
    for (let j = 1; j <= length2; j++) {
        previousRow[j] = previousRow[j - 1] + s2.charCodeAt(j - 1);
    }
    
    // Process each character in s1
    for (let i = 1; i <= length1; i++) {
        // Base case: cost to delete all characters from s1[0..i-1] to match empty s2
        currentRow[0] = previousRow[0] + s1.charCodeAt(i - 1);
        
        // Process each character in s2
        for (let j = 1; j <= length2; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                // Characters match: no deletion needed, inherit cost from diagonal
                currentRow[j] = previousRow[j - 1];
            } else {
                // Characters don't match: choose minimum cost between:
                // 1. Delete from s1: take result from (i-1, j) + ASCII of s1[i-1]
                const deleteCostFromS1 = previousRow[j] + s1.charCodeAt(i - 1);
                
                // 2. Delete from s2: take result from (i, j-1) + ASCII of s2[j-1]
                const deleteCostFromS2 = currentRow[j - 1] + s2.charCodeAt(j - 1);
                
                currentRow[j] = Math.min(deleteCostFromS1, deleteCostFromS2);
            }
        }
        
        // Swap arrays for next iteration (more efficient than copying)
        [previousRow, currentRow] = [currentRow, previousRow];
    }
    
    // Result is in previousRow (due to final swap)
    return previousRow[length2];
};