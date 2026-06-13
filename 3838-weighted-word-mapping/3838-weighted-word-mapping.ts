function mapWordWeights(words: string[], weights: number[]): string {
    const d: Record<string, number> = {};
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 26; i++) {
        d[alpha[i]] = weights[i];
    }
    const cnt: number[] = [];
    for (const word of words) {
        let add = 0;
        for (const x of word) {
            add += d[x];
        }
        const res = add % 26;
        cnt.push(res);
    }
    let ans = "";
    for (const i of cnt) {
        ans += String.fromCharCode(96 + 26 - i);
    }
    return ans;
};