/**
 * Finds maximum score by selecting k pairs with strictly increasing indices
 * Strategy: DP with memoization trying three choices at each state
 * 1. Skip current nums1 element
 * 2. Skip current nums2 element  
 * 3. Take the pair and advance both indices
 */
const maxScore = (nums1: number[], nums2: number[], k: number): number => {
    const nums1Length = nums1.length;
    const nums2Length = nums2.length;
    const memoization: (number | null)[] = Array(nums1Length * nums2Length * k).fill(null);
    
    const IMPOSSIBLE = -1e15; // Large negative value for unreachable states
    
    const computeMaxScore = (index1: number, index2: number, pairsSelected: number): number => {
        // Base case: selected exactly k pairs
        if (pairsSelected === k) return 0;
        
        // Base case: reached end of either array
        if (index1 === nums1Length || index2 === nums2Length) return IMPOSSIBLE;
        
        // Pruning: check if enough elements remain
        const remainingInNums1 = nums1Length - index1;
        const remainingInNums2 = nums2Length - index2;
        const remainingPossiblePairs = Math.min(remainingInNums1, remainingInNums2);
        const pairsStillNeeded = k - pairsSelected;
        if (remainingPossiblePairs < pairsStillNeeded) return IMPOSSIBLE;
        
        // Check memoization cache
        const memoKey = index1 * nums2Length * k + index2 * k + pairsSelected;
        if (memoization[memoKey] !== null) return memoization[memoKey];
        
        // Try all three choices and take maximum
        return memoization[memoKey] = Math.max(
            computeMaxScore(index1 + 1, index2, pairsSelected),                                              // Skip nums1[index1]
            computeMaxScore(index1, index2 + 1, pairsSelected),                                              // Skip nums2[index2]
            nums1[index1] * nums2[index2] + computeMaxScore(index1 + 1, index2 + 1, pairsSelected + 1)     // Take pair
        );
    };
    
    return computeMaxScore(0, 0, 0);
};