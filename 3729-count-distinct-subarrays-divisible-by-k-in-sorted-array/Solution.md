# Two-Phase Group Processing | 42 Lines | O(n) | 56ms

# Intuition
We need to count distinct subarrays with sum divisible by k. The array is sorted and non-descending, meaning equal consecutive elements form groups. The key insight is using prefix sum modulo k: if two positions have the same prefix sum mod k, the subarray between them has sum divisible by k. However, we must avoid counting duplicate subarrays from identical groups.

# Approach
**Group-Based Prefix Sum with Two-Phase Processing:**
- Process the array in groups of consecutive equal elements
- For each group, use a two-phase approach to count subarrays correctly
- Phase 1: Count good subarrays ending in current group (read-only on prefix map)
- Phase 2: Update prefix sum map with current group's sums

**Step-by-Step Process:**

1. **Initialize Tracking:**
   - `prefixSumModCounts`: Map storing count of each prefix sum modulo k seen so far
   - Start with `{0: 1}` representing empty subarray (sum 0)
   - `currentPrefixSumMod`: Running prefix sum mod k
   - `goodSubarrayCount`: Result counter

2. **Identify Groups:**
   - Process array by groups of consecutive equal elements
   - Example: [2,2,2,3,3] → groups: [2,2,2] and [3,3]
   - This matters because identical subarrays from same group should count as one

3. **Phase 1: Count Good Subarrays (Read Phase):**
   - For each element in current group:
     - Calculate temporary prefix sum: `tempPrefixSumMod = (prev + element) % k`
     - Look up how many times this remainder appeared before
     - Add that count to result (these form valid subarrays)
   - **Critical:** Use temporary variable, don't update main prefix sum yet
   - **Why:** Prevents counting duplicate subarrays within same group

4. **Phase 2: Update Prefix Map (Write Phase):**
   - Process the same group again from the start
   - For each element:
     - Update actual prefix sum: `currentPrefixSumMod = (prev + element) % k`
     - Record this remainder in the map for future lookups
     - Increment count for this remainder
   - **Why separate phase:** Ensures subarrays starting in this group can be counted by future groups

**Why Two Phases Are Necessary:**

**Problem with Single Phase:**
- If we update the map while counting, we might count duplicate subarrays
- Example: [2,2,2] with k=6
  - Position 0: sum=2, check map (find nothing), add to map {2:1}
  - Position 1: sum=4, check map (find nothing), add to map {4:1}
  - Position 2: sum=6≡0, check map (find {0:1}), count 1, add to map {0:2}
  - But [2,2,2] starting at positions 0,1,2 are identical! Should count as 1, not separately

**Solution with Two Phases:**
- Phase 1 reads from map without modifying it
- Subarrays ending in current group are counted based on previous groups only
- Phase 2 updates map for future groups
- This prevents within-group duplicates while enabling between-group counting

**Example Walkthrough (nums = [2,2,2,2,2,2], k = 6):**

Initial: map = {0:1}, prefixSum = 0

**Group [2,2,2,2,2,2]:**

**Phase 1 (Count):**
- i=0: temp=2, map[2]=0 → count += 0
- i=1: temp=4, map[4]=0 → count += 0
- i=2: temp=0, map[0]=1 → count += 1 (subarray [2,2,2])
- i=3: temp=2, map[2]=0 → count += 0
- i=4: temp=4, map[4]=0 → count += 0
- i=5: temp=0, map[0]=1 → count += 1 (subarray [2,2,2,2,2,2])

**Phase 2 (Update):**
- Update map: {0:3, 2:2, 4:2}

**Result:** 2 distinct subarrays ✓

**Why This Works:**

**Distinct Counting:**
- Groups of identical elements naturally deduplicate
- Within a group, we only count based on previous positions (Phase 1)
- Each unique subarray value is counted exactly once

**Correctness:**
- Prefix sum technique correctly identifies subarrays with sum ≡ 0 (mod k)
- Two-phase ensures no double counting
- Map accumulates all valid starting points for future groups

**Edge Cases:**
- Single element groups: Phases still work correctly
- All elements identical: Counted once per distinct length
- No good subarrays: Returns 0
- Multiple groups: Each group contributes independently

# Complexity
- Time complexity: $$O(n)$$ - each element processed exactly twice (once per phase)
- Space complexity: $$O(k)$$ - map stores at most k different remainders

# Code
```typescript
const numGoodSubarrays = (nums: number[], k: number): number => {
    const prefixSumModCounts = new Map<number, number>();
    const arrayLength = nums.length;
    
    prefixSumModCounts.set(0, 1);
    
    let currentPrefixSumMod = 0;
    let goodSubarrayCount = 0;
    let startIndex = 0;
    
    while (startIndex < arrayLength) {
        const currentValue = nums[startIndex];
        let groupEndIndex = startIndex;
        
        let tempPrefixSumMod = currentPrefixSumMod;
        
        while (groupEndIndex < arrayLength && nums[groupEndIndex] === currentValue) {
            tempPrefixSumMod = (tempPrefixSumMod + nums[groupEndIndex]) % k;
            
            goodSubarrayCount += prefixSumModCounts.get(tempPrefixSumMod) || 0;
            groupEndIndex++;
        }

        groupEndIndex = startIndex;
        
        while (startIndex < arrayLength && nums[groupEndIndex] === nums[startIndex]) {
            currentPrefixSumMod = (currentPrefixSumMod + nums[groupEndIndex]) % k;
            
            prefixSumModCounts.set(
                currentPrefixSumMod, 
                (prefixSumModCounts.get(currentPrefixSumMod) || 0) + 1
            );
            
            startIndex++;
        }
    }

    return goodSubarrayCount;
};
```