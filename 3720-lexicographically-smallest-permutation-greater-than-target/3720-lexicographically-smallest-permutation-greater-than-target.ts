const lexGreaterPermutation = (s: string, target: string): string => {
    const n = s.length;
    const freq = new Map<string, number>();
    
    // Count character frequencies in s
    for (const char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    const result: string[] = [];
    
    // Get remaining characters in sorted order
    const getRemainingChars = (): string[] => {
        const chars: string[] = [];
        for (const [char, count] of freq.entries()) {
            for (let i = 0; i < count; i++) {
                chars.push(char);
            }
        }
        return chars.sort();
    };
    
    const backtrack = (pos: number, isGreater: boolean): boolean => {
        // Base case: filled all positions
        if (pos === n) {
            return isGreater;
        }
        
        // If already greater, append remaining chars in sorted order
        if (isGreater) {
            result.push(...getRemainingChars());
            return true;
        }
        
        // Get available characters in sorted order
        const available = Array.from(freq.keys())
            .filter(char => freq.get(char)! > 0)
            .sort();
        
        // Try each available character
        for (const char of available) {
            const targetChar = target[pos];
            
            // Skip characters smaller than target (won't lead to greater)
            if (char < targetChar) continue;
            
            // Use this character
            freq.set(char, freq.get(char)! - 1);
            result.push(char);
            
            // Check if we've made the result greater
            const newIsGreater = char > targetChar;
            
            // Recursively try to fill remaining positions
            if (backtrack(pos + 1, newIsGreater)) {
                return true;
            }
            
            // Backtrack: undo the choice
            result.pop();
            freq.set(char, freq.get(char)! + 1);
        }
        
        return false;
    };
    
    return backtrack(0, false) ? result.join('') : '';
};