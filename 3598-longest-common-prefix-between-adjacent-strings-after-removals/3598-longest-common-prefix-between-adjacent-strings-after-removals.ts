const lcp = (a: string, b: string): number => {
    let j = 0;
    while (j < a.length && j < b.length && a[j] === b[j]) {
        j++;
    }
    return j;
}

const longestCommonPrefix = (words: string[]): number[] => {
    const n = words.length;
    if (n === 1) {
        return [0];
    }
    const adj: number[] = [];
    for (let i = 0; i < n - 1; i++) {
        adj.push(lcp(words[i], words[i + 1]));
    }

    const prefixMax: number[] = new Array(adj.length);
    if (adj.length > 0) {
        prefixMax[0] = adj[0];
        for (let i = 1; i < adj.length; i++) {
            prefixMax[i] = Math.max(prefixMax[i - 1], adj[i]);
        }
    }

    const suffixMax: number[] = new Array(adj.length);
    if (adj.length > 0) {
        suffixMax[adj.length - 1] = adj[adj.length - 1];
        for (let i = adj.length - 2; i >= 0; i--) {
            suffixMax[i] = Math.max(suffixMax[i + 1], adj[i]);
        }
    }

    const ans: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        let candidate = 0;
        if (i >= 2) {
            candidate = Math.max(candidate, prefixMax[i - 2]);
        }
        if (i <= n - 3) {
            candidate = Math.max(candidate, suffixMax[i + 1]);
        }
        if (i >= 1 && i <= n - 2) {
            const newAdj = lcp(words[i - 1], words[i + 1]);
            candidate = Math.max(candidate, newAdj);
        }
        ans[i] = candidate;
    }

    return ans;
};