# Digit DP Waviness Sum | 44 Lines | O(d × 2 × 3 × 10) | 46ms

# Intuition
We need the sum of waviness across all numbers in a range. This is a classic digit DP problem with a twist: instead of counting, we track the total waviness accumulated across all valid numbers. We use the standard "count up to N" approach and compute `f(num2) - f(num1 - 1)`.

# Approach
- **State:** `(pos, isFree, lastDir, lastDigit)` where:
  - `pos` = current digit position (0-indexed from the most significant digit of the number being built)
  - `isFree` = whether we're no longer constrained by the upper bound
  - `lastDir` = direction of the last step: `0`=rising, `1`=flat (used as initial sentinel), `2`=falling
  - `lastDigit` = the last digit placed
- **Two parallel arrays:** `wayCount[state]` (number of numbers reaching this state) and `wavinessSum[state]` (total waviness accumulated across those numbers).
- **Seeding:** For each starting position `startPos` (handles numbers shorter than `m` digits by treating them as starting mid-string), place the first non-zero digit with direction `1` (flat sentinel, not a real direction).
- **Transition:** For each state at `pos`, try all valid next digits (up to `digits[pos+1]` if tight, else 9). A peak/valley occurs when direction flips between rising and falling (`0→2` or `2→0`). Propagate: `wavinessSum[newState] += wavinessSum[state] + wayCount[state] * (1 if wavy else 0)`.
- **Result:** Sum all `wavinessSum` at the final position `m-1`.

# Complexity
- Time complexity: $$O(d \times 2 \times 3 \times 10 \times 10)$$ per `countUpTo` call, where $$d \leq 16$$ — effectively $$O(1)$$.

- Space complexity: $$O(d \times 2 \times 3 \times 10)$$ — flat state arrays.

# Code
```typescript []
const totalWaviness = (num1: number, num2: number): number => {
    const getDir = (a: number, b: number): number =>
        a < b ? 0 : a === b ? 1 : 2;

    const isWavy = (prevDir: number, newDir: number): boolean =>
        (prevDir === 0 && newDir === 2) || (prevDir === 2 && newDir === 0);

    const stateIdx = (pos: number, isFree: number, lastDir: number, lastDigit: number): number =>
        ((pos * 2 + isFree) * 3 + lastDir) * 10 + lastDigit;

    const countUpTo = (num: number): number => {
        if (num <= 0) return 0;

        const digits = String(num).split('').map(Number);
        const m = digits.length;
        const stateCount = m * 2 * 3 * 10;
        const wavinessSum = new Array(stateCount).fill(0);
        const wayCount    = new Array(stateCount).fill(0);

        for (let startPos = 0; startPos < m; startPos++) {
            const maxFirstDigit = startPos === 0 ? digits[0] : 9;
            for (let d = 1; d <= maxFirstDigit; d++) {
                const isFree = startPos === 0 ? (d < digits[0] ? 1 : 0) : 1;
                wayCount[stateIdx(startPos, isFree, 1, d)]++;
            }
        }

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
```