/**
 * Counts special nodes in a tree where distances to three targets form Pythagorean triplets
 * A node is special if its distances (dx, dy, dz) to targets (x, y, z) satisfy: a² + b² = c²
 * Strategy: BFS from each target to compute all distances, then check Pythagorean condition
 */
const specialNodes = (
    numNodes: number, 
    edges: number[][], 
    targetX: number, 
    targetY: number, 
    targetZ: number
): number => {
    // Build adjacency list representation of the tree
    const adjacencyList: number[][] = Array.from({ length: numNodes }, () => []);
    
    for (const [nodeU, nodeV] of edges) {
        adjacencyList[nodeU].push(nodeV);
        adjacencyList[nodeV].push(nodeU);
    }

    /**
     * Computes shortest distances from a start node to all other nodes using BFS
     * @param startNode - source node for distance calculations
     * @returns array where distances[i] = distance from startNode to node i
     */
    const computeDistancesFromNode = (startNode: number): number[] => {
        const distances = new Int32Array(numNodes).fill(-1);
        distances[startNode] = 0;
        
        // BFS queue with index-based reading (avoids O(n) shift operations)
        const queue: number[] = [startNode];
        let queueReadIndex = 0;

        while (queueReadIndex < queue.length) {
            const currentNode = queue[queueReadIndex++];
            const currentDistance = distances[currentNode];

            // Visit all unvisited neighbors
            for (const neighbor of adjacencyList[currentNode]) {
                if (distances[neighbor] === -1) {
                    distances[neighbor] = currentDistance + 1;
                    queue.push(neighbor);
                }
            }
        }
        
        return distances as unknown as number[];
    };

    // Compute distances from each of the three target nodes to all nodes
    const distancesFromX = computeDistancesFromNode(targetX);
    const distancesFromY = computeDistancesFromNode(targetY);
    const distancesFromZ = computeDistancesFromNode(targetZ);

    let specialNodeCount = 0;

    // Check each node to see if its distances form a Pythagorean triplet
    for (let node = 0; node < numNodes; node++) {
        const distToX = distancesFromX[node];
        const distToY = distancesFromY[node];
        const distToZ = distancesFromZ[node];

        // Sort the three distances in ascending order: a ≤ b ≤ c
        const sortedDistances = [distToX, distToY, distToZ].sort((a, b) => a - b);
        const [smallest, middle, largest] = sortedDistances;

        // Check Pythagorean theorem: a² + b² = c²
        if (smallest * smallest + middle * middle === largest * largest) {
            specialNodeCount++;
        }
    }

    return specialNodeCount;
};