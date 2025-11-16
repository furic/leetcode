# Sort and Pick Extremes | 3 Lines | O(nlogn) | 2ms

# Intuition
To maximize `a + b - c`, we want to maximize the sum `a + b` and minimize the value of `c`. This naturally suggests picking the two largest values for `a` and `b`, and the smallest value for `c`.

# Approach
- **Sort Array in Descending Order**:
  - Sort the input array from largest to smallest using `(a, b) => b - a`
  - After sorting, nums[0] contains the largest value, nums[1] the second-largest
  - nums[nums.length - 1] contains the smallest value

- **Select Optimal Elements**:
  - Choose `a = nums[0]` (largest element)
  - Choose `b = nums[1]` (second-largest element)
  - Choose `c = nums[nums.length - 1]` (smallest element)

- **Why This Maximizes the Expression**:
  - Adding the two largest values maximizes the positive part: `a + b`
  - Subtracting the smallest value maximizes the negative part: `-c`
  - Since we're subtracting c, choosing the smallest value gives the largest contribution
  - Example: If c = -5, then -c = +5, which adds to the result

- **Handling Negative Numbers**:
  - Works correctly even with negative numbers
  - A large negative number as `c` contributes positively when subtracted
  - Example: `5 + 4 - (-2) = 5 + 4 + 2 = 11`

- **Why We Don't Need to Check Other Combinations**:
  - Any other selection would either use smaller values for a/b or larger value for c
  - Both scenarios decrease the expression value
  - Mathematical proof: For any valid choice, `max₁ + max₂ - min ≥ a + b - c`

# Complexity
- Time complexity: $$O(n \log n)$$
  - Sorting the array dominates: O(n log n)
  - Array access operations: O(1)
  - Total: O(n log n)

- Space complexity: $$O(1)$$ or $$O(n)$$
  - O(1) if we consider in-place sorting
  - O(n) if we account for sorting algorithm's auxiliary space (depends on implementation)
  - No additional data structures used

# Code
```typescript
const maximizeExpressionOfThree = (nums: number[]): number => {
    nums = nums.sort((a, b) => b - a);
    return nums[0] + nums[1] - nums[nums.length - 1];
};
```