# Set-Based Sequential Search | 15 Lines | O(n) | 0ms

# Intuition
We need to find the smallest positive multiple of k that doesn't appear in nums. By checking multiples sequentially (k, 2k, 3k, ...), we can find the first missing one. Using a Set for O(1) lookup makes this efficient.

# Approach
**Set Construction with Sequential Multiple Checking:**
- Convert array to Set for constant-time membership testing
- Check multiples of k in increasing order until we find one not in the Set
- The answer is guaranteed to be within a bounded range

**Step-by-Step Process:**

1. **Build Set from Array:**
   - Create `numSet = new Set(nums)` for O(1) lookup
   - This preprocessing step enables fast checking of each candidate
   - Trade O(n) space for O(1) per query

2. **Determine Search Bound:**
   - By pigeonhole principle: if we check the first n+1 multiples of k
   - At least one must be missing (since array has only n elements)
   - Therefore, search up to k × (n+1)

3. **Sequential Multiple Checking:**
   - For multiplier from 1 to n+1:
     - Calculate candidate = k × multiplier
     - Check if candidate exists in numSet
     - If not found, return candidate immediately (first missing)

4. **Return Result:**
   - The loop will always find a missing multiple within n+1 iterations
   - Fallback return (after loop) is theoretically unreachable

**Why This Works:**

**Pigeonhole Principle:**
- Array has n elements
- First n+1 multiples of k: {k, 2k, 3k, ..., (n+1)k}
- At most n of these can be in the array
- Therefore, at least 1 must be missing
- We find the first (smallest) missing one

**Correctness:**
- Sequential checking ensures we find the smallest missing multiple
- Set lookup guarantees we correctly identify presence/absence
- No multiple smaller than the result can be missing (by construction)

**Example Walkthrough (nums = [8,2,3,4,6], k = 2):**

- numSet = {8, 2, 3, 4, 6}
- n = 5

**Check multiples:**
- multiplier=1: candidate=2, numSet.has(2)=true ✗
- multiplier=2: candidate=4, numSet.has(4)=true ✗
- multiplier=3: candidate=6, numSet.has(6)=true ✗
- multiplier=4: candidate=8, numSet.has(8)=true ✗
- multiplier=5: candidate=10, numSet.has(10)=false ✓

**Result:** 10 ✓

**Example 2 (nums = [1,4,7,10,15], k = 5):**

- numSet = {1, 4, 7, 10, 15}
- multiplier=1: candidate=5, numSet.has(5)=false ✓

**Result:** 5 ✓

**Optimization Rationale:**

**Why Set over Array:**
- Array.includes(): O(n) per check
- Set.has(): O(1) per check
- Total: O(n²) vs O(n) for worst case

**Why Not Sort:**
- Sorting: O(n log n)
- Our approach: O(n) preprocessing + O(n) search = O(n)
- Simpler logic, better complexity

**Edge Cases:**

**All multiples present:**
- First n multiples in array
- Answer is (n+1) × k

**First multiple missing:**
- Answer is k immediately (first iteration)

**Large gaps:**
- Still finds correct answer sequentially
- Example: nums=[10,20,30], k=10 → answer=10

**k=1:**
- Finds smallest missing positive integer
- Classic "first missing positive" variant

**Maximum Iterations:**
- Worst case: n+1 iterations
- Happens when first n multiples all present
- Still O(n) overall

**Alternative Approaches:**

**Sorted Array with Binary Gap Finding:**
- Sort array: O(n log n)
- Find gaps between consecutive multiples
- More complex, worse complexity

**Mathematical:**
- XOR or sum-based approaches don't work well
- Multiple can be arbitrarily large
- Sequential checking is most straightforward

# Complexity
- Time complexity: $$O(n)$$ - O(n) to build Set + O(n) worst-case iterations with O(1) lookup
- Space complexity: $$O(n)$$ for the Set

# Code
```typescript
const missingMultiple = (nums: number[], k: number): number => {
    const numSet = new Set(nums);
    
    for (let multiplier = 1; multiplier <= nums.length + 1; multiplier++) {
        const candidate = k * multiplier;
        
        if (!numSet.has(candidate)) {
            return candidate;
        }
    }
    
    return k * (nums.length + 1);
};
```