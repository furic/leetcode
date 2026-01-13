# Binary Search on Y-Coordinate | 39 Lines | O(n log(max_y)) | 320ms

# Intuition

We need a horizontal line where area below equals area above. Since area changes monotonically with y-coordinate (more area below as y increases), we can use binary search to find the exact y-coordinate where areas are balanced.

# Approach

**Binary Search Setup:**
- Search space: [0, max y-coordinate of all squares]
- Target: y where area below = totalArea/2
- Precision: Continue until difference < 10⁻⁵

**Area Calculation:**
For line at height y, calculate area below:
- For each square at (x, y_bottom, side):
  - If y_bottom ≥ y: contributes 0 (entirely above)
  - If y_bottom < y:
    - Height below = min(y - y_bottom, side)
    - Area = side × height_below

**Binary Search Logic:**
- If area below ≥ half: too much below, move line down (decrease y)
- If area below < half: not enough below, move line up (increase y)

**Example: squares=[[0,0,2],[1,1,1]]**

Total area = 2² + 1² = 5

Try y=1.5:
- Square [0,0,2]: height below = min(1.5-0, 2) = 1.5, area = 2×1.5 = 3
- Square [1,1,1]: height below = min(1.5-1, 1) = 0.5, area = 1×0.5 = 0.5
- Total below = 3.5 > 2.5 → too much, decrease y

Try y=1.16667:
- Square [0,0,2]: area = 2×1.16667 ≈ 2.333
- Square [1,1,1]: area = 1×0.16667 ≈ 0.167
- Total ≈ 2.5 ✓

# Complexity

- Time complexity: $$O(n \log(\text{max}_y / \epsilon))$$
  - n = number of squares
  - Binary search iterations: O(log(max_y/ε)) where ε=10⁻⁵
  - Per iteration: O(n) to calculate area
  - Overall: O(n log(max_y))

- Space complexity: $$O(1)$$
  - Only scalar variables
  - No additional data structures

# Code
```typescript []
const separateSquares = (squares: number[][]): number => {
    let maxYCoordinate = 0;
    let totalArea = 0;
    
    for (const [x, y, sideLength] of squares) {
        totalArea += sideLength * sideLength;
        maxYCoordinate = Math.max(maxYCoordinate, y + sideLength);
    }

    const hasEnoughAreaBelow = (horizontalLineY: number): boolean => {
        let areaBelowLine = 0;
        
        for (const [x, y, sideLength] of squares) {
            if (y < horizontalLineY) {
                const heightBelowLine = Math.min(horizontalLineY - y, sideLength);
                const areaBelowFromThisSquare = sideLength * heightBelowLine;
                areaBelowLine += areaBelowFromThisSquare;
            }
        }
        
        return areaBelowLine >= totalArea / 2;
    };

    const PRECISION_THRESHOLD = 1e-5;
    let lowerBound = 0;
    let upperBound = maxYCoordinate;
    
    while (Math.abs(upperBound - lowerBound) > PRECISION_THRESHOLD) {
        const candidateY = (upperBound + lowerBound) / 2;
        
        if (hasEnoughAreaBelow(candidateY)) {
            upperBound = candidateY;
        } else {
            lowerBound = candidateY;
        }
    }
    
    return upperBound;
};
```