const minimumOR = (grid: number[][]): number => {
    const MAX_BITS = 17; // grid[i][j] <= 1e5 < 2^17

    // Each row starts with all its values as candidates
    let rowCandidates: Set<number>[] = grid.map((row) => new Set(row));

    let minimumResult = 0;

    for (let bit = MAX_BITS - 1; bit >= 0; bit--) {
        const bitMask = 1 << bit;

        // Filter each row to values that have this bit unset
        const filteredCandidates = rowCandidates.map(
            (candidates) => new Set([...candidates].filter((v) => (v & bitMask) === 0))
        );

        const everyRowHasCandidateWithBitUnset = filteredCandidates.every((candidates) => candidates.size > 0);

        if (everyRowHasCandidateWithBitUnset) {
            // Commit: keep this bit as 0, narrow down candidates
            rowCandidates = filteredCandidates;
        } else {
            // This bit must be 1 in the final OR
            minimumResult |= bitMask;
        }
    }

    return minimumResult;
};