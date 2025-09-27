const majorityFrequencyGroup = (s: string): string => {
    // Count frequency of each character
    const charFrequencies = new Map<string, number>();
    for (const char of s) {
        charFrequencies.set(char, (charFrequencies.get(char) || 0) + 1);
    }

    // Group characters by their frequency (frequency -> count of characters with that frequency)
    const frequencyGroupSizes = new Map<number, number>();
    for (const frequency of charFrequencies.values()) {
        frequencyGroupSizes.set(frequency, (frequencyGroupSizes.get(frequency) || 0) + 1);
    }

    // Find the majority frequency (largest group size, with highest frequency as tiebreaker)
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

    // Collect all characters that have the majority frequency
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