# All-Pairs Gap Matching | 38 Lines | O((h+m)² + (v+n)²) | 313ms

# Intuition

A square field requires equal horizontal and vertical gaps. Instead of just consecutive removals, we can remove any subset of fences to create gaps. Find all possible gaps in each direction, then find the largest gap that exists in both.

# Approach

**Key Difference from Previous Problem:**
- Can remove non-consecutive fences
- Need to check all possible gaps between any two fence positions
- Square requires a gap size that exists in both directions

**Algorithm:**
1. Add boundaries (1 and m/n) to fence arrays and sort
2. Generate all horizontal gaps: distance between any two horizontal positions
3. For each vertical gap, check if it exists as a horizontal gap
4. Track maximum common gap size
5. Return area = side² mod 10⁹+7

**Example: m=4, n=3, hFences=[2,3], vFences=[2]**

Horizontal positions: [1,2,3,4]
- Gaps: {1,2,3} (1-2, 1-3, 1-4, 2-3, 2-4, 3-4)

Vertical positions: [1,2,3]
- Check gap 1: in horizontal ✓
- Check gap 2: in horizontal ✓ (largest)

Result: 2² = 4 ✓

# Complexity

- Time complexity: $$O((h+2)^2 + (v+2)^2)$$
  - h = horizontal fences, v = vertical fences
  - Sort: O(h log h + v log v)
  - All horizontal pairs: O(h²)
  - All vertical pairs: O(v²)
  - Overall: O(h² + v²)

- Space complexity: $$O(h)$$
  - Set for horizontal gaps: O(h²) worst case
  - Sorted arrays: O(h + v)

# Code
```typescript []
const maximizeSquareArea = (
    fieldHeight: number, 
    fieldWidth: number, 
    horizontalFences: number[], 
    verticalFences: number[]
): number => {
    const MOD = 1_000_000_007n;

    const addBoundariesAndSort = (fencePositions: number[], boundaryLimit: number): number[] => {
        return [1, ...fencePositions.sort((a, b) => a - b), boundaryLimit];
    };

    const horizontalPositions = addBoundariesAndSort(horizontalFences, fieldHeight);
    const verticalPositions = addBoundariesAndSort(verticalFences, fieldWidth);

    const horizontalGaps = new Set<number>();
    
    for (let startIndex = 0; startIndex < horizontalPositions.length; startIndex++) {
        for (let endIndex = startIndex + 1; endIndex < horizontalPositions.length; endIndex++) {
            const gapSize = horizontalPositions[endIndex] - horizontalPositions[startIndex];
            horizontalGaps.add(gapSize);
        }
    }

    let largestSquareSide = 0;
    
    for (let startIndex = 0; startIndex < verticalPositions.length; startIndex++) {
        for (let endIndex = startIndex + 1; endIndex < verticalPositions.length; endIndex++) {
            const gapSize = verticalPositions[endIndex] - verticalPositions[startIndex];
            
            if (gapSize > largestSquareSide && horizontalGaps.has(gapSize)) {
                largestSquareSide = gapSize;
            }
        }
    }

    if (largestSquareSide === 0) return -1;
    
    const squareArea = (BigInt(largestSquareSide) * BigInt(largestSquareSide)) % MOD;
    
    return Number(squareArea);
};
```