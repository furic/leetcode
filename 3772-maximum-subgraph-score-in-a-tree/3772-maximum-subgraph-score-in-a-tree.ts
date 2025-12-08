const maxSubgraphScore = (n: number, edges: number[][], good: number[]): number[] => {
    const adj: number[][] = Array.from({length: n}, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    const val = good.map(g => g === 1? 1: -1);

    const dp = new Array(n).fill(0);
    const parent = new Array(n).fill(-1);
    const order: number[] =[];

    const visited = new Array(n).fill(false);
    const queue = [0];
    visited[0] = true;
    let head = 0;
    
    while (head < queue.length) {
        const u = queue[head++];
        order.push(u);
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                parent[v] = u;
                queue.push(v);
            }
        }
    }
    
    for (let i = n - 1; i >= 0; i--) {
        const u = order[i];
        dp[u] = val[u];
        for (const v of adj[u]) {
            if (parent[v] === u) {
                dp[u] += Math.max(0, dp[v]);
            }
        }
    }
    
    const up = new Array(n).fill(0);
    const ans = new Array(n).fill(0);
    
    for (const u of order) {
        ans[u] = dp[u] + up[u];
        for (const v of adj[u]) {
            if (parent[v] === u) {
                up[v] = Math.max(0, dp[u] - Math.max(0, dp[v]) + up[u]);
            }
        }
    }
    
    return ans;
};