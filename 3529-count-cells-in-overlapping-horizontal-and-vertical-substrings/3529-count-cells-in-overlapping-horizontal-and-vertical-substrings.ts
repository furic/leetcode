const countCells = (grid: string[][], pattern: string): number => {
    const MOD = 1_000_000_007; // Large prime modulus for hashing
    const HASH_BASE = 67; // Base used for polynomial rolling hash

    /**
     * Marks all positions in `sequence` that match the pattern's hash.
     * Uses a differential array for efficient marking.
     */
    const markPatternMatches = (
        sequence: string,
        patternLength: number,
        patternHash: bigint,
        hashBasePower: bigint,
        matchMarkers: boolean[]
    ) => {
        const totalLength = sequence.length;
        const diffArray = new Array<number>(totalLength + 1).fill(0);
        let rollingHash = BigInt(0);

        // Initial hash for the first window
        for (let i = 0; i < patternLength; i++) {
            rollingHash = (rollingHash * BigInt(HASH_BASE) + BigInt(sequence.charCodeAt(i))) % BigInt(MOD);
        }

        if (rollingHash === patternHash) {
            diffArray[0]++;
            diffArray[patternLength]--;
        }

        // Slide window and update hashes
        for (let i = patternLength; i < totalLength; i++) {
            // Remove old char contribution, add new char
            rollingHash = (rollingHash * BigInt(HASH_BASE) 
                         - BigInt(sequence.charCodeAt(i - patternLength)) * hashBasePower % BigInt(MOD) 
                         + BigInt(MOD)) % BigInt(MOD);
            rollingHash = (rollingHash + BigInt(sequence.charCodeAt(i))) % BigInt(MOD);

            if (rollingHash === patternHash) {
                const startIndex = i - patternLength + 1;
                diffArray[startIndex]++;
                diffArray[startIndex + patternLength]--;
            }
        }

        // Apply differential array to get final markers
        let activeMatches = 0;
        for (let i = 0; i < totalLength; i++) {
            activeMatches += diffArray[i];
            matchMarkers[i] = activeMatches > 0;
        }
    };

    /**
     * Builds a string by reading the grid row by row (left-to-right, then top-to-bottom)
     */
    const buildHorizontalSequence = (grid: string[][], rows: number, cols: number): string => {
        let sequence = "";
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                sequence += grid[i][j];
            }
        }
        return sequence;
    };

    /**
     * Builds a string by reading the grid column by column (top-to-bottom, then left-to-right)
     */
    const buildVerticalSequence = (grid: string[][], rows: number, cols: number): string => {
        let sequence = "";
        for (let j = 0; j < cols; j++) {
            for (let i = 0; i < rows; i++) {
                sequence += grid[i][j];
            }
        }
        return sequence;
    };

    /**
     * Calculates polynomial rolling hash for the first `length` characters of a string
     */
    const calculateHash = (s: string, length: number): bigint => {
        let hash = BigInt(0);
        for (let i = 0; i < length; i++) {
            hash = (hash * BigInt(HASH_BASE) + BigInt(s.charCodeAt(i))) % BigInt(MOD);
        }
        return hash;
    };

    /**
     * Calculates (base^exponent) % MOD efficiently using binary exponentiation
     */
    const modPow = (base: bigint, exponent: number): bigint => {
        let result = BigInt(1);
        while (exponent > 0) {
            if (exponent & 1) result = (result * base) % BigInt(MOD);
            base = (base * base) % BigInt(MOD);
            exponent >>= 1;
        }
        return result;
    };

    const rows = grid.length;
    const cols = grid[0].length;
    const patternLength = pattern.length;

    if (patternLength > rows * cols) return 0; // Pattern longer than grid, impossible

    const horizontalSequence = buildHorizontalSequence(grid, rows, cols);
    const verticalSequence = buildVerticalSequence(grid, rows, cols);

    const patternHash = calculateHash(pattern, patternLength);
    const hashBasePower = modPow(BigInt(HASH_BASE), patternLength);

    const horizontalMatches = new Array<boolean>(rows * cols).fill(false);
    const verticalMatches = new Array<boolean>(rows * cols).fill(false);

    // Mark matched cells
    markPatternMatches(horizontalSequence, patternLength, patternHash, hashBasePower, horizontalMatches);
    markPatternMatches(verticalSequence, patternLength, patternHash, hashBasePower, verticalMatches);

    // Count cells that are part of both horizontal and vertical matches
    let coveredCellCount = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (horizontalMatches[row * cols + col] && verticalMatches[col * rows + row]) {
                coveredCellCount++;
            }
        }
    }

    return coveredCellCount;
};