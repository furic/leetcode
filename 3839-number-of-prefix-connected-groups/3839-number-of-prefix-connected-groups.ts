const prefixConnected = (words: string[], k: number): number => {
    const groupCountMap = new Map<string, number>();
    for (let word of words) {
        if (word.length < k) continue;
        const prefix = word.substring(0, k);
        groupCountMap.set(prefix, (groupCountMap.get(prefix) || 0) + 1);
    }
    
    return Array.from(groupCountMap.entries())
        .filter(([_, count]) => count >= 2)
        .length;
};