# Hash Set Lookup | 8 Lines | O(n) | 0ms

# Intuition
The problem requires repeatedly checking if a value exists in the array and doubling it if found. Using a Set for O(1) lookups is more efficient than repeatedly scanning the array with O(n) lookups.

# Approach
- **Preprocessing - Build Hash Set**:
  - Convert the input array to a Set for constant-time membership checks
  - This one-time O(n) operation enables efficient subsequent lookups
  - Trade-off: Use O(n) space to achieve O(1) lookup time

- **Iterative Doubling Process**:
  - Start with the original value as current value
  - Enter a while loop that continues as long as current value exists in the Set
  - Each iteration: multiply current value by 2
  - Exit when current value is not found in the Set

- **Why Set Over Array**:
  - Array.includes() or Array.indexOf() requires O(n) linear scan per lookup
  - Set.has() provides O(1) average-case lookup using hash table
  - For k iterations of doubling, total lookup time: O(k) with Set vs O(n×k) with array
  - Since k can be up to log(MAX_VALUE/original), this optimization is significant

- **Termination Condition**:
  - Loop terminates when current value is not in the Set
  - This happens when we've doubled beyond all values in the array
  - Return the first value not found in the array

- **Edge Cases Handled**:
  - Original not in array: Loop never executes, returns original immediately
  - Single element matching original: Doubles once then returns
  - Multiple consecutive doublings: Handles chain of doublings correctly

- **Example Walkthrough** ([5,3,6,1,12], original=3):
  - Set = {5, 3, 6, 1, 12}
  - currentValue = 3, found in Set → currentValue = 6
  - currentValue = 6, found in Set → currentValue = 12
  - currentValue = 12, found in Set → currentValue = 24
  - currentValue = 24, NOT found in Set → return 24

# Complexity
- Time complexity: $$O(n + k)$$ where k is the number of doublings
  - Building Set from array: O(n)
  - While loop iterations: O(k) where k ≤ log₂(MAX_VALUE/original)
  - Each Set lookup: O(1) average case
  - Typically k is small (≤ 30 for 32-bit integers), so overall O(n)

- Space complexity: $$O(n)$$
  - Set stores all unique elements from nums array
  - In worst case, all elements are unique: O(n) space
  - Current value variable: O(1)

# Code
```typescript
const findFinalValue = (nums: number[], original: number): number => {
    const numSet = new Set(nums);
    let currentValue = original;

    while (numSet.has(currentValue)) {
        currentValue *= 2;
    }

    return currentValue;
};
```