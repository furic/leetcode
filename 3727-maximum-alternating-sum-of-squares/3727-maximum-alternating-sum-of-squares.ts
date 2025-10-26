const maxAlternatingSum = (nums: number[]): number => {
    // Key insight: Since we square all values, signs don't matter - use absolute values
    const absoluteValues = nums.map(Math.abs);
    absoluteValues.sort((a, b) => a - b);
    
    const arrayLength = absoluteValues.length;
    let maxScore = 0n;

    // Greedy strategy: Pair largest with smallest to maximize (large² - small²)
    // Process pairs from both ends moving inward
    const pairCount = Math.floor(arrayLength / 2);
    
    for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
        const largestValue = BigInt(absoluteValues[arrayLength - pairIndex - 1]);
        const smallestValue = BigInt(absoluteValues[pairIndex]);
        
        // Add difference: large² - small²
        const pairContribution = largestValue * largestValue - smallestValue * smallestValue;
        maxScore += pairContribution;
    }

    // If odd number of elements, add the middle element squared (no pair to subtract)
    if (arrayLength % 2 === 1) {
        const middleIndex = Math.floor(arrayLength / 2);
        const middleValue = BigInt(absoluteValues[middleIndex]);
        maxScore += middleValue * middleValue;
    }

    return Number(maxScore);
};