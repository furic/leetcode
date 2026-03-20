# Rerooting DP Clean Two-Pass | 22 Lines | O(n) | 435ms

# Intuition
Computing reversals independently for each node naively is O(n²). Instead, use rerooting: compute the answer for node 0 with one DFS, then propagate to all other nodes with a second DFS — adjusting by ±1 as the root "moves" across each edge.

# Approach
- **Graph encoding:** Each undirected tree edge is stored with a direction cost in both directions:
  - `adjMap[from].set(to, -1)` — traversing `from → to` is free (edge already points that way).
  - `adjMap[to].set(from, +1)` — traversing `to → from` costs 1 reversal (edge points the wrong way).
- **Pass 1 — `countReversalsFrom0`:** Recursively sum up the cost of all edges that point "inward" (toward node 0) when traversing the tree outward from node 0. Any `direction > 0` encountered means the edge resists outward traversal. This gives the base answer for node 0.
- **Pass 2 — `rerootDFS`:** Propagate the cost as we re-root the tree one step at a time. When moving the root from `node` to `neighbour` across an edge with cost `direction`:
  - The edge that was free (or costly) from `node`'s perspective flips: new cost = `reversals - direction`.
  - If `direction = -1` (free from node's side), it becomes `reversals + 1` from neighbour's side — the edge now opposes outward traversal.
  - If `direction = +1` (costly from node's side), it becomes `reversals - 1` from neighbour's side — the edge now aids outward traversal.
  - Set `answer[neighbour] = reversals - direction` and recurse.
- This version is cleaner than a mutable-closure approach — the reversal delta is passed as a parameter rather than modified in place.

# Complexity
- Time complexity: $$O(n)$$ — two DFS passes each visiting every node once.

- Space complexity: $$O(n)$$ — adjacency maps and recursion stack depth up to `n`.

# Code
```typescript []
const minEdgeReversals = (n: number, edges: number[][]): number[] => {
    const adjMap = Array.from({ length: n }, () => new Map<number, number>());
    for (const [from, to] of edges) {
        adjMap[from].set(to, -1);
        adjMap[to].set(from, 1);
    }

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

    const rerootDFS = (node: number, parent: number, reversals: number): void => {
        answer[node] = reversals;
        for (const [neighbour, direction] of adjMap[node]) {
            if (neighbour !== parent) {
                rerootDFS(neighbour, node, reversals - direction);
            }
        }
    };

    const answer = new Array<number>(n).fill(0);
    rerootDFS(0, -1, countReversalsFrom0(0, -1));
    return answer;
};
```