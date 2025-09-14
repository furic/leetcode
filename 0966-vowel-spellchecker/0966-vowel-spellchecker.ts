function devowelWord(word: string): string {
    return word.toLowerCase().replaceAll(/(a|e|i|o|u)/g, '*');
}

function spellchecker(wordlist: string[], queries: string[]): string[] {
    
    let output: string[] = [];

    const caseSensitiveDictionary: Set<string> = new Set(wordlist);
    const caseInsensitiveDictionary: Map<string, string> = new Map();
    const devoweledDictionary: Map<string, string> = new Map();
    
    for(const word of wordlist) {
        const wordLowerCase = word.toLowerCase();
        if(!caseInsensitiveDictionary.has(wordLowerCase)) {
            caseInsensitiveDictionary.set(wordLowerCase, word);
        }

        const devoweledWord = devowelWord(wordLowerCase);
        if(!devoweledDictionary.has(devoweledWord)) {
            devoweledDictionary.set(devoweledWord, word);
        }
    }

    for(const query of queries) {

        if(caseSensitiveDictionary.has(query)) {
            output.push(query);
            continue;
        } 
        
        const lowerCaseQuery = query.toLowerCase();
        if(caseInsensitiveDictionary.has(lowerCaseQuery)) {
            output.push(caseInsensitiveDictionary.get(lowerCaseQuery))
            continue;
        }
        
        const devoweledWord = devowelWord(query);
        if( devoweledDictionary.has(devoweledWord) ) {
            output.push(devoweledDictionary.get(devoweledWord))
            continue;
        }

        output.push("");
    }

    return output;
};