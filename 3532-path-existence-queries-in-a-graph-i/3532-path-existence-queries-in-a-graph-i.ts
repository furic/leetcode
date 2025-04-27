const pathExistenceQueries = (n: number, nums: number[], maxDiff: number, queries: number[][]): boolean[] => {
    // Precompute a "group id" for each node
    const groupId = new Array(n);
    let currentGroup = 0;
    groupId[0] = currentGroup;

    for (let i = 1; i < n; i++) {
        // If adjacent nodes are disconnected, increment group id
        if (nums[i] - nums[i - 1] > maxDiff) {
            currentGroup++;
        }
        groupId[i] = currentGroup;
    }

    // For each query, nodes are connected if they have the same group id
    return queries.map(([u, v]) => groupId[u] === groupId[v]);
};