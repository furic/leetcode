# Lazy Global Transform with Modular Inverse | 28 Lines | O(log MOD) per op | 189ms

# Intuition
Instead of updating every element on `addAll` and `multAll`, maintain a global linear transform `f(x) = globalMult × x + globalAdd` that represents all pending operations. Each stored value is saved in a "normalised" form that, when the transform is applied at `getIndex` time, yields the correct result.

# Approach
- **Global transform:** At any point, the true value of a stored element `v` is `globalMult × v + globalAdd (mod MOD)`. All `addAll` and `multAll` calls update only these two scalars.
  - `addAll(inc)`: `globalAdd += inc`
  - `multAll(m)`: both `globalMult` and `globalAdd` scale by `m` (since `m × (mult × x + add) = (m×mult) × x + (m×add)`)
- **`append(val)`:** The new element should currently appear as `val`. We need to store a normalised value `v` such that `globalMult × v + globalAdd ≡ val`. Solving: `v = (val - globalAdd) × globalMult⁻¹ (mod MOD)`. We use Fermat's little theorem to compute the modular inverse: `x⁻¹ ≡ x^(MOD-2) (mod MOD)` (valid since MOD is prime).
- **`getIndex(idx)`:** Return `(globalMult × storedValues[idx] + globalAdd) % MOD`, or `-1` if out of bounds.
- All arithmetic is done in `BigInt` to avoid JavaScript's 53-bit integer precision limit with large modular multiplications.
- Each `append` costs O(log MOD) for the modular inverse via fast exponentiation; `addAll`, `multAll`, and `getIndex` are all O(1).

# Complexity
- Time complexity: $$O(\log \text{MOD})$$ per `append` (modular inverse); $$O(1)$$ per `addAll`, `multAll`, `getIndex`.

- Space complexity: $$O(n)$$ — one stored value per appended element.

# Code
```typescript []
class Fancy {
    private readonly MOD = 1_000_000_007n;
    private readonly storedValues: bigint[] = [];
    private globalMult = 1n;
    private globalAdd  = 0n;

    private power(base: bigint, exp: bigint): bigint {
        let result = 1n;
        base %= this.MOD;
        while (exp > 0n) {
            if (exp % 2n === 1n) result = result * base % this.MOD;
            base = base * base % this.MOD;
            exp /= 2n;
        }
        return result;
    }

    private modInverse(x: bigint): bigint {
        return this.power(x, this.MOD - 2n);
    }

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
```