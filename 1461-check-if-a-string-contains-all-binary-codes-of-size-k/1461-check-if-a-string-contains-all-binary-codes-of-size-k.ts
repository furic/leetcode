function hasAllCodes(s: string, k: number): boolean {
    const set = new Set<string>();
    
    for (let i = 0; i <= s.length - k; i++) {
        set.add(s.substring(i, i + k));
    }

    return set.size === Math.pow(2, k);
}