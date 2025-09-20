const soupServings = (n: number): number => {
    // Optimization: For large n, probability approaches 1 due to A being favored
    const LARGE_N_THRESHOLD = 4800;
    if (n >= LARGE_N_THRESHOLD) {
        return 1;
    }
    
    // Scale down by 25 to reduce state space (since all operations are multiples of 25)
    const SCALE_FACTOR = 25;
    const scaledInitialAmount = Math.ceil(n / SCALE_FACTOR);
    
    // Memoization table: memo[soupA][soupB] = probability
    const MEMO_SIZE = 200;
    const memoTable = new Array(MEMO_SIZE)
        .fill(0)
        .map(() => new Array(MEMO_SIZE).fill(-1));
    
    // Recursive function to calculate probability
    const calculateProbability = (soupARemaining: number, soupBRemaining: number): number => {
        // Base cases
        if (soupARemaining <= 0 && soupBRemaining <= 0) {
            return 0.5; // Both empty simultaneously - count as half
        }
        if (soupARemaining <= 0) {
            return 1; // A empty first - we want this outcome
        }
        if (soupBRemaining <= 0) {
            return 0; // B empty first - we don't want this
        }
        
        // Check memoization
        if (memoTable[soupARemaining][soupBRemaining] !== -1) {
            return memoTable[soupARemaining][soupBRemaining];
        }
        
        // Calculate probability as average of all four operations (each with 0.25 probability)
        // After scaling by 25: operations become (4,0), (3,1), (2,2), (1,3)
        const probabilityResult = 0.25 * (
            calculateProbability(soupARemaining - 4, soupBRemaining) +     // Pour 100mL A, 0mL B
            calculateProbability(soupARemaining - 3, soupBRemaining - 1) + // Pour 75mL A, 25mL B  
            calculateProbability(soupARemaining - 2, soupBRemaining - 2) + // Pour 50mL A, 50mL B
            calculateProbability(soupARemaining - 1, soupBRemaining - 3)   // Pour 25mL A, 75mL B
        );
        
        // Store in memoization table
        memoTable[soupARemaining][soupBRemaining] = probabilityResult;
        return probabilityResult;
    };
    
    return calculateProbability(scaledInitialAmount, scaledInitialAmount);
};