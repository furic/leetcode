# Factorial Counting | 10 Lines | O(n) | 5ms

# Intuition
Computer 0 (root) is always unlocked first. For any other computer i to be unlockable, we need some computer j with j < i and complexity[j] < complexity[i]. The key insight is that if all non-root computers have strictly higher complexity than the root, they can be unlocked in any order, giving (n-1)! permutations.

# Approach
- **Feasibility Check**:
  - Root computer 0 is always unlocked first (given)
  - For any computer i (where i > 0) to be unlockable, need j < i with complexity[j] < complexity[i]
  - If all computers have complexity > root complexity, then computer 0 can unlock any of them
  - Once unlocked, those computers can unlock others with higher complexity
  - If ANY computer has complexity ≤ root complexity, it can never be unlocked

- **Why All-or-Nothing**:
  - If complexity[i] ≤ complexity[0] for any i > 0:
    - Computer 0 cannot unlock i (need strictly lower complexity)
    - No other computer j < i can unlock i either (they all need complexity < complexity[i] ≤ complexity[0])
    - Result: 0 valid permutations
  - If all complexity[i] > complexity[0] for i > 0:
    - Computer 0 can unlock any other computer directly
    - The remaining n-1 computers can be unlocked in ANY order
    - Result: (n-1)! permutations

- **Factorial Calculation**:
  - Compute (n-1)! = 1 × 2 × 3 × ... × (n-1)
  - Apply modulo 10^9+7 at each multiplication to prevent overflow
  - Start from factorial=2 since (n-1)! = 1 when n=1 or n=2

- **Example Walkthrough** ([1,2,3]):
  - Root complexity = 1
  - All others: 2 > 1 ✓, 3 > 1 ✓
  - Valid permutations = 2! = 2
  - Orders: [0,1,2] and [0,2,1] both work

- **Example Walkthrough** ([3,3,3,4,4,4]):
  - Root complexity = 3
  - Computer 1: 3 ≤ 3 ✗
  - Cannot unlock computer 1, return 0

- **Edge Cases Handled**:
  - n=1: Only root, 0! = 1 (but loop doesn't run, returns 1)
  - n=2: Check if complexity[1] > complexity[0], if yes return 1
  - All equal complexities: Returns 0 (cannot unlock any non-root)

# Complexity
- Time complexity: $$O(n)$$
  - Validation loop: O(n) to check all computers
  - Factorial calculation: O(n) multiplications
  - Total: O(n)

- Space complexity: $$O(1)$$
  - Only constant variables used
  - No additional data structures
  - Total: O(1)

# Code
```typescript
const countPermutations = (complexity: number[]): number => {
    const numComputers = complexity.length;
    const rootComplexity = complexity[0];
    
    for (let i = 1; i < numComputers; i++) {
        if (complexity[i] <= rootComplexity) {
            return 0;
        }
    }

    let permutationCount = 1;
    const MOD = 1e9 + 7;
    
    for (let factorial = 2; factorial < numComputers; factorial++) {
        permutationCount = (permutationCount * factorial) % MOD;
    }
    
    return permutationCount;
};
```