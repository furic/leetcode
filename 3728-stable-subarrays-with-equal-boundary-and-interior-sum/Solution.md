# Prefix Sum with HashMap | 24 Lines | O(n) | 407ms

# Intuition
A stable subarray requires first element = last element = sum of middle elements. If we denote the subarray as [l..r], then capacity[l] = capacity[r] = sum(l+1 to r-1). By rearranging, we can use prefix sums to efficiently find matching pairs: if capacity[l] = capacity[r] and the middle sum equals capacity[l], we have a stable subarray.

# Approach
**Prefix Sum with Two-Pointer Hash Matching:**
- Build prefix sums to enable O(1) range sum queries
- For each potential right endpoint r, find all valid left endpoints l
- Use a hash map to store and match (value, prefix_sum) pairs
- The key insight: capacity[l] = sum(l+1 to r-1) can be rewritten using prefix sums

**Step-by-Step Process:**

1. **Build Prefix Sum Array:**
   - `prefixSums[i]` = sum of capacity[0..i]
   - Enables range sum query: sum(l+1 to r-1) = prefixSums[r-1] - prefixSums[l]

2. **Core Constraint Transformation:**
   - Stable subarray: capacity[l] = capacity[r] = sum(l+1 to r-1)
   - Using prefix sums: capacity[l] = prefixSums[r-1] - prefixSums[l]
   - Rearranging: capacity[l] + prefixSums[l] = prefixSums[r-1]
   - Also: capacity[r] = prefixSums[r-1] - prefixSums[l]
   
   **Combined constraint:**
   - capacity[l] = capacity[r] (values match)
   - capacity[l] + prefixSums[l] = prefixSums[r-1] (sum constraint)

3. **Hash Map Strategy:**
   - Key: `"value,prefix_sum"` representing (capacity[i], prefixSums[i])
   - Value: count of positions with this key
   - For position i to be valid left endpoint for right endpoint j:
     - Need: capacity[i] = capacity[j] AND capacity[i] + prefixSums[i] = prefixSums[j-1]

4. **Algorithm Flow:**
   - Process array from left to right with index j as potential right endpoint (j ≥ 2)
   - For each j:
     
     **Add Previous Position to Map:**
     - i = j - 2 (must maintain minimum length 3)
     - Store key `"capacity[i],prefixSums[i]"` in map
     - This makes position i available as left endpoint for future right endpoints
     
     **Find Matching Left Endpoints:**
     - For right endpoint j, we need capacity[l] = capacity[j]
     - And: capacity[l] + prefixSums[l] = prefixSums[j-1]
     - Rearranging: prefixSums[l] = prefixSums[j-1] - capacity[j]
     - Look up key `"capacity[j], prefixSums[j-1] - capacity[j]"` in map
     - Add count to result

5. **Why j-2 for Map Updates:**
   - Minimum subarray length is 3: [l, l+1, r]
   - If j is right endpoint, valid left endpoints are at most j-2
   - This ensures at least one element in the middle

**Mathematical Verification:**

For subarray [l..r] to be stable:
- capacity[l] = capacity[r] ✓ (checked by key)
- capacity[l] = sum(l+1 to r-1)
- capacity[l] = prefixSums[r-1] - prefixSums[l]
- capacity[l] + prefixSums[l] = prefixSums[r-1] ✓ (encoded in key)

**Example Walkthrough (capacity = [9,3,3,3,9]):**

- prefixSums = [9, 12, 15, 18, 27]
- map = {}

**j=2 (value=3):**
- Add i=0: key="9,9", map={"9,9":1}
- Target: "3," + (12-3) = "3,9", map["3,9"]=0 → count += 0

**j=3 (value=3):**
- Add i=1: key="3,12", map={"9,9":1, "3,12":1}
- Target: "3," + (15-3) = "3,12", map["3,12"]=1 → count += 1 ✓ (subarray [1,2,3])

**j=4 (value=9):**
- Add i=2: key="3,15", map={"9,9":1, "3,12":1, "3,15":1}
- Target: "9," + (18-9) = "9,9", map["9,9"]=1 → count += 1 ✓ (subarray [0,1,2,3,4])

**Result:** 2 ✓

**Why This Works:**

**Correctness:**
- Prefix sum transformation captures the constraint exactly
- Hash map enables O(1) lookup of matching positions
- Processing order ensures minimum length constraint

**Efficiency:**
- Single pass through array
- Constant time operations per position
- Space proportional to unique (value, prefix) pairs

**Edge Cases:**
- Length < 3: Handled by starting j from 2
- Negative numbers: Work correctly with prefix sums
- All same values: Correctly counts all valid subarrays
- No stable subarrays: Returns 0

# Complexity
- Time complexity: $$O(n)$$ - single pass with O(1) operations per element
- Space complexity: $$O(n)$$ - prefix sum array and hash map

# Code
```typescript
const countStableSubarrays = (capacity: number[]): number => {
    const n = capacity.length;

    const prefixSums = new Array<number>(n);
    prefixSums[0] = capacity[0];
    for (let i = 1; i < n; i++) {
        prefixSums[i] = prefixSums[i - 1] + capacity[i];
    }

    const map = new Map<string, number>();

    let ans = 0;

    for (let j = 2; j < n; j++) {
        const i = j - 2;
        const key = `${capacity[i]},${prefixSums[i]}`;
        map.set(key, (map.get(key) || 0) + 1);

        const targetPrefixSum = prefixSums[j - 1] - capacity[j];
        const targetKey = `${capacity[j]},${targetPrefixSum}`;
        ans += map.get(targetKey) || 0;
    }

    return ans;
};
```