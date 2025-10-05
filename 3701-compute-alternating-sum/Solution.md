# Single Pass Reduction | 2 Lines | O(n) | 0ms

# Intuition
The alternating sum requires adding elements at even indices and subtracting elements at odd indices. This pattern can be efficiently computed in a single pass by multiplying each element by 1 or -1 based on its index parity.

# Approach
Use the `reduce` method to traverse the array once, accumulating the sum. For each element, determine its sign multiplier based on index: if the index is even (i % 2 === 0), multiply by 1 (add); if odd, multiply by -1 (subtract). Add this signed value to the running sum. The reduce starts with an initial sum of 0 and returns the final alternating sum.

# Complexity
- Time complexity: $$O(n)$$ where n is the length of the array
- Space complexity: $$O(1)$$

# Code
```typescript
const alternatingSum = (nums: number[]): number =>
    nums.reduce((sum, num, i) => sum + (i % 2 === 0 ? 1 : -1) * num, 0);
```