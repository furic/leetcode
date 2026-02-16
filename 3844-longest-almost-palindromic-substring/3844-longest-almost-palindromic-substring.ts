const almostPalindromic = (s: string): number => {
    const n = s.length;
    
    // Flat typed arrays for cache efficiency
    const isPal = new Uint8Array(n * n);
    const matchLen = new Uint16Array(n * n);
    
    // Precompute both tables in single pass
    for (let i = n - 1; i >= 0; i--) {
        isPal[i * n + i] = 1;
        matchLen[i * n + i] = 1;
        
        if (i + 1 < n) {
            const idx = i * n + i + 1;
            if (s[i] === s[i + 1]) {
                isPal[idx] = 1;
                matchLen[idx] = 1;
            }
        }
        
        for (let j = i + 2; j < n; j++) {
            const idx = i * n + j;
            if (s[i] === s[j]) {
                const inner = (i + 1) * n + j - 1;
                isPal[idx] = isPal[inner];
                matchLen[idx] = 1 + matchLen[inner];
            }
        }
    }
    
    // Check from longest to shortest
    for (let len = n; len >= 2; len--) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            const idx = i * n + j;
            const halfLen = len >> 1;
            
            // Already palindrome
            if (matchLen[idx] >= halfLen) return len;
            
            // Find mismatch position
            const m = matchLen[idx];
            const l = i + m;
            const r = j - m;
            
            // Try removing left or right char at mismatch
            if (isPal[(l + 1) * n + r] || isPal[l * n + r - 1]) return len;
        }
    }
    
    return 2;
};