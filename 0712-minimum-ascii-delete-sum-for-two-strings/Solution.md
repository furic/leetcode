# Space-Optimized DP | 35 Lines | O(n×m) | 19ms

# Intuition

This is an edit distance variant where we minimize ASCII sum of deletions instead of counting operations. DP tracks minimum cost to make prefixes equal by deciding whether to delete from s1, s2, or keep matching characters.

# Approach

**DP State:**
- `dp[i][j]` = min ASCII sum to make `s1[0..i-1]` equal to `s2[0..j-1]`

**Base Cases:**
- `dp[0][j]` = sum of ASCII values of s2[0..j-1] (delete all from s2)
- `dp[i][0]` = sum of ASCII values of s1[0..i-1] (delete all from s1)

**Transitions:**
- If `s1[i-1] == s2[j-1]`: characters match
  - `dp[i][j] = dp[i-1][j-1]` (no deletion)
- Else: choose minimum cost deletion
  - Delete from s1: `dp[i-1][j] + ASCII(s1[i-1])`
  - Delete from s2: `dp[i][j-1] + ASCII(s2[j-1])`

**Space Optimization:**
- Only need current and previous row
- Use two arrays instead of full matrix

**Example: s1="sea", s2="eat"**

DP table:
```
    ""  e   a   t
""  0   101 198 314
s   115 216 313 429
e   216 115 212 328
a   313 212 115 231
```

Result: dp[3][3] = 231 ✓

# Complexity

- Time complexity: $$O(n \times m)$$
  - n = length of s1, m = length of s2
  - Fill matrix of size (n+1)×(m+1)
  - Constant work per cell

- Space complexity: $$O(m)$$
  - Two arrays of size m+1
  - Previous and current row only

# Code
```typescript []
const minimumDeleteSum = (s1: string, s2: string): number => {
    const length1 = s1.length;
    const length2 = s2.length;
    
    let previousRow = new Array(length2 + 1).fill(0);
    let currentRow = new Array(length2 + 1).fill(0);
    
    for (let j = 1; j <= length2; j++) {
        previousRow[j] = previousRow[j - 1] + s2.charCodeAt(j - 1);
    }
    
    for (let i = 1; i <= length1; i++) {
        currentRow[0] = previousRow[0] + s1.charCodeAt(i - 1);
        
        for (let j = 1; j <= length2; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                currentRow[j] = previousRow[j - 1];
            } else {
                const deleteCostFromS1 = previousRow[j] + s1.charCodeAt(i - 1);
                const deleteCostFromS2 = currentRow[j - 1] + s2.charCodeAt(j - 1);
                
                currentRow[j] = Math.min(deleteCostFromS1, deleteCostFromS2);
            }
        }
        
        [previousRow, currentRow] = [currentRow, previousRow];
    }
    
    return previousRow[length2];
};
```