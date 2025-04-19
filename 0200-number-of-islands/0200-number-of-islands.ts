function numIslands(grid: string[][]): number {
    const removeLand = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length || grid[y][x] !== '1') return;
        grid[y][x] = '0';
        removeLand(x - 1, y);
        removeLand(x + 1, y);
        removeLand(x, y - 1);
        removeLand(x, y + 1);
    };

    let result = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === '1') {
                removeLand(x, y);
                result++;
            }
        }
    }
    return result;
};