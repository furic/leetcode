# Greedy Append Position | 23 Lines | O(n²) | 6ms

# Intuition
We need to transform nums1 (length n) into nums2 (length n+1). The extra element in nums2 must come from appending one element from nums1. The key insight is that we should try appending each possible index and calculate the total cost, then choose the minimum.

# Approach
**Try All Append Positions:**
- Calculate a baseline cost assuming we transform each position independently (no append)
- For each possible append index i, calculate the total cost if we append nums1[i]
- When we append position i, we need to handle three targets: nums2[i], nums2[n], and the original nums2[i]

**Step-by-Step Process:**

1. **Calculate Base Cost:**
   - If we ignore the append requirement, cost to transform position i is |nums1[i] - nums2[i]|
   - Sum this for all positions: `baseCost = Σ|nums1[i] - nums2[i]|`
   - This represents the minimum cost if append were free

2. **Try Each Append Position:**
   - For each index i from 0 to n-1, consider appending nums1[i]
   - This creates a copy of nums1[i] at position n

3. **Cost Calculation When Appending Index i:**
   
   **Start with Base Cost:**
   - Begin with the cost of transforming all positions independently
   
   **Remove Original Cost at Position i:**
   - We no longer transform nums1[i] → nums2[i] directly at position i
   - Subtract: `|nums1[i] - nums2[i]|`
   
   **Add Append Cost:**
   - Append operation costs 1
   - After appending, we have nums1[i] at position n
   - We need to reach three targets:
     - Position i should become nums2[i]
     - Position n should become nums2[n]
     - But they both start at nums1[i] (the appended value)
   
   **Key Insight - Shared Transformation:**
   - Both positions (i and n) start at the same value (nums1[i] after append)
   - To minimize cost, we transform to an intermediate value then branch
   - Optimal strategy: transform to the median of {nums1[i], nums2[i], nums2[n]}
   - But simpler: the total distance is maxVal - minVal where max/min are over these 3 values
   - This accounts for reaching both targets from the common starting point

4. **Formula for Append Cost at Position i:**
   - `cost = baseCost - |nums1[i] - nums2[i]| + 1 + (max - min)`
   - Where max/min are over {nums1[i], nums2[i], nums2[n]}

5. **Track Minimum:**
   - Try all n positions and return the minimum cost found

**Why This Works:**

**Three-Value Distance:**
- When we have three values on a line and need to reach two targets from one starting point
- The minimum cost is to find the "middle" value and transform through it
- Total cost = (max of three) - (min of three)
- This covers: moving to the middle, then splitting to reach both targets

**Example Walkthrough (nums1 = [2,8], nums2 = [1,7,3]):**

- baseCost = |2-1| + |8-7| = 1 + 1 = 2

**Try appending i=0 (value=2):**
- Remove cost at i=0: 2 - 1 = 1
- Three values: {2, 1, 3} → max=3, min=1
- Append cost: 1 + (3-1) = 3
- Total: 1 + 3 = 4 ✓

**Try appending i=1 (value=8):**
- Remove cost at i=1: 2 - 1 = 1
- Three values: {8, 7, 3} → max=8, min=3
- Append cost: 1 + (8-3) = 6
- Total: 1 + 6 = 7

- Minimum: 4

**Why Not Other Strategies:**
- Can't avoid append (nums2 has one more element)
- Must choose exactly one position to append
- Greedy local choices don't work (need to consider global impact)

# Complexity
- Time complexity: $$O(n^2)$$ - for each of n positions, we recalculate cost which involves O(n) operations for base cost (though this could be optimized to O(n) by precomputing)
- Space complexity: $$O(1)$$ - only using a few variables

# Code
```typescript
function minOperations(nums1: number[], nums2: number[]): number {
    const n = nums1.length;
    const travenior = [nums1, nums2];
    
    let baseCost = 0;
    for (let i = 0; i < n; i++) {
        baseCost += Math.abs(nums1[i] - nums2[i]);
    }
    
    let minCost = Infinity;
    
    for (let i = 0; i < n; i++) {
        let cost = baseCost;
        
        cost -= Math.abs(nums1[i] - nums2[i]);
        
        const maxVal = Math.max(nums1[i], nums2[i], nums2[n]);
        const minVal = Math.min(nums1[i], nums2[i], nums2[n]);
        cost += 1 + (maxVal - minVal);
        
        minCost = Math.min(minCost, cost);
    }
    
    return minCost;
}
```