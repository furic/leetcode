# Cumulative Benefit Tracking | 14 Lines | O(n) | 5ms

# Intuition

To minimize penalty, we need to find the optimal closing time that balances two costs: staying open with no customers (penalty) versus closing when customers arrive (penalty). The key insight is to treat this as a cumulative benefit problem: track how much we gain or lose by keeping the shop open through each hour, and close at the point where cumulative benefit is maximized.

# Approach

**Core Strategy:**
- Convert penalty minimization into benefit maximization
- Track cumulative benefit: +1 for each hour with customers (gain), -1 for each hour without (loss)
- Find the hour with maximum cumulative benefit and close after that hour
- If benefit never exceeds zero, close immediately (hour 0)

**Step-by-Step Process:**

**1. Initialize Tracking Variables:**
- `maxBenefit`: Maximum cumulative benefit seen (starts at 0)
- `currentBenefit`: Running cumulative benefit (starts at 0)
- `bestClosingHour`: Hour with maximum benefit (starts at -1, representing "close at hour 0")
- These track optimal closing point as we scan through hours

**2. Understand Benefit Calculation:**
- Benefit represents net advantage of staying open versus closing immediately
- When customers arrive ('Y'): benefit +1 (we gain by being open, avoid missing customer)
- When no customers ('N'): benefit -1 (we lose by being open, incur penalty for empty shop)
- Cumulative benefit at hour h = net gain of being open through hour h

**3. Process Each Hour Sequentially:**
- Iterate through all hours from 0 to n-1
- For each hour, update currentBenefit based on customer presence
- Track when we achieve maximum cumulative benefit

**4. Update Benefit for Customer Arrival ('Y'):**
- Increment currentBenefit by 1
- Interpretation: Staying open through this hour avoids penalty
- We serve a customer, which is better than being closed and missing them
- Each 'Y' increases the value of staying open

**5. Update Benefit for No Customer ('N'):**
- Decrement currentBenefit by 1
- Interpretation: Staying open through this hour incurs penalty
- We're open with no customers, which costs us
- Each 'N' decreases the value of staying open

**6. Track Maximum Benefit:**
- Compare currentBenefit with maxBenefit after each hour
- If `currentBenefit > maxBenefit` (strictly greater):
  - Update maxBenefit = currentBenefit
  - Update bestClosingHour = current hour index
- Strict inequality ensures we get the earliest hour with maximum benefit
- This satisfies the "earliest hour" requirement

**7. Why Strict Inequality Matters:**
- Problem asks for "earliest hour" when multiple hours have same penalty
- If currentBenefit equals maxBenefit, we don't update (keep earlier hour)
- Example: If hours 2 and 4 both have benefit 5, we choose hour 2
- Guarantees earliest optimal closing time

**8. Convert Hour Index to Closing Time:**
- bestClosingHour represents the last hour we should stay open
- Closing time is the hour AFTER this, so return `bestClosingHour + 1`
- If bestClosingHour = -1 (never updated), return 0 (close immediately)
- If bestClosingHour = k, return k+1 (close after processing hour k)

**9. Why This Greedy Approach Works:**

**Mathematical Justification:**
- Let penalty(j) = penalty for closing at hour j
- penalty(j) = Σ(i=0 to j-1)[customers[i]=='N'] + Σ(i=j to n-1)[customers[i]=='Y']
- penalty(j) = open_penalties(j) + closed_penalties(j)

**Benefit Reformulation:**
- Base penalty (close at 0): penalty(0) = count of 'Y' in entire string
- benefit(j) = penalty(0) - penalty(j)
- benefit(j) represents how much better it is to close at j versus closing at 0

**Cumulative Calculation:**
- benefit through hour h = Σ(i=0 to h)[+1 if 'Y', -1 if 'N']
- This matches our currentBenefit calculation!
- Maximum benefit corresponds to minimum penalty

**10. Example Walkthrough (customers = "NNNNN"):**

**Process hours:**
- Hour 0, 'N': currentBenefit = -1 (worse than closing at 0)
- Hour 1, 'N': currentBenefit = -2
- Hour 2, 'N': currentBenefit = -3
- Hour 3, 'N': currentBenefit = -4
- Hour 4, 'N': currentBenefit = -5

**Result:**
- maxBenefit stays 0 (never exceeded)
- bestClosingHour stays -1 (never updated)
- Return: -1 + 1 = 0

**Interpretation:**
- No benefit to staying open at all (all 'N's)
- Best to close immediately at hour 0
- Penalty: 0 (no customers missed, no empty hours) ✓

**11. Example Walkthrough (customers = "YYYY"):**

**Process hours:**
- Hour 0, 'Y': currentBenefit = 1, maxBenefit = 1, bestClosingHour = 0
- Hour 1, 'Y': currentBenefit = 2, maxBenefit = 2, bestClosingHour = 1
- Hour 2, 'Y': currentBenefit = 3, maxBenefit = 3, bestClosingHour = 2
- Hour 3, 'Y': currentBenefit = 4, maxBenefit = 4, bestClosingHour = 3

**Result:**
- Maximum benefit at hour 3
- Return: 3 + 1 = 4

**Interpretation:**
- Always beneficial to stay open (all 'Y's)
- Stay open through all hours, close after the last
- Penalty: 0 (serve all customers, no empty hours) ✓

**12. Key Insights:**

**Why Cumulative Tracking Works:**
- Don't need to recalculate penalty for each possible closing time
- Single pass accumulates all necessary information
- O(n) instead of O(n²) if we calculated each closing time separately

**Interpretation of Negative Benefit:**
- If currentBenefit goes negative, staying open that long is worse than closing earlier
- We still track it to see if it recovers (might get 'Y's later)
- If benefit never exceeds 0, best to never open (return 0)

**Early vs Late Closing:**
- Early closing: Miss potential customers but avoid empty-shop penalties
- Late closing: Serve more customers but risk more empty hours
- Optimal point balances these tradeoffs

**13. Edge Cases Handled:**

**All 'Y' (customers every hour):**
- Benefit continuously increases
- Best to stay open through all hours
- Close after last hour (return n)

**All 'N' (no customers):**
- Benefit continuously decreases
- Never exceeds 0
- Best to never open (return 0)

**Mixed pattern:**
- Benefit fluctuates up and down
- Track maximum to find optimal point
- Return earliest hour with maximum benefit

**Single hour:**
- customers = "Y": return 1 (stay open)
- customers = "N": return 0 (never open)

**14. Alternative Interpretation:**

**What We're Computing:**
- For each hour h, benefit(h) = value of being open through hour h
- value = (customers served) - (empty hours)
- Customers served = count of 'Y' in [0, h]
- Empty hours = count of 'N' in [0, h]
- benefit(h) = count('Y') - count('N') in [0, h]
- This matches our +1/-1 accumulation!

**Optimal Closing:**
- Close after the hour with maximum net value
- If all hours have negative net value, don't open at all
- Earliest hour with maximum value (handle ties)

**15. Why O(n) Time:**

**Single Pass:**
- Iterate through n hours exactly once
- Each hour: constant time operations
  - Character comparison: O(1)
  - Arithmetic: O(1)
  - Comparison and update: O(1)
- No nested loops, no repeated work
- Overall: O(n)

**No Preprocessing Needed:**
- Don't need to sort or precompute anything
- Process hours in order naturally
- Accumulate information incrementally

# Complexity

- Time complexity: $$O(n)$$
  - n = length of customers string
  - Single pass through all n hours: O(n)
  - Each iteration: O(1) constant time operations
  - Character access, arithmetic, comparison: all O(1)
  - Overall: O(n) linear time

- Space complexity: $$O(1)$$
  - Three integer variables: maxBenefit, currentBenefit, bestClosingHour
  - Loop counter: O(1)
  - No additional data structures
  - No recursion stack
  - Overall: O(1) constant space

# Code
```typescript []
const bestClosingTime = (customers: string): number => {
    let maxBenefit = 0;
    let currentBenefit = 0;
    let bestClosingHour = -1;

    for (let hour = 0; hour < customers.length; hour++) {
        if (customers[hour] === "Y") {
            currentBenefit++;
        } else {
            currentBenefit--;
        }

        if (currentBenefit > maxBenefit) {
            maxBenefit = currentBenefit;
            bestClosingHour = hour;
        }
    }

    return bestClosingHour + 1;
};
```