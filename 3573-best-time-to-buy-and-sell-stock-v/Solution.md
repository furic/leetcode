# Three-State DP | 27 Lines | O(n*k) | 16ms

# Intuition

This problem extends traditional stock trading by allowing short selling alongside normal transactions. The key insight is modeling three distinct states at each transaction level: completed transactions (no open position), holding a long position (bought stock), and holding a short position (sold stock, need to buy back). We track these states across all transaction levels to find the maximum achievable profit.

# Approach

**Core Concept:**
- Use dynamic programming with three state arrays to track different trading positions
- Each transaction level represents how many transactions we've used up
- At each day, we can transition between states or maintain current positions

**State Definitions:**
- `maxProfitCompleted[i]`: Maximum profit after completing exactly i transactions with no open position
  - This means all i transactions are fully closed (no stock held, no short position outstanding)
  - Represents a "neutral" state where we can start a new transaction
- `maxProfitHoldingLong[i]`: Maximum profit when holding a long position for the i-th transaction
  - We've bought stock but haven't sold it yet for this transaction
  - This position "uses up" transaction slot i until we close it
- `maxProfitHoldingShort[i]`: Maximum profit when holding a short position for the i-th transaction
  - We've sold stock but haven't bought it back yet for this transaction
  - This position also "uses up" transaction slot i until we close it

**Initialization:**
- `maxProfitCompleted`: Initialize all to 0 (no profit before trading starts)
- `maxProfitHoldingLong`: Initialize all to -Infinity (impossible to hold stock without buying first)
- `maxProfitHoldingShort`: Initialize all to 0 (we can short sell immediately on day 0)

**State Transitions (for each day and each transaction level):**

1. **Updating Completed Transactions:**
   - Option 1: Do nothing - maintain current completed profit at this level
   - Option 2: Close a long position - sell the stock we're holding at current price
     - Transition from `maxProfitHoldingLong[transactionLevel + 1]` to `maxProfitCompleted[transactionLevel]`
     - Add current price (selling the stock we bought)
     - This completes one transaction and moves us to a lower transaction level
   - Option 3: Close a short position - buy back the stock we sold at current price
     - Transition from `maxProfitHoldingShort[transactionLevel + 1]` to `maxProfitCompleted[transactionLevel]`
     - Subtract current price (buying back the stock we sold)
     - This also completes one transaction

2. **Updating Long Positions:**
   - Option 1: Hold existing long position - keep the stock we already bought
   - Option 2: Open new long position - buy stock at current price
     - Transition from `maxProfitCompleted[transactionLevel + 1]` to `maxProfitHoldingLong[transactionLevel + 1]`
     - Subtract current price (cost of buying)
     - We move to holding state at this transaction level

3. **Updating Short Positions:**
   - Option 1: Hold existing short position - maintain the short we already opened
   - Option 2: Open new short position - sell stock at current price
     - Transition from `maxProfitCompleted[transactionLevel + 1]` to `maxProfitHoldingShort[transactionLevel + 1]`
     - Add current price (revenue from selling)
     - We move to holding state at this transaction level

**Why the Index Offset:**
- When opening a position (long or short), we use `transactionLevel + 1` because we're "reserving" that transaction slot
- When closing a position, we complete the transaction and return to `transactionLevel` (one less used transaction)
- This ensures we never exceed k total transactions

**Iteration Strategy:**
- Process each day sequentially (outer loop)
- For each day, update all k transaction levels (inner loop)
- Order matters: we process from transaction level 0 to k-1
- This ensures dependencies are properly handled

**Final Result:**
- Return the maximum value from `maxProfitCompleted` array
- This represents the best profit achievable using 0, 1, 2, ..., or k completed transactions
- We take the max because using fewer than k transactions might be optimal

# Complexity

- Time complexity: $$O(n \times k)$$
  - Outer loop: n iterations (one per day)
  - Inner loop: k iterations (one per transaction level)
  - Each iteration performs constant-time operations

- Space complexity: $$O(k)$$
  - Three arrays of size k+1 to maintain state information
  - No additional space that scales with input size

# Code
```typescript []
const maximumProfit = (prices: number[], k: number): number => {
    const numDays = prices.length;
    if (numDays === 0) return 0;

    const maxProfitCompleted: number[] = new Array(k + 1).fill(0);
    const maxProfitHoldingLong: number[] = new Array(k + 1).fill(-Infinity);
    const maxProfitHoldingShort: number[] = new Array(k + 1).fill(0);

    for (let day = 0; day < numDays; day++) {
        const currentPrice = prices[day];
        
        for (let transactionLevel = 0; transactionLevel < k; transactionLevel++) {
            maxProfitCompleted[transactionLevel] = Math.max(
                maxProfitCompleted[transactionLevel],
                maxProfitHoldingLong[transactionLevel + 1] + currentPrice,
                maxProfitHoldingShort[transactionLevel + 1] - currentPrice
            );
            
            maxProfitHoldingLong[transactionLevel + 1] = Math.max(
                maxProfitHoldingLong[transactionLevel + 1],
                maxProfitCompleted[transactionLevel + 1] - currentPrice
            );
            
            maxProfitHoldingShort[transactionLevel + 1] = Math.max(
                maxProfitHoldingShort[transactionLevel + 1],
                maxProfitCompleted[transactionLevel + 1] + currentPrice
            );
        }
    }

    return Math.max(...maxProfitCompleted);
};
```