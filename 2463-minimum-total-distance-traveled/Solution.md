# DP + Monotonic Deque | 48 Lines | O(N·M) | 17ms

# Intuition
Once both arrays are sorted, the optimal assignment is always a contiguous block of robots to each factory — robots never "cross over" factories in an optimal solution. This makes it a classic interval DP where each factory absorbs a prefix of the remaining robots, and the cost of assigning a contiguous block to one factory is a range sum of absolute distances.

# Approach
- **Sort both arrays** — sort `robot` ascending and `factory` by position ascending. The key insight is that in any optimal solution, the assignment is order-preserving: robot `i` is always assigned to a factory with index ≥ the factory assigned to robot `i-1`. Crossing assignments can never be better.

- **DP definition** — `dp[i][j]` = minimum total distance to repair all robots from index `i` onward, using only factories from index `j` onward. The final answer is `dp[0][0]`.

- **Base cases**:
  - `dp[robotCount][j] = 0` for all `j` — no robots left, zero cost (initialised by array fill).
  - `dp[i][factoryCount] = UNREACHABLE` for `i < robotCount` — robots remain but no factories left.

- **Transition** — for factory `j` at position `P` with capacity `C`, we decide how many robots `[i, i+k-1]` (for `k = 0..C`) it repairs:
$$dp[i][j] = \min_{k=0}^{C} \left( \sum_{r=i}^{i+k-1} |robot[r] - P| + dp[i+k][j+1] \right)$$
  The sum of distances grows as we extend `k` leftward (iterating `robotIdx` from `n-1` down to `0`).

- **Monotonic deque optimisation** — rewrite the transition as:
$$dp[i][j] = \underbrace{\left(\min_{t \in [i,\, i+C]} dp[t][j+1] - S_t\right)}_{\text{minimise over window}} + S_i$$
  where $S_i = \sum_{r=i}^{n-1} |robot[r] - P|$ is a suffix distance sum accumulated as `robotIdx` decreases.
  - A **sliding-window minimum deque** (monotonic increasing on adjusted value) maintains the minimum of `dp[t][j+1] - S_t` over the window `[robotIdx, robotIdx + capacity]`.
  - Evict from the **front** when the index falls outside the capacity window.
  - Evict from the **back** when the incoming adjusted value is ≤ the back (maintains ascending order).
  - This reduces the inner loop from O(C) to **O(1) amortised** per robot.

- **Iteration order** — outer loop over factories right-to-left (`factoryCount-1` down to `0`), inner loop over robots right-to-left (`robotCount-1` down to `0`). The right-to-left robot scan lets us accumulate `distanceSuffix` naturally and keep the deque window valid.

- **Result** — `dp[0][0]` gives the minimum total distance for all robots using all factories.

# Complexity
- Time complexity: $$O(N \log N + M \log M + N \cdot M)$$ — sorting is $$O(N \log N + M \log M)$$; the DP has N×M states each computed in O(1) amortised via the deque, giving $$O(N \cdot M)$$ overall.

- Space complexity: $$O(N \cdot M)$$ — the DP table; the deque is at most O(N) at any time.

# Code
```typescript []
const minimumTotalDistance = (robot: number[], factory: number[][]): number => {
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);

    const UNREACHABLE = 1e20;
    const robotCount = robot.length;
    const factoryCount = factory.length;

    const dp: number[][] = Array.from(
        { length: robotCount + 1 },
        () => Array(factoryCount + 1).fill(0)
    );

    for (let i = 0; i < robotCount; i++) dp[i][factoryCount] = UNREACHABLE;

    for (let factoryIdx = factoryCount - 1; factoryIdx >= 0; factoryIdx--) {
        const [factoryPos, capacity] = factory[factoryIdx];

        let distanceSuffix = 0;

        const deque: [number, number][] = [[robotCount, 0]];

        for (let robotIdx = robotCount - 1; robotIdx >= 0; robotIdx--) {
            distanceSuffix += Math.abs(robot[robotIdx] - factoryPos);

            while (deque.length && deque[0][0] > robotIdx + capacity)
                deque.shift();

            const adjustedValue = dp[robotIdx][factoryIdx + 1] - distanceSuffix;
            while (deque.length && deque[deque.length - 1][1] >= adjustedValue)
                deque.pop();

            deque.push([robotIdx, adjustedValue]);

            dp[robotIdx][factoryIdx] = deque[0][1] + distanceSuffix;
        }
    }

    return dp[0][0];
};
```