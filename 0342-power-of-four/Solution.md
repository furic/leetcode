# Bit Manipulation Pattern | 1 Line | O(1) | 0ms

# Intuition
A power of four must satisfy two conditions: it must be a power of two (have exactly one bit set), and that bit must be in an "even" position when counting from the right (positions 0, 2, 4, 6, ...). Powers of four have a specific pattern: 1 (4⁰), 4 (4¹), 16 (4²), 64 (4³), etc. In binary, these are 1₂, 100₂, 10000₂, 1000000₂ - notice the single 1 bit is always at positions 0, 2, 4, 6, which correspond to the mask 0x55555555.

# Approach
I'll use a sophisticated bit manipulation technique combining three checks:

1. **Positive Check**: `n > 0` ensures we only consider positive numbers, as powers of four are always positive.

2. **Power of Two Check**: `(n & (n - 1)) === 0` verifies that n has exactly one bit set. This is the classic power-of-two check - subtracting 1 from a power of two flips all bits after and including the single 1 bit, so the AND operation yields 0.

3. **Even Position Check**: `(n & 0x55555555) !== 0` ensures the single bit is in an even position (0, 2, 4, 6, ...). The mask 0x55555555 in binary is 01010101010101010101010101010101₂, which has 1s in all even bit positions.

4. **Combined Logic**: A number is a power of four if and only if all three conditions are true. Powers of two that aren't powers of four (like 2, 8, 32) will fail the third check because their single bit is in an odd position.

# Complexity
- Time complexity: $$O(1)$$
  - All operations (comparison, bitwise AND) are performed in constant time
  - No loops, recursion, or operations dependent on the input value
  - Fixed number of bitwise operations regardless of input size

- Space complexity: $$O(1)$$
  - Only uses the input parameter and constant values (mask 0x55555555)
  - No additional data structures or variables that scale with input
  - All computations are done using primitive operations

# Code
```typescript []
const isPowerOfFour = (n: number): boolean => n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
```