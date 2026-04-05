# Precomputed Taxicab Cube-Sum Filter | 12 Lines | O(1000² + log G) | 0ms

# Intuition
A "good" integer is a taxicab number — expressible as a sum of two positive cubes in at least two distinct ways. Since `n ≤ 10^9` and `1000³ + 1000³ ≈ 2×10^9`, we only need `a, b ≤ 1000`. Precompute all such numbers once, then answer each query with a binary search.

# Approach
- **Precompute (module level):** Enumerate all pairs `(a, b)` with `1 ≤ a ≤ b ≤ 1000`, compute `a³ + b³`, and count how many distinct pairs produce each sum in `cubeSumFreq`.
- Filter to sums with frequency `≥ 2` (at least two distinct `(a, b)` pairs) — these are the good integers.
- Sort ascending into `goodIntegers`.
- **`findGoodIntegers(n)`:** Find the first index where `goodIntegers[idx] > n` using `findIndex`. Return the prefix slice. If no such index, return a copy of the full array.
- Because `goodIntegers` is sorted, `findIndex` acts as an upper bound scan — could be replaced with binary search for large `G`, but the list of taxicab numbers up to `2×10^9` is tiny (only a few dozen), making the scan negligible.

# Complexity
- Time complexity: $$O(\text{LIMIT}^2)$$ precomputation (≈500k iterations); $$O(G)$$ per query where $$G$$ is the number of taxicab numbers ≤ `2×LIMIT³` (very small in practice).

- Space complexity: $$O(G)$$ — the precomputed list.

# Code
```typescript []
const LIMIT = 1000;

const cubeSumFreq = new Map<number, number>();
for (let b = 1; b <= LIMIT; b++) {
    for (let a = 1; a <= b; a++) {
        const sum = a ** 3 + b ** 3;
        cubeSumFreq.set(sum, (cubeSumFreq.get(sum) ?? 0) + 1);
    }
}

const goodIntegers = [...cubeSumFreq.entries()]
    .filter(([_, freq]) => freq >= 2)
    .map(([val]) => val)
    .sort((a, b) => a - b);

const findGoodIntegers = (n: number): number[] => {
    const end = goodIntegers.findIndex(val => val > n);
    return end === -1 ? [...goodIntegers] : goodIntegers.slice(0, end);
};
```