# Greedy Matching | 17 Lines | O(n²) | 2ms

# Intuition
We aim to place each fruit in the leftmost available basket that can accommodate it. Since the baskets are fixed and ordered, a greedy left-to-right check for each fruit works.

# Approach
Iterate over each fruit and try to place it in the first basket with enough capacity. Once a basket is used, mark it as unavailable by setting its capacity to 0. Count fruits that cannot be placed anywhere.

# Complexity
- Time complexity:  
$$O(n^2)$$ — each fruit can potentially check all baskets.

- Space complexity:  
$$O(1)$$ — in-place updates, no extra space used.

# Code
```typescript
const numOfUnplacedFruits = (fruits: number[], baskets: number[]): number => {
    let unplacedCount = 0;

    for (const fruitQuantity of fruits) {
        let isPlaced = false;

        for (let i = 0; i < baskets.length; i++) {
            if (baskets[i] >= fruitQuantity) {
                baskets[i] = 0;
                isPlaced = true;
                break;
            }
        }

        if (!isPlaced) unplacedCount++;
    }

    return unplacedCount;
};
```