# Dynamic Programming Subset Sum | 18 Lines | O(n√n) | 9ms

# Intuition
This is a variation of the subset sum problem where we want to count the number of ways to form sum n using unique powers (i^x where i is a positive integer). The key insight is that we can use dynamic programming where dp[sum] represents the number of ways to achieve that sum. Since each number can be used at most once, we need to process the DP array carefully to avoid double-counting.

# Approach
I'll use dynamic programming with a "knapsack-like" approach:

1. **DP State Definition**: Let `dp[sum]` = number of ways to make that sum using unique powers of x. Initialize `dp[0] = 1` (one way to make 0: use no numbers).

2. **Iterate Through Bases**: For each positive integer i, calculate i^x and consider it as a potential component of our sum.

3. **Backward DP Update**: For each power value, update the DP array from right to left (high sums to low sums). This ensures that when we update `dp[targetSum]`, we're using the previous state of `dp[targetSum - powerValue]` that doesn't include the current power.

4. **Optimization**: Stop when i^x > n, since larger powers cannot contribute to the sum.

5. **Transition**: If we can make sum `s` in `dp[s]` ways, then we can make sum `s + i^x` in `dp[s] + dp[s + i^x]` ways.

The backward iteration is crucial to ensure each power is used at most once in each subset.

# Complexity
- Time complexity: $$O(n \sqrt[x]{n})$$
  - We iterate through bases from 1 to ⌊n^(1/x)⌋, which is at most √n when x=2
  - For each base, we iterate through sums from n down to the power value
  - Total iterations: approximately n × ⌊n^(1/x)⌋ = O(n√n) for typical cases

- Space complexity: $$O(n)$$
  - DP array of size n+1 to store ways to make each possible sum
  - All other variables use constant space
  - No additional data structures that scale with input

# Code
```typescript []
const numberOfWays = (n: number, x: number): number => {
    const MODULO = 1e9 + 7;
    
    const waysToMakeSum: number[] = Array(n + 1).fill(0);
    waysToMakeSum[0] = 1;
    
    for (let baseNumber = 1; baseNumber <= n; baseNumber++) {
        const powerValue = Math.pow(baseNumber, x);
        
        if (powerValue > n) {
            break;
        }
        
        for (let targetSum = n; targetSum >= powerValue; targetSum--) {
            waysToMakeSum[targetSum] = (waysToMakeSum[targetSum] + waysToMakeSum[targetSum - powerValue]) % MODULO;
        }
    }
    
    return waysToMakeSum[n];
};
```