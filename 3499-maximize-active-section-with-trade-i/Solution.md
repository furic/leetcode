# Run-Length Scan Max Adjacent Zero Gain | 16 Lines | O(n) | 64ms

# Intuition
A valid trade flips a ones-block surrounded by zeros into zeros, then flips the resulting merged zeros (now surrounded by ones in the augmented string) into ones. The net gain is the sum of the two zero-run lengths flanking the flipped ones-block minus the ones-block itself — but since the ones-block had to exist to enable the trade, the gain is just `prevZeroRun + zerosRun` (the ones block length cancels out as it becomes zeros then those zeros become ones elsewhere, or more precisely, we're replacing the ones-block with part of the merged zero region we then fill).

# Approach
- Scan the string in runs: alternate between ones-runs and zeros-runs.
- Track `totalOnes` (always kept), `prevZeroRun` (the zero-run before the current ones-block), and compute `maxGain` as the best `prevZeroRun + zerosRun` seen across consecutive `0s → 1s → 0s` patterns.
- A valid trade requires all three: `prevZeroRun > 0`, `onesRun > 0`, `zerosRun > 0` (the ones-block must be truly surrounded).
- Final answer: `totalOnes + maxGain`.

# Complexity
- Time complexity: $$O(n)$$ — single pass through the string.

- Space complexity: $$O(1)$$ — three scalar variables.

# Code
```typescript []
const maxActiveSectionsAfterTrade = (s: string): number => {
    let totalOnes = 0;
    let prevZeroRun = 0;
    let maxGain = 0;

    for (let i = 0; i < s.length; ) {
        let onesRun = 0;
        while (i < s.length && s[i] === '1') { i++; totalOnes++; onesRun++; }

        let zerosRun = 0;
        while (i < s.length && s[i] === '0') { i++; zerosRun++; }

        if (prevZeroRun > 0 && onesRun > 0 && zerosRun > 0)
            maxGain = Math.max(maxGain, prevZeroRun + zerosRun);

        prevZeroRun = zerosRun;
    }

    return totalOnes + maxGain;
};
```