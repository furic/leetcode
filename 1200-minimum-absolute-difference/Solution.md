# Counting Sort with Adjacent Pairs | 45 Lines | O(n + range) | 31ms

# Intuition

Minimum absolute differences occur between adjacent elements in sorted order. Use counting sort for O(n + range) complexity, which can be faster than comparison-based O(n log n) sorting when the range is small.

# Approach

**Counting Sort Steps:**
1. Find min and max values to determine range
2. Create frequency array with offset for negative numbers
3. Count occurrences of each value
4. Reconstruct sorted array by iterating through frequency array
5. Track minimum difference while reconstructing

**Pair Collection:**
- After sorting, scan adjacent elements
- Collect all pairs with difference = minimum difference

**Why Counting Sort:**
- O(n + range) vs O(n log n) for comparison sort
- Efficient when range is reasonable
- Can sort in-place by reconstructing input array

**Example: arr=[4,2,1,3]**

Range: [1,4]
Frequency: [1:1, 2:1, 3:1, 4:1]

Sorted: [1,2,3,4]
Differences: 1-1=1, 2-1=1, 3-2=1, 4-3=1
Min: 1

Pairs with diff=1: [[1,2],[2,3],[3,4]] ✓

# Complexity

- Time complexity: $$O(n + \text{range})$$
  - Find min/max: O(n)
  - Build frequency: O(n)
  - Reconstruct: O(range)
  - Collect pairs: O(n)
  - Overall: O(n + range)
  - Degrades to O(n²) if range = O(n²)

- Space complexity: $$O(\text{range})$$
  - Frequency array: O(range)
  - Result pairs: O(n) worst case
  - Overall: O(range + n)

# Code
```typescript []
const minimumAbsDifference = (arr: number[]): number[][] => {
    let minValue = Infinity;
    let maxValue = -Infinity;
    
    for (const value of arr) {
        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);
    }
    
    const rangeStart = Math.min(minValue, 0);
    const indexOffset = Math.abs(rangeStart);
    const rangeSize = maxValue - rangeStart + 1;
    
    const frequency = new Array(rangeSize).fill(0);
    
    for (const value of arr) {
        frequency[value + indexOffset]++;
    }
    
    let minDifference = Infinity;
    let sortedWriteIndex = 0;
    
    for (let i = 0; i < frequency.length; i++) {
        if (frequency[i] > 0) {
            const actualValue = i - indexOffset;
            arr[sortedWriteIndex] = actualValue;

            if (sortedWriteIndex > 0) {
                const difference = arr[sortedWriteIndex] - arr[sortedWriteIndex - 1];
                minDifference = Math.min(minDifference, difference);
            }

            sortedWriteIndex++;
        }
    }
    
    const resultPairs: [number, number][] = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] === minDifference) {
            resultPairs.push([arr[i - 1], arr[i]]);
        }
    }
    
    return resultPairs;
};
```