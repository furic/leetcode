const minEdgeReversals = (n: number, edges: number[][]): number[] => {
    // Adjacency map: neighbor → cost to traverse (1 = must reverse, -1 = already correct direction)
    const adjMap = Array.from({ length: n }, () => new Map<number, number>());
    for (const [from, to] of edges) {
        adjMap[from].set(to, -1); // Outgoing: free to traverse
        adjMap[to].set(from, 1);  // Incoming: costs 1 reversal to traverse outward
    }

    // Pass 1: count reversals needed to reach all nodes from node 0
    const countReversalsFrom0 = (node: number, parent: number): number => {
        let cost = 0;
        for (const [neighbour, direction] of adjMap[node]) {
            if (neighbour !== parent) {
                if (direction > 0) cost += direction;
                cost += countReversalsFrom0(neighbour, node);
            }
        }
        return cost;
    };

    // Pass 2: re-root — when moving root from parent to child, the edge between them flips role
    const rerootDFS = (node: number, parent: number, reversals: number): void => {
        answer[node] = reversals;
        for (const [neighbour, direction] of adjMap[node]) {
            if (neighbour !== parent) {
                // Moving root to neighbour: edge direction flips, so cost changes by -direction
                rerootDFS(neighbour, node, reversals - direction);
            }
        }
    };

    const answer = new Array<number>(n).fill(0);
    rerootDFS(0, -1, countReversalsFrom0(0, -1));
    return answer;
};