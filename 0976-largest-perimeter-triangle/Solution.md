# Greedy Triangle Check | 16 Lines | O(n log n) | 25ms

# Intuition
To form a triangle with maximum perimeter, we want to use the largest possible sides. For any three sides to form a valid triangle, they must satisfy the triangle inequality: the sum of any two sides must be greater than the third side.

# Approach
Sort the array in ascending order, then check triplets starting from the largest possible combination. For each triplet of consecutive elements (when sorted), check if the sum of the two smaller sides exceeds the largest side. The first valid triplet we find will have the maximum perimeter since we're checking from largest to smallest.

# Complexity
- Time complexity: $$O(n \log n)$$ for sorting
- Space complexity: $$O(1)$$ if sorting in-place, $$O(n)$$ otherwise

# Code
```typescript
const largestPerimeter = (nums: number[]): number => {
    const sortedSides = nums.sort((a, b) => a - b);

    for (let largestSideIndex = sortedSides.length - 1; largestSideIndex >= 2; largestSideIndex--) {
        const smallestSide = sortedSides[largestSideIndex - 2];
        const middleSide = sortedSides[largestSideIndex - 1];
        const largestSide = sortedSides[largestSideIndex];

        if (smallestSide + middleSide > largestSide) {
            return smallestSide + middleSide + largestSide;
        }
    }

    return 0;
};
```