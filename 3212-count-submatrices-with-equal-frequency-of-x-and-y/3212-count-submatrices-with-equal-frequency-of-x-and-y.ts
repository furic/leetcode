const numberOfSubmatrices = (grid: string[][]): number => {
    const rows = grid.length;
    const cols = grid[0].length;

    // Rolling prefix sums: balance (X=+1, Y=-1) and X count, both anchored at (0,0)
    let prevBalance = new Int32Array(cols);
    let prevXCount  = new Int32Array(cols);
    let count = 0;

    for (let r = 0; r < rows; r++) {
        const currBalance = new Int32Array(cols);
        const currXCount  = new Int32Array(cols);
        let leftBalance = 0;
        let leftXCount  = 0;

        for (let c = 0; c < cols; c++) {
            const ch = grid[r][c];
            const balanceDelta = ch === 'X' ? 1 : ch === 'Y' ? -1 : 0;
            const isX          = ch === 'X' ? 1 : 0;

            // 2D prefix sum: curr = cell + above + left - above-left
            const aboveBalance = prevBalance[c];
            const aboveLeft    = c > 0 ? prevBalance[c - 1] : 0;
            currBalance[c] = balanceDelta + aboveBalance + leftBalance - aboveLeft;

            const aboveXCount    = prevXCount[c];
            const aboveLeftXCount = c > 0 ? prevXCount[c - 1] : 0;
            currXCount[c] = isX + aboveXCount + leftXCount - aboveLeftXCount;

            if (currBalance[c] === 0 && currXCount[c] > 0) count++;

            leftBalance = currBalance[c];
            leftXCount  = currXCount[c];
        }

        prevBalance = currBalance;
        prevXCount  = currXCount;
    }

    return count;
};