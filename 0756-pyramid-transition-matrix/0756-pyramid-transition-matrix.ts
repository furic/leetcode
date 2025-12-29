/**
 * Determines if a pyramid can be built from bottom row using allowed triangular patterns
 * Uses DFS with memoization to try all valid ways to build upward
 */
const pyramidTransition = (bottom: string, allowed: string[]): boolean => {
    // Map: pair of bottom blocks → array of possible top blocks
    // e.g., "AB" → ["C", "D"] means ABC and ABD are allowed patterns
    const allowedTransitions = new Map<string, string[]>();
    
    for (const pattern of allowed) {
        const bottomPair = pattern.slice(0, 2);
        if (!allowedTransitions.has(bottomPair)) {
            allowedTransitions.set(bottomPair, []);
        }
        allowedTransitions.get(bottomPair)!.push(pattern[2]);
    }

    // Memoize results for each row configuration
    const canBuildCache = new Map<string, boolean>();

    /**
     * Checks if we can build a pyramid starting from the given row
     * @param currentRow - the current row of blocks
     * @returns true if pyramid can be completed from this row
     */
    const canBuildPyramid = (currentRow: string): boolean => {
        // Check cache first
        if (canBuildCache.has(currentRow)) {
            return canBuildCache.get(currentRow)!;
        }

        // Base case: single block at top means pyramid is complete
        if (currentRow.length === 1) {
            canBuildCache.set(currentRow, true);
            return true;
        }

        const rowLength = currentRow.length;

        // Early validation: check if all adjacent pairs have allowed transitions
        for (let blockIndex = 0; blockIndex < rowLength - 1; blockIndex++) {
            const pair = currentRow.slice(blockIndex, blockIndex + 2);
            if (!allowedTransitions.has(pair)) {
                canBuildCache.set(currentRow, false);
                return false;
            }
        }

        /**
         * Recursively builds the next row by trying all valid top blocks
         * @param pairIndex - current position in the row (which pair we're processing)
         * @param nextRow - the row being constructed above currentRow
         * @returns true if any valid next row leads to a complete pyramid
         */
        const buildNextRow = (pairIndex: number, nextRow: string): boolean => {
            // Built complete next row: try to continue building pyramid from it
            if (pairIndex === rowLength - 1) {
                return canBuildPyramid(nextRow);
            }

            // Try all possible top blocks for current pair
            const bottomPair = currentRow.slice(pairIndex, pairIndex + 2);
            const possibleTopBlocks = allowedTransitions.get(bottomPair)!;
            
            for (const topBlock of possibleTopBlocks) {
                // Try adding this top block and continue building rest of row
                if (buildNextRow(pairIndex + 1, nextRow + topBlock)) {
                    return true;
                }
            }
            
            return false;
        };

        const canBuild = buildNextRow(0, "");
        canBuildCache.set(currentRow, canBuild);
        return canBuild;
    };

    return canBuildPyramid(bottom);
};