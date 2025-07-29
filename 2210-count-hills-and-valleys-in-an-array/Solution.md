# Intuition
We want to count the number of "hills" and "valleys" in an integer array. A hill is where the current element is greater than both of its closest non-equal neighbors, and a valley is where it is smaller than both. To do this accurately, we must skip over adjacent duplicate elements and only consider transitions between distinct values.

# Approach
We iterate through the array while maintaining the index of the last distinct value (`lastUniqueIndex`). For each index `current`, if the value is equal to the next, we skip it. Otherwise, we compare the current value with its previous and next distinct neighbors to determine if it's a hill or valley. We count such transitions and move forward.

# Complexity
- Time complexity: $$O(n)$$
- Space complexity: $$O(1)$$

# Code
```typescript
const countHillValley = (nums: number[]): number => {
    let hillValleyCount = 0;
    let lastUniqueIndex = 0;

    for (let current = 1; current < nums.length - 1; current++) {
        if (nums[current] === nums[current + 1]) continue;

        const left = nums[lastUniqueIndex];
        const center = nums[current];
        const right = nums[current + 1];

        const isHill = center > left && center > right;
        const isValley = center < left && center < right;

        if (isHill || isValley) hillValleyCount++;

        lastUniqueIndex = current;
    }

    return hillValleyCount;
};
```
