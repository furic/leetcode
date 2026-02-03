# Greedy Three-Phase Scan | 14 Lines | O(n) | 0ms

# Intuition

A trionic array has three consecutive strictly monotonic segments: up-down-up. Greedily consume each segment as long as possible, validating that all three segments are non-empty and cover the entire array.

# Approach

**Greedy Segmentation:**
1. **Phase 1 (Increasing)**: Consume while nums[i] < nums[i+1]
   - Must advance at least once (segment non-empty)
   - Must not reach end (need room for phases 2 and 3)

2. **Phase 2 (Decreasing)**: Consume while nums[i] > nums[i+1]
   - Must advance at least once (segment non-empty)
   - Must not reach end (need room for phase 3)

3. **Phase 3 (Increasing)**: Consume while nums[i] < nums[i+1]
   - Must reach exactly the end (entire array consumed)

**Validation:**
- After phase 1: check currentIndex > 0 and < n-1
- After phase 2: check currentIndex < n-1
- After phase 3: check currentIndex == n-1

**Example: nums=[1,3,5,4,2,6]**

Phase 1: [1,3,5] → currentIndex=2 ✓
Phase 2: [5,4,2] → currentIndex=4 ✓
Phase 3: [2,6] → currentIndex=5 (end) ✓

Result: true ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through array
  - Each element visited at most once
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Only index variable
  - No additional data structures

# Code
```typescript []
const isTrionic = (nums: number[]): boolean => {
    let currentIndex = 0;
    const arrayLength = nums.length;

    while (currentIndex + 1 < arrayLength && nums[currentIndex] < nums[currentIndex + 1]) currentIndex++;
    if (currentIndex === 0 || currentIndex === arrayLength - 1) return false;

    while (currentIndex + 1 < arrayLength && nums[currentIndex] > nums[currentIndex + 1]) currentIndex++;
    if (currentIndex === arrayLength - 1) return false;

    while (currentIndex + 1 < arrayLength && nums[currentIndex] < nums[currentIndex + 1]) currentIndex++;
    return currentIndex === arrayLength - 1;
};
```