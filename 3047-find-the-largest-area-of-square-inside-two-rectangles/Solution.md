# All-Pairs Intersection Check | 37 Lines | O(n²) | 167ms

# Intuition

A square can only fit in the intersection of rectangles. Check all pairs of rectangles, compute their intersection, and find the largest square that fits (limited by the smaller dimension of the intersection).

# Approach

**Rectangle Intersection:**
- Two rectangles intersect if their ranges overlap in both x and y
- Intersection bounds:
  - Left = max(left₁, left₂)
  - Right = min(right₁, right₂)
  - Bottom = max(bottom₁, bottom₂)
  - Top = min(top₁, top₂)
- Valid if left < right AND bottom < top

**Square in Intersection:**
- Intersection dimensions: width × height
- Largest square side = min(width, height)
- Area = side²

**Example: bottomLeft=[[1,1],[2,2],[3,1]], topRight=[[3,3],[4,4],[6,6]]**

Pairs:
- (0,1): intersection [2,2]×[3,3] → 1×1 square, area=1 ✓
- (0,2): intersection [3,1]×[3,3] → 0×2 (no width), invalid
- (1,2): intersection [3,2]×[4,4] → 1×2 → square 1×1, area=1

Maximum: 1 ✓

# Complexity

- Time complexity: $$O(n^2)$$
  - Check all pairs: C(n,2) = n(n-1)/2
  - Per pair: O(1) intersection calculation
  - Overall: O(n²)

- Space complexity: $$O(1)$$
  - Only scalar variables
  - No additional data structures

# Code
```typescript []
const largestSquareArea = (bottomLeft: number[][], topRight: number[][]): number => {
    const numRectangles = bottomLeft.length;
    let maxSquareArea = 0;

    for (let firstRectIndex = 0; firstRectIndex < numRectangles - 1; firstRectIndex++) {
        for (let secondRectIndex = firstRectIndex + 1; secondRectIndex < numRectangles; secondRectIndex++) {
            const intersectionLeft = Math.max(
                bottomLeft[firstRectIndex][0], 
                bottomLeft[secondRectIndex][0]
            );
            
            const intersectionRight = Math.min(
                topRight[firstRectIndex][0], 
                topRight[secondRectIndex][0]
            );
            
            const intersectionBottom = Math.max(
                bottomLeft[firstRectIndex][1], 
                bottomLeft[secondRectIndex][1]
            );
            
            const intersectionTop = Math.min(
                topRight[firstRectIndex][1], 
                topRight[secondRectIndex][1]
            );
            
            if (intersectionLeft < intersectionRight && intersectionBottom < intersectionTop) {
                const intersectionWidth = intersectionRight - intersectionLeft;
                const intersectionHeight = intersectionTop - intersectionBottom;
                
                const squareSide = Math.min(intersectionWidth, intersectionHeight);
                const squareArea = squareSide ** 2;
                
                maxSquareArea = Math.max(maxSquareArea, squareArea);
            }
        }
    }

    return maxSquareArea;
};
```