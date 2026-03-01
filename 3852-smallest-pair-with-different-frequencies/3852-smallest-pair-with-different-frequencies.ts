const minDistinctFreqPair = (nums: number[]): number[] => {
    const freqs = new Array<number>(101).fill(0);
    for (let num of nums) {
        freqs[num]++;
    }
    const result = [0, 0];
    for (let num = 1; num < 101; num++) {
        if (freqs[num] > 0) {
            if (result[0] === 0) {
                result[0] = num;
            } else if (freqs[result[0]] != freqs[num]) {
                result[1] = num;
                return result;
            }
        }
    }
    return [-1, -1];
};
