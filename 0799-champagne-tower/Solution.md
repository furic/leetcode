# Row-by-Row Simulation | 22 Lines | O(query_row²) | 47ms

# Intuition

Simulate champagne flow row-by-row. Each glass holds 1 cup; overflow splits equally (50/50) to the two glasses directly below. Only need to track amounts up to the query row.

# Approach

**Layer-by-Layer Simulation:**
1. Start with all champagne in top glass (row 0)
2. For each row up to query_row:
   - Create next row with appropriate size
   - For each glass in current row:
     - If amount > 1, calculate overflow
     - Split overflow equally: half to left-below, half to right-below
   - Move to next row
3. Return min(1, amount in target glass)

**Overflow Calculation:**
- Overflow = amount - 1 (capacity)
- Each child gets overflow / 2

**Space Optimization:**
- Only track current row (not entire pyramid)
- Reduces space from O(query_row²) to O(query_row)

**Example: poured=2, query_row=1, query_glass=1**

Row 0: [2]
- Overflow: 2-1=1
- Split: 0.5 to (1,0), 0.5 to (1,1)

Row 1: [0.5, 0.5]

Result: 0.5 ✓

# Complexity

- Time complexity: $$O(\text{query\_row}^2)$$
  - Process rows 0 to query_row
  - Row i has i+1 glasses
  - Total: 1+2+3+...+query_row = O(query_row²)

- Space complexity: $$O(\text{query\_row})$$
  - Current row array: O(query_row+1)
  - No need to store entire pyramid
  - Overall: O(query_row)

# Code
```typescript []
const champagneTower = (poured: number, query_row: number, query_glass: number): number => {
    const MAX_GLASS_CAPACITY = 1;
    
    let currentRow: number[] = [poured];

    for (let rowIndex = 1; rowIndex <= query_row; rowIndex++) {
        const nextRow = new Array(rowIndex + 1).fill(0);
        
        for (let glassIndex = 0; glassIndex < rowIndex; glassIndex++) {
            if (currentRow[glassIndex] > MAX_GLASS_CAPACITY) {
                const overflowPerSide = (currentRow[glassIndex] - MAX_GLASS_CAPACITY) / 2;
                nextRow[glassIndex] += overflowPerSide;
                nextRow[glassIndex + 1] += overflowPerSide;
            }
        }
        
        currentRow = nextRow;
    }

    return Math.min(MAX_GLASS_CAPACITY, currentRow[query_glass]);
};
```