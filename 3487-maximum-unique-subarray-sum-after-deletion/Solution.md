# Unique Subarray Max Sum | 9 Lines | O(n) | 1ms

# Intuition

To maximize the sum of a **unique elements subarray**, we need to:
- **Keep all positive unique numbers** to maximize the sum.
- If **no positive numbers exist**, we take the maximum single element.

# Approach

- Filter all **positive numbers** and store them in a `Set` to ensure uniqueness.
- If the `Set` is non-empty, sum its elements for the maximum sum.
- If the `Set` is empty (all elements are non-positive), return the **maximum element** in the array.

# Complexity

- Time complexity:  
  $$O(n)$$  
  (single pass for filtering and summing)
- Space complexity:  
  $$O(n)$$  
  (to store the positive unique numbers)

# Code

```typescript
const maxSum = (nums: number[]): number => {
    const positiveNumsSet = new Set(nums.filter((num) => num > 0));
    return positiveNumsSet.size
        ? [...positiveNumsSet].reduce((a, b) => a + b, 0)
        : Math.max(...nums);
}
```