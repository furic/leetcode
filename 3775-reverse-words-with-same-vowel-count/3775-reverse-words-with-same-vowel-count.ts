const reverseWords = (s: string): string => {
    const VOWELS = new Set(["a", "e", "i", "o", "u"]);

    const countVowels = (word: string): number =>
        word.split("").filter((c) => VOWELS.has(c)).length;

    const words = s.split(" ");
    const targetCount = countVowels(words[0]);

    return words
        .map((word, i) =>
            i === 0
                ? word
                : countVowels(word) === targetCount
                ? word.split("").reverse().join("")
                : word
        )
        .join(" ");
};
