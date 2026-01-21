const minBitwiseArray = (nums: number[]): number[] => {
    for (let i = 0; i < nums.length; i++) {
        const prime = nums[i];
        let answer = -1;
        let bitValue = 1;
        
        // Find the first 0-bit position (from right) and subtract it from prime
        // This gives us the minimum value where value OR (value + 1) === prime
        while ((prime & bitValue) !== 0) {
            answer = prime - bitValue;
            bitValue <<= 1;
        }
        
        nums[i] = answer;
    }
    return nums;
};