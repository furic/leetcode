# Frequency Grouping | 33 Lines | O(n) | 4ms

# Intuition
We need to find which frequency appears most often among characters, then return all characters with that frequency. If there's a tie in group sizes, we pick the higher frequency.

# Approach
First, count the frequency of each character in the string. Then group characters by their frequencies to see how many characters share each frequency count. Find the frequency that has the most characters (largest group size), with higher frequency as tiebreaker. Finally, collect all characters that have this majority frequency.

# Complexity
- Time complexity: $$O(n)$$
- Space complexity: $$O(1)$$ for counting at most 26 lowercase letters

# Code
```typescript
const majorityFrequencyGroup = (s: string): string => {
    const charFrequencies = new Map<string, number>();
    for (const char of s) {
        charFrequencies.set(char, (charFrequencies.get(char) || 0) + 1);
    }

    const frequencyGroupSizes = new Map<number, number>();
    for (const frequency of charFrequencies.values()) {
        frequencyGroupSizes.set(frequency, (frequencyGroupSizes.get(frequency) || 0) + 1);
    }

    let majorityFreq = 0;
    let largestGroupSize = 0;
    
    for (const [frequency, groupSize] of frequencyGroupSizes) {
        const isLargerGroup = groupSize > largestGroupSize;
        const isSameGroupSizeButHigherFreq = groupSize === largestGroupSize && frequency > majorityFreq;
        
        if (isLargerGroup || isSameGroupSizeButHigherFreq) {
            majorityFreq = frequency;
            largestGroupSize = groupSize;
        }
    }

    let result = "";
    for (const [char, frequency] of charFrequencies) {
        if (frequency === majorityFreq) {
            result += char;
        }
    }
    
    return result;
};