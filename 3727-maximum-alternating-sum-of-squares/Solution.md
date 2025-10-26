# Greedy Two-Pointer Assignment | 26 Lines | O(n log n) | 147ms

# Intuition
To maximize the alternating score (sum of squared values at even positions minus sum of squared values at odd positions), we should place numbers with largest absolute values at even (positive) positions and numbers with smallest absolute values at odd (negative) positions. Since squaring eliminates the sign, we focus on absolute value magnitudes.

# Approach
**Sort by Absolute Value with Greedy Assignment:**
- Sort array by absolute value in descending order
- Use two pointers to greedily assign values: large absolute values to even positions, small to odd positions
- This maximizes the positive contributions and minimizes the negative contributions

**Step-by-Step Process:**

1. **Sort by Absolute Value:**
   - Create sorted array: `sortedByAbsValue` in descending order of |value|
   - Example: [1,-1,2,-2,3,-3] → [-3,3,-2,2,-1,1] (by |value|: 3,3,2,2,1,1)
   - This groups largest magnitudes at the start

2. **Initialize Two Pointers:**
   - `leftPointer = 0` (points to largest absolute values)
   - `rightPointer = n-1` (points to smallest absolute values)
   - `positionIndex = 0` (tracks current position in result array)

3. **Greedy Assignment Loop:**
   - Process positions from 0 to n-1
   - **Even positions (0, 2, 4, ...):** Add squared value
     - Take from `leftPointer` (largest remaining absolute value)
     - Contribute positively: `score += value²`
     - Increment `leftPointer`
   
   - **Odd positions (1, 3, 5, ...):** Subtract squared value
     - Take from `rightPointer` (smallest remaining absolute value)
     - Contribute negatively: `score -= value²`
     - Decrement `rightPointer`

4. **Return Result:**
   - After processing all positions, return accumulated score

**Why This Works:**

**Mathematical Reasoning:**
- Score = Σ(even positions squared) - Σ(odd positions squared)
- To maximize: make even sum large, make odd sum small
- Squaring makes all values positive: only absolute value matters
- Greedy assignment: largest |values| → even, smallest |values| → odd

**Correctness Proof:**
- Suppose optimal solution places small |value| at even position
- Swapping with larger |value| from odd position:
  - Increases even sum contribution
  - Decreases odd sum contribution (less subtracted)
  - Net effect: score increases
- Therefore, greedy is optimal

**Example Walkthrough (nums = [1,-1,2,-2,3,-3]):**

- Sort by |value|: [-3, 3, -2, 2, -1, 1]
- left=0, right=5

**Process positions:**
- pos=0 (even): take left=0 (value=-3), score = 0 + 9 = 9, left=1
- pos=1 (odd): take right=5 (value=1), score = 9 - 1 = 8, right=4
- pos=2 (even): take left=1 (value=3), score = 8 + 9 = 17, left=2
- pos=3 (odd): take right=4 (value=-1), score = 17 - 1 = 16, right=3
- pos=4 (even): take left=2 (value=-2), score = 16 + 4 = 20, left=3
- pos=5 (odd): take right=3 (value=2), score = 20 - 4 = 16, right=2

**Result:** 16 ✓

**Resulting arrangement:** [-3, 1, 3, -1, -2, 2]
- Verification: 9 - 1 + 9 - 1 + 4 - 4 = 16 ✓

**Key Insights:**

**Sign Doesn't Matter:**
- After squaring, (-3)² = 3² = 9
- Only absolute value affects contribution
- This simplifies the problem dramatically

**Greedy Optimality:**
- No need to consider all permutations
- Local optimal choices (largest to even, smallest to odd) lead to global optimum
- Two-pointer technique efficiently implements greedy strategy

**Edge Cases:**
- All positive numbers: Still works (sort by value)
- All negative numbers: Still works (sort by absolute value)
- Single element: Returns value²
- Even vs odd length: Both handled correctly

**Alternative Approaches (Not Used):**
- Dynamic programming: Overkill for this greedy-solvable problem
- Trying all permutations: O(n!) too slow
- Prefix sums: Doesn't capture the alternating pattern effectively

# Complexity
- Time complexity: $$O(n \log n)$$ for sorting, then O(n) for assignment
- Space complexity: $$O(n)$$ for sorted array copy

# Code
```typescript
const maxAlternatingSum = (nums: number[]): number => {
    const sortedByAbsValue = [...nums].sort((a, b) => Math.abs(b) - Math.abs(a));
    
    let maxScore = 0;
    let leftPointer = 0;
    let rightPointer = sortedByAbsValue.length - 1;
    let positionIndex = 0;
    
    while (leftPointer <= rightPointer) {
        if (positionIndex % 2 === 0) {
            const value = sortedByAbsValue[leftPointer];
            maxScore += value * value;
            leftPointer++;
        } else {
            const value = sortedByAbsValue[rightPointer];
            maxScore -= value * value;
            rightPointer--;
        }
        positionIndex++;
    }
    
    return maxScore;
};
```