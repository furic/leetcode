/**
 * Calculates maximum profit from at most k stock transactions
 * Allows both normal transactions (buy→sell) and short selling (sell→buy back)
 * Uses DP with three state arrays tracking different transaction stages
 */
const maximumProfit = (prices: number[], k: number): number => {
    const numDays = prices.length;
    if (numDays === 0) return 0;

    // DP states for each transaction level (0 to k):
    // maxProfitCompleted[i] = max profit achievable considering transaction constraints at level i
    // maxProfitHoldingLong[i] = max profit when currently holding a long position at transaction level i
    // maxProfitHoldingShort[i] = max profit when currently holding a short position at transaction level i
    const maxProfitCompleted: number[] = new Array(k + 1).fill(0);
    const maxProfitHoldingLong: number[] = new Array(k + 1).fill(-Infinity);
    const maxProfitHoldingShort: number[] = new Array(k + 1).fill(0);

    // Process each day's price
    for (let day = 0; day < numDays; day++) {
        const currentPrice = prices[day];
        
        // Update states for each transaction level
        for (let transactionLevel = 0; transactionLevel < k; transactionLevel++) {
            // Update completed profit: either stay as is, or close a position
            maxProfitCompleted[transactionLevel] = Math.max(
                maxProfitCompleted[transactionLevel],  // No action
                maxProfitHoldingLong[transactionLevel + 1] + currentPrice,  // Close long: sell at current price
                maxProfitHoldingShort[transactionLevel + 1] - currentPrice   // Close short: buy back at current price
            );
            
            // Update long position: either hold existing, or open new long
            maxProfitHoldingLong[transactionLevel + 1] = Math.max(
                maxProfitHoldingLong[transactionLevel + 1],  // Hold existing long
                maxProfitCompleted[transactionLevel + 1] - currentPrice  // Open new long: buy at current price
            );
            
            // Update short position: either hold existing, or open new short
            maxProfitHoldingShort[transactionLevel + 1] = Math.max(
                maxProfitHoldingShort[transactionLevel + 1],  // Hold existing short
                maxProfitCompleted[transactionLevel + 1] + currentPrice  // Open new short: sell at current price
            );
        }
    }

    // Return maximum profit across all transaction constraint levels
    return Math.max(...maxProfitCompleted);
};