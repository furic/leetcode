const resultArray = (nums: number[], k: number): number[] => {
    const endingHere = new Array<number>(k).fill(0); // subarrays ending at previous element
    const result     = new Array<number>(k).fill(0);

    for (const num of nums) {
        const numMod = num % k;
        const current = new Array<number>(k).fill(0);

        current[numMod]++; // single-element subarray [num]
        for (let r = 0; r < k; r++)
            current[(r * numMod) % k] += endingHere[r]; // extend previous subarrays

        for (let r = 0; r < k; r++) {
            result[r]     += current[r];
            endingHere[r]  = current[r];
        }
    }

    return result;
};