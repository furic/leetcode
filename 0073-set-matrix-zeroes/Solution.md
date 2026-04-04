# Two-Pass Row/Col Marker | 14 Lines | O(m×n) | 1ms

# Intuition
We can't zero rows/columns as we find zeros — that would corrupt our scan. Instead, collect which rows and columns need zeroing in a first pass, then apply them in a second pass.

# Approach
- **First pass:** Scan every cell. When a `0` is found, mark `zeroRows[row] = true` and `zeroCols[col] = true`.
- **Second pass:** For every cell, set it to `0` if its row or column is marked.
- The two passes avoid the "false zero" problem where a zeroed cell in the first pass would incorrectly mark additional rows/columns.

# Complexity
- Time complexity: $$O(m \times n)$$ — two full matrix scans.

- Space complexity: $$O(m + n)$$ — two boolean marker arrays. Can be reduced to $$O(1)$$ by using the first row and column of the matrix itself as markers (with an extra flag for whether the first row/column themselves need zeroing), but this solution prioritises clarity.

# Code
```typescript []
const setZeroes = (matrix: number[][]): void => {
    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    const zeroRows: boolean[] = Array(rowCount).fill(false);
    const zeroCols: boolean[] = Array(colCount).fill(false);

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (matrix[row][col] === 0) {
                zeroRows[row] = true;
                zeroCols[col] = true;
            }
        }
    }

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (zeroRows[row] || zeroCols[col]) {
                matrix[row][col] = 0;
            }
        }
    }
};
```