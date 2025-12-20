# Reverse Scan Set | 10 Lines | O(n) | 14ms

# Intuition

The key insight is that we only need to remove elements from the front until no duplicates remain in the suffix. By scanning from right to left, we can find the leftmost position where a duplicate exists - this tells us exactly how many elements need to be removed from the front. Since we remove 3 elements per operation, we can calculate the required operations directly.

# Approach

**Core Strategy:**
- Scan the array from right to left while tracking seen elements in a set
- The first duplicate we encounter (scanning from right) determines the minimum removal boundary
- All elements from the start up to and including this duplicate position must be removed
- Calculate operations needed based on how many elements to remove

**Step-by-Step Process:**

**1. Initialize Tracking:**
- Create an empty set to track elements we've seen while scanning from right
- We scan right-to-left because we want to keep as many elements as possible (minimize operations)
- The rightmost section of unique elements can be preserved

**2. Scan from Right to Left:**
- Start from the last element (index n-1) and move towards the first element (index 0)
- For each element, check if it already exists in our set
- This reverse scan identifies where duplicates first appear from the right perspective

**3. Detect First Duplicate (from right):**
- When we encounter an element already in the set:
  - This means this element appears again somewhere to the right
  - Everything from position 0 to current position i must be removed to eliminate this duplicate
  - The calculation: we need to remove i+1 elements total (positions 0 through i inclusive)
- This is the critical point: the leftmost duplicate determines our removal boundary

**4. Calculate Operations:**
- If we need to remove k elements, and each operation removes 3 elements:
  - Operations needed = ceil(k / 3)
- At position i, we need to remove i+1 elements (0-indexed array)
- Formula: `Math.ceil((i + 1) / 3)`
- Examples:
  - Remove 1 element: ceil(1/3) = 1 operation
  - Remove 2 elements: ceil(2/3) = 1 operation  
  - Remove 3 elements: ceil(3/3) = 1 operation
  - Remove 4 elements: ceil(4/3) = 2 operations

**5. Track Unique Elements:**
- If current element is not a duplicate, add it to the set
- Continue scanning left
- This builds up the set of unique elements in the suffix

**6. No Duplicates Found:**
- If we complete the entire scan without finding duplicates:
  - All elements are unique
  - No operations needed
  - Return 0

**Why This Works:**
- We want to keep the maximum possible suffix of unique elements
- By scanning right-to-left, we find the earliest (leftmost) position that must be removed
- Once we find a duplicate at position i, we know positions 0 to i must be removed
- Everything after position i will be unique (because we've verified it scanning from right)
- This gives us the minimum number of operations needed

**Example Walkthrough (nums = [3,8,3,6,5,8]):**
- Scan from right: 8 (unique), 5 (unique), 6 (unique), 3 (unique)
- Position 1, value 8: Already seen! We found our first duplicate
- Need to remove positions 0 and 1 (that's 2 elements)
- Operations: ceil(2/3) = 1
- After 1 operation removing [3,8,3], we have [6,5,8] which is all unique ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through the array from right to left
  - Each element is processed exactly once
  - Set operations (has, add) are O(1) average case
  - Early termination when first duplicate is found
  - Best case: O(1) if first element (rightmost check) is a duplicate
  - Worst case: O(n) if no duplicates or duplicate is at position 0

- Space complexity: $$O(n)$$
  - Set stores unique elements encountered during the scan
  - In worst case (no duplicates), set stores all n elements
  - Best case: O(1) if duplicate found immediately
  - Average case: O(k) where k is the number of unique elements in the suffix

# Code
```typescript []
const minOperations = (nums: number[]): number => {
    const n = nums.length;
    const set = new Set<number>();
    for (let i = n - 1; i >= 0; i--) {
        if (set.has(nums[i])) {
            return Math.ceil((i + 1) / 3);
        }
        set.add(nums[i]);
    }
    return 0;
};
```