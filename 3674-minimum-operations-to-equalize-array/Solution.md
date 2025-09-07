# Set Size Analysis | 1 Line | O(n) | 0ms

# Intuition
The key insight is that ANY bitwise AND operation will always result in a value that appears somewhere in the original array or a completely new value. Since we can choose any subarray and apply AND operation, we can always make all elements equal in at most one operation by selecting the entire array and applying AND to get a uniform result. The only case where zero operations are needed is when all elements are already equal.

# Approach
I'll analyze the problem based on the distinctness of elements:

1. **All Elements Equal**: If all elements in the array are already the same, no operations are needed. This can be efficiently checked by comparing the size of the set of unique elements to 1.

2. **Elements Not All Equal**: If there are at least two different values in the array, we can always make them equal in exactly one operation by:
   - Selecting the entire array as a subarray
   - Applying the bitwise AND operation to all elements
   - This will result in all elements becoming the same value (the AND of all original elements)

3. **Why One Operation is Always Sufficient**: The bitwise AND operation on any non-empty subarray will produce a single value. By choosing the entire array, we guarantee that all elements become identical after one operation.

4. **Why More Than One Operation is Never Needed**: Since we can always choose the entire array and make all elements equal in one step, there's no scenario that requires more than one operation.

# Complexity
- Time complexity: $$O(n)$$
  - Creating a Set from the array requires visiting each element once: O(n)
  - Checking the size of the Set is O(1)
  - All other operations are constant time

- Space complexity: $$O(n)$$
  - Set storage requires space proportional to the number of unique elements
  - In worst case, all elements are unique, requiring O(n) space
  - No additional data structures beyond the Set

# Code
```typescript []
const minOperations = (nums: number[]): number => new Set(nums).size === 1 ? 0 : 1;
```