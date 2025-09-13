# Frequency Counting | 17 Lines | O(n) | 2ms

# Intuition
To solve this, we need to track how often each character appears and separately identify the maximum frequency among vowels and consonants. Since there are only 26 lowercase English letters, this can be done efficiently with a frequency array.

# Approach
1. Initialize an array of size 26 to store character counts.  
2. Iterate through the string and update frequencies.  
3. Use a set of vowel indices to distinguish vowels from consonants.  
4. Traverse the frequency array to find the maximum vowel frequency and maximum consonant frequency.  
5. Return their sum as the final result.  

# Complexity
- Time complexity: $$O(n)$$, where n is the length of the string.  
- Space complexity: $$O(1)$$, since the frequency array has a fixed size of 26.  

# Code
```typescript
const maxFreqSum = (s: string): number => {
    const freq = new Array<number>(26).fill(0);
    const vowelIndices = new Set([0, 4, 8, 14, 20]);
    s.split("").map((c) => freq[c.charCodeAt(0) - "a".charCodeAt(0)]++);
    const [maxVowel, maxConsonant] = freq.reduce(
        (acc, count, index) => {
            if (vowelIndices.has(index)) {
                acc[0] = Math.max(acc[0], count);
            } else {
                acc[1] = Math.max(acc[1], count);
            }
            return acc;
        },
        [0, 0]
    );
    return maxVowel + maxConsonant;
};
```