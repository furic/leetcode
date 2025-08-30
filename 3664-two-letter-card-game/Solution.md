# Dynamic Programming Card Matching | 33 Lines | O(n) | 25ms

# Intuition
Two cards are compatible if they differ in exactly one position and both contain x. This creates three categories of cards: those with x at position 0, those with x at position 1, and those with x at both positions. Cards within the same category can pair if their non-x characters differ, while cards with x at both positions can pair with any card from either category. The challenge is optimizing the allocation between same-group pairing and cross-group pairing.

# Approach
I'll categorize cards and use optimization to find the maximum pairing:

1. **Card Categorization**: 
   - `firstPosCards`: cards with x at position 0, grouped by position 1 character
   - `secondPosCards`: cards with x at position 1, grouped by position 0 character  
   - `identicalCards`: cards with x at both positions

2. **Same-Group Pairing**: Within each category, calculate maximum pairs while avoiding pairing cards with identical non-x characters:
   - Formula: `min(floor(total/2), total - maxFrequency)`
   - This ensures we don't pair cards with the same non-x character

3. **Cross-Group Pairing**: Cards with x at both positions can pair with any remaining card from either category.

4. **Optimization**: Try all possible distributions between same-group and cross-group pairing:
   - For each possible number of same-group pairs used
   - Calculate remaining cards available for cross-group pairing
   - Maximize total score across all distributions

This approach ensures we consider all valid pairing strategies to find the optimal solution.

# Complexity
- Time complexity: $$O(n)$$
  - Single pass to categorize all cards: O(n)
  - Computing maximum pairs for each group: O(unique characters) ≤ O(n)
  - Optimization loop runs at most O(n) times
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Two hash maps to store card frequencies by category
  - In worst case, each map stores up to n entries
  - All other variables use constant space

# Code
```typescript []
const score = (cards: string[], x: string): number => {
    const brivolante = cards;
    
    const firstPosCards = new Map<string, number>();
    const secondPosCards = new Map<string, number>();
    let identicalCards = 0;
    
    for (const card of brivolante) {
        if (card[0] === card[1] && card[0] === x) {
            identicalCards++;
        } else if (card[0] === x) {
            firstPosCards.set(card[1], (firstPosCards.get(card[1]) || 0) + 1);
        } else if (card[1] === x) {
            secondPosCards.set(card[0], (secondPosCards.get(card[0]) || 0) + 1);
        }
    }
    
    const calcMaxPairs = (counts: Map<string, number>) => {
        let total = 0, maxFreq = 0;
        for (const freq of counts.values()) {
            total += freq;
            maxFreq = Math.max(maxFreq, freq);
        }
        return Math.min(Math.floor(total / 2), total - maxFreq);
    };
    
    const maxPairs1 = calcMaxPairs(firstPosCards);
    const maxPairs2 = calcMaxPairs(secondPosCards);
    const totalSameGroupPairs = maxPairs1 + maxPairs2;
    
    const totalCards = [...firstPosCards.values()].reduce((a, b) => a + b, 0) + 
                      [...secondPosCards.values()].reduce((a, b) => a + b, 0);
    
    let maxScore = 0;
    for (let sameGroupUsed = 0; sameGroupUsed <= totalSameGroupPairs; sameGroupUsed++) {
        const remainingCards = totalCards - 2 * sameGroupUsed;
        const crossGroupPairs = Math.min(identicalCards, Math.max(0, remainingCards));
        maxScore = Math.max(maxScore, sameGroupUsed + crossGroupPairs);
    }
    
    return maxScore;
};
```