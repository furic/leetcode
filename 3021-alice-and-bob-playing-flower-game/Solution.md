# Mathematical Pattern Recognition | 1 Line | O(1) | 0ms

# Intuition
Alice wins if she makes the last move, which happens when the total number of flowers (x + y) is odd, since Alice goes first. This is because with an odd total, Alice will make moves 1, 3, 5, ..., and the final odd-numbered move. The problem reduces to counting pairs (x, y) where x ∈ [1,n], y ∈ [1,m], and x + y is odd.

# Approach
I'll use mathematical analysis to find the pattern:

1. **Win Condition**: Alice wins when x + y is odd. This happens when exactly one of x or y is odd and the other is even.

2. **Count Analysis**: 
   - For x ∈ [1,n]: there are ⌈n/2⌉ odd numbers and ⌊n/2⌋ even numbers
   - For y ∈ [1,m]: there are ⌈m/2⌉ odd numbers and ⌊m/2⌋ even numbers

3. **Valid Pairs**: Alice wins when:
   - x is odd and y is even: ⌈n/2⌉ × ⌊m/2⌋ pairs
   - x is even and y is odd: ⌊n/2⌋ × ⌈m/2⌉ pairs

4. **Mathematical Simplification**: 
   - ⌈n/2⌉ × ⌊m/2⌋ + ⌊n/2⌋ × ⌈m/2⌉
   - This equals ⌊(n × m)/2⌋ for all positive integers n and m

5. **Direct Formula**: The total count of winning pairs is simply ⌊nm/2⌋.

# Complexity
- Time complexity: $$O(1)$$
  - Single arithmetic operation (multiplication and division)
  - No loops, recursion, or operations dependent on input values
  - Constant time regardless of n and m values

- Space complexity: $$O(1)$$
  - Only using the input parameters for one calculation
  - No additional data structures or variables that scale with input
  - All computation done with primitive operations

# Code
```typescript []
const flowerGame = (n: number, m: number): number => Math.floor(m * n / 2);
```