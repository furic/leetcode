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
    let leftScore = 0;
    
    // Try each split position (must leave at least 1 character on right)
    for (let index = 0; index < s.length - 1; index++) {
        const char = s[index];
        const charScore = char.charCodeAt(0) - 96;
        leftScore += charScore;
        
        // Check if left score equals half of total (implies right score also equals half)
        if (leftScore === targetScore) {
            return true;
        }
    }
    
    return false;
};