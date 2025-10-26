function minOperations(nums1: number[], nums2: number[]): number {
    const n = nums1.length;
    
    // Pre-calculate total cost if we just transform each position independently
    let baseCost = 0;
    for (let i = 0; i < n; i++) {
        baseCost += Math.abs(nums1[i] - nums2[i]);
    }
    
    let minCost = Infinity;
    
    // Try appending each index i
    for (let i = 0; i < n; i++) {
        // Start with base cost
        let cost = baseCost;
        
        // Remove the cost of transforming nums1[i] to nums2[i]
        // (since we're appending it instead)
        cost -= Math.abs(nums1[i] - nums2[i]);
        
        // Add the cost of handling position i via append
        // Cost = 1 (append) + distance to reach both nums2[i] and nums2[n]
        const maxVal = Math.max(nums1[i], nums2[i], nums2[n]);
        const minVal = Math.min(nums1[i], nums2[i], nums2[n]);
        cost += 1 + (maxVal - minVal);
        
        minCost = Math.min(minCost, cost);
    }
    
    return minCost;
}