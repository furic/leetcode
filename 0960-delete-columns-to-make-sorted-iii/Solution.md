# Longest Valid Column Subsequence | 24 Lines | O(n*m²) | 1ms

# Intuition

Unlike sorting the strings themselves, this problem requires each individual string (row) to be in lexicographic order after column deletions. The key insight is to find the longest subsequence of columns where every row maintains non-decreasing character order. This transforms into a dynamic programming problem similar to Longest Increasing Subsequence, but with the constraint that ALL rows must satisfy the ordering property simultaneously.

# Approach

**Core Strategy:**
- Find the maximum number of columns we can keep (longest valid subsequence)
- A valid subsequence has the property that for any two columns i < j in it, every row satisfies strs[row][i] ≤ strs[row][j]
- Minimum deletions = total columns - maximum columns kept
- Use dynamic programming to build up longest valid subsequences

**Step-by-Step Process:**

**1. Define DP State:**
- `longestValidSequence[col]` = length of longest valid column subsequence that ends at column col
- "Valid" means: for any two columns in the subsequence ordered as c1 < c2, all rows satisfy strs[row][c1] ≤ strs[row][c2]
- Base case: Each column alone forms a valid subsequence of length 1
- Initialize all values to 1

**2. DP Transition Logic:**
- For each column currentCol from 1 to m-1:
  - Consider all previous columns previousCol from 0 to currentCol-1
  - Check if we can extend the subsequence ending at previousCol to include currentCol
  - Extension is valid if: for ALL rows, strs[row][previousCol] ≤ strs[row][currentCol]

**3. Validate Extension Between Two Columns:**
- To check if previousCol and currentCol can be in the same valid subsequence:
  - Iterate through all n rows
  - For each row, check if strs[row][previousCol] ≤ strs[row][currentCol]
  - If ANY row violates this (strs[row][previousCol] > strs[row][currentCol]), cannot extend
  - ALL rows must satisfy the non-decreasing property

**4. Update DP Value:**
- If extension from previousCol to currentCol is valid:
  - New length = longestValidSequence[previousCol] + 1
  - Update longestValidSequence[currentCol] with maximum:
  - `longestValidSequence[currentCol] = max(current value, new length)`
- This ensures we track the longest possible subsequence ending at currentCol

**5. Calculate Minimum Deletions:**
- After processing all columns, find the maximum value in longestValidSequence
- This represents the maximum number of columns we can keep
- Minimum deletions = numColumns - max(longestValidSequence)
- All other columns must be deleted

**6. Why This DP Approach Works:**

**Optimal Substructure:**
- If we have longest valid subsequence ending at col of length L
- And we can extend to newCol, the longest ending at newCol is at least L+1
- Checking all previous columns ensures we find the optimal extension

**Overlapping Subproblems:**
- Computing longestValidSequence[col] uses results from all previous columns
- Each subproblem (longest ending at a specific column) is solved once
- Results are reused when considering future columns

**Correctness:**
- A valid column subsequence maintains row-wise non-decreasing order
- By checking all rows for each potential extension, we guarantee validity
- Taking the maximum ensures we keep the most columns possible
- Therefore, we delete the minimum number

**7. Comparison to LIS (Longest Increasing Subsequence):**

**Similarities:**
- Both use DP with state: longest sequence ending at position i
- Both try extending from all previous positions
- Both use max to find optimal answer

**Differences:**
- LIS: Single sequence of numbers
- This problem: Multiple sequences (rows), all must satisfy ordering
- Extension check: Must validate ALL rows, not just one value
- Complexity: LIS is O(n²) or O(n log n), this is O(n × m²) due to row checks

**8. Example Walkthrough (strs = ["babca","bbazb"]):**

Initial state:
- numColumns = 5, numRows = 2
- longestValidSequence = [1, 1, 1, 1, 1]

**Process column 1 (char 'a' in row 0, 'b' in row 1):**
- Check extend from col 0 ('b', 'b'):
  - Row 0: 'b' > 'a' → cannot extend
  - longestValidSequence[1] remains 1

**Process column 2 (char 'b' in row 0, 'a' in row 1):**
- Check extend from col 0 ('b', 'b'):
  - Row 0: 'b' ≤ 'b' ✓
  - Row 1: 'b' > 'a' → cannot extend
- Check extend from col 1 ('a', 'b'):
  - Row 0: 'a' < 'b' ✓
  - Row 1: 'b' > 'a' → cannot extend
- longestValidSequence[2] remains 1

**Process column 3 (char 'c' in row 0, 'z' in row 1):**
- Check extend from col 0:
  - Row 0: 'b' < 'c' ✓
  - Row 1: 'b' < 'z' ✓
  - Can extend! longestValidSequence[3] = max(1, 1+1) = 2
- Check extend from col 1:
  - Row 0: 'a' < 'c' ✓
  - Row 1: 'b' < 'z' ✓
  - Can extend! longestValidSequence[3] = max(2, 1+1) = 2
- Check extend from col 2:
  - Row 0: 'b' < 'c' ✓
  - Row 1: 'a' < 'z' ✓
  - Can extend! longestValidSequence[3] = max(2, 1+1) = 2

**Process column 4 (char 'a' in row 0, 'b' in row 1):**
- Check extend from col 0:
  - Row 0: 'b' > 'a' → cannot extend
- Check extend from col 1:
  - Row 0: 'a' ≤ 'a' ✓
  - Row 1: 'b' ≤ 'b' ✓
  - Can extend! longestValidSequence[4] = max(1, 1+1) = 2
- Check extend from col 2:
  - Row 0: 'b' > 'a' → cannot extend
- Check extend from col 3:
  - Row 0: 'c' > 'a' → cannot extend

Final: longestValidSequence = [1, 1, 1, 2, 2]
Max = 2, so minimum deletions = 5 - 2 = 3 ✓

The longest valid subsequence could be columns [0,3] or [1,4], giving us 2 columns to keep.

**9. Example Walkthrough (strs = ["edcba"]):**

Single row, 5 columns:
- longestValidSequence = [1, 1, 1, 1, 1]
- Column 1 ('d'): Can't extend from col 0 ('e') since 'e' > 'd'
- Column 2 ('c'): Can't extend from any previous (all decreasing)
- Column 3 ('b'): Can't extend from any previous (all decreasing)
- Column 4 ('a'): Can't extend from any previous (all decreasing)
- Max = 1, deletions = 5 - 1 = 4 ✓

Only one column can be kept since the string is strictly decreasing.

**10. Edge Cases Handled:**

**All columns already valid:**
- Example: ["abc", "def"]
- Each row is already non-decreasing
- longestValidSequence could reach [1,2,3]
- Deletions = 3 - 3 = 0 ✓

**Single column:**
- Always valid (1 column is trivially non-decreasing)
- Deletions = 1 - 1 = 0 ✓

**All columns must be deleted except one:**
- Strictly decreasing rows
- Each column only forms length-1 subsequence
- Keep 1, delete m-1

# Complexity

- Time complexity: $$O(n \times m^2)$$
  - n = number of strings (rows)
  - m = length of each string (columns)
  - Outer loop: iterate through m columns: O(m)
  - Middle loop: for each column, check all previous columns: O(m)
  - Inner loop: for each pair of columns, check all n rows: O(n)
  - Total: O(m × m × n) = O(n × m²)
  - Finding max at end: O(m)
  - Overall dominated by triple nested loops: O(n × m²)

- Space complexity: $$O(m)$$
  - longestValidSequence array: O(m)
  - A few scalar variables: O(1)
  - No recursion stack
  - No additional data structures
  - Overall: O(m)

# Code
```typescript []
const minDeletionSize = (strs: string[]): number => {
    const numColumns = strs[0].length;
    const numRows = strs.length;
    
    const longestValidSequence: number[] = Array(numColumns).fill(1);

    for (let currentCol = 1; currentCol < numColumns; currentCol++) {
        for (let previousCol = 0; previousCol < currentCol; previousCol++) {
            let canExtendSequence = true;
            
            for (let row = 0; row < numRows; row++) {
                if (strs[row][previousCol] > strs[row][currentCol]) {
                    canExtendSequence = false;
                    break;
                }
            }
            
            if (canExtendSequence) {
                longestValidSequence[currentCol] = Math.max(
                    longestValidSequence[currentCol],
                    longestValidSequence[previousCol] + 1
                );
            }
        }
    }

    return numColumns - Math.max(...longestValidSequence);
};
```