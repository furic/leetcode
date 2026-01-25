const specialNodes = (n: number, edges: number[][], x: number, y: number, z: number): number => {
    // Build adjacency list
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    // BFS to find distances from source to all nodes
    const bfs = (start: number): number[] => {
        const dist = new Array(n).fill(-1);
        const queue: number[] = [start];
        dist[start] = 0;
        let head = 0;
        
        while (head < queue.length) {
            const u = queue[head++];
            for (const v of adj[u]) {
                if (dist[v] === -1) {
                    dist[v] = dist[u] + 1;
                    queue.push(v);
                }
            }
        }
        return dist;
    };
    
    // Get distances from x, y, z to all nodes
    const distX = bfs(x);
    const distY = bfs(y);
    const distZ = bfs(z);
    
    // Check if three distances form a Pythagorean triplet
    const isPythagorean = (a: number, b: number, c: number): boolean => {
        const [d1, d2, d3] = [a, b, c].sort((x, y) => x - y);
        return d1 * d1 + d2 * d2 === d3 * d3;
    };
    
    // Count special nodes
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (isPythagorean(distX[i], distY[i], distZ[i])) {
            count++;
        }
    }
    
    return count;
};