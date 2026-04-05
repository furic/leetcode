const mirrorFrequency = (s: string): number => {
    const letterFreq = new Array<number>(26).fill(0);
    const digitFreq  = new Array<number>(10).fill(0);

    for (const c of s) {
        if (c >= 'a') letterFreq[c.charCodeAt(0) - 97]++;
        else          digitFreq[Number(c)]++;
    }

    let total = 0;
    for (let i = 0; i < 13; i++) total += Math.abs(letterFreq[i] - letterFreq[25 - i]);
    for (let i = 0; i < 5;  i++) total += Math.abs(digitFreq[i]  - digitFreq[9 - i]);

    return total;
};