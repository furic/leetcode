/**
 * Finds minimum cost to transform source string to target using character substitutions
 * Strategy: Use Floyd-Warshall to precompute shortest transformation paths between all character pairs
 * Then sum up transformation costs for each position
 */
const minimumCost = (
    source: string,
    target: string,
    original: string[],
    changed: string[],
    cost: number[]
): number => {
    const NUM_LETTERS = 26;
    const CHAR_CODE_A = 97; // ASCII code for 'a'
    
    // Floyd-Warshall distance matrix: minTransformCost[i][j] = min cost to transform char i to char j
    const minTransformCost = Array.from({ length: NUM_LETTERS }, 
        () => Array(NUM_LETTERS).fill(Infinity)
    );

    // Base case: transforming a character to itself costs 0
    for (let char = 0; char < NUM_LETTERS; char++) {
        minTransformCost[char][char] = 0;
    }

    // Build initial graph with direct transformation costs
    // If multiple transformations exist for same pair, keep the minimum
    for (let i = 0; i < original.length; i++) {
        const fromChar = original[i].charCodeAt(0) - CHAR_CODE_A;
        const toChar = changed[i].charCodeAt(0) - CHAR_CODE_A;
        minTransformCost[fromChar][toChar] = Math.min(
            minTransformCost[fromChar][toChar],
            cost[i]
        );
    }

    // Floyd-Warshall: find minimum cost paths between all character pairs
    // Try all intermediate characters to find shortest transformation sequences
    for (let intermediate = 0; intermediate < NUM_LETTERS; intermediate++) {
        for (let from = 0; from < NUM_LETTERS; from++) {
            for (let to = 0; to < NUM_LETTERS; to++) {
                // Check if going through 'intermediate' is cheaper
                minTransformCost[from][to] = Math.min(
                    minTransformCost[from][to],
                    minTransformCost[from][intermediate] + minTransformCost[intermediate][to]
                );
            }
        }
    }

    // Calculate total cost by transforming each character in source to target
    let totalCost = 0;
    
    for (let position = 0; position < source.length; position++) {
        const sourceChar = source.charCodeAt(position) - CHAR_CODE_A;
        const targetChar = target.charCodeAt(position) - CHAR_CODE_A;
        
        // If transformation is impossible, return -1
        if (minTransformCost[sourceChar][targetChar] === Infinity) {
            return -1;
        }
        
        totalCost += minTransformCost[sourceChar][targetChar];
    }

    return totalCost;
};