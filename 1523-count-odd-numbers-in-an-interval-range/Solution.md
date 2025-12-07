# Mathematical Range Formula | 2 Lines | O(1) | 44ms

# Intuition
Instead of iterating through the range, we can use a mathematical formula. The count of odd numbers from 0 to n follows a pattern: ⌊(n+1)/2⌋. For a range [low, high], we use prefix counting: subtract the count up to low-1 from the count up to high.

# Approach
- **Prefix Count Formula**:
  - Count of odd numbers from 0 to n (inclusive) = ⌊(n+1)/2⌋
  - This works because: 0,1,2,3,4,5 has ⌊6/2⌋ = 3 odd numbers (1,3,5)
  - Dividing by 2 gives us every other number starting from 1

- **Range Count via Subtraction**:
  - Count in [low, high] = Count in [0, high] - Count in [0, low-1]
  - Formula: ⌊(high+1)/2⌋ - ⌊(low-1+1)/2⌋
  - Simplifies to: ⌊(high+1)/2⌋ - ⌊low/2⌋

- **Why This Works**:
  - ⌊(high+1)/2⌋ counts odd numbers from 1 to high
  - ⌊low/2⌋ counts odd numbers from 1 to low-1
  - Subtraction gives count in [low, high]

- **Floor Division Logic**:
  - For even n: ⌊(n+1)/2⌋ = n/2 (e.g., n=4 → 5/2 = 2)
  - For odd n: ⌊(n+1)/2⌋ = (n+1)/2 (e.g., n=5 → 6/2 = 3)
  - This naturally handles both parities

- **Example Walkthrough** (low=3, high=7):
  - Odds from 0 to 7: ⌊8/2⌋ = 4 (numbers: 1,3,5,7)
  - Odds from 0 to 2: ⌊3/2⌋ = 1 (numbers: 1)
  - Odds from 3 to 7: 4 - 1 = 3 ✓ (numbers: 3,5,7)

- **Example Walkthrough** (low=8, high=10):
  - Odds from 0 to 10: ⌊11/2⌋ = 5 (numbers: 1,3,5,7,9)
  - Odds from 0 to 7: ⌊8/2⌋ = 4 (numbers: 1,3,5,7)
  - Odds from 8 to 10: 5 - 4 = 1 ✓ (number: 9)

- **Edge Cases Handled**:
  - Both even: ⌊(even+1)/2⌋ - ⌊even/2⌋ gives correct count
  - Both odd: formula accounts for inclusive boundaries
  - Single number: when low=high, returns 1 if odd, 0 if even

# Complexity
- Time complexity: $$O(1)$$
  - Two division operations
  - Two floor operations
  - One subtraction
  - All constant time

- Space complexity: $$O(1)$$
  - No additional data structures
  - Only arithmetic operations
  - Total: O(1)

# Code
```typescript
const countOdds = (low: number, high: number): number => 
    Math.floor((high + 1) / 2) - Math.floor(low / 2);
```