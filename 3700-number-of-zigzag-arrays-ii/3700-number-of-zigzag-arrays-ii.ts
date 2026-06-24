const MOD = 1_000_000_007n;

class Matrix {
    readonly data: BigInt64Array;

    constructor(
        readonly rows: number,
        readonly cols: number,
    ) {
        this.data = new BigInt64Array(rows * cols);
    }

    get(r: number, c: number): bigint {
        return this.data[r * this.cols + c];
    }

    set(r: number, c: number, val: bigint): void {
        this.data[r * this.cols + c] = val;
    }

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

    // Multiply result by this^exp (modular matrix exponentiation)
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

    // Transition matrix: u[i][j+range] = 1 if j < i (can go down from i)
    //                    u[i+range][j] = 1 if j > i (can go up from i)
    const transition = new Matrix(size, size);
    for (let i = 0; i < range; i++) {
        for (let j = 0; j < i; j++)          transition.set(i, j + range, 1n);
        for (let j = i + 1; j < range; j++)  transition.set(i + range, j, 1n);
    }

    // Initial state: all positions reachable
    let dp = new Matrix(1, size);
    for (let i = 0; i < size; i++) dp.set(0, i, 1n);

    dp = transition.powMul(BigInt(n - 1), dp);

    let total = 0n;
    for (let i = 0; i < size; i++) total = (total + dp.get(0, i)) % MOD;

    return Number(total);
};