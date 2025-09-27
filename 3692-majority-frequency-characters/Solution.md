# Frequency Grouping | 33 Lines | O(n) | 4ms

# Intuition
To find the majority frequency group, I need to first count character frequencies, then group characters by their frequencies, and finally identify which frequency group has the most characters (with higher frequency as tiebreaker).

# Approach
1. Count the frequency of each character in the string using a Map
2. Group characters by their frequency - create a mapping from frequency to count of characters having that frequency
3. Find the majority frequency by finding the frequency with the largest group size, using frequency value as tiebreaker
4. Collect all characters that have the majority frequency and return them as a string

# Complexity
- Time complexity: $$O(n)$$
- Space complexity: $$O(n)$$

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

    const findMajorityFrequency = (): number => {
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
        
        return majorityFreq;
    };

    const collectCharactersWithFrequency = (targetFrequency: number): string => {
        let result = "";
        for (const [char, frequency] of charFrequencies) {
            if (frequency === targetFrequency) {
                result += char;
            }
        }
        return result;
    };

    const majorityFreq = findMajorityFrequency();
    return collectCharactersWithFrequency(majorityFreq);
};
```