/**
 * Module-level reusable array for memory efficiency
 * Note: This pattern avoids repeated allocations but makes the function non-reentrant
 */
const globalSequence = new Int32Array(1e5);

/**
 * Finds the maximum value in a sequence that satisfies difference and restriction constraints
 * Strategy: Initialize with infinity, apply restrictions, then propagate constraints forward/backward
 */
const findMaxVal = (
    n: number,
    restrictions: number[][],
    diff: number[]
): number => {
    // Initialize all positions (except first) to infinity (effectively unlimited)
    // Note: Position 0 remains 0 (from Int32Array initialization)
    globalSequence.fill(1e9, 1, n);
    
    // Ensure first element is explicitly 0 (required constraint)
    globalSequence[0] = 0;
    
    // Apply hard upper-bound restrictions at specific positions
    for (const [position, maxAllowedValue] of restrictions) {
        globalSequence[position] = maxAllowedValue;
    }
    
    // Build valid sequence by propagating constraints
    for (let currentIndex = 1; currentIndex < n; currentIndex++) {
        // Forward propagation: current value limited by (previous + allowed difference)
        globalSequence[currentIndex] = Math.min(
            globalSequence[currentIndex - 1] + diff[currentIndex - 1],
            globalSequence[currentIndex]
        );
        
        // Backward adjustment: if setting current value creates violations in previous positions,
        // reduce those positions to maintain difference constraints
        // (e.g., if current is low due to restriction, previous values may be too high)
        for (
            let backtrackIndex = currentIndex - 1;
            backtrackIndex >= 0 && 
            globalSequence[backtrackIndex] - globalSequence[backtrackIndex + 1] > diff[backtrackIndex];
            backtrackIndex--
        ) {
            globalSequence[backtrackIndex] = globalSequence[backtrackIndex + 1] + diff[backtrackIndex];
        }
    }
    
    // Find and return the maximum value in the constructed sequence
    let maxValue = 0;
    for (let i = 0; i < n; i++) {
        maxValue = Math.max(maxValue, globalSequence[i]);
    }
    
    return maxValue;
};