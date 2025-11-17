# Longest Non-Decreasing Subsequence | 16 Lines | O(n) | 3ms

# Intuition
To minimize removals, we want to maximize the elements we keep. The elements we keep must form a non-decreasing subsequence. Since values are limited to {1, 2, 3}, we can track the longest non-decreasing subsequence ending with each value using dynamic programming.

# Approach
- **Problem Transformation**:
  - Minimum removals = Total elements - Maximum elements we can keep
  - Elements to keep must form a non-decreasing subsequence
  - Goal: Find the longest non-decreasing subsequence (LIS variant)

- **State Definition**:
  - Track three DP states representing longest subsequences ending with each value:
  - `maxLengthEndingWith1`: longest subsequence ending with value 1
  - `maxLengthEndingWith2`: longest subsequence ending with value 2
  - `maxLengthEndingWith3`: longest subsequence ending with value 3

- **Transition Rules** (for each element in array):
  - **When current value = 1**:
    - Can only extend sequences ending with 1 (since 2→1 and 3→1 decrease)
    - Or start a new sequence
    - Update: `maxLengthEndingWith1++`
  
  - **When current value = 2**:
    - Can extend sequences ending with 1 (1→2 is non-decreasing)
    - Can extend sequences ending with 2 (2→2 is non-decreasing)
    - Cannot extend sequences ending with 3 (3→2 decreases)
    - Update: `maxLengthEndingWith2 = max(maxLengthEndingWith1, maxLengthEndingWith2) + 1`
  
  - **When current value = 3**:
    - Can extend any sequence (1→3, 2→3, 3→3 all non-decreasing)
    - Update: `maxLengthEndingWith3 = max(all three states) + 1`

- **Why This Works**:
  - We process elements left to right, building up optimal subsequences
  - Each state tracks the best result ending with that specific value
  - Transitions respect the non-decreasing constraint
  - No need to track actual subsequences, just their lengths

- **Final Calculation**:
  - Find maximum among all three ending states
  - This gives longest possible non-decreasing subsequence
  - Answer = `n - longestSubsequenceLength`

- **Example Walkthrough** ([2,1,3,2,1]):
  - Start: [0, 0, 0]
  - After 2: [0, 1, 0] (one subsequence of length 1 ending with 2)
  - After 1: [1, 1, 0] (sequence [1] replaces nothing, [2] still exists)
  - After 3: [1, 1, 2] (extend best of [0,1,0] → [0,1,2])
  - After 2: [1, 2, 2] (extend max(1,1)+1 = 2)
  - After 1: [2, 2, 2] (increment first state)
  - Max length = 2, so remove 5-2 = 3 elements

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the array
  - Constant time operations per element
  - Switch statement with O(1) lookups

- Space complexity: $$O(1)$$
  - Only three integer variables for DP states
  - No additional data structures needed
  - Input array not modified

# Code
```typescript
const minimumOperations = (nums: number[]): number => {
    let maxLengthEndingWith1 = 0;
    let maxLengthEndingWith2 = 0;
    let maxLengthEndingWith3 = 0;

    for (const currentValue of nums) {
        switch (currentValue) {
            case 1:
                maxLengthEndingWith1++;
                break;
            case 2:
                maxLengthEndingWith2 = Math.max(maxLengthEndingWith1, maxLengthEndingWith2) + 1;
                break;
            case 3:
                maxLengthEndingWith3 = Math.max(
                    maxLengthEndingWith1,
                    maxLengthEndingWith2,
                    maxLengthEndingWith3
                ) + 1;
                break;
        }
    }

    const longestSubsequenceLength = Math.max(
        maxLengthEndingWith1,
        maxLengthEndingWith2,
        maxLengthEndingWith3
    );

    return nums.length - longestSubsequenceLength;
};
```