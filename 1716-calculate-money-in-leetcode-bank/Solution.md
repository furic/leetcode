# Arithmetic Progression Formula | 14 Lines | O(1) | 0ms

# Intuition
The deposit pattern follows a predictable arithmetic progression with weekly cycles. Instead of simulating each day, we can derive a closed-form mathematical formula by recognizing the pattern: each week starts $1 higher than the previous week, and within each week deposits increase by $1 per day.

# Approach
**Mathematical Formula Derivation:**
- Break down the problem into complete weeks and remaining days
- Use arithmetic series formulas to compute totals without iteration
- Apply adjustments to account for weekly increments

**Step-by-Step Analysis:**

1. **Pattern Recognition:**
   - Week 0 (days 1-7): deposits are 1, 2, 3, 4, 5, 6, 7
   - Week 1 (days 8-14): deposits are 2, 3, 4, 5, 6, 7, 8
   - Week 2 (days 15-21): deposits are 3, 4, 5, 6, 7, 8, 9
   - Week k: deposits are (k+1), (k+2), ..., (k+7)

2. **Decompose into Components:**
   - `completeWeeks = floor(n / 7)` - number of full weeks
   - `remainingDays = n % 7` - extra days in incomplete week

3. **Calculate Complete Weeks Total:**
   - Week 0 sum: 1+2+3+4+5+6+7 = 28
   - Week 1 sum: 2+3+4+5+6+7+8 = 35 = 28 + 7
   - Week 2 sum: 3+4+5+6+7+8+9 = 42 = 28 + 14
   - Week k sum: 28 + 7k
   
   **Total for complete weeks:**
   - Sum = Σ(28 + 7k) for k = 0 to completeWeeks-1
   - Sum = 28×completeWeeks + 7×(0+1+2+...+(completeWeeks-1))
   - Sum = 28×completeWeeks + 7×triangularSum(completeWeeks-1)

4. **Calculate Remaining Days Total:**
   - Start of incomplete week: completeWeeks + 1
   - Deposits: (completeWeeks+1), (completeWeeks+2), ..., (completeWeeks+remainingDays)
   - This is an arithmetic sequence with first term a₁ = completeWeeks+1, count = remainingDays
   - Sum = remainingDays × (first + last) / 2
   - Sum = remainingDays × (completeWeeks+1 + completeWeeks+remainingDays) / 2
   - Sum = remainingDays × (2×completeWeeks + remainingDays + 1) / 2

5. **Alternative Formula (Code Implementation):**
   - The code uses a different but equivalent approach:
   - `naiveSum = triangularSum(n)` - if deposits were simply 1,2,3,...,n
   - Subtract overcounting from weekly resets
   - `weeklyAdjustment = 42 × triangularSum(completeWeeks-1)`
   - `remainingDaysAdjustment = 6 × completeWeeks × remainingDays`

**Triangular Number Formula:**
- Sum of 1+2+3+...+n = n(n+1)/2
- Used frequently in arithmetic progression problems
- Bit shift optimization: `>> 1` is equivalent to division by 2

**Example Walkthrough (n = 10):**
- completeWeeks = 1, remainingDays = 3
- Week 0: 1+2+3+4+5+6+7 = 28
- Week 1 (partial): 2+3+4 = 9
- Total: 28 + 9 = 37 ✓

Using formula:
- naiveSum = triangularSum(10) = 55
- weeklyAdjustment = 42 × triangularSum(0) = 0
- remainingDaysAdjustment = 6 × 1 × 3 = 18
- Total = 55 - 0 - 18 = 37 ✓

**Why This Works:**
- Arithmetic progressions have closed-form solutions
- Avoids O(n) iteration by using O(1) mathematics
- Decomposing into weeks simplifies the calculation structure

# Complexity
- Time complexity: $$O(1)$$ - constant number of arithmetic operations
- Space complexity: $$O(1)$$ - only storing a few variables

# Code
```typescript
const totalMoney = (days: number): number => {
    const completeWeeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    
    const triangularSum = (n: number): number => (n * (n + 1)) >> 1;
    
    const naiveSum = triangularSum(days);
    const weeklyAdjustment = 42 * triangularSum(completeWeeks - 1);
    const remainingDaysAdjustment = 6 * completeWeeks * remainingDays;
    
    return naiveSum - weeklyAdjustment - remainingDaysAdjustment;
};
```