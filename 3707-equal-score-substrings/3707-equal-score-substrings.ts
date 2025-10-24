const scoreBalance = (s: string): boolean => {
    // Calculate total score of the string
    let totalScore = 0;
    for (const char of s) {
        const charScore = char.charCodeAt(0) - 96; // 'a'=1, 'b'=2, ..., 'z'=26
        totalScore += charScore;
    }
    
    // If total score is odd, cannot split evenly
    if (totalScore % 2 !== 0) {
        return false;
    }
    
    const targetScore = totalScore / 2;
    let prefixScore = 0;
    
    // Try each split position (must leave at least 1 character on right)
    // Using prefix sum: if prefixScore = targetScore, then suffixScore = totalScore - prefixScore = targetScore
    for (let index = 0; index < s.length - 1; index++) {
        const charScore = s.charCodeAt(index) - 96;
        prefixScore += charScore;
        
        // Early termination: if prefix exceeds target, no valid split exists
        if (prefixScore > targetScore) {
            return false;
        }
        
        // Check if prefix score equals target (implies suffix also equals target)
        if (prefixScore === targetScore) {
            return true;
        }
    }
    
    return false;
};