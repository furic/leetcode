# Mathematical Digit Checking | 12 Lines | O(n log n) | 0ms

# Intuition
We need to find two positive integers that sum to n and neither contains the digit 0. Instead of converting numbers to strings (which involves memory allocation and string operations), we can check for zeros mathematically by examining each digit using modular arithmetic. This approach is more efficient while maintaining the same simple brute force strategy of trying pairs systematically.

# Approach
I'll use mathematical digit extraction with systematic search:

1. **Mathematical Zero Detection**: Create a helper function that checks if a number contains zero by repeatedly extracting the last digit using modulo 10. If any digit equals 0, return true immediately.

2. **Digit Extraction Process**: For each number, use `num % 10` to get the last digit, then `Math.floor(num / 10)` to remove it. Continue until the number becomes 0.

3. **Systematic Pair Testing**: Iterate through possible values for the first number from 1 to n-1. For each first number, calculate the second number as n - firstNumber.

4. **Early Termination**: Return the first valid pair where both numbers contain no zeros. Since a solution is guaranteed to exist, we'll find one before exhausting all possibilities.

5. **Performance Optimization**: Mathematical digit checking avoids string allocation and character comparison, making it faster than string-based approaches while keeping the code simple and readable.

# Complexity
- Time complexity: $$O(n \log n)$$
  - We may check up to n-1 pairs in worst case
  - For each pair, the hasZero function takes O(log k) time where k is the number being checked
  - Since numbers can be up to n, we get O(n × log n) total time complexity

- Space complexity: $$O(1)$$
  - Mathematical digit checking uses only a constant amount of extra space
  - No string allocations or additional data structures that scale with input
  - All operations performed with primitive integer arithmetic

# Code
```typescript []
const hasZero = (num: number): boolean => {
    while (num > 0) {
        if (num % 10 === 0) return true;
        num = Math.floor(num / 10);
    }
    return false;
};

const getNoZeroIntegers = (n: number): number[] => {
    for (let a = 1; a < n; a++) {
        const b = n - a;
        if (!hasZero(a) && !hasZero(b)) {
            return [a, b];
        }
    }
    return [];
};
```