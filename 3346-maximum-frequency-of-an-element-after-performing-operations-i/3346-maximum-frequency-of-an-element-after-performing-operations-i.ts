function maxFrequency(nums: number[], k: number, numOperations: number): number {
    const mx = Math.max(...nums);
    const n = mx + k + 2;
    const f = new Array(n).fill(0);
    for (const x of nums) f[x]++;
    const pre = new Array(n).fill(0);
    pre[0] = f[0];
    for (let i = 1; i < n; i++) pre[i] = pre[i - 1] + f[i];
    let ans = 0;
    for (let t = 0; t < n; t++) {
        if (f[t] == 0 && numOperations == 0) continue;
        const l = Math.max(0, t - k), r = Math.min(n - 1, t + k);
        const tot = pre[r] - (l > 0 ? pre[l - 1] : 0);
        const adj = tot - f[t];
        const val = f[t] + Math.min(numOperations, adj);
        ans = Math.max(ans, val);
    }
    return ans;
}