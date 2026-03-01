# Two-Pass Greedy + Sliding Window | 48 Lines | O(n log n) | 2371ms

# Intuition
There are only two valid parity patterns for an alternating array: starting with even or starting with odd. We can independently evaluate both, pick the one requiring fewer operations, then minimize the value range among all optimal results.

# Approach
- **Step 1 — Count minimum operations:**
  - For each starting parity (`0` = even-first, `1` = odd-first), count how many elements have the wrong parity using `countOps`. An element at index `i` needs parity `(startParity + i) % 2`.
  - `minOps = min(opsStartEven, opsStartOdd)`.
  - Note: negative number parity is handled via `((x % 2) + 2) % 2` to avoid JavaScript's signed modulo.

- **Step 2 — Enumerate candidate values per element:**
  - For each starting parity pattern that achieves `minOps`, determine the two possible final values for each element:
    - If the element already has the correct parity: it must stay as `[v]` (changing it would cost an extra op or break the pattern).
    - If it needs a flip: both `v - 1` and `v + 1` have the required parity, so choices are `[v - 1, v + 1]`.
  - Each element has either 1 or 2 candidate values.

- **Step 3 — Sliding window over sorted candidates to minimize range:**
  - Flatten all `(value, elementIndex)` pairs into a single list and sort by value.
  - Use a sliding window over this sorted list. Maintain a coverage map (`elementIndex → count`) tracking how many candidates for each element are currently in the window.
  - Advance `right` to expand the window; when all `n` elements are covered (i.e., `elementsCovered === n`), record `candidates[right].value - candidates[left].value` as a candidate range, then shrink from `left`.
  - The minimum range across all valid windows is the answer for this parity pattern.

- **Step 4:** Run `computeMinRange` only for parity patterns that achieved `minOps`, take the minimum range across both if both tied.

- Return `[minOps, minRange]`.

# Complexity
- Time complexity: $$O(n \log n)$$ — sorting the candidate list (size at most `2n`) dominates; the sliding window itself is $$O(n)$$.

- Space complexity: $$O(n)$$ — for the candidates list and coverage map.

# Code
```typescript []
const makeParityAlternating = (nums: number[]): number[] => {
    const n = nums.length;
    const getParity = (x: number) => ((x % 2) + 2) % 2;

    const countOps = (startParity: number): number =>
        nums.reduce((ops, v, i) => {
            const requiredParity = (startParity + i) % 2;
            return ops + (getParity(v) !== requiredParity ? 1 : 0);
        }, 0);

    const opsStartEven = countOps(0);
    const opsStartOdd  = countOps(1);
    const minOps = Math.min(opsStartEven, opsStartOdd);

    const computeMinRange = (startParity: number): number => {
        const choicesPerElement: number[][] = nums.map((v, i) => {
            const requiredParity = (startParity + i) % 2;
            return getParity(v) === requiredParity ? [v] : [v - 1, v + 1];
        });

        const candidates: [value: number, elementIndex: number][] = [];
        for (let i = 0; i < n; i++) {
            for (const val of choicesPerElement[i]) {
                candidates.push([val, i]);
            }
        }
        candidates.sort((a, b) => a[0] - b[0]);

        const windowCoverage = new Map<number, number>();
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
```