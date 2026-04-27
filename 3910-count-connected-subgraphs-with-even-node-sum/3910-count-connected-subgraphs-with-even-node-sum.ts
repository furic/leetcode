const evenSumSubgraphs = (nums: number[], edges: number[][]): number => {
    const n = nums.length;

    // Precompute adjacency bitmask for each node
    const adj = new Int32Array(n);
    for (const [u, v] of edges) {
        adj[u] |= 1 << v;
        adj[v] |= 1 << u;
    }

    // Precompute popcount and value-sum parity for all masks
    const onesCount = new Uint8Array(1 << n);
    const valueParity = new Uint8Array(1 << n);
    for (let mask = 1; mask < (1 << n); mask++) {
        const lowestBit = mask & -mask;
        const node = 31 - Math.clz32(lowestBit);
        onesCount[mask] = onesCount[mask ^ lowestBit] + 1;
        valueParity[mask] = valueParity[mask ^ lowestBit] ^ nums[node];
    }

    let result = 0;

    for (let mask = 1; mask < (1 << n); mask++) {
        // Quick filters before expensive connectivity check
        if (valueParity[mask] !== 0) continue;

        // BFS/flood within the subset to check connectivity
        const startNode = 31 - Math.clz32(mask & -mask);
        let visited = 1 << startNode;
        let queue = visited;

        while (queue !== 0) {
            const bit = queue & -queue;
            queue ^= bit;
            const node = 31 - Math.clz32(bit);
            let reachable = adj[node] & mask & ~visited;
            visited |= reachable;
            queue |= reachable;
        }

        if (visited === mask) result++;
    }

    return result;
};