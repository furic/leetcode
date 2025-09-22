# Functional Reduce Pattern | 1 Line | O(n) | 1ms

# Intuition
We need to compute the bitwise OR of all even numbers in the array. The bitwise OR operation combines bits from all operands, setting each bit position to 1 if at least one operand has a 1 in that position. We can identify even numbers using the modulo operator (num % 2 === 0) and accumulate the OR result as we process the array.

# Approach
I'll use a functional reduce pattern with conditional OR operation:

1. **Reduce Accumulation**: Use the reduce function to iterate through the array once, accumulating the bitwise OR result.

2. **Even Number Filter**: For each number, check if it's even using the modulo operation. The condition `num % 2 === 0` efficiently identifies even numbers.

3. **Conditional OR**: If the number is even, apply the bitwise OR operation (`result | num`) to combine it with the accumulator. If odd, return the accumulator unchanged.

4. **Initial Value**: Start with 0 as the initial accumulator value, which is the identity element for bitwise OR (0 | x = x).

5. **One-Line Implementation**: Chain the operations using reduce's ternary operator for a concise functional solution.

This approach processes each element exactly once while maintaining the OR accumulation.

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the array with reduce
  - Each element checked once with constant-time modulo and OR operations
  - No nested loops or recursive calls

- Space complexity: $$O(1)$$
  - Only using the accumulator variable within reduce
  - No additional data structures that scale with input size
  - All operations performed with primitive values

# Code
```typescript []
const evenNumberBitwiseORs = (nums: number[]): number => nums.reduce((result, num) => num % 2 === 0 ? result | num : result, 0);
```