const findLHS = (nums: number[]): number => {
    const frequencyMap = new Map();

    // Step 1: Count frequencies
    for (let num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    let maxLength = 0;

    // Step 2: Check (num, num+1) pairs
    for (let [num, count] of frequencyMap.entries()) {
        if (frequencyMap.has(num + 1)) {
            const currentLength = count + frequencyMap.get(num + 1);
            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;

};