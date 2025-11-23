# Modulo Check | 1 Line | O(n) | 0ms

# Intuition
Any number not divisible by 3 has a remainder of 1 or 2 when divided by 3. Each such number requires exactly one operation (add or subtract 1) to become divisible by 3. The problem reduces to counting how many numbers are not divisible by 3.

# Approach
- **Key Mathematical Insight**:
  - When dividing by 3, a number has remainder 0, 1, or 2
  - Remainder 0: Already divisible by 3 → 0 operations needed
  - Remainder 1: Subtract 1 → becomes divisible by 3 → 1 operation
  - Remainder 2: Add 1 → becomes divisible by 3 → 1 operation
  - Therefore: Each non-divisible number needs exactly 1 operation

- **Why One Operation is Sufficient**:
  - Numbers with remainder 1 (e.g., 4, 7, 10): Subtract 1 gets to nearest multiple of 3 below
  - Numbers with remainder 2 (e.g., 2, 5, 8): Add 1 gets to nearest multiple of 3 above
  - We always have a single-step path to a multiple of 3

- **Solution Strategy**:
  - Use reduce to accumulate the count of operations needed
  - For each number, check `num % 3 === 0`
  - If divisible: Add 0 to accumulator
  - If not divisible: Add 1 to accumulator
  - Return the total count

- **Example Walkthrough** ([1,2,3,4]):
  - 1 % 3 = 1 → not divisible → needs 1 operation (1-1=0, divisible by 3)
  - 2 % 3 = 2 → not divisible → needs 1 operation (2+1=3, divisible by 3)
  - 3 % 3 = 0 → divisible → needs 0 operations
  - 4 % 3 = 1 → not divisible → needs 1 operation (4-1=3, divisible by 3)
  - Total: 1 + 1 + 0 + 1 = 3 operations

- **Edge Cases Handled**:
  - All numbers divisible by 3: Returns 0
  - No numbers divisible by 3: Returns array length
  - Empty array: Returns 0 (reduce initial value)

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through array using reduce
  - Modulo operation on each element: O(1)
  - Total: O(n)

- Space complexity: $$O(1)$$
  - Only accumulator variable used
  - No additional data structures
  - In-place counting

# Code
```typescript
const minimumOperations = (nums: number[]): number => nums.reduce((ops, num) => ops += num % 3 === 0 ? 0 : 1, 0);
```