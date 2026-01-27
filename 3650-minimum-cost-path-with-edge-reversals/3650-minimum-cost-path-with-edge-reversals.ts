/**
 * Finds minimum cost path from node 0 to node n-1 with edge reversal option
 * Strategy: Model reversed edges as separate edges with 2× cost, then use Dijkstra's algorithm
 * Each edge u→v generates two graph edges:
 *   - Forward: u→v (cost = original weight)
 *   - Reverse: v→u (cost = 2× original weight, representing switch usage)
 */
const minCost = (n: number, edges: number[][]): number => {
    // Build adjacency list with both forward and reverse edges
    const adjacencyList: [number, number][][] = Array.from({ length: n }, () => []);
    const minCostToNode: number[] = Array.from({ length: n }, () => Infinity);

    // For each directed edge u→v with cost w:
    // - Add forward edge u→v with cost w
    // - Add reverse edge v→u with cost 2w (using the switch)
    for (const [fromNode, toNode, cost] of edges) {
        adjacencyList[fromNode].push([toNode, cost]);           // Normal direction
        adjacencyList[toNode].push([fromNode, 2 * cost]);       // Reversed (2× cost)
    }

    // Min-heap priority queue: [node, totalCost]
    // Ordered by totalCost (ascending)
    const priorityQueue = new PriorityQueue<[number, number]>((a, b) => {
        const [nodeA, costA] = a;
        const [nodeB, costB] = b;
        return costA - costB;
    });

    // Start Dijkstra's algorithm from node 0
    priorityQueue.enqueue([0, 0]);
    minCostToNode[0] = 0;

    while (priorityQueue.size()) {
        const [currentNode, currentCost] = priorityQueue.dequeue();

        // Early exit: reached destination
        if (currentNode === n - 1) {
            return currentCost;
        }

        // Explore all neighbors
        for (const [neighbor, edgeCost] of adjacencyList[currentNode]) {
            const newCost = currentCost + edgeCost;
            
            // Relaxation: found a better path to neighbor
            if (newCost < minCostToNode[neighbor]) {
                minCostToNode[neighbor] = newCost;
                priorityQueue.enqueue([neighbor, newCost]);
            }
        }
    }

    // No path exists from 0 to n-1
    return -1;
};