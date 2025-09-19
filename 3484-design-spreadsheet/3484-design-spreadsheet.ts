class Spreadsheet {
    // Sparse storage: only stores non-zero values
    private cellValues = new Map<string, number>();

    constructor(rows: number) {
        // Cells default to 0, so no initialization needed with sparse storage
    }

    setCell(cellReference: string, value: number): void {
        this.cellValues.set(cellReference, value);
    }

    resetCell(cellReference: string): void {
        // Remove from map (effectively sets to 0 due to sparse storage)
        this.cellValues.delete(cellReference);
    }

    getValue(formula: string): number {
        // Parse formula "=X+Y" -> extract X and Y operands
        const [leftOperand, rightOperand] = formula.slice(1).split("+");
        
        const leftValue = this.parseOperand(leftOperand);
        const rightValue = this.parseOperand(rightOperand);
        
        return leftValue + rightValue;
    }

    private parseOperand(operand: string): number {
        // Check if operand is a cell reference (starts with letter A-Z)
        if (this.isCellReference(operand)) {
            // Return cell value or 0 if cell not set
            return this.cellValues.get(operand) ?? 0;
        } else {
            // Parse as integer literal
            return parseInt(operand, 10);
        }
    }

    private isCellReference(operand: string): boolean {
        return operand[0] >= 'A' && operand[0] <= 'Z';
    }
}