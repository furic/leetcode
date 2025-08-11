function productQueries(n: number, queries: number[][]): number[] {
    const mod: number = 1000000007;
    const bins: number[] = [];
    let rep = 1;
    while (n > 0) {
        if (n % 2 === 1) {
            bins.push(rep);
        }
        n = Math.floor(n / 2);
        rep *= 2;
    }

    const m = bins.length;
    const results: number[][] = Array.from({ length: m }, () => new Array(m));
    for (let i = 0; i < m; i++) {
        let cur = 1;
        for (let j = i; j < m; j++) {
            cur = (cur * bins[j]) % mod;
            results[i][j] = cur;
        }
    }

    const ans: number[] = [];
    for (const [start, end] of queries) {
        ans.push(results[start][end]);
    }
    return ans;
}