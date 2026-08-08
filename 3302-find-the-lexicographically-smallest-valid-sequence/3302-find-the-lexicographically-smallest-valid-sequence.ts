const validSequence = (word1: string, word2: string): number[] => {
    const n = word1.length, m = word2.length;

    // Precompute: for each position j in word2, the earliest index in word1
    // where word2[j..m-1] can be matched going right-to-left
    const suffixMatch = new Array(m).fill(-1);
    let j = m - 1;
    for (let i = n - 1; i >= 0; i--) {
        if (j >= 0 && word1[i] === word2[j]) suffixMatch[j--] = i;
    }

    const result: number[] = [];
    let skipped = 0;
    j = 0;

    for (let i = 0; i < n; i++) {
        if (j === m) break;
        const isMatch = word1[i] === word2[j];
        const canSkip = skipped === 0 && (j === m - 1 || i < suffixMatch[j + 1]);

        if (isMatch || canSkip) {
            if (!isMatch) skipped++;
            result.push(i);
            j++;
        }
    }

    return j === m ? result : [];
};