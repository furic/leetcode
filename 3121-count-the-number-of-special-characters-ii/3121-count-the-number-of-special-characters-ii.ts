const numberOfSpecialChars = (word: string): number => {
    const lastLowerIdx = new Array(26).fill(-1);
    const firstUpperIdx = new Array(26).fill(-1);

    for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        if (ch >= 'a') {
            lastLowerIdx[ch.charCodeAt(0) - 97] = i;
        } else {
            const idx = ch.charCodeAt(0) - 65;
            if (firstUpperIdx[idx] === -1) firstUpperIdx[idx] = i;
        }
    }

    let count = 0;
    for (let i = 0; i < 26; i++) {
        if (lastLowerIdx[i] !== -1 && firstUpperIdx[i] !== -1 && lastLowerIdx[i] < firstUpperIdx[i])
            count++;
    }

    return count;
};