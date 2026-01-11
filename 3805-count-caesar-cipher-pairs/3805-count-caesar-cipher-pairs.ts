const countPairs = (words: string[]): number => {
    const getSignature = (word: string): string => {
        const base = word.charCodeAt(0) - 'a'.charCodeAt(0);
        const diffs: number[] = [];
        
        for (let i = 0; i < word.length; i++) {
            const char = word.charCodeAt(i) - 'a'.charCodeAt(0);
            diffs.push((char - base + 26) % 26);
        }
        
        return diffs.join(',');
    };
    
    const signatureCount = new Map<string, number>();
    
    for (const word of words) {
        const sig = getSignature(word);
        signatureCount.set(sig, (signatureCount.get(sig) || 0) + 1);
    }
    
    let count = 0;
    for (const cnt of signatureCount.values()) {
        // For k words with same signature: k * (k-1) / 2 pairs
        count += (cnt * (cnt - 1)) / 2;
    }
    
    return count;
};