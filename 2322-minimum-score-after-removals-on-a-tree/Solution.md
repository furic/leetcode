# Double Edge Removal Tree XOR | 65 Lines | O(n^2) | 90ms

# Intuition

We need to **remove two edges to form three connected components** in a tree and **minimize the difference between the largest and smallest XOR among the three components**. A brute-force check for all pairs of removable edges is feasible due to \( n \leq 1000 \), provided we compute subtree XORs efficiently.

# Approach

1. **Build the tree:** Construct an adjacency list for the tree.
2. **Precompute subtree XORs and in/out times:**  
   - Use a DFS to compute:
     - `xorSubtree[u]`: XOR of all values in the subtree rooted at `u`.
     - `inTime[u]` and `outTime[u]`: entry and exit timestamps to check ancestor relationships efficiently.
3. **Define `isAncestor(a, b)`** using in/out times to check if `a` is an ancestor of `b`.
4. **Try all pairs of nodes `(u, v)` to simulate removing the edges above them:**
   - **Case 1:** `u` is ancestor of `v`.
   - **Case 2:** `v` is ancestor of `u`.
   - **Case 3:** Disjoint subtrees.
   - Compute the XOR of the three resulting components for each case and update the minimum score.
5. Return the minimum score after checking all pairs.

# Complexity

- Time complexity:  
  $$O(n^2)$$  
  for iterating over all pairs and constant time checks per pair.
- Space complexity:  
  $$O(n)$$  
  for storing subtree XORs, in/out times, and the tree structure.

# Code

```typescript
const minimumScore = (nums: number[], edges: number[][]): number => {
    const n = nums.length;
    const graph: number[][] = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const xorSubtree = Array(n).fill(0);
    const inTime = Array(n).fill(0);
    const outTime = Array(n).fill(0);
    let timestamp = 0;

    const dfs = (node: number, parent: number) => {
        inTime[node] = timestamp++;
        xorSubtree[node] = nums[node];
        for (const neighbor of graph[node]) {
            if (neighbor !== parent) {
                dfs(neighbor, node);
                xorSubtree[node] ^= xorSubtree[neighbor];
            }
        }
        outTime[node] = timestamp;
    };

    dfs(0, -1);

    const isAncestor = (ancestor: number, child: number) =>
        inTime[child] > inTime[ancestor] && inTime[child] < outTime[ancestor];

    const totalXor = xorSubtree[0];
    let minScore = Infinity;

    const computeScore = (a: number, b: number, c: number) =>
        Math.max(a, b, c) - Math.min(a, b, c);

    for (let u = 1; u < n; u++) {
        for (let v = u + 1; v < n; v++) {
            let xor1, xor2, xor3;

            if (isAncestor(u, v)) {
                xor1 = totalXor ^ xorSubtree[u];
                xor2 = xorSubtree[u] ^ xorSubtree[v];
                xor3 = xorSubtree[v];
            } else if (isAncestor(v, u)) {
                xor1 = totalXor ^ xorSubtree[v];
                xor2 = xorSubtree[v] ^ xorSubtree[u];
                xor3 = xorSubtree[u];
            } else {
                xor1 = totalXor ^ xorSubtree[u] ^ xorSubtree[v];
                xor2 = xorSubtree[u];
                xor3 = xorSubtree[v];
            }

            minScore = Math.min(minScore, computeScore(xor1, xor2, xor3));
        }
    }

    return minScore;
};
```