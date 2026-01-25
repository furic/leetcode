const nthSmallest = (n: number, k: number): number => {
    // Precompute combinations: comb[i][j] = C(i, j)
    const comb: bigint[][] = Array.from({length: 52}, () => Array(52).fill(0n));
    for (let i = 0; i <= 51; i++) {
        comb[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            comb[i][j] = comb[i - 1][j - 1] + comb[i - 1][j];
        }
    }
    
    // Count integers from 1 to x with exactly k ones
    const countUpTo = (x: bigint): bigint => {
        if (x <= 0n) return 0n;
        
        let count = 0n;
        let onesUsed = 0;
        
        for (let bit = 50; bit >= 0; bit--) {  // Fixed: was 49
            if (x & (1n << BigInt(bit))) {
                const onesNeeded = k - onesUsed;
                if (onesNeeded >= 0 && onesNeeded <= bit) {
                    count += comb[bit][onesNeeded];
                }
                onesUsed++;
                if (onesUsed > k) break;
            }
        }
        
        if (onesUsed === k) count += 1n;
        
        return count;
    };
    
    const target = BigInt(n);
    let lo = 1n;
    let hi = 1n << 50n;  // Fixed: answer < 2^50
    
    while (lo < hi) {
        const mid = (lo + hi) / 2n;
        if (countUpTo(mid) >= target) {
            hi = mid;
        } else {
            lo = mid + 1n;
        }
    }
    
    return Number(lo);
};