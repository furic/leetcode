const nthSmallest = (n: number, k: number): number => {
    const comb = Array.from({length: 51}, () => Array(51).fill(0n));
    for (let i = 0; i <= 50; i++) {
        comb[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            comb[i][j] = comb[i - 1][j - 1] + comb[i - 1][j];
        }
    }

    let result = 0n;
    let remaining = BigInt(n);
    let onesLeft = k;
    
    for (let bit = 50; bit >= 0 && onesLeft > 0; bit--) {
        const countIfZero = comb[bit][onesLeft];
        if (countIfZero < remaining) {
            result |= (1n << BigInt(bit));
            remaining -= countIfZero;
            onesLeft--;
        }
    }
    
    return Number(result);
};