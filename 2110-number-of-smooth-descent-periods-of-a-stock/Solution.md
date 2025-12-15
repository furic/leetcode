# Single Pass Length Tracking | 11 Lines | O(n) | 3ms

# Intuition
A smooth descent period is a contiguous sequence where each price drops by exactly 1. For any descent of length k, we can form k different subarrays ending at the current position. By tracking the current descent length and adding it at each step, we count all periods efficiently in one pass.

# Approach
- **Initialize Counters**:
  - `totalPeriods = 1`: Start with first single-day period
  - `currentDescentLength = 1`: Track current consecutive descent

- **Single Pass Processing**:
  - For each price starting from index 1:
  - Check if `prices[i] == prices[i-1] - 1` (continues descent)
  - If yes: increment descent length
  - If no: reset descent length to 1 (start new potential descent)

- **Counting Insight**:
  - At each position, add `currentDescentLength` to total
  - This counts all subarrays ending at current position
  - Example: descent length of 3 means we can form 3 periods: [i], [i-1,i], [i-2,i-1,i]

- **Why This Works**:
  - Each day contributes to multiple periods (as ending point of various lengths)
  - By accumulating the descent length at each step, we count each valid subarray exactly once
  - No need to explicitly enumerate all subarrays

- **Example** ([3,2,1,4]):
  - i=0: length=1, total=1 → periods: [3]
  - i=1: 2==3-1 ✓, length=2, total=3 → added: [2], [3,2]
  - i=2: 1==2-1 ✓, length=3, total=6 → added: [1], [2,1], [3,2,1]
  - i=3: 4≠1-1 ✗, length=1, total=7 → added: [4]

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through array
  - Constant operations per element

- Space complexity: $$O(1)$$
  - Only two integer variables
  - No additional data structures

# Code
```typescript
const getDescentPeriods = (prices: number[]): number => {
    let totalPeriods = 1;
    let currentDescentLength = 1;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] === prices[i - 1] - 1) {
            currentDescentLength++;
        } else {
            currentDescentLength = 1;
        }
        totalPeriods += currentDescentLength;
    }

    return totalPeriods;
};
```