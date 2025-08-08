# Dynamic Programming Memoization | 40 Lines | O(n²) | 4ms

# Intuition
This is a probability problem where we need to calculate the chance that soup A runs out before soup B, plus half the probability they run out simultaneously. The key insight is that soup A is consumed more aggressively in all operations (100, 75, 50, 25 mL vs 0, 25, 50, 75 mL), making it more likely to empty first. For very large n, this probability approaches 1, allowing for optimization.

# Approach
I'll use dynamic programming with memoization to solve this recursively:

1. **Optimization for Large n**: When n ≥ 4800, the probability is so close to 1 that we can return 1 directly, avoiding expensive calculations.

2. **State Space Reduction**: Since all operations are multiples of 25, we can scale down by dividing by 25, reducing the state space significantly.

3. **Recursive DP**: Define `calculateProbability(a, b)` as the probability that soup A empties first or both empty simultaneously, starting with amounts a and b.

4. **Base Cases**: 
   - Both ≤ 0: return 0.5 (both empty simultaneously)
   - A ≤ 0: return 1 (A empty first - desired outcome)
   - B ≤ 0: return 0 (B empty first - undesired outcome)

5. **Recurrence**: Average the probabilities from all four possible operations, each occurring with probability 0.25.

6. **Memoization**: Cache results to avoid recomputing the same subproblems.

# Complexity
- Time complexity: $$O(n^2)$$
  - After scaling by 25, we have at most (n/25)² unique states
  - Each state is computed once due to memoization
  - Each computation involves 4 recursive calls with O(1) work

- Space complexity: $$O(n^2)$$
  - Memoization table stores up to (n/25)² entries
  - Recursive call stack depth is at most O(n/25)

# Code
```typescript []
const soupServings = (n: number): number => {
    const LARGE_N_THRESHOLD = 4800;
    if (n >= LARGE_N_THRESHOLD) {
        return 1;
    }
    
    const SCALE_FACTOR = 25;
    const scaledInitialAmount = Math.ceil(n / SCALE_FACTOR);
    
    const MEMO_SIZE = 200;
    const memoTable = new Array(MEMO_SIZE)
        .fill(0)
        .map(() => new Array(MEMO_SIZE).fill(-1));
    
    const calculateProbability = (soupARemaining: number, soupBRemaining: number): number => {
        if (soupARemaining <= 0 && soupBRemaining <= 0) {
            return 0.5;
        }
        if (soupARemaining <= 0) {
            return 1;
        }
        if (soupBRemaining <= 0) {
            return 0;
        }
        
        if (memoTable[soupARemaining][soupBRemaining] !== -1) {
            return memoTable[soupARemaining][soupBRemaining];
        }
        
        const probabilityResult = 0.25 * (
            calculateProbability(soupARemaining - 4, soupBRemaining) +
            calculateProbability(soupARemaining - 3, soupBRemaining - 1) +
            calculateProbability(soupARemaining - 2, soupBRemaining - 2) +
            calculateProbability(soupARemaining - 1, soupBRemaining - 3)
        );
        
        memoTable[soupARemaining][soupBRemaining] = probabilityResult;
        return probabilityResult;
    };
    
    return calculateProbability(scaledInitialAmount, scaledInitialAmount);
};
```