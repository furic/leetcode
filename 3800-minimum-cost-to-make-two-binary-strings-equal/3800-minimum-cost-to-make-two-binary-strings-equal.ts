/**
 * Finds minimum cost to make two binary strings equal using flip, swap, and cross-swap operations
 * Uses bitwise optimizations for performance with large strings
 * Strategy: Categorize mismatches into types, optimally pair them, handle remainder
 */
const minimumCost = (
    s: string,
    t: string,
    flipCost: number,
    swapCost: number,
    crossCost: number
): number => {
    const stringLength = s.length;

    let totalMismatches = 0;
    let typeBMismatches = 0; // Count where s[i]='1', t[i]='0'

    // Performance optimization: Buffer operations are faster for large strings
    const BUFFER_OPTIMIZATION_THRESHOLD = 2048;
    
    if (stringLength >= BUFFER_OPTIMIZATION_THRESHOLD) {
        // Use Buffer for bitwise operations (faster for large n)
        const sBuffer = Buffer.from(s);
        const tBuffer = Buffer.from(t);

        for (let i = 0; i < stringLength; i++) {
            // XOR trick: (a XOR b) & 1 = 1 if binary digits differ, 0 if same
            // Works because '0'=48=0b110000, '1'=49=0b110001 (differ in last bit)
            const isDifferent = (sBuffer[i] ^ tBuffer[i]) & 1;
            totalMismatches += isDifferent;
            
            // Count Type B: bitwise AND checks if s[i]='1' when mismatch exists
            typeBMismatches += isDifferent & (sBuffer[i] & 1);
        }
    } else {
        // Regular charCode operations for smaller strings
        for (let i = 0; i < stringLength; i++) {
            const sCharCode = s.charCodeAt(i);
            const tCharCode = t.charCodeAt(i);
            const isDifferent = (sCharCode ^ tCharCode) & 1;
            totalMismatches += isDifferent;
            typeBMismatches += isDifferent & (sCharCode & 1);
        }
    }

    // Early exit: strings already equal
    if (totalMismatches === 0) return 0;

    // Type A: s[i]='0', t[i]='1' (s needs to increase or t needs to decrease)
    const typeAMismatches = totalMismatches - typeBMismatches;

    // Phase 1: Pair opposite types (A with B)
    const oppositePairs = Math.min(typeAMismatches, typeBMismatches);
    
    // Phase 2: Remaining same-type mismatches
    const remainingSameType = Math.abs(typeAMismatches - typeBMismatches);

    // Cost calculations
    const doubleFlipCost = flipCost * 2;
    
    // Opposite pairs: min(swap within string, flip both)
    const costPerOppositePair = Math.min(swapCost, doubleFlipCost);
    
    // Same-type pairs: min(cross-swap + swap, flip both)
    const costPerSameTypePair = Math.min(crossCost + swapCost, doubleFlipCost);

    // Total cost breakdown
    const oppositePairsCost = oppositePairs * costPerOppositePair;
    const sameTypePairsCost = (remainingSameType >> 1) * costPerSameTypePair; // >> 1 is /2
    const singleLeftoverCost = (remainingSameType & 1) * flipCost; // & 1 is %2

    return oppositePairsCost + sameTypePairsCost + singleLeftoverCost;
};