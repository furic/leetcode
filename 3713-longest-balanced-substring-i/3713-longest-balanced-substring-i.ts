/**
 * Finds longest balanced substring where all distinct characters appear equal times
 * Strategy: Try all substrings, check if character frequencies are all equal
 */
const longestBalanced = (s: string): number => {
    const stringLength = s.length;
    const ALPHABET_SIZE = 26;
    const CHAR_CODE_A = 97;
    let maxBalancedLength = 0;
    
    /**
     * Checks if all distinct characters have the same frequency
     * A substring is balanced if all non-zero frequencies are equal
     */
    const isBalanced = (charFrequency: number[]): boolean => {
        let commonCount = -1;
        
        for (let i = 0; i < ALPHABET_SIZE; i++) {
            if (charFrequency[i] === 0) continue;
            
            if (commonCount === -1) {
                // First non-zero frequency - set as expected count
                commonCount = charFrequency[i];
            } else if (charFrequency[i] !== commonCount) {
                // Found different frequency - not balanced
                return false;
            }
        }
        
        return true;
    };
    
    // Try all possible substrings
    for (let start = 0; start < stringLength; start++) {
        const charFrequency = new Array(ALPHABET_SIZE).fill(0);
        
        for (let end = start; end < stringLength; end++) {
            // Add current character to frequency count
            charFrequency[s.charCodeAt(end) - CHAR_CODE_A]++;
            
            // Check if current substring is balanced
            if (isBalanced(charFrequency)) {
                const substringLength = end - start + 1;
                maxBalancedLength = Math.max(maxBalancedLength, substringLength);
            }
        }
    }
    
    return maxBalancedLength;
};