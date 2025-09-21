const evenNumberBitwiseORs = (nums: number[]): number => {
    let result = 0;
    for (const num of nums) {
        if (num % 2 === 0) {
            result |= num;
        }
    }
    return result;
};