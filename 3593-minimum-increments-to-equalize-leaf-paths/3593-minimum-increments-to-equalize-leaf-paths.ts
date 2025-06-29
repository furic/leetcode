/**
 * You are given an integer n and an undirected tree rooted at node 0 with n nodes.
 * Each node has an associated cost. The score of a path is the sum of costs of all nodes.
 * Your goal is to make the scores of all root-to-leaf paths equal by increasing the cost
 * of any number of nodes.
 * Return the minimum number of nodes whose cost must be increased.
 *
 * @param n The number of nodes in the tree.
 * @param edges A 2D array representing the undirected edges of the tree.
 * @param cost An array where cost[i] is the cost of traversing node i.
 * @returns The minimum number of nodes whose cost must be increased.
 */
const minIncrease = (n: number, edges: number[][], cost: number[]): number => {
    // If there's only one node, there are no paths to equalize, so 0 increases are needed.
    // The constraints state n >= 2, but this is a good safeguard.
    if (n <= 1) {
        return 0;
    }

    // 1. Build an adjacency list to represent the tree for efficient traversal.
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // This variable will be captured by the DFS function and will accumulate the count of increases.
    let increases = 0;

    /**
     * A recursive DFS function to perform a post-order traversal of the tree.
     * It calculates the cost of paths and determines the necessary increases.
     * @param u The current node being visited.
     * @param p The parent of the current node in the traversal, to avoid going backward.
     * @returns The maximum path cost from the current node 'u' to a leaf in its subtree.
     * This returned value represents the "equalized" cost for all paths starting from u.
     */
    const dfs = (u: number, p: number): number => {
        // A node is a leaf in the context of this traversal if it has no children.
        // Children are neighbors that are not the parent.
        const children = adj[u].filter(v => v !== p);

        // Base case: If the current node is a leaf, the only path from it is to itself.
        // The cost of this path is simply the cost of the node.
        if (children.length === 0) {
            return cost[u];
        }

        // Recursive step: For an internal node, compute the path costs from all its children.
        const childPathCosts = children.map(child => dfs(child, u));
        
        // To equalize path costs, all paths must match the most expensive one, since we can only increase costs.
        // Find the maximum path cost among all child subtrees.
        const maxChildCost = Math.max(...childPathCosts);
        
        // For each child's branch, if its maximum path cost is less than the overall maximum,
        // we must perform an increase in that branch. The most efficient way is to increase the child node's
        // cost, which counts as one modification.
        for (const childCost of childPathCosts) {
            if (childCost < maxChildCost) {
                increases++;
            }
        }
        
        // The new unified path cost from this node 'u' down to any leaf in its subtree
        // is its own cost plus the newly equalized maximum cost from its children.
        return cost[u] + maxChildCost;
    };

    // 2. Start the DFS from the root of the tree, which is node 0.
    // We use -1 as a dummy parent for the root.
    dfs(0, -1);

    // 3. The 'increases' variable now holds the total minimum number of nodes to modify.
    return increases;
};
