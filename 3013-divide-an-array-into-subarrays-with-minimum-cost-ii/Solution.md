# Sliding Window + Fenwick Tree | 85 Lines | O(n log n) | 212ms

# Intuition

First split is fixed at index 0. We need k-1 additional splits within a constrained range (distance ≤ dist). Use sliding window to maintain valid range, and Fenwick Tree to efficiently find k-1 smallest values in that range.

# Approach

**Key Observations:**
- First subarray cost = nums[0] (fixed)
- Need to choose k-1 split positions from indices [1, n-1]
- Constraint: (k-1)th split - 1st split ≤ dist
- To minimize: find k-1 smallest values in valid sliding window

**Fenwick Tree (BIT):**
- Coordinate compression: map values to ranks
- Two trees: one for sum, one for count
- Binary search in tree to find sum of k-1 smallest

**Sliding Window:**
- For each position as potential (k-1)th split:
  - Maintain window of size at most dist+1
  - Query Fenwick Tree for k-1 smallest in window
  - Track minimum cost

**Algorithm:**
1. Compress values to ranks for Fenwick Tree
2. Slide window from left to right:
   - Add current element to Fenwick Tree
   - Remove elements outside dist constraint
   - Query k-1 smallest values in window
3. Return nums[0] + min(k-1 smallest sums)

**Example: nums=[1,3,2,6,4,2], k=3, dist=3**

First cost: 1
Need 2 more splits within dist=3

Window at position 5:
- Valid range: indices [2,5] (within dist=3 of index 2)
- Values: [2,6,4,2]
- 2 smallest: 2,2
- Cost: 1+2+2=5 ✓

# Complexity

- Time complexity: $$O(n \log n)$$
  - Coordinate compression: O(n log n)
  - Sliding window: O(n)
  - Per position: Fenwick query O(log n)
  - Overall: O(n log n)

- Space complexity: $$O(n)$$
  - Fenwick Trees: O(unique values)
  - Coordinate compression: O(n)
  - Overall: O(n)

# Code
```typescript []
const minimumCost = (nums: number[], k: number, dist: number): number => {
    const arrayLength = nums.length;
    const numAdditionalSplits = k - 1;
    
    const sortedUniqueValues = Array.from(new Set(nums)).sort((a, b) => a - b);
    const numUniqueValues = sortedUniqueValues.length;
    
    const fenwickTreeSum = new Float64Array(numUniqueValues + 1);
    const fenwickTreeCount = new Int32Array(numUniqueValues + 1);
    
    const valueToRank = new Map<number, number>();
    sortedUniqueValues.forEach((value, index) => {
        valueToRank.set(value, index + 1);
    });

    const updateFenwickTree = (treeIndex: number, valueDelta: number, countDelta: number): void => {
        for (; treeIndex <= numUniqueValues; treeIndex += treeIndex & -treeIndex) {
            fenwickTreeSum[treeIndex] += valueDelta;
            fenwickTreeCount[treeIndex] += countDelta;
        }
    };

    let maxPowerOfTwo = 1;
    while ((maxPowerOfTwo << 1) <= numUniqueValues) {
        maxPowerOfTwo <<= 1;
    }
    
    let minAdditionalCost = Infinity;

    for (let windowEnd = 1; windowEnd < arrayLength; windowEnd++) {
        const currentRank = valueToRank.get(nums[windowEnd])!;
        updateFenwickTree(currentRank, nums[windowEnd], 1);
        
        if (windowEnd > dist + 1) {
            const removedValue = nums[windowEnd - dist - 1];
            const removedRank = valueToRank.get(removedValue)!;
            updateFenwickTree(removedRank, -removedValue, -1);
        }
        
        if (windowEnd >= numAdditionalSplits) {
            let searchIndex = 0;
            let cumulativeCount = 0;
            let cumulativeSum = 0;
            
            for (let powerOfTwo = maxPowerOfTwo; powerOfTwo > 0; powerOfTwo >>= 1) {
                const nextIndex = searchIndex + powerOfTwo;
                
                if (nextIndex <= numUniqueValues && 
                    cumulativeCount + fenwickTreeCount[nextIndex] < numAdditionalSplits) {
                    searchIndex = nextIndex;
                    cumulativeCount += fenwickTreeCount[searchIndex];
                    cumulativeSum += fenwickTreeSum[searchIndex];
                }
            }
            
            if (cumulativeCount < numAdditionalSplits) {
                const remainingNeeded = numAdditionalSplits - cumulativeCount;
                cumulativeSum += remainingNeeded * sortedUniqueValues[searchIndex];
            }
            
            minAdditionalCost = Math.min(minAdditionalCost, cumulativeSum);
        }
    }
    
    return nums[0] + minAdditionalCost;
};
```