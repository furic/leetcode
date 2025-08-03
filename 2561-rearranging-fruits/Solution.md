# Frequency Delta and Greedy Swaps | 27 Lines | O(n log n) | 70ms

# Intuition
To make both baskets equal, they must have the same multiset of fruit costs. Any imbalance must be corrected by swapping, and we aim to do so at minimum cost.

# Approach
Track the frequency difference of each fruit between the two baskets. If any fruit has an odd imbalance, it's impossible to make the baskets equal. Otherwise, collect half of the absolute difference as swap candidates. Sort these candidates to prioritize cheaper swaps. For each, choose the cheaper between swapping directly or using the global minimum fruit as an intermediate.

# Complexity
- Time complexity:  
$$O(n \log n)$$

- Space complexity:  
$$O(n)$$

# Code
```typescript
const minCost = (basket1: number[], basket2: number[]): number => {
    const fruitDelta = new Map<number, number>();
    let globalMin = Infinity;

    for (const cost of basket1) {
        fruitDelta.set(cost, (fruitDelta.get(cost) ?? 0) + 1);
        globalMin = Math.min(globalMin, cost);
    }
    for (const cost of basket2) {
        fruitDelta.set(cost, (fruitDelta.get(cost) ?? 0) - 1);
        globalMin = Math.min(globalMin, cost);
    }

    const swapCandidates: number[] = [];
    for (const [fruitCost, count] of fruitDelta.entries()) {
        if (count % 2 !== 0) return -1;
        for (let i = 0; i < Math.abs(count) / 2; i++) {
            swapCandidates.push(fruitCost);
        }
    }

    swapCandidates.sort((a, b) => a - b);

    let totalCost = 0;
    for (let i = 0; i < swapCandidates.length / 2; i++) {
        totalCost += Math.min(swapCandidates[i], 2 * globalMin);
    }

    return totalCost;
};
```