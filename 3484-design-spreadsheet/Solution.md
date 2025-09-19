# Sparse Hash Map Storage | 23 Lines | O(1) | 69ms

# Intuition
A spreadsheet with 26 columns and multiple rows would require significant memory if stored as a full 2D array, especially when most cells remain at their default value of 0. The key insight is to use sparse storage - only store cells that have been explicitly set to non-zero values. For formula evaluation, we need to parse simple addition expressions and handle both cell references and integer literals.

# Approach
I'll use a sparse hash map approach with formula parsing:

1. **Sparse Storage**: Use a Map with cell references as keys and values as numbers. This only stores cells that have been explicitly set, treating missing entries as 0.

2. **Cell Operations**:
   - setCell: Store the value in the map
   - resetCell: Remove the entry from the map (effectively setting to 0)
   - Default behavior: Missing cells return 0

3. **Formula Parsing**: For formulas in format "=X+Y":
   - Remove the "=" prefix
   - Split on "+" to get operands
   - Parse each operand as either a cell reference or integer literal

4. **Operand Resolution**:
   - Cell references (start with A-Z): Look up in the map, default to 0
   - Integer literals: Parse directly with parseInt()

5. **Memory Efficiency**: This approach uses O(k) space where k is the number of non-zero cells, rather than O(rows × 26) for full storage.

# Complexity
- Time complexity: $$O(1)$$
  - setCell: O(1) hash map insertion
  - resetCell: O(1) hash map deletion
  - getValue: O(1) string parsing and hash map lookups
  - All operations are constant time regardless of spreadsheet size

- Space complexity: $$O(k)$$
  - Only stores k non-zero cells in the hash map
  - Much more efficient than O(rows × 26) full storage
  - Space usage grows only with the number of explicitly set cells

# Code
```typescript []
class Spreadsheet {
    private cellValues = new Map<string, number>();

    constructor(rows: number) {
    }

    setCell(cellReference: string, value: number): void {
        this.cellValues.set(cellReference, value);
    }

    resetCell(cellReference: string): void {
        this.cellValues.delete(cellReference);
    }

    getValue(formula: string): number {
        const [leftOperand, rightOperand] = formula.slice(1).split("+");
        
        const leftValue = this.parseOperand(leftOperand);
        const rightValue = this.parseOperand(rightOperand);
        
        return leftValue + rightValue;
    }

    private parseOperand(operand: string): number {
        if (this.isCellReference(operand)) {
            return this.cellValues.get(operand) ?? 0;
        } else {
            return parseInt(operand, 10);
        }
    }

    private isCellReference(operand: string): boolean {
        return operand[0] >= 'A' && operand[0] <= 'Z';
    }
}
```