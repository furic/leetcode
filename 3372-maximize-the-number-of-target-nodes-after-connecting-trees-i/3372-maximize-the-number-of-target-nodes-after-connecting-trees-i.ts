const maxTargetNodes = (edges1: number[][], edges2: number[][], k: number): number[] => {
    const buildAdjList = (edges: number[][]): number[][] => {
        const n = edges.length + 1;
        const adj = Array.from({ length: n }, () => [] as number[]);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }
        return adj;
    };

    const dfs = (adj: number[][], node: number, parent: number, depth: number): number => {
        if (depth < 0) return 0;
        let count = 1;
        for (const neighbor of adj[node]) {
            if (neighbor !== parent) {
                count += dfs(adj, neighbor, node, depth - 1);
            }
        }
        return count;
    };

    const adj1 = buildAdjList(edges1);
    const adj2 = buildAdjList(edges2);

    // Step 1: compute the max reachable nodes in Tree B within (k - 1) steps
    let maxB = 0;
    for (let i = 0; i < adj2.length; i++) {
        maxB = Math.max(maxB, dfs(adj2, i, -1, k - 1));
    }

    // Step 2: For each node in Tree A, compute result
    const result: number[] = [];
    for (let i = 0; i < adj1.length; i++) {
        const fromA = dfs(adj1, i, -1, k);
        result.push(fromA + maxB);
    }

    return result;
};