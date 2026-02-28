# BigInt Shift and Accumulate | 7 Lines | O(n log n) | 756ms

# Intuition
Concatenating binary strings is equivalent to shifting the accumulated result left by the bit length of the next number, then adding that number. We apply modular arithmetic at each step to keep the value bounded.

# Approach
- Use `BigInt` throughout to avoid JavaScript's 32-bit integer limit on bitwise operations and to handle modular arithmetic precisely with `MOD = 1_000_000_007n`.
- Iterate `i` from `1` to `n`:
  - Compute `bitLength` — the number of binary digits in `i` — using `i.toString(2).length`. This tells us how far left to shift the accumulated result to make room for `i`.
  - Update: `result = ((result << bitLength) + i) % MOD`.
    - `result << bitLength` shifts the current concatenated value left by exactly as many bits as `i` occupies.
    - Adding `i` fills those newly vacated low bits with `i`'s binary representation.
    - Modulo is applied immediately to keep `result` manageable.
- Convert the final `BigInt` result back to a regular `Number` before returning.
- `bitLength` only increases at powers of 2 (i.e., when `i` is `1, 2, 4, 8, ...`), so the shift amount stays constant between those boundaries — but we recompute it each iteration for simplicity.

# Complexity
- Time complexity: $$O(n \log n)$$ — `n` iterations, each with a `toString(2)` call that takes $$O(\log i)$$ time.

- Space complexity: $$O(\log n)$$ — for the intermediate BigInt string representation per iteration.

# Code
```typescript []
const concatenatedBinary = (n: number): number => {
    const MOD = 1_000_000_007n;
    let result = 0n;

    for (let i = 1n; i <= BigInt(n); i++) {
        const bitLength = BigInt(i.toString(2).length);
        result = ((result << bitLength) + i) % MOD;
    }

    return Number(result);
};
```