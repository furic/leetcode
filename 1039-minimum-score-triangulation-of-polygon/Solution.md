# Dynamic Programming Memoization | 30 Lines | O(n³) | 6ms

# Intuition
This is a classic interval dynamic programming problem. To triangulate a polygon optimally, we need to find the best way to divide it into triangles. Each triangulation choice affects the total score, so we need to try all possible divisions and pick the minimum.

# Approach
Use memoized recursion where `findMinTriangulationScore(i, j)` returns the minimum score to triangulate the polygon segment from vertex i to vertex j. For each segment, try all possible middle vertices k to form triangle (i, k, j), then recursively solve the left and right subproblems. The base case is when vertices are adjacent (no triangulation needed).

# Complexity
- Time complexity: $$O(n^3)$$
- Space complexity: $$O(n^2)$$ for memoization table

# Code
```typescript
const minScoreTriangulation = (values: number[]): number => {
    const polygonSize = values.length;
    const memo: number[][] = Array.from(
        { length: polygonSize }, 
        () => Array.from({ length: polygonSize }, () => 0)
    );

    const findMinTriangulationScore = (leftVertex: number, rightVertex: number): number => {
        if (leftVertex + 1 === rightVertex) {
            return 0;
        }

        if (memo[leftVertex][rightVertex] > 0) {
            return memo[leftVertex][rightVertex];
        }

        let minScore = Number.MAX_SAFE_INTEGER;
        
        for (let middleVertex = leftVertex + 1; middleVertex < rightVertex; middleVertex++) {
            const leftSubproblem = findMinTriangulationScore(leftVertex, middleVertex);
            const rightSubproblem = findMinTriangulationScore(middleVertex, rightVertex);
            const currentTriangleScore = values[leftVertex] * values[middleVertex] * values[rightVertex];
            
            const totalScore = leftSubproblem + rightSubproblem + currentTriangleScore;
            minScore = Math.min(minScore, totalScore);
        }

        memo[leftVertex][rightVertex] = minScore;
        return minScore;
    };

    return findMinTriangulationScore(0, polygonSize - 1);
};
```