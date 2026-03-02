const minSwaps = (grid: number[][]): number => {
    const n = grid.length;

    // For each row, count trailing zeros (determines how many upper-diagonal cells it can cover)
    const trailingZeros = grid.map(row => {
        let count = 0;
        for (let j = n - 1; j >= 0 && row[j] === 0; j--) count++;
        return count;
    });

    let swaps = 0;

    for (let row = 0; row < n; row++) {
        const requiredZeros = n - row - 1; // row i needs at least n-i-1 trailing zeros

        // Find the nearest row at or below current that satisfies the requirement
        let candidate = row;
        while (candidate < n && trailingZeros[candidate] < requiredZeros) candidate++;
        if (candidate === n) return -1;

        // Bubble the candidate row up to position row
        while (candidate > row) {
            [trailingZeros[candidate], trailingZeros[candidate - 1]] = [trailingZeros[candidate - 1], trailingZeros[candidate]];
            candidate--;
            swaps++;
        }
    }

    return swaps;
};