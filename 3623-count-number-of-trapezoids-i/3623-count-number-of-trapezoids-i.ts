/**
 * Counts unique horizontal trapezoids formed by choosing 4 distinct points
 * A horizontal trapezoid has at least one pair of horizontal parallel sides
 * Strategy: Count pairs of horizontal line segments from different y-levels
 */
const countTrapezoids = (points: number[][]): number => {
    // Group points by y-coordinate: y → count of points at that y-level
    const pointCountByYLevel = new Map<number, number>();
    
    for (const [x, y] of points) {
        pointCountByYLevel.set(y, (pointCountByYLevel.get(y) || 0) + 1);
    }

    let totalSegmentCount = 0n;
    let sumOfSquaredSegmentCounts = 0n;
    const MOD = BigInt(10 ** 9 + 7);
    
    // For each y-level, calculate number of horizontal line segments that can be formed
    for (const pointsAtLevel of pointCountByYLevel.values()) {
        if (pointsAtLevel < 2) continue;
        
        // Number of horizontal segments from n points at same y: C(n, 2) = n(n-1)/2
        const segmentsAtLevel = BigInt((pointsAtLevel * (pointsAtLevel - 1)) / 2);

        totalSegmentCount += segmentsAtLevel;
        sumOfSquaredSegmentCounts += segmentsAtLevel * segmentsAtLevel;
    }
    
    // Count trapezoids by choosing 2 segments from different y-levels
    // Formula: C(totalSegments, 2) - sum of C(segmentsAtEachLevel, 2)
    // Simplifies to: (sum² - sumOfSquares) / 2
    const trapezoidCount = (totalSegmentCount * totalSegmentCount - sumOfSquaredSegmentCounts) / 2n;
    
    return Number(trapezoidCount % MOD);
};