/**
 * Counts ways to paint an n×3 grid with 3 colors such that no adjacent cells share colors
 * Uses DP by categorizing rows into two pattern types: ABA (121) and ABC (123)
 * Pattern ABA: first and last columns same, middle different (e.g., Red-Yellow-Red)
 * Pattern ABC: all three columns different (e.g., Red-Yellow-Green)
 */
const numOfWays = (n: number): number => {
    const MOD = 1e9 + 7;
    
    // For a single row (n=1):
    // ABA patterns: 3 choices for outer color × 2 choices for middle = 6 ways
    // ABC patterns: 3 × 2 × 1 (all different) = 6 ways
    let abaPatternCount = 6;
    let abcPatternCount = 6;
    
    // Build up row by row using transition rules
    for (let rowIndex = 2; rowIndex <= n; rowIndex++) {
        // Transition formulas (derived from compatibility analysis):
        // From ABA row → 3 compatible ABA rows, 2 compatible ABC rows
        // From ABC row → 2 compatible ABA rows, 2 compatible ABC rows
        const nextAbaCount = (abaPatternCount * 3 + abcPatternCount * 2) % MOD;
        const nextAbcCount = (abaPatternCount * 2 + abcPatternCount * 2) % MOD;
        
        abaPatternCount = nextAbaCount;
        abcPatternCount = nextAbcCount;
    }
    
    // Total ways = sum of both pattern types in final row
    return (abaPatternCount + abcPatternCount) % MOD;
};