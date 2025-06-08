const maximumProfit = (prices: number[], k: number): number => {
    const n = prices.length;
    const NEG_INF = -1e14;
    const memo: number[][][] = Array.from({ length: n + 1 }, () =>
        Array.from({ length: k + 1 }, () => Array(3).fill(NEG_INF))
    );

    const dp = (day: number, remaining: number, state: number): number => {
        if (day === n) return state === 0 ? 0 : NEG_INF;
        if (memo[day][remaining][state] !== NEG_INF) return memo[day][remaining][state];

        const price = prices[day];
        let profit = NEG_INF;

        // Option 1: Do nothing today
        profit = Math.max(profit, dp(day + 1, remaining, state));

        // Option 2: Take an action
        if (state === 0) {
            // Currently neutral — can either buy or short sell
            profit = Math.max(profit, dp(day + 1, remaining, 1) - price); // Buy
            profit = Math.max(profit, dp(day + 1, remaining, 2) + price); // Short sell
        } else if (remaining > 0) {
            if (state === 1) {
                // Currently holding a stock (from a buy)
                profit = Math.max(profit, dp(day + 1, remaining - 1, 0) + price); // Sell
            } else {
                // Currently in a short position
                profit = Math.max(profit, dp(day + 1, remaining - 1, 0) - price); // Buy back
            }
        }

        return (memo[day][remaining][state] = profit);
    };

    return dp(0, k, 0);
};