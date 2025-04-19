/**
 * Computes all possible XOR combinations between any two unique numbers.
 * Stores the result as a boolean array for efficient lookup.
 */
const computeXorPairs = (uniqueNums: number[]): boolean[] => {
    const xorPairs: boolean[] = Array(2048).fill(false);

    for (let i = 0; i < uniqueNums.length; i++) {
        for (let j = i; j < uniqueNums.length; j++) {
            const xorValue = uniqueNums[i] ^ uniqueNums[j];
            xorPairs[xorValue] = true;
        }
    }

    return xorPairs;
};

/**
 * Combines previous XOR pair values with all unique numbers to compute final XOR triplet values.
 */
const computeXorTriplets = (uniqueNums: number[], xorPairValues: boolean[]): boolean[] => {
    const xorTripletFlags: boolean[] = Array(2048).fill(false);

    for (let xorPairValue = 0; xorPairValue < 2048; xorPairValue++) {
        if (xorPairValues[xorPairValue]) {
            for (const num of uniqueNums) {
                const finalXorValue = xorPairValue ^ num;
                xorTripletFlags[finalXorValue] = true;
            }
        }
    }

    return xorTripletFlags;
};

/**
 * Returns the count of unique XOR triplet values for all (i <= j <= k) combinations.
 */
const uniqueXorTriplets = (nums: number[]): number => {
    const uniqueNums = Array.from(new Set(nums));
    const xorPairValues = computeXorPairs(uniqueNums);
    const xorTripletFlags = computeXorTriplets(uniqueNums, xorPairValues);

    // Count the number of true flags indicating unique XOR results
    return xorTripletFlags.reduce((count, exists) => count + (exists ? 1 : 0), 0);
}