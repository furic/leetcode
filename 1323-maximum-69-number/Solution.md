# String Replace First | 1 Line | O(n) | 0ms

# Intuition
To maximize the number, we want to change a digit that has the highest impact on the overall value. Since we can only change 6→9 or 9→6, and we want to maximize, we should change 6→9 (which increases the value) rather than 9→6 (which decreases it). The leftmost 6 has the highest place value impact, so changing the first occurrence of '6' to '9' will give us the maximum possible number.

# Approach
I'll use a simple string manipulation approach:

1. **Convert to String**: Transform the number into a string to enable easy character manipulation and replacement.

2. **Find First '6'**: Use the `replace()` method which, by default, replaces only the first occurrence of the target character. This is exactly what we want since the leftmost '6' will have the maximum impact on the value.

3. **Replace with '9'**: Change the first '6' to '9' to maximize the number. If there are no '6's in the number, the `replace()` method will return the original string unchanged.

4. **Convert Back**: Parse the resulting string back to a number.

This approach is elegant because it naturally handles all edge cases: if there are no '6's to replace, the number remains unchanged (which is optimal), and if there are multiple '6's, only the leftmost one is changed (which maximizes the increase in value).

# Complexity
- Time complexity: $$O(n)$$
  - Converting number to string takes O(n) where n is the number of digits
  - String replace operation scans through the string once: O(n)
  - Converting string back to number takes O(n)
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - String representation of the number requires O(n) space
  - The replace operation creates a new string of size O(n)
  - No additional data structures that scale beyond the input size

# Code
```typescript []
const maximum69Number = (num: number): number => parseInt(num.toString().replace('6', '9'));
```