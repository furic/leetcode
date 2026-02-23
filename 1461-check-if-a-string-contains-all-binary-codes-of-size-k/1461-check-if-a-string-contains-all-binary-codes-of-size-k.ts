const hasAllCodes = (s: string, k: number): boolean => {
    const totalCodes = 1 << k; // 2^k unique binary codes of length k

    // Early exit: string must be long enough to contain all unique windows
    if (s.length < totalCodes + k - 1) return false;

    const seen = new Set<number>();

    for (let i = 0; i <= s.length - k; i++) {
        seen.add(parseInt(s.slice(i, i + k), 2));
        if (seen.size === totalCodes) return true;
    }

    return false;
};