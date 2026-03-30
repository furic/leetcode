const arrayPairSum = (nums: number[]): number => {
    const OFFSET = 10000;
    const freq = new Array(2 * OFFSET + 1).fill(0);
    for (const num of nums) freq[num + OFFSET]++;

    // Take every other value in sorted order — the first of each pair is always the min
    let sum = 0;
    let takingMin = true;
    for (let i = 0; i <= 2 * OFFSET; i++) {
        while (freq[i] > 0) {
            if (takingMin) sum += i - OFFSET;
            takingMin = !takingMin;
            freq[i]--;
        }
    }

    return sum;
};