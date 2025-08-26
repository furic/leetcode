# Linear Scan Comparison | 14 Lines | O(n) | 0ms

# Intuition
We need to find the rectangle with the longest diagonal, and in case of ties, return the one with maximum area. The diagonal length of a rectangle with dimensions length×width is √(length² + width²). Since we only need to compare diagonal lengths, we can work with the squared values to avoid expensive square root calculations. We iterate through all rectangles, tracking both the longest diagonal and corresponding area.

# Approach
I'll use a single-pass comparison approach with optimization:

1. **Avoid Square Root**: Instead of calculating √(length² + width²), use length² + width² for comparison. This preserves ordering while avoiding floating-point operations.

2. **Track Best Results**: Maintain two variables:
   - `longestDiagonalSquared`: the squared length of the longest diagonal seen so far
   - `bestArea`: the area of the best rectangle (longest diagonal, or largest area in case of tie)

3. **Update Logic**: For each rectangle, update the best results if:
   - Current diagonal is longer than the longest seen, OR
   - Current diagonal equals the longest seen AND current area is larger

4. **Tie-Breaking**: When diagonal lengths are equal, choose the rectangle with larger area. This handles the tie-breaking requirement automatically.

This approach efficiently handles both the primary criterion (longest diagonal) and the tie-breaking criterion (maximum area) in a single pass.

# Complexity
- Time complexity: $$O(n)$$
  - Single iteration through all n rectangles
  - Each rectangle processed with constant-time operations (multiplication, comparison)
  - No nested loops or complex computations

- Space complexity: $$O(1)$$
  - Only using a constant number of variables regardless of input size
  - No additional data structures that scale with the number of rectangles
  - All operations performed with fixed memory usage

# Code
```typescript []
const areaOfMaxDiagonal = (dimensions: number[][]): number => {
    let bestArea = 0;
    let longestDiagonalSquared = 0;

    for (let rectIndex = 0; rectIndex < dimensions.length; rectIndex++) {
        const length = dimensions[rectIndex][0];
        const width = dimensions[rectIndex][1];
        const currentDiagonalSquared = length * length + width * width;
        const currentArea = length * width;

        if (currentDiagonalSquared > longestDiagonalSquared || 
           (currentDiagonalSquared === longestDiagonalSquared && currentArea > bestArea)) {
            longestDiagonalSquared = currentDiagonalSquared;
            bestArea = currentArea;
        }
    }

    return bestArea;
};
```