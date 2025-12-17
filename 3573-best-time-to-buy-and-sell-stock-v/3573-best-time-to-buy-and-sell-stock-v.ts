function maximumProfit(prices: number[], k: number): number {
    const n = prices.length;
    if (n === 0) 
        return 0;

    const profit: number[] = new Array(k + 1).fill(0);
    const buy: number[] = new Array(k + 1).fill(-1e9); 
    const sell: number[] = new Array(k + 1).fill(0);

    for (let j = 0; j < n; j++) {
        let p = prices[j];
        for (let i = 0; i < k; i++) {
            profit[i] = Math.max(Math.max(profit[i], buy[i + 1] + p), sell[i + 1] - p);
            buy[i + 1] = Math.max(buy[i + 1], profit[i + 1] - p);
            sell[i + 1] = Math.max(sell[i + 1], profit[i + 1] + p);
        }
    }

    return Math.max(...profit);
};