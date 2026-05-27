function numberOfSpecialChars(word: string): number {
    const lastLower: number[] = new Array(26).fill(-1);
    const firstUpper: number[] = new Array(26).fill(-1);

    const invalid = new Set<number>();

    for (let i = 0; i < word.length; i++) {
        const ch = word[i];

        if (ch >= 'a' && ch <= 'z') {
            const idx = ch.charCodeAt(0) - 97;

            lastLower[idx] = i;

            if (firstUpper[idx] !== -1) {
                invalid.add(idx);
            }

        } else {
            const idx = ch.charCodeAt(0) - 65;

            if (firstUpper[idx] === -1) {
                firstUpper[idx] = i;
            }
        }
    }

    let specialCount = 0;

    for (let i = 0; i < 26; i++) {
        if (
            lastLower[i] !== -1 &&
            firstUpper[i] !== -1 &&
            !invalid.has(i)
        ) {
            specialCount++;
        }
    }

    return specialCount;
}