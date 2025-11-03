# Greedy Keep Maximum | 24 Lines | O(n) | 6ms

# Intuition
When consecutive balloons have the same color, we must remove all but one. To minimize total removal time, we should keep the balloon that takes the longest to remove and remove all others in the group. This greedy strategy ensures we pay the minimum cost for each consecutive group.

# Approach
**Greedy Single-Pass with Previous Tracking:**
- Iterate through balloons comparing each with the previous kept balloon
- When colors match, remove the cheaper balloon (keep the expensive one)
- When colors differ, update the reference balloon
- Track total removal time

**Step-by-Step Process:**

1. **Initialize Tracking:**
   - `previousBalloonIndex = 0` - tracks last kept balloon
   - `totalRemovalTime = 0` - accumulates removal costs

2. **Process Each Balloon:**
   - Start from index 1 (compare with previous)
   - For each `currentIndex`:

   **Case 1: Same color as previous**
   - Colors match: must remove one balloon
   - Compare removal times: `neededTime[current]` vs `neededTime[previous]`
   
   **If current cheaper:**
   - Remove current: `totalRemovalTime += neededTime[current]`
   - Keep previous as reference (don't update previousBalloonIndex)
   
   **If previous cheaper (or equal):**
   - Remove previous: `totalRemovalTime += neededTime[previous]`
   - Update reference: `previousBalloonIndex = current`
   - Current becomes new reference for next comparisons

   **Case 2: Different color**
   - No removal needed
   - Update reference: `previousBalloonIndex = current`
   - This balloon becomes basis for future comparisons

3. **Return Total Cost:**
   - Sum of all removal times is the minimum cost

**Why This Works:**

**Greedy Optimality:**
- Within consecutive same-color group, keep most expensive balloon
- Removing cheaper balloons minimizes total cost
- Each decision is locally optimal and globally optimal

**Single Pass Sufficiency:**
- Only need to compare consecutive balloons
- Keeping track of previous "kept" balloon ensures correctness
- No need to revisit earlier decisions

**Example Walkthrough (colors = "abaac", neededTime = [1,2,3,4,5]):**

**Initial:** prev=0, total=0

**i=1 (color='b'):**
- 'b' ≠ 'a' (colors[1] ≠ colors[0])
- Different color → update prev=1
- total=0

**i=2 (color='a'):**
- 'a' ≠ 'b' (colors[2] ≠ colors[1])
- Different color → update prev=2
- total=0

**i=3 (color='a'):**
- 'a' = 'a' (colors[3] = colors[2])
- Same color! Compare times: neededTime[3]=4 vs neededTime[2]=3
- 4 > 3 → remove previous (index 2)
- total = 0 + 3 = 3
- Update prev=3 (keep current)

**i=4 (color='c'):**
- 'c' ≠ 'a' (colors[4] ≠ colors[3])
- Different color → update prev=4
- total=3

**Result:** 3 ✓

**Visual representation:**
```
colors:     a  b  a  a  c
times:      1  2  3  4  5
kept:       ✓  ✓  ✗  ✓  ✓
removed:              3
```

**Example 2 (colors = "aabaa", neededTime = [1,2,3,4,1]):**

**Process:**
- i=1: 'a'='a', remove cheaper (time=1), total=1, prev=1
- i=2: 'b'≠'a', update prev=2, total=1
- i=3: 'a'≠'b', update prev=3, total=1
- i=4: 'a'='a', remove cheaper (time=1), total=2, prev=3

**Result:** 2 ✓

**Key Insights:**

**Why Track Previous Kept:**
- Need to compare with last balloon that wasn't removed
- Not necessarily index-1 if we removed previous balloon
- previousBalloonIndex tracks the "survivor"

**Greedy Choice:**
- Always keep most expensive within a group
- Can't do better by keeping cheaper ones
- Proof: removing K most expensive costs more than removing K cheapest

**Update Logic:**
- When removing current: don't update previousBalloonIndex (compare next with same prev)
- When removing previous: update previousBalloonIndex (current becomes new reference)
- When different colors: always update previousBalloonIndex

**Edge Cases:**

**No consecutive same colors:**
- colors = "abc"
- No removals needed
- Result: 0

**All same color:**
- colors = "aaaa", times = [1,2,3,4]
- Keep most expensive (4), remove others (1+2+3=6)
- Result: 6

**Alternating pairs:**
- colors = "aabbaa"
- Handle each pair independently
- Sum removal costs

**Groups of 3+:**
- colors = "aaabbb", times = [1,2,3,4,5,6]
- Group 'aaa': remove 1+2, keep 3 → cost=3
- Group 'bbb': remove 4+5, keep 6 → cost=9
- Total: 12

**Equal times:**
- When tied, either choice gives same cost
- Code uses >= in comparison (removes previous if equal)

**Alternative Approaches:**

**Group processing:**
```typescript
// Find all consecutive groups, remove all but max in each
```
- More explicit but same complexity
- Our approach implicitly does this

**Dynamic programming:**
- Overkill for this problem
- Greedy is sufficient and optimal

# Complexity
- Time complexity: $$O(n)$$ - single pass through array
- Space complexity: $$O(1)$$ - only using two variables

# Code
```typescript
const minCost = (colors: string, neededTime: number[]): number => {
    let previousBalloonIndex = 0;
    let totalRemovalTime = 0;

    for (let currentIndex = 1; currentIndex < colors.length; currentIndex++) {
        if (colors[currentIndex] === colors[previousBalloonIndex]) {
            if (neededTime[currentIndex] < neededTime[previousBalloonIndex]) {
                totalRemovalTime += neededTime[currentIndex];
            } else {
                totalRemovalTime += neededTime[previousBalloonIndex];
                previousBalloonIndex = currentIndex;
            }
        } else {
            previousBalloonIndex = currentIndex;
        }
    }

    return totalRemovalTime;
};
```