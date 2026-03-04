# Row and Column Count Precompute | 12 Lines | O(m×n) | 0ms

# Intuition
A special position requires exactly one `1` in its entire row and column. Rather than scanning the full row and column for every `1` we encounter (which would be O(m×n×(m+n))), we precompute row and column sums once, then check in O(1) per cell.

# Approach
- Build `rowOnes[i]` and `colOnes[j]` by doing a single pass over the matrix, counting `1`s per row and per column respectively.
- Do a second pass: for every cell `(i, j)` where `mat[i][j] === 1`, check if `rowOnes[i] === 1` and `colOnes[j] === 1`. If both hold, this is a special position — increment `specialCount`.
- The two-pass structure keeps the logic clean and each pass is O(m×n).
- We only need to check cells that are already `1` for the special condition, so no redundant checks on zero cells.

# Complexity
- Time complexity: $$O(m \times n)$$ — two full matrix passes.

- Space complexity: $$O(m + n)$$ — for the `rowOnes` and `colOnes` arrays.

# Code
```typescript []
const numSpecial = (mat: number[][]): number => {
    const rowCount = mat.length;
    const colCount = mat[0].length;
    const rowOnes = new Array(rowCount).fill(0);
    const colOnes = new Array(colCount).fill(0);

    for (let i = 0; i < rowCount; i++)
        for (let j = 0; j < colCount; j++)
            if (mat[i][j] === 1) { rowOnes[i]++; colOnes[j]++; }

    let specialCount = 0;
    for (let i = 0; i < rowCount; i++)
        for (let j = 0; j < colCount; j++)
            if (mat[i][j] === 1 && rowOnes[i] === 1 && colOnes[j] === 1) specialCount++;

    return specialCount;
};
```