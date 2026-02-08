const maxScore = (nums1: number[], nums2: number[], k: number): number => {
    const n = nums1.length;
    const m = nums2.length;
    
    // dp[i][j] = max score with last pair at (i, j)
    let dp: number[][] = Array.from({length: n}, () => Array(m).fill(-Infinity));
    
    // Base case: first pair
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            dp[i][j] = nums1[i] * nums2[j];
        }
    }
    
    // For t = 2 to k pairs
    for (let t = 2; t <= k; t++) {
        // Build 2D prefix max of previous layer
        const prefixMax: number[][] = Array.from({length: n}, () => Array(m).fill(-Infinity));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                prefixMax[i][j] = dp[i][j];
                if (i > 0) prefixMax[i][j] = Math.max(prefixMax[i][j], prefixMax[i - 1][j]);
                if (j > 0) prefixMax[i][j] = Math.max(prefixMax[i][j], prefixMax[i][j - 1]);
            }
        }
        
        const newDp: number[][] = Array.from({length: n}, () => Array(m).fill(-Infinity));
        for (let i = t - 1; i < n; i++) {
            for (let j = t - 1; j < m; j++) {
                newDp[i][j] = prefixMax[i - 1][j - 1] + nums1[i] * nums2[j];
            }
        }
        
        dp = newDp;
    }
    
    let ans = -Infinity;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            ans = Math.max(ans, dp[i][j]);
        }
    }
    
    return ans;
};