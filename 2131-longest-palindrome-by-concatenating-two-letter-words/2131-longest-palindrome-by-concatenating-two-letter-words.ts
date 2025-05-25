const longestPalindrome = (words: string[]): number => {
    const frequencyMap = new Map<string, number>();

    // Count the frequency of each word
    for (const word of words) {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }

    let palindromeLength = 0;
    let hasCenterPalindrome = false;

    for (const [word, count] of frequencyMap.entries()) {
        const reversedWord = word[1] + word[0];

        if (word === reversedWord) {
            // Word is already a palindrome like "gg", "cc"
            palindromeLength += Math.floor(count / 2) * 4;
            if (count % 2 === 1) {
                hasCenterPalindrome = true;
            }
        } else if (word < reversedWord && frequencyMap.has(reversedWord)) {
            // Use matching reversible pair like "ab" <-> "ba"
            palindromeLength += Math.min(count, frequencyMap.get(reversedWord)!) * 4;
        }
    }

    if (hasCenterPalindrome) {
        palindromeLength += 2; // One central palindromic word
    }

    return palindromeLength;
};