# Always True | 1 Line | O(1) | 0ms

# Intuition
With subtraction available and no `>= 1` constraint, any element can always be made either parity. The answer is always `true`.

# Approach
- Any element `x` can be kept as `x` (keeping its parity) or changed to `x - x = 0` (even) or `x - y` for any other `y` in the array, which can yield either parity. Since there's always at least one other element, every element can independently be made odd or even — so `nums2` can always be all-odd or all-even.

# Complexity
- Time complexity: $$O(1)$$.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const uniformArray = (nums1: number[]): boolean => true;
```