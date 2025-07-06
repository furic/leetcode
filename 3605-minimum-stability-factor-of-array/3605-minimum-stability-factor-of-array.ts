const minStable = (nums: number[], maxChanges: number): number => {
    const n = nums.length;

    // GCD of two numbers
    const gcd = (a: number, b: number): number => {
        while (b !== 0) [a, b] = [b, a % b];
        return a;
    };

    // Build Sparse Table for GCD range queries
    const buildSparseTable = (arr: number[]): [number[][], number[]] => {
        const logTable = new Array(n + 1).fill(0);
        for (let i = 2; i <= n; i++) {
            logTable[i] = logTable[i >> 1] + 1;
        }

        const maxLog = logTable[n];
        const sparseTable = Array.from({ length: maxLog + 1 }, () => new Array(n).fill(0));

        // Initialize k = 0 (intervals of length 1)
        for (let i = 0; i < n; i++) {
            sparseTable[0][i] = arr[i];
        }

        // Build for k >= 1
        for (let k = 1; k <= maxLog; k++) {
            for (let i = 0; i + (1 << k) <= n; i++) {
                sparseTable[k][i] = gcd(sparseTable[k - 1][i], sparseTable[k - 1][i + (1 << (k - 1))]);
            }
        }

        return [sparseTable, logTable];
    };

    // Query GCD on range [l, r] using sparse table
    const queryGCD = (sparseTable: number[][], logTable: number[], l: number, r: number): number => {
        const length = r - l + 1;
        const k = logTable[length];
        return gcd(sparseTable[k][l], sparseTable[k][r - (1 << k) + 1]);
    };

    // Check if we can reduce the max stable subarray length to 'maxLength' with at most maxChanges
    const canAchieveStability = (
        maxLength: number,
        sparseTable: number[][],
        logTable: number[]
    ): boolean => {
        const windowSize = maxLength + 1;
        if (windowSize > n) return true;

        let changesUsed = 0;
        let i = 0;

        while (i + windowSize <= n) {
            if (queryGCD(sparseTable, logTable, i, i + windowSize - 1) > 1) {
                changesUsed++;
                if (changesUsed > maxChanges) return false;
                i += windowSize; // skip current stable window
            } else {
                i++;
            }
        }

        return true;
    };

    // Build the sparse table once
    const [sparseTable, logTable] = buildSparseTable(nums);

    // Binary search for the minimum stability factor
    let low = 0, high = n, answer = n;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (canAchieveStability(mid, sparseTable, logTable)) {
            answer = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return answer;
};