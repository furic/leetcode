# String Replacement | 1 Line | O(d) | 1ms

# Intuition
We need to remove all occurrences of the digit '0' from a number. The simplest approach is to convert the number to a string, remove all '0' characters, and convert back to a number.

# Approach
**String Manipulation with Regex:**
- Convert number to string representation
- Use regex to replace all '0' characters with empty string
- Convert resulting string back to number

**Step-by-Step Process:**

1. **Convert to String:**
   - `n.toString()` gives decimal string representation
   - Example: 1020030 → "1020030"

2. **Remove All Zeros:**
   - Use `replace(/0/g, '')` with regex
   - `/0/g` matches all '0' characters (g flag = global, all occurrences)
   - Replace with empty string effectively removes them
   - Example: "1020030" → "123"

3. **Convert Back to Number:**
   - `Number()` or `parseInt()` converts string to integer
   - Example: "123" → 123
   - Automatically handles parsing without leading zeros

**Why This Works:**

**String Processing Benefits:**
- Strings provide character-level access
- Regex enables concise pattern matching
- No need to handle digit extraction manually

**Alternative Approaches:**

**Digit-by-Digit (Mathematical):**
```typescript
const removeZeros = (n: number): number => {
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
};
```
- More complex but avoids string conversion
- O(d) time, O(1) space
- Processes digits from right to left

**Filter Array:**
```typescript
const removeZeros = (n: number): number => 
    Number(n.toString().split('').filter(c => c !== '0').join(''));
```
- More verbose than regex
- Same complexity

**Example Walkthrough (n = 1020030):**

- toString(): "1020030"
- replace(/0/g, ''): "123"
- Number(): 123
- Result: 123 ✓

**Example 2 (n = 1):**

- toString(): "1"
- replace(/0/g, ''): "1" (no matches, unchanged)
- Number(): 1
- Result: 1 ✓

**Edge Cases:**

**All zeros except one digit:**
- Input: 10000 → Output: 1

**No zeros:**
- Input: 12345 → Output: 12345

**Leading zeros after removal:**
- Not possible as input is positive integer
- String "0123" would become "123" → 123

**Single digit:**
- 0: Technically not valid (positive integer constraint)
- 5: Returns 5

**Regex Explanation:**

- `/0/` - Matches the character '0'
- `/g` - Global flag: match all occurrences, not just first
- Without `g`: "1020030".replace(/0/, '') → "120030" (only first '0' removed)
- With `g`: "1020030".replace(/0/g, '') → "123" (all '0's removed)

**Performance Considerations:**

- String operations are generally O(d) where d is number of digits
- For typical integers (up to 10^9), d ≤ 10
- String approach is simple and performant enough
- Mathematical approach has O(1) space but more complex logic

**Why Not Other Methods:**

- Splitting to array then filtering: More overhead than regex
- Multiple passes: Regex is single pass
- Recursive approach: Unnecessary complexity

# Complexity
- Time complexity: $$O(d)$$ where d is the number of digits in n
- Space complexity: $$O(d)$$ for string representation

# Code
```typescript
const removeZeros = (n: number): number => Number(n.toString().replace(/0/g, ''));
```