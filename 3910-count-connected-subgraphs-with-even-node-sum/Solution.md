# Bitmask BFS Connected Even-Sum Subsets | 28 Lines | O(2ⁿ × n) | 8ms

# Intuition
With `n ≤ 13`, there are at most `2^13 = 8192` non-empty subsets. For each, we need to check connectivity and even sum. Bitmask BFS makes connectivity checking O(n) per subset, and precomputed parity tables give O(1) sum checks.

# Approach
- **Adjacency bitmasks:** For each node, store its neighbours as a bitmask in `adj[u]` — enables fast bitwise intersection during BFS.
- **Precomputed tables:** Build `valueParity[mask]` (XOR of all `nums[node]` for nodes in mask) using the recurrence: strip the lowest bit, get its node index, XOR the previous parity with that node's value. Since values are 0 or 1, XOR parity = sum parity.
- **For each mask:**
  - Skip if `valueParity[mask] !== 0` (sum is odd).
  - BFS within the subset: start from the lowest-set-bit node. At each step, expand to all unvisited neighbours that are also in `mask` (using `adj[node] & mask & ~visited`). Use pure bitmask operations — no queue array needed.
  - If `visited === mask` after BFS, the subset is connected — increment result.
- Bitmask BFS is O(n) per subset since each node is processed once, giving O(n × 2^n) total.

# Complexity
- Time complexity: $$O(2^n \times n)$$ — precomputation is $$O(2^n)$$; BFS per mask is $$O(n)$$.

- Space complexity: $$O(2^n + n)$$ — parity tables and adjacency array.

# Code
```typescript []
const evenSumSubgraphs = (nums: number[], edges: number[][]): number => {
    const n = nums.length;

    const adj = new Int32Array(n);
    for (const [u, v] of edges) {
        adj[u] |= 1 << v;
        adj[v] |= 1 << u;
    }

    const valueParity = new Uint8Array(1 << n);
    for (let mask = 1; mask < (1 << n); mask++) {
        const lowestBit = mask & -mask;
        const node = 31 - Math.clz32(lowestBit);
        valueParity[mask] = valueParity[mask ^ lowestBit] ^ nums[node];
    }

    let result = 0;

    for (let mask = 1; mask < (1 << n); mask++) {
        if (valueParity[mask] !== 0) continue;

        const startNode = 31 - Math.clz32(mask & -mask);
        let visited = 1 << startNode;
        let queue = visited;

        while (queue !== 0) {
            const bit = queue & -queue;
            queue ^= bit;
            const node = 31 - Math.clz32(bit);
            const reachable = adj[node] & mask & ~visited;
            visited |= reachable;
            queue |= reachable;
        }

        if (visited === mask) result++;
    }

    return result;
};
```