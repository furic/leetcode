# Top-3 Per Remainder | 52 Lines | O(n) | 9ms

# Intuition

For a sum of three numbers to be divisible by 3, their remainders (mod 3) must sum to 0 or a multiple of 3. Instead of checking all O(n³) triplets, we can group numbers by their remainder (0, 1, or 2) and only check the four valid remainder combinations: (0,0,0), (1,1,1), (2,2,2), and (0,1,2). By tracking only the top 3 values in each remainder class, we can find the maximum sum efficiently.

# Approach

**Core Strategy:**
- Classify all numbers by their remainder when divided by 3
- Maintain the top 3 largest values for each remainder class (0, 1, 2)
- Check only the four valid remainder combinations that sum to a multiple of 3
- Return the maximum sum among all valid combinations

**Step-by-Step Process:**

**1. Understand Valid Remainder Combinations:**
- For sum to be divisible by 3, remainders must satisfy: (r₁ + r₂ + r₃) % 3 = 0
- Only four combinations work:
  - (0, 0, 0): 0 + 0 + 0 = 0 ≡ 0 (mod 3) ✓
  - (1, 1, 1): 1 + 1 + 1 = 3 ≡ 0 (mod 3) ✓
  - (2, 2, 2): 2 + 2 + 2 = 6 ≡ 0 (mod 3) ✓
  - (0, 1, 2): 0 + 1 + 2 = 3 ≡ 0 (mod 3) ✓
- All other combinations give remainders 1 or 2, which don't work

**2. Initialize Top-3 Tracking Variables:**
- For remainder 0: `largestRem0`, `secondRem0`, `thirdRem0`
- For remainder 1: `largestRem1`, `secondRem1`, `thirdRem1`
- For remainder 2: `largestRem2`, `secondRem2`, `thirdRem2`
- Initialize all to 0 (serves as sentinel for "not enough values")
- We only need top 3 because we're selecting exactly 3 numbers

**3. Process Each Number:**
- For each number in the array:
  - Calculate its remainder: `num % 3`
  - Insert it into the appropriate top-3 list, maintaining sorted order (largest to smallest)

**4. Maintain Top-3 in Sorted Order:**
- For each remainder class, use cascading comparison:
  - If num > largest: shift values down (third←second, second←largest), update largest
  - Else if num > second: shift third←second, update second
  - Else if num > third: update third only
- This maintains the three largest values in descending order
- Shifting ensures we don't lose values when inserting a new maximum

**5. Why Only Top 3 Matters:**
- We're selecting exactly 3 numbers from each valid combination
- To maximize sum, we want the 3 largest available values
- Combinations like (0,0,0) need the 3 largest remainder-0 values
- Combination (0,1,2) needs the largest from each class
- No need to track more than top 3 per class

**6. Check Valid Combination (0,0,0):**
- Need 3 numbers all with remainder 0
- Check if we have at least 3: `thirdRem0 !== 0`
- If yes, sum = largest + second + third from remainder 0
- Update maxSum if this is better

**7. Check Valid Combination (1,1,1):**
- Need 3 numbers all with remainder 1
- Check if we have at least 3: `thirdRem1 !== 0`
- If yes, sum = largest + second + third from remainder 1
- Update maxSum if this is better

**8. Check Valid Combination (2,2,2):**
- Need 3 numbers all with remainder 2
- Check if we have at least 3: `thirdRem2 !== 0`
- If yes, sum = largest + second + third from remainder 2
- Update maxSum if this is better

**9. Check Valid Combination (0,1,2):**
- Need 1 number from each remainder class
- Check if all three classes have at least one: all `largest` values !== 0
- If yes, sum = largestRem0 + largestRem1 + largestRem2
- Update maxSum if this is better

**10. Return Result:**
- If no valid combination exists, maxSum remains 0
- Otherwise, maxSum contains the maximum sum divisible by 3

**Why This Approach Works:**

**Mathematical Correctness:**
- Modular arithmetic: (a + b + c) % 3 = ((a % 3) + (b % 3) + (c % 3)) % 3
- Only four remainder combinations sum to 0 mod 3
- By checking these exhaustively, we cover all valid triplets

**Greedy Optimality:**
- Within each valid combination, taking the largest values maximizes the sum
- No need to consider smaller values since we want maximum
- Top-3 tracking ensures we have the best candidates

**Efficiency Gain:**
- Instead of O(n³) brute force checking all triplets
- We reduce to O(n) scanning + O(1) checking 4 combinations
- Space-efficient: only 9 variables instead of storing all values

**11. Example Walkthrough (nums = [4,2,3,1]):**

**Process numbers and classify:**
- 4 % 3 = 1 → remainder 1: largestRem1 = 4
- 2 % 3 = 2 → remainder 2: largestRem2 = 2
- 3 % 3 = 0 → remainder 0: largestRem0 = 3
- 1 % 3 = 1 → remainder 1: secondRem1 = 1

**Final top-3 state:**
- Remainder 0: [3, 0, 0] (only one value)
- Remainder 1: [4, 1, 0] (two values)
- Remainder 2: [2, 0, 0] (only one value)

**Check combinations:**
- (0,0,0): Need 3, have 1 → skip (thirdRem0 = 0)
- (1,1,1): Need 3, have 2 → skip (thirdRem1 = 0)
- (2,2,2): Need 3, have 1 → skip (thirdRem2 = 0)
- (0,1,2): Have 1 of each → sum = 3 + 4 + 2 = 9 ✓

**Alternative valid triplet check:**
- (2,3,1): remainders are (2,0,1) → 2+0+1=3 ≡ 0 (mod 3) ✓
- Sum = 2+3+1 = 6
- But we found (4,2,3) with sum 9, which is better

**Result: 9** ✓

**12. Example Walkthrough (nums = [2,1,5]):**

**Process numbers:**
- 2 % 3 = 2 → remainder 2: largestRem2 = 2
- 1 % 3 = 1 → remainder 1: largestRem1 = 1
- 5 % 3 = 2 → remainder 2: secondRem2 = 2 (wait, 5 > 2, so largestRem2 = 5, secondRem2 = 2)

**Final state:**
- Remainder 0: [0, 0, 0] (none)
- Remainder 1: [1, 0, 0] (one value)
- Remainder 2: [5, 2, 0] (two values)

**Check combinations:**
- (0,0,0): No values with remainder 0 → skip
- (1,1,1): Need 3, have 1 → skip
- (2,2,2): Need 3, have 2 → skip
- (0,1,2): largestRem0 = 0 → skip (no remainder 0 values)

**Result: 0** ✓ (no valid triplet exists)

**13. Cascading Update Logic Detail:**

**Why Cascading Matters:**
- When inserting a new largest, we must preserve the old largest (becomes second)
- When inserting a new second, we must preserve the old second (becomes third)
- Without cascading, we'd lose valuable data

**Example:**
- Current state: [10, 8, 6]
- Insert 12: [12, 10, 8] (6 is dropped, which is fine)
- Insert 9: [12, 10, 9] (8 is dropped, which is fine)
- This maintains the top 3 correctly

**14. Edge Cases Handled:**

**Insufficient values in a class:**
- Checked by testing if third value is 0
- If thirdRem0 = 0, we don't have 3 values with remainder 0
- Prevents invalid triplet formation

**All numbers in one remainder class:**
- Example: [3, 6, 9] all have remainder 0
- Only (0,0,0) combination is valid
- Correctly returns 3 + 6 + 9 = 18

**Exactly 3 numbers total:**
- Minimal case for forming a triplet
- If their remainders sum correctly, we get the sum
- Otherwise, return 0

**All small numbers:**
- Algorithm doesn't discriminate based on magnitude
- Correctly finds maximum even if all numbers are small

**Mixed positive values:**
- All values are positive per constraints
- No special handling needed for negatives

**15. Why 0 as Sentinel Works:**

**Initialization:**
- All top-3 variables start at 0
- Since nums[i] >= 1 (per constraints), 0 indicates "no value yet"
- When we check `thirdRem0 !== 0`, it verifies we have at least 3 values

**No Confusion:**
- 0 cannot be in nums (constraint: nums[i] >= 1)
- Safe to use as sentinel without ambiguity

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through n numbers: O(n)
  - For each number, compute remainder: O(1)
  - Insert into top-3 with cascading: O(1) constant comparisons
  - Check 4 combinations at end: O(1)
  - Overall: O(n) linear in array size

- Space complexity: $$O(1)$$
  - Nine variables for top-3 tracking: O(1)
  - One variable for maxSum: O(1)
  - No arrays, no recursion, no data structures
  - Space usage independent of input size
  - Overall: O(1) constant space

# Code
```typescript []
const maximumSum = (nums: number[]): number => {
    let largestRem0 = 0, secondRem0 = 0, thirdRem0 = 0;
    let largestRem1 = 0, secondRem1 = 0, thirdRem1 = 0;
    let largestRem2 = 0, secondRem2 = 0, thirdRem2 = 0;

    for (const num of nums) {
        const remainder = num % 3;

        if (remainder === 0) {
            if (num > largestRem0) {
                thirdRem0 = secondRem0;
                secondRem0 = largestRem0;
                largestRem0 = num;
            } else if (num > secondRem0) {
                thirdRem0 = secondRem0;
                secondRem0 = num;
            } else if (num > thirdRem0) {
                thirdRem0 = num;
            }
        } else if (remainder === 1) {
            if (num > largestRem1) {
                thirdRem1 = secondRem1;
                secondRem1 = largestRem1;
                largestRem1 = num;
            } else if (num > secondRem1) {
                thirdRem1 = secondRem1;
                secondRem1 = num;
            } else if (num > thirdRem1) {
                thirdRem1 = num;
            }
        } else {
            if (num > largestRem2) {
                thirdRem2 = secondRem2;
                secondRem2 = largestRem2;
                largestRem2 = num;
            } else if (num > secondRem2) {
                thirdRem2 = secondRem2;
                secondRem2 = num;
            } else if (num > thirdRem2) {
                thirdRem2 = num;
            }
        }
    }

    let maxSum = 0;

    if (thirdRem0 !== 0) {
        maxSum = Math.max(maxSum, largestRem0 + secondRem0 + thirdRem0);
    }

    if (thirdRem1 !== 0) {
        maxSum = Math.max(maxSum, largestRem1 + secondRem1 + thirdRem1);
    }

    if (thirdRem2 !== 0) {
        maxSum = Math.max(maxSum, largestRem2 + secondRem2 + thirdRem2);
    }

    if (largestRem0 !== 0 && largestRem1 !== 0 && largestRem2 !== 0) {
        maxSum = Math.max(maxSum, largestRem0 + largestRem1 + largestRem2);
    }

    return maxSum;
};
```