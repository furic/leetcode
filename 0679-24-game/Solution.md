# Recursive Backtracking Enumeration | 25 Lines | O(1) | 14ms

# Intuition
This is a classic backtracking problem where we need to try all possible ways to combine four numbers using basic arithmetic operations to reach 24. The key insight is that we can recursively reduce the problem: pick any two numbers, apply an operation, and recursively solve the problem with the result and remaining numbers. Since we only have 4 cards, the search space is manageable through exhaustive enumeration.

# Approach
I'll use recursive backtracking to explore all possible combinations:

1. **Base Case**: When we have only one number left, check if it's close to 24 (within floating-point precision).

2. **Recursive Case**: For all pairs of numbers in the current array:
   - Try all possible operations between them (+, -, *, /)
   - For subtraction and division, try both orders since they're not commutative
   - Create a new array with the operation result and remaining numbers
   - Recursively check if this new configuration can reach 24

3. **Operation Handling**:
   - Addition and multiplication are commutative, so we only need one direction
   - Subtraction requires both (a-b) and (b-a)
   - Division requires both (a/b) and (b/a), with division-by-zero protection

4. **Floating-Point Precision**: Use epsilon comparison for the final result since floating-point arithmetic can introduce small errors.

The algorithm systematically explores all possible expression trees that can be formed with the four numbers.

# Complexity
- Time complexity: $$O(1)$$
  - Since we always have exactly 4 cards, the search space is constant
  - Number of ways to pick 2 cards from n: C(n,2)
  - Number of operations to try: at most 6 (addition, subtraction×2, multiplication, division×2)
  - Total recursive calls: bounded by a constant for 4 cards
  - Although complex, the bound is constant, not dependent on input size

- Space complexity: $$O(1)$$
  - Recursion depth is at most 3 (reducing 4→3→2→1 cards)
  - Each recursive call uses O(1) additional space for the new array
  - No data structures that scale with input size beyond the fixed 4 cards

# Code
```typescript []
const judgePoint24 = (cards: number[]): boolean => {
    const TARGET = 24;
    const EPSILON = 1e-6;

    if (cards.length === 1) {
        return Math.abs(cards[0] - TARGET) < EPSILON;
    }

    for (let firstIndex = 0; firstIndex < cards.length; firstIndex++) {
        for (let secondIndex = firstIndex + 1; secondIndex < cards.length; secondIndex++) {
            const firstNumber = cards[firstIndex];
            const secondNumber = cards[secondIndex];
            const remainingCards = cards.filter((_, index) => index !== firstIndex && index !== secondIndex);

            const operationResults = [
                firstNumber + secondNumber,
                firstNumber - secondNumber,
                secondNumber - firstNumber,
                firstNumber * secondNumber
            ];

            if (Math.abs(firstNumber) > EPSILON) operationResults.push(secondNumber / firstNumber);
            if (Math.abs(secondNumber) > EPSILON) operationResults.push(firstNumber / secondNumber);

            for (const result of operationResults) {
                if (judgePoint24([...remainingCards, result])) {
                    return true;
                }
            }
        }
    }

    return false;
};
```