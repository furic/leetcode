/**
 * Counts pairs of similar words where similarity is defined by cyclic shifts
 * Two words are similar if applying cyclic alphabet shifts can make them equal
 * Strategy: Normalize each word by shifting to start with 'a', group identical normalized forms
 */
const countPairs = (words: string[]): number => {
    const CHAR_CODE_A = 97; // ASCII code for 'a'
    
    // Map: normalized form → count of words with this form
    const normalizedWordCounts = new Map<string, number>();

    /**
     * Normalizes a word by shifting all characters so the first character becomes 'a'
     * Words that are similar will have the same normalized form
     * 
     * Example: 
     * - "fusion" (shift back by 5) → "apndji"
     * - "layout" (shift back by 11) → "apndji"
     * Both normalize to same form, so they're similar
     */
    const normalizeWord = (word: string): string => {
        // Calculate shift amount based on first character
        const shiftAmount = word.charCodeAt(0) - CHAR_CODE_A;
        let normalized = "";

        for (let charIndex = 0; charIndex < word.length; charIndex++) {
            // Shift each character backwards by shiftAmount (with wraparound)
            const charCode = word.charCodeAt(charIndex) - CHAR_CODE_A;
            const shiftedCode = (charCode - shiftAmount + 26) % 26;
            normalized += String.fromCharCode(shiftedCode + CHAR_CODE_A);
        }
        
        return normalized;
    };

    // Group words by their normalized form
    for (const word of words) {
        const normalizedForm = normalizeWord(word);
        normalizedWordCounts.set(
            normalizedForm, 
            (normalizedWordCounts.get(normalizedForm) || 0) + 1
        );
    }

    // Count pairs within each group using combination formula: C(n, 2) = n×(n-1)/2
    let totalPairs = 0;
    for (const count of normalizedWordCounts.values()) {
        totalPairs += (count * (count - 1)) / 2;
    }

    return totalPairs;
};