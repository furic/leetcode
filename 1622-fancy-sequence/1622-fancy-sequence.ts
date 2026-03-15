class Fancy {
    private readonly MOD = 1_000_000_007n;
    private readonly storedValues: bigint[] = [];
    private globalMult = 1n; // Tracks the cumulative multiplier applied after each element was appended
    private globalAdd  = 0n; // Tracks the cumulative addend applied after each element was appended

    // Computes base^exp % MOD via fast exponentiation
    private power(base: bigint, exp: bigint): bigint {
        let result = 1n;
        base %= this.MOD;
        while (exp > 0n) {
            if (exp & 1n) result = result * base % this.MOD;
            base = base * base % this.MOD;
            exp >>= 1n;
        }
        return result;
    }

    // Fermat's little theorem: inverse of x is x^(MOD-2) % MOD (valid since MOD is prime)
    private modInverse(x: bigint): bigint {
        return this.power(x, this.MOD - 2n);
    }

    // Normalise val so that applying globalMult/globalAdd later recovers the correct value
    append(val: number): void {
        const normalised = (BigInt(val) - this.globalAdd + this.MOD) % this.MOD * this.modInverse(this.globalMult) % this.MOD;
        this.storedValues.push(normalised);
    }

    addAll(inc: number): void {
        this.globalAdd = (this.globalAdd + BigInt(inc)) % this.MOD;
    }

    multAll(m: number): void {
        const factor = BigInt(m);
        this.globalMult = this.globalMult * factor % this.MOD;
        this.globalAdd  = this.globalAdd  * factor % this.MOD;
    }

    getIndex(idx: number): number {
        if (idx >= this.storedValues.length) return -1;
        return Number(
            (this.globalMult * this.storedValues[idx] + this.globalAdd) % this.MOD
        );
    }
}