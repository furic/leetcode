# Bidirectional Search | 15 Lines | O(n×d×log m) | 1274ms

# Intuition
For each number, we need to find the nearest binary palindrome by incrementing or decrementing. A bidirectional search expanding outward from each number will find the closest binary palindrome efficiently.

# Approach
- **Binary Palindrome Check**:
  - Convert number to binary string without leading zeros
  - Check if string reads same forwards and backwards
  - Use string reversal comparison for simplicity

- **Bidirectional Search Strategy**:
  - Start with distance d = 0 (check if already palindrome)
  - If not, expand search: check num-d and num+d
  - Increment distance until finding first palindrome
  - This guarantees minimum operations

- **Search Order Optimization**:
  - Check num-d before num+d (arbitrary choice)
  - Must check num-d > 0 to avoid non-positive numbers
  - First palindrome found at distance d is optimal

- **Why Bidirectional Search Works**:
  - Binary palindromes are distributed throughout number line
  - Closer palindrome could be in either direction
  - Expanding outward guarantees finding nearest
  - Distance directly equals minimum operations

- **Example Walkthrough** (num=12):
  - 12 in binary: "1100" - not palindrome
  - d=1: 11 ("1011") not palindrome, 13 ("1101") not palindrome
  - d=2: 10 ("1010") not palindrome, 14 ("1110") not palindrome
  - d=3: 9 ("1001") palindrome! or 15 ("1111") palindrome!
  - Return 3 (first found at distance 3)

- **Edge Cases Handled**:
  - Already palindrome: return 0 immediately
  - Avoid checking 0 or negative: check num-d > 0
  - Small numbers: work correctly (e.g., 1="1" is palindrome)

# Complexity
- Time complexity: $$O(n \times d \times \log m)$$
  - For each of n numbers
  - Search up to distance d until finding palindrome
  - Each palindrome check: O(log m) for binary conversion and string operations
  - d varies per number but empirically small for most cases
  - Total: O(n × d × log m) where m is max value

- Space complexity: $$O(n + \log m)$$
  - Result array: O(n)
  - Binary string during checks: O(log m)
  - Total: O(n)

# Code
```typescript
const minOperations = (nums: number[]): number[] => {
    const isBinaryPalindrome = (n: number): boolean => {
        const binary = n.toString(2);
        return binary === binary.split("").reverse().join("");
    };

    const findMinOps = (num: number): number => {
        if (isBinaryPalindrome(num)) return 0;

        let dist = 1;
        while (true) {
            if (num - dist > 0 && isBinaryPalindrome(num - dist)) {
                return dist;
            }
            if (isBinaryPalindrome(num + dist)) {
                return dist;
            }
            dist++;
        }
    };

    return nums.map(findMinOps);
};
```