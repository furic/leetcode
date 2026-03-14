function maxProfit(prices: number[]): number {
    let left = 0;
    let right = 0;
    let maxProf = 0;

    while (right < prices.length) {
        const profit = prices[right] - prices[left];
        maxProf = Math.max(maxProf, profit)

        if (profit < 0) {
            left++;
        } else {
            right++;
        }
    }

    return maxProf;
};