const maxTargetNodes = (edges1: number[][], edges2: number[][]): number[] => {
    // Build adjacency list for a tree from edges
    const buildAdjacencyList = (edges: number[][]): number[][] => {
        const size = edges.length + 1;
        const adjList: number[][] = Array.from({ length: size }, () => []);
        for (const [u, v] of edges) {
            adjList[u].push(v);
            adjList[v].push(u);
        }
        return adjList;
    };

    let evenCountA = 0, oddCountA = 0;
    let evenCountB = 0, oddCountB = 0;

    // DFS to color the tree and count even/odd distances from root
    const dfsColor = (
        adj: number[][],
        node: number,
        parent: number,
        color: number[],
        isFirstTree: boolean
    ) => {
        if (color[node] === 0) {
            isFirstTree ? evenCountA++ : evenCountB++;
        } else {
            isFirstTree ? oddCountA++ : oddCountB++;
        }

        for (const neighbor of adj[node]) {
            if (neighbor !== parent) {
                color[neighbor] = color[node] ^ 1;
                dfsColor(adj, neighbor, node, color, isFirstTree);
            }
        }
    };

    // Build the trees
    const adjListA = buildAdjacencyList(edges1);
    const adjListB = buildAdjacencyList(edges2);
    const n = adjListA.length;

    // Color both trees starting from node 0
    const colorA = Array(n).fill(-1);
    const colorB = Array(adjListB.length).fill(-1);
    colorA[0] = 0;
    dfsColor(adjListA, 0, -1, colorA, true);
    colorB[0] = 0;
    dfsColor(adjListB, 0, -1, colorB, false);

    // Pick the maximum parity group size from Tree B (even or odd)
    const maxParityGroupSizeB = Math.max(evenCountB, oddCountB);

    // For each node in Tree A, combine its parity group with the max group in Tree B
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
        const ownGroupSize = colorA[i] === 0 ? evenCountA : oddCountA;
        result[i] = ownGroupSize + maxParityGroupSizeB;
    }

    return result;
};