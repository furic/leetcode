const longestCommonPrefix = (arr1: number[], arr2: number[]): number => {
    // Store all numeric prefixes of arr1 values
    const arr1Prefixes = new Set<number>();
    for (const num of arr1) {
        for (let x = num; x > 0; x = Math.floor(x / 10))
            arr1Prefixes.add(x);
    }

    let maxLen = 0;

    // For each arr2 value, find the longest prefix that exists in arr1Prefixes
    for (const num of arr2) {
        for (let x = num; x > 0; x = Math.floor(x / 10)) {
            if (arr1Prefixes.has(x)) {
                maxLen = Math.max(maxLen, x.toString().length);
                break; // First match is the longest for this number
            }
        }
    }

    return maxLen;
};