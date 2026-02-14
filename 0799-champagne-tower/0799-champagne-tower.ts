/**
 * Calculates champagne amount in a specific glass of a pyramid tower
 * Strategy: Simulate champagne flow row by row, splitting overflow equally to glasses below
 * Each glass holds 1 cup; excess splits 50/50 to left and right glasses in next row
 */
const champagneTower = (poured: number, query_row: number, query_glass: number): number => {
    const MAX_GLASS_CAPACITY = 1;
    
    // Start with all champagne in top glass
    let currentRow: number[] = [poured];

    // Simulate flow down to query_row
    for (let rowIndex = 1; rowIndex <= query_row; rowIndex++) {
        const nextRow = new Array(rowIndex + 1).fill(0);
        
        // Process each glass in current row
        for (let glassIndex = 0; glassIndex < rowIndex; glassIndex++) {
            if (currentRow[glassIndex] > MAX_GLASS_CAPACITY) {
                // Calculate overflow: half goes left, half goes right
                const overflowPerSide = (currentRow[glassIndex] - MAX_GLASS_CAPACITY) / 2;
                nextRow[glassIndex] += overflowPerSide;      // Left glass below
                nextRow[glassIndex + 1] += overflowPerSide;  // Right glass below
            }
        }
        
        currentRow = nextRow;
    }

    // Glass can't hold more than 1 cup
    return Math.min(MAX_GLASS_CAPACITY, currentRow[query_glass]);
};