# DP with Memoization | 35 Lines | O(n×m×k) | 199ms

# Intuition

This is a 2D DP problem where we track positions in both arrays and count of pairs selected. At each state, we have three choices: skip nums1[i], skip nums2[j], or take the pair. Use memoization to avoid recomputation.

# Approach

**DP State:**
- `dp(i, j, selected)` = max score selecting `selected` pairs from nums1[i..] and nums2[j..]
- Indices must be strictly increasing

**Three Choices:**
1. Skip nums1[i]: `dp(i+1, j, selected)`
2. Skip nums2[j]: `dp(i, j+1, selected)`
3. Take pair (i,j): `nums1[i]×nums2[j] + dp(i+1, j+1, selected+1)`

**Base Cases:**
- selected == k: return 0 (found solution)
- i == n or j == m: return -∞ (impossible)

**Pruning:**
- If remaining elements < pairs needed: return -∞

**Example: nums1=[1,3,2], nums2=[4,5,1], k=2**

Optimal path:
- Take (1,0): 3×4=12, selected=1
- Take (2,1): 2×5=10, selected=2
- Total: 22 ✓

# Complexity

- Time complexity: $$O(n \times m \times k)$$
  - States: n×m×k
  - Per state: O(1) with memoization
  - Overall: O(n×m×k)

- Space complexity: $$O(n \times m \times k)$$
  - Memoization array: O(n×m×k)
  - Recursion stack: O(n+m+k)
  - Overall: O(n×m×k)

# Code
```typescript []
const maxScore = (nums1: number[], nums2: number[], k: number): number => {
    const nums1Length = nums1.length;
    const nums2Length = nums2.length;
    const memoization: (number | null)[] = Array(nums1Length * nums2Length * k).fill(null);
    
    const IMPOSSIBLE = -1e15;
    
    const computeMaxScore = (index1: number, index2: number, pairsSelected: number): number => {
        if (pairsSelected === k) return 0;
        
        if (index1 === nums1Length || index2 === nums2Length) return IMPOSSIBLE;
        
        const remainingInNums1 = nums1Length - index1;
        const remainingInNums2 = nums2Length - index2;
        const remainingPossiblePairs = Math.min(remainingInNums1, remainingInNums2);
        const pairsStillNeeded = k - pairsSelected;
        if (remainingPossiblePairs < pairsStillNeeded) return IMPOSSIBLE;
        
        const memoKey = index1 * nums2Length * k + index2 * k + pairsSelected;
        if (memoization[memoKey] !== null) return memoization[memoKey];
        
        return memoization[memoKey] = Math.max(
            computeMaxScore(index1 + 1, index2, pairsSelected),
            computeMaxScore(index1, index2 + 1, pairsSelected),
            nums1[index1] * nums2[index2] + computeMaxScore(index1 + 1, index2 + 1, pairsSelected + 1)
        );
    };
    
    return computeMaxScore(0, 0, 0);
};
```