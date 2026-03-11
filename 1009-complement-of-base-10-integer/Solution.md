# Bitmask XOR Complement | 5 Lines | O(1) | 0ms

# Intuition
Flipping all bits of `n` within its binary width is equivalent to XORing with a mask of all `1`s of the same length. We just need to construct that mask dynamically based on `n`'s bit length.

# Approach
- **Edge case:** `n === 0` has no set bits, so `Math.log2(0)` is `-Infinity` — handle it directly by returning `1` (complement of `"0"` is `"1"`).
- Compute `bitLength = floor(log2(n)) + 1` — the number of bits in `n`'s binary representation.
- Construct `allOnesMask = (1 << bitLength) - 1` — a number with exactly `bitLength` ones (e.g. `bitLength = 3` → `0b111 = 7`).
- XOR `n` with the mask: every `1` bit in `n` becomes `0`, every `0` bit becomes `1`, within the exact width of `n`. Bits above `bitLength` are untouched (they're `0` in both `n` and the mask).

# Complexity
- Time complexity: $$O(1)$$ — all operations are constant-time arithmetic and bitwise.

- Space complexity: $$O(1)$$ — no extra storage.

# Code
```typescript []
const bitwiseComplement = (n: number): number => {
    if (n === 0) return 1;

    const bitLength = Math.floor(Math.log2(n)) + 1;
    const allOnesMask = (1 << bitLength) - 1;

    return n ^ allOnesMask;
};
```