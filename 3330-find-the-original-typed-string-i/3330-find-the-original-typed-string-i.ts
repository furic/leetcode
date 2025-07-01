const possibleStringCount = (word: string): number => {
    let n = word.length,
        ans = 1;
    for (let i = 1; i < n; ++i) {
        if (word[i - 1] === word[i]) {
            ++ans;
        }
    }
    return ans;
};