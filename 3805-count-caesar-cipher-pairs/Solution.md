# Normalization and Grouping | 31 Lines | O(n×m) | 63ms

# Intuition

Two words are similar if cyclic alphabet shifts can make them equal. By normalizing each word (shifting so it starts with 'a'), similar words will have identical normalized forms. Count pairs within each group of identical normalized forms.

# Approach

**Normalization Strategy:**
- Shift each word so its first character becomes 'a'
- Apply same shift to all characters (with wraparound at 'z')
- Similar words will normalize to the same string

**Example:**
- "fusion" starts with 'f' (shift -5): "fusion" → "apndji"
- "layout" starts with 'l' (shift -11): "layout" → "apndji"
- Both normalize to "apndji" → they're similar ✓

**Counting Pairs:**
- Group words by normalized form
- For each group of size n: pairs = n×(n-1)/2
- Sum across all groups

**Example: words=["ab","aa","za","aa"]**

Normalize:
- "ab" (shift -0): "ab"
- "aa" (shift -0): "aa"
- "za" (shift -25): "ab"
- "aa" (shift -0): "aa"

Groups: {"ab": 2, "aa": 2}
- Group "ab": 2×1/2 = 1 pair
- Group "aa": 2×1/2 = 1 pair
- Total: 2 ✓

# Complexity

- Time complexity: $$O(n \times m)$$
  - n = number of words, m = word length
  - Normalize each word: O(m)
  - Process n words: O(n×m)
  - Count pairs: O(unique forms) ≤ O(n)

- Space complexity: $$O(n \times m)$$
  - Map stores normalized forms: O(n×m)
  - Each normalized word: O(m)

# Code
```typescript []
const countPairs = (words: string[]): number => {
    const CHAR_CODE_A = 97;
    
    const normalizedWordCounts = new Map<string, number>();

    const normalizeWord = (word: string): string => {
        const shiftAmount = word.charCodeAt(0) - CHAR_CODE_A;
        let normalized = "";

        for (let charIndex = 0; charIndex < word.length; charIndex++) {
            const charCode = word.charCodeAt(charIndex) - CHAR_CODE_A;
            const shiftedCode = (charCode - shiftAmount + 26) % 26;
            normalized += String.fromCharCode(shiftedCode + CHAR_CODE_A);
        }
        
        return normalized;
    };

    for (const word of words) {
        const normalizedForm = normalizeWord(word);
        normalizedWordCounts.set(
            normalizedForm, 
            (normalizedWordCounts.get(normalizedForm) || 0) + 1
        );
    }

    let totalPairs = 0;
    for (const count of normalizedWordCounts.values()) {
        totalPairs += (count * (count - 1)) / 2;
    }

    return totalPairs;
};
```