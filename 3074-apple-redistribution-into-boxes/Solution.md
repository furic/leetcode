# Greedy Largest First | 9 Lines | O(m log m) | 1ms

# Intuition

To minimize the number of boxes needed, we should prioritize using boxes with the largest capacity first. This greedy approach ensures we pack as many apples as possible per box, reducing the total box count. Since apples can be split across boxes, we simply need to fill boxes until the total capacity meets or exceeds the total number of apples.

# Approach

**Core Strategy:**
- Calculate total apples to determine target capacity needed
- Sort boxes by capacity in descending order (largest first)
- Greedily select boxes starting from largest until all apples are accommodated
- Each box selection reduces remaining apples by that box's capacity

**Step-by-Step Process:**

**1. Calculate Total Apples:**
- Sum all values in the apple array using reduce
- This gives us the total capacity needed across all boxes
- Store in `totalApples` variable
- This is our target: we need boxes with combined capacity ≥ totalApples

**2. Sort Boxes by Capacity (Descending):**
- Sort the capacity array in descending order (largest to smallest)
- Use comparator: `(a, b) => b - a`
- This puts the most efficient boxes (highest capacity) first
- Greedy principle: larger boxes minimize the number of boxes needed
- Sorting modifies the capacity array in-place

**3. Initialize Tracking Variables:**
- `remainingApples`: Start with totalApples, decrements as we add boxes
- `boxesUsed`: Counter starting at 0, increments for each box selected
- These track progress toward packing all apples

**4. Greedy Box Selection:**
- Loop while `remainingApples > 0` (still have apples to pack)
- In each iteration:
  - Take the next largest available box (at index boxesUsed)
  - Subtract that box's capacity from remainingApples
  - Increment boxesUsed counter
- Continue until remainingApples ≤ 0 (all apples can be accommodated)

**5. Why Greedy Works:**
- Goal: Minimize number of boxes
- Strategy: Maximize capacity per box selected
- By always choosing the largest remaining box, we pack most efficiently
- No benefit to choosing smaller boxes when larger ones are available
- Proof of optimality: Any other ordering uses same or more boxes

**6. Handle Over-Packing:**
- The loop continues even if the last box exceeds remaining capacity
- This is correct: we still need that box even if it's not fully utilized
- Example: 5 apples remaining, box capacity 7 → still need 1 box
- The condition `remainingApples > 0` handles this naturally

**7. Mathematical Justification:**

**Why This is Optimal:**
- Let boxes be sorted: c₁ ≥ c₂ ≥ ... ≥ cₘ
- To pack T total apples with minimum boxes:
- Best case: Use k boxes where c₁ + c₂ + ... + cₖ ≥ T and c₁ + ... + cₖ₋₁ < T
- Any other selection of k boxes has total capacity ≤ sum of k largest
- Therefore, greedy selection achieves minimum k

**Exchange Argument:**
- Suppose optimal solution uses box i with capacity cᵢ
- But there exists unused box j with cⱼ > cᵢ
- Swapping j for i gives same or better solution
- Contradiction: therefore optimal must use largest boxes first

**8. Example Walkthrough (apple = [1,3,2], capacity = [4,3,1,5,2]):**

**Calculate total:**
- totalApples = 1 + 3 + 2 = 6

**Sort capacity descending:**
- Before: [4,3,1,5,2]
- After: [5,4,3,2,1]

**Greedy selection:**
- Iteration 1:
  - remainingApples = 6
  - Take box capacity[0] = 5
  - remainingApples = 6 - 5 = 1
  - boxesUsed = 1
- Iteration 2:
  - remainingApples = 1 > 0, continue
  - Take box capacity[1] = 4
  - remainingApples = 1 - 4 = -3
  - boxesUsed = 2
- remainingApples ≤ 0, stop

**Result: 2 boxes** ✓

**Verification:**
- Boxes with capacity 5 and 4 give total capacity 9
- 9 ≥ 6 apples, so sufficient
- No single box has capacity ≥ 6, so need at least 2 boxes
- Therefore 2 is optimal

**9. Example Walkthrough (apple = [5,5,5], capacity = [2,4,2,7]):**

**Calculate total:**
- totalApples = 5 + 5 + 5 = 15

**Sort capacity descending:**
- Before: [2,4,2,7]
- After: [7,4,2,2]

**Greedy selection:**
- Start: remainingApples = 15, boxesUsed = 0
- Iteration 1: remainingApples = 15 - 7 = 8, boxesUsed = 1
- Iteration 2: remainingApples = 8 - 4 = 4, boxesUsed = 2
- Iteration 3: remainingApples = 4 - 2 = 2, boxesUsed = 3
- Iteration 4: remainingApples = 2 - 2 = 0, boxesUsed = 4
- remainingApples ≤ 0, stop

**Result: 4 boxes** ✓ (all boxes needed)

**10. Edge Cases Handled:**

**Single box sufficient:**
- Example: apple = [5], capacity = [10]
- totalApples = 5, largest box = 10
- One iteration: 5 - 10 = -5 ≤ 0, boxesUsed = 1 ✓

**Exact fit:**
- Example: apple = [3,2], capacity = [5]
- totalApples = 5, first box = 5
- One iteration: 5 - 5 = 0, boxesUsed = 1 ✓

**Need all boxes:**
- When sum of all capacities barely exceeds total apples
- Algorithm naturally uses all boxes

**No apples:**
- totalApples = 0
- Loop never executes (remainingApples = 0, not > 0)
- Return boxesUsed = 0 ✓

**11. Why Sorting is Necessary:**

**Without Sorting:**
- Might pick small boxes first
- Requires more boxes to reach total capacity
- Example: capacities [1,2,3], apples = 5
  - Without sort: 1+2+3 = 3 boxes (if picked in order)
  - With sort [3,2,1]: 3+2 = 2 boxes ✓

**Sorting Guarantees:**
- We always examine largest boxes first
- Minimizes iterations (box count)
- No way to do better than sorted order

# Complexity

- Time complexity: $$O(n + m \log m)$$
  - n = length of apple array
  - m = length of capacity array
  - Calculating totalApples: O(n) to sum all apple values
  - Sorting capacity array: O(m log m) using standard comparison sort
  - Greedy selection loop: O(m) worst case if we need all boxes
  - Overall: O(n + m log m)
  - Dominated by sorting when m is large

- Space complexity: $$O(1)$$ or $$O(\log m)$$
  - Sorting is typically in-place: O(1) space
  - Some sort implementations use O(log m) for recursion stack
  - Variables (totalApples, remainingApples, boxesUsed): O(1)
  - No additional data structures needed
  - Overall: O(1) auxiliary space excluding sort

# Code
```typescript []
const minimumBoxes = (apple: number[], capacity: number[]): number => {
    const totalApples = apple.reduce((sum, appleCount) => sum + appleCount, 0);

    capacity.sort((a, b) => b - a);

    let remainingApples = totalApples;
    let boxesUsed = 0;
    
    while (remainingApples > 0) {
        remainingApples -= capacity[boxesUsed];
        boxesUsed++;
    }

    return boxesUsed;
};
```