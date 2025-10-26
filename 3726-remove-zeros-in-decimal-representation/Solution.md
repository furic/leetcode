# String Filter Conversion | 1 Line | O(d) | 1ms

# Intuition
We need to remove all '0' digits from the number's decimal representation. The most straightforward approach is to convert the number to a string, filter out '0' characters, and convert back to a number.

# Approach
**String Manipulation Pipeline:**
- Convert number to string to access individual digits
- Filter out all '0' characters
- Join remaining characters and convert back to number

**Step-by-Step Process:**

1. **Convert to String:**
   - `n.toString()` converts the number to its string representation
   - Example: 1020030 → "1020030"
   - This allows character-level manipulation

2. **Split into Characters:**
   - `.split('')` breaks the string into an array of individual characters
   - Example: "1020030" → ['1','0','2','0','0','3','0']
   - Each digit becomes a separate element

3. **Filter Out Zeros:**
   - `.filter((c) => c != '0')` keeps only non-zero characters
   - Example: ['1','0','2','0','0','3','0'] → ['1','2','3']
   - Removes all '0' characters from the array

4. **Join Back to String:**
   - `.join('')` concatenates array elements back into a string
   - Example: ['1','2','3'] → "123"
   - Creates the final string without zeros

5. **Convert to Number:**
   - `Number(...)` parses the string back to an integer
   - Example: "123" → 123
   - Returns the numeric result

**Why This Works:**

**Correctness:**
- String operations preserve digit order
- Filter correctly identifies and removes all '0' characters
- Number conversion handles the result correctly

**Simplicity:**
- Single-line solution using functional programming
- No manual loops or digit manipulation
- Built-in methods handle edge cases

**Example Walkthrough (n = 1020030):**
```
1020030
  → "1020030"           (toString)
  → ['1','0','2','0','0','3','0']  (split)
  → ['1','2','3']       (filter)
  → "123"               (join)
  → 123                 (Number)
```

**Edge Cases Handled:**

**No zeros:**
- Input: 123
- Process: "123" → ['1','2','3'] → ['1','2','3'] → "123" → 123
- Result: unchanged ✓

**All zeros except one digit:**
- Input: 1000
- Process: "1000" → ['1','0','0','0'] → ['1'] → "1" → 1
- Result: 1 ✓

**Single digit:**
- Input: 5
- Process: "5" → ['5'] → ['5'] → "5" → 5
- Result: 5 ✓

**Leading zeros after removal:**
- Not possible since input is positive integer (no leading zeros in input)

**Alternative Approaches:**

**Mathematical approach:**
```typescript
let result = 0;
let multiplier = 1;
while (n > 0) {
    const digit = n % 10;
    if (digit !== 0) {
        result = digit * multiplier + result;
        multiplier *= 10;
    }
    n = Math.floor(n / 10);
}
return result;
```
- More complex, not more efficient
- Harder to read and maintain

**Regex approach:**
```typescript
return Number(n.toString().replace(/0/g, ''));
```
- Similar performance
- Slightly less clear about "removing all instances"

**Why String Approach is Best:**
- Most readable and concise
- Leverages high-level built-in methods
- Performance is adequate for this problem
- Easy to understand and maintain

# Complexity
- Time complexity: $$O(d)$$ where d is the number of digits - each digit processed once through filter
- Space complexity: $$O(d)$$ for temporary string and array storage

# Code
```typescript
const removeZeros = (n: number): number => Number(n.toString().split('').filter((c) => c != '0').join(''));
```