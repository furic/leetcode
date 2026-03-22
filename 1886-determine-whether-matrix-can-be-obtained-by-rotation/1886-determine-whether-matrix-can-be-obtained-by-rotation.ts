const findRotation = (mat: number[][], target: number[][]): boolean => {
    const n = mat.length;
    const half = Math.floor(n / 2);
    const halfCeil = Math.floor((n + 1) / 2);

    const matchesTarget = (): boolean => {
        for (let r = 0; r < n; r++)
            for (let c = 0; c < n; c++)
                if (mat[r][c] !== target[r][c]) return false;
        return true;
    };

    // Try all 4 rotations: rotate 90° clockwise each iteration then check
    for (let rotation = 0; rotation < 4; rotation++) {
        for (let r = 0; r < half; r++) {
            for (let c = 0; c < halfCeil; c++) {
                const tmp        = mat[r][c];
                mat[r][c]        = mat[n - 1 - c][r];
                mat[n - 1 - c][r]        = mat[n - 1 - r][n - 1 - c];
                mat[n - 1 - r][n - 1 - c] = mat[c][n - 1 - r];
                mat[c][n - 1 - r] = tmp;
            }
        }
        if (matchesTarget()) return true;
    }

    return false;
};