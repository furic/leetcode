const specialGrid = (N: number): number[][] => {
    if (N === 0) return [[0]];
    
    const sub = specialGrid(N - 1);
    const size = sub.length;
    const newSize = size * 2;
    const result: number[][] = Array.from({ length: newSize }, () => Array(newSize).fill(0));
    const area = size * size;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            result[i][j + size] = sub[i][j];                // top-right (0 * area)
            result[i + size][j + size] = sub[i][j] + area;  // bottom-right (1 * area)
            result[i + size][j] = sub[i][j] + 2 * area;     // bottom-left (2 * area)
            result[i][j] = sub[i][j] + 3 * area;            // top-left (3 * area)
        }
    }

    return result;
};