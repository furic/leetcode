# Sliding Window Two Pointer | 12 Lines | O(n) | 1ms

# Intuition
Since we must delete exactly one element and want the longest contiguous sequence of 1s, we're essentially looking for the longest subarray that contains at most one 0 (which we can "delete"). This transforms the problem into finding the longest subarray with at most one zero, then subtracting 1 from the length since we must delete one element. A sliding window approach works perfectly here.

# Approach
I'll use a sliding window technique with two pointers:

1. **Window Expansion**: Expand the right pointer and include elements in the current window. Count zeros as we encounter them.

2. **Window Constraint**: Maintain at most 1 zero in the window (representing the element we can delete). When we have more than 1 zero, shrink the window from the left.

3. **Window Shrinking**: Move the left pointer rightward until we have at most 1 zero in the window. Decrement zero count when removing zeros from the left side.

4. **Length Calculation**: For each valid window, calculate its length minus 1 (since we must delete exactly one element). Track the maximum length seen.

5. **Edge Case Handling**: The formula `rightPointer - leftPointer` automatically handles the case where we must delete one element, giving us the length of the remaining contiguous 1s.

# Complexity
- Time complexity: $$O(n)$$
  - Each element is visited at most twice (once by right pointer, once by left pointer)
  - Both pointers move only rightward throughout the algorithm
  - All operations inside the loop are constant time

- Space complexity: $$O(1)$$
  - Only using a constant number of variables (pointers, counters, max tracker)
  - No additional data structures that scale with input size
  - All computation done in-place with fixed memory usage

# Code
```typescript []
const longestSubarray = (nums: number[]): number => {
    let leftPointer = 0;
    let zeroCount = 0;
    let maxLength = 0;
    
    for (let rightPointer = 0; rightPointer < nums.length; rightPointer++) {
        if (nums[rightPointer] === 0) zeroCount++;
        
        while (zeroCount > 1) {
            if (nums[leftPointer] === 0) zeroCount--;
            leftPointer++;
        }
        
        maxLength = Math.max(maxLength, rightPointer - leftPointer);
    }
    
    return maxLength;
};
```