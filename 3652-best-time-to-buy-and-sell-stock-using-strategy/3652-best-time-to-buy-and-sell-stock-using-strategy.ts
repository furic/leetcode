const maxProfit = (prices: number[], strategy: number[], k: number): number => {
    const totalDays = prices.length;
    const halfWindowSize = k / 2;
    
    // Calculate base profit with original strategy
    let baseProfit = 0;
    for (let day = 0; day < totalDays; day++) {
        baseProfit += prices[day] * strategy[day];
    }
    
    let maximumProfit = baseProfit;
    
    // Calculate delta for first window [0, k)
    // Delta = profit change if we modify this window
    let profitDelta = 0;
    for (let day = 0; day < k; day++) {
        // Remove original strategy profit
        profitDelta -= prices[day] * strategy[day];
        
        // Add new strategy profit (first half holds, second half sells)
        if (day >= halfWindowSize) {
            profitDelta += prices[day]; // Second half: sell (strategy = 1)
        }
        // First half: hold (strategy = 0) contributes 0
    }
    
    maximumProfit = Math.max(maximumProfit, baseProfit + profitDelta);
    
    // Slide window from position k to end
    for (let windowEnd = k; windowEnd < totalDays; windowEnd++) {
        const windowStart = windowEnd - k;
        const windowMiddle = windowEnd - halfWindowSize;
        
        // Remove leftmost element leaving the window
        profitDelta += prices[windowStart] * strategy[windowStart]; // Restore original
        profitDelta -= prices[windowMiddle]; // Remove old middle (was selling)
        
        // Add rightmost element entering the window
        profitDelta += prices[windowEnd]; // New element sells
        profitDelta -= prices[windowEnd] * strategy[windowEnd]; // Remove original
        
        maximumProfit = Math.max(maximumProfit, baseProfit + profitDelta);
    }
    
    return maximumProfit;
};