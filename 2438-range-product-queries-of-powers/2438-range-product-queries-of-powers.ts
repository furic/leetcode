const productQueries = (n: number, queries: number[][]): number[] => {
    const MODULO = 1000000007;
    
    // Extract all powers of 2 that sum to n using bit manipulation
    const extractPowersOf2 = (number: number): number[] => {
        const powersArray: number[] = [];
        
        while (number > 0) {
            // Get the lowest set bit (rightmost 1 bit)
            // Example: if number = 12 (1100), lowest bit = 4 (0100)
            const lowestPowerOf2 = number & -number;
            powersArray.push(lowestPowerOf2);
            
            // Remove this bit from the number using XOR
            number ^= lowestPowerOf2;
        }
        
        return powersArray;
    };
    
    // Build 2D table for range product queries
    const buildProductTable = (powers: number[]): number[][] => {
        const tableSize = powers.length;
        const productTable: number[][] = Array.from({ length: tableSize }, () => 
            new Array(tableSize).fill(0)
        );
        
        // Fill the table: productTable[i][j] = product of powers[i] through powers[j]
        for (let startIndex = 0; startIndex < tableSize; startIndex++) {
            // Diagonal elements: product of single element
            productTable[startIndex][startIndex] = powers[startIndex];
            
            // Fill row from startIndex to end
            for (let endIndex = startIndex + 1; endIndex < tableSize; endIndex++) {
                // Product[i][j] = Product[i][j-1] * powers[j]
                const previousProduct = productTable[startIndex][endIndex - 1];
                const currentPower = powers[endIndex];
                
                // Use long arithmetic to prevent overflow before modulo
                productTable[startIndex][endIndex] = 
                    Number((BigInt(previousProduct) * BigInt(currentPower)) % BigInt(MODULO));
            }
        }
        
        return productTable;
    };
    
    // Process queries using precomputed table
    const processQueries = (
        queryList: number[][], 
        productTable: number[][]
    ): number[] => {
        return queryList.map(([leftIndex, rightIndex]) => 
            productTable[leftIndex][rightIndex]
        );
    };
    
    // Main algorithm execution
    const powersOf2Array = extractPowersOf2(n);
    const precomputedProductTable = buildProductTable(powersOf2Array);
    const queryResults = processQueries(queries, precomputedProductTable);
    
    return queryResults;
};