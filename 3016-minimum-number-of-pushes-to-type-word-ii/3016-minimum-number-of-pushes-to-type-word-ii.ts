const minimumPushes = (word: string): number => {
    const freq = new Array(26).fill(0);
    for (const ch of word) freq[ch.charCodeAt(0) - 97]++;
    freq.sort((a, b) => b - a);

    let totalPushes = 0;
    for (let i = 0; i < 26; i++) {
        if (freq[i] === 0) break;
        totalPushes += freq[i] * (Math.floor(i / 8) + 1);
    }

    return totalPushes;
};