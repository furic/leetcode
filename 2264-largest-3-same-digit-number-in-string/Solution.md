# Linear Scan Maximum | 14 Lines | O(n) | 0ms

# Intuition
We need to find all substrings of length 3 where all three characters are the same digit, then return the lexicographically largest one. Since we're looking for the maximum, we can scan through the string once, identify all valid triplets, and keep track of the largest digit found. The key insight is that we only need to store the digit values, not the full substrings, since we can reconstruct the 3-digit string later.

# Approach
I'll use a single-pass scanning approach with maximum tracking:

1. **Linear Scan**: Iterate through the string up to `length - 2` to ensure we can check 3-character windows without going out of bounds.

2. **Triplet Validation**: For each position i, check if `num[i] === num[i+1] === num[i+2]`. If true, we found a valid "good integer."

3. **Digit Collection**: Store the digit value (converted to integer) of each valid triplet. This allows us to easily find the maximum later.

4. **Maximum Finding**: Use `Math.max()` to find the largest digit among all valid triplets.

5. **Result Construction**: If we found any good integers, construct the result by repeating the largest digit 3 times. Otherwise, return an empty string.

This approach handles edge cases naturally, including leading zeros (like "000") since we work with digit values and reconstruct the string.

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the string to find all valid triplets: O(n)
  - Finding maximum from collected digits: O(k) where k ≤ n/3 is the number of valid triplets
  - Overall: O(n + k) = O(n)

- Space complexity: $$O(n)$$
  - In worst case, we might store up to n/3 digits in the goodDigits array
  - For example, string "111222333" would store 3 digits
  - Additional space for result string construction: O(1)
  - Overall: O(n) in worst case

# Code
```typescript []
const largestGoodInteger = (num: string): string => {
    const goodDigits: number[] = [];
    
    for (let i = 0; i < num.length - 2; i++) {
        if (num[i] === num[i + 1] && num[i + 1] === num[i + 2]) {
            goodDigits.push(parseInt(num[i]));
        }
    }
    
    if (goodDigits.length > 0) {
        const largestDigit = Math.max(...goodDigits);
        return largestDigit.toString().repeat(3);
    }
    
    return "";
};
```