const colorTheGrid = (m: number, n: number): number => {
    const MOD = 1e9 + 7;

    // Generate all valid row colorings (no adjacent same colors in a row)
    const maxMask = Math.pow(3, m); // Each cell in a row can be 0, 1, or 2 (3 colors)
    const validRows: Map<number, number[]> = new Map(); // mask -> color pattern

    for (let mask = 0; mask < maxMask; mask++) {
        const row: number[] = [];
        let temp = mask;

        let isValid = true;
        for (let i = 0; i < m; i++) {
            const color = temp % 3;
            if (i > 0 && color === row[i - 1]) {
                isValid = false;
                break;
            }
            row.push(color);
            temp = Math.floor(temp / 3);
        }

        if (isValid) {
            validRows.set(mask, row);
        }
    }

    // Precompute which row colorings can go one after another
    const compatible: Map<number, number[]> = new Map();

    for (const [mask1, row1] of validRows) {
        for (const [mask2, row2] of validRows) {
            let isCompatible = true;
            for (let i = 0; i < m; i++) {
                if (row1[i] === row2[i]) {
                    isCompatible = false;
                    break;
                }
            }
            if (isCompatible) {
                if (!compatible.has(mask1)) compatible.set(mask1, []);
                compatible.get(mask1)!.push(mask2);
            }
        }
    }

    // Dynamic Programming: ways[i] = number of ways to build up to column i with ending row mask i
    let ways: Map<number, number> = new Map();
    for (const mask of validRows.keys()) {
        ways.set(mask, 1); // First column can be any valid row
    }

    // Build up for each column
    for (let col = 1; col < n; col++) {
        const newWays: Map<number, number> = new Map();

        for (const [currMask, _] of validRows) {
            const prevMasks = compatible.get(currMask) || [];
            let total = 0;

            for (const prevMask of prevMasks) {
                total = (total + (ways.get(prevMask) || 0)) % MOD;
            }

            newWays.set(currMask, total);
        }

        ways = newWays;
    }

    // Sum up all ways for the last column
    let result = 0;
    for (const count of ways.values()) {
        result = (result + count) % MOD;
    }

    return result;
};