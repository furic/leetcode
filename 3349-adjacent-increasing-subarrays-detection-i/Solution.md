# Sliding Window Segment Tracking | 24 Lines | O(n) | 51ms

# Intuition
We need to find two adjacent strictly increasing subarrays of length k. Instead of checking every possible pair of positions, we can track the lengths of increasing segments as we scan through the array, checking if any configuration satisfies our requirements.

# Approach
**Segment Length Tracking:**
- Maintain lengths of the current and previous strictly increasing segments
- As we scan, check two scenarios where two k-length increasing subarrays can be adjacent
- Use a single pass to avoid redundant position checks

**Step-by-Step Process:**

1. **Initialize Tracking Variables:**
   - `previousSegmentLength`: Length of the last completed increasing segment
   - `currentSegmentLength`: Length of the ongoing increasing segment (starts at 1)

2. **Scan Through Array:**
   - For each element, check if it extends the current increasing segment
   - If `nums[i-1] < nums[i]`: increment `currentSegmentLength`
   - If `nums[i-1] >= nums[i]`: current segment breaks
     - Save current length to `previousSegmentLength`
     - Reset `currentSegmentLength` to 1 (start new segment)

3. **Check Two Valid Scenarios:**
   
   **Scenario 1: Two subarrays within one long segment**
   - If `currentSegmentLength >= 2k`, the segment contains at least 2k consecutive increasing elements
   - We can take any two adjacent k-length windows within this segment
   - Example: [1,2,3,4,5,6] with k=3 → [1,2,3] and [4,5,6]

   **Scenario 2: One subarray from previous segment, one from current**
   - If `previousSegmentLength >= k` AND `currentSegmentLength >= k`
   - Take the last k elements of previous segment and first k elements of current segment
   - These are adjacent by definition (current starts immediately after previous ends)
   - Example: [1,2,3,4] then [5,6,7,8] with k=3 → [2,3,4] and [5,6,7]

4. **Early Return:**
   - If either condition is met at any point, return true immediately
   - No need to continue scanning once we find a valid configuration

**Why This Works:**
- Every possible pair of adjacent k-length increasing subarrays falls into one of these two scenarios
- By tracking segment lengths, we implicitly check all valid positions
- Single pass is sufficient because we maintain rolling state of previous segment

**Edge Cases Handled:**
- Array too short: will never satisfy conditions
- No increasing segments: lengths stay at 1, conditions never met
- Multiple valid positions: first occurrence triggers early return

# Complexity
- Time complexity: $$O(n)$$ - single pass through the array
- Space complexity: $$O(1)$$ - only tracking two length variables

# Code
```typescript
const hasIncreasingSubarrays = (nums: number[], k: number): boolean => {
    let previousSegmentLength = 0;
    let currentSegmentLength = 1;

    for (let index = 1; index < nums.length; index++) {
        if (nums[index - 1] < nums[index]) {
            currentSegmentLength++;
        } else {
            previousSegmentLength = currentSegmentLength;
            currentSegmentLength = 1;
        }

        const singleSegmentHasTwoSubarrays = currentSegmentLength >= 2 * k;
        const twoSegmentsHaveKLength = previousSegmentLength >= k && currentSegmentLength >= k;

        if (singleSegmentHasTwoSubarrays || twoSegmentsHaveKLength) {
            return true;
        }
    }

    return false;
};
```