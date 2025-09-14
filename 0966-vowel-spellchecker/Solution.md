# Priority-Based Dictionary Lookup | 44 Lines | O(n+m) | 29ms

# Intuition
This spellchecker problem has three levels of matching priority: exact match, case-insensitive match, and vowel-insensitive match. The key insight is to preprocess the wordlist into three different data structures that enable fast lookups for each matching level. For case and vowel insensitive matches, we need to store only the first occurrence from the wordlist to handle the precedence requirement correctly.

# Approach
I'll use a three-tier dictionary system with preprocessing:

1. **Exact Match Dictionary**: Use a Set for O(1) exact lookups of words with original casing.

2. **Case-Insensitive Map**: Map lowercase versions of words to their first occurrence in the original wordlist. This handles capitalization errors while respecting first-occurrence precedence.

3. **Vowel-Insensitive Map**: Create a pattern by replacing all vowels with wildcards, then map these patterns to the first word that matches each pattern.

4. **Query Processing**: For each query, check matches in priority order:
   - Priority 1: Exact match (case-sensitive)
   - Priority 2: Case-insensitive match  
   - Priority 3: Vowel-insensitive match
   - Default: Return empty string if no match found

5. **Vowel Pattern Matching**: Replace vowels (a,e,i,o,u) with asterisks to create patterns that match regardless of specific vowel used.

The preprocessing ensures O(1) lookup time for each query, making the solution efficient even for large wordlists.

# Complexity
- Time complexity: $$O(n + m)$$
  - Preprocessing wordlist: O(n) where n is total characters in all words
  - Processing queries: O(m) where m is total characters in all queries
  - Each lookup operation is O(1) on average due to hash-based data structures

- Space complexity: $$O(n)$$
  - Three data structures store transformed versions of the wordlist
  - Exact match set: O(number of words)
  - Case-insensitive map: O(number of words) 
  - Vowel-insensitive map: O(number of words)
  - Total space proportional to input wordlist size

# Code
```typescript []
const replaceVowelsWithWildcard = (word: string): string => {
    return word.toLowerCase().replaceAll(/(a|e|i|o|u)/g, '*');
};

const spellchecker = (wordlist: string[], queries: string[]): string[] => {
    const correctionResults: string[] = [];

    const exactMatchDictionary: Set<string> = new Set(wordlist);
    const caseInsensitiveMap: Map<string, string> = new Map();
    const vowelInsensitiveMap: Map<string, string> = new Map();
    
    for (const originalWord of wordlist) {
        const lowercaseWord = originalWord.toLowerCase();
        
        if (!caseInsensitiveMap.has(lowercaseWord)) {
            caseInsensitiveMap.set(lowercaseWord, originalWord);
        }

        const vowelPattern = replaceVowelsWithWildcard(lowercaseWord);
        if (!vowelInsensitiveMap.has(vowelPattern)) {
            vowelInsensitiveMap.set(vowelPattern, originalWord);
        }
    }

    for (const query of queries) {
        if (exactMatchDictionary.has(query)) {
            correctionResults.push(query);
            continue;
        } 
        
        const queryLowercase = query.toLowerCase();
        if (caseInsensitiveMap.has(queryLowercase)) {
            correctionResults.push(caseInsensitiveMap.get(queryLowercase)!);
            continue;
        }
        
        const queryVowelPattern = replaceVowelsWithWildcard(query);
        if (vowelInsensitiveMap.has(queryVowelPattern)) {
            correctionResults.push(vowelInsensitiveMap.get(queryVowelPattern)!);
            continue;
        }

        correctionResults.push("");
    }

    return correctionResults;
};
```