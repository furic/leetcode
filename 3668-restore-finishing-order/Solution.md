# Filter Array | 1 Line | O(n²) | 0ms

# Intuition
We need to preserve the relative finishing order of a subset of participants (friends) from the full race order. This can be done by iterating through the original order and selecting only the IDs that appear in friends.

# Approach
Use the filter method on order and check for each element whether it exists in friends using includes. This produces a new array containing only the friends in their original finishing order.

# Complexity
- Time complexity:
$$O(n \cdot m)$$, where n is the length of order and m is the length of friends.

- Space complexity:
$$O(n)$$ for the resulting array.

# Code
```typescript []
const recoverOrder = (order: number[], friends: number[]): number[] => order.filter((order) => friends.includes(order));
```