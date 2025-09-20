# Sliding Window Delta Calculation | 31 Lines | O(n) | 12ms

# Intuition
The profit is calculated as the sum of strategy[i] × prices[i]. We can modify exactly one window of k consecutive elements by setting the first k/2 to 0 (hold) and the last k/2 to 1 (sell). Instead of recalculating profit for each window from scratch, we can track the profit delta (change from base profit) and slide the window efficiently to find the maximum.

# Approach
I'll use a sliding window with incremental delta calculation:

1. **Base Profit Calculation**: First calculate the profit with the original strategy as our baseline.

2. **Initial Window Delta**: For the first window [0, k), calculate the profit change (delta) if we apply the modification:
   - Remove original strategy contributions: -prices[i] × strategy[i]
   - Add new strategy contributions: +prices[i] for second half (sells), 0 for first half (holds)

3. **Sliding Window Optimization**: When sliding the window by one position:
   - Remove the leftmost element leaving the window (restore its original contribution)
   - Add the rightmost element entering the window (apply modification to it)
   - Update the middle element transitioning from "hold" to "sell"

4. **Delta Update Formula**: For each window slide:
   - Leaving element: delta += prices[start] × strategy[start] - prices[middle]
   - Entering element: delta += prices[end] - prices[end] × strategy[end]

5. **Maximum Profit**: Track the maximum of baseProfit + delta across all windows, including no modification (delta = 0).

# Complexity
- Time complexity: $$O(n)$$
  - Calculate base profit in one pass: O(n)
  - Calculate initial window delta: O(k)
  - Slide window n-k times with O(1) updates: O(n)
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Only using constant extra variables for tracking profit, delta, and indices
  - No additional data structures that scale with input size
  - All computations done with primitive operations

# Code
```typescript []
const maxProfit = (prices: number[], strategy: number[], k: number): number => {
    const totalDays = prices.length;
    const halfWindowSize = k / 2;
    
    let baseProfit = 0;
    for (let day = 0; day < totalDays; day++) {
        baseProfit += prices[day] * strategy[day];
    }
    
    let maximumProfit = baseProfit;
    
    let profitDelta = 0;
    for (let day = 0; day < k; day++) {
        profitDelta -= prices[day] * strategy[day];
        
        if (day >= halfWindowSize) {
            profitDelta += prices[day];
        }
    }
    
    maximumProfit = Math.max(maximumProfit, baseProfit + profitDelta);
    
    for (let windowEnd = k; windowEnd < totalDays; windowEnd++) {
        const windowStart = windowEnd - k;
        const windowMiddle = windowEnd - halfWindowSize;
        
        profitDelta += prices[windowStart] * strategy[windowStart];
        profitDelta -= prices[windowMiddle];
        
        profitDelta += prices[windowEnd];
        profitDelta -= prices[windowEnd] * strategy[windowEnd];
        
        maximumProfit = Math.max(maximumProfit, baseProfit + profitDelta);
    }
    
    return maximumProfit;
};
```