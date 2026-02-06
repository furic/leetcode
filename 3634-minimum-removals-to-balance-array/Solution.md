# Sort and Two-Pointer Window | 12 Lines | O(n log n) | 72ms

# Intuition

After sorting, a balanced subarray must be contiguous. Use two pointers to maintain the longest valid suffix where max ≤ k × min. The number of elements removed from the left equals minimum removals.

# Approach

**Sort First:**
- After sorting, min = nums[left], max = nums[right]
- Any balanced subarray is contiguous in sorted order

**Two-Pointer Strategy:**
- Expand right pointer through array
- When condition violated (nums[right] > k × nums[left]):
  - Shrink from left (increment left)
- Left pointer tracks elements to remove

**Why This Works:**
- We want to keep longest valid suffix
- Removing from left (smallest elements) or right (largest) maintains sorted property
- Optimal: remove from whichever side minimizes count

**Example: nums=[2,1,5], k=2**

Sort: [1,2,5]

Process:
- right=0: nums[0]=1, left=0, 1 ≤ 1×2 ✓
- right=1: nums[1]=2, left=0, 2 ≤ 1×2 ✓
- right=2: nums[2]=5, left=0, 5 > 1×2 ✗ → left=1
  - Now: 5 ≤ 2×2 ✓

Removals: left=1 → remove 1 element ✓

# Complexity

- Time complexity: $$O(n \log n)$$
  - Sort: O(n log n)
  - Two-pointer scan: O(n)
  - Overall: O(n log n)

- Space complexity: $$O(1)$$
  - In-place sort (typically)
  - Only pointer variables
  - Overall: O(1) auxiliary space

# Code
```typescript []
const minRemoval = (nums: number[], k: number): number => {
    nums.sort((a, b) => a - b);
    const arrayLength = nums.length;
    
    let leftBoundary = 0;
    for (let rightBoundary = 0; rightBoundary < arrayLength; rightBoundary++) {
        if (leftBoundary <= rightBoundary && nums[rightBoundary] > nums[leftBoundary] * k) {
            leftBoundary++;
        }
    }
    
    return leftBoundary;
};
```