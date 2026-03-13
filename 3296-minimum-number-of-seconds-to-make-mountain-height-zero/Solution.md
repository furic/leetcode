# Binary Search + Quadratic Inversion | 16 Lines | O(n log(maxTime)) | 8ms

# Intuition
Workers operate in parallel, so the answer is the minimum time `T` such that all workers together can reduce the mountain by at least `mountainHeight` units within `T` seconds. This is a classic binary search on the answer — the feasibility check is monotone: if time `T` works, so does any `T' > T`.

# Approach
- **Cost function:** Worker `i` reducing by `x` units costs `workerTimes[i] * x * (x + 1) / 2` seconds (triangular sum). Given a time budget `T`, the maximum units worker `i` can reduce is the largest `x` satisfying `workerTimes[i] * x * (x + 1) / 2 ≤ T`, which we solve by inverting the quadratic: `x = floor((-1 + sqrt(1 + 8T / workerTimes[i])) / 2)`.
- **Binary search bounds:**
  - `lo = 0`
  - `hi = maxWorkerTime * h * (h + 1) / 2` where `h = ceil(mountainHeight / workerCount)` — an upper bound where the slowest worker handles its fair share alone.
- **Feasibility check at `mid`:** For each worker, compute their max reducible units via the quadratic inverse and sum. If total ≥ `mountainHeight`, `mid` seconds is sufficient — record it and search lower (`hi = mid - 1`). Otherwise search higher (`lo = mid + 1`). Early exit once `totalReduction >= mountainHeight`.
- **Result:** The smallest `mid` that passes the feasibility check.

# Complexity
- Time complexity: $$O(n \log(\text{maxTime}))$$ — binary search over the time range, with an $$O(n)$$ feasibility check per iteration. `maxTime` is bounded by `maxWorkerTime * h * (h+1) / 2`.

- Space complexity: $$O(1)$$ — no auxiliary data structures.

# Code
```typescript []
const minNumberOfSeconds = (mountainHeight: number, workerTimes: number[]): number => {
    const workerCount = workerTimes.length;
    const maxWorkerTime = Math.max(...workerTimes);

    const maxHeightPerWorker = Math.ceil(mountainHeight / workerCount);
    let lo = 0;
    let hi = maxWorkerTime * maxHeightPerWorker * (maxHeightPerWorker + 1) / 2;
    let minSeconds = hi;

    while (lo <= hi) {
        const mid = Math.floor(lo + (hi - lo) / 2);
        let totalReduction = 0;

        for (const workerTime of workerTimes) {
            const unitsReduced = Math.floor((-1 + Math.sqrt(1 + 8 * mid / workerTime)) / 2);
            totalReduction += unitsReduced;
            if (totalReduction >= mountainHeight) break;
        }

        if (totalReduction >= mountainHeight) {
            minSeconds = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }

    return minSeconds;
};
```