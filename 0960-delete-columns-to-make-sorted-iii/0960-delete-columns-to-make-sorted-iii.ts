function minDeletionSize(strs: string[]): number {
    const cols = strs[0].length;
    const rows = strs.length;
    const dp: number[] = Array(cols).fill(1);

    for (let c = 1; c < cols; c++) {
        for (let j = 0; j < c; j++) {
            let valid = true;
            for (let r = 0; r < rows; r++) {
                if (strs[r][j] > strs[r][c]) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                dp[c] = Math.max(dp[c], dp[j] + 1);
            }
        }
    }

    return cols - Math.max(...dp);
};