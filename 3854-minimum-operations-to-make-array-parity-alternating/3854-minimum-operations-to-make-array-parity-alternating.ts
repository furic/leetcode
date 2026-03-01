const makeParityAlternating = (nums: number[]): number[] => {
    const n = nums.length;
    const getParity = (x: number) => ((x % 2) + 2) % 2; // handles negatives: 0=even, 1=odd

    const countOps = (startParity: number): number =>
        nums.reduce((ops, v, i) => {
            const requiredParity = (startParity + i) % 2;
            return ops + (getParity(v) !== requiredParity ? 1 : 0);
        }, 0);

    const opsStartEven = countOps(0);
    const opsStartOdd  = countOps(1);
    const minOps = Math.min(opsStartEven, opsStartOdd);

    // For elements already correct parity: only choice is [v]
    // For elements needing a flip: two choices [v-1, v+1], both ±1 away and correct parity
    const computeMinRange = (startParity: number): number => {
        const choicesPerElement: number[][] = nums.map((v, i) => {
            const requiredParity = (startParity + i) % 2;
            return getParity(v) === requiredParity ? [v] : [v - 1, v + 1];
        });

        // Flatten all (value, elementIndex) pairs and sort by value
        const candidates: [value: number, elementIndex: number][] = [];
        for (let i = 0; i < n; i++) {
            for (const val of choicesPerElement[i]) {
                candidates.push([val, i]);
            }
        }
        candidates.sort((a, b) => a[0] - b[0]);

        // Sliding window: shrink from left while all n elements are still covered
        const windowCoverage = new Map<number, number>(); // elementIndex → count in window
        let elementsCovered = 0;
        let minRange = Infinity;
        let left = 0;

        for (let right = 0; right < candidates.length; right++) {
            const [, rightIdx] = candidates[right];
            const prevCount = windowCoverage.get(rightIdx) ?? 0;
            if (prevCount === 0) elementsCovered++;
            windowCoverage.set(rightIdx, prevCount + 1);

            while (elementsCovered === n) {
                minRange = Math.min(minRange, candidates[right][0] - candidates[left][0]);

                const [, leftIdx] = candidates[left];
                const leftCount = windowCoverage.get(leftIdx)!;
                if (leftCount === 1) {
                    elementsCovered--;
                    windowCoverage.delete(leftIdx);
                } else {
                    windowCoverage.set(leftIdx, leftCount - 1);
                }
                left++;
            }
        }

        return minRange;
    };

    const minRange = Math.min(
        opsStartEven === minOps ? computeMinRange(0) : Infinity,
        opsStartOdd  === minOps ? computeMinRange(1) : Infinity,
    );

    return [minOps, minRange];
};