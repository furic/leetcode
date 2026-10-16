// Range-add / range-sum Fenwick tree (two-BIT trick)
class BIT {
    private readonly size: number;
    private readonly deltaTree: Float64Array;    // sums of d
    private readonly weightedTree: Float64Array; // sums of index * d

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
        index += 1; // shift to 1-based
        const oneBased = index;
        while (index <= this.size) {
            this.deltaTree[index] += delta;
            this.weightedTree[index] += oneBased * delta;
            index += index & -index;
        }
    }

    private prefixSum(index: number): number {
        index += 1; // shift to 1-based
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

    // bit position s holds distinct(A[s..i]) for the current i
    let sumOfSquares = 0n; // sum of distinct² over all subarrays ending at i
    let total = 0n;

    for (let i = 0; i < n; i++) {
        // Starts in [from, i-1] gain a new distinct value; start i is a new subarray
        const from = (lastSeen.get(A[i]) ?? -1) + 1;
        const distinctSum = BigInt(bit.query(from, i));

        // (d + 1)² - d² = 2d + 1, summed over the affected starts, plus the new start's 1
        sumOfSquares = (sumOfSquares + distinctSum * 2n + BigInt(i - from + 1)) % MOD;
        total = (total + sumOfSquares) % MOD;

        bit.add(from, i, 1);
        lastSeen.set(A[i], i);
    }

    return Number(total);
};