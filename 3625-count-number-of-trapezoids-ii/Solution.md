# Parallel Segment Pairing | 75 Lines | O(n²) | 826ms

# Intuition
A trapezoid has at least one pair of parallel sides (same slope). By counting all pairs of parallel line segments, we count configurations with parallel sides. However, parallelograms have two pairs of parallel sides and get counted twice, so we need to subtract them once.

# Approach
- **Problem Decomposition**:
  - Trapezoid = 4 points forming quadrilateral with ≥1 pair of parallel sides
  - Parallel segments = segments with same slope but different position
  - Parallelograms have 2 pairs of parallel sides → counted twice, need correction

- **Phase 1: Build Segment Maps**:
  - Examine all C(n,2) pairs of points (potential line segments)
  - For each segment, calculate:
    - Slope: (y2-y1)/(x2-x1), use sentinel value for vertical lines
    - Y-intercept: determines which parallel line this segment lies on
    - Midpoint hash: uniquely identifies the segment's center

- **Slope and Intercept Calculation**:
  - Regular lines: slope = Δy/Δx, intercept = y - slope×x
  - Vertical lines: special case with slope = sentinel (1e9+7), intercept = x-coordinate
  - Store in map: slope → array of intercepts

- **Midpoint Encoding**:
  - Midpoint identifies segment uniquely among all segments
  - Hash = (x1+x2)×10000 + (y1+y2)
  - Two segments with same midpoint form diagonals of parallelogram
  - Store in map: midpoint → array of slopes

- **Phase 2: Count Trapezoids**:
  - For each slope, group segments by intercept
  - Segments on different parallel lines (different intercepts) can form trapezoids
  - Use cumulative counting: for each intercept, multiply its count by sum of previous counts
  - Formula: sum over all pairs of different intercepts

- **Phase 3: Subtract Parallelograms**:
  - Parallelograms counted twice (once per pair of parallel sides)
  - Identify via shared midpoint: 4 points forming parallelogram have diagonals meeting at midpoint
  - For each midpoint, count pairs of segments with different slopes
  - Subtract these from total (each represents one parallelogram overcounted)

- **Why Midpoint Detects Parallelograms**:
  - In parallelogram, diagonals bisect each other
  - If two segments share midpoint, they must be diagonals
  - 4 endpoints of these diagonals form a parallelogram

- **Example Walkthrough** ([[-3,2],[3,0],[2,3],[3,2],[2,-3]]):
  - Calculate slopes/intercepts for all 10 pairs
  - Find parallel segment pairs
  - Detect any parallelograms via shared midpoints
  - Result: 2 trapezoids after correction

- **Edge Cases Handled**:
  - Vertical lines: use sentinel slope value
  - Floating point slopes: consistent calculation method
  - Segments on same line (same intercept): not counted as pairs

# Complexity
- Time complexity: $$O(n^2)$$
  - Generate all pairs of points: O(n²) with n(n-1)/2 pairs
  - Build slope and midpoint maps: O(n²)
  - Count trapezoids by grouping: O(n²) in worst case
  - Subtract parallelograms: O(n²) in worst case
  - Total: O(n²)

- Space complexity: $$O(n^2)$$
  - slopeToIntercepts map: stores O(n²) intercepts
  - midpointToSlopes map: stores O(n²) slopes
  - Additional maps for counting: O(n²)
  - Total: O(n²)

# Code
```typescript
const countTrapezoids = (points: number[][]): number => {
    const numPoints = points.length;
    const VERTICAL_SLOPE = 1e9 + 7;
    const slopeToIntercepts: Map<number, number[]> = new Map();
    const midpointToSlopes: Map<number, number[]> = new Map();
    let trapezoidCount = 0;

    for (let i = 0; i < numPoints; i++) {
        const [x1, y1] = points[i];
        
        for (let j = i + 1; j < numPoints; j++) {
            const [x2, y2] = points[j];
            const deltaX = x1 - x2;
            const deltaY = y1 - y2;

            let slope: number;
            let yIntercept: number;
            
            if (x2 === x1) {
                slope = VERTICAL_SLOPE;
                yIntercept = x1;
            } else {
                slope = (y2 - y1) / (x2 - x1);
                yIntercept = (y1 * deltaX - x1 * deltaY) / deltaX;
            }

            const midpointHash = (x1 + x2) * 10000 + (y1 + y2);
            
            if (!slopeToIntercepts.has(slope)) {
                slopeToIntercepts.set(slope, []);
            }
            if (!midpointToSlopes.has(midpointHash)) {
                midpointToSlopes.set(midpointHash, []);
            }
            
            slopeToIntercepts.get(slope)!.push(yIntercept);
            midpointToSlopes.get(midpointHash)!.push(slope);
        }
    }

    for (const intercepts of slopeToIntercepts.values()) {
        if (intercepts.length < 2) continue;
        
        const interceptCounts = new Map<number, number>();
        for (const intercept of intercepts) {
            interceptCounts.set(intercept, (interceptCounts.get(intercept) || 0) + 1);
        }

        let runningSum = 0;
        for (const count of interceptCounts.values()) {
            trapezoidCount += runningSum * count;
            runningSum += count;
        }
    }

    for (const slopes of midpointToSlopes.values()) {
        if (slopes.length < 2) continue;
        
        const slopeCounts = new Map<number, number>();
        for (const slope of slopes) {
            slopeCounts.set(slope, (slopeCounts.get(slope) || 0) + 1);
        }

        let runningSum = 0;
        for (const count of slopeCounts.values()) {
            trapezoidCount -= runningSum * count;
            runningSum += count;
        }
    }

    return trapezoidCount;
};
```