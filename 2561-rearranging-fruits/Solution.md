# Greedy Frequency Matching | 26 Lines | O(nlogn) | 73ms

# Intuition
To make two baskets equal, each fruit type must appear the same number of times in both baskets combined, and this total count must be even so we can split it equally. The key insight is that we only need to swap fruits that are "excess" in one basket with fruits that are "deficit" in the other basket. For each swap, we can either swap directly or use a cheaper fruit as an intermediary.

# Approach
I'll solve this using a greedy frequency-based approach:

1. **Calculate Net Differences**: Count how many extra fruits of each type basket1 has compared to basket2 (positive = excess in basket1, negative = excess in basket2).

2. **Feasibility Check**: If any fruit type has an odd total count across both baskets, it's impossible to balance them equally.

3. **Identify Swap Candidates**: For each fruit type with non-zero difference, we need to swap |difference|/2 fruits. Collect all these fruits that need to be moved.

4. **Greedy Swapping**: Sort the swap candidates by cost. For each fruit we need to move from the expensive side, we can either:
   - Swap directly with a fruit from the cheaper side (cost = cheaper fruit's cost)  
   - Use the global minimum fruit as intermediary (cost = 2 × global minimum)

5. **Optimization**: We only need to process half the swap candidates since each swap involves two fruits.

# Complexity
- Time complexity: $$O(n \log n)$$
  - Counting frequencies takes O(n) time
  - Sorting the swap candidates takes O(k log k) where k ≤ n
  - Overall dominated by the sorting step

- Space complexity: $$O(n)$$
  - Hash map to store fruit frequencies takes O(unique fruits) space
  - Swap candidates array takes O(n) space in worst case

# Code
```typescript []
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
        const directSwapCost = swapCandidates[i];
        const doubleMinCost = 2 * globalMin;
        totalCost += Math.min(directSwapCost, doubleMinCost);
    }

    return totalCost;
};
```