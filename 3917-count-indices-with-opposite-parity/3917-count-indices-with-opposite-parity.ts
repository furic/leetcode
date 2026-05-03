const countOppositeParity = (nums: number[]): number[] => {
    let oddCount = 0;
    let evenCount = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] % 2 === 1) {
            oddCount++;
            nums[i] = evenCount;
        } else {
            evenCount++;
            nums[i] = oddCount;
        }
    }
    return nums;
};
