const minXor = (nums: number[], k: number): number => {
    const n = nums.length;

    // Step 1: Pre-calculate prefix XORs.
    // This allows for O(1) computation of the XOR sum of any subarray.
    // prefixXor[i] stores the XOR sum of nums[0]...nums[i-1].
    // The XOR sum of subarray nums[p...i-1] is prefixXor[i] ^ prefixXor[p].
    const prefixXor = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixXor[i + 1] = prefixXor[i] ^ nums[i];
    }

    // Step 2: Dynamic Programming with Space Optimization.
    // We use two arrays to store DP states to reduce space complexity from O(k*n) to O(n).
    // `prevDp` stores the DP values for j-1 partitions.
    // `currentDp` stores the DP values for j partitions.
    
    // `prevDp` is initialized for the base case: j = 1 partition.
    let prevDp = new Array(n + 1).fill(Infinity);
    for (let i = 1; i <= n; i++) {
        prevDp[i] = prefixXor[i];
    }

    // Iterate from j = 2 to k partitions.
    for (let j = 2; j <= k; j++) {
        const currentDp = new Array(n + 1).fill(Infinity);
        
        // i represents the length of the prefix of `nums` being partitioned (nums[0...i-1]).
        // To partition i elements into j non-empty subarrays, we must have i >= j.
        for (let i = j; i <= n; i++) {
            // p is the split point. The last subarray is nums[p...i-1].
            // The first p elements (nums[0...p-1]) are partitioned into j-1 subarrays.
            // To partition p elements into j-1 non-empty subarrays, p must be at least j-1.
            for (let p = j - 1; p < i; p++) {
                const lastSubarrayXor = prefixXor[i] ^ prefixXor[p];
                const currentMax = Math.max(prevDp[p], lastSubarrayXor);
                currentDp[i] = Math.min(currentDp[i], currentMax);
            }
        }
        // The results for j partitions become the "previous" results for the next iteration (j+1).
        prevDp = currentDp;
    }
    
    // The final answer is for k partitions of the entire array (n elements).
    // After the loop, prevDp holds the results for k partitions.
    return prevDp[n];
};