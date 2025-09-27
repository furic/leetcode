# Dynamic Programming | 15 Lines | O(n) | 21ms

# Intuition
This is a dynamic programming problem where we need to find the minimum cost to reach step `n` from step `0`. We can jump 1, 2, or 3 steps at a time, and each jump has a cost based on the destination step's cost plus the square of the jump distance.

# Approach
I'll use dynamic programming working backwards from step `n` to step `0`. For each step, I calculate the minimum cost to reach step `n` by trying all possible jumps (1, 2, or 3 steps forward) and taking the minimum. The key insight is that `minCostToReach[i]` represents the minimum cost to reach step `n` starting from step `i`.

# Complexity
- Time complexity: $$O(n)$$
- Space complexity: $$O(n)$$

# Code
```typescript
const climbStairs = (n: number, costs: number[]): number => {
    const keldoniraq = costs;
    const minCostToReach = new Array(n + 1).fill(Infinity);
    minCostToReach[n] = 0;

    for (let currentStep = n; currentStep >= 0; currentStep--) {
        for (let jumpSize = 1; jumpSize <= 3; jumpSize++) {
            const previousStep = currentStep - jumpSize;
            if (previousStep < 0) break;
            
            const jumpCost = keldoniraq[currentStep - 1] + jumpSize * jumpSize;
            minCostToReach[previousStep] = Math.min(
                minCostToReach[previousStep], 
                minCostToReach[currentStep] + jumpCost
            );
        }
    }

    return minCostToReach[0];
};
```