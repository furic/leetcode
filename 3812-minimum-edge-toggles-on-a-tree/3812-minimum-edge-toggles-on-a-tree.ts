const minimumFlips = (n: number, edges: number[][], start: string, target: string): number[] => {
    const need = new Uint8Array(n);
    let totalNeed = 0;
    for (let i = 0; i < n; i++) {
        if (start[i] !== target[i]) {
            need[i] = 1;
            totalNeed++;
        }
    }
    
    // Each edge flips 2 nodes, so total flips must be even
    if (totalNeed % 2 !== 0) return [-1];
    
    // Build adjacency list with edge indices
    const adj: [number, number][][] = Array.from({length: n}, () => []);
    for (let i = 0; i < edges.length; i++) {
        const [u, v] = edges[i];
        adj[u].push([v, i]);
        adj[v].push([u, i]);
    }
    
    // BFS to establish tree structure
    const parent = new Int32Array(n).fill(-1);
    const parentEdge = new Int32Array(n).fill(-1);
    const order = new Int32Array(n);
    const visited = new Uint8Array(n);
    const queue = new Int32Array(n);
    
    queue[0] = 0;
    visited[0] = 1;
    let head = 0, tail = 1, idx = 0;
    
    while (head < tail) {
        const u = queue[head++];
        order[idx++] = u;
        for (const [v, edgeIdx] of adj[u]) {
            if (!visited[v]) {
                visited[v] = 1;
                parent[v] = u;
                parentEdge[v] = edgeIdx;
                queue[tail++] = v;
            }
        }
    }
    
    // Process bottom-up: if node needs flip, toggle edge to parent
    const state = new Uint8Array(need);
    const result: number[] = [];
    
    for (let i = n - 1; i >= 1; i--) {
        const u = order[i];
        if (state[u] === 1) {
            result.push(parentEdge[u]);
            state[u] ^= 1;
            state[parent[u]] ^= 1;
        }
    }
    
    result.sort((a, b) => a - b);
    return result;
};