const zeroFilledSubarray = (nums: number[]): number => {
    let result = 0;
    let zeroConsecCount = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            zeroConsecCount++;
            result += zeroConsecCount;
        } else {
            zeroConsecCount = 0;
        }
        
    }
    return result;
};