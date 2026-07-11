# BFS Component Edge Count Completeness Check | 18 Lines | O(V + E) | 20ms

# Intuition
A connected component with `k` nodes is complete if and only if it has exactly `k*(k-1)/2` edges. We can verify this during BFS by summing degree contributions — the sum of all degrees equals `2 × edgeCount`.

# Approach
- Build an adjacency list.
- For each unvisited node, BFS its entire component while tracking `nodeCount` and `edgeDegreeSum` (sum of all adjacency list lengths in the component).
- After BFS, `edgeDegreeSum / 2` is the edge count. Compare to `nodeCount * (nodeCount - 1) / 2`.
- Count components where this holds.

# Complexity
- Time complexity: $$O(V + E)$$ — each node and edge is visited once.

- Space complexity: $$O(V + E)$$ — adjacency list and BFS queue.

# Code
```typescript []
const countCompleteComponents = (n: number, edges: number[][]): number => {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    const visited = new Array<boolean>(n).fill(false);

    const isComplete = (start: number): boolean => {
        const queue = [start];
        visited[start] = true;
        let head = 0, nodeCount = 0, edgeDegreeSum = 0;

        while (head < queue.length) {
            const curr = queue[head++];
            nodeCount++;
            edgeDegreeSum += adj[curr].length;
            for (const nb of adj[curr])
                if (!visited[nb]) { visited[nb] = true; queue.push(nb); }
        }

        return edgeDegreeSum / 2 === nodeCount * (nodeCount - 1) / 2;
    };

    let count = 0;
    for (let i = 0; i < n; i++)
        if (!visited[i] && isComplete(i)) count++;

    return count;
};
```