# Count Less Then Emit Range | 9 Lines | O(n) | 0ms

# Intuition
We don't need to sort. After sorting, the target values form one contiguous block that starts at the number of elements smaller than `target` and has length equal to the number of elements equal to `target`.

# Approach
- Scan `nums` once, counting `lessCount` (elements `< target`) and `equalCount` (elements `=== target`).
- The target indices in the sorted array are `lessCount, lessCount + 1, ..., lessCount + equalCount - 1`.
- Build and return that range (empty if `equalCount` is `0`).

# Complexity
- Time complexity: $$O(n)$$ — one counting pass plus output generation.

- Space complexity: $$O(1)$$ extra — output array not counted.

# Code
```typescript []
const targetIndices = (nums: number[], target: number): number[] => {
    let lessCount = 0, equalCount = 0;

    for (const num of nums) {
        if (num < target) lessCount++;
        else if (num === target) equalCount++;
    }

    const result: number[] = [];
    for (let i = 0; i < equalCount; i++) result.push(lessCount + i);

    return result;
};
```