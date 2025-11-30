# Sort and Threshold | 7 Lines | O(n log n) | 172ms

# Intuition
An element is qualified if at least k elements are strictly greater. By sorting, we can identify the k-th largest element as a threshold. Any element strictly less than this threshold will have at least k elements greater than it.

# Approach
- **Edge Cases First**:
  - `k === 0`: Every element has at least 0 elements greater → all n elements qualify
  - `k >= n`: Impossible to have k elements greater when array has only n elements → 0 qualify

- **Finding the Threshold**:
  - Sort the array in ascending order
  - The k-th largest element is at index `n - k` in sorted array
  - Example: [1,2,3] with k=1 → threshold = sorted[3-1] = sorted[2] = 3

- **Qualification Condition**:
  - Elements strictly less than threshold have at least k elements greater
  - Why? The k largest elements (indices n-k to n-1) are all ≥ threshold
  - Any element < threshold has at least these k elements above it

- **Counting Qualified Elements**:
  - Filter original array for elements < threshold
  - Return the count

- **Why Strictly Less Than**:
  - Elements equal to threshold may not have k elements strictly greater
  - Example: [5,5,5], k=2 → threshold=5, but no element has 2 elements greater than it
  - Only elements strictly below threshold are guaranteed to have k greater elements

- **Example Walkthrough** ([3,1,2], k=1):
  - sorted = [1, 2, 3]
  - threshold = sorted[3-1] = 3 (the 1st largest)
  - Elements < 3: {1, 2}
  - Count = 2 ✓

- **Example Walkthrough** ([5,5,5], k=2):
  - sorted = [5, 5, 5]
  - threshold = sorted[3-2] = 5 (the 2nd largest)
  - Elements < 5: none
  - Count = 0 ✓

# Complexity
- Time complexity: $$O(n \log n)$$
  - Copying array: O(n)
  - Sorting: O(n log n)
  - Filtering: O(n)
  - Total: O(n log n)

- Space complexity: $$O(n)$$
  - Sorted copy of array: O(n)
  - Filter creates new array: O(n)
  - Total: O(n)

# Code
```typescript
const countElements = (nums: number[], k: number): number => {
    const n = nums.length;
    
    if (k === 0) return n;
    if (k >= n) return 0;
    
    const sorted = [...nums].sort((a, b) => a - b);
    const threshold = sorted[n - k];
    
    return nums.filter(x => x < threshold).length;
};
```