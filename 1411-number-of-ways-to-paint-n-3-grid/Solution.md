# Pattern DP with Transitions | 16 Lines | O(n) | 2ms

# Intuition

Instead of tracking all possible color combinations, we can categorize rows into two pattern types: ABA (first and last columns same) and ABC (all three columns different). For each new row, we count how many compatible patterns can follow from the previous row based on adjacency constraints.

# Approach

**Pattern Classification:**
- **ABA patterns**: First and last columns have same color, middle differs (e.g., 121, 131, 212)
  - Count: 3 choices for outer color × 2 for middle = 6 patterns
- **ABC patterns**: All three columns different (e.g., 123, 132, 213, 231, 312, 321)
  - Count: 3 × 2 × 1 = 6 patterns

**Transition Rules:**
Analyze which row patterns can follow each other without creating adjacent same-colored cells:

From ABA row (e.g., 121):
- Can follow with 3 ABA patterns (no column conflicts)
- Can follow with 2 ABC patterns (no column conflicts)

From ABC row (e.g., 123):
- Can follow with 2 ABA patterns
- Can follow with 2 ABC patterns

**DP Recurrence:**
- `nextABA = prevABA × 3 + prevABC × 2`
- `nextABC = prevABA × 2 + prevABC × 2`

**Example for n=2:**
- Row 1: 6 ABA + 6 ABC = 12 ways
- Row 2: (6×3 + 6×2) ABA + (6×2 + 6×2) ABC = 30 + 24 = 54 ways

# Complexity

- Time complexity: $$O(n)$$
  - Single loop from row 2 to n
  - Constant arithmetic per iteration
  - Overall: linear in number of rows

- Space complexity: $$O(1)$$
  - Only two variables tracking pattern counts
  - No arrays or recursion
  - Constant space regardless of n

# Code
```typescript []
const numOfWays = (n: number): number => {
    const MOD = 1e9 + 7;
    
    let abaPatternCount = 6;
    let abcPatternCount = 6;
    
    for (let rowIndex = 2; rowIndex <= n; rowIndex++) {
        const nextAbaCount = (abaPatternCount * 3 + abcPatternCount * 2) % MOD;
        const nextAbcCount = (abaPatternCount * 2 + abcPatternCount * 2) % MOD;
        
        abaPatternCount = nextAbaCount;
        abcPatternCount = nextAbcCount;
    }
    
    return (abaPatternCount + abcPatternCount) % MOD;
};
```