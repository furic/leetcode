# Counting and Feasibility | 25 Lines | O(n) | 120ms

# Intuition

To avoid forbidden values, we need to rearrange `nums` so no element matches its forbidden counterpart at the same index. The key insights are: (1) check if a valid arrangement exists by verifying each value has enough non-forbidden positions, (2) identify "bad" positions where `nums[i] == forbidden[i]`, and (3) calculate minimum swaps needed to fix these bad positions, considering that each swap can fix at most two bad positions and that multiple bad positions with the same value require special handling.

# Approach

**Core Strategy:**
- Count occurrences of values in both arrays to check feasibility
- Identify bad positions where values match forbidden values
- Calculate minimum swaps using the relationship between total bad positions and positions with the same value

**Step-by-Step Process:**

**1. Build Frequency Maps:**
- Create `count` map: tracks how many times each value appears in `nums`
- Create `forbiddenCount` map: tracks how many times each value appears in `forbidden`
- Create `badCount` map: tracks how many bad positions exist for each value
- A bad position is where `nums[i] == forbidden[i]`
- Iterate through all indices once to populate these maps

**2. Check Feasibility (Impossible Case Detection):**
- For each value v in `nums` with count c:
  - Calculate available positions: `n - forbiddenCount[v]`
  - This is the maximum number of times v can appear (avoiding forbidden positions)
  - If `c > n - forbiddenCount[v]`, it's impossible to place all occurrences of v
  - Return -1 immediately if any value violates this constraint
- Mathematical reasoning:
  - Value v appears in forbidden array f times
  - We cannot place v at these f positions
  - We have n total positions, so only n-f positions are available for v
  - If v appears c times in nums and c > n-f, we cannot fit all occurrences

**3. Count Bad Positions:**
- Sum all values in `badCount` to get `totalBad`
- This represents the total number of positions that need fixing
- Track `maxSame`: the maximum count of bad positions for any single value
- `maxSame` is important because it represents the worst-case scenario for one value

**4. Calculate Minimum Swaps:**
- Formula: `Math.max(Math.ceil(totalBad / 2), maxSame)`
- Two constraints determine the minimum:

**Constraint 1 - Total Bad Positions (ceil(totalBad / 2)):**
- Each swap operation can fix at most 2 bad positions
- Best case: swap two bad positions with each other
  - Both positions become good after one swap
- Worst case: swap a bad position with a good position
  - Only fixes 1 bad position per swap
- Average case: ceil(totalBad / 2) swaps needed
- Ceiling because odd number of bad positions requires rounding up

**Constraint 2 - Same Value Clustering (maxSame):**
- If k positions all have the same bad value v:
  - We need at least k swaps to fix them
  - Cannot fix two positions with value v by swapping them together
  - Each needs to be swapped with a different value
- Example: If positions 0, 1, 2 all have value 7 as forbidden:
  - Need at least 3 swaps to move all three 7's away
  - Cannot reduce by swapping two 7's together

**Why Take Maximum:**
- Both constraints must be satisfied
- The actual minimum is whichever constraint is stricter
- Math.max ensures both conditions are met

**Example Walkthrough (nums = [4,6,6,5], forbidden = [4,6,5,5]):**

Build maps:
- count: {4:1, 6:2, 5:1}
- forbiddenCount: {4:1, 6:1, 5:2}
- Bad positions check:
  - Index 0: nums[0]=4, forbidden[0]=4 → bad (value 4)
  - Index 1: nums[1]=6, forbidden[1]=6 → bad (value 6)
  - Index 2: nums[2]=6, forbidden[2]=5 → not bad
  - Index 3: nums[3]=5, forbidden[3]=5 → bad (value 5)
- badCount: {4:1, 6:1, 5:1}

Feasibility:
- Value 4: count=1, available=4-1=3, 1≤3 ✓
- Value 6: count=2, available=4-1=3, 2≤3 ✓
- Value 5: count=1, available=4-2=2, 1≤2 ✓

Calculate swaps:
- totalBad = 1+1+1 = 3
- maxSame = max(1,1,1) = 1
- Answer: max(ceil(3/2), 1) = max(2, 1) = 2 ✓

**Example Walkthrough (nums = [7,7], forbidden = [8,7]):**
- count: {7:2}
- forbiddenCount: {8:1, 7:1}
- Feasibility for value 7: count=2, available=2-1=1
- 2 > 1, return -1 ✓ (impossible to place two 7's when one position is forbidden)

**Example Walkthrough (nums = [1,2], forbidden = [2,1]):**
- No bad positions (nums[0]=1≠2, nums[1]=2≠1)
- totalBad = 0, maxSame = 0
- Answer: max(0, 0) = 0 ✓

# Complexity

- Time complexity: $$O(n)$$
  - First loop to build maps: O(n) iterations, O(1) per map operation
  - Feasibility check: O(k) where k = unique values in nums, k ≤ n
  - Calculating totalBad and maxSame: O(k) where k ≤ n
  - Overall: O(n) since all operations are linear or sub-linear

- Space complexity: $$O(n)$$
  - Three hash maps: count, forbiddenCount, badCount
  - Each stores at most n entries in worst case
  - count and forbiddenCount: O(k) where k = unique values, k ≤ n
  - badCount: O(b) where b = unique bad values, b ≤ k ≤ n
  - Overall: O(n) for the hash maps

# Code
```typescript []
const minSwaps = (nums: number[], forbidden: number[]): number => {
    const n = nums.length;

    const count = new Map<number, number>();
    const forbiddenCount = new Map<number, number>();
    const badCount = new Map<number, number>();

    for (let i = 0; i < n; i++) {
        count.set(nums[i], (count.get(nums[i]) || 0) + 1);
        forbiddenCount.set(
            forbidden[i],
            (forbiddenCount.get(forbidden[i]) || 0) + 1
        );
        if (nums[i] === forbidden[i]) {
            badCount.set(nums[i], (badCount.get(nums[i]) || 0) + 1);
        }
    }

    for (const [v, c] of count) {
        if (c > n - (forbiddenCount.get(v) || 0)) return -1;
    }

    let totalBad = 0;
    let maxSame = 0;
    for (const c of badCount.values()) {
        totalBad += c;
        maxSame = Math.max(maxSame, c);
    }

    return Math.max(Math.ceil(totalBad / 2), maxSame);
};
```