function removeAnagrams(words: string[]): string[] {
    let res: string[] = [words[0]]; // result array
    let n: number = words.length;

    for (let i = 1; i < n; i++) {
        if (!compare(words[i], words[i - 1])) {
            res.push(words[i]);
        }
    }
    return res;
}

// determine if two words are anagrams
function compare(word1: string, word2: string): boolean {
    let freq: number[] = new Array(26).fill(0);
    for (let ch of word1) {
        freq[ch.charCodeAt(0) - "a".charCodeAt(0)]++;
    }
    for (let ch of word2) {
        freq[ch.charCodeAt(0) - "a".charCodeAt(0)]--;
    }
    return freq.every((x) => x === 0);
}