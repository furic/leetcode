# Iterative Exchange Simulation | 13 Lines | O(log n) | 0ms

# Intuition
We can drink all initial bottles, then repeatedly exchange empty bottles for new full ones until we don't have enough empties to make an exchange. Each exchange reduces the number of empty bottles while giving us new full bottles to drink.

# Approach
Start by drinking all initial bottles and tracking empties. While we have enough empty bottles to exchange, calculate how many new full bottles we get and how many empties remain. Add the new full bottles to our total drunk count, then update our empty bottle count to include both the newly emptied bottles and any remainder from the exchange.

# Complexity
- Time complexity: $$O(\log n)$$ where n is numBottles, as empties reduce geometrically
- Space complexity: $$O(1)$$

# Code
```typescript
const numWaterBottles = (numBottles: number, numExchange: number): number => {
    let totalBottlesDrunk = numBottles;
    let emptyBottles = numBottles;
    
    while (emptyBottles >= numExchange) {
        const newFullBottles = Math.floor(emptyBottles / numExchange);
        const remainingEmptyBottles = emptyBottles % numExchange;
        
        totalBottlesDrunk += newFullBottles;
        emptyBottles = newFullBottles + remainingEmptyBottles;
    }
    
    return totalBottlesDrunk;
};
```