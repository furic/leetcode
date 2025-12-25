# Greedy Sort Selection | 7 Lines | O(n log n) | 230ms

# Intuition

To maximize happiness sum, we should greedily select children with the highest happiness values first. Since each selection decrements all unselected children's happiness by 1, selecting high-value children early captures their full value before they decay. By sorting in descending order and processing sequentially, we can efficiently track the decrement effect: a child selected at turn i has been decremented i times by previous selections.

# Approach

**Core Strategy:**
- Sort children by happiness in descending order (highest first)
- Select k children sequentially from the sorted array
- For each child at position i, their effective happiness is original - i (accounting for i previous decrements)
- Sum the effective happiness values, ensuring non-negativity

**Step-by-Step Process:**

**1. Sort Happiness Array in Descending Order:**
- Use `sort((a, b) => b - a)` to arrange children from highest to lowest happiness
- This ordering ensures we consider the most valuable children first
- Greedy principle: Selecting highest values early maximizes total before decay
- After sorting, happiness[0] has the maximum value, happiness[1] second-highest, etc.

**2. Initialize Total Happiness Counter:**
- Create `totalHappiness` variable starting at 0
- This accumulates the sum of effective happiness values
- Will be returned as the final answer

**3. Select k Children Sequentially:**
- Iterate through the first k positions in sorted array
- Use loop variable `turn` (0 to k-1) to track selection order
- Each turn represents one child selection
- Turn number also represents how many previous decrements occurred

**4. Calculate Effective Happiness for Each Selection:**
- At turn i, the child at happiness[i] is being selected
- Original happiness: `happiness[i]`
- Number of decrements: `turn` (one decrement per previous selection)
- Effective happiness: `happiness[i] - turn`
- Apply floor at 0: `Math.max(0, happiness[i] - turn)`
- This ensures happiness never goes negative

**5. Why Effective Happiness Formula Works:**

**Decrement Tracking:**
- When we select the 1st child (turn 0): No previous selections, decrement = 0
- When we select the 2nd child (turn 1): 1 previous selection decremented it once
- When we select the 3rd child (turn 2): 2 previous selections decremented it twice
- Pattern: Child selected at turn i has been decremented i times

**Mathematical Justification:**
- Initially: child has happiness[i]
- After turn 0 selection: happiness[i] - 1 (if not selected)
- After turn 1 selection: happiness[i] - 2 (if not selected)
- ...
- At turn i: happiness[i] - i (this child is now being selected)

**6. Accumulate Total Happiness:**
- Add each effective happiness value to totalHappiness
- Even if effective happiness is 0, we still "select" that child
- The selection counts toward the k requirement

**7. Return Final Sum:**
- After k selections, return totalHappiness
- This represents the maximum achievable happiness sum

**Why Greedy Approach is Optimal:**

**Proof Sketch:**
- Consider optimal solution that doesn't select highest child first
- Let's say it selects child with value V instead of child with value H where H > V
- If we swap these selections to select H first:
  - H contributes more initially
  - V is decremented one more time but H - V > 1 for most cases
  - Or at worst, the swap maintains the same total
- By induction, sorting and selecting in order is optimal

**Exchange Argument:**
- Suppose optimal solution selects child j before child i where happiness[i] > happiness[j]
- At time t₁, we select j: contributes happiness[j] - t₁
- At time t₂ > t₁, we select i: contributes happiness[i] - t₂
- If we swap: 
  - At time t₁, select i: contributes happiness[i] - t₁
  - At time t₂, select j: contributes happiness[j] - t₂
- Change in total: (happiness[i] - t₁) + (happiness[j] - t₂) - (happiness[j] - t₁) - (happiness[i] - t₂)
  = happiness[i] - t₁ + happiness[j] - t₂ - happiness[j] + t₁ - happiness[i] + t₂ = 0
- So swapping doesn't hurt, but establishes that sorted order is at least as good
- Combined with all possible swaps, sorted order is optimal

**8. Example Walkthrough (happiness = [1,2,3], k = 2):**

**Sort descending:**
- Original: [1, 2, 3]
- After sort: [3, 2, 1]

**Selection process:**
- Turn 0: Select happiness[0] = 3
  - Effective happiness: max(0, 3 - 0) = 3
  - totalHappiness = 0 + 3 = 3
  - Remaining unselected: [2, 1] become [1, 0] after decrement
  
- Turn 1: Select happiness[1] = 2
  - Effective happiness: max(0, 2 - 1) = 1
  - totalHappiness = 3 + 1 = 4
  - Remaining unselected: [1] becomes [0] after decrement

**Result: 4** ✓

**Verification:**
- We selected children with original happiness 3 and 2
- Child with happiness 3 contributed 3 (no decrements)
- Child with happiness 2 was decremented once before selection, contributed 1
- Total: 3 + 1 = 4 ✓

**9. Example Walkthrough (happiness = [1,1,1,1], k = 2):**

**Sort descending:**
- Already sorted (all equal): [1, 1, 1, 1]

**Selection process:**
- Turn 0: Select happiness[0] = 1
  - Effective: max(0, 1 - 0) = 1
  - totalHappiness = 1
  
- Turn 1: Select happiness[1] = 1
  - Effective: max(0, 1 - 1) = 0
  - totalHappiness = 1 + 0 = 1

**Result: 1** ✓

**Verification:**
- All children have happiness 1
- First selection gets full value: 1
- Second selection's child was decremented once: 1 - 1 = 0
- Total: 1 + 0 = 1 ✓

**10. Example Walkthrough (happiness = [2,3,4,5], k = 1):**

**Sort descending:**
- Original: [2, 3, 4, 5]
- After sort: [5, 4, 3, 2]

**Selection process:**
- Turn 0: Select happiness[0] = 5
  - Effective: max(0, 5 - 0) = 5
  - totalHappiness = 5

**Result: 5** ✓

**Verification:**
- Only selecting one child, so we pick the highest: 5
- No decrements have occurred yet
- Total: 5 ✓

**11. Why Math.max(0, ...) is Necessary:**

**Prevents Negative Values:**
- After many decrements, happiness can theoretically go negative
- Problem states happiness cannot become negative
- Math.max ensures we contribute 0 instead of negative values

**Example:**
- Original happiness: 2
- Selected at turn 5: 2 - 5 = -3
- Without max: Would subtract from total (incorrect)
- With max: Contributes 0 (correct per problem rules)

**When It Matters:**
- When k is large and some happiness values are small
- Later selections may have been decremented many times
- Ensures algorithm respects problem constraints

**12. Edge Cases Handled:**

**k = 1 (Select only one child):**
- Just select the child with maximum happiness
- No decrements to worry about
- Algorithm correctly returns the maximum value

**k = n (Select all children):**
- All children eventually selected
- First contributes full value, second loses 1, third loses 2, etc.
- Formula correctly handles this: sum of (happiness[i] - i) for i in 0..n-1

**All equal happiness:**
- Sorting doesn't change order (or arbitrary permutation)
- Formula still correct: first gets full value, rest decremented
- Works correctly as shown in Example 2

**Very small happiness values:**
- Some children may contribute 0 due to many decrements
- Math.max handles this gracefully
- Still counts toward k selections

**13. Time Complexity Breakdown:**

**Sorting:**
- JavaScript's sort uses Timsort (hybrid merge/insertion sort)
- Time: O(n log n) for n elements
- This dominates the overall complexity

**Selection Loop:**
- Iterates exactly k times
- Each iteration: O(1) operations (array access, subtraction, max, addition)
- Total loop time: O(k)

**Overall:**
- O(n log n) + O(k) = O(n log n)
- Since k ≤ n, the O(k) term is absorbed
- Dominated by sorting step

**14. Space Complexity Breakdown:**

**In-Place Sort:**
- Most sort implementations modify array in-place
- May use O(log n) stack space for recursion (Timsort)
- Considered O(1) auxiliary space or O(log n) depending on strictness

**Variables:**
- totalHappiness: O(1)
- Loop counter turn: O(1)
- effectiveHappiness: O(1)

**Overall:**
- O(1) auxiliary space (excluding sort's internal stack)
- Or O(log n) if counting sort's recursion stack

**15. Alternative Approaches (Why Not Used):**

**Simulation:**
- Could simulate the actual selection process
- Maintain array of unselected children
- After each selection, decrement all unselected
- Time: O(k × n) for k selections, each requiring n decrements
- Space: O(n) for tracking
- Too slow compared to our O(n log n) approach

**Priority Queue:**
- Use max heap to always get highest happiness
- After each selection, decrement all and rebuild heap
- Time: O(n log n + k × n) for initial build + k decrements
- More complex implementation
- Not better than sort-based approach

**Dynamic Programming:**
- Could model as DP: dp[i][j] = max happiness selecting j from first i children
- Time: O(n × k × k) for transitions
- Space: O(n × k)
- Overkill for this problem where greedy works

# Complexity

- Time complexity: $$O(n \log n)$$
  - Sorting happiness array: O(n log n) using comparison-based sort
  - Selection loop: O(k) iterations with O(1) work each
  - Overall dominated by sorting: O(n log n)
  - Note: k ≤ n, so O(k) is absorbed into O(n log n)

- Space complexity: $$O(1)$$ or $$O(\log n)$$
  - Sorting is in-place: O(1) auxiliary space
  - Some sort implementations use O(log n) recursion stack
  - Variables (totalHappiness, turn, effectiveHappiness): O(1)
  - No additional data structures
  - Overall: O(1) if not counting sort stack, O(log n) if counting

# Code
```typescript []
const maximumHappinessSum = (happiness: number[], k: number): number => {
    happiness.sort((a, b) => b - a);
    
    let totalHappiness = 0;
    
    for (let turn = 0; turn < k; turn++) {
        const effectiveHappiness = Math.max(0, happiness[turn] - turn);
        totalHappiness += effectiveHappiness;
    }
    
    return totalHappiness;
};
```