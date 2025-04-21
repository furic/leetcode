const longestSpecialPath = (edges: number[][], nums: number[]): number[] => {
    const n = nums.length;
    const graph: [number, number][][] = Array.from({ length: n }, () => []);

    for (const [u, v, length] of edges) {
        graph[u].push([v, length]);
        graph[v].push([u, length]);
    }

    let res: [number, number] = [0, 1]; // Stores max path length & min nodes
    const depth: number[] = Array(50001).fill(0); // Track depth of each number

    const dfs = (
        current: number, // Current node index
        parent: number, // Parent node index
        left: number,
        curDepth: number,
        pathSum: number[],
    ) => {
        const prevDepth = depth[nums[current]];
        depth[nums[current]] = curDepth;

        left = Math.max(left, prevDepth);
        res = minTuple(res, [-(pathSum[pathSum.length - 1] - pathSum[left]), curDepth - left]);

        for (const [neighbor, length] of graph[current]) {
            if (neighbor !== parent) {
                pathSum.push(pathSum[pathSum.length - 1] + length);
                dfs(neighbor, current, left, curDepth + 1, pathSum);
                pathSum.pop();
            }
        }

        depth[nums[current]] = prevDepth; // Restore previous depth after backtracking
    }

    const minTuple = (a: [number, number], b: [number, number]): [number, number] => {
        return a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? a : b;
    }

    dfs(0, -1, 0, 1, [0]);

    return [-res[0], res[1]];
}