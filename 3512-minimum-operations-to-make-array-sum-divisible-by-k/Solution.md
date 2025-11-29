# Sum Modulo | 1 Line | O(n) | 1ms

# Intuition
Since each operation subtracts 1 from the total sum, we need to reduce the sum until it becomes divisible by k. The minimum number of subtractions needed is exactly the remainder when the sum is divided by k.

# Approach
- **Core Mathematical Insight**:
  - Each operation: subtract 1 from any element → reduces total sum by 1
  - Goal: make sum divisible by k
  - If sum % k = r, we need to subtract exactly r to reach the nearest lower multiple of k

- **Why Remainder Equals Operations**:
  - Any number n can be written as: n = q×k + r (where r is remainder, 0 ≤ r < k)
  - To make n divisible by k: n - r = q×k (a multiple of k)
  - Therefore, we need exactly r operations (each subtracting 1)

- **Operation Distribution Doesn't Matter**:
  - We can subtract from any element(s)
  - Only total sum matters for divisibility check
  - Example: Subtracting 4 from one element vs 2 from two elements → same effect on sum

- **Single Pass Calculation**:
  - Use reduce to sum all elements
  - Apply modulo k to get remainder
  - Return remainder as answer

- **Example Walkthrough** ([3,9,7], k=5):
  - Sum = 3 + 9 + 7 = 19
  - 19 % 5 = 4
  - Need 4 operations to reduce sum to 15 (divisible by 5)
  - Result: 4

- **Example Walkthrough** ([4,1,3], k=4):
  - Sum = 4 + 1 + 3 = 8
  - 8 % 4 = 0
  - Sum already divisible by 4
  - Result: 0

- **Edge Cases Handled**:
  - Sum already divisible: remainder is 0, no operations needed
  - Single element: same logic applies
  - Remainder equals sum: may need to reduce to 0 (still valid)

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through array to calculate sum
  - Modulo operation: O(1)
  - Total: O(n)

- Space complexity: $$O(1)$$
  - Only accumulator variable in reduce
  - No additional data structures
  - Total: O(1)

# Code
```typescript
const minOperations = (nums: number[], k: number): number => nums.reduce((sum, cur) => sum + cur, 0) % k;
```