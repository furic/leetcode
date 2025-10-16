const findSmallestInteger = (nums: number[], value: number): number => {
    // Count how many numbers map to each remainder class (0 to value-1)
    const remainderCounts: number[] = new Array(value).fill(0);

    for (const num of nums) {
        // Calculate remainder, handling negative numbers correctly
        const remainder = ((num % value) + value) % value;
        remainderCounts[remainder]++;
    }

    // Find the maximum MEX by greedily assigning numbers to 0, 1, 2, ...
    let maxMEX = 0;
    while (remainderCounts[maxMEX % value] > 0) {
        // Use one number from this remainder class
        remainderCounts[maxMEX % value]--;
        maxMEX++;
    }

    return maxMEX;
};