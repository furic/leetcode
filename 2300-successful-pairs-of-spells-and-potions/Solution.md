# Frequency Suffix Sum | 23 Lines | O(n + m + M) | 33ms

# Intuition
For each spell, we need to count how many potions create a successful pair (spell × potion ≥ success). Instead of checking every potion individually for each spell, we can precompute counts of potions at each strength level and use range queries.

# Approach
**Frequency Array with Suffix Sums:**
- Build a frequency array where index i stores the count of potions with strength exactly i
- Convert this to a suffix sum array where index i stores the count of potions with strength ≥ i
- For each spell, calculate the minimum potion strength needed and look up the count directly

**Step-by-Step Process:**

1. **Find Maximum Potion Strength:**
   - Determine the largest potion value to size our frequency array appropriately

2. **Build Frequency Array:**
   - Create array of size (maxPotionStrength + 1)
   - For each potion, increment the count at its strength value
   - This gives us: `potionFrequency[i]` = count of potions with strength exactly i

3. **Convert to Suffix Sum:**
   - Traverse from right to left (maxPotionStrength down to 0)
   - Add the count from the next higher strength: `potionFrequency[i] += potionFrequency[i+1]`
   - Result: `potionFrequency[i]` = count of potions with strength ≥ i

4. **Process Each Spell:**
   - Calculate minimum required potion strength: `minPotion = ceil(success / spell)`
   - Use the inequality: `spell × potion ≥ success` → `potion ≥ success / spell`
   - Lookup count directly: `potionFrequency[minPotion]`
   - Handle edge case: if minPotion > maxPotionStrength, no potions qualify (return 0)

**Why Suffix Sum:**
- We need counts of potions with strength ≥ threshold (a range query)
- Suffix sum allows O(1) lookup instead of O(m) iteration per spell
- Preprocessing once enables fast queries for all spells

**Key Optimization:**
- Avoids sorting (O(m log m)) by using frequency array approach
- O(1) lookup per spell instead of O(log m) binary search

# Complexity
- Time complexity: $$O(n + m + M)$$ where n = spells length, m = potions length, M = max potion value
- Space complexity: $$O(M)$$ for frequency array

# Code
```typescript
const successfulPairs = (spells: number[], potions: number[], success: number): number[] => {
    const maxPotionStrength = Math.max(...potions);
    
    const potionFrequency = new Array(maxPotionStrength + 1).fill(0);
    for (const potionStrength of potions) {
        potionFrequency[potionStrength]++;
    }
    
    for (let strength = maxPotionStrength - 1; strength >= 0; strength--) {
        potionFrequency[strength] += potionFrequency[strength + 1];
    }
    
    const result: number[] = [];
    for (const spellStrength of spells) {
        const minPotionNeeded = Math.ceil(success / spellStrength);
        
        const successfulPairCount = minPotionNeeded <= maxPotionStrength 
            ? potionFrequency[minPotionNeeded] 
            : 0;
        
        result.push(successfulPairCount);
    }
    
    return result;
};
```