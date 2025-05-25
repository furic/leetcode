const MOD = 1e9 + 7;

const assignEdgeWeights = (edges: number[][]): number => {
    const n = edges.length + 1;
    const tree: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }
    // BFS to find max depth
    const depths = Array(n + 1).fill(-1);
    const queue: number[] = [1];
    depths[1] = 0;
    let maxDepth = 0;
    while (queue.length) {
        const node = queue.shift()!;
        for (const neighbor of tree[node]) {
            if (depths[neighbor] === -1) { // If v has not been visited
                depths[neighbor] = depths[node] + 1;
                maxDepth = Math.max(maxDepth, depths[neighbor]);
                queue.push(neighbor);
            }
        }
    }

    console.log(maxDepth);
    // Number of edges in path = maxDepth
    // Number of ways = 2^(maxDepth-1) if maxDepth > 0, else 1
    return maxDepth === 0 ? 1 : powmod(2, maxDepth - 1);
};

const powmod = (base: number, exp: number): number => {
    let res = 1n;
    let currentBase = BigInt(base);
    const bigMod = BigInt(MOD);

    while (exp > 0) {
        if (exp & 1) {
            res = (res * currentBase) % bigMod;
        }
        // Square the base and halve the exponent (integer division)
        currentBase = (currentBase * currentBase) % bigMod;
        exp >>= 1;
    }
    return Number(res);
};