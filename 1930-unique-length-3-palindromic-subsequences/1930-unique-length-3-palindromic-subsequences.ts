const countPalindromicSubsequence = (s: string): number => {
    const ALPHABET_SIZE = 26;
    const stringLength = s.length;
    
    // Track first and last occurrence of each character (a-z)
    const firstOccurrence = Array(ALPHABET_SIZE).fill(-1);
    const lastOccurrence = Array(ALPHABET_SIZE).fill(-1);

    // Build first and last occurrence arrays
    for (let index = 0; index < stringLength; index++) {
        const charCode = s.charCodeAt(index) - 97; // 'a' = 97
        
        if (firstOccurrence[charCode] === -1) {
            firstOccurrence[charCode] = index;
        }
        lastOccurrence[charCode] = index;
    }

    let uniquePalindromeCount = 0;

    // For each character that appears at least twice
    // Try it as the outer characters of palindrome (like "aba", "bbb", etc.)
    for (let outerChar = 0; outerChar < ALPHABET_SIZE; outerChar++) {
        const firstPos = firstOccurrence[outerChar];
        const lastPos = lastOccurrence[outerChar];
        
        // Need at least 2 occurrences with space in between for middle character
        if (firstPos !== -1 && lastPos - firstPos > 1) {
            // Use bitmask to track unique middle characters
            let middleCharsBitmask = 0;
            
            // Check all characters between first and last occurrence
            for (let middleIndex = firstPos + 1; middleIndex < lastPos; middleIndex++) {
                const middleCharCode = s.charCodeAt(middleIndex) - 97;
                
                // Set bit for this character (marks it as present)
                middleCharsBitmask |= 1 << middleCharCode;
            }
            
            // Count number of set bits = number of unique middle characters
            // Each unique middle char creates one unique palindrome with this outer char
            const uniqueMiddleChars = countSetBits(middleCharsBitmask);
            uniquePalindromeCount += uniqueMiddleChars;
        }
    }

    return uniquePalindromeCount;
};

// Helper function to count set bits in a number
const countSetBits = (num: number): number => {
    let count = 0;
    while (num > 0) {
        count += num & 1;
        num >>= 1;
    }
    return count;
};