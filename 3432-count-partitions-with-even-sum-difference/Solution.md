# Total Sum Parity Check | 3 Lines | O(n) | 0ms

# Intuition
The difference between left and right subarray sums depends on the total sum. If we partition at index i, left sum + right sum = total. The key insight is that the parity (even/odd) of the difference is completely determined by whether the total sum is even or odd.

# Approach
- **Mathematical Foundation**:
  - For partition at index i: left = sum[0..i], right = sum[i+1..n-1]
  - Difference = |left - right|
  - Key equation: left + right = totalSum

- **Parity Analysis**:
  - From left + right = total, we get: left = total - right
  - Therefore: difference = |left - right| = |total - 2×right|
  - Difference is even ⟺ total - 2×right is even
  - Since 2×right is always even, this depends only on total's parity

- **Case 1: Total Sum is Even**:
  - total - 2×right = even - even = even (always)
  - Every partition produces even difference
  - Number of valid partitions = n - 1 (can partition after any index 0 to n-2)

- **Case 2: Total Sum is Odd**:
  - total - 2×right = odd - even = odd (always)
  - No partition produces even difference
  - Number of valid partitions = 0

- **Why This Works**:
  - The actual values of left and right don't matter
  - Only their relationship to the total sum matters
  - Parity is preserved regardless of partition position

- **Example** ([4,2,1,3]):
  - Total = 10 (even)
  - Partitions:
    - [4] | [2,1,3]: diff = |4-6| = 2 (even) ✓
    - [4,2] | [1,3]: diff = |6-4| = 2 (even) ✓
    - [4,2,1] | [3]: diff = |7-3| = 4 (even) ✓
  - All 3 partitions valid → return 3 = n-1 ✓

- **Example** ([1,2,3]):
  - Total = 6 (even)
  - Result = 2 (all partitions work)

- **Example** ([1,2,4]):
  - Total = 7 (odd)
  - Result = 0 (no partitions work)

# Complexity
- Time complexity: $$O(n)$$
  - Calculate total sum using reduce: O(n)
  - Parity check and return: O(1)
  - Total: O(n)

- Space complexity: $$O(1)$$
  - Only store totalSum variable
  - No additional data structures
  - Total: O(1)

# Code
```typescript
const countPartitions = (nums: number[]): number => {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);
    
    return totalSum % 2 === 0 ? nums.length - 1 : 0;
};
```