function largestMagicSquare(grid: number[][]): number {
    const r = grid.length, c = grid[0].length;
    const rowSum: number[][] = Array.from({ length: r + 1 }, () => Array(c + 1).fill(0));
    const colSum: number[][] = Array.from({ length: r + 1 }, () => Array(c + 1).fill(0));
    const diag: number[][] = Array.from({ length: r + 1 }, () => Array(c + 1).fill(0));
    const antidiag: number[][] = Array.from({ length: r + 1 }, () => Array(c + 1).fill(0));

    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            const x = grid[i][j];
            rowSum[i + 1][j + 1] = rowSum[i + 1][j] + x;
            colSum[i + 1][j + 1] = colSum[i][j + 1] + x;
            diag[i + 1][j + 1] = diag[i][j] + x;
            antidiag[i + 1][j] = antidiag[i][j + 1] + x;
        }
    }

    const isMagic = (k: number): boolean => {
        for (let i = 0; i <= r - k; i++) {
            for (let j = 0; j <= c - k; j++) {
                const s = diag[i + k][j + k] - diag[i][j];
                const anti = antidiag[i + k][j] - antidiag[i][j + k];
                if (s !== anti) 
                    continue;

                let valid = true;
                for (let m = 0; m < k; m++) {
                    const row = rowSum[i + m + 1][j + k] - rowSum[i + m + 1][j];
                    const col = colSum[i + k][j + m + 1] - colSum[i][j + m + 1];
                    if (row !== s || col !== s) { 
                        valid = false; 
                        break; 
                    }
                }
                if (valid) 
                    return true;
            }
        }
        return false;
    };

    for (let k = Math.min(r, c); k >= 2; k--) {
        if (isMagic(k)) 
            return k;
    }
    return 1;
};