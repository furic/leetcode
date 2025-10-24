const scoreBalance = (s: string): boolean => {
    const stringLength = s.length;
    
    // Build prefix sum array: prefixSum[i] = sum of scores from index 0 to i
    const prefixSum: number[] = new Array(stringLength);
    
    for (let index = 0; index < stringLength; index++) {
        const charScore = s.charCodeAt(index) - 96;
        prefixSum[index] = (index > 0 ? prefixSum[index - 1] : 0) + charScore;
    }
    
    const totalScore = prefixSum[stringLength - 1];
    
    // If total score is odd, cannot split evenly
    if (totalScore % 2 !== 0) {
        return false;
    }
    
    const targetScore = totalScore / 2;
    
    // Try each split position (must leave at least 1 character on right)
    // prefixSum[i] = left substring score
    // totalScore - prefixSum[i] = right substring score
    for (let splitIndex = 0; splitIndex < stringLength - 1; splitIndex++) {
        const leftScore = prefixSum[splitIndex];
        
        // Early termination: if left exceeds target, no valid split exists
        if (leftScore > targetScore) {
            return false;
        }
        
        // Check if left score equals target (implies right also equals target)
        if (leftScore === targetScore) {
            return true;
        }
    }
    
    return false;
};