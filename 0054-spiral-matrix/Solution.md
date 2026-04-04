# Peel-and-Rotate Spiral | 5 Lines | O(m×n) | 0ms

# Intuition
Instead of tracking boundaries or directions, we peel the matrix one layer at a time. Each iteration: take the top row, take the right column, then rotate the remaining matrix 180° so the next layer is again at the top and right.

# Approach
- **Peel top row:** `matrix.shift()` removes and returns the first row — spread it into `result`.
- **Peel right column:** For each remaining row, `row.pop()` removes and returns the last element — push each into `result`.
- **Rotate 180°:** `matrix.reverse()` flips row order (bottom row becomes top), then `map(row => row.reverse())` flips each row horizontally. Together, this rotates the remaining matrix 180°, bringing the next layer's top and right edges into position.
- Repeat until the matrix is empty (`matrix.length === 0`) or the first cell is `undefined` (handles empty rows after all columns are popped).
- Each full iteration peels one complete spiral layer.
- **Why 180° rotation works:** After taking top + right, the next layer to peel is bottom-left. Rotating 180° makes the bottom row become the new top and the left column become the new right — exactly what we need for the next peel.

# Complexity
- Time complexity: $$O(m \times n)$$ — every element is pushed to `result` exactly once.

- Space complexity: $$O(1)$$ extra — the matrix is mutated in place; output array is not counted.

# Code
```typescript []
const spiralOrder = (matrix: number[][]): number[] => {
    const result: number[] = [];
    while (matrix.length > 0 && matrix[0][0] !== undefined) {
        result.push(...matrix.shift());
        matrix.forEach(row => result.push(row.pop()));
        matrix.reverse().map(row => row.reverse());
    }
    return result;
};
```