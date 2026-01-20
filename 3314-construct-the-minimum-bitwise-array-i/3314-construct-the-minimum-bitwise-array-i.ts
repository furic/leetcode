const minBitwiseArray = (nums: number[]): number[] => {
    const result: number[] = [];
    
    for (let i = 0; i < nums.length; i++) {
        const prime = nums[i];
        
        if (prime === 2) {
            // 2 is the only even prime, no valid answer exists
            result[i] = -1;
        } else {
            // Extract the lowest set bit of (prime + 1)
            const lowestBit = (prime + 1) & (-(prime + 1));
            // Minimum answer = prime minus half the lowest bit
            result[i] = prime - (lowestBit >> 1);
        }
    }
    
    return result;
};