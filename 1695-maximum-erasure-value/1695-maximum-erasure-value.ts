const maximumUniqueSubarray = (nums: number[]): number => {
    let currentWindowSum = 0;
    let maxWindowSum = 0;
    const lastSeenIndex: Map<number, number> = new Map();
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        const currentNum = nums[right];

        if (lastSeenIndex.has(currentNum)) {
            // Move `left` to one position after the last occurrence of `currentNum`
            const duplicateIndex = lastSeenIndex.get(currentNum)!;
            while (left <= duplicateIndex) {
                currentWindowSum -= nums[left];
                left++;
            }
        }

        // Add the current number to the window
        currentWindowSum += currentNum;
        lastSeenIndex.set(currentNum, right);

        // Update the maximum found so far
        maxWindowSum = Math.max(maxWindowSum, currentWindowSum);
    }

    return maxWindowSum;
};