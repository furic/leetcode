function maxKDivisibleComponents(n: number, edges: number[][], values: number[], k: number): number {
    const adj: number[][] = Array.from({length : n}, () => []);
    for (const [u, v] of edges){
        adj[u].push(v);
        adj[v].push(u);
    }
    let res = 0;
    const DFS = (node: number, parent: number): number => {
        let total = values[node];
        for (const nei of adj[node]){
            if (nei === parent)
                continue;
            total += DFS(nei, node);
        }
        if (total % k === 0){
            res++;
            return 0;
        }
        return total;
    };
    DFS(0, -1);
    return res;
};