# # Intuition

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code
```typescript []
const numOfUnplacedFruits = (fruits: number[], baskets: number[]): number => {
    const totalBaskets = baskets.length;
    const blockSize = Math.floor(Math.sqrt(totalBaskets));
    const totalBlocks = Math.ceil(totalBaskets / blockSize);
    
    let unplacedFruitsCount = 0;
    const blockMaxCapacities: number[] = new Array(totalBlocks).fill(0);
    
    // Initialize block maximum capacities for each block of baskets
    const initializeBlockMaxCapacities = () => {
        for (let basketIndex = 0; basketIndex < totalBaskets; basketIndex++) {
            const blockIndex = Math.floor(basketIndex / blockSize);
            blockMaxCapacities[blockIndex] = Math.max(
                blockMaxCapacities[blockIndex], 
                baskets[basketIndex]
            );
        }
    };
    
    // Try to place a single fruit in the leftmost available basket
    const tryPlaceFruit = (fruitQuantity: number): boolean => {
        for (let blockIndex = 0; blockIndex < totalBlocks; blockIndex++) {
            // Skip blocks that don't have capacity for this fruit
            if (blockMaxCapacities[blockIndex] < fruitQuantity) {
                continue;
            }
            
            // Search within the block for a suitable basket
            const basketPlaced = tryPlaceInBlock(blockIndex, fruitQuantity);
            
            if (basketPlaced) {
                return true; // Fruit successfully placed
            }
        }
        return false; // No suitable basket found
    };
    
    // Try to place fruit in a specific block and update block's max capacity
    const tryPlaceInBlock = (blockIndex: number, fruitQuantity: number): boolean => {
        let basketFound = false;
        blockMaxCapacities[blockIndex] = 0; // Reset for recalculation
        
        const startBasketIndex = blockIndex * blockSize;
        const endBasketIndex = Math.min(startBasketIndex + blockSize, totalBaskets);
        
        for (let basketIndex = startBasketIndex; basketIndex < endBasketIndex; basketIndex++) {
            // Place fruit in the first suitable basket found
            if (baskets[basketIndex] >= fruitQuantity && !basketFound) {
                baskets[basketIndex] = 0; // Mark basket as used
                basketFound = true;
            }
            
            // Update block's maximum capacity
            blockMaxCapacities[blockIndex] = Math.max(
                blockMaxCapacities[blockIndex], 
                baskets[basketIndex]
            );
        }
        
        return basketFound;
    };
    
    // Main algorithm execution
    initializeBlockMaxCapacities();
    
    for (const fruitQuantity of fruits) {
        const fruitPlaced = tryPlaceFruit(fruitQuantity);
        if (!fruitPlaced) {
            unplacedFruitsCount++;
        }
    }
    
    return unplacedFruitsCount;
};
```