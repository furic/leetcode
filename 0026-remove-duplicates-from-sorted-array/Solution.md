# Two-Pointer In-Place | 11 Lines | O(n) | 0ms

# Intuition

Since the array is sorted, duplicates are adjacent. We can use two pointers: one to read through the array, and one to track where to write the next unique element. When we find a new unique value (different from the previous), we write it at the write position and advance.

# Approach

**Two-Pointer Strategy:**
- `writePosition`: Tracks where to place the next unique element (starts at 1)
- `readPosition`: Scans through the array from index 1
- First element is always unique, so we start both pointers at 1

**Algorithm:**
- Compare current element with previous: `nums[readPosition] !== nums[readPosition - 1]`
- If different: write current element at `writePosition`, then increment `writePosition`
- If same: skip (it's a duplicate)
- Return `writePosition` (count of unique elements)

**Example: [0,0,1,1,1,2,2,3,3,4]**

Initial: writePosition = 1

- readPosition=1: nums[1]=0 == nums[0]=0 → skip
- readPosition=2: nums[2]=1 != nums[1]=0 → write 1 at index 1, writePosition=2
- readPosition=3: nums[3]=1 == nums[2]=1 → skip
- readPosition=4: nums[4]=1 == nums[3]=1 → skip
- readPosition=5: nums[5]=2 != nums[4]=1 → write 2 at index 2, writePosition=3
- readPosition=6: nums[6]=2 == nums[5]=2 → skip
- readPosition=7: nums[7]=3 != nums[6]=2 → write 3 at index 3, writePosition=4
- readPosition=8: nums[8]=3 == nums[7]=3 → skip
- readPosition=9: nums[9]=4 != nums[8]=3 → write 4 at index 4, writePosition=5

Result: nums = [0,1,2,3,4,...], return 5 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through array with readPosition
  - Each element examined once
  - Constant work per element

- Space complexity: $$O(1)$$
  - Only two pointer variables
  - In-place modification
  - No additional data structures

# Code
```typescript []
const removeDuplicates = (nums: number[]): number => {
    if (nums.length === 0) return 0;
    
    let writePosition = 1;
    
    for (let readPosition = 1; readPosition < nums.length; readPosition++) {
        if (nums[readPosition] !== nums[readPosition - 1]) {
            nums[writePosition] = nums[readPosition];
            writePosition++;
        }
    }
    
    return writePosition;
};
```