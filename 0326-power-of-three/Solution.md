# Iterative Division Method | 9 Lines | O(logn) | 5ms

# Intuition
A number is a power of three if it can be expressed as 3^x for some non-negative integer x. This means the number should only have 3 as its prime factor. If we repeatedly divide the number by 3 until it's no longer divisible, we should end up with 1 if and only if the original number was a power of three. Any other result means the number had prime factors other than 3.

# Approach
I'll use an iterative division approach to check if the number is a pure power of three:

1. **Edge Case Handling**: Powers of three are positive integers, so return false for any non-positive input.

2. **Iterative Division**: Repeatedly divide the number by 3 as long as it's evenly divisible. This removes all factors of 3 from the number.

3. **Final Check**: After removing all factors of 3, check if we're left with 1:
   - If yes: the original number was 3^k for some k ≥ 0
   - If no: the original number had prime factors other than 3

4. **Why This Works**: Any power of three has the form 3^k = 3 × 3 × ... × 3 (k times). Dividing by 3 repeatedly removes exactly these factors. If anything other than 1 remains, there were additional prime factors.

This approach is simple, intuitive, and handles all edge cases naturally.

# Complexity
- Time complexity: $$O(\log_3 n)$$
  - We divide by 3 in each iteration until the number becomes 1 or indivisible by 3
  - The number of divisions is at most log₃(n)
  - Each division and modulo operation takes constant time

- Space complexity: $$O(1)$$
  - Only using a constant amount of extra space for the input parameter
  - No additional data structures or recursion that scales with input size
  - All operations are performed in-place

# Code
```typescript []
const isPowerOfThree = (number: number): boolean => {
    if (number <= 0) return false;
    
    while (number % 3 === 0) {
        number /= 3;
    }
    
    return number === 1;
};
```