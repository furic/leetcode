# Convex Hull Trick DP | 42 Lines | O(nk log n) | 300ms

# Intuition

This is a partition DP problem with a convex cost function. The value function `sum×(sum+1)/2` creates quadratic costs, which satisfy the convex Monge property. Use divide-and-conquer optimization to reduce from O(n²k) to O(nk log n).

# Approach

**DP Definition:**
- `dp[j][i]` = min score to partition nums[0..i-1] into j subarrays
- Transition: `dp[j][i] = min(dp[j-1][m] + value(m, i-1))` for all m < i

**Convex Hull Trick Optimization:**
- Cost function satisfies quadratic convexity
- Optimal split point is monotonic (Monge property)
- Use divide-and-conquer: when computing dp[lo..hi], optimal splits lie in range [optLo, optHi]

**Algorithm:**
1. Precompute prefix sums for O(1) range sum queries
2. For each partition count j from 1 to k:
   - Use divide-and-conquer to compute all dp[j][i]
   - At mid point: find optimal split, recurse on left/right with narrowed ranges

**Divide-and-Conquer Logic:**
- Compute dp[mid]: try all splits in [optLo, min(optHi, mid-1)]
- Recurse left [lo, mid-1] with split range [optLo, bestOpt]
- Recurse right [mid+1, hi] with split range [bestOpt, optHi]

**Example: nums=[5,1,2,1], k=2**

Prefix: [0,5,6,8,9]

j=1 (1 partition):
- dp[1][4] = value(0,3) = 9×10/2 = 45

j=2 (2 partitions):
- dp[2][4]: try splits
  - Split at 1: dp[1][1] + value(1,3) = 15 + 4×5/2 = 25 ✓
  - Split at 2: dp[1][2] + value(2,3) = 21 + 3×4/2 = 27
  - Split at 3: dp[1][3] + value(3,3) = 28 + 1×2/2 = 29

Result: 25 ✓

# Complexity

- Time complexity: $$O(nk \log n)$$
  - k iterations (one per partition count)
  - Per iteration: O(n log n) via divide-and-conquer
  - Each element processed O(log n) times
  - Overall: O(nk log n)

- Space complexity: $$O(n)$$
  - Two DP arrays: O(n) each
  - Prefix sum array: O(n)
  - Recursion stack: O(log n)
  - Overall: O(n)

# Code
```typescript []
const minPartitionScore = (nums: number[], k: number): number => {
    const n = nums.length;
    
    const prefix = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    
    const value = (left: number, right: number): number => {
        const sum = prefix[right + 1] - prefix[left];
        return sum * (sum + 1) / 2;
    };
    
    let prev = new Float64Array(n + 1).fill(Infinity);
    let curr = new Float64Array(n + 1).fill(Infinity);
    prev[0] = 0;
    
    const solve = (lo: number, hi: number, optLo: number, optHi: number): void => {
        if (lo > hi) return;
        
        const mid = (lo + hi) >> 1;
        let bestOpt = optLo;
        
        const mEnd = Math.min(optHi, mid - 1);
        for (let m = optLo; m <= mEnd; m++) {
            const cost = prev[m] + value(m, mid - 1);
            if (cost < curr[mid]) {
                curr[mid] = cost;
                bestOpt = m;
            }
        }
        
        solve(lo, mid - 1, optLo, bestOpt);
        solve(mid + 1, hi, bestOpt, optHi);
    };
    
    for (let j = 1; j <= k; j++) {
        curr.fill(Infinity);
        solve(j, n, j - 1, n - 1);
        [prev, curr] = [curr, prev];
    }
    
    return prev[n];
};
```