# Column Height Transform + Row Sort | 11 Lines | O(m×n log n) | 44ms

# Intuition
Since columns can be freely reordered, the problem reduces to: for each row, find the largest rectangle where the height of every selected column is at least some value `h`. Sorting column heights descending lets us treat the `j`-th tallest column as contributing width `j+1` at height `colHeights[j]`.

# Approach
- **Column height transform:** Convert each cell `matrix[r][c]` into the number of consecutive `1`s ending at row `r` in column `c`. If `matrix[r][c] === 1`, add the cell above (`matrix[r-1][c]`); otherwise leave it as `0`. This is done in-place.
- **Row-by-row area computation:** For each row `r`, extract the column heights into a copy and sort descending. At sorted index `j`, `colHeights[j]` is the `(j+1)`-th tallest height. Since columns can be reordered freely, we can place the `j+1` tallest columns together — forming a rectangle of width `j+1` and height `colHeights[j]`. Track the maximum area across all `j`.
- **Why sorting works:** After sorting descending, any prefix of length `j+1` contains the `j+1` largest heights. The minimum height in that prefix is `colHeights[j]`, so the valid rectangle area is exactly `colHeights[j] × (j+1)`. We don't need to consider any wider rectangle with a smaller minimum height separately — it will be captured at a larger `j`.

# Complexity
- Time complexity: $$O(m \times n \log n)$$ — height transform is $$O(mn)$$; each row sort is $$O(n \log n)$$ for `m` rows.

- Space complexity: $$O(n)$$ — for the per-row sorted copy; height transform is in-place.

# Code
```typescript []
const largestSubmatrix = (matrix: number[][]): number => {
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let r = 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === 1) matrix[r][c] += matrix[r - 1][c];
        }
    }

    let maxArea = 0;

    for (let r = 0; r < rows; r++) {
        const colHeights = [...matrix[r]].sort((a, b) => b - a);
        for (let j = 0; j < cols; j++) {
            maxArea = Math.max(maxArea, colHeights[j] * (j + 1));
        }
    }

    return maxArea;
};
```