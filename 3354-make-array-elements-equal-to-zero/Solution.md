# Balance Point Analysis | 24 Lines | O(n) | 50ms

# Intuition
The ball bounces between numbers, decrementing them until all reach zero. For the process to clear all numbers, the starting position must be a "balance point" where the sum of numbers on the left approximately equals the sum on the right. If perfectly balanced, both directions work; if off by 1, only one direction works.

# Approach
**Prefix Sum Balance Check:**
- Calculate total sum to enable left/right sum tracking
- For each zero position, check if it's a valid balance point
- A position is valid if |leftSum - rightSum| ≤ 1
- Count valid directions based on the difference

**Step-by-Step Process:**

1. **Precompute Total Sum:**
   - `totalSum = Σnums[i]` for all elements
   - Enables efficient left/right sum calculation
   - Initialize `leftSum = 0`, `rightSum = totalSum`

2. **Scan Array for Zero Positions:**
   - Only positions with `nums[i] == 0` can be starting points
   - At each position, maintain running sums:
     - `leftSum` = sum of elements to the left (indices < i)
     - `rightSum` = sum of elements to the right (indices > i)

3. **Balance Condition Check:**
   - Calculate `difference = |leftSum - rightSum|`
   
   **If difference == 0 (perfect balance):**
   - Both directions (left and right) are valid
   - The ball will bounce symmetrically and clear all numbers
   - Contribute 2 to valid count
   
   **If difference == 1 (off by 1):**
   - Only one direction is valid
   - Starting toward the heavier side allows proper clearing
   - Contribute 1 to valid count
   
   **If difference > 1:**
   - Neither direction is valid
   - Imbalance too large for ball to clear all numbers
   - Contribute 0

4. **Update Running Sums:**
   - After checking position i:
     - `leftSum += nums[i]` (position i becomes part of "left" for future positions)
     - `rightSum -= nums[i]` (position i no longer part of "right")

5. **Return Total Count:**
   - Sum of all valid selections across all zero positions

**Why This Works:**

**Balance Intuition:**
- Ball must "work off" all numbers on both sides
- If one side has significantly more weight, ball gets stuck
- Difference ≤ 1 allows the ball to eventually clear everything

**Mathematical Reasoning:**
- Perfect balance (diff=0): Ball bounces symmetrically, both directions equivalent
- Off by 1 (diff=1): Ball can compensate by bouncing one extra time on heavier side
- Off by 2+: Ball cannot generate enough bounces to clear the heavier side

**Example Walkthrough (nums = [1,0,2,0,3]):**

- totalSum = 1+0+2+0+3 = 6
- Initial: leftSum=0, rightSum=6

**Position 0 (value=1):**
- Not zero, skip
- Update: leftSum=1, rightSum=5

**Position 1 (value=0):**
- Zero position! Check balance
- leftSum=1, rightSum=5
- difference = |1-5| = 4 > 1
- Not valid → count += 0

**Position 2 (value=2):**
- Not zero, skip
- Update: leftSum=3, rightSum=3

**Position 3 (value=0):**
- Zero position! Check balance
- leftSum=3, rightSum=3
- difference = |3-3| = 0 == 0
- Perfect balance! → count += 2 ✓

**Position 4 (value=3):**
- Not zero, skip

**Total:** 2 ✓

**Example 2 (nums = [2,3,4,0,4,1,0]):**

- totalSum = 14
- Check zeros at positions 3 and 6
- Position 3: left=9, right=5, diff=4 > 1 → invalid
- Position 6: left=14, right=0, diff=14 > 1 → invalid
- Total: 0 ✓

**Key Insights:**

**Why Difference ≤ 1:**
- The ball's bouncing mechanism allows it to "even out" small imbalances
- Each bounce processes exactly one unit from a number
- Difference of 1 means one side has one extra unit, manageable
- Difference of 2+ creates insurmountable imbalance

**Direction Validity:**
- When diff=0: symmetric, both directions work
- When diff=1: must start toward heavier side (but problem counts both as "1 valid selection")
  - Actually, starting in either direction works, but the behavior differs slightly
  - The problem's validation accounts for this complexity

**Edge Cases:**

**All zeros:**
- Every position is a starting point
- All positions perfectly balanced (diff=0)
- Result: 2n (where n is array length)

**Single zero:**
- Only one candidate position
- Check its balance

**No zeros:**
- No valid starting positions
- Result: 0

**Zeros at edges:**
- leftSum or rightSum may be 0
- Balance check still works correctly

# Complexity
- Time complexity: $$O(n)$$ - single pass to compute sum, single pass to check positions
- Space complexity: $$O(1)$$ - only using a few variables for tracking

# Code
```typescript
const countValidSelections = (nums: number[]): number => {
    let validCount = 0;
    const totalSum = nums.reduce((acc, val) => acc + val, 0);
    let leftSum = 0;
    let rightSum = totalSum;

    for (let index = 0; index < nums.length; index++) {
        if (nums[index] === 0) {
            const difference = Math.abs(leftSum - rightSum);
            
            if (difference <= 1) {
                validCount += (difference === 0) ? 2 : 1;
            }
        } else {
            leftSum += nums[index];
            rightSum -= nums[index];
        }
    }

    return validCount;
};
```