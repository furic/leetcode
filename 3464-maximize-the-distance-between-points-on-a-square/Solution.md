# Perimeter Arc + Binary Search Feasibility | 44 Lines | O(m log m + m·k·log(P/k)) | 20ms

# Intuition
Manhattan distance between two points on a square boundary equals their shorter arc distance along the perimeter. Converting points to 1D arc positions reduces the problem to: place `k` points on a circle (of circumference `perimeter`) such that every adjacent gap is at least `minDist`. This is a classic binary search on the answer with a circular greedy feasibility check.

# Approach
- **Arc projection:** Map each boundary point to its clockwise arc distance from the origin `(0,0)`:
  - Left edge (`x=0`): arc = `y`
  - Top edge (`y=side`): arc = `side + x`
  - Right edge (`x=side`): arc = `3*side - y`
  - Bottom edge (`y=0`): arc = `4*side - x`
  - Sort the resulting arc positions.
- **Binary search on `minDist`:** Search `[1, floor(perimeter/k)]` — the maximum possible minimum gap when spacing `k` points evenly.
- **`canAchieve(minDist)` — circular greedy:**
  - Start from arc position 0 (index 0 in sorted array). Greedily advance each of the `k` placements by at least `minDist` using binary search (`lowerBound`).
  - After placing `k` points starting at index 0, check if the wraparound gap (from last to first) also satisfies `minDist`: `arcPositions[last] - arcPositions[0] <= perimeter - minDist`.
  - If not, try shifting the starting index from 1 up to just before the second placement. For each starting index, re-advance all subsequent placements greedily and recheck the wrap.
- The shifting loop is bounded by the gap between index 0 and 1 in the greedy sequence — usually small.

# Complexity
- Time complexity: $$O(m \log m + m \cdot k \cdot \log(P/k))$$ where $$m$$ = number of points and $$P$$ = perimeter — sort once, then binary search over $$O(\log(P/k))$$ values, each feasibility check scanning up to $$O(m \cdot k)$$ in the worst case.

- Space complexity: $$O(m)$$ — arc positions array and index tracking array.

# Code
```typescript []
const maxDistance = (side: number, points: number[][], k: number): number => {
    const perimeter = side * 4;

    const arcPositions = points.map(([x, y]) => {
        if (x === 0)      return y;
        if (y === side)   return side + x;
        if (x === side)   return side * 3 - y;
        return perimeter - x;
    }).sort((a, b) => a - b);

    const m = arcPositions.length;

    const lowerBound = (target: number): number => {
        let lo = 0, hi = m;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arcPositions[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    const canAchieve = (minDist: number): boolean => {
        const indices = new Array(k).fill(0);
        let curr = arcPositions[0];

        for (let i = 1; i < k; i++) {
            const j = lowerBound(curr + minDist);
            if (j === m) return false;
            indices[i] = j;
            curr = arcPositions[j];
        }

        if (arcPositions[indices[k - 1]] - arcPositions[0] <= perimeter - minDist) return true;

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

    let lo = 1, hi = Math.floor(perimeter / k) + 1;
    while (lo + 1 < hi) {
        const mid = (lo + hi) >> 1;
        if (canAchieve(mid)) lo = mid;
        else hi = mid;
    }

    return lo;
};
```