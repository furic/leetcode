const canMakeEqual = (nums: number[], k: number): boolean => {
    const n = nums.length;
    for (let num of [1, -1]) {
        let ops = 0;
        const newNums = [...nums];
        for (let i = 0; i < n - 1; i++) {
            if (newNums[i] !== num) {
                newNums[i] *= -1;
                newNums[i + 1] *= -1;
                ops++;
            }
        }
        if (ops <= k && newNums.every((x) => x === num)) return true;
    }
    return false;
};
