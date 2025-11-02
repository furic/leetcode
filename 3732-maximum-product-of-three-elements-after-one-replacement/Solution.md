# Greedy Absolute Value Pairing | 3 Lines | O(n log n) | 180ms

# Intuition
To maximize the product of three numbers, we want to use numbers with the largest absolute values. Since we can replace one element with any value in [-10^5, 10^5], the optimal strategy is to choose the two largest absolute values from the array and multiply them with 10^5 (the maximum replacement value). The sign handling works out because multiplying two numbers of same sign gives positive, and we multiply by the positive maximum.

# Approach
**Greedy Selection by Absolute Value:**
- Sort array by absolute value in descending order
- Take the two largest absolute values
- Multiply by the maximum allowed replacement (10^5)
- The sign arithmetic automatically works out for maximum product

**Step-by-Step Process:**

1. **Sort by Absolute Value:**
   - Sort descending: `nums.sort((a, b) => Math.abs(b) - Math.abs(a))`
   - Largest absolute values appear first
   - Example: [-5, 7, 0] → [7, -5, 0] (by |value|)

2. **Select Two Largest:**
   - Take `nums[0]` and `nums[1]` (largest absolute values)
   - These will contribute most to product magnitude

3. **Calculate Maximum Product:**
   - Multiply: `|nums[0]| × |nums[1]| × 10^5`
   - Use absolute values to ensure positive result
   - 10^5 is the maximum replacement value allowed

4. **Return Result:**
   - This greedy choice gives maximum product

**Why This Works:**

**Absolute Value Principle:**
- Product magnitude = product of absolute values
- To maximize |product|, use largest |values|
- Signs can be managed through replacement choice

**Optimal Replacement:**
- Always replace the element NOT in top 2 absolute values
- Replace with ±10^5 (sign chosen to maximize product)
- Since we multiply absolute values, sign is implicit

**Sign Handling:**
- Two positive: product positive → multiply by +10^5
- Two negative: product positive → multiply by +10^5
- One positive, one negative: product negative → replace to make positive
- Final formula using |values| × 10^5 captures this

**Example Walkthrough (nums = [-5,7,0]):**

**Sort by |value|:**
- |-5| = 5, |7| = 7, |0| = 0
- Sorted: [7, -5, 0]

**Calculate:**
- Take top 2: 7 and -5
- Product: |7| × |-5| × 10^5 = 7 × 5 × 100000 = 3,500,000

**Verification:**
- Actual optimal: replace 0 with -10^5
- Array becomes: [-5, 7, -10^5]
- Product: (-5) × 7 × (-10^5) = 35 × 10^5 = 3,500,000 ✓

**Example 2 (nums = [-4,-2,-1,-3]):**

**Sort by |value|:**
- All negative, sort by absolute value: [-4, -3, -2, -1]

**Calculate:**
- Top 2: -4 and -3
- Product: |-4| × |-3| × 10^5 = 4 × 3 × 100000 = 1,200,000

**Verification:**
- Replace -2 or -1 with +10^5
- Use -4, 10^5, -3 → product = (-4) × 10^5 × (-3) = 12 × 10^5 = 1,200,000 ✓

**Example 3 (nums = [0,10,0]):**

**Sort by |value|:**
- [10, 0, 0]

**Calculate:**
- Top 2: 10 and 0
- Product: |10| × |0| × 10^5 = 10 × 0 × 100000 = 0

**Verification:**
- Must use at least one 0 (can only replace one element)
- Any product with 0 = 0 ✓

**Key Insights:**

**Why Top 2 Absolute Values:**
- Maximize product magnitude
- Third element is the replacement (always choose max = 10^5)
- Can't do better than two largest existing values

**Why Not Consider Signs Initially:**
- Absolute value multiplication captures magnitude
- Sign of replacement (±10^5) chosen optimally by problem
- Final product always uses best sign combination

**Edge Cases:**

**All positive:**
- nums = [1,2,3]
- Top 2: 3, 2
- Product: 3 × 2 × 10^5 = 600,000

**All negative:**
- Handled by absolute values
- Example shows this works

**Mix of positive and negative:**
- Absolute values naturally pick largest magnitudes
- Works regardless of sign distribution

**Contains zeros:**
- If both top 2 are non-zero, okay
- If top 2 includes zero, product is zero (unavoidable)

**Large values close to ±10^5:**
- Still want to use them
- Replacement adds third factor

**Alternative Approaches:**

**Check all combinations:**
```typescript
// Try replacing each element, check all triplets
let max = -Infinity;
for (replacement position)
    for (each triplet)
        max = Math.max(max, product);
```
- O(n^4) time
- Unnecessary complexity

**Consider sign cases separately:**
- Could explicitly handle (+,+,+), (+,+,-), etc.
- More complex, same result
- Absolute value approach is cleaner

**Mathematical optimization:**
- Could derive formula for each case
- Absolute value approach implicitly does this

# Complexity
- Time complexity: $$O(n \log n)$$ for sorting
- Space complexity: $$O(1)$$ if sorting in-place, else O(n)

# Code
```typescript
const maxProduct = (nums: number[]): number => {
    nums.sort((a, b) => Math.abs(b) - Math.abs(a)); 
    return Math.abs(nums[0]) * Math.abs(nums[1]) * 1e5;
};
```