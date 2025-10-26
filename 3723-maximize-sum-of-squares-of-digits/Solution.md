# Greedy Digit Maximization | 18 Lines | O(n) | 153ms

# Intuition
To maximize the sum of squares of digits, we should use larger digits (since squaring amplifies their contribution). Additionally, to get the lexicographically largest number, we should place larger digits at the front. A greedy approach works: assign the maximum possible digit (up to 9) at each position from left to right.

# Approach
**Greedy Front-Loading with Validation:**
- First validate if a valid number can exist with the given constraints
- Greedily assign the largest possible digit at each position
- This simultaneously maximizes both the sum of squares and the lexicographic value

**Step-by-Step Process:**

1. **Validate Constraints:**
   - A positive integer with `num` digits has digit sum between 1 (like "10...0") and 9×num (like "999...9")
   - If `sum < 1` or `sum > 9×num`, no valid number exists → return ""

2. **Greedy Digit Assignment:**
   - Process positions from left to right (most significant to least significant)
   - At each position, assign the maximum digit possible: `min(9, remainingSum)`
   - This ensures we use the largest digits possible while staying within the sum constraint

3. **Why This Maximizes Sum of Squares:**
   - Larger digits contribute more to sum of squares: 9² = 81 vs 3² = 9
   - By front-loading larger digits, we maximize the overall sum
   - Mathematical principle: for fixed sum S, using fewer larger numbers gives larger sum of squares
   - Example: 9² + 0² = 81 > 5² + 4² = 41 (both sum to 9)

4. **Why This Gives Lexicographically Largest:**
   - We process from left (most significant) to right
   - Placing largest possible digits at the front naturally creates the largest number
   - Example: "90" > "81" > "72" (all have digit sum 9)

5. **Algorithm Execution:**
```
   remainingSum = sum
   for each position i from 0 to num-1:
       digit = min(9, remainingSum)
       append digit to result
       remainingSum -= digit
```

**Why Greedy Works:**

**Proof Sketch:**
- Suppose optimal solution has a smaller digit d₁ at position i and larger digit d₂ at position j (where j > i)
- Swapping them: d₂ at position i, d₁ at position j
- Digit sum unchanged: d₁ + d₂ = d₂ + d₁
- Sum of squares unchanged: d₁² + d₂² = d₂² + d₁²
- But lexicographically: placing d₂ first makes the number larger
- Therefore, greedy assignment of largest digits from left is optimal

**Example Walkthrough (num = 2, sum = 17):**
- Validation: 1 ≤ 17 ≤ 18 ✓
- Position 0: digit = min(9, 17) = 9, remainingSum = 8
- Position 1: digit = min(9, 8) = 8, remainingSum = 0
- Result: "98"
- Score: 9² + 8² = 81 + 64 = 145 ✓
- Lexicographically largest: "98" > "89" ✓

**Example 2 (num = 1, sum = 10):**
- Validation: 1 ≤ 10 ≤ 9? No, 10 > 9 ✗
- Return "" (impossible)

**Edge Cases:**
- sum = num: Result is "11...1" (all 1's)
- sum = 9×num: Result is "99...9" (all 9's)
- sum = 1: Result is "10...0" (1 followed by zeros)
- Large num, small sum: Most digits will be 0

**Alternative Approaches (Why Not Used):**
- Dynamic programming: Overkill for this greedy-solvable problem
- Generate all combinations: Exponentially slow
- Binary search: No monotonic property to exploit

# Complexity
- Time complexity: $$O(n)$$ where n = num (one loop through positions)
- Space complexity: $$O(n)$$ for storing the result digits array

# Code
```typescript
const maxSumOfSquares = (num: number, sum: number): string => {
    if (sum < 1 || sum > 9 * num) {
        return "";
    }
    
    const drevantor = [num, sum];
    const digits: number[] = [];
    let remainingSum = sum;
    
    for (let i = 0; i < num; i++) {
        const digit = Math.min(9, remainingSum);
        digits.push(digit);
        remainingSum -= digit;
    }
    
    return digits.join('');
};
```