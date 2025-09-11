const sortVowels = (s: string): string => {
    const vowelSet = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

    // Extract all vowels from string and sort by ASCII value
    const sortedVowels = s.split("").filter(char => vowelSet.has(char)).sort();

    let vowelIndex = 0; // Pointer to track current position in sorted vowels
    const characters = s.split("");

    // Replace vowels in original positions with sorted vowels
    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
        if (vowelSet.has(characters[charIndex])) {
            characters[charIndex] = sortedVowels[vowelIndex++];
        }
    }

    return characters.join("");
};