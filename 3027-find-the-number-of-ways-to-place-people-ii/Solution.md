# Sorted Sweep Line Algorithm | 25 Lines | O(n²) | 129ms

# Intuition
Alice must be at the upper-left corner and Bob at the lower-right corner of a rectangle, meaning Alice's x ≤ Bob's x and Alice's y ≥ Bob's y. For the fence to be valid, no other points should lie inside or on the boundary of this rectangle. The key insight is that we can use a sweep line approach: sort points appropriately and maintain a "forbidden region" that eliminates invalid Bob positions as we process potential Alice-Bob pairs.

# Approach
I'll use a sweep line algorithm with forbidden region tracking:

1. **Strategic Sorting**: Sort points by x-coordinate ascending, then by y-coordinate descending. This ensures we process Alice positions from left-to-right and top-to-bottom, which naturally maintains the upper-left constraint.

2. **Forbidden Region Concept**: For each Alice position, maintain a "forbidden region" where Bob cannot be placed. Initially, this region starts just above Alice's y-coordinate.

3. **Valid Bob Detection**: For each potential Bob position (processed after Alice), check if Bob falls outside the current forbidden region. Bob is valid if his y-coordinate is within the allowed range.

4. **Dynamic Region Updates**: When we find a valid Bob, his position becomes a new constraint - future Bob candidates cannot be to the left of this Bob (handled by sorting) or above this Bob (handled by updating the forbidden region).

5. **Sweep Line Optimization**: The sorted order ensures we only need to check points that come after Alice in the sorted sequence, significantly reducing the search space.

# Complexity
- Time complexity: $$O(n^2)$$
  - Sorting points takes O(n log n)
  - Nested loops: outer loop runs n times, inner loop runs up to n times
  - Each inner iteration performs constant-time operations
  - Total: O(n²) dominates the sorting cost

- Space complexity: $$O(1)$$
  - Sorting is done in-place (depending on implementation)
  - Only using a constant number of variables to track forbidden region boundaries
  - No additional data structures that scale with input size

# Code
```typescript []
const numberOfPairs = (points: number[][]): number => {
    let validPairsCount = 0;

    points.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

    for (let aliceIndex = 0; aliceIndex < points.length - 1; aliceIndex++) {
        const alicePosition = points[aliceIndex];

        const forbiddenYMax = alicePosition[1] + 1;
        let forbiddenYMin = -Infinity;

        for (let bobIndex = aliceIndex + 1; bobIndex < points.length; bobIndex++) {
            const bobPosition = points[bobIndex];

            if (bobPosition[1] > forbiddenYMin && bobPosition[1] < forbiddenYMax) {

                validPairsCount++;

                forbiddenYMin = bobPosition[1];
            }
        }
    }

    return validPairsCount;
};
```