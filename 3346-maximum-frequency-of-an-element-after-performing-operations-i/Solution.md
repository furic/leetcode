# Range Query with Prefix Sum | 40 Lines | O(n + M) | 22ms

# Intuition
To maximize the frequency of any element, we should pick a target value and adjust nearby numbers to match it. Each number can be adjusted by at most k in either direction, so numbers within distance k of the target can be transformed to the target. We need to find which target value yields the highest achievable frequency.

# Approach
**Range Counting with Prefix Sums:**
- For each possible target value, count how many numbers can be adjusted to reach it
- Use prefix sums to efficiently query counts in value ranges
- Select operations greedily to maximize frequency of the best target

**Step-by-Step Process:**

1. **Build Frequency Array:**
   - Create array tracking count of each value in nums
   - Size = maxValue + k + 1 (to accommodate all possible adjusted values)
   - This allows O(1) lookup of existing counts

2. **Build Prefix Sum Array:**
   - Compute cumulative sum: `prefixSum[i]` = total count of values from 0 to i
   - Enables O(1) range queries: count of values in [L, R] = prefixSum[R] - prefixSum[L-1]
   - Essential for efficiently counting adjustable numbers

3. **Try Each Possible Target Value:**
   - Iterate through all values from 0 to maxValue + k
   - For each targetValue, calculate achievable frequency

4. **Calculate Adjustable Range:**
   - Numbers in range [targetValue - k, targetValue + k] can be adjusted to targetValue
   - `leftBound = max(0, targetValue - k)` (lower bound of adjustable range)
   - `rightBound = min(rangeSize - 1, targetValue + k)` (upper bound)
   
5. **Count Numbers in Range:**
   - Use prefix sum for O(1) range query:
   - `totalInRange = prefixSum[rightBound] - prefixSum[leftBound - 1]`
   - This includes the target value itself (if it exists)

6. **Calculate Achievable Frequency:**
   - `adjacentCount = totalInRange - frequency[targetValue]`
     - These are numbers that need adjustment (within range but not already at target)
   - `achievableFrequency = frequency[targetValue] + min(numOperations, adjacentCount)`
     - Start with existing count at target
     - Add up to numOperations adjustments from adjacent values
     - Can't adjust more numbers than are available in range

7. **Track Maximum:**
   - Update global maximum across all target values

**Why This Works:**
- Any number within distance k can be adjusted to the target
- Greedily using operations on the target that has most adjustable neighbors is optimal
- We try all possible targets, so we find the global optimum

**Example Walkthrough (nums = [1,4,5], k = 1, numOperations = 2):**
- frequency = [0, 1, 0, 0, 1, 1, 0]
- Target = 4:
  - Range [3, 5] can be adjusted to 4
  - totalInRange = frequency[3] + frequency[4] + frequency[5] = 0 + 1 + 1 = 2
  - adjacentCount = 2 - 1 = 1 (only nums[2]=5 needs adjustment)
  - achievableFrequency = 1 + min(2, 1) = 2
- Target = 5:
  - Range [4, 6] can be adjusted to 5
  - totalInRange = frequency[4] + frequency[5] = 1 + 1 = 2
  - adjacentCount = 2 - 1 = 1
  - achievableFrequency = 1 + min(2, 1) = 2

**Optimization:**
- Skip targets with frequency 0 and numOperations = 0 (can't achieve anything)
- Prefix sums avoid O(n) counting for each target

# Complexity
- Time complexity: $$O(n + M)$$ where n = nums.length, M = maxValue + k (building arrays + trying targets)
- Space complexity: $$O(M)$$ for frequency and prefix sum arrays

# Code
```typescript
const maxFrequency = (nums: number[], k: number, numOperations: number): number => {
    const maxValue = Math.max(...nums);
    const rangeSize = maxValue + k + 1;
    
    const frequency: number[] = new Array(rangeSize).fill(0);
    for (const num of nums) {
        frequency[num]++;
    }
    
    const prefixSum: number[] = new Array(rangeSize).fill(0);
    prefixSum[0] = frequency[0];
    for (let index = 1; index < rangeSize; index++) {
        prefixSum[index] = prefixSum[index - 1] + frequency[index];
    }
    
    let maxFrequency = 0;
    
    for (let targetValue = 0; targetValue < rangeSize; targetValue++) {
        if (frequency[targetValue] === 0 && numOperations === 0) {
            continue;
        }
        
        const leftBound = Math.max(0, targetValue - k);
        const rightBound = Math.min(rangeSize - 1, targetValue + k);
        
        const totalInRange = prefixSum[rightBound] - (leftBound > 0 ? prefixSum[leftBound - 1] : 0);
        
        const adjacentCount = totalInRange - frequency[targetValue];
        
        const achievableFrequency = frequency[targetValue] + Math.min(numOperations, adjacentCount);
        
        maxFrequency = Math.max(maxFrequency, achievableFrequency);
    }
    
    return maxFrequency;
};
```