# Dijkstra with Edge Reversal Modeling | 42 Lines | O((V+E) log V)

# Intuition

Model edge reversal as adding reverse edges with 2× cost to the graph. This transforms the problem into standard shortest path finding. Use Dijkstra's algorithm to find minimum cost path from 0 to n-1.

# Approach

**Graph Transformation:**
- For each directed edge u→v with cost w:
  - Add forward edge: u→v (cost w)
  - Add reverse edge: v→u (cost 2w, representing switch usage)
- This allows Dijkstra to naturally consider reversals

**Dijkstra's Algorithm:**
1. Start from node 0 with cost 0
2. Use min-heap to always process lowest cost node
3. For each neighbor, try relaxation (update if new cost is lower)
4. Early exit when reaching node n-1
5. Return -1 if no path exists

**Why This Works:**
- Each original edge can be used forward (cost w) or reversed once (cost 2w)
- Modeling as two separate edges lets Dijkstra choose optimally
- Greedy choice property ensures minimum cost path

**Example: n=4, edges=[[0,1,3],[3,1,1],[2,3,4],[0,2,2]]**

Graph after transformation:
- 0→1 (3), 1→0 (6)
- 3→1 (1), 1→3 (2)
- 2→3 (4), 3→2 (8)
- 0→2 (2), 2→0 (4)

Dijkstra from 0:
- Visit 0: cost=0
- Process 1 (cost 3), 2 (cost 2)
- From 2: reach 3 (cost 2+4=6)
- From 1: reach 3 via reverse (cost 3+2=5) ✓

Result: 5 ✓

# Complexity

- Time complexity: $$O((V+E) \log V)$$
  - Build graph: O(E)
  - Dijkstra: O((V+E) log V) with binary heap
  - V = n nodes, E = 2×edges (forward + reverse)
  - Overall: O((V+E) log V)

- Space complexity: $$O(V+E)$$
  - Adjacency list: O(E)
  - Priority queue: O(V)
  - Distance array: O(V)
  - Overall: O(V+E)

# Code
```typescript []
const minCost = (n: number, edges: number[][]): number => {
    const adjacencyList: [number, number][][] = Array.from({ length: n }, () => []);
    const minCostToNode: number[] = Array.from({ length: n }, () => Infinity);

    for (const [fromNode, toNode, cost] of edges) {
        adjacencyList[fromNode].push([toNode, cost]);
        adjacencyList[toNode].push([fromNode, 2 * cost]);
    }

    const priorityQueue = new PriorityQueue<[number, number]>((a, b) => {
        const [nodeA, costA] = a;
        const [nodeB, costB] = b;
        return costA - costB;
    });

    priorityQueue.enqueue([0, 0]);
    minCostToNode[0] = 0;

    while (priorityQueue.size()) {
        const [currentNode, currentCost] = priorityQueue.dequeue();

        if (currentNode === n - 1) {
            return currentCost;
        }

        for (const [neighbor, edgeCost] of adjacencyList[currentNode]) {
            const newCost = currentCost + edgeCost;
            
            if (newCost < minCostToNode[neighbor]) {
                minCostToNode[neighbor] = newCost;
                priorityQueue.enqueue([neighbor, newCost]);
            }
        }
    }

    return -1;
};
```