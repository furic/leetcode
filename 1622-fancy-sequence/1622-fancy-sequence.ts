class Fancy {
    private mod: bigint;
    private values: bigint[];
    private a: bigint;
    private b: bigint;

    constructor() {
        this.mod = BigInt(10 ** 9 + 7);  
        this.values = [];                
        this.a = 1n;                    
        this.b = 0n;                    
    }

    /** 
     * Helper: Modular Exponentiation (Fast Power)
     * Computes (base^exp) % mod
     */
    private power(base: bigint, exp: bigint): bigint {
        let res = 1n;
        base %= this.mod;
        while (exp > 0n) {
            if (exp % 2n === 1n) res = (res * base) % this.mod;
            base = (base * base) % this.mod;
            exp /= 2n;
        }
        return res;
    }

    /** 
     * Helper: Modular Inverse using Fermat's Little Theorem
     * Since mod is prime, a^(mod-2) % mod is the inverse.
     */
    private modInverse(n: bigint): bigint {
        return this.power(n, this.mod - 2n);
    }

    /** 
     * Appends a value to the Fancy object, adjusting it with global multiplier (a) and increment (b)
     * @param {number} val
     */
    public append(val: number): void {
        let valBI = BigInt(val);
        let invA = this.modInverse(this.a);
        let x = ((valBI - this.b + this.mod) % this.mod * invA) % this.mod;
        this.values.push(x);
    }

    /** 
     * Adds an increment to all values in the Fancy object
     * @param {number} inc
     */
    public addAll(inc: number): void {
        this.b = (this.b + BigInt(inc)) % this.mod;
    }

    /** 
     * Multiplies all values by a given number in the Fancy object
     * @param {number} m
     */
    public multAll(m: number): void {
        let mBI = BigInt(m);
        this.a = (this.a * mBI) % this.mod;
        this.b = (this.b * mBI) % this.mod;
    }

    /** 
     * Returns the value at the specified index, adjusting it with global multiplier and increment
     * @param {number} idx
     * @returns {number}
     */
    public getIndex(idx: number): number {
        if (idx >= this.values.length) 
            return -1;
        let result = (this.a * this.values[idx] + this.b) % this.mod;
        return Number(result);
    }
}

/**
 * Your Fancy object will be instantiated and called as such:
 * var obj = new Fancy()
 * obj.append(val)
 * obj.addAll(inc)
 * obj.multAll(m)
 * var param_4 = obj.getIndex(idx)
 */