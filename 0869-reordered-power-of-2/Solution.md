# Digit Signature Matching | 18 Lines | O(log²n) | 1ms

# Intuition
To determine if we can reorder the digits of n to form a power of 2, we need to check if any power of 2 uses exactly the same digits as n. The key insight is that two numbers are anagrams (can be formed by reordering digits) if and only if they have the same digit frequency. Instead of generating all permutations of n, we can create a "signature" by sorting the digits and compare it with signatures of powers of 2.

# Approach
I'll use a digit signature matching approach:

1. **Digit Signature**: Create a canonical representation of any number by sorting its digits. For example, 321 becomes "123", and 1024 becomes "0124". Two numbers are anagrams if and only if they have identical signatures.

2. **Target Signature**: Generate the signature for the input number n.

3. **Powers of 2 Generation**: Iterate through powers of 2 (1, 2, 4, 8, 16, ...) up to a reasonable upper limit. Since we're dealing with digit reordering, we only need to check powers of 2 that have at most the same number of digits as n.

4. **Signature Comparison**: For each power of 2, generate its signature and compare with the target. If they match, we can reorder n's digits to form that power of 2.

5. **Optimization**: Use bit shifting (<<= 1) to efficiently generate successive powers of 2, and set an upper limit to avoid infinite checking.

# Complexity
- Time complexity: $$O(\log^2 n)$$
  - We check at most log₂(10^9) ≈ 30 powers of 2
  - For each power of 2, creating the signature takes O(log n) time for digit sorting
  - Overall: O(log n × log n) = O(log² n)

- Space complexity: $$O(\log n)$$
  - String representations of numbers require O(log n) space for digit storage
  - Signature creation requires temporary string storage proportional to number of digits
  - No additional data structures that scale beyond the input size

# Code
```typescript []
const reorderedPowerOf2 = (n: number): boolean => {
    const getDigitSignature = (number: number): string => {
        return number.toString().split('').sort().join('');
    };
    
    const targetSignature = getDigitSignature(n);
    
    const UPPER_LIMIT = 1e9;
    
    let currentPowerOf2 = 1;
    
    while (currentPowerOf2 <= UPPER_LIMIT) {
        const powerOf2Signature = getDigitSignature(currentPowerOf2);
        
        if (powerOf2Signature === targetSignature) {
            return true;
        }
        
        currentPowerOf2 <<= 1;
    }
    
    return false;
};
```