# Sliding Window with Type Tracking | 26 Lines | O(n) | 3ms

# Intuition
We need the longest subarray containing at most two different fruit types. This is a classic sliding window problem constrained to two distinct elements.

# Approach
Track the last seen fruit type and the one before it, along with the index where the last sequence of the most recent fruit started. As we iterate, if we encounter a new fruit type that doesn’t match either of the two baskets, we slide the window to start at the beginning of the most recent fruit sequence. Update the max as we go.

# Complexity
- Time complexity:  
$$O(n)$$

- Space complexity:  
$$O(1)$$

# Code
```typescript
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