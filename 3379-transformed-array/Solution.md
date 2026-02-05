# Modulo Arithmetic for Circular Array | 16 Lines | O(n) | 55ms

# Intuition

Use modulo arithmetic to handle circular wrapping. For positive steps, add and mod. For negative steps, handle negative modulo by adding array length before final mod.

# Approach

**Circular Index Calculation:**
- **Positive (right)**: `(i + nums[i]) % n`
- **Zero (stay)**: `i`
- **Negative (left)**: `((i + nums[i]) % n + n) % n`

**Why Double Modulo for Negative:**
- JavaScript's modulo can return negative values
- Example: `(-1) % 3 = -1` (not 2)
- Adding `n` ensures positive: `(-1 + 3) % 3 = 2` ✓

**Example: nums=[3,-2,1,1]**

- i=0: nums[0]=3 → (0+3)%4 = 3 → nums[3]=1
- i=1: nums[1]=-2 → ((1-2)%4+4)%4 = ((-1)+4)%4 = 3 → nums[3]=1
- i=2: nums[2]=1 → (2+1)%4 = 3 → nums[3]=1
- i=3: nums[3]=1 → (3+1)%4 = 0 → nums[0]=3

Result: [1,1,1,3] ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through array
  - Constant work per element
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Result array: O(n)
  - No additional data structures

# Code
```typescript []
const constructTransformedArray = (nums: number[]): number[] => {
    const arrayLength = nums.length;
    const result = Array(arrayLength);

    for (let i = 0; i < arrayLength; i++) {
        if (nums[i] > 0) {
            result[i] = nums[(i + nums[i]) % arrayLength];
        } else if (nums[i] === 0) {
            result[i] = nums[i];
        } else {
            result[i] = nums[((i + nums[i]) % arrayLength + arrayLength) % arrayLength];
        }
    }

    return result;
};
```