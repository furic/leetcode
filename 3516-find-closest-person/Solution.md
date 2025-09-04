# Direct Distance Comparison | 1 Line | O(1) | 0ms

# Intuition
Since both people move at the same speed toward the stationary person, the one who arrives first is simply the one who starts closer. We need to calculate the distance each person must travel (absolute difference from their position to z) and compare these distances. The problem reduces to comparing |x - z| and |y - z|.

# Approach
I'll use direct distance comparison with a ternary-like expression:

1. **Calculate Distances**: Compute the absolute distances from each person to the target:
   - Distance for Person 1: |x - z|
   - Distance for Person 2: |y - z|

2. **Compare and Return**: Use a single expression to handle all three cases:
   - If |x - z| < |y - z|: Person 1 is closer, return 1
   - If |x - z| > |y - z|: Person 2 is closer, return 2  
   - If |x - z| = |y - z|: Both are equidistant, return 0

3. **One-Line Implementation**: Chain comparisons using the ternary operator to handle all cases in a single expression, making the solution both concise and efficient.

This approach directly solves the problem without any unnecessary complexity, since equal speed means the winner is determined purely by initial distance.

# Complexity
- Time complexity: $$O(1)$$
  - Only performing two absolute value calculations and two comparisons
  - No loops, recursion, or operations that depend on input values
  - Fixed number of arithmetic operations regardless of input

- Space complexity: $$O(1)$$
  - No additional variables or data structures needed
  - All calculations performed directly with the input parameters
  - Only using the space required for the return value

# Code
```typescript []
const findClosest = (x: number, y: number, z: number): number => 
    Math.abs(x - z) < Math.abs(y - z) ? 1 : Math.abs(x - z) > Math.abs(y - z) ? 2 : 0;
```