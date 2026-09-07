const distinctSubseqII = (s: string): number => {
    const MOD = 1_000_000_007;
    const lastCount = new Array(26).fill(0); // last contribution of each letter
    let total = 0;

    for (const ch of s) {
        const idx = ch.charCodeAt(0) - 97;
        const newContrib = (1 + total) % MOD; // all existing subsequences + empty
        total = (total + newContrib - lastCount[idx] + MOD) % MOD;
        lastCount[idx] = newContrib;
    }

    return total;
};