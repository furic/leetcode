# Collision Zone Counting | 13 Lines | O(n) | 10ms

# Intuition
Cars moving left at the start escape left, and cars moving right at the end escape right. All other moving cars will eventually collide and stop. The key insight is that each moving car that stops contributes exactly 1 collision to the total count.

# Approach
- **Identify Escape Zones**:
  - Leading L's (leftmost cars moving left): escape to the left, never collide
  - Trailing R's (rightmost cars moving right): escape to the right, never collide
  - All cars between these boundaries form the "collision zone"

- **Why Each Moving Car Contributes 1 Collision**:
  - Head-on collision (opposite directions): +2 collisions, 2 cars stop → 1 per car
  - Moving hits stationary: +1 collision, 1 car stops → 1 per car
  - A moving car either escapes (contributes 0) or eventually stops (contributes 1)
  - This is true regardless of collision order or chain reactions

- **Find Collision Zone Boundaries**:
  - leftBound: first car that's not moving left
  - rightBound: last car that's not moving right
  - Cars at indices [leftBound, rightBound] are in the collision zone

- **Count Non-Stationary Cars**:
  - Within the collision zone, count all L's and R's (exclude S's)
  - Each counted car will eventually stop via collision
  - Stationary cars don't contribute (they're already stopped)

- **Algorithm Steps**:
  1. Trim leading L's: advance leftBound while seeing L's
  2. Trim trailing R's: retreat rightBound while seeing R's
  3. Count non-S cars in remaining range
  4. Return count

- **Example Walkthrough** ("RLRSLL"):
  - leftBound = 0 (first char 'R' is not 'L')
  - rightBound: scan from end
    - Index 5: 'L' (not 'R', stop scanning)
    - rightBound = 5
  - Zone [0, 5]: "RLRSLL"
  - Non-S cars: R(0), L(1), R(2), L(4), L(5) = 5
  - Result: 5 ✓

- **Example Walkthrough** ("LLRR"):
  - leftBound: skip leading L's → leftBound = 2
  - rightBound: skip trailing R's from index 3
    - Index 3: 'R', skip
    - Index 2: 'R', skip
    - rightBound = 1
  - rightBound < leftBound, so empty collision zone
  - Result: 0 ✓

- **Edge Cases Handled**:
  - All L's: entire zone escapes left, count = 0
  - All R's: entire zone escapes right, count = 0
  - All S's: no moving cars, count = 0
  - No escapes: entire array is collision zone

# Complexity
- Time complexity: $$O(n)$$
  - Trim leading L's: O(n) worst case
  - Trim trailing R's: O(n) worst case
  - Count non-S in range: O(n) worst case
  - Total: O(n)

- Space complexity: $$O(1)$$
  - Only constant variables (leftBound, rightBound, count)
  - No additional data structures
  - Total: O(1)

# Code
```typescript
const countCollisions = (directions: string): number => {
    const numCars = directions.length;
    let leftBound = 0;
    let rightBound = numCars - 1;

    while (leftBound < numCars && directions[leftBound] === "L") {
        leftBound++;
    }

    while (rightBound >= leftBound && directions[rightBound] === "R") {
        rightBound--;
    }

    let collisionCount = 0;
    for (let i = leftBound; i <= rightBound; i++) {
        if (directions[i] !== "S") {
            collisionCount++;
        }
    }
    
    return collisionCount;
};
```