const rob = (nums: number[], colors: number[]): number => {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    
    const dp: number[] = new Array(n);
    dp[0] = nums[0];
    
    for (let i = 1; i < n; i++) {
        const skip = dp[i - 1];
        
        let rob = 0;
        if (colors[i] === colors[i - 1]) {
            rob = (i >= 2 ? dp[i - 2] : 0) + nums[i];
        } else {
            rob = dp[i - 1] + nums[i];
        }
        
        dp[i] = Math.max(skip, rob);
    }
    
    return dp[n - 1];
};
