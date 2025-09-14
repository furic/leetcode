function spellchecker(wordlist: string[], queries: string[]): string[] {
    const exactMatchSet = new Set(wordlist);

    const caseInsensitiveMap: Map<string, string> = new Map();
    const vowelInsensitiveMap: Map<string, string> = new Map();

    const normalizeVowels = (word: string): string => {
      const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
      return word
        .toLowerCase()
        .split("")
        .map((ch) => (vowels.has(ch) ? "*" : ch))
        .join("");
    };

    // Build maps
    for (const word of wordlist) {
      const lowerWord = word.toLowerCase();
      if (!caseInsensitiveMap.has(lowerWord)) {
        caseInsensitiveMap.set(lowerWord, word);
      }
      const vowelWord = normalizeVowels(lowerWord);
      if (!vowelInsensitiveMap.has(vowelWord)) {
        vowelInsensitiveMap.set(vowelWord, word);
      }
    }

    const results: string[] = [];

    for (const query of queries) {
      if (exactMatchSet.has(query)) {
        results.push(query);
        continue;
      }
      const lowerQuery = query.toLowerCase();
      if (caseInsensitiveMap.has(lowerQuery)) {
        results.push(caseInsensitiveMap.get(lowerQuery)!);
        continue;
      }
      const vowelQuery = normalizeVowels(lowerQuery);
      if (vowelInsensitiveMap.has(vowelQuery)) {
        results.push(vowelInsensitiveMap.get(vowelQuery)!);
        continue;
      }
      results.push("");
    }

    return results;

};