function minimumHammingDistance(source: number[], target: number[], allowedSwaps: number[][]): number {
    const n = source.length;
    const parent: number[] = Array.from({length: n}, (_, i) => i);
    const rank: number[] = Array(n).fill(0);

    const find = (x: number): number => {
        if (parent[x] !== x) 
            parent[x] = find(parent[x]);
        return parent[x];
    };
    const uni = (a: number, b: number): void => {
        let fa = find(a), fb = find(b);
        if (fa === fb) 
            return;
        if (rank[fa] < rank[fb]) 
            [fa, fb] = [fb, fa];
        parent[fb] = fa;
        if (rank[fa] === rank[fb]) 
            rank[fa]++;

    };

    for (let [a, b] of allowedSwaps) {
        uni(a, b);
    }

    const groups = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        const r = find(i);
        if (!groups.has(r)) 
            groups.set(r, []);
        groups.get(r)!.push(i);
    }
    let ans = 0;
    for (let idxs of groups.values()) {
        const freq = new Map<number, number>();
        for (let i of idxs) {
            freq.set(source[i], (freq.get(source[i]) || 0) + 1);
        }
        for (let i of idxs) {
            if ((freq.get(target[i]) || 0) > 0) {
                freq.set(target[i], freq.get(target[i])! - 1);
            } else {
                ans++;
            }

        }

    }

    return ans;
};