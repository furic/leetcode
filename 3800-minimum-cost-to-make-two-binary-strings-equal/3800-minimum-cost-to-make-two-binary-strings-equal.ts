/**
 * Finds minimum cost to make two binary strings equal using flip, swap, and cross-swap operations
 * Strategy: Categorize mismatches, optimally pair them, handle remainder
 * 
 * Mismatch types:
 * - Type A: s[i]='0', t[i]='1' (need s to increase or t to decrease)
 * - Type B: s[i]='1', t[i]='0' (need s to decrease or t to increase)
 * 
 * Optimal pairing strategies:
 * 1. A-B pair: Can swap within s (or t) → cost = min(swapCost, 2×flipCost)
 * 2. A-A or B-B pair: Cross-swap one, then swap → cost = min(crossCost + swapCost, 2×flipCost)
 * 3. Single leftover: Must flip → cost = flipCost
 */
const minimumCost = (
    s: string,
    t: string,
    flipCost: number,
    swapCost: number,
    crossCost: number
): number => {
    // Count mismatch types
    let typeACount = 0; // s[i]='0', t[i]='1'
    let typeBCount = 0; // s[i]='1', t[i]='0'

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '0' && t[i] === '1') {
            typeACount++;
        } else if (s[i] === '1' && t[i] === '0') {
            typeBCount++;
        }
    }

    let totalCost = 0;

    // Phase 1: Pair up Type A with Type B mismatches
    // Strategy: Swap within same string (e.g., swap s[i] with s[j])
    // Alternative: Flip both positions
    const pairedABCount = Math.min(typeACount, typeBCount);
    totalCost += pairedABCount * Math.min(2 * flipCost, swapCost);

    // Phase 2: Handle remaining mismatches (all same type)
    const remainingCount = Math.max(typeACount, typeBCount) - pairedABCount;

    // Pair up remaining same-type mismatches (e.g., two Type A's)
    // Strategy: Cross-swap one position to convert type, then swap within string
    // Alternative: Flip both positions
    const pairedSameTypeCount = Math.floor(remainingCount / 2);
    totalCost += pairedSameTypeCount * Math.min(2 * flipCost, crossCost + swapCost);

    // Phase 3: Handle single leftover (if any)
    // No choice but to flip it
    if (remainingCount % 2 === 1) {
        totalCost += flipCost;
    }

    return totalCost;
};