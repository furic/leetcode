const finalValueAfterOperations = (operations: string[]): number =>
    operations.reduce((sum, op) => sum += (op === 'X++' || op === '++X') ? 1 : -1, 0);