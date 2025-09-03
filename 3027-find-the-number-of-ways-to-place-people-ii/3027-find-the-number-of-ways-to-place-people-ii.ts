const numberOfPairs = (points: number[][]): number => {
    let validPairsCount = 0;

    // Sort by x ascending, then by y descending 
    // This ensures we process Alice positions left-to-right, top-to-bottom
    points.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

    for (let aliceIndex = 0; aliceIndex < points.length - 1; aliceIndex++) {
        const alicePosition = points[aliceIndex];
        
        // Track forbidden region: points that would invalidate the fence
        // Start with region just outside Alice's position
        let forbiddenXMin = alicePosition[0] - 1;
        const forbiddenXMax = Infinity;
        const forbiddenYMax = alicePosition[1] + 1;
        let forbiddenYMin = -Infinity;

        for (let bobIndex = aliceIndex + 1; bobIndex < points.length; bobIndex++) {
            const bobPosition = points[bobIndex];

            // Check if Bob can be lower-right corner (outside forbidden region)
            if (bobPosition[0] > forbiddenXMin &&
                bobPosition[0] < forbiddenXMax &&
                bobPosition[1] > forbiddenYMin &&
                bobPosition[1] < forbiddenYMax) {
                
                validPairsCount++;
                
                // Update forbidden region: Bob's position becomes new constraint
                // No future Bob can be left of this Bob or above this Bob
                forbiddenXMin = bobPosition[0];
                forbiddenYMin = bobPosition[1];
            }
        }
    }

    return validPairsCount;
};