const minAbsDiff = (grid: number[][], k: number): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;
    const result = Array.from({ length: rows - k + 1 }, () =>
        new Array<number>(cols - k + 1).fill(0)
    );

    const cellBuffer = new Int32Array(k * k); // Reused across all submatrices to avoid allocation

    for (let r = rows - k; r >= 0; r--) {
        for (let c = cols - k; c >= 0; c--) {
            let idx = 0;
            for (let dr = r; dr < r + k; dr++)
                for (let dc = c; dc < c + k; dc++)
                    cellBuffer[idx++] = grid[dr][dc];

            cellBuffer.sort();

            let minDiff = Infinity;
            for (let idx = 1; idx < cellBuffer.length; idx++) {
                if (cellBuffer[idx] !== cellBuffer[idx - 1])
                    minDiff = Math.min(minDiff, cellBuffer[idx] - cellBuffer[idx - 1]);
            }

            if (minDiff < Infinity) result[r][c] = minDiff;
        }
    }

    return result;
};