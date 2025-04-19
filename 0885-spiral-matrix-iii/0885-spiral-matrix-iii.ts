const spiralMatrixIII = (rows: number, cols: number, rStart: number, cStart: number): number[][] => {
    const visited = new Set<string>()
    const result = [];

    let dirY = 0;
    let dirX = 1;
    let y = rStart;
    let x = cStart;
    let count = 1;
    while (count <= rows * cols) {
        visited.add(`${y},${x}`);
        if (0 <= y && y < rows && 0 <= x && x < cols) {
            result.push([y, x]);
            count += 1;
        }
        y += dirY;
        x += dirX;
        if (!visited.has(`${y + dirX},${x - dirY}`)) {
            [dirX, dirY] = [-dirY, dirX];
        }
    }

    return result;
};