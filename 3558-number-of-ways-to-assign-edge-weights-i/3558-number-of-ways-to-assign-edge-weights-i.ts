function assignEdgeWeights(edges: number[][]): number {
    const MOD = 1000000007n;
    const n = edges.length + 1;

    const graph: number[][] = Array.from({ length: n + 1 }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const dfs = (node: number, prev: number): number => {
        let dist = 0;

        for (const c of graph[node]) {
            if (c !== prev) {
                dist = Math.max(dist, dfs(c, node) + 1);
            }
        }

        return dist;
    };

    const modPow = (a: number, b: number): bigint => {
        let res = 1n;
        let base = BigInt(a);
        let exp = BigInt(b);

        while (exp > 0n) {
            if (exp & 1n) res = res * base % MOD;
            base = base * base % MOD;
            exp >>= 1n;
        }

        return res;
    };

    const d = dfs(1, 0);

    return Number(modPow(2, d - 1));
};