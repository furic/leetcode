# Prefix and Suffix Primality | 20 Lines | O(d√m) | 1ms

# Intuition
A Complete Prime Number requires all prefixes and all suffixes to be prime. By converting the number to a string, we can easily extract each prefix and suffix, then verify primality for each extracted number.

# Approach
- **String Conversion for Easy Extraction**:
  - Convert number to string for digit-level access
  - Allows substring operations to extract prefixes and suffixes
  - String length n = number of digits

- **Primality Testing Helper**:
  - Standard trial division algorithm
  - Check divisibility from 2 to √n
  - Optimization: only check odd divisors after 2
  - Returns true if number is prime, false otherwise

- **Prefix Validation**:
  - Extract first k digits for k = 1, 2, ..., n
  - Use substring(0, i) to get first i characters
  - Convert to integer and check primality
  - Return false immediately if any prefix is not prime

- **Suffix Validation**:
  - Extract last k digits for k = 1, 2, ..., n
  - Use substring(n - i) to get last i characters
  - Convert to integer and check primality
  - Return false immediately if any suffix is not prime

- **Early Termination**:
  - Stop checking at first non-prime prefix or suffix
  - Avoids unnecessary primality tests
  - Returns true only if all checks pass

- **Example Walkthrough** (num=23):
  - String: "23", length 2
  - Prefixes:
    - "2" → 2 is prime ✓
    - "23" → 23 is prime ✓
  - Suffixes:
    - "3" → 3 is prime ✓
    - "23" → 23 is prime ✓
  - All prime → return true

- **Example Walkthrough** (num=39):
  - String: "39", length 2
  - Prefixes:
    - "3" → 3 is prime ✓
    - "39" → 39 = 3×13, not prime ✗
  - Return false (found non-prime prefix)

- **Edge Cases Handled**:
  - Single digit: only checks if the digit itself is prime
  - Number with leading zeros after conversion: won't occur for valid integers
  - Small primes (2, 3, 5, 7): correctly identified as complete primes

# Complexity
- Time complexity: $$O(d \cdot \sqrt{m})$$
  - d = number of digits in num
  - Check d prefixes + d suffixes = 2d substrings
  - Each primality check: O(√m) where m is value being tested
  - Maximum value tested ≈ num, so √m ≈ √num
  - Total: O(d × √num)

- Space complexity: $$O(d)$$
  - String representation: O(d) where d = log₁₀(num)
  - Substring extraction: O(d) temporary strings
  - Primality check: O(1)
  - Total: O(d)

# Code
```typescript
const completePrime = (num: number): boolean => {
    const isPrime = (n: number): boolean => {
        if (n <= 1) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i * i <= n; i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    };
    
    const str = num.toString();
    const n = str.length;
    
    for (let i = 1; i <= n; i++) {
        const prefix = parseInt(str.substring(0, i));
        if (!isPrime(prefix)) return false;
    }
    
    for (let i = 1; i <= n; i++) {
        const suffix = parseInt(str.substring(n - i));
        if (!isPrime(suffix)) return false;
    }
    
    return true;
};
```