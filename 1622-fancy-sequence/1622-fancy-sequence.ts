const MOD = 1000000007n;

class Fancy {
    private v: number[];
    private a: bigint;
    private b: bigint;

    constructor() {
        this.v = [];
        this.a = 1n;
        this.b = 0n;
    }

    // fast exponentiation
    private quickMul(x: number, y: bigint): number {
        let ret = 1n;
        let cur = BigInt(x);
        let power = y;
        while (power !== 0n) {
            if ((power & 1n) !== 0n) {
                ret = (ret * cur) % MOD;
            }
            cur = (cur * cur) % MOD;
            power >>= 1n;
        }
        return Number(ret);
    }

    // multiplicative inverse
    private inv(x: number): number {
        return this.quickMul(x, MOD - 2n);
    }

    append(val: number): void {
        const adjustedVal =
            (((BigInt(val) - this.b + MOD) % MOD) *
                BigInt(this.inv(Number(this.a)))) %
            MOD;
        this.v.push(Number(adjustedVal));
    }

    addAll(inc: number): void {
        this.b = (this.b + BigInt(inc)) % MOD;
    }

    multAll(m: number): void {
        this.a = (this.a * BigInt(m)) % MOD;
        this.b = (this.b * BigInt(m)) % MOD;
    }

    getIndex(idx: number): number {
        if (idx >= this.v.length) {
            return -1;
        }
        const ans = (((this.a * BigInt(this.v[idx])) % MOD) + this.b) % MOD;
        return Number(ans);
    }
}