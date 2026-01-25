# Three BFS with Pythagorean Check | 81 Lines | O(n) | 514ms

# Intuition

Compute distances from each target node to all nodes using BFS. For each node, check if its three distances form a Pythagorean triplet (a² + b² = c² when sorted).

# Approach

**Distance Computation:**
- Run BFS from each target (x, y, z)
- Store distances in separate arrays
- BFS ensures shortest paths in unweighted tree

**Pythagorean Check:**
- For each node, get distances (dx, dy, dz)
- Sort the three distances manually (faster than array.sort for 3 elements)
- Check if smallest² + middle² = largest²

**Optimization:**
- Use index-based queue reading (avoid shift)
- Manual 3-element sort (6 comparisons max)
- Direct distance array indexing

**Example: n=4, edges=[[0,1],[0,2],[0,3]], x=1, y=2, z=3**

Distances:
- From x=1: [1,0,2,2]
- From y=2: [1,2,0,2]
- From z=3: [1,2,2,0]

Check each node:
- Node 0: (1,1,1) → sorted (1,1,1) → 1²+1²≠1² ✗
- Node 1: (0,2,2) → sorted (0,2,2) → 0²+2²=4=2² ✓
- Node 2: (2,0,2) → sorted (0,2,2) → 0²+2²=4=2² ✓
- Node 3: (2,2,0) → sorted (0,2,2) → 0²+2²=4=2² ✓

Result: 3 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Build adjacency list: O(n)
  - Three BFS: O(n) each = O(3n)
  - Check all nodes: O(n)
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Adjacency list: O(n)
  - Three distance arrays: O(3n)
  - BFS queue: O(n)
  - Overall: O(n)

# Code
```typescript []
const specialNodes = (
    numNodes: number, 
    edges: number[][], 
    targetX: number, 
    targetY: number, 
    targetZ: number
): number => {
    const adjacencyList: number[][] = Array.from({ length: numNodes }, () => []);
    
    for (const [nodeU, nodeV] of edges) {
        adjacencyList[nodeU].push(nodeV);
        adjacencyList[nodeV].push(nodeU);
    }

    const computeDistancesFromNode = (startNode: number): number[] => {
        const distances = new Int32Array(numNodes).fill(-1);
        distances[startNode] = 0;
        
        const queue: number[] = [startNode];
        let queueReadIndex = 0;

        while (queueReadIndex < queue.length) {
            const currentNode = queue[queueReadIndex++];
            const currentDistance = distances[currentNode];

            for (const neighbor of adjacencyList[currentNode]) {
                if (distances[neighbor] === -1) {
                    distances[neighbor] = currentDistance + 1;
                    queue.push(neighbor);
                }
            }
        }
        
        return distances as unknown as number[];
    };

    const distancesFromX = computeDistancesFromNode(targetX);
    const distancesFromY = computeDistancesFromNode(targetY);
    const distancesFromZ = computeDistancesFromNode(targetZ);

    let specialNodeCount = 0;

    for (let node = 0; node < numNodes; node++) {
        const distToX = distancesFromX[node];
        const distToY = distancesFromY[node];
        const distToZ = distancesFromZ[node];

        let smallest, middle, largest;
        
        if (distToX <= distToY && distToX <= distToZ) {
            smallest = distToX;
            if (distToY <= distToZ) {
                middle = distToY;
                largest = distToZ;
            } else {
                middle = distToZ;
                largest = distToY;
            }
        } else if (distToY <= distToX && distToY <= distToZ) {
            smallest = distToY;
            if (distToX <= distToZ) {
                middle = distToX;
                largest = distToZ;
            } else {
                middle = distToZ;
                largest = distToX;
            }
        } else {
            smallest = distToZ;
            if (distToX <= distToY) {
                middle = distToX;
                largest = distToY;
            } else {
                middle = distToY;
                largest = distToX;
            }
        }

        if (smallest * smallest + middle * middle === largest * largest) {
            specialNodeCount++;
        }
    }

    return specialNodeCount;
};
```