const maximumValueSum = (nums: number[], k: number, edges: number[][]): number => {
    const n = nums.length;

    // dp[i][j]: max sum from index i onwards with j indicating whether the number of XOR operations is even (0) or odd (1)
    const dp: number[][] = Array.from({ length: n + 1 }, () => [-Infinity, -Infinity]);

    // Base case: no more nodes, sum is 0 if we’ve performed an odd number of XORs
    dp[n][1] = 0;

    // Iterate backwards through nodes
    for (let i = n - 1; i >= 0; i--) {
        for (let oddCount = 0; oddCount <= 1; oddCount++) {
            const applyXor = dp[i + 1][oddCount ^ 1] + (nums[i] ^ k); // XOR current node
            const skipXor = dp[i + 1][oddCount] + nums[i];            // keep current node

            dp[i][oddCount] = Math.max(applyXor, skipXor);
        }
    }

    // Result: maximum sum with an odd number of XORs (operations are done on edges, each affecting two nodes)
    return dp[0][1];
};