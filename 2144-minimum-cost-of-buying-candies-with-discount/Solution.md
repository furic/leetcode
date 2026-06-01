# Sort Descending Skip Every Third | 5 Lines | O(n log n) | 0ms

# Intuition
To minimize cost, maximize the value of the free candy each time. Sorting descending and skipping every 3rd item (indices 2, 5, 8, ...) greedily gives the most expensive eligible free candy at each step.

# Approach
- Sort `cost` in descending order.
- Sum all costs except at positions `i % 3 === 2` — those are the free candies.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by the sort.

- Space complexity: $$O(\log n)$$ — sort stack.

# Code
```typescript []
const minimumCost = (cost: number[]): number => {
    cost.sort((a, b) => b - a);

    let totalCost = 0;
    for (let i = 0; i < cost.length; i++) {
        if (i % 3 !== 2) totalCost += cost[i];
    }

    return totalCost;
};
```