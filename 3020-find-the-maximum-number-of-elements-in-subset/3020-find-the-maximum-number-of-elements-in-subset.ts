const maximumLength = (nums: number[]): number => {
    const freq = new Map<number, number>();
    for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);

    let maxLen = 0;

    for (const [start, startFreq] of freq) {
        let chainLen = 0;

        if (start === 1) {
            // 1^(2^k) = 1 always, so the whole chain is 1s
            chainLen = startFreq % 2 === 1 ? startFreq : startFreq - 1;
        } else {
            let key = start;
            while ((freq.get(key) ?? 0) >= 2 && freq.has(key * key)) {
                chainLen += 2;
                key = key * key;
            }
            chainLen++; // Peak element appears once in the middle
        }

        maxLen = Math.max(maxLen, chainLen);
    }

    return maxLen;
};