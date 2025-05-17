function subtreeInversionSum(edges: number[][], nums: number[], k: number): number {
    const n = nums.length;

    // Build adjacency list for the tree
    const graph: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    // DFS function to compute min and max subtree sums with inversion constraints
    const dfs = (node: number, parent: number | undefined): [number[], number[]] => {
        // Initialize current node values
        const minSumAtDist: number[] = Array(k).fill(nums[node]);
        const maxSumAtDist: number[] = Array(k).fill(nums[node]);

        for (const child of graph[node]) {
            if (child === parent) continue;

            const [childMin, childMax] = dfs(child, node);

            // Shift each child's contribution one level deeper
            for (let i = 0; i < k; i++) {
                minSumAtDist[(i + 1) % k] += childMin[i];
                maxSumAtDist[(i + 1) % k] += childMax[i];
            }
        }

        // Option to invert at this node (only if no other inverted node is within k distance)
        const maxWithInversion = Math.max(
            minSumAtDist[0], maxSumAtDist[0],
            -minSumAtDist[0], -maxSumAtDist[0]
        );
        const minWithInversion = Math.min(
            minSumAtDist[0], maxSumAtDist[0],
            -minSumAtDist[0], -maxSumAtDist[0]
        );

        minSumAtDist[0] = minWithInversion;
        maxSumAtDist[0] = maxWithInversion;

        // Make each earlier distance inherit the best from further away (to allow flexibility in subtree reuse)
        for (let i = k - 2; i >= 0; i--) {
            maxSumAtDist[i] = Math.max(maxSumAtDist[i], maxSumAtDist[i + 1]);
            minSumAtDist[i] = Math.min(minSumAtDist[i], minSumAtDist[i + 1]);
        }

        return [minSumAtDist, maxSumAtDist];
    };

    // Start DFS from root node 0
    const [_, maxResult] = dfs(0, undefined);

    // The best possible total sum is the max value at any valid inversion distance
    return Math.max(...maxResult);
}