# Mathematical Digit Reversal | 12 Lines | O(log n) | 4ms

# Intuition
A palindrome reads the same forwards and backwards. For a number to be a palindrome, its reverse should equal the original number. Negative numbers cannot be palindromes since the negative sign appears only at the beginning. We can reverse the number mathematically by repeatedly extracting the last digit and building up the reversed number.

# Approach
I'll use mathematical digit manipulation to reverse the number:

1. **Handle Negative Numbers**: Return false immediately for negative numbers since they cannot be palindromes (the negative sign only appears at the start).

2. **Mathematical Reversal**: Reverse the number using modular arithmetic:
   - Extract the last digit using `workingNumber % 10`
   - Add it to the reversed number after shifting previous digits left by multiplying by 10
   - Remove the processed digit using `Math.floor(workingNumber / 10)`
   - Repeat until all digits are processed

3. **Comparison**: Compare the fully reversed number with the original to determine if it's a palindrome.

4. **No String Conversion**: This approach avoids string conversion, working purely with mathematical operations.

This method is efficient and handles all edge cases naturally, including single digits (which are palindromes) and numbers ending in zero.

# Complexity
- Time complexity: $$O(\log n)$$
  - Number of iterations equals the number of digits in n
  - Each iteration performs constant-time operations
  - Number of digits is logarithmic in the value of n

- Space complexity: $$O(1)$$
  - Only using constant extra variables for the working number and reversed result
  - No additional data structures that scale with input size
  - All operations performed with primitive arithmetic

# Code
```typescript []
const isPalindrome = (x: number): boolean => {
    if (x < 0) {
        return false;
    }
    
    let workingNumber = x;
    let reversedNumber = 0;
    
    while (workingNumber !== 0) {
        reversedNumber = reversedNumber * 10 + workingNumber % 10;
        workingNumber = Math.floor(workingNumber / 10);
    }
    
    return reversedNumber === x;
};
```