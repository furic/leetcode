const minPartitionScore = (nums: number[], k: number): number => {
    const n = nums.length;
    
    const prefix = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    
    const value = (left: number, right: number): number => {
        const sum = prefix[right + 1] - prefix[left];
        return sum * (sum + 1) / 2;
    };
    
    let prev = new Float64Array(n + 1).fill(Infinity);
    let curr = new Float64Array(n + 1).fill(Infinity);
    prev[0] = 0;
    
    // Divide & Conquer: compute dp[lo..hi] with optimal split in [optLo, optHi]
    const solve = (lo: number, hi: number, optLo: number, optHi: number): void => {
        if (lo > hi) return;
        
        const mid = (lo + hi) >> 1;
        let bestOpt = optLo;
        
        const mEnd = Math.min(optHi, mid - 1);
        for (let m = optLo; m <= mEnd; m++) {
            const cost = prev[m] + value(m, mid - 1);
            if (cost < curr[mid]) {
                curr[mid] = cost;
                bestOpt = m;
            }
        }
        
        // Key insight: optimal split point is monotonic
        solve(lo, mid - 1, optLo, bestOpt);
        solve(mid + 1, hi, bestOpt, optHi);
    };
    
    for (let j = 1; j <= k; j++) {
        curr.fill(Infinity);
        solve(j, n, j - 1, n - 1);
        [prev, curr] = [curr, prev];
    }
    
    return prev[n];
};