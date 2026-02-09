# Inorder + Balanced Reconstruction | 31 Lines | O(n) | 6ms

# Intuition

Convert BST to sorted array via inorder traversal, then reconstruct a balanced BST by recursively choosing middle elements as roots. This ensures minimal height difference at every node.

# Approach

**Two-Phase Algorithm:**

1. **Inorder Traversal**: Extract sorted values
   - BST inorder yields sorted sequence
   - Store in array for random access

2. **Balanced Construction**: Build from sorted array
   - Choose middle element as root (minimizes height difference)
   - Recursively build left subtree from [left, mid-1]
   - Recursively build right subtree from [mid+1, right]
   - Middle selection ensures |left_size - right_size| ≤ 1

**Why This Works:**
- Sorted array allows O(1) median access
- Median as root splits remaining elements evenly
- Recursive application maintains balance property at all levels
- Results in height = O(log n)

**Example: root=[1,null,2,null,3,null,4]**

Inorder: [1,2,3,4]

Build:
- Mid=1 (value 2): root
- Left [0,0]: node 1
- Right [2,3]: mid=2 (value 3), right child 4

Result:
```
    2
   / \
  1   3
       \
        4
```
Balanced ✓

# Complexity

- Time complexity: $$O(n)$$
  - Inorder traversal: O(n)
  - Balanced construction: O(n) (each node created once)
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Array storage: O(n)
  - Recursion stack: O(log n) for balanced tree
  - Overall: O(n)

# Code
```typescript []
const balanceBST = (root: TreeNode | null): TreeNode | null => {
    const sortedValues: number[] = [];

    const inOrderTraversal = (node: TreeNode | null): void => {
        if (!node) return;
        
        inOrderTraversal(node.left);
        sortedValues.push(node.val);
        inOrderTraversal(node.right);
    };

    const buildBalancedTree = (leftIndex: number, rightIndex: number): TreeNode | null => {
        if (leftIndex > rightIndex) return null;
        
        const middleIndex = Math.floor(leftIndex + (rightIndex - leftIndex) / 2);
        const node = new TreeNode(sortedValues[middleIndex]);
        
        node.left = buildBalancedTree(leftIndex, middleIndex - 1);
        node.right = buildBalancedTree(middleIndex + 1, rightIndex);
        
        return node;
    };

    inOrderTraversal(root);
    return buildBalancedTree(0, sortedValues.length - 1);
};
```