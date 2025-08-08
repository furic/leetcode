const soupServings = (initialVolume: number): number => {
    // Convert volume to units of 25mL for easier computation
    // This reduces the problem space since all operations are multiples of 25
    const volumeUnits = Math.ceil(initialVolume / 25.0);
    
    // Memoization table: dp[soupA][soupB] = probability that A finishes first + 0.5 * probability both finish together
    const probabilityMemo: Map<number, Map<number, number>> = new Map();
    
    // Initialize base case: when both soups are empty, probability is 0.5 (both finish together)
    probabilityMemo.set(0, new Map());
    probabilityMemo.get(0)!.set(0, 0.5);
    
    // Build up the DP table for increasing soup amounts
    for (let currentUnits = 1; currentUnits <= volumeUnits; currentUnits++) {
        probabilityMemo.set(currentUnits, new Map());
        
        // Base cases: when one soup is empty
        probabilityMemo.get(0)!.set(currentUnits, 1.0); // A is empty, B has soup remaining -> A finishes first
        probabilityMemo.get(currentUnits)!.set(0, 0.0); // B is empty, A has soup remaining -> B finishes first
        
        // Calculate probabilities for all combinations up to currentUnits
        for (let soupAUnits = 1; soupAUnits <= currentUnits; soupAUnits++) {
            probabilityMemo.get(soupAUnits)!.set(currentUnits, calculateProbability(soupAUnits, currentUnits, probabilityMemo));
            probabilityMemo.get(currentUnits)!.set(soupAUnits, calculateProbability(currentUnits, soupAUnits, probabilityMemo));
        }
        
        // Optimization: if probability is very close to 1, return early
        // This works because as volumes get large, A is much more likely to finish first
        const currentProbability = probabilityMemo.get(currentUnits)!.get(currentUnits)!;
        if (currentProbability > 1 - 1e-5) {
            return 1.0;
        }
    }
    
    return probabilityMemo.get(volumeUnits)!.get(volumeUnits)!;
};

/**
 * Calculate the probability using the four possible serving operations:
 * - Operation 1: Pour 4 units from A, 0 from B (100mL A, 0mL B)
 * - Operation 2: Pour 3 units from A, 1 from B (75mL A, 25mL B) 
 * - Operation 3: Pour 2 units from A, 2 from B (50mL A, 50mL B)
 * - Operation 4: Pour 1 unit from A, 3 from B (25mL A, 75mL B)
 */
const calculateProbability = (
    soupAUnits: number, 
    soupBUnits: number, 
    probabilityMemo: Map<number, Map<number, number>>
): number => {
    const operation1Probability = probabilityMemo.get(Math.max(0, soupAUnits - 4))!.get(soupBUnits)!;
    const operation2Probability = probabilityMemo.get(Math.max(0, soupAUnits - 3))!.get(Math.max(0, soupBUnits - 1))!;
    const operation3Probability = probabilityMemo.get(Math.max(0, soupAUnits - 2))!.get(Math.max(0, soupBUnits - 2))!;
    const operation4Probability = probabilityMemo.get(soupAUnits - 1)!.get(Math.max(0, soupBUnits - 3))!;
    
    // Each operation has 0.25 probability, so take the average
    return (operation1Probability + operation2Probability + operation3Probability + operation4Probability) / 4.0;
};