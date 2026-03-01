# Greedy Bit Elimination | 10 Lines | O(m × n × 17) | 4ms

# Intuition
We want the smallest possible OR result. Since OR can only set bits (never clear them), we should try to keep as few bits set as possible. We can greedily attempt to turn off each bit from most significant to least significant — if removing a bit from the candidate OR still allows every row to contribute a valid selection, we eliminate it permanently.

# Approach
- Start with `minOR = (1 << 17) - 1` — all 17 bits set, representing the most permissive upper bound (values are bounded by the grid constraints).
- Iterate from bit `16` down to bit `0` (MSB to LSB, greedy high-value eliminations first):
  - Compute `candidate = minOR ^ (1 << bit)` — tentatively turn off this bit.
  - Check feasibility: for **every row**, does **at least one cell** fit within `candidate`'s allowed bits? A cell `c` fits if `(c | candidate) === candidate`, meaning `c` introduces no bits outside of `candidate` — i.e., `c` is a subset of `candidate`'s bits.
  - If every row has at least one qualifying cell, this bit is unnecessary — commit by setting `minOR = candidate`.
  - Otherwise, this bit must remain set; leave `minOR` unchanged.
- After processing all bits, `minOR` is the minimum achievable OR.
- Greedy correctness holds because bits are independent in OR — eliminating a higher bit never affects whether a lower bit can be eliminated, and we always prefer eliminating higher-value bits first.

# Complexity
- Time complexity: $$O(m \times n \times 17)$$ — 17 bit iterations, each scanning all `m × n` cells.

- Space complexity: $$O(1)$$ — no auxiliary data structures.

# Code
```typescript []
const minimumOR = (grid: number[][]): number => {
    let minOR = (1 << 17) - 1;

    for (let bit = 16; bit >= 0; bit--) {
        const candidate = minOR ^ (1 << bit);

        const everyRowHasFit = grid.every(row =>
            row.some(cell => (cell | candidate) === candidate)
        );

        if (everyRowHasFit) minOR = candidate;
    }

    return minOR;
};
```