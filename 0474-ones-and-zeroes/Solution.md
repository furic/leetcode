# 2D Knapsack Dynamic Programming | 30 Lines | O(s × m × n) |

# Intuition
This is a variant of the 0/1 knapsack problem with two constraints instead of one. Each string has a "cost" in terms of zeros and ones, and we want to maximize the count of strings we can take within budget m (zeros) and n (ones). We can use dynamic programming where state is defined by remaining capacity for both zeros and ones.

# Approach
**Two-Dimensional Knapsack DP:**
- State: `dp[i][j]` = maximum strings using at most i zeros and j ones
- For each string, decide whether to include it based on its zero/one costs
- Process in reverse order to ensure each string used at most once (0/1 knapsack)

**Step-by-Step Process:**

1. **Initialize DP Table:**
   - Create 2D array: `dp[m+1][n+1]`
   - `dp[i][j]` represents max strings achievable with budget i zeros and j ones
   - Initial: all values 0 (base case: no strings)

2. **Count Characters for Each String:**
   - For each string in `strs`:
   - Count `zeroCount` and `oneCount`
   - These represent the "cost" of including this string

3. **Update DP Table (0/1 Knapsack Pattern):**
   - Iterate through DP table in **reverse order**:
     - `availableZeros` from m down to zeroCount
     - `availableOnes` from n down to oneCount
   
   **Why reverse?**
   - Ensures we don't use the same string multiple times
   - When updating dp[i][j], we reference dp[i-zeros][j-ones]
   - If forward: we'd reference already-updated values (allowing reuse)
   - If reverse: we reference old values from previous iteration

4. **DP Transition:**
   - For state `dp[availableZeros][availableOnes]`:
   - **Option 1 (skip):** Don't take current string
     - Value: `dp[availableZeros][availableOnes]` (unchanged)
   - **Option 2 (take):** Include current string
     - Value: `dp[availableZeros - zeroCount][availableOnes - oneCount] + 1`
     - Only valid if `availableZeros >= zeroCount` and `availableOnes >= oneCount`
   - Take maximum of both options

5. **Return Result:**
   - `dp[m][n]` contains maximum strings with full budget

**Why This Works:**

**Knapsack Analogy:**
- Traditional knapsack: one capacity constraint
- This problem: two capacity constraints (zeros and ones)
- Items: strings (each with zero/one costs)
- Value: 1 per string (we maximize count, not weighted value)

**Optimal Substructure:**
- Best solution for budget (m, n) built from:
  - Best solution for (m-zeros, n-ones) + current string
  - OR best solution for (m, n) without current string
- DP captures all possibilities

**Reverse Iteration Necessity:**
- 0/1 knapsack requires each item used ≤ 1 time
- Forward iteration would allow multiple uses (unbounded knapsack)
- Reverse ensures we reference previous iteration's values

**Example Walkthrough (strs = ["10","0001","111001","1","0"], m = 5, n = 3):**

**Initial:** dp = all zeros

**String "10" (zeros=1, ones=1):**
- Update dp[5][3], dp[5][2], ..., dp[1][1]
- dp[1][1] = max(0, dp[0][0] + 1) = 1
- dp[2][1] = max(0, dp[1][0] + 1) = 1
- ... (many states updated to 1)

**String "0001" (zeros=3, ones=1):**
- dp[4][2] = max(1, dp[1][1] + 1) = max(1, 2) = 2
- ... (many states updated)

**String "111001" (zeros=3, ones=3):**
- Costs 3 zeros and 3 ones
- Most states can't afford it or don't improve

**String "1" (zeros=0, ones=1):**
- Cheap string, improves many states
- dp[4][2] might become 3

**String "0" (zeros=1, ones=0):**
- Very cheap, improves many states
- dp[5][3] becomes 4 (can take "10", "0001", "1", "0")

**Result:** dp[5][3] = 4 ✓

**Key Insights:**

**Why Uint8Array:**
- Strings count limited by array length (≤ 600 per constraints)
- 8 bits sufficient for counts
- Memory optimization (vs regular array of numbers)

**Space Optimization Possible:**
- Could use 1D array with careful ordering
- 2D more intuitive and clearer
- For this problem, 2D acceptable (m, n ≤ 100)

**Order of Processing:**
- String order doesn't matter (maximization problem)
- Reverse iteration order within string DOES matter

**Edge Cases:**

**No valid strings:**
- All strings too expensive
- dp remains 0
- Result: 0

**All strings fit:**
- m and n very large
- Result: strs.length

**Single string:**
- strs = ["10"], m=1, n=1
- Result: 1 (string fits exactly)

**Tied costs:**
- Multiple strings with same zero/one counts
- DP considers all combinations

**Empty strings (if allowed):**
- Cost 0 zeros, 0 ones
- Would increase count without cost
- Problem likely prevents this

**Alternative Approaches:**

**3D DP (with string index):**
```typescript
dp[str][zeros][ones] = max strings from first str strings
```
- O(s × m × n) space
- Our 2D approach: O(m × n) space
- Both O(s × m × n) time

**Memoized Recursion:**
```typescript
function solve(index, zeros, ones) {
    if (index === strs.length) return 0;
    // Try skip or take
}
```
- Same complexity
- Harder to optimize space

**Greedy (doesn't work):**
- Sort by cost and take cheapest?
- Counterexample: cheap string might prevent better combination
- DP considers all possibilities

# Complexity
- Time complexity: $$O(s \times m \times n)$$ where s = strs.length - for each string, update O(m × n) DP states
- Space complexity: $$O(m \times n)$$ for the DP table

# Code
```typescript
const findMaxForm = (strs: string[], m: number, n: number): number => {
    const dp = Array.from({ length: m + 1 }, () => new Uint8Array(n + 1));

    for (let stringIndex = 0; stringIndex < strs.length; stringIndex++) {
        const currentString = strs[stringIndex];
        
        let zeroCount = 0;
        let oneCount = 0;
        for (let charIndex = 0; charIndex < currentString.length; charIndex++) {
            if (currentString.charAt(charIndex) === '0') {
                zeroCount++;
            } else {
                oneCount++;
            }
        }

        for (let availableZeros = m; availableZeros >= zeroCount; availableZeros--) {
            for (let availableOnes = n; availableOnes >= oneCount; availableOnes--) {
                const skipString = dp[availableZeros][availableOnes];
                const takeString = dp[availableZeros - zeroCount][availableOnes - oneCount] + 1;
                
                dp[availableZeros][availableOnes] = Math.max(skipString, takeString);
            }
        }
    }

    return dp[m][n];
};
```