function canBeTypedWords(text: string, brokenLetters: string): number {
    let mask = 0;
    for (let i = 0; i < brokenLetters.length; i++) {
        mask |= 1 << (brokenLetters.charCodeAt(i) - 97);
    }

    let count = 0, brokenWord = 0;
    for (let i = 0; i <= text.length; i++) {
        if (i < text.length) {
            brokenWord |= mask & (1 << (text.charCodeAt(i) - 97));
        }
        if (i === text.length || text[i] === ' ') {
            if (!brokenWord) count++;
            brokenWord = 0;
        }
    }
    return count;

};