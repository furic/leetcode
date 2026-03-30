const areSimilar = (mat: number[][], k: number): boolean => {
    const rows = mat.length;
    const cols = mat[0].length;
    const shift = k % cols;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (mat[r][c] !== mat[r][(c + shift) % cols])
                return false;
        }
    }

    return true;
};