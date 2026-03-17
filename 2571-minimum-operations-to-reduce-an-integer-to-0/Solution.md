# Greedy Carry Propagation Bit Reduction | 10 Lines | O(log n) | 0ms

# Intuition
Each operation adds or subtracts a power of 2 — exactly flipping or carrying one bit. The goal is to clear all set bits in as few operations as possible. A lone `1` bit is cheapest to subtract directly, but two consecutive `1` bits (`11` in binary) are cheaper to round up (add 1 to carry them into a single higher bit) than to clear each separately.

# Approach
- Examine the lowest two bits of `n` each iteration using `n & 3`:
  - **`n & 3 === 3` (two consecutive 1s at bottom):** Rounding up (`n++`) merges them into a carry, costing 1 op. This avoids spending 2 ops clearing them individually.
  - **`n & 1 === 1` (single 1 at bit 0):** Subtract 1 (`n--`) to clear it, costing 1 op.
  - **`n & 1 === 0` (trailing zero):** Right-shift for free (`n >>= 1`) — shifting doesn't cost an operation.
- Repeat until `n === 0`.
- **Why `n & 3 === 3` first:** When the lowest two bits are both `1`, carrying is strictly better. If we instead subtracted the LSB first (clearing it), we'd still need to handle the remaining `1` bit — same cost. But carrying can sometimes collapse a chain of `1`s (e.g. `0111` → `1000`) saving multiple future operations.

# Complexity
- Time complexity: $$O(\log n)$$ — each iteration either shifts right (halving `n`) or clears/merges bits, reducing `n`'s magnitude.

- Space complexity: $$O(1)$$ — only scalar variables.

# Code
```typescript []
const minOperations = (n: number): number => {
    let ops = 0;
    while (n > 0) {
        if ((n & 3) === 3) {
            n++;
            ops++;
        } else if ((n & 1) === 1) {
            n--;
            ops++;
        } else {
            n >>= 1;
        }
    }
    return ops;
};
```