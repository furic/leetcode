# Max Depth DFS + Half Power of Two | 14 Lines | O(n) | 1ms

# Intuition
The path from root to the deepest node has `d` edges. Each edge can be 1 or 2 — there are `2^d` total assignments. Exactly half give an odd total (by symmetry: flipping any single edge toggles parity, so exactly `2^(d-1)` assignments yield odd sums). The answer is `2^(d-1) mod (10^9 + 7)`.

# Approach
- Build an adjacency list from the edges.
- Find the maximum depth `d` of the tree rooted at node 1 via DFS (tracking parent to avoid revisiting).
- Return `modPow(2, d - 1)` — the number of assignments giving odd total cost on the longest path.
- **Why half:** For any path of `d` edges with values in `{1, 2}`, note that `1 ≡ 1 (mod 2)` and `2 ≡ 0 (mod 2)`. So parity of the sum equals the count of edges assigned 1, mod 2. Out of all `2^d` binary choices, exactly `2^(d-1)` have an odd number of 1s — a standard combinatorial identity.

# Complexity
- Time complexity: $$O(n)$$ — one DFS traversal; `modPow` is $$O(\log d)$$ which is $$O(\log n)$$.

- Space complexity: $$O(n)$$ — adjacency list and recursion stack.

# Code
```typescript []
const assignEdgeWeights = (edges: number[][]): number => {
    const MOD = 1_000_000_007n;

    const modPow = (base: number, exp: number): number => {
        let result = 1n;
        let b = BigInt(base);
        while (exp > 0) {
            if (exp & 1) result = result * b % MOD;
            b = b * b % MOD;
            exp >>= 1;
        }
        return Number(result);
    };

    const maxDepth = (adj: number[][], node: number, parent: number): number => {
        let depth = 0;
        for (const neighbour of adj[node]) {
            if (neighbour !== parent)
                depth = Math.max(depth, maxDepth(adj, neighbour, node) + 1);
        }
        return depth;
    };

    const n = edges.length + 1;
    const adj: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    return modPow(2, maxDepth(adj, 1, 0) - 1);
};
```