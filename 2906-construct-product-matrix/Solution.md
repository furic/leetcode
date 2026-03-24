# 2D Prefix-Suffix Product Two-Pass | 16 Lines | O(m×n) | 73ms

# Intuition
This is the 2D extension of the classic "product of array except self" problem. By linearising the matrix in row-major order, we can apply the same two-pass prefix/suffix product technique — the result at each cell is the product of everything before it (prefix) multiplied by everything after it (suffix).

# Approach
- **Pass 1 (suffix, right-to-left in row-major order):** Traverse from `(rows-1, cols-1)` back to `(0,0)`. Store the running `suffixProduct` into `result[r][c]`, then multiply `suffixProduct` by `grid[r][c]`. After this pass, `result[r][c]` holds the product of all elements strictly after `(r,c)` in row-major order.
- **Pass 2 (prefix, left-to-right in row-major order):** Traverse from `(0,0)` to `(rows-1, cols-1)`. Multiply `result[r][c]` by the running `prefixProduct` (product of all elements strictly before `(r,c)`), then update `prefixProduct` with `grid[r][c]`.
- After both passes, `result[r][c] = prefix × suffix = product of all except grid[r][c]`, all modulo `12345`.
- Modulo is applied at every multiplication step to prevent overflow.

# Complexity
- Time complexity: $$O(m \times n)$$ — two linear passes over all cells.

- Space complexity: $$O(1)$$ extra — the output `result` array is the only allocation; two scalar product variables are used.

# Code
```typescript []
const constructProductMatrix = (grid: number[][]): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;
    const MOD = 12345;

    const result: number[][] = Array(rows).fill(0).map(() => Array(cols).fill(0));

    let suffixProduct = 1;
    for (let r = rows - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 0; c--) {
            result[r][c] = suffixProduct;
            suffixProduct = suffixProduct * grid[r][c] % MOD;
        }
    }

    let prefixProduct = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            result[r][c] = result[r][c] * prefixProduct % MOD;
            prefixProduct = prefixProduct * grid[r][c] % MOD;
        }
    }

    return result;
};
```