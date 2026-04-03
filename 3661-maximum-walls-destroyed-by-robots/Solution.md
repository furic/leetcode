# Sort + Binary Search + Interval DP | 48 Lines | O(n log n + w log w) | 311ms

# Intuition
Each robot can fire left or right, but bullets are blocked by adjacent robots. The choice of direction for each robot affects how the shared gap between neighbouring robots is covered. This is an interval DP where adjacent robots must coordinate to avoid double-counting walls in overlapping zones.

# Approach
- **Preprocessing:** Sort robots by position and map each to its distance. Sort walls for binary search. Use `lowerBound` / `upperBound` to count walls in any range in O(log w).
- **Per-robot range computation:**
  - `wallsLeft[i]` — walls robot `i` can hit firing left, capped at `robots[i-1] + 1` to model bullet blocking.
  - `wallsRight[i]` — walls robot `i` can hit firing right, capped at `robots[i+1] - 1`.
  - `wallsBetween[i]` — walls in the gap `[robots[i-1], robots[i]]`, used to resolve the overlap when robot `i-1` fires right AND robot `i` fires left (both cover this zone).
- **DP transitions:**
  - `dpLeft[i]` = best total walls if robot `i` fires left.
  - `dpRight[i]` = best total walls if robot `i` fires right.
  - From robot `i-1` to robot `i`:
    - **`newRight` (robot `i` fires right):** Regardless of what robot `i-1` did, robot `i`'s rightward contribution is independent (no overlap with `i-1`'s range). So `newRight = max(dpLeft, dpRight) + wallsRight[i]`.
    - **`newLeft` (robot `i` fires left):** If `i-1` also fired left (`dpLeft`), no overlap — add `wallsLeft[i]` directly. If `i-1` fired right (`dpRight`), their ranges overlap in the gap — instead of double-counting, we take `min(wallsLeft[i] + wallsRight[i-1], wallsBetween[i])` as the combined contribution from the shared zone, then subtract the overcounted `wallsRight[i-1]` and add back the correct merged count.
- Return `max(dpLeft, dpRight)` after processing all robots.

# Complexity
- Time complexity: $$O(n \log n + w \log w)$$ — sorting plus O(log w) binary search per robot for range counting.

- Space complexity: $$O(n + w)$$ — sorted arrays and per-robot count arrays.

# Code
```typescript []
const maxWalls = (robots: number[], distance: number[], walls: number[]): number => {
    const n = robots.length;

    const distanceByPos = new Map<number, number>();
    for (let i = 0; i < n; i++) distanceByPos.set(robots[i], distance[i]);

    robots.sort((a, b) => a - b);
    walls.sort((a, b) => a - b);

    const lowerBound = (target: number): number => {
        let lo = 0, hi = walls.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (walls[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    const upperBound = (target: number): number => {
        let lo = 0, hi = walls.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (walls[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    const wallsLeft    = new Array(n).fill(0);
    const wallsRight   = new Array(n).fill(0);
    const wallsBetween = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        const pos  = robots[i];
        const dist = distanceByPos.get(pos)!;

        const leftBound = i > 0 ? Math.max(pos - dist, robots[i - 1] + 1) : pos - dist;
        wallsLeft[i] = upperBound(pos) - lowerBound(leftBound);

        const rightBound = i < n - 1 ? Math.min(pos + dist, robots[i + 1] - 1) : pos + dist;
        wallsRight[i] = upperBound(rightBound) - lowerBound(pos);

        if (i > 0) {
            wallsBetween[i] = upperBound(pos) - lowerBound(robots[i - 1]);
        }
    }

    let dpLeft = wallsLeft[0], dpRight = wallsRight[0];

    for (let i = 1; i < n; i++) {
        const newLeft = Math.max(
            dpLeft  + wallsLeft[i],
            dpRight - wallsRight[i - 1] + Math.min(wallsLeft[i] + wallsRight[i - 1], wallsBetween[i]),
        );
        const newRight = Math.max(dpLeft, dpRight) + wallsRight[i];
        dpLeft  = newLeft;
        dpRight = newRight;
    }

    return Math.max(dpLeft, dpRight);
};
```