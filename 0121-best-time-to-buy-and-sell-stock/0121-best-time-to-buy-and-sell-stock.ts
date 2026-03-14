const maxProfit = (prices: number[]): number => {
    let buyDay = 0;
    let maxProfit = 0;

    for (let sellDay = 1; sellDay < prices.length; sellDay++) {
        if (prices[sellDay] < prices[buyDay]) {
            buyDay = sellDay; // Found a cheaper buy price
        } else {
            maxProfit = Math.max(maxProfit, prices[sellDay] - prices[buyDay]);
        }
    }

    return maxProfit;
};