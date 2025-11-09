# Prefix Sum with Cumulative Count | 40 Lines | O(n) | 2ms

# Intuition
To find subarrays where target appears more than half the time, we can transform the problem: treat target as +1 and non-target as -1. Then we need subarrays with positive sum (more +1s than -1s). Using prefix sums, a subarray [i,j] has positive sum if prefixSum[j] > prefixSum[i-1]. We can count these efficiently using cumulative frequency arrays.

# Approach
**Transformed Prefix Sum with Cumulative Counting:**
- Transform array: target → +1, others → -1
- Build prefix sums and track frequencies
- For each position, count previous positions with smaller prefix sum
- Use cumulative count array for O(1) queries

**Step-by-Step Process:**

1. **Setup and Initialization:**
   - `indexOffset = arrayLength + 1` to avoid negative array indices
   - Prefix sums range from -(n+1) to (n+1), shift by offset to [0, 2n+2]
   - `currentPrefixSum = offset` (starts at 0 after transformation)
   - Initialize frequency and cumulative arrays

2. **Transform Problem:**
   - Original: count target occurrences > subarray length / 2
   - Transformed: assign +1 to target, -1 to non-target
   - Subarray has majority ⟺ sum > 0
   - Using prefix sums: sum(i, j) = prefixSum[j] - prefixSum[i-1]
   - Positive sum ⟺ prefixSum[j] > prefixSum[i-1]

3. **Process Each Element:**
   - Update prefix sum: add +1 or -1 based on element
   - Increment frequency: `prefixSumFrequency[currentPrefixSum]++`
   
   **Update cumulative count:**
   - `cumulativeCountLessOrEqual[sum] = count of prefix sums ≤ sum`
   - Formula: `cumulativeCountLessOrEqual[s] = cumulativeCountLessOrEqual[s-1] + frequency[s]`
   - This gives us O(1) range queries

4. **Count Valid Subarrays:**
   - For current position j with prefixSum[j]:
   - Need all previous positions i where prefixSum[i-1] < prefixSum[j]
   - Count = `cumulativeCountLessOrEqual[currentPrefixSum - 1]`
   - This counts all subarrays ending at j with positive sum

5. **Accumulate Result:**
   - Add count for each position to total
   - Return final count

**Why This Works:**

**Transformation Correctness:**
- Target appears k times in length n subarray
- Majority: k > n/2 ⟺ k > (n-k) ⟺ 2k > n ⟺ k - (n-k) > 0
- After transform: sum = k×(+1) + (n-k)×(-1) = 2k - n > 0 ✓

**Prefix Sum Property:**
- subarray[i..j] sum = prefixSum[j] - prefixSum[i-1]
- Positive sum: prefixSum[j] > prefixSum[i-1]

**Cumulative Count Efficiency:**
- Without: O(n) to count previous smaller sums → O(n²) total
- With: O(1) query using precomputed cumulative → O(n) total

**Example Walkthrough (nums = [1,2,2,3], target = 2):**

**Transform:** [1,2,2,3] → [-1,+1,+1,-1]

**Process with offset=5:**

**i=0, element=1 (non-target):**
- prefixSum: 5 + (-1) = 4
- frequency[4] = 1
- cumulative[4] = cumulative[3] + frequency[4] = 0 + 1 = 1
- count += cumulative[3] = 0

**i=1, element=2 (target):**
- prefixSum: 4 + 1 = 5
- frequency[5] = 2 (was 1 initially)
- cumulative[5] = cumulative[4] + frequency[5] = 1 + 2 = 3
- count += cumulative[4] = 1 (subarray [2])

**i=2, element=2 (target):**
- prefixSum: 5 + 1 = 6
- frequency[6] = 1
- cumulative[6] = cumulative[5] + frequency[6] = 3 + 1 = 4
- count += cumulative[5] = 3 (subarrays [2], [2,2], [1,2,2])

**i=3, element=3 (non-target):**
- prefixSum: 6 + (-1) = 5
- frequency[5] = 3
- cumulative[5] = cumulative[4] + frequency[5] = 1 + 3 = 4
- count += cumulative[4] = 1 (subarray [2,2,3])

**Total:** 0 + 1 + 3 + 1 = 5 ✓

**Key Insights:**

**Why Offset:**
- Prefix sums can be negative (more non-targets than targets)
- Array indices must be non-negative
- Offset shifts all values to valid range
- Size 2n+2 handles range [-(n+1), n+1]

**Cumulative Array:**
- cumulative[s] = |{prefix sums ≤ s}|
- Enables: count of sums in range [a, b] = cumulative[b] - cumulative[a-1]
- Our query: sums < currentSum = cumulative[currentSum - 1]

**Why < not ≤:**
- Need strict inequality: prefixSum[j] > prefixSum[i-1]
- So query for sums ≤ currentSum - 1

**Edge Cases:**

**Target not in array:**
- All elements contribute -1
- Prefix sum always decreasing
- No position has smaller previous sum
- Result: 0 ✓

**All elements are target:**
- All elements contribute +1
- Prefix sum always increasing
- Every position counts all previous positions
- Result: 1+2+3+...+n = n(n+1)/2 ✓

**Single element:**
- If target: count = 1
- If non-target: count = 0

**Alternating pattern:**
- Prefix sum oscillates
- Some subarrays valid, some not

**Alternative Approaches:**

**Brute Force:**
```typescript
// Check every subarray
for (let i = 0; i < n; i++)
    for (let j = i; j < n; j++)
        if (countTarget(i,j) > (j-i+1)/2)
            count++;
```
- O(n³) time: two loops + count
- Our approach: O(n)

**Sorted prefix sums:**
- Sort prefix sums, count inversions
- O(n log n) time
- Our approach maintains order: O(n)

# Complexity
- Time complexity: $$O(n)$$ - single pass with O(1) operations per element
- Space complexity: $$O(n)$$ - arrays of size 2n+2

# Code
```typescript
const countMajoritySubarrays = (nums: number[], target: number): number => {
    const arrayLength = nums.length;
    const indexOffset = arrayLength + 1;
    
    let currentPrefixSum = indexOffset;
    let validSubarrayCount = 0;
    
    const prefixSumFrequency = new Array(2 * arrayLength + 2).fill(0);
    const cumulativeCountLessOrEqual = new Array(2 * arrayLength + 2).fill(0);
    
    prefixSumFrequency[currentPrefixSum] = 1;
    cumulativeCountLessOrEqual[currentPrefixSum] = 1;
    
    for (const currentElement of nums) {
        currentPrefixSum += (currentElement === target ? 1 : -1);
        
        prefixSumFrequency[currentPrefixSum]++;
        
        cumulativeCountLessOrEqual[currentPrefixSum] = 
            cumulativeCountLessOrEqual[currentPrefixSum - 1] + 
            prefixSumFrequency[currentPrefixSum];
        
        validSubarrayCount += cumulativeCountLessOrEqual[currentPrefixSum - 1];
    }
    
    return validSubarrayCount;
};
```