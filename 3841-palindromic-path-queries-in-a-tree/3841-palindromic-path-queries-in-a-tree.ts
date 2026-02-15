const palindromePath = (n: number, edges: number[][], s: string, queries: string[]): boolean[] => {
    const adj: number[][] = Array.from({length: n}, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    // DFS for Euler tour, parent, depth, order
    const parent = new Int32Array(n).fill(-1);
    const depth = new Int32Array(n);
    const inTime = new Int32Array(n);
    const outTime = new Int32Array(n);
    const order: number[] = [];
    
    const stack: [number, boolean][] = [[0, false]];
    let time = 0;
    
    while (stack.length > 0) {
        const [u, exiting] = stack.pop()!;
        if (exiting) {
            outTime[u] = time - 1;
            continue;
        }
        inTime[u] = time++;
        order.push(u);
        stack.push([u, true]);
        for (const v of adj[u]) {
            if (v !== parent[u]) {
                parent[v] = u;
                depth[v] = depth[u] + 1;
                stack.push([v, false]);
            }
        }
    }
    
    // Binary lifting for LCA
    const LOG = Math.ceil(Math.log2(n + 1)) + 1;
    const up: Int32Array[] = Array.from({length: n}, () => new Int32Array(LOG).fill(-1));
    
    for (let i = 0; i < n; i++) up[i][0] = parent[i];
    for (let j = 1; j < LOG; j++) {
        for (let i = 0; i < n; i++) {
            if (up[i][j - 1] !== -1) {
                up[i][j] = up[up[i][j - 1]][j - 1];
            }
        }
    }
    
    const lca = (u: number, v: number): number => {
        if (depth[u] < depth[v]) [u, v] = [v, u];
        let diff = depth[u] - depth[v];
        for (let j = 0; diff > 0; j++, diff >>= 1) {
            if (diff & 1) u = up[u][j];
        }
        if (u === v) return u;
        for (let j = LOG - 1; j >= 0; j--) {
            if (up[u][j] !== up[v][j]) {
                u = up[u][j];
                v = up[v][j];
            }
        }
        return up[u][0];
    };
    
    // Initial masks and rootXor
    const mask = new Int32Array(n);
    for (let i = 0; i < n; i++) {
        mask[i] = 1 << (s.charCodeAt(i) - 97);
    }
    
    const rootXor = new Int32Array(n);
    for (const u of order) {
        rootXor[u] = parent[u] === -1 ? mask[u] : rootXor[parent[u]] ^ mask[u];
    }
    
    // BIT for range XOR update, point query
    const bit = new Int32Array(n + 2);
    const bitUpdate = (i: number, delta: number) => {
        for (i++; i <= n + 1; i += i & -i) bit[i] ^= delta;
    };
    const bitQuery = (i: number): number => {
        let res = 0;
        for (i++; i > 0; i -= i & -i) res ^= bit[i];
        return res;
    };
    const rangeXorUpdate = (l: number, r: number, delta: number) => {
        bitUpdate(l, delta);
        bitUpdate(r + 1, delta);
    };
    
    const currentRootXor = (u: number): number => rootXor[u] ^ bitQuery(inTime[u]);
    
    const currentMask = (u: number): number => {
        if (parent[u] === -1) return currentRootXor(u);
        return currentRootXor(u) ^ currentRootXor(parent[u]);
    };
    
    const result: boolean[] = [];
    
    for (const query of queries) {
        const parts = query.split(' ');
        if (parts[0] === 'update') {
            const u = parseInt(parts[1]);
            const c = parts[2];
            const newMask = 1 << (c.charCodeAt(0) - 97);
            const oldMask = currentMask(u);
            if (oldMask !== newMask) {
                rangeXorUpdate(inTime[u], outTime[u], oldMask ^ newMask);
            }
        } else {
            const u = parseInt(parts[1]);
            const v = parseInt(parts[2]);
            const l = lca(u, v);
            const pathXor = currentRootXor(u) ^ currentRootXor(v) ^ currentMask(l);
            result.push((pathXor & (pathXor - 1)) === 0);
        }
    }
    
    return result;
};