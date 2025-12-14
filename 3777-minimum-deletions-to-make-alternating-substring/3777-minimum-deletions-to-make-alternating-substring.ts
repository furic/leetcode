const minDeletions = (s: string, queries: number[][]): number[] => {
    const n = s.length;
    const chars = s.split('');
    
    // bad[i] = 1 if chars[i] === chars[i+1]
    const bad = new Array(n).fill(0);
    for (let i = 0; i < n - 1; i++) {
        bad[i] = chars[i] === chars[i + 1] ? 1 : 0;
    }
    
    // Fenwick Tree for range sum queries
    const tree = new Array(n + 1).fill(0);
    
    const update = (idx: number, delta: number) => { for (let i = idx + 1; i <= n; i += i & -i) tree[i] += delta; };
    const prefixSum = (idx: number) => { let s = 0; for (let i = idx + 1; i > 0; i -= i & -i) s += tree[i]; return s; };
    
    const rangeSum = (left: number, right: number): number => {
        if (left > right) return 0;
        return prefixSum(right) - (left > 0 ? prefixSum(left - 1) : 0);
    };
    
    // Initialize tree with bad pair counts
    for (let i = 0; i < n - 1; i++) {
        if (bad[i]) update(i, 1);
    }
    
    const result: number[] = [];
    
    for (const query of queries) {
        if (query[0] === 1) {
            // Flip character at index j
            const j = query[1];
            chars[j] = chars[j] === 'A' ? 'B' : 'A';
            
            // Update bad[j-1] (pair with left neighbor)
            if (j > 0) {
                const newBad = chars[j - 1] === chars[j] ? 1 : 0;
                if (newBad !== bad[j - 1]) {
                    update(j - 1, newBad - bad[j - 1]);
                    bad[j - 1] = newBad;
                }
            }
            
            // Update bad[j] (pair with right neighbor)
            if (j < n - 1) {
                const newBad = chars[j] === chars[j + 1] ? 1 : 0;
                if (newBad !== bad[j]) {
                    update(j, newBad - bad[j]);
                    bad[j] = newBad;
                }
            }
        } else {
            // Query: count bad pairs in range [l, r-1]
            const l = query[1], r = query[2];
            result.push(rangeSum(l, r - 1));
        }
    }
    
    return result;
};