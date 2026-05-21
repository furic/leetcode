function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    const prefixs = new Set<number>();

    // 1. Generate and store all prefixes for numbers in arr1
    for (let i = 0; i < arr1.length; i++) {
        let x = arr1[i];
        while (x > 0) {
            prefixs.add(x);
            x = Math.floor(x / 10); // Remove the last digit
        }
    }

    let res = 0;

    // 2. Check prefixes for numbers in arr2 against the Set
    for (let i = 0; i < arr2.length; i++) {
        let x = arr2[i];

        while (x > 0) {
            // Check if the current prefix exists in arr1
            if (prefixs.has(x)) {
                // The first match is the longest for this number
                res = Math.max(res, x.toString().length);
                break; // Optimization: Stop checking shorter prefixes
            }
            x = Math.floor(x / 10); // Remove the last digit
        }
    }

    return res;
};