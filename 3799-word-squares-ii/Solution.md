# Nested Loop with Corner Constraints | 59 Lines | O(n⁴) | 21ms

# Intuition

A word square has 4 corners that must satisfy letter equality constraints. By checking these constraints systematically through nested loops, we can find all valid combinations. Organizing words by their first letter enables efficient candidate filtering at each level.

# Approach

**Corner Constraints:**
- Top-left: top[0] = left[0]
- Top-right: top[3] = right[0]
- Bottom-left: bottom[0] = left[3]
- Bottom-right: bottom[3] = right[3]

**Strategy:**
1. Build map: first letter → words starting with that letter
2. For each word as top:
   - Find left words where left[0] = top[0]
   - Find right words where right[0] = top[3]
   - Find bottom words where bottom[0] = left[3]
   - Check if bottom[3] = right[3]
3. Ensure all 4 words are distinct
4. Sort results lexicographically

**Example: words=["able","area","echo","also"]**

Try top="able":
- left candidates: first letter 'a' → ["able","area","also"]
- Try left="area":
  - right candidates: first letter 'e' → ["echo"]
  - Try right="echo":
    - bottom candidates: first letter 'a' → ["able","area","also"]
    - Try bottom="also":
      - Check bottom[3]='o' = right[3]='o' ✓
      - Valid: ["able","area","echo","also"]

Result: 2 valid squares ✓

# Complexity

- Time complexity: $$O(n^4)$$
  - n = number of words
  - Four nested loops trying all combinations
  - Map lookups reduce effective n but worst case O(n⁴)
  - Sorting: O(k log k) where k = result count

- Space complexity: $$O(n)$$
  - Map storing all words: O(n)
  - Result array: O(k) where k ≤ n⁴

# Code
```typescript []
const wordSquares = (words: string[]): string[][] => {
    const WORD_LENGTH = 4;
    const LAST_INDEX = WORD_LENGTH - 1;
    
    const validSquares: string[][] = [];
    const wordsByFirstLetter: Record<string, string[]> = {};
    
    for (const word of words) {
        const firstLetter = word[0];
        if (!wordsByFirstLetter[firstLetter]) {
            wordsByFirstLetter[firstLetter] = [];
        }
        wordsByFirstLetter[firstLetter].push(word);
    }
    
    for (const topWord of words) {
        const candidateLeftWords = wordsByFirstLetter[topWord[0]] || [];
        
        for (const leftWord of candidateLeftWords) {
            if (leftWord === topWord) continue;
            
            const candidateRightWords = wordsByFirstLetter[topWord[LAST_INDEX]] || [];
            
            for (const rightWord of candidateRightWords) {
                if (rightWord === topWord || rightWord === leftWord) continue;
                
                const candidateBottomWords = wordsByFirstLetter[leftWord[LAST_INDEX]] || [];
                
                for (const bottomWord of candidateBottomWords) {
                    if (bottomWord === topWord || bottomWord === leftWord || bottomWord === rightWord) {
                        continue;
                    }
                    
                    if (bottomWord[LAST_INDEX] === rightWord[LAST_INDEX]) {
                        validSquares.push([topWord, leftWord, rightWord, bottomWord]);
                    }
                }
            }
        }
    }
    
    validSquares.sort((squareA, squareB) => {
        for (let position = 0; position < WORD_LENGTH; position++) {
            if (squareA[position] < squareB[position]) return -1;
            if (squareA[position] > squareB[position]) return 1;
        }
        return 0;
    });
    
    return validSquares;
};
```