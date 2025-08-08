# Sliding Window Unique Sum | 29 Lines | O(n) | 25ms

# Intuition

To maximize the sum of a subarray with **all unique elements**, we need to find the longest possible window of unique numbers while tracking their sum efficiently. A **sliding window with a hash map** helps track duplicates, ensuring we adjust the window without re-scanning the entire array repeatedly.

# Approach

- Use a **sliding window [left, right]** with:
  - A hash map (`lastSeenIndex`) to record the last seen index of each number.
  - `currentWindowSum` to track the sum of the current window.
  - `maxWindowSum` to track the maximum sum found.
- For each `right`:
  - If `nums[right]` is already in the window:
    - Move `left` past the previous occurrence to maintain uniqueness.
    - Subtract values left behind from `currentWindowSum`.
  - Add `nums[right]` to `currentWindowSum` and update `maxWindowSum`.

This ensures **O(n)** time while maintaining the unique subarray invariant.

# Complexity

- Time complexity:  
  $$O(n)$$, each element is added and removed at most once from the window.
- Space complexity:  
  $$O(n)$$, for the hash map storing last seen indices.

# Code

```typescript
const maximumUniqueSubarray = (nums: number[]): number => {
    let currentWindowSum = 0;
    let maxWindowSum = 0;
    const lastSeenIndex: Map<number, number> = new Map();
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        const currentNum = nums[right];

        if (lastSeenIndex.has(currentNum)) {
            const duplicateIndex = lastSeenIndex.get(currentNum)!;
            while (left <= duplicateIndex) {
                currentWindowSum -= nums[left];
                left++;
            }
        }

        currentWindowSum += currentNum;
        lastSeenIndex.set(currentNum, right);
        maxWindowSum = Math.max(maxWindowSum, currentWindowSum);
    }

    return maxWindowSum;
};
```