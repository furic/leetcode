function comb(a: number, b: number, mod: number): number {
    if (b > a) return 0;
    
    let numer = 1n, denom = 1n; // Use BigInt to handle large numbers
    for (let i = 0n; i < BigInt(b); ++i) {
        numer = (numer * (BigInt(a) - i)) % BigInt(mod);
        denom = (denom * (i + 1n)) % BigInt(mod);
    }

    // Fermat's Little Theorem to compute modular inverse
    let denom_inv = 1n, exp = BigInt(mod - 2);
    while (exp > 0n) {
        if (exp % 2n > 0n) {
            denom_inv = (denom_inv * denom) % BigInt(mod);
        }
        denom = (denom * denom) % BigInt(mod);
        exp /= 2n;
    }

    return Number((numer * denom_inv) % BigInt(mod));
}

function distanceSum(m: number, n: number, k: number): number {
    const mod = 1_000_000_007;
    let res = 0n;
    const base = BigInt(comb(m * n - 2, k - 2, mod));

    for (let d = 1; d < n; ++d) {
        res = (res + BigInt(d) * BigInt(n - d) % BigInt(mod) * BigInt(m) % BigInt(mod) * BigInt(m) % BigInt(mod)) % BigInt(mod);
    }

    for (let d = 1; d < m; ++d) {
        res = (res + BigInt(d) * BigInt(m - d) % BigInt(mod) * BigInt(n) % BigInt(mod) * BigInt(n) % BigInt(mod)) % BigInt(mod);
    }

    return Number((res * base) % BigInt(mod));
}