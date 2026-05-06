# Gravity + 90° Rotation Combined | 18 Lines | O(m×n) | 12ms

# Intuition
Stones fall right (gravity after rotation = fall toward original right edge), then the whole grid rotates 90° clockwise. We can combine both steps in one pass: simulate gravity while writing directly into the rotated output positions.

# Approach
- Allocate a `cols × rows` result matrix filled with `'.'`.
- For each row `r` in the original grid, scan right to left. Track `nextStonePos` (where the next stone lands — starts at `cols - 1`, moves left as stones stack):
  - **Stone `'#'`:** Place it at `result[nextStonePos][rows - 1 - r]` (rotated position), then decrement `nextStonePos`.
  - **Obstacle `'*'`:** Place it at `result[c][rows - 1 - r]` (fixed position), then reset `nextStonePos = c - 1` (stones above this obstacle can't fall past it).
  - **Empty `'.'`:** Skip — already filled with `'.'`.
- **Coordinate mapping for 90° clockwise rotation:** Original `(r, c)` maps to `(c, rows - 1 - r)` in the output.

# Complexity
- Time complexity: $$O(m \times n)$$ — one pass over all cells.

- Space complexity: $$O(m \times n)$$ — for the result matrix.

# Code
```typescript []
const rotateTheBox = (boxGrid: string[][]): string[][] => {
    const rows = boxGrid.length;
    const cols = boxGrid[0].length;
    const result: string[][] = Array.from({ length: cols }, () => Array(rows).fill('.'));

    for (let r = 0; r < rows; r++) {
        let nextStonePos = cols - 1;

        for (let c = cols - 1; c >= 0; c--) {
            if (boxGrid[r][c] === '#') {
                result[nextStonePos][rows - 1 - r] = '#';
                nextStonePos--;
            } else if (boxGrid[r][c] === '*') {
                result[c][rows - 1 - r] = '*';
                nextStonePos = c - 1;
            }
        }
    }

    return result;
};
```