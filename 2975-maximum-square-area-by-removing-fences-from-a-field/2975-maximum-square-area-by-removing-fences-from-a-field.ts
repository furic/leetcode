/**
 * Finds maximum area of a square field by removing fences from a rectangular grid
 * Strategy: Find all possible gaps in both directions, find largest common gap for a square
 * Square side = largest gap that exists in both horizontal and vertical directions
 */
const maximizeSquareArea = (
    fieldHeight: number, 
    fieldWidth: number, 
    horizontalFences: number[], 
    verticalFences: number[]
): number => {
    const MOD = 1_000_000_007n;

    /**
     * Prepares fence positions by adding boundaries and sorting
     * @param fencePositions - array of fence positions (excluding boundaries)
     * @param boundaryLimit - far boundary position (m or n)
     * @returns sorted array with boundaries [1, ...sorted fences..., limit]
     */
    const addBoundariesAndSort = (fencePositions: number[], boundaryLimit: number): number[] => {
        return [1, ...fencePositions.sort((a, b) => a - b), boundaryLimit];
    };

    // Add field boundaries (1 and m/n) to fence positions
    const horizontalPositions = addBoundariesAndSort(horizontalFences, fieldHeight);
    const verticalPositions = addBoundariesAndSort(verticalFences, fieldWidth);

    // Find all possible horizontal gaps (distances between any two horizontal fences)
    const horizontalGaps = new Set<number>();
    
    for (let startIndex = 0; startIndex < horizontalPositions.length; startIndex++) {
        for (let endIndex = startIndex + 1; endIndex < horizontalPositions.length; endIndex++) {
            const gapSize = horizontalPositions[endIndex] - horizontalPositions[startIndex];
            horizontalGaps.add(gapSize);
        }
    }

    // Find largest vertical gap that also exists as a horizontal gap (for a square)
    let largestSquareSide = 0;
    
    for (let startIndex = 0; startIndex < verticalPositions.length; startIndex++) {
        for (let endIndex = startIndex + 1; endIndex < verticalPositions.length; endIndex++) {
            const gapSize = verticalPositions[endIndex] - verticalPositions[startIndex];
            
            // Check if this vertical gap can form a square (exists as horizontal gap too)
            if (gapSize > largestSquareSide && horizontalGaps.has(gapSize)) {
                largestSquareSide = gapSize;
            }
        }
    }

    // No valid square found
    if (largestSquareSide === 0) return -1;
    
    // Calculate area with BigInt to handle large numbers, then mod
    const squareArea = (BigInt(largestSquareSide) * BigInt(largestSquareSide)) % MOD;
    
    return Number(squareArea);
};