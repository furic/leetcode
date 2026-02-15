const rob = (nums: number[], colors: number[]): number => {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    
    // dp[i] = max money robbing houses 0..i
    const dp: number[] = new Array(n);
    dp[0] = nums[0];
    
    for (let i = 1; i < n; i++) {
        // Option 1: Don't rob house i
        const skip = dp[i - 1];
        
        // Option 2: Rob house i
        let rob;
        if (colors[i] === colors[i - 1]) {
            // Same color as previous - cannot rob adjacent with same color
            rob = (i >= 2 ? dp[i - 2] : 0) + nums[i];
        } else {
            // Different color - can rob adjacent
            rob = dp[i - 1] + nums[i];
        }
        
        dp[i] = Math.max(skip, rob);
    }
    
    return dp[n - 1];
};