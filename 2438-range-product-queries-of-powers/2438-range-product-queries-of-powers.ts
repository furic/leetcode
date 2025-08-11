const productQueries = (n: number, queries: number[][]): number[] => {
    const MODULO = 1000000007;
    
    // Extract all powers of 2 that sum to n using bit manipulation
    const powersOf2Array: number[] = [];
    let remainingNumber = n;
    
    while (remainingNumber > 0) {
        // Get the lowest set bit (rightmost 1 bit)
        // Example: if number = 12 (1100), lowest bit = 4 (0100)
        const lowestPowerOf2 = remainingNumber & -remainingNumber;
        powersOf2Array.push(lowestPowerOf2);
        
        // Remove this bit from the number using XOR
        remainingNumber ^= lowestPowerOf2;
    }
    
    // Build 2D table for range product queries
    const tableSize = powersOf2Array.length;
    const productTable: number[][] = Array.from({ length: tableSize }, () => 
        new Array(tableSize).fill(0)
    );
    
    // Fill the table: productTable[i][j] = product of powers[i] through powers[j]
    for (let startIndex = 0; startIndex < tableSize; startIndex++) {
        // Diagonal elements: product of single element
        productTable[startIndex][startIndex] = powersOf2Array[startIndex];
        
        // Fill row from startIndex to end
        for (let endIndex = startIndex + 1; endIndex < tableSize; endIndex++) {
            // Product[i][j] = Product[i][j-1] * powers[j]
            const previousProduct = productTable[startIndex][endIndex - 1];
            const currentPower = powersOf2Array[endIndex];
            
            // Use BigInt arithmetic to prevent overflow before modulo
            productTable[startIndex][endIndex] = 
                Number((BigInt(previousProduct) * BigInt(currentPower)) % BigInt(MODULO));
        }
    }
    
    // Process queries using precomputed table
    const queryResults: number[] = new Array(queries.length);
    for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
        const [leftIndex, rightIndex] = queries[queryIndex];
        queryResults[queryIndex] = productTable[leftIndex][rightIndex];
    }
    
    return queryResults;
};