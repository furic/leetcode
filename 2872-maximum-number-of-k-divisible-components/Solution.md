# Greedy DFS Subtree Cutting | 18 Lines | O(n) | 83ms

# Intuition
When we can cut a subtree whose sum is divisible by k, the remaining tree's sum is also affected. The key insight is to greedily cut subtrees from leaves upward: whenever a subtree sum becomes divisible by k, we cut it off as a separate component. This greedy approach maximizes components because cutting earlier never prevents valid cuts later.

# Approach
- **Tree Representation**:
  - Build adjacency list from edges array
  - Undirected tree: add edges in both directions
  - Use parent tracking during DFS to avoid revisiting

- **Greedy Cutting Strategy**:
  - Process tree bottom-up using post-order DFS
  - For each subtree, calculate total sum of all node values
  - When subtree sum % k === 0, we can cut this subtree off as a component
  - Return 0 to parent (subtree is now separate, doesn't contribute to parent's sum)

- **Why Greedy Works**:
  - If total tree sum is divisible by k, any valid split keeps this property
  - Cutting a divisible subtree leaves parent with sum that's still "compatible"
  - More cuts = more components, so cut whenever possible
  - Bottom-up ensures we maximize cuts (cutting child doesn't affect sibling cuts)

- **DFS Function Logic**:
  - Start with current node's value
  - Recursively add all children's subtree sums (after their potential cuts)
  - If current subtree sum is divisible by k:
    - Increment component count
    - Return 0 (this subtree is now a separate component)
  - Otherwise, return subtree sum to parent

- **Component Counting**:
  - Each time we "cut" (subtree sum divisible by k), increment counter
  - The root's subtree (entire tree) will also be counted if total sum is divisible by k
  - This naturally counts all resulting components

- **Example Walkthrough** (n=5, edges=[[0,2],[1,2],[1,3],[2,4]], values=[1,8,1,4,4], k=6):
  - Tree structure: 0-2-1-3, 2-4
  - DFS from 0:
    - Visit 2, then visit 4: sum=4, not divisible by 6, return 4
    - Visit 1, then visit 3: sum=4, not divisible by 6, return 4
    - Back to 1: sum = 8+4 = 12, divisible by 6! Cut, count=1, return 0
    - Back to 2: sum = 1+4+0 = 5, not divisible, return 5
    - Back to 0: sum = 1+5 = 6, divisible by 6! Cut, count=2, return 0
  - Result: 2 components

- **Edge Cases Handled**:
  - Single node: if value divisible by k, count = 1
  - No valid cuts: entire tree is one component (if total sum divisible by k)
  - All nodes can be separate: each node's value divisible by k

- **Why Return 0 After Cutting**:
  - A cut subtree becomes independent from parent
  - Parent shouldn't include cut subtree's sum in its calculation
  - Returning 0 effectively "removes" the subtree from parent's perspective

# Complexity
- Time complexity: $$O(n)$$
  - Build adjacency list: O(n) (n-1 edges)
  - DFS visits each node exactly once: O(n)
  - Each edge traversed once in each direction: O(n)
  - Total: O(n)

- Space complexity: $$O(n)$$
  - Adjacency list: O(n) for n-1 edges
  - DFS recursion stack: O(n) worst case (linear tree)
  - Total: O(n)

# Code
```typescript
const maxKDivisibleComponents = (n: number, edges: number[][], values: number[], k: number): number => {
    const adjacencyList: number[][] = Array.from({ length: n }, () => []);
    for (const [nodeA, nodeB] of edges) {
        adjacencyList[nodeA].push(nodeB);
        adjacencyList[nodeB].push(nodeA);
    }

    let componentCount = 0;

    const calculateSubtreeSum = (currentNode: number, parentNode: number): number => {
        let subtreeSum = values[currentNode];

        for (const neighbor of adjacencyList[currentNode]) {
            if (neighbor === parentNode) continue;
            subtreeSum += calculateSubtreeSum(neighbor, currentNode);
        }

        if (subtreeSum % k === 0) {
            componentCount++;
            return 0;
        }

        return subtreeSum;
    };

    calculateSubtreeSum(0, -1);

    return componentCount;
};
```