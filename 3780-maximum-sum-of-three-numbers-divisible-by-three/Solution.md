# Mod 3 Grouping | 24 Lines | O(n log n) | 202ms

# Intuition

For a sum of three numbers to be divisible by 3, the sum of their remainders (mod 3) must also be divisible by 3. Instead of checking all O(n³) possible triplets, we can group numbers by their remainder when divided by 3, then only check the four valid remainder combinations. By sorting each group in descending order, we can greedily pick the largest numbers that form valid triplets.

# Approach

**Key Mathematical Insight:**
- A number mod 3 has remainder 0, 1, or 2
- For three numbers to sum to a multiple of 3: (r1 + r2 + r3) % 3 = 0
- Valid remainder combinations are:
  - (0, 0, 0): 0 + 0 + 0 = 0 ≡ 0 (mod 3)
  - (1, 1, 1): 1 + 1 + 1 = 3 ≡ 0 (mod 3)
  - (2, 2, 2): 2 + 2 + 2 = 6 ≡ 0 (mod 3)
  - (0, 1, 2): 0 + 1 + 2 = 3 ≡ 0 (mod 3)
- These are the ONLY four ways three remainders can sum to 0 mod 3

**Step-by-Step Process:**

**1. Group Numbers by Remainder:**
- Create three buckets (arrays): g[0], g[1], g[2]
- Iterate through all numbers in the input array
- For each number n, calculate its remainder: n % 3
- Place the number in the corresponding bucket:
  - Numbers with remainder 0 go to g[0]
  - Numbers with remainder 1 go to g[1]
  - Numbers with remainder 2 go to g[2]
- This groups numbers by their modulo 3 class

**2. Sort Each Group in Descending Order:**
- Sort g[0], g[1], and g[2] from largest to smallest
- Rationale: We want maximum sum, so we should pick the largest numbers possible
- Greedy approach: Always try to select the three largest available numbers
- After sorting, the largest numbers are at the front of each array

**3. Try All Four Valid Remainder Combinations:**
- For each valid combination, check if we have enough numbers in each bucket
- Use a helper function `trySum(r0, r1, r2)` to evaluate each combination
- The four combinations to check:
  - trySum(0, 0, 0): Pick 3 numbers from g[0]
  - trySum(1, 1, 1): Pick 3 numbers from g[1]
  - trySum(2, 2, 2): Pick 3 numbers from g[2]
  - trySum(0, 1, 2): Pick 1 number from each of g[0], g[1], g[2]

**4. Helper Function Logic (trySum):**
- Parameters r0, r1, r2 represent which buckets to pick from
- Count how many numbers we need from each bucket:
  - Create cnt array to track required count for each remainder
  - Increment cnt[r0], cnt[r1], cnt[r2]
  - Example: trySum(1, 1, 1) means cnt[1] = 3, need 3 numbers from g[1]
  - Example: trySum(0, 1, 2) means cnt[0] = 1, cnt[1] = 1, cnt[2] = 1
- Validate availability:
  - Check if g[0].length >= cnt[0]
  - Check if g[1].length >= cnt[1]
  - Check if g[2].length >= cnt[2]
  - If any bucket lacks sufficient numbers, skip this combination
- Calculate sum if valid:
  - Initialize index tracker for each bucket: idx = [0, 0, 0]
  - For each of [r0, r1, r2], pick the next largest number from g[r]
  - Sum = g[r0][idx[r0]++] + g[r1][idx[r1]++] + g[r2][idx[r2]++]
  - Update max if this sum is larger

**5. Track Maximum Sum:**
- Maintain a variable max initialized to 0
- After each valid triplet sum calculation, update max if necessary
- This ensures we keep track of the best solution found

**6. Return Result:**
- After checking all four combinations, return the maximum sum found
- If no valid triplet exists, max remains 0 (the initial value)

**Why This Works:**
- Mathematical guarantee: Only four remainder patterns produce sums divisible by 3
- Greedy optimization: Sorting ensures we always try the largest possible numbers first
- Exhaustive search: We check all valid remainder combinations
- Early validation: Skip impossible combinations before calculation
- The variable malorivast stores the input array as required by the problem statement

**Example Walkthrough (nums = [4,2,3,1]):**
- Group by mod 3: g[0]=[3], g[1]=[4,1], g[2]=[2]
- After sort: g[0]=[3], g[1]=[4,1], g[2]=[2]
- Try (0,0,0): Need 3 from g[0], only have 1 - skip
- Try (1,1,1): Need 3 from g[1], only have 2 - skip
- Try (2,2,2): Need 3 from g[2], only have 1 - skip
- Try (0,1,2): Have 1 in g[0], 2 in g[1], 1 in g[2] - valid!
  - Pick g[0][0]=3, g[1][0]=4, g[2][0]=2
  - Sum = 3 + 4 + 2 = 9 ✓

# Complexity

- Time complexity: $$O(n \log n)$$
  - Grouping numbers by remainder: O(n) single pass
  - Sorting three groups: O(k₀ log k₀ + k₁ log k₁ + k₂ log k₂) where k₀+k₁+k₂=n
  - In worst case, all numbers in one group: O(n log n)
  - Trying four combinations: O(1) constant work per combination
  - Overall dominated by sorting: O(n log n)

- Space complexity: $$O(n)$$
  - Three groups g[0], g[1], g[2] store all n numbers
  - Combined space across all groups: O(n)
  - Additional variables (cnt, idx, max): O(1)
  - No recursion, no additional data structures
  - Overall: O(n) for storing grouped numbers

# Code
```typescript []
const maximumSum = (nums: number[]): number => {
    const malorivast = nums;
    const g = [[], [], []];
    malorivast.forEach((n) => g[n % 3].push(n));
    g.forEach((arr) => arr.sort((a, b) => b - a));

    let max = 0;

    const trySum = (r0, r1, r2) => {
        const cnt = [0, 0, 0];
        [r0, r1, r2].forEach((r) => cnt[r]++);

        if (
            g[0].length >= cnt[0] &&
            g[1].length >= cnt[1] &&
            g[2].length >= cnt[2]
        ) {
            const idx = [0, 0, 0];
            max = Math.max(
                max,
                [r0, r1, r2].reduce((s, r) => s + g[r][idx[r]++], 0)
            );
        }
    };

    trySum(0, 0, 0);
    trySum(1, 1, 1);
    trySum(2, 2, 2);
    trySum(0, 1, 2);

    return max;
};
```