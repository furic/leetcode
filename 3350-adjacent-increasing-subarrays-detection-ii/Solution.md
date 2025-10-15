# Segment Length Maximization | 28 Lines | O(n) | 90ms

# Intuition
We need to find the maximum length k where two adjacent strictly increasing subarrays of length k exist. By tracking increasing segment lengths as we scan the array, we can identify all possible configurations and maximize k without checking every position explicitly.

# Approach
**Rolling Maximum with Two Scenarios:**
- Track current and previous increasing segment lengths during a single pass
- At each position, calculate the maximum k possible from two different configurations
- Continuously update the global maximum k found

**Step-by-Step Process:**

1. **Initialize Tracking:**
   - `currentSegmentLength`: Length of ongoing strictly increasing segment (starts at 1)
   - `previousSegmentLength`: Length of last completed segment (starts at 0)
   - `maxSubarrayLength`: Maximum k found so far (starts at 0)

2. **Scan and Update Segments:**
   - For each position from index 1 to n-1:
   - If `nums[i] > nums[i-1]`: extend current segment by incrementing `currentSegmentLength`
   - Otherwise: segment breaks
     - Save current length: `previousSegmentLength = currentSegmentLength`
     - Reset: `currentSegmentLength = 1`

3. **Calculate Maximum k at Each Position:**

   **Configuration 1: Adjacent segments (cross-segment)**
   - k = min(previousSegmentLength, currentSegmentLength)
   - Uses the last k elements of previous segment and first k elements of current segment
   - These are inherently adjacent since current segment starts right after previous ends
   - The minimum ensures both subarrays have exactly length k
   - Example: [1,2,3,4] break [5,6,7] → k=3 using [2,3,4] and [5,6,7]

   **Configuration 2: Within single segment (split-segment)**
   - k = floor(currentSegmentLength / 2)
   - Splits current segment into two equal or nearly-equal parts
   - Both parts are strictly increasing (inherited from parent segment)
   - Example: [1,2,3,4,5,6] → k=3 using [1,2,3] and [4,5,6]

4. **Update Global Maximum:**
   - After calculating both configurations, update: `maxSubarrayLength = max(maxSubarrayLength, adjacentSegmentsLength, halfCurrentSegmentLength)`
   - This captures the best k achievable at current position

**Why Both Configurations Are Necessary:**
- Cross-segment (config 1) excels when both previous and current segments are moderately long
- Split-segment (config 2) excels when current segment is very long (more than double other segments)
- Neither strictly dominates the other, so both must be checked

**Key Observations:**
- Every valid pair of adjacent k-length increasing subarrays falls into one of these two categories
- By tracking segment lengths, we implicitly examine all possible positions
- Single pass suffices because we maintain rolling state of the previous segment
- No need to store all segment positions - just the most recent two lengths

# Complexity
- Time complexity: $$O(n)$$ - single pass through the array
- Space complexity: $$O(1)$$ - only three integer variables for tracking

# Code
```typescript
const maxIncreasingSubarrays = (nums: number[]): number => {
    let currentSegmentLength = 1;
    let previousSegmentLength = 0;
    let maxSubarrayLength = 0;

    for (let index = 1; index < nums.length; index++) {
        if (nums[index] > nums[index - 1]) {
            currentSegmentLength++;
        } else {
            previousSegmentLength = currentSegmentLength;
            currentSegmentLength = 1;
        }

        const adjacentSegmentsLength = Math.min(previousSegmentLength, currentSegmentLength);
        const halfCurrentSegmentLength = Math.floor(currentSegmentLength / 2);

        maxSubarrayLength = Math.max(
            maxSubarrayLength,
            adjacentSegmentsLength,
            halfCurrentSegmentLength
        );
    }

    return maxSubarrayLength;
};
```