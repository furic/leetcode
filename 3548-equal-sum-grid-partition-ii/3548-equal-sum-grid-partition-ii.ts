const canPartitionGrid = (grid: number[][]): boolean => {
    let total = 0;
    for (const row of grid)
        for (const cell of row)
            total += cell;

    for (let rotation = 0; rotation < 4; rotation++) {
        const rows = grid.length;
        const cols = grid[0].length;

        if (rows >= 2) {
            if (cols === 1) {
                // Single-column case: only corner cells can be discounted and stay connected
                let prefixSum = 0;
                for (let r = 0; r < rows - 1; r++) {
                    prefixSum += grid[r][0];
                    const imbalance = prefixSum * 2 - total;
                    if (imbalance === 0 || imbalance === grid[0][0] || imbalance === grid[r][0])
                        return true;
                }
            } else {
                // Multi-column case: track seen cell values for discount eligibility
                const seenValues = new Set<number>([0]);
                let prefixSum = 0;

                for (let r = 0; r < rows - 1; r++) {
                    for (let c = 0; c < cols; c++) {
                        seenValues.add(grid[r][c]);
                        prefixSum += grid[r][c];
                    }

                    const imbalance = prefixSum * 2 - total;

                    if (r === 0) {
                        // First row: only corner cells can be discounted and stay connected
                        if (imbalance === 0 || imbalance === grid[0][0] || imbalance === grid[0][cols - 1])
                            return true;
                    } else if (seenValues.has(imbalance)) {
                        return true;
                    }
                }
            }
        }

        grid = rotate90(grid);
    }

    return false;
};

const rotate90 = (grid: number[][]): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;
    const rotated: number[][] = Array(cols).fill(0).map(() => Array(rows).fill(0));
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            rotated[c][rows - 1 - r] = grid[r][c];
    return rotated;
};