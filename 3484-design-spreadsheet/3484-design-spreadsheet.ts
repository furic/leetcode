class Spreadsheet {
    private cells: { [key: string]: number };

    constructor(rows: number) {
        this.cells = {};
    }

    setCell(cell: string, value: number): void {
        this.cells[cell] = value;
    }

    resetCell(cell: string): void {
        delete this.cells[cell];
    }

    getValue(formula: string): number {
        const idx = formula.indexOf('+');
        const left = formula.slice(1, idx);
        const right = formula.slice(idx + 1);

        const valLeft =
            /[a-zA-Z]/.test(left[0])
                ? (this.cells[left] ?? 0)
                : parseInt(left);

        const valRight =
            /[a-zA-Z]/.test(right[0])
                ? (this.cells[right] ?? 0)
                : parseInt(right);

        return valLeft + valRight;
    }
}