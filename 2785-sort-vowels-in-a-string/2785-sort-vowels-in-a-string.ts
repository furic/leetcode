function sortVowels(s: string): string {
    const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
    const extractedVowels: string[] = [];

    // Extract vowels
    for (let ch of s) {
      if (vowels.has(ch)) {
        extractedVowels.push(ch);
      }
    }

    // Sort vowels by ASCII value
    extractedVowels.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

    // Rebuild string
    let result = '';
    let vowelIndex = 0;

    for (let ch of s) {
      if (vowels.has(ch)) {
        result += extractedVowels[vowelIndex++];
      } else {
        result += ch;
      }
    }

    return result;

};