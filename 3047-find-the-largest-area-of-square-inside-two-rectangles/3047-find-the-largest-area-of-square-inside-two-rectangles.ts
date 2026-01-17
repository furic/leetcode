/**
 * Finds the maximum area of a square that can fit in the intersection of at least two rectangles
 * Strategy: Check all pairs of rectangles, find their intersection, calculate largest square that fits
 * Square side = min(intersection width, intersection height)
 */
const largestSquareArea = (bottomLeft: number[][], topRight: number[][]): number => {
    const numRectangles = bottomLeft.length;
    let maxSquareArea = 0;

    // Check all pairs of rectangles to find their intersections
    for (let firstRectIndex = 0; firstRectIndex < numRectangles - 1; firstRectIndex++) {
        for (let secondRectIndex = firstRectIndex + 1; secondRectIndex < numRectangles; secondRectIndex++) {
            // Calculate intersection rectangle bounds
            // Intersection left edge = rightmost of the two left edges
            const intersectionLeft = Math.max(
                bottomLeft[firstRectIndex][0], 
                bottomLeft[secondRectIndex][0]
            );
            
            // Intersection right edge = leftmost of the two right edges
            const intersectionRight = Math.min(
                topRight[firstRectIndex][0], 
                topRight[secondRectIndex][0]
            );
            
            // Intersection bottom edge = topmost of the two bottom edges
            const intersectionBottom = Math.max(
                bottomLeft[firstRectIndex][1], 
                bottomLeft[secondRectIndex][1]
            );
            
            // Intersection top edge = bottommost of the two top edges
            const intersectionTop = Math.min(
                topRight[firstRectIndex][1], 
                topRight[secondRectIndex][1]
            );
            
            // Check if intersection exists (positive width and height)
            if (intersectionLeft < intersectionRight && intersectionBottom < intersectionTop) {
                const intersectionWidth = intersectionRight - intersectionLeft;
                const intersectionHeight = intersectionTop - intersectionBottom;
                
                // Largest square that fits has side length = min dimension
                const squareSide = Math.min(intersectionWidth, intersectionHeight);
                const squareArea = squareSide ** 2;
                
                maxSquareArea = Math.max(maxSquareArea, squareArea);
            }
        }
    }

    return maxSquareArea;
};