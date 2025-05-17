const maxWeight = (n: number, edges: number[][], k: number, t: number): number => {
    const graph: [number, number][][] = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
    }

    const memo = new Set();
    let maxSum = -1;

    const dfs = (node: number, pathLength: number, sum: number) => {
        // console.log(node, pathLength, sum)
        if (pathLength === k) {
            if (sum < t) {
                maxSum = Math.max(maxSum, sum);
            }
            return;
        }
        let key = `${node}-${pathLength}-${sum}`

        if (memo.has(key)) return;
        memo.add(key);

        for (const [neighbor, weight] of graph[node]) {
            const newSum = sum + weight;
            if (newSum >= t) continue;
            dfs(neighbor, pathLength + 1, newSum);
        }
    };

    for (let i = 0; i < n; i++) {
        dfs(i, 0, 0);
    }

    return maxSum;
};