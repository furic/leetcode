# Greedy Column Processing | 28 Lines | O(n*m) | 4ms

# Intuition

The problem requires keeping strings in lexicographic order after deleting columns. The key insight is to process columns left-to-right greedily: for each column, decide whether keeping it maintains order. Once a pair of adjacent strings is determined to be ordered by an earlier column (where one string is strictly less than the next), we don't need to check that pair for later columns - they're already guaranteed to be in order regardless of subsequent characters.

# Approach

**Core Strategy:**
- Process columns from left to right (mirrors how lexicographic comparison works)
- Track which adjacent string pairs are already definitively ordered
- For each column, check if it would violate ordering for pairs not yet sorted
- If violation found, delete the column; otherwise keep it and update sorted pairs

**Step-by-Step Process:**

**1. Initialize Tracking Structure:**
- Create `pairAlreadySorted` boolean array of size (n-1)
- Index i tracks whether strs[i] is already determined to be less than strs[i+1]
- Initially all false since no columns have been processed yet
- This array is the key to optimization: avoids redundant checks

**2. Process Each Column Left to Right:**
- Iterate through columns 0 to m-1 (where m = string length)
- Left-to-right order is crucial: mirrors lexicographic comparison precedence
- Earlier columns take priority in determining string order
- Each column either contributes to ordering or must be deleted

**3. Check Column Validity:**
- For current column col, assume we want to keep it
- Examine all adjacent string pairs (row i and row i+1)
- For each pair not yet marked as sorted:
  - Compare characters: strs[row][col] vs strs[row+1][col]
  - If strs[row][col] > strs[row+1][col]: violation found
  - This means keeping this column would break lexicographic order
  - Set canKeepColumn = false and break immediately

**4. Handle Column Decision:**
- If canKeepColumn = false (violation found):
  - Increment deletedColumnCount
  - Continue to next column without updating pairAlreadySorted
  - This column is deleted, so it has no effect on future comparisons
- If canKeepColumn = true:
  - Column is kept, proceed to update pair ordering status

**5. Update Sorted Pairs (only if column kept):**
- Iterate through all adjacent pairs again
- For each pair not yet marked as sorted:
  - Check if strs[row][col] < strs[row+1][col] (strict inequality)
  - If yes, mark pairAlreadySorted[row] = true
  - This means this pair is definitively ordered by this column
  - Future columns cannot affect this pair's ordering anymore

**6. Why Pair Tracking is Critical:**

**Without Tracking:**
- Would need to check every pair against every remaining column
- Time complexity: O(n * m) where each check examines all pairs
- Redundant work checking already-sorted pairs

**With Tracking:**
- Once a pair is sorted, skip it in all future columns
- Reduces work as we progress through columns
- Still O(n * m) worst case, but significantly faster in practice

**7. Lexicographic Order Rules:**

**Key Properties:**
- Comparison happens left to right
- First differing character determines order
- If prefix matches, longer string comes after
- Once strs[i][col] < strs[i+1][col] at some col, order is determined

**Example of Pair Tracking:**
- strs = ["abc", "acd", "aef"]
- Column 0: All 'a', no violations, no pairs sorted (all equal)
- Column 1: 'b' < 'c' < 'e', no violations, pairs 0 and 1 now sorted
- Column 2: Don't need to check sorted pairs, just verify no violations

**8. Why Greedy Works:**

**Correctness Proof:**
- Lexicographic order processes characters left to right
- If keeping column i causes a violation, no future column can fix it
- Therefore, we must delete column i
- If column i doesn't cause violations, keeping it is always optimal
- It may help sort pairs (good) or be neutral (no harm)
- Deleting it unnecessarily increases deletion count

**Greedy Choice Property:**
- At each column, the locally optimal choice (keep if possible) is globally optimal
- No need to look ahead or backtrack
- Each decision is independent given the current sorted pair state

**9. Example Walkthrough (strs = ["ca","bb","ac"]):**

Initial state:
- pairAlreadySorted = [false, false] (2 pairs: 0-1, 1-2)

**Column 0:**
- Check pair 0: 'c' > 'b' → violation! canKeepColumn = false
- Delete column 0, deletedColumnCount = 1
- Don't update pairAlreadySorted

**Column 1:**
- Check pair 0: 'a' < 'b' → no violation
- Check pair 1: 'b' < 'c' → no violation
- Keep column, canKeepColumn = true
- Update: pairAlreadySorted[0] = true (because 'a' < 'b')
- Update: pairAlreadySorted[1] = true (because 'b' < 'c')

Result: deletedColumnCount = 1 ✓
Final strings: ["a", "b", "c"] (in order)

**10. Edge Cases Handled:**

**All strings already ordered:**
- Example: ["abc", "bcd", "cde"]
- May not need to delete any columns
- Early columns establish order, later columns don't violate it

**All columns must be deleted:**
- Example: ["zyx", "wvu", "tsr"]
- Each column creates violations
- No way to maintain order without deleting all

**Single string:**
- n = 1, no pairs to check
- No deletions needed (already ordered trivially)

**Equal prefixes:**
- Example: ["aaa", "aab", "aac"]
- First two columns don't sort any pairs (all equal)
- Third column establishes order
- Demonstrates why we track pairs incrementally

# Complexity

- Time complexity: $$O(n \times m)$$
  - n = number of strings
  - m = length of each string
  - Outer loop: iterate through m columns: O(m)
  - For each column, two passes through n-1 pairs:
    - First pass: check validity (O(n))
    - Second pass (if kept): update sorted pairs (O(n))
  - Each pair checked at most once per column: O(n) per column
  - Total: O(m × n) = O(n × m)
  - Note: In practice faster due to pair tracking reducing checks

- Space complexity: $$O(n)$$
  - pairAlreadySorted array: O(n-1) = O(n)
  - A few scalar variables: O(1)
  - No recursion, no additional data structures
  - Overall: O(n)

# Code
```typescript []
const minDeletionSize = (strs: string[]): number => {
    const numColumns = strs[0].length;
    const numRows = strs.length;
    let deletedColumnCount = 0;

    const pairAlreadySorted: boolean[] = Array(numRows - 1).fill(false);

    for (let col = 0; col < numColumns; col++) {
        let canKeepColumn = true;

        for (let row = 0; row < numRows - 1; row++) {
            if (pairAlreadySorted[row]) continue;

            if (strs[row][col] > strs[row + 1][col]) {
                canKeepColumn = false;
                break;
            }
        }

        if (!canKeepColumn) {
            deletedColumnCount++;
            continue;
        }

        for (let row = 0; row < numRows - 1; row++) {
            if (!pairAlreadySorted[row] && strs[row][col] < strs[row + 1][col]) {
                pairAlreadySorted[row] = true;
            }
        }
    }

    return deletedColumnCount;
};
```