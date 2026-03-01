const minimumOR = (grid: number[][]): number => {
    let minOR = (1 << 17) - 1; // Start with all bits set; greedily turn off bits

    for (let bit = 16; bit >= 0; bit--) {
        const candidate = minOR ^ (1 << bit); // Try turning off this bit

        // Check if every row has at least one value that fits within candidate's bits
        const everyRowHasFit = grid.every(row =>
            row.some(cell => (cell | candidate) === candidate)
        );

        if (everyRowHasFit) minOR = candidate;
    }

    return minOR;
};