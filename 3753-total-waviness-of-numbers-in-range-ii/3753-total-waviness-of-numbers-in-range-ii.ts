const totalWaviness = (num1: number, num2: number): number => {
    // Direction encoding: 0 = rising, 1 = flat, 2 = falling
    const getDir = (a: number, b: number): number =>
        a < b ? 0 : a === b ? 1 : 2;

    // A peak (0→2) or valley (2→0) contributes +1 waviness
    const isWavy = (prevDir: number, newDir: number): boolean =>
        (prevDir === 0 && newDir === 2) || (prevDir === 2 && newDir === 0);

    // Flatten 4D state [pos, isFree, lastDir, lastDigit] into a 1D index
    const stateIdx = (pos: number, isFree: number, lastDir: number, lastDigit: number): number =>
        ((pos * 2 + isFree) * 3 + lastDir) * 10 + lastDigit;

    // Digit DP: count total waviness for all numbers in [1, num]
    const countUpTo = (num: number): number => {
        if (num <= 0) return 0;

        const digits = String(num).split('').map(Number);
        const m = digits.length;
        const stateCount = m * 2 * 3 * 10;
        const wavinessSum = new Array(stateCount).fill(0);
        const wayCount    = new Array(stateCount).fill(0);

        // Seed: place the first digit at each position (free or tight)
        for (let startPos = 0; startPos < m; startPos++) {
            const maxFirstDigit = startPos === 0 ? digits[0] : 9;
            for (let d = 1; d <= maxFirstDigit; d++) {
                const isFree = startPos === 0 ? (d < digits[0] ? 1 : 0) : 1;
                wayCount[stateIdx(startPos, isFree, 1, d)]++;
            }
        }

        // Transition: extend each state by one more digit
        for (let pos = 0; pos + 1 < m; pos++) {
            for (let isFree = 0; isFree < 2; isFree++) {
                for (let lastDir = 0; lastDir < 3; lastDir++) {
                    for (let lastDigit = 0; lastDigit < 10; lastDigit++) {
                        const idx = stateIdx(pos, isFree, lastDir, lastDigit);
                        if (wayCount[idx] === 0) continue;

                        const maxNext = isFree ? 9 : digits[pos + 1];
                        for (let nextDigit = 0; nextDigit <= maxNext; nextDigit++) {
                            const newFree  = isFree || nextDigit < digits[pos + 1] ? 1 : 0;
                            const newDir   = getDir(lastDigit, nextDigit);
                            const newIdx   = stateIdx(pos + 1, newFree, newDir, nextDigit);
                            wavinessSum[newIdx] += wavinessSum[idx] + wayCount[idx] * (isWavy(lastDir, newDir) ? 1 : 0);
                            wayCount[newIdx]    += wayCount[idx];
                        }
                    }
                }
            }
        }

        let total = 0;
        for (let isFree = 0; isFree < 2; isFree++)
            for (let lastDir = 0; lastDir < 3; lastDir++)
                for (let lastDigit = 0; lastDigit < 10; lastDigit++)
                    total += wavinessSum[stateIdx(m - 1, isFree, lastDir, lastDigit)];

        return total;
    };

    return countUpTo(num2) - countUpTo(num1 - 1);
};