# Validate Sudoku with Sets | 34 Lines | O(81) | 2ms

# Intuition
To validate a Sudoku board, each row, column, and 3x3 sub-box must not contain duplicate digits. Since the board is fixed at 9x9, we can systematically check all these constraints.

# Approach
We iterate through each row index from 0 to 8. For every row, we maintain three sets:
- One for row values
- One for column values
- One for sub-box values

At each step, we validate:
1. The current row element for duplicates.
2. The current column element for duplicates.
3. The current 3x3 sub-box element for duplicates.

If any duplication is detected, the board is invalid. If all checks pass, the board is valid.

# Complexity
- Time complexity:  
Since the board size is fixed at 9x9, the total operations are constant, effectively **O(1)**, though more generally expressed as **O(81)**.

- Space complexity:  
We use sets for rows, columns, and boxes during each iteration. The maximum space used is constant, so **O(1)**.

# Code
```typescript
const isValidSudoku = (board: string[][]): boolean => {
    for (let row = 0; row < 9; row++) {
        const seenInRow = new Set<string>();
        const seenInCol = new Set<string>();
        const seenInBox = new Set<string>();

        for (let col = 0; col < 9; col++) {
            const rowVal = board[row][col];
            if (rowVal !== ".") {
                if (seenInRow.has(rowVal)) return false;
                seenInRow.add(rowVal);
            }

            const colVal = board[col][row];
            if (colVal !== ".") {
                if (seenInCol.has(colVal)) return false;
                seenInCol.add(colVal);
            }

            const boxRow = Math.floor(row / 3) * 3 + Math.floor(col / 3);
            const boxCol = (row % 3) * 3 + (col % 3);
            const boxVal = board[boxRow][boxCol];
            if (boxVal !== ".") {
                if (seenInBox.has(boxVal)) return false;
                seenInBox.add(boxVal);
            }
        }
    }
    return true;
};
```