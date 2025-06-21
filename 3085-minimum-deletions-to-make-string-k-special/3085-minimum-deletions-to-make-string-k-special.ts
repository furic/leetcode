const minimumDeletions = (word: string, k: number): number => {
    const freqMap = new Map<string, number>();

    // Count frequency of each character
    for (const char of word) {
        freqMap.set(char, (freqMap.get(char) ?? 0) + 1);
    }

    // Sort frequencies in ascending order
    const freqs = Array.from(freqMap.values()).sort((a, b) => a - b);
    const n = freqs.length;
    let minDeletes = Infinity;

    // Try making each frequency the baseline
    for (let i = 0; i < n; i++) {
        const baseFreq = freqs[i];
        let totalDeletes = 0;

        
        // Delete all characters with lower frequency entirely
        for (let j = 0; j < i; j++) {
            totalDeletes += freqs[j];
        }

        // Reduce characters with frequency too far above base + k
        for (let j = i; j < n; j++) {
            if (freqs[j] > baseFreq + k) {
                totalDeletes += freqs[j] - (baseFreq + k);
            }
        }

        minDeletes = Math.min(minDeletes, totalDeletes);
    }

    return minDeletes;
};