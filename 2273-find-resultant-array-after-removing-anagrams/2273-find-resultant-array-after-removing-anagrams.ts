const removeAnagrams = (words: string[]): string[] => {
    const result: string[] = [];
    let previousSortedWord = "";
    
    for (const word of words) {
        // Create canonical form by sorting characters
        const sortedWord = word.split("").sort().join("");
        
        // Only keep word if it's not an anagram of the previous word
        if (sortedWord !== previousSortedWord) {
            result.push(word);
            previousSortedWord = sortedWord;
        }
    }
    
    return result;
};