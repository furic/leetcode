# Rolling Sum Left-Right Diff | 7 Lines | O(n) | 1ms

# Intuition
Maintain running left and right sums without allocating auxiliary arrays. Before processing each element, `rightSum` holds the sum of all elements to the right (after subtracting the current), and `leftSum` holds the sum of all elements to the left (before adding the current).

# Approach
- Initialise `leftSum = 0` and `rightSum = total sum`.
- For each element: subtract it from `rightSum` first (it's no longer "to the right"), compute the absolute difference, then add it to `leftSum` (it's now "to the left").

# Complexity
- Time complexity: $$O(n)$$ — one pass to compute total, one pass via `map`.

- Space complexity: $$O(1)$$ extra — output array not counted.

# Code
```typescript []
const leftRightDifference = (nums: number[]): number[] => {
    let leftSum = 0;
    let rightSum = nums.reduce((a, b) => a + b, 0);

    return nums.map(num => {
        rightSum -= num;
        const diff = Math.abs(leftSum - rightSum);
        leftSum += num;
        return diff;
    });
};
```