# Column Comparison | 10 Lines | O(n*m) | 5ms

# Intuition

We need to identify columns that are not sorted lexicographically when strings are arranged in a grid. A column is sorted if reading from top to bottom gives characters in non-decreasing order (each character is >= the previous one). The problem reduces to checking each column independently and counting violations.

# Approach

**Overall Strategy:**
- Treat the array of strings as a grid where each string is a row
- Process one column at a time, checking if it's sorted
- A column is unsorted if any character is less than the character above it
- Count the total number of unsorted columns

**Step-by-Step Process:**

**1. Initialize Counter:**
- Create a variable to track the number of unsorted columns
- Start at 0 since initially we haven't found any unsorted columns

**2. Iterate Through Columns:**
- Loop through each column index from 0 to the length of the first string
- Each column position needs independent verification
- Use the first string's length since all strings have the same length

**3. Check If Current Column Is Sorted:**
- For each column, compare adjacent rows from top to bottom
- Start from row 1 (second row) since we need to compare with the previous row
- Compare current row's character with previous row's character at this column

**4. Detect Unsorted Column:**
- If current character is lexicographically less than the previous character:
  - This violates the non-decreasing order requirement
  - Increment the unsorted column counter
  - Break out of the inner loop immediately (no need to check remaining rows)
  - Move to the next column
- The break is an optimization: once we find one violation, the entire column is unsorted

**5. Continue or Skip:**
- If all rows in a column pass the comparison (no breaks), the column is sorted
- If we break early due to finding a violation, move to the next column
- Continue this process for all columns

**6. Return Result:**
- After checking all columns, return the count of unsorted columns
- This represents the minimum number of column deletions needed

**Why This Works:**
- Lexicographic comparison in strings follows alphabetical order: 'a' < 'b' < 'c' etc.
- For a column to be sorted, each character must be >= the one above it
- Finding even one violation means the entire column must be deleted
- We don't need to track which columns to delete, just count them

**Edge Cases Handled:**
- Single string: Only one row, so all columns are trivially sorted (no comparisons needed)
- Single character strings: Only one column to check
- All sorted: Returns 0
- All unsorted: Returns the total number of columns

# Complexity

- Time complexity: $$O(n \times m)$$
  - n = number of strings (rows)
  - m = length of each string (columns)
  - Outer loop iterates m times (once per column)
  - Inner loop can iterate up to n-1 times per column in worst case
  - Early break optimization: average case is better when columns are unsorted early
  - Worst case: all columns are sorted, requiring full traversal

- Space complexity: $$O(1)$$
  - Only using a single counter variable
  - No additional data structures needed
  - Input array is not modified

# Code
```typescript []
const minDeletionSize = (strs: string[]): number => {
    let unsortedColumnCount = 0;

    for (let col = 0; col < strs[0].length; col++) {
        for (let row = 1; row < strs.length; row++) {
            if (strs[row][col] < strs[row - 1][col]) {
                unsortedColumnCount++;
                break;
            }
        }
    }

    return unsortedColumnCount;
};
```