# Greedy Bottom-Up Tree Processing | 45 Lines | O(n) | 704ms

# Intuition

Each edge flips exactly 2 nodes. Since we need even total flips, check parity first. Process the tree bottom-up: if a leaf needs a flip, toggle the edge to its parent. This propagates changes upward, ensuring all nodes reach their target state.

# Approach

**Parity Check:**
- Each edge toggles 2 nodes
- Total nodes needing flips must be even
- If odd, impossible → return [-1]

**Tree Structure via BFS:**
- Root at node 0
- Build parent and parentEdge arrays
- Store nodes in bottom-up order (reverse BFS)

**Greedy Bottom-Up:**
- Process nodes from leaves to root
- If node needs flip: toggle edge to parent
  - This flips current node and parent
  - Update both states
- This greedy choice is optimal (each edge used at most once)

**Why Greedy Works:**
- Leaves have only one edge
- Must use that edge if leaf needs flip
- Propagating upward ensures all constraints met
- No edge used twice (each node processed once)

**Example: n=7, edges=[[0,1],[1,2],[2,3],[3,4],[3,5],[1,6]], start="0011000", target="0010001"**

Needs flip: nodes {2,3,6}

Bottom-up:
- Node 4: no flip needed
- Node 5: no flip needed
- Node 6: needs flip → toggle edge 5 (6-1), flips {1,6}
- Node 3: needs flip → toggle edge 2 (3-2), flips {2,3}
- Node 2: needs flip → toggle edge 1 (2-1), flips {1,2}
- Node 1: no flip (balanced from operations)

Result: [1,2,5] ✓

# Complexity

- Time complexity: $$O(n)$$
  - BFS: O(n)
  - Bottom-up processing: O(n)
  - Sorting result: O(result size) ≤ O(n)
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Adjacency list: O(n)
  - BFS arrays: O(n)
  - State arrays: O(n)

# Code
```typescript []
const minimumFlips = (n: number, edges: number[][], start: string, target: string): number[] => {
    const need = new Uint8Array(n);
    let totalNeed = 0;
    for (let i = 0; i < n; i++) {
        if (start[i] !== target[i]) {
            need[i] = 1;
            totalNeed++;
        }
    }
    
    if (totalNeed % 2 !== 0) return [-1];
    
    const adj: [number, number][][] = Array.from({length: n}, () => []);
    for (let i = 0; i < edges.length; i++) {
        const [u, v] = edges[i];
        adj[u].push([v, i]);
        adj[v].push([u, i]);
    }
    
    const parent = new Int32Array(n).fill(-1);
    const parentEdge = new Int32Array(n).fill(-1);
    const order = new Int32Array(n);
    const visited = new Uint8Array(n);
    const queue = new Int32Array(n);
    
    queue[0] = 0;
    visited[0] = 1;
    let head = 0, tail = 1, idx = 0;
    
    while (head < tail) {
        const u = queue[head++];
        order[idx++] = u;
        for (const [v, edgeIdx] of adj[u]) {
            if (!visited[v]) {
                visited[v] = 1;
                parent[v] = u;
                parentEdge[v] = edgeIdx;
                queue[tail++] = v;
            }
        }
    }
    
    const state = new Uint8Array(need);
    const result: number[] = [];
    
    for (let i = n - 1; i >= 1; i--) {
        const u = order[i];
        if (state[u] === 1) {
            result.push(parentEdge[u]);
            state[u] ^= 1;
            state[parent[u]] ^= 1;
        }
    }
    
    result.sort((a, b) => a - b);
    return result;
};
```