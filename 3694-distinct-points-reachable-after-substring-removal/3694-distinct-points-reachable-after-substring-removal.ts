const distinctPoints = (s: string, k: number): number => {
    const n = s.length;
    const map = new Map<string, number>([
        ['U', 0],
        ['D', 0],
        ['L', 0],
        ['R', 0]
    ]);
    const set = new Set<string>();

    for (let i = 0; i < n; i++) {
        // Remove the character that's sliding out of the window
        if (i >= k) {
            const charToRemove = s[i - k];
            map.set(charToRemove, map.get(charToRemove)! - 1);
        }
        
        // Add the current character to the window
        map.set(s[i], map.get(s[i])! + 1);
        
        // Only process when we have a full window
        if (i >= k - 1) {
            const key = `${Math.max(0, map.get('U')! - map.get('D')!)}|${Math.max(0, map.get('D')! - map.get('U')!)}|${Math.max(0, map.get('L')! - map.get('R')!)}|${Math.max(0, map.get('R')! - map.get('L')!)}`;
            set.add(key);
        }
    }
    return set.size;
};