const answerString = (word: string, numFriends: number): string => {
    if (numFriends === 1) return word;
    const n = word.length;
    const maxLength = n - numFriends + 1;
    let res = "";
    for (let i = 0; i < n; i++) {
        const s = word.substring(i, Math.min(i + maxLength, n));
        if (s > res) {
            res = s;
        }
    }
    return res;
};