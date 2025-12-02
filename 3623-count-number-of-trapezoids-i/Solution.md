# Segment Pair Counting | 15 Lines | O(n) | 60ms

# Intuition
A horizontal trapezoid has at least one pair of horizontal parallel sides. By grouping points by y-coordinate, we can count horizontal line segments at each level, then count trapezoids by pairing segments from different y-levels.

# Approach
- **Problem Transformation**:
  - Horizontal trapezoid = 4 points forming quadrilateral with ≥1 pair of horizontal parallel sides
  - Horizontal parallel sides = line segments at same y-coordinate
  - Problem reduces to: choose 2 horizontal segments from different y-levels

- **Grouping Points by Y-Level**:
  - Build map: y-coordinate → count of points at that y-level
  - Points at same y-level can form horizontal line segments
  - Need at least 2 points per level to form a segment

- **Counting Horizontal Segments per Level**:
  - For n points at same y-level, can form C(n, 2) = n(n-1)/2 segments
  - Example: 3 points at y=0 → C(3,2) = 3 segments: [p1,p2], [p1,p3], [p2,p3]
  - Sum segments across all levels = total horizontal segments available

- **Counting Trapezoids - Combinatorial Formula**:
  - Trapezoid = pair of segments from different y-levels
  - Count pairs where segments are from different levels
  - Formula: Total pairs - Pairs from same level
  - Total pairs of segments = C(totalSegments, 2) = totalSegments² / 2 (for distinct pairs)
  - Pairs from same level = sum of C(segmentsAtLevel, 2) for each level

- **Optimized Formula**:
  - C(total, 2) = total × (total-1) / 2 ≈ total² / 2 for large values
  - sum of C(s_i, 2) = sum of s_i × (s_i-1) / 2 ≈ sum of s_i² / 2
  - Different-level pairs = (total² - sum_of_squares) / 2
  - This avoids nested loops over pairs

- **Why This Works**:
  - total² counts all ordered pairs of segments (including same-level)
  - sum_of_squares removes same-level pairs
  - Divide by 2 converts ordered pairs to unordered pairs

- **Example Walkthrough** ([[1,0],[2,0],[3,0],[2,2],[3,2]]):
  - y=0: 3 points → 3 segments
  - y=2: 2 points → 1 segment
  - Total segments = 4
  - sum_of_squares = 3² + 1² = 10
  - Trapezoids = (16 - 10) / 2 = 3 ✓

- **BigInt Usage**:
  - Intermediate calculations can exceed JavaScript number precision
  - Use BigInt throughout, convert to Number only at final modulo

# Complexity
- Time complexity: $$O(n)$$
  - Single pass to group points by y-coordinate: O(n)
  - Iterate through unique y-levels: O(k) where k ≤ n
  - Total: O(n)

- Space complexity: $$O(n)$$
  - Map stores at most n entries (one per unique y-coordinate)
  - Constant additional variables
  - Total: O(n)

# Code
```typescript
const countTrapezoids = (points: number[][]): number => {
    const pointCountByYLevel = new Map<number, number>();
    
    for (const [x, y] of points) {
        pointCountByYLevel.set(y, (pointCountByYLevel.get(y) || 0) + 1);
    }

    let totalSegmentCount = 0n;
    let sumOfSquaredSegmentCounts = 0n;
    const MOD = BigInt(10 ** 9 + 7);
    
    for (const pointsAtLevel of pointCountByYLevel.values()) {
        if (pointsAtLevel < 2) continue;
        const segmentsAtLevel = BigInt((pointsAtLevel * (pointsAtLevel - 1)) / 2);
        totalSegmentCount += segmentsAtLevel;
        sumOfSquaredSegmentCounts += segmentsAtLevel * segmentsAtLevel;
    }
    
    const trapezoidCount = (totalSegmentCount * totalSegmentCount - sumOfSquaredSegmentCounts) / 2n;
    
    return Number(trapezoidCount % MOD);
};
```