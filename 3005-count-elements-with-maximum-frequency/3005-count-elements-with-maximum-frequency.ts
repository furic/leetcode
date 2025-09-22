const maxFrequencyElements = (nums: number[]): number => {
    if (nums.length === 0) return 0;

    const elementFrequencies = new Map<number, number>();
    
    for (const element of nums) {
        elementFrequencies.set(element, (elementFrequencies.get(element) || 0) + 1);
    }

    const maxFrequency = Math.max(...elementFrequencies.values());
    
    let totalElementsWithMaxFrequency = 0;
    for (const [_, frequency] of elementFrequencies) {
        if (frequency === maxFrequency) {
            totalElementsWithMaxFrequency += frequency;
        }
    }

    return totalElementsWithMaxFrequency;
};