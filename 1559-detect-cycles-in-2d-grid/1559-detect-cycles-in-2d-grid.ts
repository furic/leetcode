function containsCycle(grid: string[][]): boolean {
    const rows = grid.length, cols = grid[0].length;
    const parent: number[] = Array.from({ length: rows * cols }, (_, i) => i);
    const find = (x: number): number => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };

    const unionSets = (a: number, b: number): boolean => {
        const ra = find(a), rb = find(b);
        if (ra === rb) 
            return true;
        parent[ra] = rb;
        return false;
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (j + 1 < cols && grid[i][j] === grid[i][j + 1]) {
                if (unionSets(i * cols + j, i * cols + j + 1)) 
                    return true;
            }
            if (i + 1 < rows && grid[i][j] === grid[i + 1][j]) {
                if (unionSets(i * cols + j, (i + 1) * cols + j)) 
                    return true;
            }
        }
    }
    return false;
};