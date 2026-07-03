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

    // DFS with memoisation: returns min total cost to reach n-1 using only edges with weight >= threshold
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

    // Binary search on the minimum edge weight threshold
    let lo = minEdge, hi = maxEdge;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (canAchieve(mid)) lo = mid + 1;
        else                 hi = mid - 1;
    }

    return hi;
};