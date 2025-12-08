# Tree DP with Rerooting | 35 Lines | O(n) | 808ms

# Intuition
For each node, we need to find the best connected subgraph containing it. This is a classic tree DP problem with rerooting, where we compute optimal subtree values, then propagate information from parent to child to get the full answer for each node.

# Approach
- **Problem Transformation**:
  - Convert good/bad to +1/-1: good node adds 1, bad node subtracts 1
  - For any node, we can choose to include or exclude each of its subtrees
  - Include subtree only if its score is positive

- **Tree Structure via BFS**:
  - Root the tree at node 0 arbitrarily
  - Use BFS to establish parent-child relationships
  - Record processing order for bottom-up and top-down passes

- **Bottom-Up DP (Subtree Scores)**:
  - `dp[u]` = maximum score for connected subgraph containing u, considering only u's subtree
  - For each node u: `dp[u] = val[u] + sum of max(0, dp[v])` for all children v
  - We only include child subtrees if they contribute positively
  - Process nodes in reverse BFS order (leaves to root)

- **Top-Down Rerooting (Parent Contributions)**:
  - `up[u]` = best contribution from u's parent side
  - When moving from parent u to child v, compute what u contributes to v
  - `up[v] = max(0, dp[u] - max(0, dp[v]) + up[u])`
  - This removes v's contribution from u's subtree, then adds parent's contribution

- **Final Answer**:
  - `ans[u] = dp[u] + up[u]`
  - Combines best from u's subtree with best from parent side

- **Why Rerooting Works**:
  - dp[u] considers u as the root of a subtree
  - up[u] provides information from the "other side" of the tree
  - Together they give the answer as if u were the root of the entire tree

- **Example Walkthrough** (n=3, edges=[[0,1],[1,2]], good=[1,0,1]):
  - Tree: 0-1-2, values: [1, -1, 1]
  - Bottom-up:
    - dp[2] = 1 (leaf)
    - dp[1] = -1 + max(0, 1) = 0 (include child 2)
    - dp[0] = 1 + max(0, 0) = 1 (include child 1)
  - Top-down:
    - up[0] = 0 (root)
    - up[1] = max(0, 1 - 0 + 0) = 1 (contribution from node 0)
    - up[2] = max(0, 0 - 1 + 1) = 0
  - Answers:
    - ans[0] = 1 + 0 = 1 ✓
    - ans[1] = 0 + 1 = 1 ✓
    - ans[2] = 1 + 0 = 1 ✓

# Complexity
- Time complexity: $$O(n)$$
  - Build adjacency list: O(n)
  - BFS traversal: O(n)
  - Bottom-up DP: O(n) nodes, each processes its children once
  - Top-down rerooting: O(n) nodes, each processes its children once
  - Total: O(n)

- Space complexity: $$O(n)$$
  - Adjacency list: O(n)
  - DP arrays (dp, up, ans, parent, order): O(n)
  - BFS queue: O(n)
  - Total: O(n)

# Code
```typescript
const maxSubgraphScore = (n: number, edges: number[][], good: number[]): number[] => {
    const adj: number[][] = Array.from({length: n}, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }
    
    const val = good.map(g => g === 1 ? 1 : -1);
    const dp = new Array(n).fill(0);
    const parent = new Array(n).fill(-1);
    const order: number[] = [];
    
    const visited = new Array(n).fill(false);
    const queue = [0];
    visited[0] = true;
    let head = 0;
    
    while (head < queue.length) {
        const u = queue[head++];
        order.push(u);
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                parent[v] = u;
                queue.push(v);
            }
        }
    }
    
    for (let i = n - 1; i >= 0; i--) {
        const u = order[i];
        dp[u] = val[u];
        for (const v of adj[u]) {
            if (parent[v] === u) {
                dp[u] += Math.max(0, dp[v]);
            }
        }
    }
    
    const up = new Array(n).fill(0);
    const ans = new Array(n).fill(0);
    
    for (const u of order) {
        ans[u] = dp[u] + up[u];
        for (const v of adj[u]) {
            if (parent[v] === u) {
                up[v] = Math.max(0, dp[u] - Math.max(0, dp[v]) + up[u]);
            }
        }
    }
    
    return ans;
};
```