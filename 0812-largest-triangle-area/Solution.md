# Brute Force Triangle | 25 Lines | O(n³) | 6ms

# Intuition
To find the largest triangle area, we need to check all possible combinations of 3 points from the given set and calculate their areas. The triangle with the maximum area is our answer.

# Approach
Use a brute force approach to generate all possible triangles by selecting 3 points from the input array. For each combination, calculate the triangle area using the cross product formula: `|x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| / 2`. Keep track of the maximum area found and return it.

# Complexity
- Time complexity: $$O(n^3)$$
- Space complexity: $$O(1)$$

# Code
```typescript
const largestTriangleArea = (points: number[][]): number => {
    const totalPoints = points.length;
    let maxTriangleArea = 0;

    const calculateTriangleArea = (point1: number[], point2: number[], point3: number[]): number => {
        return Math.abs(
            point1[0] * (point2[1] - point3[1]) +
            point2[0] * (point3[1] - point1[1]) +
            point3[0] * (point1[1] - point2[1])
        ) / 2;
    };

    for (let firstIndex = 0; firstIndex < totalPoints; firstIndex++) {
        for (let secondIndex = firstIndex + 1; secondIndex < totalPoints; secondIndex++) {
            for (let thirdIndex = secondIndex + 1; thirdIndex < totalPoints; thirdIndex++) {
                const currentTriangleArea = calculateTriangleArea(
                    points[firstIndex], 
                    points[secondIndex], 
                    points[thirdIndex]
                );
                maxTriangleArea = Math.max(maxTriangleArea, currentTriangleArea);
            }
        }
    }

    return maxTriangleArea;
};
```