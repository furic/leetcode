# Greedy Min-Buy Tracking | 7 Lines | O(n) | 0ms

# Intuition
The best profit on any sell day is the current price minus the lowest price seen so far. We only need to track the running minimum buy price and the best profit encountered.

# Approach
- Maintain `buyDay` pointing to the index of the cheapest price seen so far (starts at `0`).
- Iterate `sellDay` from `1` onwards:
  - If `prices[sellDay] < prices[buyDay]`, we've found a cheaper buy — update `buyDay`. We can't sell here profitably (price went down), so no profit check needed.
  - Otherwise, compute the profit at this sell day and update `maxProfit` if it's better.
- Return `maxProfit` — defaults to `0` if prices only decrease (no profitable transaction possible).
- **Why greedy works:** For any sell day, the optimal buy is always the global minimum up to that point. Tracking `buyDay` incrementally maintains that invariant without a separate min-price variable.

# Complexity
- Time complexity: $$O(n)$$ — single pass through the prices array.

- Space complexity: $$O(1)$$ — only two index/value variables.

# Code
```typescript []
const maxProfit = (prices: number[]): number => {
    let buyDay = 0;
    let maxProfit = 0;

    for (let sellDay = 1; sellDay < prices.length; sellDay++) {
        if (prices[sellDay] < prices[buyDay]) {
            buyDay = sellDay;
        } else {
            maxProfit = Math.max(maxProfit, prices[sellDay] - prices[buyDay]);
        }
    }

    return maxProfit;
};
```