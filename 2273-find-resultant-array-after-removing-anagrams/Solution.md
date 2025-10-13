# Sequential Anagram Filtering | 14 Lines | O(n × m log m) | 6ms

# Intuition
We need to remove words that are anagrams of their immediate predecessor. The key insight is that we can process the array sequentially in one pass, keeping track of the previous word's canonical form to detect anagrams.

# Approach
**Single Pass with Canonical Form:**
- Process words left to right, comparing each word with its predecessor
- Use sorted character representation as canonical form to detect anagrams
- Only add words that differ from their predecessor's canonical form

**Step-by-Step Process:**

1. **Initialize Tracking:**
   - Create result array to store non-anagram words
   - Track `previousSortedWord` to compare with current word

2. **Process Each Word:**
   - Sort characters to create canonical form (anagrams have same sorted form)
   - Compare with previous word's canonical form

3. **Decision Logic:**
   - If current sorted form ≠ previous sorted form: word is not an anagram, add to result
   - If current sorted form = previous sorted form: word is an anagram, skip it

4. **Update State:**
   - After processing each word (whether added or skipped), update `previousSortedWord`
   - This ensures the next word is compared against the most recent kept word

**Why Single Pass Works:**
- The problem guarantees that any operation order produces the same result
- Processing sequentially left-to-right naturally removes consecutive anagrams
- Each word only needs comparison with its immediate predecessor in the filtered sequence

**Canonical Form Benefits:**
- Sorting characters creates a unique representation for anagram groups
- Direct string comparison is simpler than character frequency counting
- Works correctly for all anagram relationships

# Complexity
- Time complexity: $$O(n \times m \log m)$$ where n is number of words and m is average word length (sorting each word)
- Space complexity: $$O(m)$$ for sorted string storage (excluding output array)

# Code
```typescript
const removeAnagrams = (words: string[]): string[] => {
    const result: string[] = [];
    let previousSortedWord = "";
    
    for (const word of words) {
        const sortedWord = word.split("").sort().join("");
        
        if (sortedWord !== previousSortedWord) {
            result.push(word);
            previousSortedWord = sortedWord;
        }
    }
    
    return result;
};
```