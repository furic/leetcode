const maxDistance = (side: number, points: number[][], k: number): number => {
    const perimeter = side * 4;

    // Convert each point to its arc position along the perimeter (clockwise from origin)
    const arcPositions = points.map(([x, y]) => {
        if (x === 0)      return y;
        if (y === side)   return side + x;
        if (x === side)   return side * 3 - y;
        return perimeter - x;
    }).sort((a, b) => a - b);

    const m = arcPositions.length;

    // First index where arcPositions[idx] >= target
    const lowerBound = (target: number): number => {
        let lo = 0, hi = m;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arcPositions[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    // Can we place k points such that every adjacent arc-distance >= minDist?
    const canAchieve = (minDist: number): boolean => {
        const indices = new Array(k).fill(0);
        let curr = arcPositions[0];

        for (let i = 1; i < k; i++) {
            const j = lowerBound(curr + minDist);
            if (j === m) return false;
            indices[i] = j;
            curr = arcPositions[j];
        }

        // Check if wrap-around gap (from last point back to first) also satisfies minDist
        if (arcPositions[indices[k - 1]] - arcPositions[0] <= perimeter - minDist) return true;

        // Try shifting the starting point to find a valid circular arrangement
        for (indices[0] = 1; indices[0] < indices[1]; indices[0]++) {
            for (let j = 1; j < k; j++) {
                while (indices[j] < m && arcPositions[indices[j]] < arcPositions[indices[j - 1]] + minDist)
                    indices[j]++;
                if (indices[j] === m) return false;
            }
            if (arcPositions[indices[k - 1]] - arcPositions[indices[0]] <= perimeter - minDist) return true;
        }

        return false;
    };

    // Binary search on the answer
    let lo = 1, hi = Math.floor(perimeter / k) + 1;
    while (lo + 1 < hi) {
        const mid = (lo + hi) >> 1;
        if (canAchieve(mid)) lo = mid;
        else hi = mid;
    }

    return lo;
};