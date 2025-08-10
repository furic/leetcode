# Bitwise AND Analysis | 10 Lines | O(n) | 1ms

# Intuition
To sort the array using only swaps where nums[i] AND nums[j] == k, we need to find the maximum k that allows all necessary swaps. For each position i where nums[i] ≠ i (element is out of place), we need to be able to swap it with some other element to eventually get it to the correct position. The key insight is that k must be a value that appears as the AND result between misplaced elements and their target positions or other misplaced elements.

# Approach
I'll analyze which elements are out of place and find the maximum possible k:

1. **Identify Misplaced Elements**: Iterate through the array and find positions where nums[i] ≠ i, meaning the element is not in its correct sorted position.

2. **Bitwise AND Accumulation**: For each misplaced element, perform a bitwise AND operation with the position index. This gives us potential k values that could work for swapping operations.

3. **Maximum k Calculation**: Use the AND operation to accumulate constraints. Start with -1 (all bits set) and AND it with each misplaced position. This finds the largest k that satisfies all necessary swap conditions.

4. **Edge Cases**: 
   - If no elements are misplaced, return 0 (already sorted)
   - If the accumulated result is -1, no valid swaps exist, so return 0

The algorithm leverages the property that if we can swap elements using AND operation with value k, then k must be a common bit pattern among the elements that need to be repositioned.

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the array to check each element's position
  - Each comparison and bitwise operation takes constant time
  - No nested loops or recursive calls

- Space complexity: $$O(1)$$
  - Only using a constant amount of extra variables (res, loop counter)
  - No additional data structures that scale with input size
  - All operations performed in-place

# Code
```typescript []
const sortPermutation = (nums: number[]): number => {
    let res = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) {
            res &= i;
        }
    }
    return res === -1 ? 0 : res;
};
```