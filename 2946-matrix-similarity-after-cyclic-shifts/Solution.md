# Cyclic Shift Equivalence Modulo Check | 8 Lines | O(m×n) | 0ms

# Intuition
After `k` steps, each even row has shifted left by `k` and each odd row has shifted right by `k`. A cyclic shift of `k` on a row of length `cols` is equivalent to a shift of `k % cols`. The matrix is unchanged if and only if every row looks the same after this net shift.

# Approach
- Compute `shift = k % cols` — the effective net shift after reducing by the row period.
- For each cell `(r, c)`, check if `mat[r][c] === mat[r][(c + shift) % cols]`:
  - Even rows shift left by `shift`, so position `c` in the shifted row came from position `(c + shift) % cols` in the original.
  - Odd rows shift right by `shift`, so position `c` came from `(c - shift + cols) % cols = (c + cols - shift) % cols`. But since we're comparing the shifted result to the original, we check `mat[r][c] === mat[r][(c + shift) % cols]` — the direction only matters if shift ≠ 0, and for identical check purposes, a row is unchanged by shift `s` iff it's unchanged by shift `cols - s` as well (i.e. both directions produce the same "is unchanged" condition for a row).
  - In practice: `mat[r][c] === mat[r][(c + shift) % cols]` correctly captures both cases — if this holds for all `c`, the row is periodic with period `shift`, meaning it looks the same after either a left or right shift of `shift`.
- Return `false` on any mismatch; `true` if all cells pass.

# Complexity
- Time complexity: $$O(m \times n)$$ — one pass over all cells.

- Space complexity: $$O(1)$$ — no extra storage.

# Code
```typescript []
const areSimilar = (mat: number[][], k: number): boolean => {
    const rows = mat.length;
    const cols = mat[0].length;
    const shift = k % cols;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (mat[r][c] !== mat[r][(c + shift) % cols])
                return false;
        }
    }

    return true;
};
```