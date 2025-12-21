# Tree Edge Contribution | 44 Lines | O(n) | 483ms

# Intuition

The total interaction cost is the sum of path distances for all node pairs in the same group. Rather than computing all pairwise distances directly (which would be O(n²)), we can use a key insight: count how many times each edge is traversed across all valid pairs. Each edge's contribution equals the number of valid pairs that use it in their path. By processing the tree bottom-up and tracking group counts in subtrees, we can efficiently calculate each edge's contribution.

# Approach

**Core Strategy:**
- Treat each edge as a separator that divides the tree into two components
- For each edge and each group, count nodes on both sides
- An edge contributes `left[g] * right[g]` to the total for group g
- Use BFS to establish tree structure, then process bottom-up to aggregate subtree counts

**Step-by-Step Process:**

**1. Build Adjacency List:**
- Create an array of arrays representing the undirected tree
- For each edge [u, v], add bidirectional connections
- This allows efficient traversal of neighbors for any node

**2. Count Total Nodes Per Group:**
- Create `totalCount` array indexed by group number (1-20)
- Iterate through all nodes and increment count for each node's group
- This gives us the global count of nodes in each group
- Used later to calculate nodes outside a subtree: `totalCount[g] - subtreeCount[g]`

**3. Establish Tree Structure via BFS:**
- Start BFS from node 0 (arbitrary root)
- Track parent relationships in `parent` array
- Record traversal order in `order` array for bottom-up processing
- Use visited array to ensure each node is processed once
- This gives us a rooted tree structure needed for subtree calculations

**4. Initialize Bottom-Up Processing:**
- Process nodes in reverse BFS order (from leaves toward root)
- This ensures children are processed before parents
- Initialize result counter to accumulate edge contributions
- Create `subtreeCount` 2D structure: for each node and group, track count in subtree

**5. Process Each Node Bottom-Up:**
- For current node u, initialize its own group count: `subtreeCount[u][group[u]] = 1`
- Iterate through all neighbors of u
- Identify children: neighbors where `parent[v] == u`

**6. Calculate Edge Contribution for Each Child:**
- For edge (u, v) where v is u's child:
- For each group g from 1 to 20:
  - Let `c = subtreeCount[v][g]` = nodes of group g in v's subtree
  - Let `outside = totalCount[g] - c` = nodes of group g outside v's subtree
  - This edge is used by all pairs where one node is in v's subtree and other is outside
  - Contribution: `c * outside` (every node inside paired with every node outside)
  - Add this to result

**7. Aggregate Subtree Counts:**
- After calculating edge contribution for child v:
- Merge v's subtree counts into u's subtree counts
- For each group g: `subtreeCount[u][g] += subtreeCount[v][g]`
- This ensures u's subtree count includes all descendants

**8. Why This Works:**

**Edge Contribution Logic:**
- Each edge splits the tree into two components
- For nodes u and v in the same group on opposite sides, the edge is in their path
- If left side has L nodes of group g and right has R nodes, there are L*R pairs using this edge
- By processing each edge once, we count each pair's contribution exactly once

**Bottom-Up Processing Necessity:**
- Children must be processed first to have accurate subtree counts
- Parent aggregates children's counts to maintain correctness
- Reverse BFS order guarantees this property

**Mathematical Correctness:**
- For each edge e and group g: contribution(e, g) = left[g] * right[g]
- Total cost = Σ(over all edges e) Σ(over all groups g) contribution(e, g)
- Each valid pair is counted exactly once (edges in their path each contribute 1)

**9. Optimization Details:**

**Typed Arrays:**
- `Uint32Array` for non-negative integers (counts, indices)
- `Int32Array` for parent (can be -1)
- `Uint8Array` for visited (boolean-like)
- These provide better memory efficiency and performance

**Flat 2D Array:**
- `subtreeCount` stored as 1D array with manual indexing: `u * 21 + g`
- Avoids overhead of nested arrays
- Better cache locality and memory access patterns

**Example Walkthrough (n = 3, edges = [[0,1],[1,2]], group = [1,1,1]):**

Setup:
- adj: {0:[1], 1:[0,2], 2:[1]}
- totalCount[1] = 3
- BFS from 0: order = [0,1,2], parent = [-1,0,1]

Bottom-up processing (reverse order [2,1,0]):

**Node 2:**
- subtreeCount[2][1] = 1 (itself)
- No children, no edges to process

**Node 1:**
- subtreeCount[1][1] = 1 (itself)
- Child v=2:
  - Edge (1,2): group 1 has c=1 in subtree, 3-1=2 outside
  - Contribution: 1 * 2 = 2
  - result = 2
  - Merge: subtreeCount[1][1] += 1 = 2

**Node 0:**
- subtreeCount[0][1] = 1 (itself)
- Child v=1:
  - Edge (0,1): group 1 has c=2 in subtree, 3-2=1 outside
  - Contribution: 2 * 1 = 2
  - result = 2 + 2 = 4
  - Merge: subtreeCount[0][1] += 2 = 3

Final result: 4 ✓

**Verification:**
- Pairs: (0,1) distance 1, (0,2) distance 2, (1,2) distance 1
- Total: 1 + 2 + 1 = 4 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Building adjacency list: O(n) for n-1 edges
  - Counting groups: O(n) single pass
  - BFS traversal: O(n) visits each node once
  - Bottom-up processing: O(n * 20) = O(n) since groups are bounded by 20
  - For each node, iterate through children (total edges visited = O(n))
  - For each child, iterate through 20 groups: O(20) = O(1)
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Adjacency list: O(n) total edges across all lists
  - totalCount: O(20) = O(1) constant
  - parent, order, queue, visited: O(n) each
  - subtreeCount: O(n * 21) = O(n)
  - Overall: O(n)

# Code
```typescript []
const interactionCosts = (
    n: number,
    edges: number[][],
    group: number[]
): number => {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const totalCount = new Uint32Array(21);
    for (let i = 0; i < n; i++) totalCount[group[i]]++;

    const parent = new Int32Array(n).fill(-1);
    const order = new Uint32Array(n);
    const queue = new Uint32Array(n);
    const visited = new Uint8Array(n);

    visited[0] = 1;
    let head = 0,
        tail = 1,
        idx = 0;
    queue[0] = 0;

    while (head < tail) {
        const u = queue[head++];
        order[idx++] = u;
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = 1;
                parent[v] = u;
                queue[tail++] = v;
            }
        }
    }

    let result = 0;
    const subtreeCount = new Uint32Array(n * 21);

    for (let i = n - 1; i >= 0; i--) {
        const u = order[i];
        const uBase = u * 21;
        subtreeCount[uBase + group[u]] = 1;

        for (const v of adj[u]) {
            if (parent[v] === u) {
                const vBase = v * 21;
                for (let g = 1; g <= 20; g++) {
                    const c = subtreeCount[vBase + g];
                    result += c * (totalCount[g] - c);
                }
                for (let g = 1; g <= 20; g++) {
                    subtreeCount[uBase + g] += subtreeCount[vBase + g];
                }
            }
        }
    }

    return result;
};
```