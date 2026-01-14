/**
 * Finds the minimum y-coordinate of a horizontal line that splits total covered area in half
 * Uses sweep line algorithm to handle overlapping squares correctly (count overlaps only once)
 * Strategy: Process squares bottom-to-top, merge overlapping x-intervals, accumulate areas
 */
const separateSquares = (squares: number[][]): number => {
    // Create events for sweep line algorithm
    // Event: [yCoordinate, eventType, xLeft, xRight]
    // eventType: 1 = square bottom (add interval), -1 = square top (remove interval)
    const sweepLineEvents: [number, number, number, number][] = [];
    
    for (const [x, y, sideLength] of squares) {
        // Bottom edge: start tracking this x-interval
        sweepLineEvents.push([y, 1, x, x + sideLength]);
        // Top edge: stop tracking this x-interval
        sweepLineEvents.push([y + sideLength, -1, x, x + sideLength]);
    }

    // Sort events by y-coordinate (bottom events before top events at same y)
    sweepLineEvents.sort((a, b) => 
        a[0] - b[0] || // Primary: y-coordinate
        a[1] - b[1] || // Secondary: event type (bottom before top)
        a[2] - b[2] || // Tertiary: x-left
        a[3] - b[3]    // Quaternary: x-right
    );

    /**
     * Calculates the total width covered by potentially overlapping intervals
     * Merges overlapping intervals to avoid double-counting
     */
    const calculateUnionWidth = (intervals: [number, number][]): number => {
        if (intervals.length === 0) return 0;
        
        // Sort intervals by left endpoint
        intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        
        let totalCoveredWidth = 0;
        let currentRightmost = -Infinity;
        
        for (const [left, right] of intervals) {
            if (left > currentRightmost) {
                // No overlap: add entire interval
                totalCoveredWidth += right - left;
                currentRightmost = right;
            } else if (right > currentRightmost) {
                // Partial overlap: add only the non-overlapping part
                totalCoveredWidth += right - currentRightmost;
                currentRightmost = right;
            }
            // Else: completely covered, add nothing
        }
        
        return totalCoveredWidth;
    };

    // Track active x-intervals (squares that span current y-level)
    let activeXIntervals: [number, number][] = [];
    let previousY = sweepLineEvents[0][0];
    let totalCoveredArea = 0;
    
    // Store horizontal slices: [startY, height, width]
    const horizontalSlices: [number, number, number][] = [];

    // Process events with sweep line
    for (const [currentY, eventType, xLeft, xRight] of sweepLineEvents) {
        // Process the horizontal slice from previousY to currentY
        if (currentY > previousY && activeXIntervals.length > 0) {
            const sliceHeight = currentY - previousY;
            // Calculate actual width considering overlaps
            const sliceWidth = calculateUnionWidth([...activeXIntervals]);
            
            horizontalSlices.push([previousY, sliceHeight, sliceWidth]);
            totalCoveredArea += sliceHeight * sliceWidth;
        }

        // Update active intervals based on event type
        if (eventType === 1) {
            // Square bottom: add x-interval to active set
            activeXIntervals.push([xLeft, xRight]);
        } else {
            // Square top: remove x-interval from active set
            const indexToRemove = activeXIntervals.findIndex(
                ([left, right]) => left === xLeft && right === xRight
            );
            if (indexToRemove !== -1) {
                activeXIntervals.splice(indexToRemove, 1);
            }
        }

        previousY = currentY;
    }

    // Find the y-coordinate where accumulated area reaches half of total
    const halfTotalArea = totalCoveredArea / 2;
    let accumulatedArea = 0;

    for (const [sliceStartY, sliceHeight, sliceWidth] of horizontalSlices) {
        const sliceArea = sliceHeight * sliceWidth;
        
        if (accumulatedArea + sliceArea >= halfTotalArea) {
            // The split line is somewhere within this slice
            // Calculate exact y-coordinate: startY + (remaining area / width)
            const remainingAreaNeeded = halfTotalArea - accumulatedArea;
            const additionalHeight = remainingAreaNeeded / sliceWidth;
            return sliceStartY + additionalHeight;
        }
        
        accumulatedArea += sliceArea;
    }

    // Edge case: should not reach here with valid input
    return previousY;
};