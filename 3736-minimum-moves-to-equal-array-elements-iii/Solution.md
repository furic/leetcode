# Mathematical Formula | 5 Lines | O(n) | 0ms

# Intuition
We can only increase values, so all elements must reach the maximum value. The minimum moves equals the total deficit - the sum of differences between max and each element. This can be computed directly using a mathematical formula without simulation.

# Approach
**Direct Mathematical Calculation:**
- Find the maximum value (target all elements will reach)
- Calculate total moves as: n × max - sum
- This represents the total "gap" that needs to be filled

**Step-by-Step Process:**

1. **Find Maximum:**
   - `max = Math.max(...nums)`
   - This is the target value all elements will reach
   - Can't go lower (only increases allowed)

2. **Calculate Sum:**
   - `sum = nums.reduce((a, b) => a + b, 0)`
   - Total of all current values

3. **Apply Formula:**
   - `moves = n × max - sum`
   - Represents total increments needed

4. **Return Result:**
   - This is the minimum moves required

**Why This Works:**

**Mathematical Derivation:**
- Each element needs to reach `max`
- Element at value `nums[i]` needs `max - nums[i]` moves
- Total moves = Σ(max - nums[i]) for all i
- = Σmax - Σnums[i]
- = n × max - sum ✓

**Optimality:**
- Must reach max (can't decrease)
- Each element independently needs (max - value) moves
- No way to reduce this (each move only affects one element)

**Example Walkthrough (nums = [2,1,3]):**

- n = 3
- max = 3
- sum = 2 + 1 + 3 = 6
- moves = 3 × 3 - 6 = 9 - 6 = 3

**Verification:**
- Element 0: 2 → 3 (1 move)
- Element 1: 1 → 3 (2 moves)
- Element 2: 3 → 3 (0 moves)
- Total: 1 + 2 + 0 = 3 ✓

**Example 2 (nums = [4,4,5]):**

- n = 3
- max = 5
- sum = 4 + 4 + 5 = 13
- moves = 3 × 5 - 13 = 15 - 13 = 2

**Verification:**
- Element 0: 4 → 5 (1 move)
- Element 1: 4 → 5 (1 move)
- Element 2: 5 → 5 (0 moves)
- Total: 1 + 1 + 0 = 2 ✓

**Key Insights:**

**Why Not Decrease:**
- Problem only allows increases
- Must target maximum value
- No choice in target

**Formula Intuition:**
- If all elements were max: total = n × max
- Current total: sum
- Deficit: n × max - sum
- This deficit = moves needed

**Proof of Correctness:**
- Each move increases one element by 1
- Final state: all elements = max
- Final sum: n × max
- Moves = (n × max) - (initial sum)

**Edge Cases:**

**All equal:**
- nums = [5,5,5]
- max = 5, sum = 15, n = 3
- moves = 15 - 15 = 0 ✓

**Single element:**
- nums = [5]
- max = 5, sum = 5, n = 1
- moves = 5 - 5 = 0 ✓

**Large gap:**
- nums = [1,1,100]
- max = 100, sum = 102, n = 3
- moves = 300 - 102 = 198
- Need 99 moves each for first two elements ✓

**All same except one:**
- nums = [1,2,2,2]
- max = 2, sum = 7, n = 4
- moves = 8 - 7 = 1 ✓

**Alternative Approaches (Worse):**

**Simulation:**
```typescript
while (!allEqual(nums)) {
    const min = Math.min(...nums);
    const index = nums.indexOf(min);
    nums[index]++;
    moves++;
}
```
- O(n × diff) time where diff = max - min
- Much slower than O(n) formula

**Iterative calculation:**
```typescript
let moves = 0;
const max = Math.max(...nums);
for (const num of nums) {
    moves += max - num;
}
```
- Same complexity as formula
- More verbose, same result

**Why Formula is Best:**
- Constant number of operations
- No loops over data beyond finding max/sum
- Clean and readable
- Mathematically elegant

**Related Problem Variant:**
- If we could increase OR decrease: target = median
- If cost varies: different optimization needed
- Our problem: only increase, uniform cost

# Complexity
- Time complexity: $$O(n)$$ - finding max and sum both O(n)
- Space complexity: $$O(1)$$ - only storing a few variables

# Code
```typescript
const minMoves = (nums: number[]): number => {
    const n = nums.length;
    const max = Math.max(...nums);
    const sum = nums.reduce((a, b) => a + b, 0);
    return n * max - sum;
};
```