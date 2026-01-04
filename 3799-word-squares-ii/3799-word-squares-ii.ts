/**
 * Finds all valid word squares from 4-letter words
 * A word square forms a 2x2 grid where corners must satisfy specific letter equality constraints
 * 
 * Visual representation:
 *   top[0]  ...  top[3]     (top row)
 *   left[1] ...  right[1]
 *   left[2] ...  right[2]
 *   left[3] ...  right[3]   (bottom row)
 *   
 * Constraints:
 *   top[0] == left[0]      (top-left corner)
 *   top[3] == right[0]     (top-right corner)
 *   bottom[0] == left[3]   (bottom-left corner)
 *   bottom[3] == right[3]  (bottom-right corner)
 */
const wordSquares = (words: string[]): string[][] => {
    const WORD_LENGTH = 4;
    const LAST_INDEX = WORD_LENGTH - 1;
    
    const validSquares: string[][] = [];
    
    // Map: first letter → array of words starting with that letter
    // Used for efficient lookup when matching corner constraints
    const wordsByFirstLetter: Record<string, string[]> = {};
    
    // Build lookup map for words by their first letter
    for (const word of words) {
        const firstLetter = word[0];
        
        if (!wordsByFirstLetter[firstLetter]) {
            wordsByFirstLetter[firstLetter] = [];
        }
        
        wordsByFirstLetter[firstLetter].push(word);
    }
    
    // Try each word as the top row
    for (const topWord of words) {
        // Constraint 1: top[0] == left[0]
        // Find words that can be the left column (must start with same letter as top)
        const candidateLeftWords = wordsByFirstLetter[topWord[0]] || [];
        
        for (const leftWord of candidateLeftWords) {
            if (leftWord === topWord) continue; // Must be distinct
            
            // Constraint 2: top[3] == right[0]
            // Find words that can be the right column (must start with top's last letter)
            const candidateRightWords = wordsByFirstLetter[topWord[LAST_INDEX]] || [];
            
            for (const rightWord of candidateRightWords) {
                if (rightWord === topWord || rightWord === leftWord) continue; // Must be distinct
                
                // Constraint 3: bottom[0] == left[3]
                // Find words that can be the bottom row (must start with left's last letter)
                const candidateBottomWords = wordsByFirstLetter[leftWord[LAST_INDEX]] || [];
                
                for (const bottomWord of candidateBottomWords) {
                    // Ensure all four words are distinct
                    if (bottomWord === topWord || bottomWord === leftWord || bottomWord === rightWord) {
                        continue;
                    }
                    
                    // Constraint 4: bottom[3] == right[3]
                    // Check if bottom-right corner matches
                    if (bottomWord[LAST_INDEX] === rightWord[LAST_INDEX]) {
                        validSquares.push([topWord, leftWord, rightWord, bottomWord]);
                    }
                }
            }
        }
    }
    
    // Sort results lexicographically by the 4-tuple (top, left, right, bottom)
    validSquares.sort((squareA, squareB) => {
        for (let position = 0; position < WORD_LENGTH; position++) {
            if (squareA[position] < squareB[position]) return -1;
            if (squareA[position] > squareB[position]) return 1;
        }
        return 0;
    });
    
    return validSquares;
};