# String Reversal | 1 Line | O(d) | 0ms

# Intuition

The mirror distance is the absolute difference between a number and its digit-reversed form. The challenge is to reverse the digits and handle edge cases like trailing zeros (which become leading zeros when reversed, effectively disappearing). A clean solution converts the number to a string, reverses it, converts back to a number, and computes the absolute difference.

# Approach

**Overall Strategy:**
- Convert the integer to a string to access individual digits
- Reverse the string representation
- Convert back to an integer (handles leading zeros naturally)
- Calculate the absolute difference

**Step-by-Step Process:**

**1. Convert Number to String:**
- Use `n.toString()` to convert the integer to its string representation
- This allows us to treat digits as individual characters
- Example: 25 → "25", 10 → "10", 7 → "7"

**2. Split String into Character Array:**
- Use `.split('')` to break the string into an array of individual digit characters
- Each digit becomes a separate element
- Example: "25" → ['2', '5'], "10" → ['1', '0']

**3. Reverse the Array:**
- Use `.reverse()` to reverse the order of elements in the array
- This effectively reverses the digits
- Example: ['2', '5'] → ['5', '2'], ['1', '0'] → ['0', '1']

**4. Join Array Back to String:**
- Use `.join('')` to concatenate array elements back into a single string
- The empty string parameter means no separator between digits
- Example: ['5', '2'] → "52", ['0', '1'] → "01"

**5. Convert Reversed String to Number:**
- Use `Number(...)` to parse the string back into an integer
- Automatically handles leading zeros (they're ignored in numeric conversion)
- Example: "52" → 52, "01" → 1, "7" → 7
- Critical behavior: Leading zeros disappear naturally (e.g., "01" becomes 1)

**6. Calculate Absolute Difference:**
- Subtract the reversed number from the original number
- Use `Math.abs()` to ensure non-negative result
- Formula: `Math.abs(n - reverse(n))`

**Why This Works:**

**Handling Leading Zeros:**
- When reversed, trailing zeros become leading zeros
- Number conversion automatically discards leading zeros
- Example: 10 → "10" → "01" → 1, so abs(10 - 1) = 9

**Single Digit Numbers:**
- Reversing a single digit yields the same digit
- Example: 7 → "7" → "7" → 7, so abs(7 - 7) = 0

**Absolute Value Necessity:**
- The reversed number could be larger or smaller than original
- abs() ensures the result is always non-negative
- Example: 25 vs 52 (reversed is larger), 52 vs 25 (original is larger)

**Example Walkthrough (n = 25):**
- toString(): "25"
- split(''): ['2', '5']
- reverse(): ['5', '2']
- join(''): "52"
- Number(): 52
- Math.abs(25 - 52) = Math.abs(-27) = 27 ✓

**Example Walkthrough (n = 10):**
- toString(): "10"
- split(''): ['1', '0']
- reverse(): ['0', '1']
- join(''): "01"
- Number(): 1 (leading zero removed)
- Math.abs(10 - 1) = 9 ✓

**Example Walkthrough (n = 7):**
- toString(): "7"
- split(''): ['7']
- reverse(): ['7']
- join(''): "7"
- Number(): 7
- Math.abs(7 - 7) = 0 ✓

**Alternative Approaches Considered:**
- Mathematical reversal: Loop through digits using modulo and division
  - More complex, similar time complexity
  - Requires manual handling of leading zeros
- String manipulation without split/join: More verbose
- The chosen approach is concise and leverages built-in methods effectively

# Complexity

- Time complexity: $$O(d)$$
  - d = number of digits in n
  - toString(): O(d) to convert number to string
  - split(''): O(d) to create array of d characters
  - reverse(): O(d) to reverse d elements
  - join(''): O(d) to concatenate d characters
  - Number(): O(d) to parse d-digit string
  - Math.abs(): O(1)
  - Overall: O(d) linear in the number of digits

- Space complexity: $$O(d)$$
  - String representation: O(d) space for d digits
  - Character array: O(d) space for d elements
  - Reversed string: O(d) space
  - All intermediate structures are temporary
  - Overall: O(d) for storing digit representations

# Code
```typescript []
const mirrorDistance = (n: number): number => Math.abs(n - Number(n.toString().split('').reverse().join('')));
```