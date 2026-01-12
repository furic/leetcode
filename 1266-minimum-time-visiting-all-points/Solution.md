# Chebyshev Distance | 6 Lines | O(n) | 0ms

# Intuition

Since we can move diagonally, the minimum time between two points is the maximum of the absolute differences in x and y coordinates (Chebyshev distance). Move diagonally as much as possible, then move straight for any remaining distance.

# Approach

**Chebyshev Distance:**
- Between points (x₁,y₁) and (x₂,y₂):
- Time = max(|x₂-x₁|, |y₂-y₁|)
- Why: move diagonally min(|Δx|, |Δy|) steps, then straight |Δx-Δy| steps
- Total: max(|Δx|, |Δy|) steps

**Algorithm:**
- Sum distances between consecutive points
- Use reduce for concise implementation

**Example: points=[[1,1],[3,4],[-1,0]]**

From [1,1] to [3,4]:
- Δx = |3-1| = 2, Δy = |4-1| = 3
- Time = max(2,3) = 3

From [3,4] to [-1,0]:
- Δx = |-1-3| = 4, Δy = |0-4| = 4
- Time = max(4,4) = 4

Total: 3+4 = 7 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through points
  - Constant work per pair

- Space complexity: $$O(1)$$
  - Only accumulator variable
  - No additional data structures

# Code
```typescript []
const minTimeToVisitAllPoints = (points: number[][]): number =>
    points.reduce((time, point, i) =>
        time + (i > 0 ? Math.max(
            Math.abs(points[i - 1][0] - point[0]),
            Math.abs(points[i - 1][1] - point[1])
        ) : 0)
        , 0);
```