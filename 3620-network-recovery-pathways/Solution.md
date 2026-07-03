# Binary Search + DAG DFS Memoization | 24 Lines | O(m log m) | 331ms

# Intuition
We want the largest minimum edge weight such that a valid path (total cost ≤ k) exists using only edges at or above that threshold. As the threshold increases, feasibility is monotone — if a threshold works, anything smaller also works. This enables binary search on the answer.

# Approach
- **Filter offline nodes:** Build adjacency list using only edges where both endpoints are online.
- **`canAchieve(threshold)`:** Check if any path from `0` to `n-1` using only edges with weight `>= threshold` has total cost `<= k`. Use DFS with memoization on the DAG — `memo[u]` stores the minimum total cost to reach `n-1` from `u` under this threshold. Return `true` if `dfs(0) <= k`.
- **Binary search:** Search over distinct edge weights in `[minEdge, maxEdge]`. For each midpoint, call `canAchieve(mid)`:
  - If feasible: try higher threshold (`lo = mid + 1`).
  - If not: lower the bar (`hi = mid - 1`).
- Return `hi` after convergence — the largest threshold that was still feasible. Return `-1` if even `minEdge` fails.
- Memoization works because the graph is a DAG — no cycles means DFS terminates and each node's optimal cost is well-defined.

# Complexity
- Time complexity: $$O(m \log W)$$ where $$W$$ is the edge weight range — binary search over $$O(\log W)$$ values, each calling DFS+memo in $$O(n + m)$$.

- Space complexity: $$O(n + m)$$ — adjacency list and memo array.

# Code
```typescript []
const findMaxPathScore = (edges: number[][], online: boolean[], k: number): number => {
    const n = online.length;
    const adj: [number, number][][] = Array.from({ length: n }, () => []);
    let minEdge = Infinity;
    let maxEdge = 0;

    for (const [u, v, w] of edges) {
        if (!online[u] || !online[v]) continue;
        adj[u].push([v, w]);
        minEdge = Math.min(minEdge, w);
        maxEdge = Math.max(maxEdge, w);
    }

    const memo = new Array<number>(n);
    const canAchieve = (threshold: number): boolean => {
        memo.fill(-1);

        const dfs = (u: number): number => {
            if (u === n - 1) return 0;
            if (memo[u] !== -1) return memo[u];

            let minCost = Infinity;
            for (const [v, w] of adj[u])
                if (w >= threshold)
                    minCost = Math.min(minCost, dfs(v) + w);

            return (memo[u] = minCost);
        };

        return dfs(0) <= k;
    };

    if (!canAchieve(minEdge)) return -1;

    let lo = minEdge, hi = maxEdge;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (canAchieve(mid)) lo = mid + 1;
        else                 hi = mid - 1;
    }

    return hi;
};
```