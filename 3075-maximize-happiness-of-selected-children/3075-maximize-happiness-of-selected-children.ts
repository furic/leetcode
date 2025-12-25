/**
 * Finds maximum sum of happiness by selecting k children
 * Each selection decrements all unselected children's happiness by 1
 * Strategy: Greedily select children with highest happiness first
 */
const maximumHappinessSum = (happiness: number[], k: number): number => {
    // Sort in descending order - always pick highest available happiness
    happiness.sort((a, b) => b - a);
    
    let totalHappiness = 0;
    
    // Select k children in order of highest happiness
    for (let turn = 0; turn < k; turn++) {
        // Child's effective happiness after 'turn' previous selections
        // Each previous selection decremented this child's happiness by 1
        const effectiveHappiness = Math.max(0, happiness[turn] - turn);
        totalHappiness += effectiveHappiness;
    }
    
    return totalHappiness;
};