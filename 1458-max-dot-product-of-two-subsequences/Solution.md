# Space-Optimized DP | 28 Lines | O(n×m) | 10ms

# Intuition

Maximum dot product between subsequences is a DP problem where we decide for each pair of elements whether to include both, skip one, or skip both. The key insight: when including a pair, we can either extend a previous subsequence or start fresh if the previous sum is negative.

# Approach

**DP State:**
- `dp[i][j]` = max dot product using elements up to `nums1[j]` and `nums2[i]`

**Transitions:**
1. Include both `nums1[j]` and `nums2[i]`:
   - If `dp[i-1][j-1] > 0`: extend previous subsequence
   - Else: start fresh with just current pair
   - Value: `max(0, dp[i-1][j-1]) + nums1[j] × nums2[i]`
2. Skip `nums1[j]`: `dp[i][j-1]`
3. Skip `nums2[i]`: `dp[i-1][j]`

Take maximum of all three options.

**Space Optimization:**
- Only need current and previous row
- Use two 1D arrays instead of 2D matrix

**Example: nums1=[2,1,-2,5], nums2=[3,0,-6]**

Initial row (nums2[0]=3):
- [2×3=6, max(6,1×3)=6, max(6,-2×3)=6, max(6,5×3)=15]

Row for nums2[1]=0:
- Include (2,0): max(0,0)+0=0 vs skip: 6 → 6
- Include (1,0): max(0,6)+0=0 vs skip: 6 → 6
- Include (-2,0): max(0,6)+0=0 vs skip: 6 → 6
- Include (5,0): max(0,6)+0=0 vs skip: 15 → 15

Row for nums2[2]=-6:
- Eventually reaches: include (5,-6)=max(0,6)+-30=-24 vs include (-2,-6)=max(0,6)+12=18
- Result: 18 ✓

# Complexity

- Time complexity: $$O(n \times m)$$
  - n = length of nums1, m = length of nums2
  - Fill matrix of size n×m
  - Constant work per cell

- Space complexity: $$O(n)$$
  - Two arrays of size n (current and previous row)
  - No full 2D matrix needed

# Code
```typescript []
const maxDotProduct = (nums1: number[], nums2: number[]): number => {
    const length1 = nums1.length;
    const length2 = nums2.length;
    
    let previousRow = [nums1[0] * nums2[0]];
    for (let j = 1; j < length1; j++) {
        previousRow.push(Math.max(previousRow[j - 1], nums1[j] * nums2[0]));
    }
    
    for (let i = 1; i < length2; i++) {
        const currentRow = [Math.max(previousRow[0], nums1[0] * nums2[i])];
        
        for (let j = 1; j < length1; j++) {
            const currentProduct = nums1[j] * nums2[i];
            
            const includeBoth = Math.max(0, previousRow[j - 1]) + currentProduct;
            const skipNum1 = currentRow[j - 1];
            const skipNum2 = previousRow[j];
            
            currentRow.push(Math.max(includeBoth, skipNum1, skipNum2));
        }
        
        previousRow = currentRow;
    }
    
    return previousRow[length1 - 1];
};
```