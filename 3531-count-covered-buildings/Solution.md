# Extreme Tracking | 20 Lines | O(m) | 84ms

# Intuition
A building is covered if there's at least one building in each of the four cardinal directions. Instead of checking all buildings for each building, we can precompute the extreme positions (top/bottom/left/right) in each row and column, then verify each building has neighbors beyond these extremes.

# Approach
- **Precompute Extremes**:
  - For each column: track topmost (minimum row) and bottommost (maximum row) building
  - For each row: track leftmost (minimum col) and rightmost (maximum col) building
  - Initialize extremes to impossible values (n+1 for minimums, 0 for maximums)

- **First Pass - Record Extremes**:
  - Iterate through all buildings once
  - Update column extremes: topMostInColumn[col] and bottomMostInColumn[col]
  - Update row extremes: leftMostInRow[row] and rightMostInRow[row]
  - This captures the span of buildings in each row/column

- **Coverage Check Logic**:
  - Building at (row, col) has neighbor above iff row > topMostInColumn[col]
  - Has neighbor below iff row < bottomMostInColumn[col]
  - Has neighbor left iff col > leftMostInRow[row]
  - Has neighbor right iff col < rightMostInRow[row]

- **Second Pass - Count Covered**:
  - Check each building against the four conditions
  - Building is covered only if all four conditions are true
  - Increment counter for each covered building

- **Why This Works**:
  - If row > topMost, there must be a building above (the topmost one)
  - If row < bottomMost, there must be a building below
  - If col > leftMost, there must be a building to the left
  - If col < rightMost, there must be a building to the right

- **Example Walkthrough** (n=3, buildings=[[1,2],[2,2],[3,2],[2,1],[2,3]]):
  - Column 2: topMost=1, bottomMost=3
  - Row 2: leftMost=1, rightMost=3
  - Check [2,2]: 
    - 2 > 1 (has above) ✓
    - 2 < 3 (has below) ✓
    - 2 > 1 (has left) ✓
    - 2 < 3 (has right) ✓
  - Count = 1 ✓

- **Edge Cases Handled**:
  - Single building: Cannot be covered (no neighbors)
  - Buildings in straight line: None covered (missing perpendicular neighbors)
  - Corner buildings: Cannot be covered (missing multiple directions)

# Complexity
- Time complexity: $$O(m)$$
  - First pass through m buildings: O(m)
  - Second pass through m buildings: O(m)
  - Each extreme update and check: O(1)
  - Total: O(m) where m = number of buildings

- Space complexity: $$O(n)$$
  - Four arrays of size n+1 for tracking extremes
  - No dependence on number of buildings
  - Total: O(n)

# Code
```typescript
const countCoveredBuildings = (n: number, buildings: number[][]): number => {
    const topMostInColumn = new Array(n + 1).fill(n + 1);
    const bottomMostInColumn = new Array(n + 1).fill(0);
    const leftMostInRow = new Array(n + 1).fill(n + 1);
    const rightMostInRow = new Array(n + 1).fill(0);

    for (const [row, col] of buildings) {
        bottomMostInColumn[col] = Math.max(bottomMostInColumn[col], row);
        topMostInColumn[col] = Math.min(topMostInColumn[col], row);
        rightMostInRow[row] = Math.max(rightMostInRow[row], col);
        leftMostInRow[row] = Math.min(leftMostInRow[row], col);
    }

    let coveredCount = 0;
    for (const [row, col] of buildings) {
        const hasAbove = row > topMostInColumn[col];
        const hasBelow = row < bottomMostInColumn[col];
        const hasLeft = col > leftMostInRow[row];
        const hasRight = col < rightMostInRow[row];
        
        if (hasAbove && hasBelow && hasLeft && hasRight) {
            coveredCount++;
        }
    }

    return coveredCount;
};
```