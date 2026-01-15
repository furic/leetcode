/**
 * Finds maximum area of square hole by removing bars from a grid
 * Strategy: Find longest consecutive sequence of removable bars in each direction
 * Square side = min(horizontal gap, vertical gap)
 */
const maximizeSquareHoleArea = (
    n: number, 
    m: number, 
    hBars: number[], 
    vBars: number[]
): number => {
    /**
     * Finds the maximum gap size achievable by removing consecutive bars
     * @param removableBars - array of bar positions that can be removed
     * @returns size of largest gap (consecutive bars + 1)
     * 
     * Example: If bars [2,3,4] are consecutive and removable,
     * removing them creates a gap of size 4 (between bar 1 and bar 5)
     */
    const findMaxConsecutiveGap = (removableBars: number[]): number => {
        // Sort to find consecutive sequences
        removableBars.sort((a, b) => a - b);
        
        let maxConsecutiveCount = 1;
        let currentConsecutiveCount = 1;
        
        // Find longest sequence of consecutive bar positions
        for (let i = 1; i < removableBars.length; i++) {
            if (removableBars[i] === removableBars[i - 1] + 1) {
                // Bars are consecutive, extend current sequence
                currentConsecutiveCount++;
                maxConsecutiveCount = Math.max(maxConsecutiveCount, currentConsecutiveCount);
            } else {
                // Gap in sequence, restart counting
                currentConsecutiveCount = 1;
            }
        }
        
        // Gap size = number of removed bars + 1
        // (k consecutive removed bars create a hole of size k+1)
        return maxConsecutiveCount + 1;
    };

    // Find maximum gap in each direction
    const maxHorizontalGap = findMaxConsecutiveGap(hBars);
    const maxVerticalGap = findMaxConsecutiveGap(vBars);
    
    // Square is limited by the smaller dimension
    const maxSquareSide = Math.min(maxHorizontalGap, maxVerticalGap);
    
    return maxSquareSide * maxSquareSide;
};