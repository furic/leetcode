const largestPerimeter = (nums: number[]): number => {
    // Sort sides in ascending order - this is the standard approach for triangle problems
    // because the triangle inequality check is: two smaller sides > largest side
    const sortedSides = nums.sort((a, b) => a - b);

    // Check from largest possible triangles down to smallest
    for (let largestSideIndex = sortedSides.length - 1; largestSideIndex >= 2; largestSideIndex--) {
        const smallestSide = sortedSides[largestSideIndex - 2];
        const middleSide = sortedSides[largestSideIndex - 1];
        const largestSide = sortedSides[largestSideIndex];

        // Triangle inequality: sum of two smaller sides must exceed the largest side
        if (smallestSide + middleSide > largestSide) {
            return smallestSide + middleSide + largestSide;
        }
    }

    // No valid triangle found
    return 0;
};