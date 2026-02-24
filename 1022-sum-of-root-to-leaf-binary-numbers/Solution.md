# DFS Bit Shift Accumulation | 12 Lines | O(n) | | 0ms

# Intuition
Each step deeper into the tree appends a bit to the right of the current path value — exactly what a left shift by 1 and OR with the current node's value achieves. We accumulate the running binary number as we descend, and add it to the total only at leaf nodes.

# Approach
- Use a recursive DFS helper `dfs(node, pathValue)` where `pathValue` is the binary number built so far along the current root-to-node path.
- At each node, update the path value: `currentPathValue = (pathValue << 1) | node.val`.
  - Left shift by 1 makes room for the new bit (equivalent to multiplying by 2).
  - OR with `node.val` appends the current bit at the least significant position.
- **Leaf node:** if both `node.left` and `node.right` are `null`, the path is complete — add `currentPathValue` to `totalSum`.
- **Internal node:** recurse into left and right children, passing `currentPathValue` forward.
- Base case: if `node` is `null`, return immediately (handles missing children of near-leaf nodes).
- After DFS completes, return `totalSum`.

# Complexity
- Time complexity: $$O(n)$$ — every node is visited exactly once.

- Space complexity: $$O(h)$$ where $$h$$ is the height of the tree, due to the recursive call stack. Worst case $$O(n)$$ for a skewed tree, $$O(\log n)$$ for a balanced tree.

# Code
```typescript []
const sumRootToLeaf = (root: TreeNode | null): number => {
    let totalSum = 0;

    const dfs = (node: TreeNode | null, pathValue: number) => {
        if (!node) return;

        const currentPathValue = (pathValue << 1) | node.val;

        if (node.left === null && node.right === null) {
            totalSum += currentPathValue;
            return;
        }

        dfs(node.left, currentPathValue);
        dfs(node.right, currentPathValue);
    };

    dfs(root, 0);
    return totalSum;
};
```