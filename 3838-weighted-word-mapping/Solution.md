# Sum Weights and Reverse Map | 14 Lines | O(n×m) | 1ms

# Intuition

Calculate each word's weight by summing character weights, take modulo 26, then map to reverse alphabet ('z' for 0, 'y' for 1, etc.). Concatenate all mapped characters.

# Approach

**Three Steps Per Word:**
1. **Sum weights**: Add weights[char - 'a'] for each character
2. **Modulo 26**: Get value in range [0, 25]
3. **Reverse map**: Convert to letter using 'z' - (weight % 26)

**Reverse Alphabetical Mapping:**
- 0 → 'z' (122 - 0 = 122 = 'z')
- 1 → 'y' (122 - 1 = 121 = 'y')
- ...
- 25 → 'a' (122 - 25 = 97 = 'a')

**Example: words=["abcd"], weights=[7,5,3,4,...]**

Word "abcd":
- Weight: 7+5+3+4 = 19
- Mod 26: 19 % 26 = 19
- Map: 'z' - 19 = 'g' (ASCII 122-19=103)

Result: "g" ✓

# Complexity

- Time complexity: $$O(n \times m)$$
  - n = number of words
  - m = average word length
  - Process each character once
  - Overall: O(n×m)

- Space complexity: $$O(1)$$
  - Only result string (output)
  - Constant extra space
  - Overall: O(1) auxiliary space

# Code
```typescript []
const mapWordWeights = (words: string[], weights: number[]): string => {
    let result = "";
    for (let i = 0; i < words.length; i++) {
        let weight = 0;
        for (let j = 0; j < words[i].length; j++) {
            weight += weights[words[i][j].charCodeAt(0) - 'a'.charCodeAt(0)];
        }
        result += String.fromCharCode('z'.charCodeAt(0) - (weight % 26));
    }
    return result;
}
```