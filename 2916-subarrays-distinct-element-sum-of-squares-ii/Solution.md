# Range-Add BIT Distinct Square Sum | 55 Lines | O(n log n) | 102ms

# Intuition
Sweep the right endpoint `i` and keep, for every start `s`, the distinct count of `nums[s..i]`. When `nums[i]` arrives, every start in `[lastSeen + 1, i]` gains exactly one new distinct value, so a range-add Fenwick tree maintains those counts. The sum of squares over all subarrays ending at `i` then updates incrementally: `(d + 1)² - d² = 2d + 1` per affected start.

# Approach
- **Range-add / range-sum BIT:** Two Fenwick trees (`deltaTree`, `weightedTree`) support `add(l, r, delta)` and `query(l, r)` in O(log n), using the standard prefix formula `(idx + 1) * Σdelta - Σ(idx * delta)`.
- **Per right endpoint `i`:**
  - `from = lastSeen[nums[i]] + 1`: starts in `[from, i]` are the ones where `nums[i]` is a new distinct value (start `i` is the brand-new subarray with distinct count 0 before this step).
  - `distinctSum = bit.query(from, i)`: sum of the old distinct counts `d` over those starts.
  - `sumOfSquares += 2 * distinctSum + (i - from + 1)`: the `Σ(2d + 1)` increase across the affected starts. Starts before `from` are unchanged.
  - Add `sumOfSquares` (sum of squared distinct counts of all subarrays ending at `i`) into `total`.
- **Update state:** `bit.add(from, i, 1)` and `lastSeen[nums[i]] = i`.
- Use `BigInt` for the modular accumulators to avoid precision loss; BIT values stay small (≤ n²) and fit exactly in `Float64Array`.

# Complexity
- Time complexity: $$O(n \log n)$$ — each element does one range query and one range update on the BIT.

- Space complexity: $$O(n)$$ — two BIT arrays and the `lastSeen` map.

# Code
```typescript []
class BIT {
    private readonly size: number;
    private readonly deltaTree: Float64Array;
    private readonly weightedTree: Float64Array;

    constructor(n: number) {
        this.size = n;
        this.deltaTree = new Float64Array(n + 2);
        this.weightedTree = new Float64Array(n + 2);
    }

    add(left: number, right: number, delta: number): void {
        this.pointAdd(left, delta);
        this.pointAdd(right + 1, -delta);
    }

    query(left: number, right: number): number {
        return this.prefixSum(right) - this.prefixSum(left - 1);
    }

    private pointAdd(index: number, delta: number): void {
        index += 1;
        const oneBased = index;
        while (index <= this.size) {
            this.deltaTree[index] += delta;
            this.weightedTree[index] += oneBased * delta;
            index += index & -index;
        }
    }

    private prefixSum(index: number): number {
        index += 1;
        const multiplier = index + 1;
        if (index > this.size) index = this.size;

        let sum = 0;
        while (index > 0) {
            sum += multiplier * this.deltaTree[index] - this.weightedTree[index];
            index -= index & -index;
        }
        return sum;
    }
}

const sumCounts = (A: number[]): number => {
    const MOD = 1_000_000_007n;
    const n = A.length;
    const bit = new BIT(n + 10);
    const lastSeen = new Map<number, number>();

    let sumOfSquares = 0n;
    let total = 0n;

    for (let i = 0; i < n; i++) {
        const from = (lastSeen.get(A[i]) ?? -1) + 1;
        const distinctSum = BigInt(bit.query(from, i));

        sumOfSquares = (sumOfSquares + distinctSum * 2n + BigInt(i - from + 1)) % MOD;
        total = (total + sumOfSquares) % MOD;

        bit.add(from, i, 1);
        lastSeen.set(A[i], i);
    }

    return Number(total);
};
```