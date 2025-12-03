/**
 * Counts unique trapezoids formed by choosing 4 distinct points
 * A trapezoid has at least one pair of parallel sides (same slope)
 * Strategy: Count pairs of parallel segments, then subtract overcounts (parallelograms counted twice)
 */
const countTrapezoids = (points: number[][]): number => {
    const numPoints = points.length;
    const VERTICAL_SLOPE = 1e9 + 7; // Sentinel value for vertical lines
    
    // Map: slope → array of y-intercepts of all line segments with that slope
    const slopeToIntercepts: Map<number, number[]> = new Map();
    
    // Map: coordinate sum → array of slopes of segments with that sum
    // Coordinate sum = (x1+x2)*10000 + (y1+y2), uniquely identifies the midpoint
    const midpointToSlopes: Map<number, number[]> = new Map();
    
    let trapezoidCount = 0;

    // Build maps by examining all pairs of points (line segments)
    for (let i = 0; i < numPoints; i++) {
        const [x1, y1] = points[i];
        
        for (let j = i + 1; j < numPoints; j++) {
            const [x2, y2] = points[j];
            const deltaX = x1 - x2;
            const deltaY = y1 - y2;

            // Calculate slope and y-intercept of the line through these two points
            let slope: number;
            let yIntercept: number;
            
            if (x2 === x1) {
                // Vertical line: use sentinel value and x-coordinate as "intercept"
                slope = VERTICAL_SLOPE;
                yIntercept = x1;
            } else {
                slope = (y2 - y1) / (x2 - x1);
                // Y-intercept: y = mx + b → b = y - mx
                yIntercept = (y1 * deltaX - x1 * deltaY) / deltaX;
            }

            // Encode midpoint as coordinate sum (uniquely identifies this pair of points)
            const midpointHash = (x1 + x2) * 10000 + (y1 + y2);
            
            if (!slopeToIntercepts.has(slope)) {
                slopeToIntercepts.set(slope, []);
            }
            if (!midpointToSlopes.has(midpointHash)) {
                midpointToSlopes.set(midpointHash, []);
            }
            
            slopeToIntercepts.get(slope)!.push(yIntercept);
            midpointToSlopes.get(midpointHash)!.push(slope);
        }
    }

    // Count all pairs of parallel line segments (same slope, different intercept)
    // Each pair represents 4 points with at least one pair of parallel sides
    for (const intercepts of slopeToIntercepts.values()) {
        if (intercepts.length < 2) continue;
        
        // Group segments by y-intercept and count pairs from different lines
        const interceptCounts = new Map<number, number>();
        for (const intercept of intercepts) {
            interceptCounts.set(intercept, (interceptCounts.get(intercept) || 0) + 1);
        }

        // Count pairs of segments with same slope but different intercepts
        let runningSum = 0;
        for (const count of interceptCounts.values()) {
            trapezoidCount += runningSum * count;
            runningSum += count;
        }
    }

    // Subtract overcounts: parallelograms were counted twice (once for each pair of parallel sides)
    // Detect parallelograms: two segments with same midpoint are diagonals of a parallelogram
    for (const slopes of midpointToSlopes.values()) {
        if (slopes.length < 2) continue;
        
        // If multiple segments share a midpoint, they form diagonals of a parallelogram
        const slopeCounts = new Map<number, number>();
        for (const slope of slopes) {
            slopeCounts.set(slope, (slopeCounts.get(slope) || 0) + 1);
        }

        // Count pairs of segments with same midpoint but different slopes
        // (different slopes means non-degenerate parallelogram)
        let runningSum = 0;
        for (const count of slopeCounts.values()) {
            trapezoidCount -= runningSum * count;
            runningSum += count;
        }
    }

    return trapezoidCount;
};