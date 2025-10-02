# Greedy Exchange with Increment | 11 Lines | O(√n) | 50ms

# Intuition
We start with full bottles that become empty after drinking. We can exchange empty bottles for full ones, but the exchange rate increases by 1 after each exchange. We want to maximize total bottles drunk by continuing exchanges as long as we have enough empties.

# Approach
Begin by drinking all initial bottles to get empties. While we have enough empty bottles to meet the current exchange rate, perform an exchange: drink the new full bottle (increment total), reduce empties by the exchange cost minus one (since we get back one empty from drinking), and increment the exchange rate for next time.

# Complexity
- Time complexity: $$O(\sqrt{n})$$ since numExchange grows linearly while empties decrease
- Space complexity: $$O(1)$$

# Code
```typescript
function maxBottlesDrunk(numBottles: number, numExchange: number): number {
    let totalBottlesDrunk = numBottles;
    let emptyBottles = numBottles;

    while (emptyBottles >= numExchange) {
        totalBottlesDrunk++;
        emptyBottles -= numExchange - 1;
        numExchange++;
    }

    return totalBottlesDrunk;
};
```