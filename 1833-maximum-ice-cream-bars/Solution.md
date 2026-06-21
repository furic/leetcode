# Counting Sort Greedy Buy Cheapest | 10 Lines | O(n + C) | 14ms

# Intuition
To maximize the number of ice creams, always buy the cheapest ones first. Counting sort lets us iterate prices in ascending order in O(C) where C is the max cost, enabling the greedy strategy without a comparison sort.

# Approach
- Build a frequency array `freq` of size `maxCost + 1`.
- Iterate prices from 1 upward. For each price, buy as many as affordable: `min(freq[cost], floor(coins / cost))`. Deduct the spent coins.
- Break early when remaining coins are less than the current price — no cheaper bars remain.

# Complexity
- Time complexity: $$O(n + C)$$ where $$C$$ = max cost — one pass to build frequency, one pass over price range.

- Space complexity: $$O(C)$$ — frequency array.

# Code
```typescript []
const maxIceCream = (costs: number[], coins: number): number => {
    const maxCost = Math.max(...costs);
    const freq = new Array(maxCost + 1).fill(0);
    for (const cost of costs) freq[cost]++;

    let count = 0;
    for (let cost = 1; cost <= maxCost; cost++) {
        if (freq[cost] === 0) continue;
        const canBuy = Math.min(freq[cost], Math.floor(coins / cost));
        count += canBuy;
        coins -= canBuy * cost;
        if (coins < cost) break;
    }

    return count;
};
```