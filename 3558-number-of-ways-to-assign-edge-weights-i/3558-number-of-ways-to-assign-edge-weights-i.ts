const assignEdgeWeights = (edges: number[][]): number => {
    const MOD = 1_000_000_007n;

    const modPow = (base: number, exp: number): number => {
        let result = 1n;
        let b = BigInt(base);
        while (exp > 0) {
            if (exp & 1) result = result * b % MOD;
            b = b * b % MOD;
            exp >>= 1;
        }
        return Number(result);
    };

    const maxDepth = (adj: number[][], node: number, parent: number): number => {
        let depth = 0;
        for (const neighbour of adj[node]) {
            if (neighbour !== parent)
                depth = Math.max(depth, maxDepth(adj, neighbour, node) + 1);
        }
        return depth;
    };

    const n = edges.length + 1;
    const adj: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    // Half of 2^depth assignments give odd total cost
    return modPow(2, maxDepth(adj, 1, 0) - 1);
};