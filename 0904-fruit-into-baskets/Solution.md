# Two Pointer Window | 25 Lines | O(n) | 4ms

# Intuition
This problem is essentially asking for the longest subarray that contains at most 2 distinct elements. Since we can only have two baskets (each holding one fruit type), we need to find the maximum length contiguous sequence where we encounter at most 2 different fruit types. A sliding window approach seems perfect here.

# Approach
I'll use a modified sliding window technique with efficient state tracking:

1. **State Variables**: Track the last fruit type seen, the second-to-last fruit type, and where the last fruit type started appearing consecutively.

2. **Window Expansion**: As we iterate through fruits, if the current fruit matches the last fruit type, we continue. If it matches the second fruit type, we swap the fruit types and update positions.

3. **Window Contraction**: When we encounter a third fruit type, we calculate the current window size, then shrink the window to start from where the last fruit type began appearing consecutively.

4. **Optimization**: Instead of using a hash map to count fruit types, we only track two fruit types and their positions, making the solution more space-efficient.

The key insight is that when we need to shrink the window, we don't need to move the start pointer one by one - we can jump directly to the position where the current "last fruit type" started appearing.

# Complexity
- Time complexity: $$O(n)$$
  - We iterate through the array once, and each element is processed in constant time
  - No nested loops or complex operations per element

- Space complexity: $$O(1)$$
  - We only use a constant amount of extra variables regardless of input size
  - No hash maps or additional data structures that scale with input

# Code
```typescript []
const totalFruit = (fruits: number[]): number => {
    let maxFruits = 0;
    let windowStart = 0;

    let lastFruitType = -1;
    let secondFruitType = -1;
    let lastFruitStartIndex = -1;

    for (let i = 0; i < fruits.length; i++) {
        const currentFruit = fruits[i];

        if (currentFruit !== lastFruitType) {
            if (secondFruitType === -1 || currentFruit === secondFruitType) {
                secondFruitType = lastFruitType;
                lastFruitType = currentFruit;
                lastFruitStartIndex = i;
            } else {
                maxFruits = Math.max(maxFruits, i - windowStart);
                windowStart = lastFruitStartIndex;
                secondFruitType = lastFruitType;
                lastFruitType = currentFruit;
                lastFruitStartIndex = i;
            }
        }
    }

    return Math.max(maxFruits, fruits.length - windowStart);
};
```