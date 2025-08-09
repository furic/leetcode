# Bit Manipulation Trick | 1 Line | O(1) | 0ms

# Intuition
A power of two in binary representation has exactly one bit set to 1. For example: 1 (2⁰) = 1₂, 2 (2¹) = 10₂, 4 (2²) = 100₂, 8 (2³) = 1000₂. The key insight is that for any power of two n, the expression n & (n-1) will always equal 0, because subtracting 1 flips all the trailing zeros and the single 1 bit, creating a number with no common bits with the original.

# Approach
I'll use a clever bit manipulation technique:

1. **Power of Two Property**: Any power of two has exactly one bit set in its binary representation.

2. **Bit Manipulation Trick**: For a power of two n, the expression `n & (n-1)` equals 0:
   - When we subtract 1 from a power of two, all trailing zeros become 1s, and the single 1 bit becomes 0
   - The AND operation between these two numbers results in 0
   - Example: 8 (1000₂) & 7 (0111₂) = 0

3. **Edge Cases**: We need to ensure n > 0 because negative numbers and zero are not powers of two.

4. **One-Line Solution**: Combine the positive check with the bit manipulation: `n > 0 && (n & (n - 1)) == 0`

This approach is much more efficient than repeatedly dividing by 2 or using logarithms, as it works directly with the binary representation.

# Complexity
- Time complexity: $$O(1)$$
  - Single bitwise AND operation and comparison
  - No loops, recursion, or operations that depend on input size
  - Constant time regardless of the value of n

- Space complexity: $$O(1)$$
  - No additional data structures or variables needed
  - Only uses the input parameter and performs in-place operations
  - Memory usage is independent of input size

# Code
```typescript []
const isPowerOfTwo = (n: number): boolean =>
    n > 0 && (n & (n - 1)) == 0;
```