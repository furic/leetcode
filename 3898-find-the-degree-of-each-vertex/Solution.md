# Row Sum Degree Count | 1 Line | O(n²) | 0ms

# Intuition
In an adjacency matrix, each row `i` contains a `1` for every neighbour of vertex `i`. The degree of vertex `i` is simply the sum of row `i`.

# Approach
- Map each row to its sum using `reduce`. Since `matrix[i][i] = 0` always, the diagonal never contributes — the row sum is exactly the degree.

# Complexity
- Time complexity: $$O(n^2)$$ — summing all `n` rows of length `n`.

- Space complexity: $$O(n)$$ — for the output array.

# Code
```typescript []
const findDegrees = (matrix: number[][]): number[] =>
    matrix.map((row) => row.reduce((sum, v) => sum + v, 0));
```