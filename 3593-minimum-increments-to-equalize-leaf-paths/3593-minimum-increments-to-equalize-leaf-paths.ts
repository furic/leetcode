const minIncrease = (n: number, edges: number[][], cost: number[]): number => {
    // Build adjacency list
    const tree: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }

    /**
     * Recursively returns:
     * [maxPathCostFromThisNode, increaseCount]
     */
    const dfs = (node: number, parent: number): [number, number] => {
        let increaseCount = 0;  // total increases required in this subtree
        let maxChildPath = 0;   // maximum path cost from children
        let maxChildCount = 0;  // number of children with the same max path cost

        for (const child of tree[node]) {
            if (child === parent) continue;
            const [childPathCost, childIncrease] = dfs(child, node);
            increaseCount += childIncrease;

            if (childPathCost > maxChildPath) {
                // New maximum found; previous shorter paths need increases
                increaseCount += maxChildCount;
                maxChildPath = childPathCost;
                maxChildCount = 1;
            } else if (childPathCost === maxChildPath) {
                // Same maximum, no increase needed
                maxChildCount++;
            } else {
                // Shorter path, need to increase to match maximum
                increaseCount++;
            }
        }

        return [maxChildPath + cost[node], increaseCount];
    };

    return dfs(0, -1)[1];
};