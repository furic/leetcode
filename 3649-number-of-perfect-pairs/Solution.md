# Two Pointer Absolute Values | 18 Lines | O(n log n) | 155ms

# Intuition
The perfect pair conditions involve comparing |a-b|, |a+b|, |a|, and |b|. Through mathematical analysis, these conditions simplify significantly when working with absolute values. The key insight is that after taking absolute values and sorting, we only need to check if |b| ≤ 2×|a| for the pair to be valid, which can be efficiently counted using a two-pointer technique.

# Approach
I'll use absolute value transformation with two-pointer counting:

1. **Simplify the Problem**: Convert all numbers to their absolute values. Mathematical analysis shows that the perfect pair conditions reduce to: for sorted absolute values where |a| ≤ |b|, the pair is valid if |b| ≤ 2×|a|.

2. **Sort for Efficiency**: Sort the absolute values in ascending order. This enables us to use a two-pointer approach where we can efficiently count valid pairs.

3. **Two-Pointer Technique**: 
   - Left pointer iterates through each element as the smaller value of a pair
   - Right pointer finds the boundary where elements become too large (> 2×left element)
   - All elements between left+1 and right-1 form valid pairs with the left element

4. **Count Valid Pairs**: For each left element, count how many elements to its right satisfy the condition. This gives us all valid pairs without checking each pair individually.

5. **Why This Works**: The sorted order ensures that once we find the rightmost valid element for a given left element, all elements before it are also valid, allowing us to count them in O(1).

# Complexity
- Time complexity: $$O(n \log n)$$
  - Converting to absolute values: O(n)
  - Sorting: O(n log n)
  - Two-pointer counting: O(n) - each pointer moves at most n times total
  - Overall dominated by sorting: O(n log n)

- Space complexity: $$O(1)$$ or $$O(\log n)$$
  - In-place absolute value conversion and sorting
  - Only using constant extra variables for pointers and counter
  - Sorting may use O(log n) stack space depending on implementation

# Code
```typescript []
const perfectPairs = (nums: number[]): number => {
    for (let index = 0; index < nums.length; index++) {
        nums[index] = Math.abs(nums[index]);
    }

    nums.sort((a, b) => a - b);

    let perfectPairsCount = 0;
    let rightPointer = 0;

    for (let leftPointer = 0; leftPointer < nums.length; leftPointer++) {
        while (rightPointer < nums.length && nums[rightPointer] <= 2 * nums[leftPointer]) {
            rightPointer++;
        }
        
        const validPairsForCurrentLeft = (rightPointer - 1) - leftPointer;
        perfectPairsCount += validPairsForCurrentLeft;
    }

    return perfectPairsCount;
};
```