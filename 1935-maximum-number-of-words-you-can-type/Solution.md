# Set Filtering | 7 Lines | O(n·m) | 0ms

# Intuition
We need to determine how many words can be typed without using any broken letters. Each word must be checked against the set of broken keys, and if a word contains at least one broken letter, it cannot be typed.

# Approach
1. Convert the string of broken letters into a set for fast lookup.  
2. Split the text into words.  
3. For each word, check if it contains any broken letters.  
4. Count only the words that contain none of the broken letters.  
5. Return the total count.  

# Complexity
- Time complexity: $$O(n \cdot m)$$, where n is the number of words and m is the average word length (since we may check each character).  
- Space complexity: $$O(k)$$, where k is the number of broken letters stored in the set (bounded by 26).  

# Code
```typescript
const canBeTypedWords = (text: string, brokenLetters: string): number => {
    const brokenLetterSet = new Set(brokenLetters);
    return text.split(' ').filter(word => {
        return !word.split('').some(letter => brokenLetterSet.has(letter));
    }).length;
};
```