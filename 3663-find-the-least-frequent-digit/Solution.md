# Frequency Map Tracking | 19 Lines | O(d) | 1ms

# Intuition
To find the least frequent digit, we need to count the frequency of each digit in the number's decimal representation, then find the digit with the minimum frequency. If there's a tie, we choose the smallest digit value. This is a straightforward frequency counting problem that can be solved by converting the number to a string, counting each character, and then finding the minimum.

# Approach
I'll use a hash map approach to track digit frequencies:

1. **String Conversion**: Convert the integer to a string to easily iterate through individual digits.

2. **Frequency Counting**: Use a Map to count occurrences of each digit character as we traverse the string representation.

3. **Find Minimum**: Iterate through the frequency map to find the digit with the lowest frequency. Handle ties by choosing the numerically smallest digit.

4. **Tie Breaking**: When frequencies are equal, compare digit values and choose the smaller one. This ensures we always return the lexicographically smallest digit among those with minimum frequency.

5. **Optimization**: Initialize the tracking variables appropriately (digit = 10, frequency = Infinity) to handle the comparison logic cleanly.

The approach handles all edge cases naturally, including single-digit numbers and cases where all digits have the same frequency.

# Complexity
- Time complexity: $$O(d)$$
  - Converting number to string takes O(d) where d is the number of digits
  - Iterating through digits to count frequencies: O(d)
  - Iterating through frequency map to find minimum: O(unique digits) ≤ O(d)
  - Overall: O(d)

- Space complexity: $$O(d)$$
  - String representation requires O(d) space for d digits
  - Frequency map stores at most 10 entries (digits 0-9), so O(1) in practice
  - But string storage dominates, giving us O(d) total space

# Code
```typescript []
const getLeastFrequentDigit = (n: number): number => {
    const digitCharacters = n.toString().split("");
    const digitFrequency = new Map<string, number>();
    
    for (const digitChar of digitCharacters) {
        digitFrequency.set(digitChar, (digitFrequency.get(digitChar) || 0) + 1);
    }
    
    let leastFrequentDigit = 10;
    let lowestFrequency = Infinity;
    
    for (const [digitChar, frequency] of digitFrequency.entries()) {
        const digitValue = Number(digitChar);
        
        if (frequency < lowestFrequency || 
           (frequency === lowestFrequency && digitValue < leastFrequentDigit)) {
            lowestFrequency = frequency;
            leastFrequentDigit = digitValue;
        }
    }
    
    return leastFrequentDigit;
};
```