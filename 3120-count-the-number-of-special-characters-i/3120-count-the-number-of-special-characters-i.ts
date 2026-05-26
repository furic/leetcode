function numberOfSpecialChars(word: string): number {
    const lowerSet: Set<string> = new Set();
    const upperSet: Set<string> = new Set();

    for (const char of word) {
        if (char >= 'a' && char <= 'z') {
            lowerSet.add(char);
        } else {
            upperSet.add(char.toLowerCase());
        }
    }

    let count = 0;
    for (const char of lowerSet) {
        if (upperSet.has(char)) {
            count++;
        }
    }

    return count;
}