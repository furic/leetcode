# Submatrix Sort Adjacent Diff | 18 Lines | O(m×n×k² log k) | 7ms

# Intuition
The minimum absolute difference between any two distinct values in a set is always achieved by adjacent elements in sorted order. So for each k×k submatrix, we extract all elements, sort them, and scan adjacent pairs.

# Approach
- Allocate a reusable `Int32Array cellBuffer` of size `k²` once — avoids repeated heap allocation across all submatrix iterations.
- For each valid top-left corner `(r, c)` of a k×k submatrix:
  - Fill `cellBuffer` with all `k²` values from `grid[r..r+k-1][c..c+k-1]`.
  - Sort in-place using `TypedArray.sort()` (which sorts numerically by default, unlike `Array.sort`).
  - Scan adjacent pairs in sorted order: track the minimum difference between any two consecutive distinct values.
  - Store in `result[r][c]`. If all values are equal (or `k === 1`), `minDiff` remains `Infinity` — the result stays `0` from the initial fill.
- The note "if all elements are the same, answer is 0" is handled by the `result` array being pre-filled with `0`.

# Complexity
- Time complexity: $$O(m \times n \times k^2 \log k)$$ — $$(m-k+1)(n-k+1)$$ submatrices, each requiring $$O(k^2 \log k)$$ to fill and sort.

- Space complexity: $$O(k^2)$$ — the reused cell buffer; output array is not counted.

# Code
```typescript []
const minAbsDiff = (grid: number[][], k: number): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;
    const result = Array.from({ length: rows - k + 1 }, () =>
        new Array<number>(cols - k + 1).fill(0)
    );

    const cellBuffer = new Int32Array(k * k);

    for (let r = rows - k; r >= 0; r--) {
        for (let c = cols - k; c >= 0; c--) {
            let idx = 0;
            for (let dr = r; dr < r + k; dr++)
                for (let dc = c; dc < c + k; dc++)
                    cellBuffer[idx++] = grid[dr][dc];

            cellBuffer.sort();

            let minDiff = Infinity;
            for (let idx = 1; idx < cellBuffer.length; idx++) {
                if (cellBuffer[idx] !== cellBuffer[idx - 1])
                    minDiff = Math.min(minDiff, cellBuffer[idx] - cellBuffer[idx - 1]);
            }

            if (minDiff < Infinity) result[r][c] = minDiff;
        }
    }

    return result;
};
```