# [TypeScript] Pascal’s Triangle Construction | 21 Lines | O(n²) | 0ms

# Intuition
Pascal’s Triangle builds naturally by summing adjacent elements from the previous row. The first and last elements of each row are always `1`, and the inner elements are the sum of the two numbers directly above.

# Approach
Start with the first row `[1]`. For each subsequent row:
- Begin and end with `1`.
- Each inner value is calculated as the sum of two adjacent values from the previous row.

Continue this until the required number of rows (`numRows`) is generated.

# Complexity
- Time complexity:  
  $$O(n^2)$$ – each row has at most `n` elements, and we compute all `n` rows.

- Space complexity:  
  $$O(n^2)$$ – storing the entire triangle of `n` rows.

# Code
```typescript
const generate = (numRows: number): number[][] => {
    const triangle: number[][] = [[1]];

    for (let row = 1; row < numRows; row++) {
        const prevRow = triangle[row - 1];
        const newRow = [1];

        for (let i = 1; i < prevRow.length; i++) {
            newRow.push(prevRow[i - 1] + prevRow[i]);
        }

        newRow.push(1);
        triangle.push(newRow);
    }

    return triangle;
};
```