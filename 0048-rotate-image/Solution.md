# Transpose Then Row Reverse | 8 Lines | O(n²) | 1ms

# Intuition
A 90° clockwise rotation equals a transpose followed by a horizontal flip of each row. Both operations are in-place and together achieve the rotation without allocating a new matrix.

# Approach
- **Transpose:** Swap `matrix[r][c]` with `matrix[c][r]` for all `r > c` (lower triangle only, to avoid swapping back).
- **Reverse each row:** Swap `matrix[r][c]` with `matrix[r][n-1-c]` for `c < n/2`.

# Complexity
- Time complexity: $$O(n^2)$$ — two passes over half the matrix each.

- Space complexity: $$O(1)$$ — all swaps are in-place.

# Code
```typescript []
const rotate = (matrix: number[][]): void => {
    const n = matrix.length;

    for (let r = 0; r < n; r++)
        for (let c = 0; c < r; c++)
            [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];

    for (let r = 0; r < n; r++)
        for (let c = 0; c < Math.floor(n / 2); c++)
            [matrix[r][c], matrix[r][n - 1 - c]] = [matrix[r][n - 1 - c], matrix[r][c]];
};
```