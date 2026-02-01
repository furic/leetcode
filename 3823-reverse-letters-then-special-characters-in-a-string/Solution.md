# Separate, Reverse, Reconstruct | 28 Lines | O(n) | 2ms

# Intuition

Separate letters and special characters into two arrays, reverse each independently, then reconstruct the string by placing reversed elements back into their original type positions.

# Approach

**Three-Step Process:**

1. **Separate**: Split string into two arrays
   - letters: all lowercase English letters
   - specialCharacters: all special characters

2. **Reverse**: Reverse both arrays independently
   - letters.reverse()
   - specialCharacters.reverse()

3. **Reconstruct**: Build result by iterating through original string
   - If position had letter: take next from reversed letters
   - If position had special: take next from reversed specials

**Example: s=")ebc#da@f("**

Separate:
- letters: ['e','b','c','d','a','f']
- specials: [')','#','@','(']

Reverse:
- letters: ['f','a','d','c','b','e']
- specials: ['(','@','#',')']

Reconstruct by original pattern:
- Pos 0 (special): '('
- Pos 1 (letter): 'f'
- Pos 2 (letter): 'a'
- Pos 3 (letter): 'd'
- Pos 4 (special): '@'
- Pos 5 (letter): 'c'
- Pos 6 (letter): 'b'
- Pos 7 (special): '#'
- Pos 8 (letter): 'e'
- Pos 9 (special): ')'

Result: "(fad@cb#e)" ✓

# Complexity

- Time complexity: $$O(n)$$
  - Separate: O(n)
  - Reverse: O(n)
  - Reconstruct: O(n)
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Letters array: O(n) worst case
  - Specials array: O(n) worst case
  - Result array: O(n)
  - Overall: O(n)

# Code
```typescript []
const reverseByType = (s: string): string => {
    const SPECIAL_CHARS = new Set('!@#$%^&*()'.split(''));
    
    const letters: string[] = [];
    const specialCharacters: string[] = [];
    
    for (let i = 0; i < s.length; i++) {
        if (SPECIAL_CHARS.has(s[i])) {
            specialCharacters.push(s[i]);
        } else {
            letters.push(s[i]);
        }
    }

    letters.reverse();
    specialCharacters.reverse();

    const result: string[] = [];
    let j = 0, k = 0;
    for (let i = 0; i < s.length; i++) {
        if (SPECIAL_CHARS.has(s[i])) {
            result.push(specialCharacters[k++]);
        } else {
            result.push(letters[j++]);
        }
    }

    return result.join('');
}
```