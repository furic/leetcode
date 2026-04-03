const maxWalls = (robots: number[], distance: number[], walls: number[]): number => {
    const n = robots.length;

    // Map each robot position to its shooting distance before sorting
    const distanceByPos = new Map<number, number>();
    for (let i = 0; i < n; i++) distanceByPos.set(robots[i], distance[i]);

    robots.sort((a, b) => a - b);
    walls.sort((a, b) => a - b);

    // First index where walls[idx] >= target
    const lowerBound = (target: number): number => {
        let lo = 0, hi = walls.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (walls[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    // First index where walls[idx] > target
    const upperBound = (target: number): number => {
        let lo = 0, hi = walls.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (walls[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    // wallsLeft[i]  = walls robot i can hit firing left  (blocked by left neighbour)
    // wallsRight[i] = walls robot i can hit firing right (blocked by right neighbour)
    // wallsBetween[i] = walls strictly between robot i-1 and robot i
    const wallsLeft    = new Array(n).fill(0);
    const wallsRight   = new Array(n).fill(0);
    const wallsBetween = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        const pos  = robots[i];
        const dist = distanceByPos.get(pos)!;

        // Left range: capped by left neighbour's position
        const leftBound = i > 0
            ? Math.max(pos - dist, robots[i - 1] + 1)
            : pos - dist;
        const leftWallStart  = lowerBound(leftBound);
        const leftWallEnd    = upperBound(pos);       // walls[idx] <= pos
        wallsLeft[i] = leftWallEnd - leftWallStart;

        // Right range: capped by right neighbour's position
        const rightBound = i < n - 1
            ? Math.min(pos + dist, robots[i + 1] - 1)
            : pos + dist;
        const rightWallStart = lowerBound(pos);       // walls[idx] >= pos
        const rightWallEnd   = upperBound(rightBound);
        wallsRight[i] = rightWallEnd - rightWallStart;

        // Walls in the gap between robot i-1 and robot i (shared decision boundary)
        if (i > 0) {
            const gapStart = lowerBound(robots[i - 1]);
            wallsBetween[i] = leftWallEnd - gapStart;
        }
    }

    // DP: accumulate best total walls destroyed up to robot i
    // dpLeft[i]  = best total if robot i fires left
    // dpRight[i] = best total if robot i fires right
    let dpLeft = wallsLeft[0], dpRight = wallsRight[0];

    for (let i = 1; i < n; i++) {
        const newLeft = Math.max(
            dpLeft  + wallsLeft[i],
            dpRight - wallsRight[i - 1] + Math.min(wallsLeft[i] + wallsRight[i - 1], wallsBetween[i]),
        );
        const newRight = Math.max(
            dpLeft  + wallsRight[i],
            dpRight + wallsRight[i],
        );
        dpLeft  = newLeft;
        dpRight = newRight;
    }

    return Math.max(dpLeft, dpRight);
};