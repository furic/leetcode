const longestSubsequence = (nums: number[]): number => {
    // Calculate XOR of all elements
    let totalXor = 0;
    for (const num of nums) {
        totalXor ^= num;
    }
    
    // If XOR of all elements is non-zero, return full length
    if (totalXor !== 0) {
        return nums.length;
    }
    
    // If XOR is zero, check if any element is non-zero
    // If so, we can remove one element to get non-zero XOR
    const hasNonZero = nums.some(num => num !== 0);
    return hasNonZero ? nums.length - 1 : 0;
};