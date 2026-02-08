# DFS with Height Tracking | 17 Lines | O(n) | 0ms

# Intuition

A tree is height-balanced if every node's left and right subtrees differ in height by at most 1. Use DFS to compute heights while checking the balance condition at each node.

# Approach

**Post-Order DFS:**
1. Recursively compute heights of left and right subtrees
2. Check if |leftHeight - rightHeight| ≤ 1
3. If violated at any node, mark tree as unbalanced
4. Return max(leftHeight, rightHeight) + 1

**Early Detection:**
- Use flag to track balance status
- Continue DFS to compute all heights (simplifies logic)
- Could optimize with early termination by returning -1 for unbalanced

**Example: root=[3,9,20,null,null,15,7]**
```
    3
   / \
  9  20
    /  \
   15   7
```

Heights:
- Node 9: height=1
- Node 15: height=1
- Node 7: height=1
- Node 20: |1-1|=0 ✓, height=2
- Node 3: |1-2|=1 ✓, height=3

Result: true ✓

# Complexity

- Time complexity: $$O(n)$$
  - Visit each node once
  - Constant work per node
  - Overall: O(n)

- Space complexity: $$O(h)$$
  - Recursion stack: O(h)
  - h = tree height
  - Worst case: O(n) for skewed tree
  - Best case: O(log n) for balanced tree

# Code
```typescript []
const isBalanced = (root: TreeNode | null): boolean => {
    let isTreeBalanced = true;

    const computeHeight = (node: TreeNode | null): number => {
        if (node === null) return 0;

        const leftHeight = computeHeight(node.left);
        const rightHeight = computeHeight(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) isTreeBalanced = false;

        return Math.max(leftHeight, rightHeight) + 1;
    };

    computeHeight(root);
    return isTreeBalanced;
};
```