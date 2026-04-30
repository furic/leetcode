const maxPathScore = (grid: number[][], k: number): number => {
    const rows = grid.length;
    const cols = grid[0].length;

    // dp[col][remainingK] = best score reachable at this column with remainingK budget left
    let dp: Int32Array[] = Array.from({ length: cols }, () => new Int32Array(k + 1).fill(-1));
    dp[0][k] = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellValue = grid[r][c];

            // Merge best scores from current and left column
            const best = new Int32Array(k + 1).fill(-1);
            for (let budget = 0; budget <= k; budget++)
                best[budget] = Math.max(best[budget], dp[c][budget]);
            if (c > 0)
                for (let budget = 0; budget <= k; budget++)
                    best[budget] = Math.max(best[budget], dp[c - 1][budget]);

            if (cellValue !== 0) {
                dp[c].fill(-1);
                for (let budget = 1; budget <= k; budget++)
                    if (best[budget] !== -1)
                        dp[c][budget - 1] = best[budget] + cellValue;
            } else {
                dp[c] = best;
            }
        }
    }

    let maxScore = -1;
    for (let budget = 0; budget <= k; budget++)
        maxScore = Math.max(maxScore, dp[cols - 1][budget]);
    return maxScore;
};