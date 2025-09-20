function maxProfit(prices: number[], strat: number[], k: number): number {
    const n = prices.length;
    const h = Math.floor(k / 2);
    const sp: number[] = new Array(n);
    let base = 0;

    for (let i = 0; i < n; i++) {
        sp[i] = strat[i] * prices[i];
        base += sp[i];
    }

    if (n === k) {
        const win_orig = base;
        let win_mod = 0;
        for (let i = h; i < n; i++) win_mod += prices[i];
        const change = win_mod - win_orig;
        return base + Math.max(0, change);
    }

    let win_orig = 0;
    for (let i = 0; i < k; i++) win_orig += sp[i];

    let win_mod = 0;
    for (let i = h; i < k; i++) win_mod += prices[i];

    let max_ch = win_mod - win_orig;

    for (let i = 1; i <= n - k; i++) {
        win_orig += sp[i + k - 1] - sp[i - 1];
        win_mod += prices[i + k - 1] - prices[i - 1 + h];
        max_ch = Math.max(max_ch, win_mod - win_orig);
    }

    return base + Math.max(0, max_ch);
}