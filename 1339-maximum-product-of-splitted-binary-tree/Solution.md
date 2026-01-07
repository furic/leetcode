# Two-Pass DFS | 24 Lines | O(n) | 4ms

# Intuition

Removing an edge splits the tree into two subtrees. If one subtree has sum S, the other has sum (Total - S). To maximize S × (Total - S), we need to try all possible edges and find which split gives the maximum product.

# Approach

**Two-Pass Strategy:**
1. First DFS: Calculate total sum of entire tree
2. Second DFS: For each subtree, calculate its sum and check product
   - Subtree sum: S
   - Other part: Total - S
   - Product: S × (Total - S)

**Key Insight:**
- Each edge removal creates a subtree rooted at child node
- By calculating subtree sums during traversal, we try all possible splits
- Track maximum product found

**Example: root=[1,2,3,4,5,6]**

Total sum: 1+2+3+4+5+6 = 21

Try removing edges:
- Edge to left(2): left_sum=11, right_sum=10, product=110
- Edge to right(3): left_sum=10, right_sum=11, product=110
- Edge to node(4): subtree_sum=4, other=17, product=68
- Edge to node(5): subtree_sum=5, other=16, product=80
- Edge to node(6): subtree_sum=6, other=15, product=90

Maximum: 110 ✓

# Complexity

- Time complexity: $$O(n)$$
  - First DFS: O(n) to calculate total
  - Second DFS: O(n) to check all edges
  - Overall: O(n)

- Space complexity: $$O(h)$$
  - Recursion stack depth: O(h) where h = tree height
  - Balanced tree: O(log n)
  - Skewed tree: O(n)

# Code
```typescript []
const maxProduct = (root: TreeNode | null): number => {
    const MOD = 1e9 + 7;
    let totalSum = 0;
    let maxProd = 0;
    
    const calcSum = (node: TreeNode | null): number => {
        if (!node) return 0;
        return node.val + calcSum(node.left) + calcSum(node.right);
    };
    
    const findMaxProduct = (node: TreeNode | null): number => {
        if (!node) return 0;
        
        const leftSum = findMaxProduct(node.left);
        const rightSum = findMaxProduct(node.right);
        const subtreeSum = node.val + leftSum + rightSum;
        
        const otherSum = totalSum - subtreeSum;
        maxProd = Math.max(maxProd, subtreeSum * otherSum);
        
        return subtreeSum;
    };
    
    totalSum = calcSum(root);
    findMaxProduct(root);
    
    return maxProd % MOD;
};
```