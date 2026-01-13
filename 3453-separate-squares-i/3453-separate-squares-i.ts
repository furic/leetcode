/**
 * Finds the minimum y-coordinate of a horizontal line that splits total square area in half
 * Uses binary search to find the cutoff where area below = area above = totalArea/2
 * Strategy: Binary search on y-coordinate, checking if enough area is below the line
 */
const separateSquares = (squares: number[][]): number => {
    let maxYCoordinate = 0;
    let totalArea = 0;
    
    // Calculate total area and find upper bound for binary search
    for (const [x, y, sideLength] of squares) {
        totalArea += sideLength * sideLength;
        maxYCoordinate = Math.max(maxYCoordinate, y + sideLength);
    }

    /**
     * Checks if area below horizontal line at given y-coordinate is at least half total area
     * @param horizontalLineY - y-coordinate of the horizontal dividing line
     * @returns true if area below line >= totalArea/2
     */
    const hasEnoughAreaBelow = (horizontalLineY: number): boolean => {
        let areaBelowLine = 0;
        
        for (const [x, y, sideLength] of squares) {
            // Only count squares that have some portion below the line
            if (y < horizontalLineY) {
                // Height of portion below line = min(line height - square bottom, square height)
                // If line is above square top: use full square height
                // If line cuts through square: use partial height
                const heightBelowLine = Math.min(horizontalLineY - y, sideLength);
                const areaBelowFromThisSquare = sideLength * heightBelowLine;
                areaBelowLine += areaBelowFromThisSquare;
            }
        }
        
        // Return true if we have at least half the area below
        return areaBelowLine >= totalArea / 2;
    };

    // Binary search for the minimum y-coordinate where area below >= half total area
    const PRECISION_THRESHOLD = 1e-5;
    let lowerBound = 0;
    let upperBound = maxYCoordinate;
    
    while (Math.abs(upperBound - lowerBound) > PRECISION_THRESHOLD) {
        const candidateY = (upperBound + lowerBound) / 2;
        
        if (hasEnoughAreaBelow(candidateY)) {
            // Too much area below, move line down (try smaller y)
            upperBound = candidateY;
        } else {
            // Not enough area below, move line up (try larger y)
            lowerBound = candidateY;
        }
    }
    
    // Return the minimum y-coordinate that satisfies the condition
    return upperBound;
};