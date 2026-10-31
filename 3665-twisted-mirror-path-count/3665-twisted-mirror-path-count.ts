const uniquePaths = (grid: number[][]): number => {
    const MOD = 1_000_000_007;
    const rows = grid.length;
    const cols = grid[0].length;

    // Per column, the number of ways to arrive at the current cell:
    // arriveDown[c]  - by moving down into it
    // arriveRight[c] - by moving right into it
    const arriveDown: number[] = new Array(cols).fill(0);
    const arriveRight: number[] = new Array(cols).fill(0);
    arriveDown[0] = 1;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r > 0) {
                // arriveDown[c] / arriveRight[c] still hold the previous row's values here.
                // If the cell above is a mirror, a robot that moved right into it is
                // deflected down, so those paths also count as arriving by moving down.
                if (grid[r - 1][c] === 0) arriveDown[c] = (arriveDown[c] + arriveRight[c]) % MOD;
                else                      arriveDown[c] = arriveRight[c];
            }

            if (c > 0) {
                // arriveDown[c - 1] / arriveRight[c - 1] were already updated for this row.
                // If the cell to the left is a mirror, a robot that moved down into it is
                // deflected right, so those paths are the only ones that continue.
                if (grid[r][c - 1] === 0) arriveRight[c] = (arriveDown[c - 1] + arriveRight[c - 1]) % MOD;
                else                      arriveRight[c] = arriveDown[c - 1];
            }
        }
    }

    return (arriveDown[cols - 1] + arriveRight[cols - 1]) % MOD;
};