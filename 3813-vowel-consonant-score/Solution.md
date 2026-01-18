# Single Pass Count | 14 Lines | O(n) | 1ms

# Intuition

Count vowels and consonants in a single pass, ignoring non-letter characters. Calculate score as floor(vowels/consonants), handling division by zero when no consonants exist.

# Approach

**Single Pass Algorithm:**
1. Use set for O(1) vowel lookup
2. Iterate through string:
   - Check if character is a letter (a-z)
   - If vowel: increment v
   - If consonant: increment c
   - Ignore spaces, digits, other characters
3. Return floor(v/c) if c>0, else 0

**Example: s="cooear"**

Count:
- 'c': consonant, c=1
- 'o': vowel, v=1
- 'o': vowel, v=2
- 'e': vowel, v=3
- 'a': vowel, v=4
- 'r': consonant, c=2

Score: floor(4/2) = 2 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through string
  - Set lookup: O(1)
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Vowel set: O(5) = O(1)
  - Counter variables: O(1)

# Code
```typescript []
const vowelConsonantScore = (s: string): number => {
    const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
    let v = 0;
    let c = 0;
    
    for (const char of s) {
        if (char >= 'a' && char <= 'z') {
            if (VOWELS.has(char)) {
                v++;
            } else {
                c++;
            }
        }
    }
    
    return c > 0 ? Math.floor(v / c) : 0;
};
```