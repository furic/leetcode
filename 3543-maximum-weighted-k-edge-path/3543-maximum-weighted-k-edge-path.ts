const maxWeight = (n: number, edges: number[][], k: number, t: number): number => {
    const graph: [number, number][][] = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
    }

    const memo = new Set();
    let maxSum = -1;

    const dfs = (node: number, remaining: number, sum: number) => {
        if (remaining === 0) {
            if (sum < t) maxSum = Math.max(maxSum, sum);
            return;
        }
        let key = `${node}-${remaining}-${sum}`

        if (memo.has(key)) return;
        memo.add(key);

        for (const [neighbor, weight] of graph[node]) {
            const newSum = sum + weight;
            if (newSum >= t) continue;
            dfs(neighbor, remaining - 1, newSum);
        }
    };

    for (let i = 0; i < n; i++) {
        dfs(i, k, 0);
    }

    return maxSum;
};