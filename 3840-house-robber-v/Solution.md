# DP with Color Constraint | 20 Lines | O(n) | 11ms

# Intuition

Classic house robber with twist: can't rob adjacent houses of same color. Use DP where each house has two choices: skip or rob (with color-based adjacency constraint).

# Approach

**DP Definition:**
- `dp[i]` = max money robbing houses [0..i]

**Transitions:**
For each house i:
1. **Skip**: dp[i] = dp[i-1]
2. **Rob**: 
   - If colors[i] == colors[i-1]: dp[i] = dp[i-2] + nums[i] (can't rob i-1)
   - If colors[i] != colors[i-1]: dp[i] = dp[i-1] + nums[i] (can rob i-1)

Take maximum of skip and rob options.

**Why This Works:**
- Same color: enforces traditional adjacency constraint
- Different colors: allows robbing consecutive houses
- DP captures optimal choices at each position

**Example: nums=[1,4,3,5], colors=[1,1,2,2]**

DP:
- i=0: dp[0]=1
- i=1: colors same, rob=0+4=4, skip=1 → dp[1]=4
- i=2: colors differ, rob=4+3=7, skip=4 → dp[2]=7
- i=3: colors same, rob=4+5=9, skip=7 → dp[3]=9

Result: 9 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through houses
  - Constant work per house
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - DP array: O(n)
  - Can optimize to O(1) with rolling variables

# Code
```typescript []
const rob = (nums: number[], colors: number[]): number => {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    
    const dp: number[] = new Array(n);
    dp[0] = nums[0];
    
    for (let i = 1; i < n; i++) {
        const skip = dp[i - 1];
        
        let rob;
        if (colors[i] === colors[i - 1]) {
            rob = (i >= 2 ? dp[i - 2] : 0) + nums[i];
        } else {
            rob = dp[i - 1] + nums[i];
        }
        
        dp[i] = Math.max(skip, rob);
    }
    
    return dp[n - 1];
};
```