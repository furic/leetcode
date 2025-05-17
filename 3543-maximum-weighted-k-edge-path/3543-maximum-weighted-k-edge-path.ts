const maxWeight = (n: number, edges: number[][], k: number, t: number): number => {
    const graph: [number, number][][] = Array.from({ length: n }, () => []);

    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
    }

    const memo: Map<number, number>[][] = Array.from({ length: n }, () =>
        Array.from({ length: k + 1 }, () => new Map())
    );

    const dfs = (node: number, remaining: number, sum: number): number => {
        if (remaining === 0) return sum < t ? sum : -1;
        if (memo[node][remaining].has(sum)) return memo[node][remaining].get(sum)!;

        let maxSum = -1;

        for (const [neighbor, weight] of graph[node]) {
            const newSum = sum + weight;
            if (newSum >= t) continue;
            const result = dfs(neighbor, remaining - 1, newSum);
            if (result !== -1) {
                maxSum = Math.max(maxSum, result);
            }
        }

        memo[node][remaining].set(sum, maxSum);
        return maxSum;
    };

    let result = -1;
    for (let i = 0; i < n; i++) {
        result = Math.max(result, dfs(i, k, 0));
    }

    return result;
};