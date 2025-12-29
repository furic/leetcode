# Three Strategy Comparison | 6 Lines | O(1) | 0ms

# Intuition

This is an optimization problem with three types of items where type 3 items contribute to both requirements simultaneously. The key insight is that there are only three fundamental strategies to consider: (1) buy items separately without using type 3, (2) use type 3 items for the overlapping portion and buy separately for the remainder, or (3) buy only type 3 items to cover both requirements. By computing the cost of all three strategies and taking the minimum, we find the optimal solution.

# Approach

**Core Strategy:**
- Evaluate three distinct purchasing strategies
- Each strategy represents a different balance between using specialized items vs dual-purpose items
- Return the minimum cost among all three strategies

**Step-by-Step Process:**

**1. Strategy 1 - Complete Separation (No Type 3 Items):**
- Buy exactly `need1` items of type 1
- Buy exactly `need2` items of type 2
- Never purchase type 3 items
- Formula: `cost1 × need1 + cost2 × need2`
- Rationale: When type 3 items are expensive, buying separately may be cheaper

**2. Strategy 2 - Optimal Overlap (Partial Type 3 Usage):**
- Identify the overlap: `minNeed = min(need1, need2)`
- Buy `minNeed` type 3 items to satisfy the smaller requirement completely
- For the larger requirement, buy additional specialized items
- Remaining type 1 needed: `need1 - minNeed`
- Remaining type 2 needed: `need2 - minNeed`
- Formula: `costBoth × minNeed + cost1 × (need1 - minNeed) + cost2 × (need2 - minNeed)`
- Rationale: Use type 3 where it provides dual benefit, use specialized items for the excess

**3. Strategy 3 - Complete Overlap (Only Type 3 Items):**
- Buy `maxNeed = max(need1, need2)` type 3 items
- This simultaneously satisfies both requirements
- Formula: `costBoth × maxNeed`
- Rationale: When type 3 is cheap, buying only type 3 may be optimal even with "waste"

**4. Select Minimum Cost:**
- Compare all three strategies
- Return the minimum cost
- This exhaustively covers all reasonable purchasing patterns

**Why These Three Strategies are Sufficient:**

**Completeness Argument:**
- Any valid purchasing strategy can be expressed as:
  - x₁ items of type 1
  - x₂ items of type 2
  - x₃ items of type 3
- Constraints: x₁ + x₃ ≥ need1 and x₂ + x₃ ≥ need2

**Dominating Strategies:**
- Strategy 1: x₃ = 0 (no type 3 items)
- Strategy 2: x₃ = min(need1, need2) (type 3 covers smaller requirement exactly)
- Strategy 3: x₃ = max(need1, need2) (type 3 covers both requirements)

**Why Intermediate Values Don't Help:**
- If x₃ < min(need1, need2): Need both specialized types anyway
  - Might as well increase x₃ to min (Strategy 2) and potentially reduce cost
- If min < x₃ < max: Using type 3 for overlap but not fully
  - Either push to min (Strategy 2) or max (Strategy 3) depending on costs
- If x₃ > max: Buying unnecessary items (always wasteful)

**Greedy Insight:**
- If using type 3 at all, either:
  - Use it minimally (just for overlap) → Strategy 2
  - Use it maximally (cover everything) → Strategy 3
- No benefit to intermediate amounts

**5. Example Walkthrough (cost1=3, cost2=2, costBoth=1, need1=3, need2=2):**

**Strategy 1 (Separate):**
- Buy 3 type 1 items: 3 × 3 = 9
- Buy 2 type 2 items: 2 × 2 = 4
- Total: 9 + 4 = 13

**Strategy 2 (Partial Overlap):**
- minNeed = min(3, 2) = 2
- Buy 2 type 3 items: 2 × 1 = 2
- Remaining need1: 3 - 2 = 1
- Remaining need2: 2 - 2 = 0
- Buy 1 type 1 item: 1 × 3 = 3
- Buy 0 type 2 items: 0 × 2 = 0
- Total: 2 + 3 + 0 = 5

**Strategy 3 (Complete Overlap):**
- maxNeed = max(3, 2) = 3
- Buy 3 type 3 items: 3 × 1 = 3
- Total: 3

**Result:** min(13, 5, 3) = 3 ✓

**Verification:**
- 3 type 3 items contribute 3 to need1 (≥ 3 ✓) and 3 to need2 (≥ 2 ✓)
- Cost is 3, which is minimal

**6. Example Walkthrough (cost1=5, cost2=4, costBoth=15, need1=2, need2=3):**

**Strategy 1:**
- Buy 2 type 1: 2 × 5 = 10
- Buy 3 type 2: 3 × 4 = 12
- Total: 10 + 12 = 22

**Strategy 2:**
- minNeed = min(2, 3) = 2
- Buy 2 type 3: 2 × 15 = 30
- Remaining: need1=0, need2=1
- Buy 0 type 1: 0
- Buy 1 type 2: 1 × 4 = 4
- Total: 30 + 0 + 4 = 34

**Strategy 3:**
- maxNeed = max(2, 3) = 3
- Buy 3 type 3: 3 × 15 = 45
- Total: 45

**Result:** min(22, 34, 45) = 22 ✓

**Insight:** Type 3 items are expensive (15) compared to specialized items (5, 4), so buying separately is optimal.

**7. Mathematical Formulation:**

**Objective:** Minimize total cost
**Variables:**
- x₁: number of type 1 items
- x₂: number of type 2 items
- x₃: number of type 3 items

**Constraints:**
- x₁ + x₃ ≥ need1
- x₂ + x₃ ≥ need2
- x₁, x₂, x₃ ≥ 0

**Cost Function:**
- Total = cost1 × x₁ + cost2 × x₂ + costBoth × x₃

**Optimal Solutions (Vertices of Feasible Region):**
- Strategy 1: (need1, need2, 0)
- Strategy 2: (need1-min, need2-min, min) where min = min(need1, need2)
- Strategy 3: (0, 0, max) where max = max(need1, need2)

**8. Why This is Optimal:**

**Linear Programming Perspective:**
- This is a linear programming problem with 2 constraints
- Optimal solution always at a vertex of the feasible region
- Our three strategies represent the three meaningful vertices
- Other vertices (like (0, need2, need1) or (need1, 0, need2)) are just permutations

**Proof Sketch:**
- Any feasible solution (x₁, x₂, x₃) satisfies constraints
- If x₃ > max(need1, need2): Reduce x₃ without affecting feasibility (always better)
- If x₃ < min(need1, need2): Need both x₁ > 0 and x₂ > 0
  - Can shift to boundary (Strategy 1 or 2) without increasing cost
- Therefore optimal is at one of our three strategies

**9. Edge Cases Handled:**

**Both needs are zero (need1=0, need2=0):**
- Strategy 1: 0 × cost1 + 0 × cost2 = 0
- Strategy 2: 0 × costBoth + 0 × cost1 + 0 × cost2 = 0
- Strategy 3: 0 × costBoth = 0
- Result: 0 ✓ (buy nothing)

**One need is zero:**
- Example: need1=5, need2=0
- Strategy 1: 5 × cost1 = only type 1 items
- Strategy 2: 0 × costBoth + 5 × cost1 + 0 × cost2 = same as Strategy 1
- Strategy 3: 5 × costBoth = only type 3 items
- Correctly chooses min(cost1 × 5, costBoth × 5) ✓

**Equal needs (need1 = need2):**
- Example: need1=4, need2=4
- Strategy 2 and 3 become similar considerations
- Correctly evaluates all options ✓

**Type 3 is free (costBoth=0):**
- Strategy 3: 0 × max(need1, need2) = 0
- Always optimal to use type 3 ✓

**10. Time and Space Analysis:**

**Time Complexity:**
- Calculate minNeed: O(1) comparison
- Calculate maxNeed: O(1) comparison
- Compute case1: O(1) arithmetic
- Compute case2: O(1) arithmetic
- Compute case3: O(1) arithmetic
- Find minimum of three values: O(1)
- Total: O(1) constant time

**Space Complexity:**
- Variables: case1, case2, case3, minNeed, maxNeed
- All are single integers: O(1)
- No arrays, no recursion, no data structures
- Total: O(1) constant space

**11. Why Dynamic Programming Not Needed:**

**Small State Space:**
- Only 2 dimensions (need1, need2)
- But we don't need to explore all combinations
- Three closed-form strategies capture optimality

**No Overlapping Subproblems:**
- Each strategy is independent
- No recursive structure to exploit
- Direct calculation is optimal

**Analytical Solution:**
- Problem has mathematical structure allowing closed-form solution
- No need for iterative approaches

**12. Alternative Approaches (Not Used):**

**Dynamic Programming:**
```typescript
const dp = Array(need1+1).fill(0).map(() => Array(need2+1).fill(Infinity));
dp[0][0] = 0;
for (let i = 0; i <= need1; i++) {
    for (let j = 0; j <= need2; j++) {
        // Try each item type...
    }
}
```
- Time: O(need1 × need2 × 3)
- Space: O(need1 × need2)
- Overkill for this problem

**Exhaustive Search:**
- Try all combinations of (x₁, x₂, x₃)
- Exponential time
- Completely unnecessary

**Integer Linear Programming:**
- Formulate as ILP and solve
- Requires external solver
- Our analytical approach is simpler and faster

# Complexity

- Time complexity: $$O(1)$$
  - Three independent cost calculations
  - Two min/max operations on two numbers: O(1) each
  - One min operation on three numbers: O(1)
  - All arithmetic operations: O(1)
  - No loops, no recursion
  - Overall: constant time

- Space complexity: $$O(1)$$
  - Five input parameters
  - Five local variables (case1, case2, case3, minNeed, maxNeed)
  - No arrays or data structures
  - No recursion stack
  - Overall: constant space

# Code
```typescript []
const minimumCost = (cost1: number, cost2: number, costBoth: number, need1: number, need2: number): number => {
    const case1 = cost1 * need1 + cost2 * need2;

    const minNeed = Math.min(need1, need2);
    const case2 = costBoth * minNeed + cost1 * (need1 - minNeed) + cost2 * (need2 - minNeed);

    const maxNeed = Math.max(need1, need2);
    const case3 = costBoth * maxNeed;

    return Math.min(case1, case2, case3);
};
```