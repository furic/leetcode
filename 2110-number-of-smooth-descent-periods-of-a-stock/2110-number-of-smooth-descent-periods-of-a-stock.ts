/**
 * Counts all smooth descent periods in a stock price array
 * A smooth descent period is a contiguous sequence where each price decreases by exactly 1
 * Strategy: Track length of current descent, add it to total (counts all subarrays ending at current position)
 */
const getDescentPeriods = (prices: number[]): number => {
    let totalPeriods = 1; // Start with 1 for the first single-day period
    let currentDescentLength = 1;

    for (let i = 1; i < prices.length; i++) {
        // Check if current price continues the descent (exactly 1 less than previous)
        if (prices[i] === prices[i - 1] - 1) {
            currentDescentLength++;
        } else {
            // Descent breaks: reset to single-day period
            currentDescentLength = 1;
        }
        
        // Add all descent periods ending at position i
        // If currentDescentLength = 3, we can form 3 periods ending here:
        // [i], [i-1,i], [i-2,i-1,i]
        totalPeriods += currentDescentLength;
    }

    return totalPeriods;
};