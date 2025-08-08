# Square Root Decomposition | 60 Lines | O(n√m) | 565ms

# Intuition
The problem requires placing fruits in baskets from left to right, always choosing the leftmost available basket with sufficient capacity. A naive approach would check each basket for every fruit, leading to O(n×m) time complexity. We can optimize this using square root decomposition to reduce the number of baskets we need to check.

# Approach
I'll use square root decomposition to optimize the basket selection process:

1. **Block Structure**: Divide baskets into blocks of size √m, where m is the number of baskets
2. **Block Metadata**: Maintain the maximum capacity for each block to quickly skip blocks that can't accommodate a fruit
3. **Fruit Placement**: For each fruit, iterate through blocks and only search within blocks that have sufficient maximum capacity
4. **Lazy Updates**: When a basket is used, recalculate the block's maximum capacity to maintain accuracy

The key optimization is that we can skip entire blocks if their maximum capacity is less than the fruit quantity, reducing the average number of baskets we need to check per fruit.

# Complexity
- Time complexity: $$O(n\sqrt{m})$$
  - For each of the n fruits, we check at most √m blocks
  - Within each relevant block, we check at most √m baskets
  - Block metadata updates take O(√m) time per fruit placement

- Space complexity: $$O(\sqrt{m})$$
  - We store the maximum capacity for each of the ⌈m/√m⌉ = O(√m) blocks

# Code
```typescript []
const numOfUnplacedFruits = (fruits: number[], baskets: number[]): number => {
    const totalBaskets = baskets.length;
    const blockSize = Math.floor(Math.sqrt(totalBaskets));
    const totalBlocks = Math.ceil(totalBaskets / blockSize);
    
    let unplacedFruitsCount = 0;
    const blockMaxCapacities: number[] = new Array(totalBlocks).fill(0);
    
    const initializeBlockMaxCapacities = () => {
        for (let basketIndex = 0; basketIndex < totalBaskets; basketIndex++) {
            const blockIndex = Math.floor(basketIndex / blockSize);
            blockMaxCapacities[blockIndex] = Math.max(
                blockMaxCapacities[blockIndex], 
                baskets[basketIndex]
            );
        }
    };
    
    const tryPlaceFruit = (fruitQuantity: number): boolean => {
        for (let blockIndex = 0; blockIndex < totalBlocks; blockIndex++) {
            if (blockMaxCapacities[blockIndex] < fruitQuantity) {
                continue;
            }
            
            const basketPlaced = tryPlaceInBlock(blockIndex, fruitQuantity);
            
            if (basketPlaced) {
                return true;
            }
        }
        return false;
    };
    
    const tryPlaceInBlock = (blockIndex: number, fruitQuantity: number): boolean => {
        let basketFound = false;
        blockMaxCapacities[blockIndex] = 0;
        
        const startBasketIndex = blockIndex * blockSize;
        const endBasketIndex = Math.min(startBasketIndex + blockSize, totalBaskets);
        
        for (let basketIndex = startBasketIndex; basketIndex < endBasketIndex; basketIndex++) {
            if (baskets[basketIndex] >= fruitQuantity && !basketFound) {
                baskets[basketIndex] = 0;
                basketFound = true;
            }
            
            blockMaxCapacities[blockIndex] = Math.max(
                blockMaxCapacities[blockIndex], 
                baskets[basketIndex]
            );
        }
        
        return basketFound;
    };
    
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