# Matrix Exponentiation ZigZag DP | 50 Lines | O(V³ log n) | 245ms

# Intuition
A ZigZag array alternates between "going down" and "going up" at each step. With `n` up to `10^9`, we can't iterate step by step — but the transition between states is linear, so matrix exponentiation reduces it to O(log n) matrix multiplications.

# Approach
- **State encoding:** Each position in the DP vector represents `(value, direction)` where direction is either "came from below" (indices `0..range-1`) or "came from above" (indices `range..2*range-1`). A value `v` "came from below" means the previous step went up to `v`, so the next step must go down (to some `j < v`). Symmetrically for "came from above."
- **Transition matrix** of size `2*range × 2*range`:
  - From state `i` (came from below, value `l + i`): can go to any `j < i` in the "came from above" half → `transition[i][j + range] = 1` for `j < i`.
  - From state `i + range` (came from above, value `l + i`): can go to any `j > i` in the "came from below" half → `transition[i + range][j] = 1` for `j > i`.
- **Initial state:** All `2 * range` positions start with count 1 (any value in either direction context is a valid single element).
- **Matrix exponentiation:** Apply the transition `n - 1` times using fast matrix power. Since `range ≤ 75`, the matrix is at most `150 × 150`, and each multiplication is O(150³) ≈ `3.4 × 10^6` operations, done O(log n) ≈ 30 times.
- Sum all entries of the final DP vector for the answer.

# Complexity
- Time complexity: $$O(V^3 \log n)$$ where $$V = 2(r - l + 1) \leq 150$$ — matrix multiplication is $$O(V^3)$$, done $$O(\log n)$$ times.

- Space complexity: $$O(V^2)$$ — for the transition matrix and intermediate results.

# Code
```typescript []
const MOD = 1_000_000_007n;

class Matrix {
    readonly data: BigInt64Array;

    constructor(readonly rows: number, readonly cols: number) {
        this.data = new BigInt64Array(rows * cols);
    }

    get(r: number, c: number): bigint { return this.data[r * this.cols + c]; }
    set(r: number, c: number, val: bigint): void { this.data[r * this.cols + c] = val; }

    mul(other: Matrix): Matrix {
        const result = new Matrix(this.rows, other.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let k = 0; k < this.cols; k++) {
                const a = this.get(i, k);
                if (a === 0n) continue;
                for (let j = 0; j < other.cols; j++)
                    result.set(i, j, (result.get(i, j) + a * other.get(k, j)) % MOD);
            }
        }
        return result;
    }

    powMul(exp: bigint, result: Matrix): Matrix {
        let base = new Matrix(this.rows, this.cols);
        base.data.set(this.data);
        while (exp > 0n) {
            if (exp & 1n) result = result.mul(base);
            base = base.mul(base);
            exp >>= 1n;
        }
        return result;
    }
}

const zigZagArrays = (n: number, l: number, r: number): number => {
    const range = r - l + 1;
    if (n === 1) return range;

    const size = 2 * range;
    const transition = new Matrix(size, size);
    for (let i = 0; i < range; i++) {
        for (let j = 0; j < i; j++)         transition.set(i, j + range, 1n);
        for (let j = i + 1; j < range; j++) transition.set(i + range, j, 1n);
    }

    let dp = new Matrix(1, size);
    for (let i = 0; i < size; i++) dp.set(0, i, 1n);

    dp = transition.powMul(BigInt(n - 1), dp);

    let total = 0n;
    for (let i = 0; i < size; i++) total = (total + dp.get(0, i)) % MOD;
    return Number(total);
};
```