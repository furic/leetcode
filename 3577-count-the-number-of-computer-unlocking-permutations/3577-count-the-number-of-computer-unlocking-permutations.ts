/**
 * Counts valid permutations for unlocking computers in order
 * All computers (except root 0) must have strictly higher complexity than root
 * If valid, any order works: (n-1)! permutations
 */
const countPermutations = (complexity: number[]): number => {
    const numComputers = complexity.length;
    const rootComplexity = complexity[0];
    
    // Verify all non-root computers have strictly higher complexity than root
    // If not, they cannot be unlocked (no valid computer j can unlock them)
    for (let i = 1; i < numComputers; i++) {
        if (complexity[i] <= rootComplexity) {
            return 0;
        }
    }

    // If valid: computer 0 can unlock any other computer (all have higher complexity)
    // After unlocking, those computers can also unlock others with higher complexity
    // Result: remaining (n-1) computers can be unlocked in any order = (n-1)!
    let permutationCount = 1;
    const MOD = 1e9 + 7;
    
    // Calculate (n-1)! = 2 × 3 × 4 × ... × (n-1)
    for (let factorial = 2; factorial < numComputers; factorial++) {
        permutationCount = (permutationCount * factorial) % MOD;
    }
    
    return permutationCount;
};